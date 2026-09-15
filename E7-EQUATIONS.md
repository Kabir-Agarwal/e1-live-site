# E7 arbitrage equations — the full set, and what the data allows (R-E1-E7-FULL part 2)

_Generated for the v3 build. Data correction up front: **cash equity 1-minute bars for all 210 F&O names
DO exist** (`e1_1min_raw`, provenance `frozen_kite`, 2020-01 → 2026-09-11). My earlier "no cash equities"
referred only to the AmiBroker F&O ingest; the Kite cash store is here. So basis and index-vs-basket ARE
testable on the Nov 2024 → Aug 2026 overlap with the futures store._

## The E7 paper's own relationships (docs/architecture/ENGINE_E7.md §2)
| # | Equation (verbatim intent) | Data | Testable now |
|---|---|---|---|
| 1 | **Futures–cash basis:** `(future − spot)/spot`, annualised by days-to-expiry | cash (e1_1min_raw) + future ({sym}-I) + expiry from the symbol | **YES** — the headline new capability |
| 2 | **Put-call parity:** `C − P − (S − K·e^(−rT))` / underlying, `r`=91-day T-bill PIT, `T`=days/365 | options + cash/future | **YES** (v3 uses the FUTURE forward — strictly better than the paper's spot form, which omits dividends: the v1 bug) |
| 3 | Feed-sanity (a data-quality guard, not a trade) | all stores | guard only, not a P&L equation |

_(The paper's tradeable set is basis + parity; the other "formulas" are the exit rules — bank/widen/time
— already in the formula-only arb. Recorded so nothing is invented.)_

## The textbook set the ruling enumerated
| Equation | What it needs | On disk? | Testable now |
|---|---|---|---|
| Cash-vs-futures basis | cash + future, same minute | cash ✓ + {sym}-I ✓ (14 names have both + more) | **YES** |
| Put-call parity | CE + PE + forward | ✓ | **YES** (futures-forward) |
| Conversion / reversal | = parity, executed as a combo | ✓ | **YES** (same signal as parity) |
| Box spread | CE+PE at TWO strikes, one expiry | options ✓ where ≥2 strikes | **YES, limited** (sparse chains) |
| Butterfly convexity | THREE strikes, one expiry | options ✓ where ≥3 strikes | **YES, limited** |
| Calendar (near vs far future) | TWO futures expiries per name | only `{sym}-I` (near month) ingested | **NO** — far-month futures not in the store |
| Index-vs-basket | index + constituent cash + weights | index ✓ + cash ✓; index WEIGHTS absent | **PARTIAL** — testable with published NIFTY weights (owner drop) |
| Cross-exchange NSE/BSE | same stock on both venues | NSE cash ✓; BSE cash for the SAME names absent | **NO** — no BSE cash for these names |

## What v3 will run (parts 3-5), on the CORRECTED foundation
Every **YES / YES-limited** equation, under the v2 rules **plus the part-1 fixes**:
- **Real lots** (real F&O lot size), not an arbitrary Rs 1,00,000 notional — this was the scale error that
  made v2's magnitudes meaningless (see `E7-COST-PROOF.md`).
- **Real Zerodha F&O cost** (`money.fo_parity_roundtrip_cost`) — flat Rs 20/order, options on premium,
  futures STT on notional — replacing the flat 0.4%.
- **Real quoted bid-ask spread** (from depth), not a flat 0.1%.
- Next-bar fills, cost gate, both-leg same-minute liquidity filter; every call in a blotter;
  costs-vs-market split; by regime.
- **One combined book:** all equations scan every minute; the best edge-after-cost is taken first; no leg
  is used by two trades at once; desk exit rules. Per-equation AND combined verdicts.

**Calendar and cross-exchange stay data-blocked** until far-month futures / BSE cash are dropped; they are
flagged, never faked.
