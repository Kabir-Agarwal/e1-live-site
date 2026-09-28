# SLOW INDEX/SECTOR TREND WITH CARRY (R-E1-SLOW-TREND)

_Generated 2026-09-18 01:28:22 IST. Long-while-positive trend-following on the broad + sector indices in the store. The trend horizon is chosen by the machine's OWN persistence scan (a candidate grid searched on the training half; the horizon with the best follow-through is picked per index — no named lookback). Position via the near-month future where one exists, else the index level (labelled); carry charged per roll. Walk-forward, sealed 2nd-half slice, both fills, no typed numbers. RECORD-ONLY._

Indices: 16 (4 with a near-month future; the rest traded on the index level with carry charged, labelled).

## Result (both fills)

- **mid:** 72 calls (96.7/yr), win 27.8% / acc 34.7%, Sharpe -0.28, Sortino -0.65, CAGR -14.2%, PF 0.92, maxDD -42.73R, total mid -10.76R / cross —R, fees 14.7%gross
- **crossing:** 72 calls (96.7/yr), win 25.0% / acc 34.7%, Sharpe -0.75, Sortino -1.68, CAGR -36.2%, PF 0.8, maxDD -48.53R, total mid -28.46R / cross —R, fees 14.7%gross
- trend-accuracy persistence (non-overlap, 1st→2nd half): 0.117→0.32 (n=72)

## VERDICT

**loses — crossing -28.5R (mid -10.8R); slow index trend-follow does not clear carry on the sealed slice.**

## Per index (chosen horizon, vehicle, crossing R)

| Index | vehicle | chosen H | train follow-through | calls | crossing R |
|---|---|---|---|---|---|
| NIFTY_METAL | index-level | 120 | 0.761 | 2 | 28.5 |
| NIFTY_SMLCAP_250 | index-level | 40 | 0.531 | 2 | 11.1 |
| NIFTY_PHARMA | index-level | 120 | 0.657 | 10 | 10.56 |
| NIFTY_AUTO | index-level | 60 | 0.786 | 4 | 7.66 |
| NIFTYIT | index-level | 10 | 0.525 | 11 | -1.08 |
| NIFTY_PSU_BANK | index-level | 120 | 0.712 | 3 | -2.23 |
| NIFTY_ENERGY | index-level | 120 | 0.541 | 6 | -2.99 |
| MIDCPNIFTY | future | 120 | 0.773 | 5 | -4.99 |
| NIFTY100 | index-level | 120 | 0.848 | 1 | -6.93 |
| NIFTY | future | 120 | 0.896 | 1 | -7.44 |
| NIFTY200 | index-level | 120 | 0.836 | 4 | -8.15 |
| NIFTY_FMCG | index-level | 40 | 0.524 | 6 | -8.33 |
| BANKNIFTY | future | 120 | 0.939 | 1 | -8.54 |
| FINNIFTY | future | 120 | 0.797 | 3 | -10.07 |
| NIFTY_MIDCAP_100 | index-level | 120 | 0.773 | 9 | -11.88 |
| NIFTY_PVT_BANK | index-level | 120 | 0.847 | 4 | -13.65 |

_Blotter: reports/SLOW-TREND-BLOTTER.csv. RECORD-ONLY; orders HELD. Audit queued._
