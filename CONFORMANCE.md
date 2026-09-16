# CONFORMANCE — designed vs built (owner ruling R-E1-CONFORMANCE)

_Generated 2026-09-16 IST. **VERDICT RESET:** every engine verdict published so far — E1 "−27.5%",
E7 parity "FAILS", E4 "negative", "doesn't pay" — is re-labelled **"verdict on a SIMPLIFIED build; the
designed architecture is UNTESTED."** No verdict stands against an engine until its build is stamped
**CONFORMS** by the independent audit session, followed by one full audited backtest exactly as designed.
Live paper trading stays RECORD-ONLY until then. Paper only throughout._

Legend: **conforms** = built as designed, with a test · **partial** = some of it built · **missing** =
designed, not built · **wall** = blocked by data or this laptop's compute (stated, never hidden).

## E1 — equity patterns
| Designed (paper + rulings) | Built now (file · test) | Status |
|---|---|---|
| Per-pattern horizons + exits | `money.TEMPLATES` (stop1_tgt1.5 / stop1_tgt2 / time5); blotter uses them | **partial** — fixed templates, not per-pattern horizons; 20/60-bar slow-wrapper not in the backtest path |
| Trailing stop | `desk.manage_stop` (trailing) · test_desk | **partial** — in desk.py, MANAGEMENT-UNTESTED, NOT in the backtest path |
| Break-even move | `desk.manage_stop` · test_desk | **partial** — not in the backtest path |
| Partial profit-taking | `desk.manage_stop` (partial) · test_desk | **partial** — not in the backtest path |
| Overnight insurance (protective put) | `desk.carry_decision` · test_desk | **partial** — in desk.py, not in the backtest path |
| Pattern-first sizing (fractional-Kelly capped by own drawdown) | `desk.position_risk_rupees` · test_desk | **partial** — built, not in the backtest path (backtest sizes 1R flat) |
| Correlation-cluster sizing (trailing-250, weekly, cluster=one position) | — | **missing** (R-E1-THREE-ENGINE item 3, not built) |
| PCA "one-bet" alarm | — | **missing** |
| Book guard (book's worst daily DD) | `desk.book_guard` · test_desk | **partial** — built, not in the backtest path |
| Regime rulers #42/#43 | `regime.py` · test_regime | **conforms** (rulers only) |
| Per-regime + per-direction scorecards folded into certification | — | **missing** — the re-scan produces patterns; scorecards not wired |
| Three lights incl. real depth (moment) | `paper.three_lights` (moment fail-closed) | **partial** — real-depth moment is live-only |
| Two-key gate (builder cert + AUDIT-2) | `gate.py` · test_gate (5) | **conforms** |

## E7 — arbitrage
| Designed | Built now | Status |
|---|---|---|
| Put-call parity (futures-forward) | `backtest_e7_v3.backtest_parity` · test_e7_v3_tripwires, test_backtest_e7_v3 | **conforms** (as one equation) |
| Cash-vs-futures basis | — | **missing** (data present; not built) |
| Conversion / reversal | = parity signal | **partial** (verdict inherits parity; not a separate run) |
| Box spread | — | **missing** |
| Butterfly convexity | — | **missing** |
| Index-vs-basket | — | **missing** (needs constituent weights) |
| Calendar (near vs far future) | — | **wall** — only near-month futures ingested |
| Cross-exchange NSE/BSE | — | **wall** — no BSE cash for these names |
| Combined book (all equations/minute, best edge-after-cost first, no leg reused) | — | **missing** |
| Formula-only exits (bank/widen/time) | `arb_paper`, `v3_engine.exit_reason` · test_arb_paper | **conforms** |
| Ten trip-wires (real lots, money.fo cost, spread, next-bar, sync+liquidity, gate, no-reuse, exits, holdout, blotter) | `v3_engine` · test_e7_v3_tripwires (7) | **conforms** |
| Two-bound spread (FLOOR/UPPER) + live quoted-spread recording | `backtest_e7_v3`, `live_feed.record_spreads` · test_live_e7 | **conforms** |

## E4 — options
| Designed | Built now | Status |
|---|---|---|
| Implied vol from option prices | `bs.py` (BS + IV inversion) · bs demo | **conforms** |
| IV vs ERROR-BAND forecast (forecast + SE) | `vol_forecast` (forecast+SE) exists; backtest uses trailing realised vol | **partial** — error-band not wired into the backtest signal |
| Pre-trade cost gate | `backtest_e4` cost gate | **partial** — not yet on the money.fo F&O cost path (uses a fraction) |
| Defined-risk structures (credit vertical) | `backtest_e4` · test_backtest_e4 | **conforms** |

## Universe & cross-stock
| Designed | Built now | Status |
|---|---|---|
| All NSE stocks | 210 F&O names (cash `e1_1min_raw`) | **wall** — no cash history for non-F&O stocks |
| Cross-stock, all combos, all timeframes, no tiers | pair sweep 1/3/5-min, resumable | **partial/wall** — ~140/70,943 pairs; this laptop's compute (multi-day) |

## Plumbing
| Designed | Built now | Status |
|---|---|---|
| Ledger | `E1-BLOTTER.*`, `stats_perf` | **conforms** |
| Digest | `lead_digest.py` (/lead-digest.txt) | **conforms** |
| Alerts (3-emoji + dead-man + alarm page) | `notify`, `heartbeat`, `alarm.html`, MacroDroid | **conforms** |
| Public terminal site | `terminal/` → GitHub Pages | **conforms** |

## Build-to-design order (R-E1-CONFORMANCE §3), with the walls
1. **E1 desk rules INTO the backtest path** — per-pattern exits, trailing, break-even, partial,
   insurance-put carry, pattern-first sizing, correlation-cluster sizing + PCA alarm, book guard,
   per-regime + per-direction scorecards. (The biggest gap: desk.py exists but the backtest path uses
   flat templates + flat 1R.)
2. **E7** — basis, conversion/reversal, box, butterfly, index-vs-basket, then the combined book.
3. **E4** — IV-vs-error-band forecast signal + the money.fo cost gate.
Walls stated, not closed: all-NSE cash history (absent), minute-pair compute (this laptop), calendar
(near-month futures only), NSE/BSE (no BSE cash).

## Gate to the first real verdicts
Only after the audit session stamps an engine **CONFORMS** does ONE full backtest run exactly as
designed (every call, holdout report-only, costs-vs-market split, by regime) with an independent audit —
those are the first verdicts. Until then, live is RECORD-ONLY.
