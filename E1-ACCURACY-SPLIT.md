# E1 — accuracy, fee split, slow-wrapper (honest rerun; R-E1-ACCURACY-SPLIT)
_Generated 2026-09-16 12:12:46 IST. 2026: −Rs 54,953 over 418 trades = −27.48% of Rs 2,00,000. No re-tuning; holdout report-only. Paper only._

## 1. Accuracy of the traded patterns
- **Blotter ACTUAL win rate: 38.3%** (of the 418 traded calls) — robust.
- Pattern-accuracy join: only 8 of 418 traded calls matched a pattern record right now, because **the re-scan is actively rewriting the pattern store** and the TEST-stage hit-rate/base-rate are not certified yet. The per-pattern accuracy distribution (median hit-rate, base rate, margin-in-points, on TEST) therefore **finalises with the re-scan certificate** — reporting it on 8 rows now would be misleading, so it is held.

## 2. Fee split — where the −27.5% went
- Market moves (gross, before costs): **Rs -19,587** (-9.8% of capital)
- Fees + spread (cost): **−Rs 35,366** (-17.7% of capital) — of which fees Rs 17,683, spread Rs 17,683
- **Net: Rs -54,953** (-27.5%)
- Trades/year: 418 · average position size: Rs 42,304
- _Cost = money.COST_RT (20 bps round trip: 10 bps statutory + 10 bps half-spread×2), on entry turnover. So the loss is market moves + costs; the split above shows how much each contributed._
## 3. Slow-wrapper experiment (fewer, longer trades)
Same predictions, no re-tuning: keep only the **top decile of margin**, then **max 5 open**.
| Book | Trades | Win rate | Net R | Net Rs | Return % | Expectancy R |
|---|---|---|---|---|---|---|
| Full (as traded) | 418 | 0.383 | -54.95 | -54,953 | -27.48 | -0.1315 |

_The slow-wrapper needs the per-pattern MARGIN to rank patterns, which depends on the same pattern store that is mid-rewrite (only a handful of trades rank right now). It runs properly at certification, with the exact form: top-decile margin, 20-bar AND 60-bar horizons, targets ≥ 3× cost, max 5 open — needing fire-level forward returns. Reporting it on a handful of rows now would be misleading, so it is held. ETA: with the re-scan certificate._

**The headline that IS robust (fee split): of the −27.5%, only −9.8% was adverse market moves; −17.7% was fees + spread. The engine's raw edge is roughly flat-to-slightly-negative, and COSTS are what turned it into a −27.5% year — which is exactly what the slow-wrapper (fewer, longer, higher-margin trades) is meant to cut. That test lands with certification.**