# LANE 14 — PUBLIC FLOWS (R-MISSED-FIELDS 1)

_Generated 2026-09-18 05:55:54 IST. Free daily collector + historical backfill for participant-wise F&O OI, FII/DII cash flows, bulk/block deals, insider/SAST-PIT trades, buybacks, delivery %, stock-lending, promoter pledges and monthly MF holdings. Point-in-time (each observation stamped with its PUBLICATION date), fail-closed (no fabrication), no anti-bot evasion. Each series is a ruler on the shelf for engine 1. RECORD-ONLY._

| Series | ruler for engine 1 | free source | source class | obs | state |
|---|---|---|---|---|---|
| Participant-wise F&O OI (FII/DII/pro/client) | who is net-long/short futures — a positioning ruler (same-stock via stock futures, market via index) | nsearchives.nseindia.com fao_participant_oi (daily) | robots-blocked | 0 | WALLED — publisher robots-blocks the archive; arms, fills only from a permitted source |
| FII/DII daily cash flows | net foreign/domestic buying — a market-level flow ruler | nseindia.com / bseindia.com FII-DII activity (daily) | robots-blocked | 0 | WALLED — publisher robots-blocks the archive; arms, fills only from a permitted source |
| Bulk deals | large single-name prints — a same-stock demand ruler | bseindia.com bulk-deals (daily CSV) | needs-confirm | 0 | ARMED — source needs confirming; fills once reachable+permitted |
| Block deals | negotiated large prints — a same-stock demand ruler | bseindia.com block-deals (daily CSV) | needs-confirm | 0 | ARMED — source needs confirming; fills once reachable+permitted |
| Insider / promoter (SAST/PIT) trades | promoter/insider buying or selling — a same-stock conviction ruler | bseindia.com insider-trading + SAST filings | needs-confirm | 0 | ARMED — source needs confirming; fills once reachable+permitted |
| Buybacks | company buying its own stock — a same-stock support ruler | bseindia.com / sebi buyback filings | needs-confirm | 0 | ARMED — source needs confirming; fills once reachable+permitted |
| Delivery percentage per stock | share of volume taken to delivery — a same-stock conviction ruler | nsearchives.nseindia.com sec_bhavdata_full (daily) | robots-blocked | 0 | WALLED — publisher robots-blocks the archive; arms, fills only from a permitted source |
| Stock-lending (SLB) data | borrow demand / short interest proxy — a same-stock pressure ruler | nseindia.com SLB reports (daily) | robots-blocked | 0 | WALLED — publisher robots-blocks the archive; arms, fills only from a permitted source |
| Promoter pledges | rising/falling pledged share — a same-stock risk ruler | bseindia.com pledge disclosures (event) | needs-confirm | 0 | ARMED — source needs confirming; fills once reachable+permitted |
| Monthly mutual-fund holdings | which funds are accumulating a name — a slow same-stock flow ruler | amfiindia.com portfolio disclosures (monthly text) | free | 0 | ARMED — free source; fills on a networked login run |

**Free & permitted (fill on a networked login run):** mf_holdings.
**Robots-blocked (arm only; never evaded, per §4.5):** fo_participant_oi, fii_dii_cash, delivery_pct, stock_lending.

_When a series accrues enough observations it flips green on DATA-READINESS and its hunt (same-stock and market-level, standing exams, required-move book on sealed months) is queued and 📊'd. Nothing here places an order._
