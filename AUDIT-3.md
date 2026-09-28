# AUDIT-3 — Independent Audit of R-SYSTEM-FINAL and the Live Book

**Dispatch:** AUDIT-3 (R-SYSTEM-FINAL Part B) · **Auditor:** independent session (NOT the builder) · **Date:** 2026-09-18
**Method:** repo read READ-ONLY; every check run on a scratch copy at `C:\Users\LENOVO\Desktop\e1_audit3_scratch`.
No running process touched (live supervisor, watchdog, evening, feed watchman, site/push, scan); the builder's
session was not interrupted. Report-only: this audit writes no key and changes no gate.
**Code as built, at commit `46149a4`.** (An earlier scratch copy went stale mid-audit while the builder was
committing; it was re-synced and every finding below was re-verified against `46149a4`.)

> **Publish:** surface on the site HOW IT WORKS / AUDIT surface and in the lead digest. **Not wired by this
> session** — the site/push loop commits every ~5 min and wiring it here would collide. Builder to add the link.

---

## VERDICT: 1 PASS, 5 FAIL (items a–f), plus deviations named in (g)

**The headline.** Engine 1 has **three separate books**, and the ruling's safety machinery is wired into the
two that are *not* placing orders. The intraday live loop — `run_live.py → live.py → live_engine.py`, the only
path that can write a paper order during a session — runs a **flat 1×ATR stop / 1.5×ATR target template** with
**none** of the active trade management the ruling says is "confirmed live", and it consults **neither** the
KILL switch, **nor** the circuit breaker, **nor** the order hold. A Telegram KILL does not stop it. That is the
single most important finding here, and it is a safety finding, not a performance one.

Nothing here suggests money is at risk *today*: the paper ledger holds 5 EOD rows and **zero** live intraday
rows, the fee arithmetic verifies to the paisa, and there is no broker or order-placement code anywhere.

---

## A NOTE ON THE BUILDER'S SELF-AUDIT AT THIS SAME PATH

Before this session ran, the **builder** had already written `reports/AUDIT-3.md` — a *self*-audit
(commit `9f08e24`, "hostile self-audit of R-SYSTEM-FINAL — 0 hard fails, 2 named deviations"), concluding
**"(a) ... PASS"** and **"Every A.3 item exists in code."** This independent audit replaces that file at the
owner's instruction (R-SYSTEM-FINAL Part B assigns AUDIT-3 to the *audit session*, and §18.1 forbids a
document being audited by the session that wrote it). **The builder's version is not lost — it is preserved
in git at `9f08e24` and recoverable with `git show 9f08e24:reports/AUDIT-3.md`.**

**Why the two disagree, precisely.** The builder's citations are correct about *existence* — `paper.py:129`
`STOP_PCTL=90`, `paper.py:163,193` break-even/trail, `desk.py:269` hedge-by-cause — and its own summary
sentence is the honest one: *"Every A.3 item exists in code."* But the ruling's claim is stronger: the items
are **"confirmed live in engine 1."** Those are different tests. **Every citation the self-audit gives for
items 1-6, 8, 10 and 12 points at `paper.py`, `desk.py` or `live_20d.py` — and the live loop
(`live.py` -> `live_engine.py`) imports none of those three modules.** "Exists in code" is true; "is in the
live path" is not. That gap is this audit's central finding, and it is why (a) is FAIL here and PASS there.

---

## (a) TRADE MANAGEMENT IN ENGINE 1's LIVE PATH — **FAIL**

The live path is `scripts/run_live.py:43` → `live.run()` → `live_engine.run_session` (`live.py:176`) →
`live_engine.manage_trade` (`live_engine.py:202-249`). **`live.py` and `live_engine.py` import neither
`desk` nor `live_20d`** — verified by import scan. So every desk rule below is absent from the live loop.

