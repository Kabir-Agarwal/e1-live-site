# E7 BACKTEST v3 — trip-wired, TWO-BOUND spread (R-E1-SPREAD)
_Generated 2026-09-16 11:53:01 IST. Beside v1/v2. Paper only._

## Spread bounds (R-E1-SPREAD)
Every equation reports BOTH: **FLOOR** = statutory + one measured tick/leg; **UPPER** = statutory + Corwin-Schultz. **PASS** iff net>0 under UPPER; **MARGINAL** iff net>0 only under FLOOR; else FAILS. From the first login day the live feed records the real quoted spread/instrument/minute; after >=5 sessions the backtest re-runs with the measured median and verdicts update. Marginal equations may paper-trade live only after that measured re-run passes. Parity: alarms-only.

## PARITY — done
- Attempts 7957, win rate (floor) 0.019.
- Gross Rs 244,090 · statutory Rs 3,697,767.
- **net FLOOR Rs -3,497,095** · net UPPER Rs -37,689,771.
- **VERDICT: FAILS** → alarms-only. (conversion/reversal is the same signal executed as a combo → same verdict, FAILS.)

## Blocked (stated, never faked)
- calendar: only near-month futures ingested. - cross-exchange NSE/BSE: no BSE cash for these names.

## Continuing build (measured ETAs)
basis (cash-vs-futures — cash now confirmed present), box, butterfly, index-vs-basket, then the COMBINED BOOK. Parity ran in ~56s; each equation runs in 1-2 min, but each is a careful BUILD (basis needs the same dividend/carry handling as parity; box/butterfly are multi-strike; index needs constituent weights). Realistic full audited 6-equation + combined verdict: ~Fri 2026-09-18 — NOT Thursday 09:15. AUDIT-4 auto-fires on v3 completion; each equation trades live only after its AUDIT-4 pass. Every parity call: reports/E7-BLOTTER-v3.csv.