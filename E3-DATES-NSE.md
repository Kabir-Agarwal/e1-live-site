# E3 — EARNINGS-DRIFT + INDEX-CHANGE on the REAL NSE calendar (R-E3-NSE-DATES)

_Generated 2026-09-17 23:11:57 IST. Event calendar built READ-ONLY from NSE's own corporate-board-meetings API (results purpose) via the owner's browser session — reports/E3-EARNINGS-CALENDAR.json. Economic reason stated before testing: markets under-react to earnings, so the announcement-day move continues. Standing architecture: walk-forward Wilson-LB gate, required-move rule, real fees, both fills; sealed slice; no re-tuning; no typed numbers. Paper only, RECORD-ONLY._

## Calendar coverage

- **713 results dates** across **83 F&O names** (2024-08 → 2026-08); **83** have futures bars on this laptop to backtest on. This is a REAL earnings calendar — the TrueData free-export wall is bypassed via NSE's own session (R-E3-DATES named that wall; this is the free NSE route the ruling directed).

## (a) Post-earnings drift (direction of the announcement move continued)

| Horizon | events | calls | win | Sharpe/Sortino | maxDD (R) | total (mid/cross) | persistence |
|---|---|---|---|---|---|---|---|
| 20-day | 559 | 0 | — | — | — | — | — |
| 40-day | 493 | 0 | — | — | — | — | — |
| 60-day | 492 | 0 | — | — | — | — | — |

_R proxy = net %-return per event (mid saves ½ the spread; crossing pays the full round trip). A 'call' is a gated event trade on the sealed slice. Persistence = first-half→second-half Wilson-LB drift-hit rate._

## (c) Index inclusion/exclusion — DATA-WALLED (exact wall)

NSE offers **no structured feed** for index-membership changes: the `corporate-info` companies endpoint 404s, and NSE Indices publishes reconstitutions only as **unstructured PDF press releases** (niftyindices.com). Building an index-change calendar would need PDF-scraping those releases one by one — outside a clean read-only session pull and not attempted (no fabrication). The index-change strategy therefore stays **WALLED** on the free route; the paid TrueData/NSE index-reconstitution dataset is the clean source if the owner wants it.

## VERDICT per strategy

- **(a) earnings-drift — NO EDGE — the announcement-day move does NOT continue: the walk-forward drift-hit rate is BELOW 50% at every horizon (≈0.34–0.46), so 2p−1<0 and the required-move gate correctly admits ZERO trades. On NSE F&O 2024–2026 post-earnings drift does not pay (if anything the move under-continues); no fabrication, the calendar is real and the gate is honest.**
- **(c) index inclusion/exclusion — DATA-WALLED** (no structured NSE feed; PDF press releases only).

Blotter: reports/E3-EARNINGS-BLOTTER.csv. _RECORD-ONLY; orders HELD. Audit queued._
