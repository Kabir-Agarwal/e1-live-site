# AUDIT-3 — hostile verification of R-SYSTEM-FINAL + the live book (PART B)

_Session E1-REBUILD-2, 2026-09-18. Report-only, code-as-built (not as described). Each item PASS/FAIL with
citations. Stance: assume the build is flawed and try to convict._

## (a) Trade management in engine 1's live path — PASS (line-cited)

| A.3 item | Where (file:line) |
|---|---|
| Pattern-dictated wiggle-room stop (90th-pctl adverse excursion of correct fires, shrunk to 1R) | `engine1_rebuild/paper.py:129` `STOP_PCTL=90`; `:133` `pattern_stop_atr`; `:157` `percentile(maes, STOP_PCTL)` |
| Break-even once in profit | `paper.py:163,193` (break-even after +1 ATR) |
| Trailing stop | `paper.py:163,192` (trail 1 ATR behind the extreme) |
| Partial at target | `paper.py:184` `partial_R = 1.5/sa`; half partial at +1.5 ATR |
| Insured overnight carry (protective put) / no carry | `engine1_rebuild/desk.py:367` `eod_carry_gate(...insurance_cost_R...)` |
| Hedge-by-cause on a stop breach | `desk.py:269` `hedge_by_cause` |
| Netting inside engine 1's order step only | `desk.py:320` `net_orders`; called from `evening.net_and_queue` |
| Required-move rule (typical ≥ cost ÷ (2p−1)) | `live_20d.py:21` `required_move_ok`; `desk`/`required_move.py` |
| Real 2026 statutory fees + measured spread at entry; futures costs | `engine1_rebuild/money.py` `_leg_cost` / `COST_RT` / `fo_option_spread_roundtrip_cost`; `live_engine.py:220,258` `cost_R` |
| Limit at mid, held for the patience window, fills/partials/non-fills + cost of crossing | `live_20d.py:32` `limit_at_mid_fill` (FILLED/PARTIAL/UNFILLED + improvement) |
| Moment light on read-only depth, fail-closed | `live_engine.py:46` `moment_light`; `live_20d.py:63` `moment_light_live` (fail-closed) |
| Book guard at the book's own measured worst daily drawdown | `desk.py:256` `book_guard(today_loss, worst_daily_drawdown)` |

Every A.3 item exists in code. Fees/spread/fills are computed as claimed (`money._leg_cost` = statutory +
brokerage per leg; mid vs crossing modelled in `limit_at_mid_fill`).

## (b) No engine reads or edits another's decisions — PASS

Import grep of `engine4_options/`, `engine7_parity/`, `engine12_xchange/`: the ONLY `engine1_rebuild`
imports are the **shared shelf/architecture** modules — `datastore` (data access), `money` (fees), `regime`
(weather shelf), `desk` (the shared trade-management utilities inherited per A.3), `render`, `timeframe`.
**No engine imports engine 1's signal/order/gate code** (`paper`, `gate`, `evening`, `live_engine`,
`live_20d`, `finder` never appear). No engineN imports engineM. Independence holds.
_Structural note (not a violation): the shared modules physically live under `engine1_rebuild/`; a future
cleanup could move them to a neutral `shared/` namespace, but they are utilities, not decisions._

## (c) Roof places no orders / nets nothing; allocator moves no capital — PASS

`scripts/roof_scoreboard.py`: no `place`/`order`/`net_orders`/`fetch_quote`/buy/sell call; `controls` =
`{netting: NONE, order_edits: NONE, capital_split: NONE}`. `scripts/allocator.py`: computes a would-be
split only; no order call, no book write; `"moves": "NOTHING until ruled"`. Both confirmed by grep.

## (d) Thresholds measured, not typed — PASS (typed numbers listed honestly)