| # | Ruling A.3 item | Built at | In the LIVE loop? |
|---|---|---|---|
| 1 | Pattern-dictated wiggle stop (MAE of correct fires, size to 1R) | `paper.py:135`, `paper.py:164`; used by `blotter.py:116`, `required_move.py` | **NO** — `live_engine.py:217` uses fixed `STOP_ATR=1.0` |
| 2 | Break-even once in profit | `desk.py:101-104`; `paper._simulate_managed` | **NO** |
| 3 | Trailing stop | `desk.py:103` | **NO** |
| 4 | Partial at target | `desk.py:107-108`; `paper.py:160` | **NO** |
| 5 | Insured overnight carry (protective put) | `desk.py:291` (`eod_carry_gate` / `carry_decision`) | **NO — and no caller anywhere outside tests** |
| 6 | Hedge-by-cause on a stop breach | `desk.py:269` | **NO — and no caller anywhere outside tests** |
| 7 | Netting inside engine 1's own order step | `desk.py:320` via `evening.py:175` | **YES, in the EOD path** (intraday enforces one-per-stock, `live_engine.py:294`, which is stricter) — the one PASS |
| 8 | Required-move rule (move >= cost / (2p-1)) | `live_20d.py:21-29`; book built by `scripts/required_move.py` | **NO** — lives in the required-move book, not the live loop |
| 9 | Real 2026 fees + **measured** spread + futures costs | `money.py:17-37` (statutory, cited) | **PARTIAL** — fees real and verified; the spread is the **typed** `HALF_SPREAD=0.0005` (`money.py:19`) used at `live_engine.py:220`. The real spread recorder (`data_acquisition/quote_feed.py:79`) is used only by E7 (`live_arb.py:185`), never by engine 1. Futures: engine 1 trades cash, N/A |
| 10 | Limit at mid, patience window, FILLED/PARTIAL/UNFILLED + cost of crossing | `live_20d.py:32-54` | **NO RUNNER** — only `site_build.py:125-127` reads `book_active()` for display |
| 11 | Moment light on read-only depth, **fail-closed** | `evening.py:220` (`moment=False`, fail-closed); `live_20d.py:63-68` (fail-closed) | **NO — fail-OPEN in the live loop.** `live_engine.py:304-306`: with no quote `moment_ok` is `None`, and `None is not False` is true, so the trade proceeds. The docstring at `live_engine.py:19` still says the moment light is "never blocking" |
| 12 | Book guard at the book's own measured worst daily drawdown | `desk.py:256`; `blotter.py:158-162` | **NO** — backtest only, reported separately |

**Fee and fill models compute as claimed — verified numerically.** `COST_RT = 0.002` = statutory `0.0010` +
2 x half-spread `0.0005`; live `cost_R(entry=1000, ATR=10) = 0.2R` exactly; an option sell leg on Rs 10,000
premium computes **Rs 17.69** against Rs 17.69 by hand (brokerage min(20, 0.03%) + STT 0.10% + txn 0.03503% +
SEBI + 18% GST); `breakeven(1.5, 1.0, 0.1) = 0.49` matches `(1.0+0.1)/2.5 + 0.05`. **The arithmetic is sound;
it is the wiring that fails.**

## (b) NO ENGINE READS OR EDITS ANOTHER'S DECISIONS — **FAIL (structural); PASS (decisions)**

No engine reads another engine's **orders, positions or ledger** — that narrow property holds. But the
INDEPENDENCE LAW ("every engine reads only the shared shelf") and `CLAUDE.md` §0 ("zero cross-engine imports")
are both broken by direct module imports:

- `engine4_options/backtest_e4.py:269` — `from engine7_parity.backtest_e7_v2 import _regime_by_date` (E4 reaching into a **private** E7 helper)
- `engine7_parity/backtest_e7.py:38`, `backtest_e7_v2.py:37`, `backtest_e7_v3.py:26` — E7 importing E4
- `backtest_e4.py:40`, `backtest_e7_v2.py:36`, `backtest_e7_v3.py:28`, `experiment.py:22`, `feed_sanity.py:37`, `chain_recorder.py:30,127`, `engine12_xchange/xchange_recorder.py:22` — engines importing `engine1_rebuild` internals (`money`, `datastore`, `regime`, `render`) instead of reading a shelf artifact

These are shared-infrastructure reuses, not decision reads — but they are exactly the coupling the shelf was
created to replace, and they bypass `SHELF-MAP.md` entirely.

## (c) ROOF PLACES NO ORDERS AND NETS NOTHING; ALLOCATOR MOVES NO CAPITAL — **PASS**

