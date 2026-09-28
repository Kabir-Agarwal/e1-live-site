# E11 VARIANT C — VOLATILITY-TARGETED SIZING (R-E1-VOL-SIZING)

_Generated 2026-09-18 01:25:16 IST. Size each qualified fire so its expected daily rupee swing is EQUAL across positions: weight ∝ 1/vol (trailing realised vol, PIT), capped by the family's own worst drawdown. Same capital cap (51) as FLAT; both fills; walk-forward; no typed numbers. HYPOTHESIS — the live shadow judges. RECORD-ONLY._

## FLAT vs VOL-TARGET

| Book | Result |
|---|---|
| FLAT 1R | 775 calls, win 69.2% / acc 52.6%, Sharpe 0.37, Sortino 0.82, CAGR 16.7%, PF 1.03, maxDD -45.08R, total mid 5.49R / cross -5.72R, fees 67.1%gross |
| VOL-TARGET | 769 calls, win 68.7% / acc 50.8%, Sharpe -0.91, Sortino -1.22, CAGR -28.1%, PF 0.93, maxDD -34.71R, total mid -10.01R / cross -17.67R, fees None%gross |

## By family (total R, mid)

| Family | flat calls | flat R | vol-target R |
|---|---|---|---|
| adx | 28 | 1.62 | 1.95 |
| atr | 20 | -2.79 | -4.65 |
| cci | 12 | -1.89 | -2.01 |
| dist_from_ma | 56 | 1.99 | 2.87 |
| ema | 153 | -10.35 | -9.19 |
| hist_vol | 62 | -7.77 | -3.23 |
| mfi | 46 | -4.3 | -3.71 |
| obv | 92 | 0.4 | -0.71 |
| pct_from_hilo | 29 | 3.07 | 3.28 |
| roc | 6 | 2.95 | 1.87 |
| rsi | 35 | 3.34 | 2.2 |
| sma | 113 | 5.35 | -2.42 |
| stddev_returns | 75 | -0.61 | -2.17 |
| vwap | 196 | 17.97 | 11.77 |
| zscore | 14 | -3.49 | -5.86 |

## Per-family WHY (vol-target)

| Family | fires | wins | avg win R | avg loss R | total R | top-5 share | avg weight | why |
|---|---|---|---|---|---|---|---|
| vwap | 169 | 115 | 0.349 | -0.526 | 11.77 | 40.0% | 0.66 | broad small edge |
| pct_from_hilo | 21 | 19 | 0.274 | -0.964 | 3.28 | 57.0% | 0.88 | broad small edge |
| dist_from_ma | 49 | 36 | 0.301 | -0.612 | 2.87 | 150.0% | 0.75 | carried by a few big winners |
| rsi | 35 | 27 | 0.202 | -0.406 | 2.2 | 108.0% | 0.72 | carried by a few big winners |
| adx | 25 | 20 | 0.234 | -0.545 | 1.95 | 102.0% | 0.82 | carried by a few big winners |
| roc | 6 | 6 | 0.312 | 0.0 | 1.87 | 97.0% | 0.63 | carried by a few big winners |
| obv | 84 | 66 | 0.246 | -0.941 | -0.71 | None% | 0.8 | losers outweigh the winners after cost |
| cci | 11 | 7 | 0.254 | -0.949 | -2.01 | None% | 0.86 | losers outweigh the winners after cost |
| stddev_returns | 64 | 41 | 0.266 | -0.568 | -2.17 | None% | 0.64 | losers outweigh the winners after cost |
| sma | 86 | 57 | 0.272 | -0.619 | -2.42 | None% | 0.64 | losers outweigh the winners after cost |
| hist_vol | 43 | 26 | 0.187 | -0.476 | -3.23 | None% | 0.51 | losers outweigh the winners after cost |
| mfi | 39 | 27 | 0.347 | -1.09 | -3.71 | None% | 1.04 | losers outweigh the winners after cost |
| atr | 17 | 9 | 0.268 | -0.883 | -4.65 | None% | 0.94 | losers outweigh the winners after cost |
| zscore | 11 | 4 | 0.396 | -1.064 | -5.86 | None% | 1.02 | losers outweigh the winners after cost |
| ema | 109 | 68 | 0.106 | -0.399 | -9.19 | None% | 0.34 | losers outweigh the winners after cost |

## VERDICT

**VOL-TARGET loses to FLAT: crossing -17.67R vs -5.72R, Sharpe -0.91 vs 0.37, CAGR -28.1% vs 16.7%. HYPOTHESIS; armed as a third logged shadow beside the live book; adopt only on a live margin beyond noise.**

Armed as a **third logged shadow** beside the live 20-day book (`roof/store/e11_vol_sizing_shadow.json`), alongside E11-NORMAL and E11-INVERSE. **Adopt nothing without a live margin beyond noise.** The shadow never places an order.

_Blotter: reports/E11-VOL-SIZING-BLOTTER.csv. RECORD-ONLY; orders HELD. Audit queued._