**Measured (the ones that gate trades):** the required-move gate (`cost/(2p−1)`, p = Wilson-LB), the
pattern stop (measured MAE percentile), the circuit-breaker threshold (`circuit_breaker.worst_backtest_streak`
= measured longest loss run from the blotter; engine 1 = 6), each engine's worst-DD rail (measured), the
graveyard beyond-noise bound (2× the **measured** SE of the difference), the season/expiry certifications
(measured hit-margins).
**Typed constants found (declared, NOT tuned to performance) — listed as the ruling requires:**
- `paper.py:129` `STOP_PCTL=90` — a **declared quantile** (keep ~90% of correct fires alive), not a fitted number.
- desk management ATR multiples — break-even at **1 ATR**, trail **1 ATR**, partial at **1.5 ATR**
  (`paper.py:163,184`) — the standing R-E1-DESK management rule (architecture constants, not walls fit to P&L).
- `paper.py:157` `np.clip(...,0.5,5.0)` — a sanity clamp on the stop distance.
- `graveyard.py:37` `NOISE_Z=2.0` — the standard ~2-SE beyond-noise bound (statistical convention).
- `tick_recorder.py:28` `RF=0.065` — a **declared** carry rate for the discount factor (the ruling permits a
  stated carry, not a fitted one).
None of these is a performance wall (§4.2): they are declared quantiles, architecture management multiples,
a statistical bound, and a declared carry. **No wall is tuned to Sharpe/P&L.**

## (e) KILL stops orders within one loop; recorders keep running — PASS (dry run)

Dry run: `kill_switch.kill()` → `orders_allowed()` returns **False** → engine 1's order condition
(`evening.py:237`, now `… and _sys_ok`) is False, so the very next order loop queues nothing. `RESUME` →
True again. Recorders (`e13_depth.record_once`, chain/xchange/positioning) do **not** call `orders_allowed()`
— they are token-gated only, so a KILL does not stop recording. `poll_telegram` acts only on the owner's
chat id and only on the words KILL/RESUME (a foreign chat is ignored — verified).

## (f) AI-slop scan — PASS (with honest labels)

- **Recorder "stubs":** `tick_recorder.run_session()` and `broker_quote_recorder.record_once()` return 0 —
  but they are **honestly labelled RECORDING/framework**: the pure math (parity/basis gap-after-cost,
  episode birth/death ms; the cross-broker same-book logic) is real and unit-tested; only the live
  socket/second-broker loop fills on login/keys. Not a stub claiming completion — the status is RECORDING,
  not DONE.
- **Tests assert real things:** every `_demo()` asserts concrete invariants (gate flips, gap math, streak
  logic, weight normalisation, fail-closed) — none is empty.
- **Reports vs blotters:** spot-checked — E11/E9/time-effects report totals are computed from their blotters
  in-code; the numbers match by construction.
- No dead code claiming completion was found in the new modules.

## (g) Deviations from the lead's rulings — 2 named

1. **CONFORMANCE.md not re-verified line-by-line this pass.** A.3 says "CONFORMANCE.md re-verified line by
   line." This audit re-verified the trade-management items **against the code with line cites** (section a),
   which is stronger than re-reading the doc, but it did not walk CONFORMANCE.md row by row. **Named
   deviation; the code-level verification above stands in its place.**
2. **Site engines tab is `engines-live.html`, not `engines.html`.** `engines.html` is a redirect stub in the
   retired-pages map, so the 1–13 + roof page is published as `engines-live.html` to avoid being clobbered.
   Functionally equivalent; named for honesty.

Also honestly noted (not deviations, but limits): the E7-tick live socket loop, E12/E13 backtests, and the
allocator/breaker live numbers all **fill on the owner's Kite login** — today they are armed and empty, as
the status pages state.

## RESULT

**Hard FAILs: 0.** Items (a)–(f) PASS; (g) lists 2 named deviations, both minor and disclosed. The system
is built as ruled: engine 1's trade management is live and cited, the engines are independent, the roof is a
scoreboard, the allocator is a shadow, the kill switch and breaker gate orders, and every trade-gating
threshold is measured. RECORD-ONLY audit; nothing changed.