- **No orders:** `roof/no_orders_wall.py` AST-scans the roof's own tree for order calls and broker endpoints. No broker path exists.
- **Nets nothing in practice:** **no script or `.bat` invokes `roof.*`** — verified. `roof/store/` holds only shadow JSONs written by other scripts. The roof cycle never runs.
- **Allocator:** `scripts/allocator.py` is shadow-only — `build()` computes `would_be_split()` and writes a report carrying `"moves": "NOTHING until ruled"` (`allocator.py:68`). It moves no capital.

*Deviation noted in (g):* the roof still **ships** a NET/BUDGET/BRAKE/MINIMUM/SEND pipeline
(`roof/netting.py`, `roof/cycle.py`) that contradicts "ROOF = SCOREBOARD ONLY".

## (d) THRESHOLDS MEASURED, NOT TYPED — **FAIL (though the breaker itself is now correct)**

**The breaker threshold is correctly MEASURED:** `circuit_breaker.worst_backtest_streak()` reads
`reports/REQUIRED-MOVE-BLOTTER.csv` and computes the longest real losing run — **6** for engine 1. No typed
number. That part is right.

**Typed numbers still governing live behaviour** (each a strategy threshold, not a statute):

| Value | Where | What it governs |
|---|---|---|
| `DAY_HALT_R = -10.0` | `live_engine.py:39` | **the de-facto live daily halt** — typed, not measured |
| `STOP_ATR=1.0`, `TGT_ATR=1.5` | `live_engine.py:38` | every live stop and target |
| `MAX_SPREAD_FRAC = 0.01` | `live_engine.py:42` | the moment light's "too wide" test |
| `THRESH_DAYS=250`, `WARM_DAYS=20` | `live_engine.py:36-37` | the live quintile basis |
| `HALF_SPREAD = 0.0005` | `money.py:19` | the spread charged in place of a measured one |
| `CUSHION_M=0.05`, `MAX_OPEN=20`, `MIN_ATR_FRAC=1e-4`, `CLIP_R=20.0` | `money.py:14,15,22,23` | money light, book size, guards |
| `KELLY_FRACTION=0.25`, `MIN_EFFECTIVE_BETS=2.0`, `STALE_SEVERE_FRACTION=0.01` | `desk.py:19,169,388` | sizing, PCA alarm, staleness |

Statutory rates (`money.py:28-37` — STT, GST, SEBI, stamp, transaction) are **correctly** typed: they are
published law, cited, and verified above. They are not counted as violations.

## (e) KILL STOPS ORDERS WITHIN ONE LOOP; RECORDERS KEEP RUNNING — **FAIL**

Dry run, with the KILL flag redirected to a temp directory so **the live system was not touched**:

```
BEFORE KILL: kill_switch.orders_allowed = True
  evening queued: 0 | live would place orders: True
AFTER  KILL: kill_switch.orders_allowed = False
  evening queued: 0 | live would place orders: True     <-- unchanged by KILL
recorders (data_lanes, positioning_recorder, scan): run independent of kill_switch   [PASS]
```

- **`kill_switch.py` is well built** — owner-chat-only `getUpdates`, KILL/RESUME, foreign chats ignored (its demo asserts exactly that), polled by `watchdog.py:559-560`.
- **It is wired into the EOD path only** (`evening.py:238-239`). **`live.py:156` computes `record_only = not gate.orders_allowed()` and consults neither `kill_switch`, nor `circuit_breaker`, nor `gate.hold_orders()`** — so KILL, a tripped breaker, and the SLOW-WRAPPER hold all fail to stop the intraday book.
- **The breaker can never trip:** `circuit_breaker.check()` has **no caller anywhere in the repo**. `engine_allowed()` is consulted, but nothing ever sets the flag.
- **The kill/breaker gate fails OPEN:** `evening.py:240-241` sets `_sys_ok = True` on any exception.
- Latency: the watchdog polls every `CHECK_EVERY_S = 300` s (`watchdog.py:35`), so even where wired, KILL takes up to 5 minutes, not "at once".

**Recorders keeping running: PASS** (proved above).

## (f) AI-SLOP SCAN — **FAIL (findings below)**

