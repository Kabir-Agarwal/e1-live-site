# LANE 15 — MACRO & OVERNIGHT (R-MISSED-FIELDS 2)

_Generated 2026-09-18 05:55:55 IST. Free daily macro/overnight series — India VIX, USD/INR, crude, the US index close, GIFT Nifty pre-open and the 10-year yield — each a ruler engine 1 can read for its regime and gap rules. Point-in-time (each observation stamped with its PUBLICATION date), fail-closed (no fabrication), no anti-bot evasion. Each series is a ruler on the shelf for engine 1. RECORD-ONLY._

| Series | ruler for engine 1 | free source | source class | obs | state |
|---|---|---|---|---|---|
| India VIX | expected volatility — a market-level fear ruler for engine 1's regime | nseindia.com India VIX daily (also derivable from option chain) | needs-confirm | 0 | ARMED — source needs confirming; fills once reachable+permitted |
| USD/INR | rupee strength — a market-level macro ruler | RBI reference rate (rbi.org.in, free) / fbil.org.in | free | 0 | ARMED — free source; fills on a networked login run |
| Crude oil (Brent/WTI) | energy cost shock — an overnight macro ruler | EIA / free daily settle | free | 0 | ARMED — free source; fills on a networked login run |
| US index close (S&P 500 / Nasdaq) | overnight risk tone — an overnight ruler for the open | stooq.com daily CSV (free, permitted) | free | 0 | ARMED — free source; fills on a networked login run |
| GIFT Nifty pre-open | the market's own gap forecast — a pre-open ruler for engine 1's gap rule | NSE IX / vendor pre-open quote | needs-confirm | 0 | ARMED — source needs confirming; fills once reachable+permitted |
| India 10-year G-sec yield | the discount rate backdrop — a slow market-level macro ruler | RBI / CCIL daily (free) | free | 0 | ARMED — free source; fills on a networked login run |

**Free & permitted (fill on a networked login run):** usdinr, crude, us_index_close, in_10y_yield.
**Robots-blocked (arm only; never evaded, per §4.5):** none.

_When a series accrues enough observations it flips green on DATA-READINESS and its hunt (same-stock and market-level, standing exams, required-move book on sealed months) is queued and 📊'd. Nothing here places an order._
