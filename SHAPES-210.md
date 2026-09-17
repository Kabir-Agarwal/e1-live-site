# SHAPES ON THE FULL 210 (R-E1-LAST-BACKTESTS 3)

_Generated 2026-09-18 02:59:31 IST. The three price-action shapes rerun on ALL 210 stocks (the 24-stock sample is superseded), 15/60-min bars, standing exam (train/test/holdout, Wilson-LB + sealed-holdout confirm, required-move). RECORD-ONLY._

## Counts (full 210)

| Shape | passed | graded | pass rate |
|---|---|---|---|
| sweep-and-reverse | 0 | 2486 | 0.0% |
| order-block | 0 | 2520 | 0.0% |
| breakout-after-consolidation | 2 | 2115 | 0.09% |

Total: **2 passes / 7121 gradings** (0.03%).

## VERDICT

**Essentially NO edge. 2 of 7121 (stock×window×horizon) gradings survive the sealed holdout + required-move — a pass rate at the multiple-testing noise floor. sweep-and-reverse and order-block pass ZERO; breakout-after-consolidation registers 2 survivor(s), too few to be a real, tradeable family (the shapes hit ~44-45% directionally, below chance). The three shapes are not a source of edge.**

## Registered survivors

| token | shape | tf(min) | lookback | horizon | test LB | holdout hit |
|---|---|---|---|---|---|---|
| 1102337 | breakout-after-consolidation | 60 | 20 | 5 | 0.605 | 0.607 |
| 1895937 | breakout-after-consolidation | 60 | 40 | 10 | 0.602 | 0.529 |

_Blotter/registry: reports/SHAPE-REGISTRY.csv. RECORD-ONLY; orders HELD. Audit queued._
