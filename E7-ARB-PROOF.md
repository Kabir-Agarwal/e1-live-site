# E7 parity arbitrage — the proof (R-E1-ARB-PROOF)
_Generated 2026-09-16 12:21:04 IST. 8,842 attempts. Per-attempt detail: reports/E7-BLOTTER-v3.csv (gap at signal, cost used with components, fill price per leg, gap captured, signal→fill minutes). Paper only._

## Distributions (rupees unless noted)
- **Gap at signal:** min 335 · p25 427 · median 538 · p75 928 · max 36,087
- **Cost used by the gate:** min 334 · p25 337 · median 344 · p75 652 · max 851
    - brokerage min 53 · p25 54 · median 55 · p75 67 · max 99
    - STT min 195 · p25 197 · median 200 · p75 410 · max 507
    - other (txn+GST+stamp+SEBI) min 83 · p25 84 · median 87 · p75 165 · max 250
    - spread (floor: one tick/leg) min 2 · p25 2 · median 2 · p75 11 · max 11
- **Gap captured:** min -7,419 · p25 0 · median 0 · p75 0 · max 13,708
- **Fill prices:** CE min 13 · p25 416 · median 726 · p75 1,060 · max 3,085 · PE min 19 · p25 383 · median 577 · p75 834 · max 2,565 · future min 23,690 · p25 24,444 · median 57,839 · p75 58,122 · max 58,611
- **Minutes signal→fill:** median 1, p75 1, max 28819

## The three questions, answered with numbers
**(1) Did every attempt satisfy gap-at-signal > cost-used?** **YES** — 0 of 8,842 violate it (the gate enforces it exactly).

**(2) Median gap-at-signal vs median gap-captured:** signal **Rs 538** → captured **Rs 0**. Only ~0% of the signalled gap is actually captured — the rest is gone by the next-bar fill and the mean-reversion after it. This, against the cost, is why parity FAILS.

**(3) How many signals came from stale prices (a leg not traded that minute)?** **0 of the 8,842 traded signals** — the liquidity trip-wire (both legs above their own non-zero volume floor, same minute) excludes them by construction. For context, 923 of 28,687 synchronous minutes examined had a non-trading leg and were filtered out BEFORE any signal.

## Independent check (AUDIT-4)
AUDIT-4 (queued) independently re-verifies the gate math (gap-at-signal > cost-used, recomputed from Zerodha's schedule) and the fill timing (fill strictly at the NEXT synchronous bar) from this blotter — not from these numbers.