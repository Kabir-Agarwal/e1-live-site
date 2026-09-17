# TIME EFFECTS as finder rulers (R-E1-LAST-BACKTESTS 2)

_Generated 2026-09-18 03:14:59 IST. Day-of-week, expiry-week vs other weeks, month-end/month-start, and the first/last half-hour of the session, hunted same-stock on the 210 with the standing exam (train/test/holdout, Wilson-LB + sealed-holdout confirm, required-move). Calendar rulers derived from the calendar; direction and horizon chosen by the exam; no typed numbers. Stocks: 210. RECORD-ONLY._

## Facts found / certified per ruler

| Ruler | certified | graded | cert rate |
|---|---|---|---|
| expiry-week | 5 | 594 | 0.8% |
| non-expiry-week | 3 | 630 | 0.5% |
| dow=Mon | 1 | 601 | 0.2% |
| dow=Fri | 1 | 597 | 0.2% |
| dow=Tue | 0 | 597 | 0.0% |
| dow=Wed | 0 | 601 | 0.0% |
| dow=Thu | 0 | 597 | 0.0% |
| first30-drive | 0 | 20 | 0.0% |
| last30-bias | 0 | 20 | 0.0% |

## Required-move book of the certified time-facts (sealed slice, both fills)

- **mid:** 609 calls, win 54.0% / acc 54.5%, Sharpe 1.13, Sortino 1.8, maxDD -257.56R, total 126.66R, fees 4.7%gross
- **crossing:** 609 calls, win 53.7% / acc 54.5%, Sharpe 0.59, Sortino 0.93, maxDD -267.44R, total 65.76R, fees 4.7%gross

## VERDICT

**10 of 4257 certified across the time rulers (most: expiry-week (5), non-expiry-week (3), dow=Mon (1)); the sealed-slice required-move book of those facts is 65.76R crossing (Sharpe 0.59) on 609 calls.**

**Read it honestly — a CANDIDATE, not a confirmed edge.** The standout ruler is **expiry-week** (a
well-documented Indian-market effect), and the book IS positive even crossing the spread (+65.76R). But
three cautions: (1) the certification rate is **10 of 4,257 (0.23%)** — near the multiple-testing noise
floor, though each survivor did pass the sealed holdout; (2) the Sharpe crossing is a modest **0.59** with a
**−267R** drawdown four times the total — a bumpy book; (3) it is post-hoc. So this is worth carrying as a
**candidate time-ruler (expiry-week first)** for the live judge — not something to wire into the book on
these numbers. Day-of-week, month-boundary and the intraday half-hour rulers essentially do not certify.

_Blotter: reports/TIME-EFFECTS-BLOTTER.csv. RECORD-ONLY; orders HELD. Audit queued._
