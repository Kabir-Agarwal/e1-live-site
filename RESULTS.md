# RESULTS — every engine, every variant (R-RESULTS-PAGE)

## Live paper accounts (R-ADAPTIVE-SIZING-LIVE · R-ROOF-COPYCAT-NOW)

_Engine 1 runs the SAME fires two ways — **FLAT** (1R = ₹1,000) and **ADAPTIVE** (risk as a measured fraction of current equity: Wilson-LB accuracy × avg-win/avg-loss at ¼-Kelly, capped by the pattern's own drawdown, a total-risk cap and a cluster cap, scaled by regime and drawdown). The **desk** holds the roof's copies. Each starts ₹2,00,000, carried, reset only by ruling. The winner over a live margin becomes the rule by owner ruling. Orders HELD, so all are ₹2,00,000 until the book trades. RECORD-ONLY._

| Account | Current equity |
|---|---|
| E1 | ₹2,00,000 |
| E10 | ₹2,00,000 |
| E11 | ₹2,00,000 |
| E1-FLAT | ₹2,00,000 |
| E1-ADAPTIVE | ₹2,00,000 |
| E21-FLAT | ₹2,00,000 |
| E21-ADAPTIVE | ₹2,00,000 |
| E9-FLAT | ₹2,00,000 |
| E9-ADAPTIVE | ₹2,00,000 |
| E3-FLAT | ₹2,00,000 |
| E3-ADAPTIVE | ₹2,00,000 |
| YT-FLAT | ₹2,00,000 |
| YT-ADAPTIVE | ₹2,00,000 |
| E7-FLAT | ₹2,00,000 |
| E7-ADAPTIVE | ₹2,00,000 |
| E12-FLAT | ₹2,00,000 |
| E12-ADAPTIVE | ₹2,00,000 |
| E14-FLAT | ₹2,00,000 |
| E14-ADAPTIVE | ₹2,00,000 |
| E4-FLAT | ₹2,00,000 |
| E4-ADAPTIVE | ₹2,00,000 |
| desk | ₹6,00,000 |

_Generated 2026-09-25 21:09:56 IST. Every number is COMPUTED FROM the linked blotter (backtest_stats on that file's own R columns), so it reconciles to its source by construction — nothing typed. Rupees at the paper book's STATED notional: 1R = ₹1,000, starting capital ₹200,000. Both fill models (mid vs crossing) side by side. Per-test downloadable blotters: site/blotters/<key>.csv. RECORD-ONLY. Paper trades: ON — 216 stocks unlocked._

| Engine | Test | Period | Calls | Win% / Acc% | Sharpe (mid/cross) | Sortino (mid/cross) | maxDD R (mid/cross) | Total R (mid/cross) | End cap mid (P/L) | End cap cross (P/L) | Fees | Blotter |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Engine 1 | Live paper ledger (to date) (single fill) | 2026-01-12 → 2026-09-11 | 111 | 46.8% / — | mid 0.62 / cross 0.62 | mid 4.68 / cross 4.68 | mid -10.46 / cross -10.46 | mid 7.97 / cross 7.97 | ₹207,970 (+₹7,970, 3.98%) | ₹207,970 (+₹7,970, 3.98%) | — | `E1-BLOTTER.csv` |
| Engine 1 | Required-move book (20-day) (single fill) | 2026-01-12 → 2026-09-11 | 937 | 69.1% / 52.8% | mid 0.77 / cross 0.77 | mid 1.65 / cross 1.65 | mid -13.95 / cross -13.95 | mid 15.45 / cross 15.45 | ₹215,450 (+₹15,450, 7.72%) | ₹215,450 (+₹15,450, 7.72%) | ₹13,569 | `REQUIRED-MOVE-BLOTTER.csv` |
| Engine 1 | Two-weights sizing | 2026-01-12 → 2026-09-11 | 765 | 69.0% / — | mid -0.39 / cross -0.96 | mid -0.61 / cross -1.34 | mid -46.1 / cross -48.35 | mid -5.79 / cross -14.4 | ₹194,210 (₹-5,790, -2.9%) | ₹185,600 (₹-14,400, -7.2%) | — | `E1-TWO-WEIGHTS-BLOTTER.csv` |
| Engine 1 | Two-tests (safe gate / top-decile) (single fill) | 2026-01-12 → 2026-09-11 | 278 | 62.2% / 51.1% | mid -0.44 / cross -0.44 | mid -0.69 / cross -0.69 | mid -102.98 / cross -102.98 | mid -26.46 / cross -26.46 | ₹173,540 (₹-26,460, -13.23%) | ₹173,540 (₹-26,460, -13.23%) | — | `E1-TWO-TESTS-BLOTTER.csv` |
| Engine 1 | Fee-multiple stress (single fill) | 2026-01-22 → 2026-09-11 | 35 | 65.7% / — | mid 1.01 / cross 1.01 | mid 2.23 / cross 2.23 | mid -2.84 / cross -2.84 | mid 5.04 / cross 5.04 | ₹205,040 (+₹5,040, 2.52%) | ₹205,040 (+₹5,040, 2.52%) | ₹1,464 | `E1-FEE-MULTIPLE-BLOTTER.csv` |
| Engine 1 | Barrier-first exits (single fill) | 2026-01-12 → 2026-09-11 | 682 | 58.1% / — | mid -2.29 / cross -2.29 | mid -4.7 / cross -4.7 | mid -48.96 / cross -48.96 | mid -44.75 / cross -44.75 | ₹155,250 (₹-44,750, -22.38%) | ₹155,250 (₹-44,750, -22.38%) | ₹26,947 | `E1-BARRIER-FIRST-BLOTTER.csv` |
| Engine 1 | Shrink (fire-count) (single fill) | 2026-01-12 → 2026-09-11 | 126 | 63.5% / 48.4% | mid 0.42 / cross 0.42 | mid 0.99 / cross 0.99 | mid -9.83 / cross -9.83 | mid 3.61 / cross 3.61 | ₹203,610 (+₹3,610, 1.8%) | ₹203,610 (+₹3,610, 1.8%) | ₹4,526 | `SHRINK-BLOTTER.csv` |
| Engine 1 | Two-scores persistence (single fill) | 2026-01-12 → 2026-09-11 | 361 | 58.4% / 48.2% | mid -1.52 / cross -1.52 | mid -3.07 / cross -3.07 | mid -24.83 / cross -24.83 | mid -21.44 / cross -21.44 | ₹178,560 (₹-21,440, -10.72%) | ₹178,560 (₹-21,440, -10.72%) | ₹14,010 | `TWO-SCORES-BLOTTER.csv` |
| Engine 3/11 | Events (earnings/corp-action drift) | 2026-01-05 → 2026-08-17 | 65 | 49.2% / 49.2% | mid -0.05 / cross -0.26 | mid -0.09 / cross -0.47 | mid -31.38 / cross -32.28 | mid -1.64 / cross -8.14 | ₹198,360 (₹-1,640, -0.82%) | ₹191,860 (₹-8,140, -4.07%) | — | `E3-BLOTTER.csv` |
| Engine 6 | Options vertical (idea/execution) (single fill) | 2026-08-17 → 2026-08-28 | 62 | 45.2% / — | mid -0.17 / cross -0.17 | mid -0.19 / cross -0.19 | mid -5.47 / cross -5.47 | mid -1.55 / cross -1.55 | ₹198,450 (₹-1,550, -0.78%) | ₹198,450 (₹-1,550, -0.78%) | — | `E4-BLOTTER.csv` |
| Engine 7 | Arbitrage-tick v2 (single fill) | 2026-06-29 → 2026-08-26 | 1500 | 4.1% / — | mid -111.44 / cross -111.44 | mid -188.81 / cross -188.81 | mid -573.82 / cross -573.82 | mid -574.1 / cross -574.1 | ₹-374,100 (₹-574,100, -287.05%) | ₹-374,100 (₹-574,100, -287.05%) | ₹600,000 | `E7-BLOTTER-v2.csv` |
| Engine 7 | Arbitrage-tick v3 | — | 0 | — | — | — | — | — | — | — | — | `E7-BLOTTER-v3.csv` |
| Engine 5 (probation) | Pairs stretch-and-snap | 2025-04-11 → 2026-08-27 | 1426 | 61.2% / 62.1% | mid -2.1 / cross -2.95 | mid -2.46 / cross -3.46 | mid -810.41 / cross -1068.41 | mid -704.64 / cross -989.84 | ₹-504,640 (₹-704,640, -352.32%) | ₹-789,840 (₹-989,840, -494.92%) | — | `E9-PAIRS-BLOTTER.csv` |
| Engine 3 | Fact-routing weights | 2026-01-12 → 2026-09-11 | 761 | 59.0% / — | mid -0.99 / cross -1.52 | mid -1.39 / cross -2.04 | mid -46.1 / cross -48.35 | mid -14.12 / cross -21.64 | ₹185,880 (₹-14,120, -7.06%) | ₹178,360 (₹-21,640, -10.82%) | — | `E10-WEIGHTS-BLOTTER.csv` |
| Engine 4 | Family-bias (normal book) | 2026-01-12 → 2026-09-11 | 765 | 69.0% / 52.3% | mid -0.39 / cross -0.96 | mid -0.61 / cross -1.34 | mid -46.1 / cross -48.35 | mid -5.79 / cross -14.4 | ₹194,210 (₹-5,790, -2.9%) | ₹185,600 (₹-14,400, -7.2%) | ₹8,604 | `E11-FAMILY-BIAS-BLOTTER.csv` |
| Engine 5 (probation) | Volatility-targeted sizing | 2026-01-12 → 2026-09-11 | 769 | 68.7% / 50.8% | mid -0.74 / cross -1.3 | mid -1.0 / cross -1.64 | mid -34.71 / cross -36.49 | mid -10.01 / cross -17.67 | ₹189,990 (₹-10,010, -5.0%) | ₹182,330 (₹-17,670, -8.83%) | ₹7,654 | `E11-VOL-SIZING-BLOTTER.csv` |
| Engine 4 | Season ruler | 2026-03-23 → 2026-08-14 | 72 | 80.6% / 69.4% | mid 2.54 / cross 2.37 | mid 241.4 / cross 4.54 | mid -4.21 / cross -4.63 | mid 16.24 / cross 15.18 | ₹216,240 (+₹16,240, 8.12%) | ₹215,180 (+₹15,180, 7.59%) | — | `SEASON-RULER-BLOTTER.csv` |
| Engine 4 | Time effects (expiry week etc.) | 2026-01-09 → 2026-09-04 | 609 | 54.0% / 54.5% | mid 0.91 / cross 0.47 | mid 1.45 / cross 0.75 | mid -257.56 / cross -267.44 | mid 126.66 / cross 65.76 | ₹326,660 (+₹126,660, 63.33%) | ₹265,760 (+₹65,760, 32.88%) | — | `TIME-EFFECTS-BLOTTER.csv` |
| Engine 5 (probation) | Slow index/sector trend | 2025-11-27 → 2026-08-26 | 72 | 27.8% / 34.7% | mid -0.24 / cross -0.65 | mid -0.56 / cross -1.45 | mid -42.73 / cross -48.53 | mid -10.76 / cross -28.46 | ₹189,240 (₹-10,760, -5.38%) | ₹171,540 (₹-28,460, -14.23%) | — | `SLOW-TREND-BLOTTER.csv` |
| Engine 16 (probation) | Breadth rulers (market-level) ⟨return-fraction, not a 1R book⟩ | 2021-01-04 → 2026-07-10 | 892 | 44.5% / — | mid -1.55 / cross -6.16 | mid -2.42 / cross -9.45 | mid -0.78 / cross -2.46 | mid -0.6 / cross -2.38 | — | — | — | `LANE16-BREADTH-BLOTTER.csv` |
| Roof | Combined signal copybook | 2026-01-12 → 2026-09-11 | 937 | 69.1% / — | mid 0.77 / cross 0.77 | mid 1.65 / cross 1.65 | mid -13.95 / cross -13.95 | mid 15.45 / cross 15.45 | ₹215,450 (+₹15,450, 7.72%) | ₹215,450 (+₹15,450, 7.72%) | — | `ROOF-COMBINED-LEDGER.csv` |
| Index (NIFTY/BANKNIFTY fut) | Intraday-only, 1/5/15-min | 2026-07-10 → 2026-07-15 | 11 | 54.5% / 54.5% | mid -0.96 / cross -1.4 | mid -109.79 / cross -2.79 | mid -3.2 / cross -3.83 | mid -2.61 / cross -3.81 | ₹197,390 (₹-2,610, -1.31%) | ₹196,190 (₹-3,810, -1.91%) | ₹2,414 | `INDEX-INTRADAY-BLOTTER.csv` |
| Index (NIFTY/BANKNIFTY fut) | Daily-hold, roll-aware | — | 0 | — | — | — | — | — | — | — | — | `INDEX-DAILY-BLOTTER.csv` |
| Engine 1 sizing | Flat 1R (base) (single fill) | 2026-01-12 → 2026-09-11 | 937 | 69.1% / — | mid 0.77 / cross 0.77 | mid 1.65 / cross 1.65 | mid -46.1 / cross -46.1 | mid 15.45 / cross 15.45 | ₹215,450 (+₹15,450, 7.72%) | ₹215,450 (+₹15,450, 7.72%) | — | `SIZING-FLAT-BLOTTER.csv` |
| Engine 1 sizing | 3-layer (pattern/book/account) (single fill) | 2026-01-12 → 2026-09-11 | 937 | 69.1% / — | mid -1.41 / cross -1.41 | mid -1.48 / cross -1.48 | mid -21.83 / cross -21.83 | mid -10.19 / cross -10.19 | ₹189,810 (₹-10,190, -5.1%) | ₹189,810 (₹-10,190, -5.1%) | — | `SIZING-3LAYER-BLOTTER.csv` |
| Engine 17 state weighting | E17 normal (single fill) | 2026-01-12 → 2026-09-11 | 937 | 68.7% / — | mid 1.12 / cross 1.12 | mid 1.88 / cross 1.88 | mid -29.35 / cross -29.35 | mid 17.22 / cross 17.22 | ₹217,220 (+₹17,220, 8.61%) | ₹217,220 (+₹17,220, 8.61%) | — | `SIZING-E17-NORMAL-BLOTTER.csv` |
| Engine 17 state weighting | E17 inverse (single fill) | 2026-01-12 → 2026-09-11 | 937 | 69.1% / — | mid 0.52 / cross 0.52 | mid 0.97 / cross 0.97 | mid -62.84 / cross -62.84 | mid 13.69 / cross 13.69 | ₹213,690 (+₹13,690, 6.84%) | ₹213,690 (+₹13,690, 6.84%) | — | `SIZING-E17-INVERSE-BLOTTER.csv` |

_Starting capital every book: ₹200,000 (money.NOTIONAL_CAPITAL, stated). Ending capital = start + total_R × ₹1,000. A market-level ruler (breadth) is priced in return-fractions, not 1R, so its rupee columns are n/a — never estimated. Fees are shown only where the blotter records them. Every row's source blotter is named; open site/blotters/<key>.csv for every call. RECORD-ONLY._