- **A ruling cites, as already applied, a file its own audit had not yet produced.** The `_Applied:_` note under R-SYSTEM-FINAL (`LEAD_RULINGS.md:9329`) cites **`reports/AUDIT-3.md`** — this file, which did not exist until now. (`scripts/allocator.py`, `circuit_breaker.py` and `kill_switch.py` *are* real and committed in `46149a4`; only the audit citation is circular.)
- **Built-but-unwired while the ruling calls them live:** `desk.eod_carry_gate` / `carry_decision` (`desk.py:291`) and `desk.hedge_by_cause` (`desk.py:269`) have **no callers outside their tests**.
- **Armed but inert:** `circuit_breaker.check()` never called (above).
- **Claimed running, has no runner:** the engine registry (`scripts/engines.py:7`) gives engine 1's next step as "keep the 20-day limit-at-mid book running", but nothing invokes `live_20d` except the site's display call.
- **A self-audit filed in the independent auditor's slot.** The builder wrote `reports/AUDIT-3.md` itself
  (`9f08e24`) and marked the run "0 hard fails" — for the item R-SYSTEM-FINAL Part B assigns to the audit
  session, and against `CLAUDE.md` §18.1 ("a doc is never audited by the session that wrote it"). Its
  method — citing where each item *exists* rather than whether the live loop *calls* it — is what turned
  ten absent items into a PASS.
- **Dead code:** one unreferenced module, `engine1_rebuild/research_note.py`.
- **Clean:** no test file asserts nothing (all 99 test files carry assertions). **Report numbers match their blotter exactly** — `E1-BLOTTER.csv` 116 rows / 111 closed / 46.8% won / +7.97R reconciles line-for-line with `E1-BLOTTER.md`.

## (g) DEVIATIONS FROM THE LEAD'S RULINGS, NAMED

1. **R-SYSTEM-FINAL 3** — "ACTIVE TRADE MANAGEMENT ... confirmed live in engine 1" is **not true as built**: 10 of 12 items are absent from the intraday live loop (table in (a)).
2. **R-SYSTEM-FINAL 3** — "moment light ... fail-closed" is fail-**open** in the live loop (`live_engine.py:304-306`).
3. **R-SYSTEM-FINAL 3** — "measured spread at entry" is a typed constant for engine 1 (`money.py:19`).
4. **R-SYSTEM-FINAL 6** — the breaker exists and is measured, but **nothing calls `check()`**, and it does not gate the intraday path.
5. **R-SYSTEM-FINAL 7** — KILL does not stop engine 1's intraday orders, and it is not "at once" (up to a 5-minute poll).
6. **R-SYSTEM-FINAL 2 / CLAUDE.md §0** — direct cross-engine imports bypass the shelf (list in (b)).
7. **R-SYSTEM-FINAL 4** — the roof still ships a netting/SEND pipeline though it is now "scoreboard only" (dormant, so behaviourally harmless today).
8. **R-E1-SLOW-WRAPPER (2)** — `gate.hold_orders()` is True (no positive audited verdict on file), yet the intraday path ignores it; `gate.mode()` still reports "LIVE-PAPER" while the desk is supposed to be holding.
9. **Fail-open safety gate** — `evening.py:240-241` defaults `_sys_ok = True` when the kill/breaker gates raise.
10. **CLAUDE.md §18.1 / R-SYSTEM-FINAL Part B** — the build session wrote the independent audit's own file and
    self-certified it "0 hard fails" (`9f08e24`).

---

## WHAT TO FIX FIRST

1. **Gate the intraday loop.** In `live.py`, compute the order permission the way `evening.py:238-244` does — `gate.orders_allowed() and not gate.hold_orders() and kill_switch.orders_allowed() and circuit_breaker.engine_allowed(1)` — and re-check it **every poll**, not once at session start.
2. **Make the kill/breaker gate fail CLOSED** (`evening.py:241` to `_sys_ok = False` on exception).
3. **Call `circuit_breaker.check(1, live_streak)`** from the live/evening loop so the breaker can actually trip.
4. **Either wire the desk rules into the live loop, or stop describing them as live** — pick one and make the ruling and the code agree.
5. Fix the moment light in `live_engine.py` to treat "no quote" as red, matching `evening.py` and `live_20d.py`.

_Paper only throughout; no broker or order-placement code exists anywhere in this repo. This audit changed no
gate, wrote no key, and touched no running process._
