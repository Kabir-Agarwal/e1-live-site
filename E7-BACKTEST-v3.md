# E7 BACKTEST v3 — trip-wired (real lots, real Zerodha cost, measured spread)
_Generated 2026-09-16 03:00:44 IST. Beside v1/v2. Paper only._

## Trip-wires (all 10 pass before any run — tests/test_e7_v3_tripwires.py)
real-lot notional · money.fo cost per leg · Corwin-Schultz per-bar spread · next-bar fills · synchronous legs + volume floors · edge-after-cost>0 gate · no leg reused · formula-only exits · holdout report-only · full-rupee blotter.

## Spread (trip-wire 3) — argued deviation
Historical bars carry NO bid/ask (trip-wire 3). The backtest estimates the per-bar effective spread with Corwin-Schultz (measured, never flat) — but on volatile 1-min bars CS OVERCHARGES liquid F&O (it conflates range with spread), so the with-spread figure is a conservative UPPER BOUND; the statutory-only figure is the reliable floor. LIVE uses the real quoted depth spread. A LEAD RULING on the backtest spread proxy is welcome.

## PARITY (done)
- Attempts 3567, win rate 0.031.
- Gross Rs 242,651 · real statutory cost Rs 1,752,666 · **net on statutory floor Rs -1,510,015** · (CS-spread upper bound: Rs -4,325,981).
- **Verdict: NEGATIVE on the reliable statutory-cost floor (gross Rs 242,651 vs statutory Rs 1,752,666); the real spread only widens the loss. Published as found.**
- Every call: reports/E7-BLOTTER-v3.csv (real lots, per-leg prices, statutory + spread split, net).

## Still to build (the continuation)
basis (cash-vs-futures, now that cash exists), conversion/reversal, box, butterfly, index-vs-basket, then the COMBINED BOOK. Blocked: calendar (near-month futures only), NSE/BSE cross-exchange (no BSE cash). AUDIT-4 auto-fires on v3 completion; live trading of an equation needs its AUDIT-4 pass.