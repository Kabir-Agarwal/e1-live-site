# E7 BACKTEST v2 — parity arbitrage, the AUDIT-3 fixes applied
_Generated 2026-09-16 00:33:00 IST. Beside v1 (reports/E7-BACKTEST.json). Paper only; simulated from the ingested AmiBroker F&O 1-minute history._

## What changed from v1 (all AUDIT-3 findings)
- **Dividend bias fixed at the root:** parity is priced off the SYNCHRONOUS FUTURE, `C − P = (F − K)·e^(−rT)`. The future already carries the market's dividend + carry, so nothing is estimated. (This supersedes a dividend yield read from the corporate-actions archive — the market forward is exact where v1's spot-minus-omitted-dividend was systematically biased.)
- **Next-bar fills** (v1 filled on the signal bar).
- **Costs from money.py only:** 2 × `COST_RT` (both legs, round trip) = 0.40%.
- **Pre-trade cost gate:** enter only when the gap beats total cost by a cushion.
- **Liquidity filter:** both legs must trade in the SAME minute, each above its own measured minute-volume floor; the future must trade too.

## Coverage
- Underlyings traded (have a synchronous future): **14**
- Skipped (no future forward, and no cash spot exists): ASTRAL, BANKEX, CRUDEOILM, GMRAIRPORT, GRASIM, JUBLFOOD, NATGASMINI, NAUKRI, OIL, SBICARD, SILVERM, SOLARINDS, SONACOMS, SUZLON, TRENT, ZYDUSLIFE
- Synchronous parity-minutes examined: 36,301
- Passed the cost + liquidity gate (paper attempts): 1,500

## Result
- Calls: **1500** · win rate **0.041** · profit factor **0.014** · expectancy **-0.3827 R**
- Net **-574.1 R** · max drawdown **573.82 R**

### Costs vs market (where the money went)
- Gross from the market (before costs): Rs 25,899.91
- Costs paid (money.py): Rs 600,000.0
- **Net after costs: Rs -574,100.09**

### By regime
| Regime | Calls | Total R |
|---|---|---|
| bearish/normal | 108 | -45.27 |
| bearish/wild | 105 | -44.46 |
| bullish/calm | 240 | -93.56 |
| bullish/normal | 356 | -142.26 |
| bullish/wild | 92 | -38.13 |
| sideways/calm | 372 | -121.37 |
| sideways/normal | 227 | -89.06 |

**Verdict:** negative after real costs (published as found; no re-tuning)

Every call (when any) is in `reports/E7-BLOTTER-v2.csv` — time, legs, gap, costs, fill, exit reason, result. Published un-retuned (R-E1-TIMER+CLOCK part 4). E7 stays alarm-only in live unless the owner rules the experiment (which R-E1-ARB-DAY does, under the E7-EXPERIMENT key).