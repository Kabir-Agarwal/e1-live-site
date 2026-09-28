# E7 COST PROOF — the v2 cost model vs the real Zerodha F&O charges
_Generated 2026-09-16 02:01:20 IST (R-E1-E7-FULL part 1). Read-only; 5 real attempts from reports/E7-BLOTTER-v2.csv._

## The error in one line
v2 charged a FLAT **Rs 400** on every attempt — `2 × money.COST_RT (0.4%) × an arbitrary Rs 1,00,000 notional`. Real F&O cost is nothing like that: **options charges are on the PREMIUM, futures STT is on the NOTIONAL, brokerage is a FLAT Rs 20/order**, and the real position is 1+ lots (a BANKNIFTY lot's futures notional is ~Rs 8.4 LAKH, not Rs 1 lakh). So v2's cost AND its gross were both measured on a fictitious Rs 1 lakh scale.

### Attempt 1: BANKNIFTY 56000.0 2026-09-29 — 2026-07-20 10:24:00
1 lot (lot size 15). CE premium Rs 3,084.75, PE premium Rs 555.00, future ~Rs 56,000.
| Leg | Turnover | Brokerage | STT | Txn | GST | Stamp | Leg total |
|---|---|---|---|---|---|---|---|
| CE entry | 46,271 | 13.88 | 46.27 | 16.21 | 5.42 | 0.00 | **81.83** |
| PE entry | 8,325 | 2.50 | 0.00 | 2.92 | 0.98 | 0.25 | **6.65** |
| FUT entry | 840,000 | 20.00 | 0.00 | 14.53 | 6.37 | 16.80 | **58.54** |
| CE exit | 46,271 | 13.88 | 0.00 | 16.21 | 5.42 | 1.39 | **36.95** |
| PE exit | 8,325 | 2.50 | 8.32 | 2.92 | 0.98 | 0.00 | **14.72** |
| FUT exit | 840,000 | 20.00 | 168.00 | 14.53 | 6.37 | 0.00 | **209.74** |
**Real Zerodha statutory+brokerage round trip: Rs 408.43** (exactly what Zerodha's brokerage calculator sums for these 6 orders). v2 charged **Rs 400.00** — ratio 1.02×, so the COST was ~right by luck for BANKNIFTY 1 lot.
**The real error is SCALE:** v2 measured gross on Rs 1,00,000, but a real 1-lot position is Rs 840,000 of futures notional (**8.4× bigger**). So the real gross is Rs 601, not v2's Rs 72 — against the ~same cost. **v2 net Rs -328 → correctly-sized net Rs 192.**
_(Bid-ask SPREAD is a separate market cost, not in the Zerodha calculator; v3 charges it from the real quoted spread.)_

### Attempt 2: BANKNIFTY 56000.0 2026-09-29 — 2026-07-22 09:53:00
1 lot (lot size 15). CE premium Rs 2,685.15, PE premium Rs 617.40, future ~Rs 56,000.
| Leg | Turnover | Brokerage | STT | Txn | GST | Stamp | Leg total |
|---|---|---|---|---|---|---|---|
| CE entry | 40,277 | 12.08 | 40.28 | 14.11 | 4.72 | 0.00 | **71.23** |
| PE entry | 9,261 | 2.78 | 0.00 | 3.24 | 1.09 | 0.28 | **7.40** |
| FUT entry | 840,000 | 20.00 | 0.00 | 14.53 | 6.37 | 16.80 | **58.54** |
| CE exit | 40,277 | 12.08 | 0.00 | 14.11 | 4.72 | 1.21 | **32.16** |
| PE exit | 9,261 | 2.78 | 9.26 | 3.24 | 1.09 | 0.00 | **16.38** |
| FUT exit | 840,000 | 20.00 | 168.00 | 14.53 | 6.37 | 0.00 | **209.74** |
**Real Zerodha statutory+brokerage round trip: Rs 395.45** (exactly what Zerodha's brokerage calculator sums for these 6 orders). v2 charged **Rs 400.00** — ratio 0.99×, so the COST was ~right by luck for BANKNIFTY 1 lot.
**The real error is SCALE:** v2 measured gross on Rs 1,00,000, but a real 1-lot position is Rs 840,000 of futures notional (**8.4× bigger**). So the real gross is Rs -128, not v2's Rs -15 — against the ~same cost. **v2 net Rs -415 → correctly-sized net Rs -523.**
_(Bid-ask SPREAD is a separate market cost, not in the Zerodha calculator; v3 charges it from the real quoted spread.)_

### Attempt 3: BANKNIFTY 56000.0 2026-09-29 — 2026-07-22 09:59:00
1 lot (lot size 15). CE premium Rs 2,650.00, PE premium Rs 617.95, future ~Rs 56,000.
| Leg | Turnover | Brokerage | STT | Txn | GST | Stamp | Leg total |
|---|---|---|---|---|---|---|---|
| CE entry | 39,750 | 11.92 | 39.75 | 13.92 | 4.66 | 0.00 | **70.30** |
| PE entry | 9,269 | 2.78 | 0.00 | 3.25 | 1.09 | 0.28 | **7.40** |
| FUT entry | 840,000 | 20.00 | 0.00 | 14.53 | 6.37 | 16.80 | **58.54** |
| CE exit | 39,750 | 11.92 | 0.00 | 13.92 | 4.66 | 1.19 | **31.74** |
| PE exit | 9,269 | 2.78 | 9.27 | 3.25 | 1.09 | 0.00 | **16.39** |
| FUT exit | 840,000 | 20.00 | 168.00 | 14.53 | 6.37 | 0.00 | **209.74** |
**Real Zerodha statutory+brokerage round trip: Rs 394.11** (exactly what Zerodha's brokerage calculator sums for these 6 orders). v2 charged **Rs 400.00** — ratio 0.99×, so the COST was ~right by luck for BANKNIFTY 1 lot.
**The real error is SCALE:** v2 measured gross on Rs 1,00,000, but a real 1-lot position is Rs 840,000 of futures notional (**8.4× bigger**). So the real gross is Rs -1,261, not v2's Rs -150 — against the ~same cost. **v2 net Rs -550 → correctly-sized net Rs -1,655.**
_(Bid-ask SPREAD is a separate market cost, not in the Zerodha calculator; v3 charges it from the real quoted spread.)_

### Attempt 4: BANKNIFTY 56000.0 2026-09-29 — 2026-07-22 10:53:00
1 lot (lot size 15). CE premium Rs 2,626.20, PE premium Rs 638.00, future ~Rs 56,000.
| Leg | Turnover | Brokerage | STT | Txn | GST | Stamp | Leg total |
|---|---|---|---|---|---|---|---|
| CE entry | 39,393 | 11.82 | 39.39 | 13.80 | 4.62 | 0.00 | **69.67** |
| PE entry | 9,570 | 2.87 | 0.00 | 3.35 | 1.12 | 0.29 | **7.64** |
| FUT entry | 840,000 | 20.00 | 0.00 | 14.53 | 6.37 | 16.80 | **58.54** |
| CE exit | 39,393 | 11.82 | 0.00 | 13.80 | 4.62 | 1.18 | **31.46** |
| PE exit | 9,570 | 2.87 | 9.57 | 3.35 | 1.12 | 0.00 | **16.92** |
| FUT exit | 840,000 | 20.00 | 168.00 | 14.53 | 6.37 | 0.00 | **209.74** |
**Real Zerodha statutory+brokerage round trip: Rs 393.97** (exactly what Zerodha's brokerage calculator sums for these 6 orders). v2 charged **Rs 400.00** — ratio 0.98×, so the COST was ~right by luck for BANKNIFTY 1 lot.
**The real error is SCALE:** v2 measured gross on Rs 1,00,000, but a real 1-lot position is Rs 840,000 of futures notional (**8.4× bigger**). So the real gross is Rs -68, not v2's Rs -8 — against the ~same cost. **v2 net Rs -408 → correctly-sized net Rs -462.**
_(Bid-ask SPREAD is a separate market cost, not in the Zerodha calculator; v3 charges it from the real quoted spread.)_

### Attempt 5: BANKNIFTY 56000.0 2026-09-29 — 2026-07-22 11:10:00
1 lot (lot size 15). CE premium Rs 2,605.15, PE premium Rs 629.85, future ~Rs 56,000.
| Leg | Turnover | Brokerage | STT | Txn | GST | Stamp | Leg total |
|---|---|---|---|---|---|---|---|
| CE entry | 39,077 | 11.72 | 39.08 | 13.69 | 4.58 | 0.00 | **69.11** |
| PE entry | 9,448 | 2.83 | 0.00 | 3.31 | 1.11 | 0.28 | **7.54** |
| FUT entry | 840,000 | 20.00 | 0.00 | 14.53 | 6.37 | 16.80 | **58.54** |
| CE exit | 39,077 | 11.72 | 0.00 | 13.69 | 4.58 | 1.17 | **31.20** |
| PE exit | 9,448 | 2.83 | 9.45 | 3.31 | 1.11 | 0.00 | **16.71** |
| FUT exit | 840,000 | 20.00 | 168.00 | 14.53 | 6.37 | 0.00 | **209.74** |
**Real Zerodha statutory+brokerage round trip: Rs 392.84** (exactly what Zerodha's brokerage calculator sums for these 6 orders). v2 charged **Rs 400.00** — ratio 0.98×, so the COST was ~right by luck for BANKNIFTY 1 lot.
**The real error is SCALE:** v2 measured gross on Rs 1,00,000, but a real 1-lot position is Rs 840,000 of futures notional (**8.4× bigger**). So the real gross is Rs -155, not v2's Rs -18 — against the ~same cost. **v2 net Rs -418 → correctly-sized net Rs -548.**
_(Bid-ask SPREAD is a separate market cost, not in the Zerodha calculator; v3 charges it from the real quoted spread.)_

## Verdict
Across the 5 attempts: v2 net **Rs -2,120** → correctly-sized net **Rs -2,996**. The cost per se was ~right for BANKNIFTY (Rs 1,985 real vs Rs 2,000 charged), but v2 measured **gross on a fictitious Rs 1 lakh** while the real 1-lot position is several lakh of futures notional — so v2's gross was several times too small against a right-sized cost, which is why everything looked so negative. This is a **COST/SCALE-MODEL ERROR**: the v2 verdict cannot stand.

**Action taken:** `money.py` now has `fo_parity_roundtrip_cost()` (the real Zerodha F&O schedule, cited). **v2 is marked `COST-MODEL ERROR, SUPERSEDED`.** v3 re-runs every equation with real lots, this real cost, the real quoted spread, next-bar fills, the cost gate and the liquidity filter (R-E1-E7-FULL parts 2-3).