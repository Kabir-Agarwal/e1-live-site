# E9 — PAIRS (stretch-and-snap on F&O futures) (R-E9-PAIRS)

_Generated 2026-09-18 01:22:56 IST. Pairs formed by MEASURED co-movement (walk-forward return correlation, top decile) on the F&O futures + each name vs the NIFTY index (the sector-map file on disk is empty, so measured co-movement is the ring). Spread = log(a)−log(b); entry when |z| clears the pair's OWN trailing 90th-pctl |z| (measured, PIT), fade the stretch, exit on the snap to its 50th pctl or a 20-bar cap; future/future legs; two-leg futures cost charged; walk-forward, sealed 2nd-half slice; both fills; no typed numbers. RECORD-ONLY._

Universe: 90 futures. Co-movement pairs (top decile): 389; index pairs: 90.

## Result (both fills)

- **mid:** 1426 calls (1035.5/yr), win 61.2% / acc 62.1%, Sharpe -1.79, Sortino -2.09, CAGR None%, PF 0.82, maxDD -810.41R, total -704.64R, fees 8.1%gross
- **crossing:** 1426 calls (1035.5/yr), win 60.0% / acc 62.1%, Sharpe -2.51, Sortino -2.95, CAGR None%, PF 0.75, maxDD -1068.41R, total -989.84R, fees 8.1%gross
- pair-accuracy persistence (non-overlap, 1st→2nd half): 0.594→0.575 (n=1426)

## VERDICT

**loses — crossing -989.8R (mid -704.6R); pairs mean-reversion does not pay after two-leg futures cost.**

_Blotter: reports/E9-PAIRS-BLOTTER.csv. RECORD-ONLY; orders HELD. Audit queued._
