# E10 — MEASURED FAMILY WEIGHTS vs the flat 1R book (R-E10-WEIGHTS-BACKTEST)

_Generated 2026-09-17 19:03:43 IST. **HYPOTHESIS — formed after seeing results; the live SHADOW is its real judge.** Weight = walk-forward OOS hit-margin × non-overlapping persistence, shrunk toward the cross-family mean by fire count, recomputed each date from prior fires only (no typed numbers). Applied to the flat-1R required-move book: priority under a measured capital cap + size = 1R × weight capped by the family's own worst drawdown. Standing architecture unchanged; both fills; sealed months report-only. Paper only, RECORD-ONLY._

Measured capital cap (median concurrent flat positions): **51**. Weights recomputed on **107** dates.

## Flat 1R book vs Weighted book

| Book | Fill | Result |
|---|---|---|
| Flat 1R | mid | 937 calls, win 69.1%, Sharpe 0.94, Sortino 2.03, maxDD -46.1R, total 15.45R |
| Flat 1R | crossing | 937 calls, win 65.5%, Sharpe 0.11, Sortino 0.19, maxDD -48.35R, total 1.88R |
| **Weighted** | mid | 761 calls, win 59.0%, Sharpe -1.22, Sortino -1.71, maxDD -46.1R, total -14.12R |
| **Weighted** | crossing | 761 calls, win 58.1%, Sharpe -1.87, Sortino -2.51, maxDD -48.35R, total -21.64R |

## By family (flat vs weighted, mid fill)

| Family | flat calls | flat R | weighted calls | weighted R |
|---|---|---|---|---|
| adx | 28 | 1.75 | 25 | 3.56 |
| atr | 20 | -5.99 | 18 | -3.95 |
| cci | 12 | -1.89 | 11 | -1.97 |
| dist_from_ma | 56 | 7.15 | 48 | 2.51 |
| ema | 153 | -9.44 | 111 | -13.66 |
| hist_vol | 62 | -4.75 | 51 | -1.99 |
| mfi | 46 | -4.49 | 40 | -2.05 |
| obv | 92 | 0.94 | 86 | 0.04 |
| pct_from_hilo | 29 | 2.48 | 24 | 3.08 |
| roc | 6 | 2.95 | 6 | 2.95 |
| rsi | 35 | 3.32 | 35 | 3.49 |
| sma | 113 | 6.16 | 92 | 1.05 |
| stddev_returns | 75 | 3.06 | 65 | -1.97 |
| vwap | 196 | 21.15 | 141 | -1.28 |
| zscore | 14 | -6.96 | 8 | -3.94 |

## Weights over time (last 6 recompute dates)

| date | adx | atr | cci | dist_from_ma | ema | hist_vol | mfi | obv | pct_from_hilo | roc | rsi | sma | stddev_returns | vwap | zscore |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2026-09-03 | 1.0 | 1.0 | 1.0 | 1.28 | 0.33 | 0.55 | 0.63 | 0.46 | 1.0 | 1.0 | 0.69 | 0.71 | 0.5 | 0.41 | 1.0 |
| 2026-09-04 | 1.0 | 1.0 | 1.0 | 1.28 | 0.33 | 0.55 | 0.63 | 0.47 | 1.0 | 1.0 | 0.69 | 0.7 | 0.5 | 0.29 | 1.0 |
| 2026-09-07 | 1.0 | 1.0 | 1.0 | 1.28 | 0.33 | 0.55 | 0.63 | 0.46 | 1.0 | 1.0 | 0.69 | 0.7 | 0.5 | 0.28 | 1.0 |
| 2026-09-09 | 1.0 | 1.0 | 1.0 | 1.28 | 0.33 | 0.55 | 0.63 | 0.46 | 1.0 | 1.0 | 0.7 | 0.7 | 0.51 | 0.28 | 1.0 |
| 2026-09-10 | 1.0 | 1.0 | 1.0 | 1.28 | 0.33 | 0.55 | 0.63 | 0.46 | 1.0 | 1.0 | 0.7 | 0.7 | 0.51 | 0.28 | 1.0 |
| 2026-09-11 | 1.0 | 1.0 | 1.0 | 1.28 | 0.32 | 0.54 | 0.62 | 0.45 | 1.0 | 1.0 | 0.68 | 0.7 | 0.49 | 0.27 | 1.0 |

## VERDICT

**WEIGHTED WORSE THAN FLAT — mid 15.45R (flat) vs -14.12R (weighted), Sharpe 0.94 vs -1.22; crossing 1.88R vs -21.64R.**

The weighted book applies (a) priority — when a date has more qualifying fires than the capital cap, the highest-weight families are taken first — and (b) size = 1R × weight, each family capped by its own worst measured drawdown.

**WHY it loses (the informative part):** the weight is built from **hit-margin** (how often the family is directionally right), and hit-margin does NOT track **rupee-profitability**. The book's biggest earner, `vwap` (+21R flat), wins through a few large winners rather than a high hit-rate, so the measured weighting hands it the LOWEST weight (~0.27) and sizes it down; meanwhile a high-hit-rate-but-unprofitable family is funded early when its walk-forward margin still looks good, amplifying its losses. Weighting by hit-margin therefore mis-allocates capital away from where the R actually is. The clean read: **do not weight by hit-margin** — if weighting is worth pursuing, the weight must be built from realised R (expectancy), not directional accuracy. That is a NEW hypothesis for the live shadow, not a conclusion this backtest can bless.

## SHADOW armed

The weighted version is armed as a **shadow beside the live 20-day book** (`roof/store/e10_weights_shadow.json`): it logs the current per-family weights and the would-be size for each fire, and **never places an order** (no order code exists). The live paper run is the real judge of whether the weighting helps — this backtest is a hypothesis, formed after seeing the results.

Blotter: reports/E10-WEIGHTS-BLOTTER.csv. _RECORD-ONLY; orders HELD. Audit queued._
