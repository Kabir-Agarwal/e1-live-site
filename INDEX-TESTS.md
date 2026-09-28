# INDEX TESTS — NIFTY + BANKNIFTY via the near-month future (R-INDEX-TESTS)

_Generated 2026-09-18T14:27:10+05:30. Standing architecture: finder discovery on TRAIN, TEST exam + Benjamini-Hochberg, walk-forward required-move book in the SEALED holdout (report-only), managed exits with the measured MAE stop, both fill models (crossing = full cost, mid = half), real futures charges + 2 x half-spread = 0.1268% round trip. 1R = ₹1,000 on ₹200,000 notional. Every headline total carries a bootstrap 95% band. RECORD-ONLY._

## Part 1 — index daily-hold (futures, roll-aware)

| Book | calls | win% / accuracy% | Sharpe mid / cross | Sortino mid / cross | maxDD R (cross) | total R mid / cross | 95% band, total R cross | ₹ at notional (cross) | avg hold | verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| Index daily-hold (NIFTY + BANKNIFTY futures) | 0 | — | — | — | — | — | — | — | — | no calls |

By horizon (days): H=1: 0 calls, —R cross; H=5: 0 calls, —R cross; H=20: 0 calls, —R cross; H=40: 0 calls, —R cross; H=60: 0 calls, —R cross

Discovered / certified: NIFTY 38/0; BANKNIFTY 29/1

## Part 2 — index intraday-only (1/5/15-min, flat by the session close)

| Book | calls | win% / accuracy% | Sharpe mid / cross | Sortino mid / cross | maxDD R (cross) | total R mid / cross | 95% band, total R cross | ₹ at notional (cross) | avg hold | verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| Index intraday-only (1/5/15-min, no overnight) | 11 | 45.5% / 54.5% | n/a (<30 calls) | n/a (<30 calls) | -3.83 | -2.61 / -3.81 | [-8.89, 1.29] | ₹-3,813 (-1.91%) | 0.112 d (160.9 min) | not distinguishable from zero; live fills decide |

Discovered / certified: NIFTY 15-min 88/15; BANKNIFTY 15-min 79/4; NIFTY 5-min 82/17; BANKNIFTY 5-min 79/1; NIFTY 1-min 128/78; BANKNIFTY 1-min 131/64

## Part 3 — side by side (same metrics, same fill definitions)

| Book | calls | win% / accuracy% | Sharpe mid / cross | Sortino mid / cross | maxDD R (cross) | total R mid / cross | 95% band, total R cross | ₹ at notional (cross) | avg hold | verdict |
|---|---|---|---|---|---|---|---|---|---|---|
| Index daily-hold, 20/40/60-day (like-for-like) | 0 | — | — | — | — | — | — | — | — | no calls |
| Index intraday-only (1/5/15-min, no overnight) | 11 | 45.5% / 54.5% | n/a (<30 calls) | n/a (<30 calls) | -3.83 | -2.61 / -3.81 | [-8.89, 1.29] | ₹-3,813 (-1.91%) | 0.112 d (160.9 min) | not distinguishable from zero; live fills decide |
| 210-stock required-move book (20/40/60-day) | 937 | 65.5% / 52.8% | 0.94 / 0.11 | 2.03 / 0.19 | -15.77 | 15.45 / 1.88 | [-38.18, 41.31] | ₹1,882 (0.94%) | 12.333 d (17759.5 min) | not distinguishable from zero; live fills decide |

## Rolls measured (candidate contract switch = largest basis rise per month; points)

_Small entries (tens of points) are months whose real switch fell on the first trading day of the NEXT month, so that month's largest rise is an ordinary day. The daily-hold book took 0 calls, so no trade in this run depends on a roll._

NIFTY: 2025-03-28 (+153.9), 2025-04-25 (+118.05), 2025-05-30 (+164.4), 2025-06-27 (+100.25), 2025-07-17 (+22.85), 2025-08-29 (+188.95), 2025-09-29 (+30.8), 2025-10-29 (+220.15), 2025-11-26 (+164.35), 2025-12-31 (+207.65), 2026-01-28 (+171.55), 2026-02-25 (+183.3), 2026-03-10 (+34.65), 2026-04-01 (+178.0), 2026-05-27 (+107.8), 2026-06-09 (+43.6), 2026-07-01 (+147.95), 2026-08-06 (+89.65); BANKNIFTY: 2025-03-28 (+249.35), 2025-04-23 (+165.7), 2025-05-30 (+530.75), 2025-06-27 (+183.75), 2025-07-28 (+99.55), 2025-08-29 (+548.15), 2025-09-29 (+76.9), 2025-10-29 (+379.65), 2025-11-26 (+288.45), 2025-12-31 (+419.3), 2026-01-28 (+436.2), 2026-02-25 (+387.1), 2026-03-24 (+163.0), 2026-04-01 (+385.3), 2026-05-27 (+451.1), 2026-06-18 (+68.0), 2026-07-01 (+517.9), 2026-08-26 (+284.4)

## Stated limits

- Only the continuous near-month future (-I) is on disk, so the roll happens AT the measured contract switch (jump removed, one extra round trip charged), not before expiry week as ruled — the next-month (-II) series would be needed for that.
- Switches before 2025-02-21 cannot be measured (no index data), so TRAIN/TEST targets include those few unadjusted roll gaps. The sealed-holdout book is entirely inside the measured period.
- The spread is the cited COLD-START fallback (5 bps a side) — far wider than a real index-future spread, so costs here are conservative.
- Only the direction target is discovered: it is the only one the book can trade.

_Blotters: reports/INDEX-DAILY-BLOTTER.csv, reports/INDEX-INTRADAY-BLOTTER.csv. Measured ETA at 5%: {'pct': 5.5, 'elapsed_s': 13, 'eta_s': 223, 'measured_at': '2026-09-18T14:25:37+05:30'}. Total run time 106 s._
