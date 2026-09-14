/* E1 Terminal — static page that polls JSON the laptop publishes. Paper only. Every number shown is
   read from data/*.json; anything missing is shown as "loading", never invented. */
(function () {
  "use strict";
  var S = { live: null, screener: null, patterns: null, backtest: null, tab: "live",
            scrSort: { key: "symbol", dir: 1 }, btShown: 50, liveTimer: null };
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (v) { return String(v == null ? "" : v).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); };
  var inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 2 });
  var inr0 = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });
  var dash = '<span class="muted">—</span>';
  var loading = '<span class="muted">loading</span>';

  function num(v) { return v == null || isNaN(v) ? dash : inr.format(v); }
  function rupees(v) { return v == null ? dash : (v < 0 ? "−₹" : "₹") + inr0.format(Math.abs(v)); }
  function signed(v, unit, digits) {
    if (v == null || isNaN(v)) return dash;
    var s = Math.abs(v).toFixed(digits == null ? 2 : digits) + (unit || "");
    if (v > 0) return '<span class="up">▲ +' + s + "</span>";
    if (v < 0) return '<span class="down">▼ −' + s + "</span>";
    return "0" + (unit || "");
  }
  function rR(v) { return v == null || isNaN(v) ? dash : signed(v, "R"); }
  function ist(d) { return new Date(d.getTime() + (d.getTimezoneOffset() + 330) * 60000); }
  function hhmm(iso) { if (!iso) return ""; var d = ist(new Date(iso));
    return String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0"); }
  function prettyDate(s) { if (!s || s.length < 10) return esc(s || "");
    var d = new Date(s.slice(0, 10) + "T00:00:00");
    return isNaN(d) ? esc(s) : d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short", year: "numeric" }); }

  function fetchJSON(name) {
    return fetch("data/" + name + "?t=" + Date.now(), { cache: "no-store" })
      .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); });
  }

  /* ---------------- tabs ---------------- */
  var TABS = ["live", "portfolio", "screener", "patterns", "backtest", "how", "engines"];
  function show(tab) {
    if (TABS.indexOf(tab) < 0) tab = "live";
    S.tab = tab;
    TABS.forEach(function (t) { $("tab-" + t).hidden = t !== tab; });
    document.querySelectorAll(".tabs button").forEach(function (b) {
      b.setAttribute("aria-selected", b.dataset.tab === tab ? "true" : "false"); });
    if (tab === "patterns" && !S.patterns) loadPatterns();
    if (tab === "screener" && !S.screener) loadScreener();
    if (tab === "backtest" && !S.backtest) loadBacktest();
  }
  document.querySelectorAll(".tabs button").forEach(function (b) {
    b.addEventListener("click", function () { location.hash = b.dataset.tab; }); });
  window.addEventListener("hashchange", function () { show(location.hash.slice(1)); });

  /* ---------------- clock, market, countdown ---------------- */
  function tickClock() {
    var now = ist(new Date());
    $("clock").textContent = now.toLocaleTimeString("en-GB") + " IST";
    var m = S.live && S.live.market;
    if (!m) return;
    var mk = $("mkt");
    mk.className = "pill mkt" + (m.open ? " open" : "");
    mk.textContent = m.open ? "Market open" : "Market closed" + (m.reason ? " · " + m.reason : "");
    var target = new Date(m.open && m.close_time ? m.close_time : m.next_open);
    var ms = target - new Date();
    if (ms <= 0) { $("countdown").textContent = m.open ? "Closing" : "Opening now — refreshing"; return; }
    var s = Math.floor(ms / 1000), d = Math.floor(s / 86400), h = Math.floor(s % 86400 / 3600),
        mi = Math.floor(s % 3600 / 60), se = s % 60;
    var span = (d ? d + "d " : "") + h + "h " + String(mi).padStart(2, "0") + "m " + String(se).padStart(2, "0") + "s";
    $("countdown").textContent = m.open ? "Closes in " + span : "Next session " + m.next_open_label + " · in " + span;
  }

  function closedBanner(m) {
    return "<b>Market closed — next session " + esc(m.next_open_label) + "</b>" +
      '<span class="muted">' + esc(m.reason || "") + ". Nothing is traded while the market is shut; " +
      "the paper trades below are waiting for the open.</span>";
  }

  /* ---------------- live desk ---------------- */
  function kpi(k, v, n) { return '<div class="kpi"><div class="k">' + esc(k) + '</div><div class="v">' + v +
    "</div>" + (n ? '<div class="n">' + n + "</div>" : "") + "</div>"; }

  function statusTag(c) {
    var words = { queued: "Queued", filled: "Filled", open: "Open", closed: "Closed" };
    return '<span class="tag ' + esc(c.status) + '">' + esc(words[c.status] || c.status) + "</span>";
  }
  function callResult(c) {
    if (c.status === "closed") return rR(c.result_R) + '<br><span class="muted">' + rupees(c.result_rupees) + "</span>";
    if (c.status === "open" || c.status === "filled") return c.mark_R == null ? dash : rR(c.mark_R) + ' <span class="muted">now</span>';
    return dash;
  }

  function renderLive() {
    var L = S.live; if (!L) return;
    var m = L.market;
    $("live-closed").hidden = m.open;
    $("live-closed").innerHTML = m.open ? "" : closedBanner(m);
    var st = L.portfolio.stats;
    var w = L.weather;
    $("live-kpis").innerHTML =
      kpi("Calls fired today", m.open ? (L.fires_today == null ? loading : inr0.format(L.fires_today)) : '<span class="muted">Market closed</span>') +
      kpi("Waiting for the open", inr0.format(st.queued), st.queued ? rupees(st.queued_risk_rupees) + " at risk once filled" : "") +
      kpi("Open positions", inr0.format(st.open), st.open ? rupees(st.exposure_rupees) + " at risk" : "") +
      kpi("Today's paper result", m.open ? (st.day_R == null ? loading : rR(st.day_R)) : '<span class="muted">Market closed</span>',
          m.open && st.day_rupees != null ? rupees(st.day_rupees) : "") +
      kpi("Market weather", w ? '<span class="tag ' + esc(w) + '" style="font-size:15px">' + esc(w.toUpperCase()) + "</span>" : loading,
          "as of the " + prettyDate(L.screener_as_of) + " close");

    var rows = L.lights.map(function (l) {
      var cell = function (x) { return '<td><span class="light ' + esc(x.state) + '">' +
        esc({ on: "On", off: "Off", "not-checked": "Not checked", "n/a": "Not used" }[x.state] || x.state) +
        "</span><br><small class=\"muted\">" + esc(x.text) + "</small></td>"; };
      return "<tr><td><b>" + esc(l.engine) + "</b></td>" + cell(l.board) + cell(l.money) + cell(l.moment) + "</tr>";
    }).join("");
    $("lights").innerHTML = "<thead><tr><th>Engine</th><th>Board — passed its exam</th><th>Money — beats the fees</th>" +
      "<th>Moment — a real price to trade at</th></tr></thead><tbody>" + rows + "</tbody>";

    var calls = L.calls;
    $("calls").innerHTML = "<thead><tr><th>When</th><th>Stock</th><th>Engine</th><th>What it says</th><th>Direction</th>" +
      '<th class="num">Entry</th><th class="num">Stop</th><th class="num">Target</th><th>Status</th><th class="num">Result</th></tr></thead><tbody>' +
      (calls.length ? calls.map(function (c) {
        return "<tr><td>" + esc(c.when) + "</td><td><b>" + esc(c.stock) + "</b></td><td>" + esc(c.engine) + "</td>" +
          '<td class="say">' + esc(c.sentence) + "</td><td>" + esc(c.direction) + "</td>" +
          '<td class="num">' + (c.entry != null ? num(c.entry) : '<span class="muted">' + esc(c.entry_note) + "</span>") + "</td>" +
          (c.stop == null && c.levels_note
            ? '<td colspan="2" class="muted">' + esc(c.levels_note) + "</td>"
            : '<td class="num">' + num(c.stop) + '</td><td class="num">' + num(c.target) + "</td>") +
          "<td>" + statusTag(c) + '</td><td class="num">' + callResult(c) + "</td></tr>";
      }).join("") : '<tr><td colspan="10" class="empty">No calls yet.</td></tr>') + "</tbody>";

    // tape: indices note + the day's traded stocks
    var t = L.tape, parts = ['<span class="tick"><b>INDICES</b><span class="muted">' + esc(t.indices_note) + "</span></span>"];
    t.stocks.forEach(function (s) {
      parts.push('<span class="tick"><b>' + esc(s.stock) + "</b>" + num(s.last) + " " + signed(s.change_pct, "%") + "</span>");
    });
    if (t.as_of) parts.push('<span class="tick muted">Prices as of the ' + prettyDate(t.as_of) + " close</span>");
    var once = parts.join("");
    $("tape").innerHTML = once + once; // doubled so the loop scrolls seamlessly

    $("published").textContent = "Live data published " + hhmm(L.published) + " IST" +
      (S.screener ? " · screener built " + hhmm(S.screener.built) + " IST" : "");
    var ageMin = (new Date() - new Date(L.published)) / 60000;
    $("stale").hidden = !(m.open && ageMin > 10);
    $("stale").textContent = "Data delayed — the last update reached the site at " + hhmm(L.published) + " IST.";
    renderPortfolio();
    renderEngines();
  }

  /* ---------------- portfolio ---------------- */
  function tradeTable(list, empty, withResult) {
    return "<thead><tr><th>Date</th><th>Stock</th><th>What it says</th><th>Direction</th>" +
      '<th class="num">Entry</th><th class="num">Stop</th><th class="num">Target</th><th class="num">' + (withResult ? "Result" : "Now") + "</th></tr></thead><tbody>" +
      (list.length ? list.map(function (c) {
        return "<tr><td>" + prettyDate(c.date) + "</td><td><b>" + esc(c.stock) + '</b></td><td class="say">' + esc(c.sentence) +
          "</td><td>" + esc(c.direction) + '</td><td class="num">' + (c.entry != null ? num(c.entry) : '<span class="muted">' + esc(c.entry_note) + "</span>") +
          '</td><td class="num">' + num(c.stop) + '</td><td class="num">' + num(c.target) + '</td><td class="num">' + callResult(c) + "</td></tr>";
      }).join("") : '<tr><td colspan="8" class="empty">' + esc(empty) + "</td></tr>") + "</tbody>";
  }

  function renderPortfolio() {
    var L = S.live; if (!L) return;
    var P = L.portfolio, st = P.stats, m = L.market;
    $("one-r").textContent = inr0.format(st.one_R_rupees);
    $("pf-closed").hidden = m.open;
    $("pf-closed").innerHTML = m.open ? "" : closedBanner(m);
    $("pf-kpis").innerHTML =
      kpi("Paper capital", rupees(st.capital), "1R = ₹" + inr0.format(st.one_R_rupees) + " = 0.5%") +
      kpi("Today's paper result", m.open ? (st.day_R == null ? loading : rR(st.day_R)) : '<span class="muted">Market closed</span>',
          m.open && st.day_pct != null ? signed(st.day_pct, "%") + " · " + rupees(st.day_rupees) : "") +
      kpi("Total paper result", st.closed ? rR(st.cum_R) : '<span class="muted">No closed trades</span>',
          st.closed ? signed(st.cum_pct, "%") + " · " + rupees(st.cum_rupees) : "") +
      kpi("Won", st.win_pct == null ? dash : st.win_pct + "%", st.closed ? st.closed + " closed trades" : "") +
      kpi("Profit factor", st.profit_factor == null ? dash : st.profit_factor, "gains ÷ losses") +
      kpi("Money at risk now", rupees(st.exposure_rupees),
          signed(st.exposure_pct, "%") + " of capital · " + st.open + " open · " + st.queued + " waiting");
    drawCurve(P.curve);
    $("pf-open").innerHTML = tradeTable(P.open, m.open ? "No open paper positions." : "No open positions — the market is closed.", false);
    $("pf-queued").innerHTML = tradeTable(L.calls.filter(function (c) { return c.status === "queued"; }), "Nothing waiting to fill.", false);
    $("pf-closedtrades").innerHTML = tradeTable(P.closed, "No closed paper trades yet — the first fills happen at the next open.", true);
  }

  function drawCurve(curve) {
    var box = $("curve");
    if (!curve || !curve.length) { box.innerHTML = '<div class="empty">No closed paper trades yet, so there is no curve to draw. It starts with the first closed trade.</div>'; return; }
    var W = 900, H = 240, pad = { l: 44, r: 12, t: 10, b: 24 };
    var ys = curve.map(function (p) { return p.R; }).concat([0]);
    var lo = Math.min.apply(null, ys), hi = Math.max.apply(null, ys);
    if (hi === lo) { hi += 1; lo -= 1; }
    var x = function (i) { return pad.l + (curve.length === 1 ? 0.5 : i / (curve.length - 1)) * (W - pad.l - pad.r); };
    var y = function (v) { return pad.t + (hi - v) / (hi - lo) * (H - pad.t - pad.b); };
    var pts = curve.map(function (p, i) { return x(i).toFixed(1) + "," + y(p.R).toFixed(1); }).join(" ");
    var ticks = [lo, (lo + hi) / 2, hi].map(function (v) {
      return '<line x1="' + pad.l + '" x2="' + (W - pad.r) + '" y1="' + y(v) + '" y2="' + y(v) + '" stroke="#262b33"/>' +
        '<text x="' + (pad.l - 6) + '" y="' + (y(v) + 4) + '" text-anchor="end" fill="#8b8a82" font-size="11">' + v.toFixed(1) + "R</text>"; }).join("");
    box.innerHTML = '<svg viewBox="0 0 ' + W + " " + H + '" preserveAspectRatio="none" role="img" aria-label="Cumulative paper result">' + ticks +
      '<line x1="' + pad.l + '" x2="' + (W - pad.r) + '" y1="' + y(0) + '" y2="' + y(0) + '" stroke="#4a505a"/>' +
      '<polyline points="' + pts + '" fill="none" stroke="#3987e5" stroke-width="2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>' +
      '<line id="cx" y1="' + pad.t + '" y2="' + (H - pad.b) + '" stroke="#8b8a82" stroke-dasharray="3 3" visibility="hidden"/>' +
      '<circle id="cdot" r="4" fill="#3987e5" stroke="#13161b" stroke-width="2" visibility="hidden"/></svg><div class="tip" id="ctip" hidden></div>';
    var svg = box.querySelector("svg"), tip = $("ctip");
    svg.addEventListener("mousemove", function (e) {
      var r = svg.getBoundingClientRect(), fx = (e.clientX - r.left) / r.width * W;
      var i = Math.round((fx - pad.l) / (W - pad.l - pad.r) * (curve.length - 1));
      i = Math.max(0, Math.min(curve.length - 1, i));
      var p = curve[i], cxv = x(i);
      $("cx").setAttribute("x1", cxv); $("cx").setAttribute("x2", cxv); $("cx").setAttribute("visibility", "visible");
      $("cdot").setAttribute("cx", cxv); $("cdot").setAttribute("cy", y(p.R)); $("cdot").setAttribute("visibility", "visible");
      tip.hidden = false; tip.innerHTML = prettyDate(p.date) + " · <b>" + (p.R >= 0 ? "+" : "−") + Math.abs(p.R).toFixed(2) + "R</b>";
      tip.style.left = Math.min(r.width - 150, cxv / W * r.width + 12) + "px"; tip.style.top = "12px";
    });
    svg.addEventListener("mouseleave", function () { tip.hidden = true;
      $("cx").setAttribute("visibility", "hidden"); $("cdot").setAttribute("visibility", "hidden"); });
  }

  /* ---------------- screener ---------------- */
  var SCR_COLS = [
    { key: "symbol", label: "Stock" }, { key: "last", label: "Last price", num: true },
    { key: "change_pct", label: "Day change", num: true }, { key: "trend", label: "Trend" },
    { key: "vol_state", label: "Volatility" }, { key: "rvol", label: "Relative volume", num: true },
    { key: "firing", label: "Patterns firing now", num: true },
    { key: "validated_patterns", label: "Validated patterns", num: true },
    { key: "lights", label: "Engine lights" }];

  function loadScreener() {
    return fetchJSON("screener.json").then(function (d) { S.screener = d; renderScreener(); })
      .catch(function () { $("screener").innerHTML = '<tbody><tr><td class="empty">Screener loading.</td></tr></tbody>'; });
  }
  function renderScreener() {
    var D = S.screener; if (!D) return;
    var wd = D.weather_detail || {}, L = S.live, open = L && L.market.open;
    $("weather").innerHTML = '<div><div class="muted">Market weather</div><div class="big">' + esc(D.weather || "loading") + "</div></div>" +
      '<div class="muted" style="max-width:780px">Worst of two readings, each judged against its own past year. ' +
      "<b>Volatility:</b> the typical stock's 20-day volatility is at its " + esc(wd.median_volatility_percentile) + "th percentile (" + esc(wd.volatility_state) + "). " +
      "<b>Breadth:</b> " + esc(wd.breadth_pct) + "% of stocks are above their 60-day average — the " + esc(wd.breadth_percentile) + "th percentile (" + esc(wd.breadth_state) + "). " +
      "As of the " + prettyDate(D.as_of) + " close. India VIX is not used yet: the only copy on file ends on 28 August.</div>";
    var q = $("scr-q").value.trim().toUpperCase(), tr = $("scr-trend").value, vo = $("scr-vol").value;
    var rows = D.rows.filter(function (r) {
      return (!q || r.symbol.indexOf(q) >= 0) && (!tr || r.trend === tr) && (!vo || r.vol_state === vo); });
    var k = S.scrSort.key, dir = S.scrSort.dir;
    rows.sort(function (a, b) {
      var av = a[k], bv = b[k];
      if (k === "lights") { av = a.e1_live_pattern ? 1 : 0; bv = b.e1_live_pattern ? 1 : 0; }
      if (av == null) return 1; if (bv == null) return -1;
      return (av > bv ? 1 : av < bv ? -1 : 0) * dir; });
    $("scr-count").textContent = rows.length + " of " + D.covered + " stocks";
    var head = "<thead><tr>" + SCR_COLS.map(function (c) {
      var s = c.key === k ? (dir > 0 ? "ascending" : "descending") : "none";
      return '<th data-k="' + c.key + '" aria-sort="' + s + '" class="' + (c.num ? "num" : "") + '">' + esc(c.label) + "</th>"; }).join("") + "</tr></thead>";
    var body = rows.map(function (r) {
      var trend = r.trend == null ? loading : r.trend === "up" ? '<span class="up">▲ Rising</span>' : '<span class="down">▼ Falling</span>';
      var vol = r.vol_state == null ? loading : '<span class="tag ' + esc(r.vol_state) + '">' + esc(r.vol_state[0].toUpperCase() + r.vol_state.slice(1)) + "</span>";
      var lights = '<span class="light ' + (r.e1_live_pattern ? "on" : "off") + '" title="' + esc(r.e1_live_pattern || "No live E1 pattern") + '">E1</span>' +
        (r.e3_study_events ? ' <span class="light n/a" title="Dividend and split events stored for study">E3 · ' + r.e3_study_events + "</span>" : "");
      return "<tr><td><b>" + esc(r.symbol) + "</b>" + (r.stale ? ' <span class="muted">(older data)</span>' : "") + '</td><td class="num">' + num(r.last) +
        '</td><td class="num">' + signed(r.change_pct, "%") + "</td><td>" + trend + "</td><td>" + vol +
        '</td><td class="num">' + (r.rvol == null ? loading : r.rvol.toFixed(2) + "×") +
        '</td><td class="num">' + (open ? loading : '<span class="muted">Market closed</span>') +
        '</td><td class="num">' + inr0.format(r.validated_patterns) + "</td><td>" + lights + "</td></tr>"; }).join("");
    $("screener").innerHTML = head + "<tbody>" + (body || '<tr><td colspan="9" class="empty">No stock matches.</td></tr>') + "</tbody>";
    $("screener").querySelectorAll("th").forEach(function (th) {
      th.addEventListener("click", function () { var nk = th.dataset.k;
        S.scrSort = { key: nk, dir: S.scrSort.key === nk ? -S.scrSort.dir : 1 }; renderScreener(); }); });
    $("scr-notes").innerHTML = "<b>" + D.covered + " stocks covered.</b> The full NSE list is still loading — it arrives with the first daily Kite login, and new stocks join this table as their history lands. " +
      "Prices are the " + prettyDate(D.as_of) + " close (since 3 August the feed's last bar is 15:14). " +
      "<b>Trend</b>: above or below its 60-day average. <b>Volatility</b>: its 20-day volatility against its own past year — calm, rough from the 80th percentile, storm from the 95th. " +
      "<b>Relative volume</b>: the last session's volume against the median of the 20 before it.";
  }
  ["scr-q", "scr-trend", "scr-vol"].forEach(function (id) { $(id).addEventListener("input", renderScreener); });

  /* ---------------- patterns ---------------- */
  function loadPatterns() {
    return fetchJSON("patterns.json").then(function (d) { S.patterns = d; renderPatterns(); })
      .catch(function () { $("patterns").textContent = "Patterns loading."; });
  }
  function renderPatterns() {
    var D = S.patterns; if (!D) return;
    var q = $("pat-q").value.trim().toLowerCase(), sort = $("pat-sort").value;
    var list = D.phenomena.filter(function (p) { return !q || p.sentence.toLowerCase().indexOf(q) >= 0 ||
      p.holds_on.some(function (h) { return h.stock.toLowerCase() === q; }); });
    var key = { breadth: "breadth", edge: "edge_points", hit: "holdout_hit_pct" }[sort];
    list.sort(function (a, b) { return b[key] - a[key]; });
    $("pat-count").textContent = list.length + " of " + D.phenomena.length + " patterns";
    $("patterns").innerHTML = list.slice(0, 200).map(function (p, i) {
      return '<button class="prow" data-i="' + i + '" aria-expanded="false"><div class="s">' + esc(p.sentence) + '</div><div class="m">' +
        "<span>Breadth <b>" + inr0.format(p.breadth) + "</b> combinations in <b>" + p.stocks + "</b> stocks</span>" +
        "<span>Edge <b>+" + p.edge_points.toFixed(1) + " points</b></span>" +
        "<span>Final-exam hit rate <b>" + p.holdout_hit_pct.toFixed(1) + "%</b></span></div>" +
        '<div class="holds" hidden></div></button>'; }).join("") +
      (list.length > 200 ? '<p class="muted">Showing the first 200 — search to narrow it down.</p>' : "");
    $("patterns").querySelectorAll(".prow").forEach(function (b) {
      b.addEventListener("click", function () {
        var box = b.querySelector(".holds"), p = list[+b.dataset.i];
        if (box.hidden && !box.innerHTML) box.innerHTML = p.holds_on.map(function (h) {
          return "<div><b>" + esc(h.stock) + "</b> · " + esc(h.timeframes.join(", ")) + "</div>"; }).join("");
        box.hidden = !box.hidden; b.setAttribute("aria-expanded", box.hidden ? "false" : "true"); }); });
  }
  ["pat-q", "pat-sort"].forEach(function (id) { $(id).addEventListener("input", renderPatterns); });

  /* ---------------- backtest ---------------- */
  function loadBacktest() {
    return fetchJSON("backtest.json").then(function (d) { S.backtest = d; renderBacktest(); })
      .catch(function () { $("bt-rows").innerHTML = '<tbody><tr><td class="empty">Backtest loading.</td></tr></tbody>'; });
  }
  function statRow(label, s) {
    return "<tr><td><b>" + esc(label) + '</b></td><td class="num">' + inr0.format(s.N) + '</td><td class="num">' + s.win_pct + '%</td><td class="num">' +
      (s.profit_factor == null ? dash : s.profit_factor) + '</td><td class="num">' + s.max_dd_R + 'R</td><td class="num">' + rR(s.total_R) +
      '</td><td class="num">' + rupees(s.total_rupees) + "</td></tr>";
  }
  var STAT_HEAD = '<thead><tr><th></th><th class="num">Finished calls</th><th class="num">Won</th><th class="num">Profit factor</th>' +
    '<th class="num">Worst losing run</th><th class="num">Total</th><th class="num">In rupees</th></tr></thead>';
  function renderBacktest() {
    var B = S.backtest; if (!B || !B.summary) return;
    var s = B.summary, p = B.performance || {};
    $("bt-kpis").innerHTML = kpi("Finished simulated calls", inr0.format(s.N)) + kpi("Won", s.win_pct + "%") +
      kpi("Profit factor", s.profit_factor, "gains ÷ losses") +
      kpi("Sharpe", p.sharpe == null ? dash : p.sharpe, "annualised, risk-free 0") +
      kpi("Sortino", p.sortino == null ? dash : p.sortino, "downside risk only") +
      kpi("CAGR", p.cagr_pct == null ? dash : p.cagr_pct + "%", "paper, geometric") +
      kpi("Max drawdown", p.max_dd_pct == null ? (s.max_dd_R + "R") : p.max_dd_pct + "%", p.max_dd_rupees != null ? rupees(p.max_dd_rupees) : "") +
      kpi("Average holding", p.avg_hold_days == null ? dash : p.avg_hold_days + " days") +
      kpi("Average positions open", p.exposure == null ? dash : p.exposure) +
      kpi("Total", rR(s.total_R), rupees(s.total_rupees));
    if (p.capital) $("bt-cap").textContent = "Sharpe, Sortino, CAGR and the returns below are measured on a stated notional capital of ₹" +
      inr0.format(p.capital) + " (paper). Sharpe and Sortino are annualised from daily returns with a risk-free rate of 0.";
    var months = (p.by_month || []);
    $("bt-month").innerHTML = months.length ? ("<thead><tr><th>Month</th><th class='num'>Paper P&L</th><th class='num'>Return</th></tr></thead><tbody>" +
      months.map(function (m) { return "<tr><td>" + esc(m.month) + "</td><td class='num'>" + rupees(m.pnl_rupees) + "</td><td class='num'>" + signed(m.return_pct, "%") + "</td></tr>"; }).join("") + "</tbody>") :
      "<tbody><tr><td class='empty'>No monthly data yet.</td></tr></tbody>";
    $("bt-book").innerHTML = STAT_HEAD + "<tbody>" + B.by_book.map(function (b) { return statRow(b.book, b); }).join("") + "</tbody>";
    $("bt-year").innerHTML = STAT_HEAD + "<tbody>" + B.by_year.map(function (y) { return statRow(y.year, y); }).join("") + "</tbody>";
    $("bt-dl").innerHTML = '<a href="E1-BLOTTER.csv">Every call (CSV)</a> · <a href="E1-BLOTTER.xlsx">Every call (Excel)</a> · ' +
      '<a href="E1-FIRE-DIARY.csv">Every signal, traded or skipped (CSV)</a>';
    var rows = B.rows.slice().sort(function (a, b) { return (b.date + b.time).localeCompare(a.date + a.time); });
    $("bt-rows").innerHTML = "<thead><tr><th>Date</th><th>Stock</th><th>Book</th><th>What it said</th><th>Direction</th>" +
      '<th class="num">Entry</th><th class="num">Exit</th><th>How it ended</th><th class="num">Result</th></tr></thead><tbody>' +
      rows.slice(0, S.btShown).map(function (r) {
        return "<tr><td>" + prettyDate(r.date) + (r.time ? " " + esc(r.time) : "") + "</td><td><b>" + esc(r.stock) + "</b></td><td>" + esc(r.book) +
          '</td><td class="say">' + esc(r.sentence) + "</td><td>" + esc(r.direction) + '</td><td class="num">' + num(r.entry) +
          '</td><td class="num">' + num(r.exit) + "</td><td>" + esc(r.exit_reason || (r.status === "queued" ? "Waiting to fill" : "")) +
          '</td><td class="num">' + rR(r.result_R) + "</td></tr>"; }).join("") + "</tbody>";
    $("bt-more").hidden = S.btShown >= rows.length;
    $("bt-more").textContent = "Show more (" + (rows.length - S.btShown) + " left)";
  }
  $("bt-more").addEventListener("click", function () { S.btShown += 100; renderBacktest(); });

  /* ---------------- engines ---------------- */
  function renderEngines() {
    var L = S.live; if (!L) return;
    $("engines").innerHTML = L.engines.map(function (e) {
      return '<article class="card"><h3><span>' + esc(e.name) + '</span><span class="dot ' + esc(e.light) + '">' + esc(e.state) + "</span></h3>" +
        "<p>" + esc(e.does) + '</p><p class="wait"><b>Waiting for:</b> ' + esc(e.waiting_for) + "</p><ul>" +
        e.coverage.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul></article>"; }).join("");
  }

  /* ---------------- polling ---------------- */
  function pollLive() {
    fetchJSON("live.json").then(function (d) { S.live = d; renderLive(); tickClock(); if (S.screener) renderScreener(); })
      .catch(function () { $("mkt").textContent = "Data loading…"; })
      .then(function () {
        clearTimeout(S.liveTimer);
        var open = S.live && S.live.market && S.live.market.open;
        S.liveTimer = setTimeout(pollLive, open ? 60000 : 300000);   // 60 s in session, 5 min otherwise
      });
  }
  setInterval(function () {
    if (S.tab === "screener" || S.screener) loadScreener();
    if (S.backtest) loadBacktest();
  }, 300000);

  show(location.hash.slice(1) || "live");
  setInterval(tickClock, 1000);
  pollLive();
})();
