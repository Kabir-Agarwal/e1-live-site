# E1 — TWO WEIGHTS vs flat: NORMAL and INVERSE per-family sizing (R-E1-TWO-WEIGHTS)

_Generated 2026-09-17 20:16:26 IST. On the flat required-move book, two condition-based per-pattern-family sizings, walk-forward from the start on the sealed months. NORMAL = OOS hit-margin (shrunk by fire count, capped by the family's worst drawdown; accurate → larger); INVERSE = the same measure inverted (accurate → smaller). size = 1R × weight, priority under the measured capital cap (51), both fills. Weights recomputed on 107 dates. Patterns condition-based; NO stock selection. **HYPOTHESIS — the live shadow is the judge.** RECORD-ONLY._

## Flat vs NORMAL vs INVERSE

| Book | Fill | Result |
|---|---|---|
| Flat 1R | mid | 777 calls, win 69.0%, Sharpe 0.57, Sortino 1.2, maxDD -46.1R, total 8.48R |
| Flat 1R | crossing | 777 calls, win 66.0%, Sharpe -0.18, Sortino -0.31, maxDD -48.35R, total -2.75R |
| NORMAL | mid | 765 calls, win 69.0%, Sharpe -0.48, Sortino -0.75, maxDD -46.1R, total -5.79R |
| NORMAL | crossing | 765 calls, win 66.0%, Sharpe -1.19, Sortino -1.65, maxDD -48.35R, total -14.4R |
| INVERSE | mid | 774 calls, win 68.7%, Sharpe 0.34, Sortino 0.58, maxDD -46.1R, total 4.9R |
| INVERSE | crossing | 774 calls, win 66.3%, Sharpe -0.38, Sortino -0.59, maxDD -48.35R, total -5.6R |

_All three books run under the SAME measured capital cap (priority selection), so "Flat 1R" here is the capped-flat baseline — it differs from the uncapped required-move headline (+1.88R crossing) because the cap drops the overflow fires. The apples-to-apples question is only: does weighting beat flat under the same cap? It does not._

## By family (total R, mid fill)

| Family | flat calls | flat R | NORMAL R | INVERSE R |
|---|---|---|---|---|
| adx | 28 | 3.25 | 2.35 | 2.32 |
| atr | 20 | -3.37 | -3.95 | -3.37 |
| cci | 12 | -1.97 | -1.89 | -1.89 |
| dist_from_ma | 56 | 2.29 | 3.21 | 1.88 |
| ema | 153 | -8.75 | -9.65 | -12.09 |
| hist_vol | 62 | -5.07 | -3.65 | -5.74 |
| mfi | 46 | -4.85 | -2.23 | -4.23 |
| obv | 92 | 0.0 | 0.61 | -0.15 |
| pct_from_hilo | 29 | 3.07 | 3.08 | 3.07 |
| roc | 6 | 2.95 | 2.95 | 2.95 |
| rsi | 35 | 3.04 | 2.73 | 4.79 |
| sma | 113 | 5.2 | 1.79 | 0.25 |
| stddev_returns | 75 | -0.81 | -1.09 | -0.76 |
| vwap | 196 | 16.43 | 3.9 | 18.77 |
| zscore | 14 | -2.92 | -3.94 | -0.89 |

## Weights over time (last 6 recompute dates; (NORMAL, INVERSE) per family)

| date | adx | atr | cci | dist_from_ma | ema | hist_vol | mfi | obv | pct_from_hilo | roc | rsi | sma | stddev_returns | vwap | zscore |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-09-03 | (1.0, 1.0) | (1.0, 1.0) | (1.0, 1.0) | (0.97, 0.91) | (0.49, 0.49) | (0.57, 0.57) | (0.66, 1.12) | (0.49, 1.13) | (1.0, 1.0) | (1.0, 1.0) | (1.99, 0.56) | (0.71, 0.5) | (0.68, 1.0) | (0.42, 0.66) | (1.0, 1.0) |
| 2026-09-04 | (1.0, 1.0) | (1.0, 1.0) | (1.0, 1.0) | (0.99, 0.89) | (0.49, 0.49) | (0.57, 0.57) | (0.66, 1.11) | (0.49, 1.13) | (1.0, 1.0) | (1.0, 1.0) | (2.06, 0.54) | (0.7, 0.5) | (0.69, 1.0) | (0.3, 0.64) | (1.0, 1.0) |
| 2026-09-07 | (1.0, 1.0) | (1.0, 1.0) | (1.0, 1.0) | (0.99, 0.89) | (0.49, 0.49) | (0.57, 0.57) | (0.66, 1.11) | (0.49, 1.13) | (1.0, 1.0) | (1.0, 1.0) | (2.06, 0.54) | (0.7, 0.5) | (0.69, 1.0) | (0.3, 0.66) | (1.0, 1.0) |
| 2026-09-09 | (1.0, 1.0) | (1.0, 1.0) | (1.0, 1.0) | (0.99, 0.89) | (0.49, 0.49) | (0.57, 0.57) | (0.66, 1.11) | (0.53, 1.13) | (1.0, 1.0) | (1.0, 1.0) | (2.06, 0.54) | (0.7, 0.5) | (0.69, 1.0) | (0.3, 0.63) | (1.0, 1.0) |
| 2026-09-10 | (1.0, 1.0) | (1.0, 1.0) | (1.0, 1.0) | (1.0, 0.89) | (0.49, 0.49) | (0.57, 0.57) | (0.66, 1.11) | (0.53, 1.13) | (1.0, 1.0) | (1.0, 1.0) | (2.06, 0.54) | (0.7, 0.5) | (0.69, 1.0) | (0.29, 0.63) | (1.0, 1.0) |
| 2026-09-11 | (1.0, 1.0) | (1.0, 1.0) | (1.0, 1.0) | (0.86, 0.96) | (0.49, 0.49) | (0.57, 0.57) | (0.66, 1.1) | (0.53, 1.13) | (1.0, 1.0) | (1.0, 1.0) | (2.06, 0.53) | (0.7, 0.49) | (0.7, 1.0) | (0.29, 0.63) | (1.0, 1.0) |

## VERDICT

**On the crossing (honest) fill: flat -2.75R, NORMAL -14.40R, INVERSE -5.60R. Best in backtest: FLAT. But this is a hypothesis formed after seeing results — ADOPT NOTHING without a live margin beyond noise; both weightings are armed as logged shadows beside the live book for a weekly live comparison vs flat.**

## Shadows armed

Both weightings are armed as **logged shadows** beside the live 20-day book (`roof/store/e1_two_weights_shadow.json`): each fire records what NORMAL and INVERSE WOULD have sized, and a **weekly live comparison vs flat** accrues. **Adopt nothing without a live margin beyond noise.** Neither shadow ever places an order (no order code exists).

_HYPOTHESIS, post-hoc. Blotter: reports/E1-TWO-WEIGHTS-BLOTTER.csv (NORMAL book). RECORD-ONLY; orders HELD. Audit queued._
