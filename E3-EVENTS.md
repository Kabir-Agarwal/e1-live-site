# E3 — EVENT-DRIVEN STRATEGIES (R-E3-EVENTS)

_Generated 2026-09-17 17:56:23 IST. Build+run 4.5s. Event calendar from the owner's staged corporate-actions slice + an expiry calendar derived from the option store + a read-only NSE earnings probe. Standing architecture: walk-forward hit-rate, required-move gate, real fees, both fill models; sealed months report-only; no re-tuning; no typed numbers. New engine E3, backtest only, RECORD-ONLY._

## 1. Event calendar — coverage & data walls

| Event type | Coverage | Point-in-time / wall |
|---|---|---|
| Dividends | 1806 across 192 symbols | ex-date knowable in advance (NSE publishes ahead); provenance announcement-imputed (archive lacks board-declaration date) |
| Bonus / split | 49 / 28 | same as dividends |
| F&O expiry | 8 monthly expiries (2025-06-26 -> 2026-09-29) | DERIVED from the option store; known far in advance (PIT-safe) |
| Earnings | e2_filings.csv: 0 rows on disk; NSE probe HTTP 200 (got 2000 bytes) but no parseable dated events | **DATA-WALLED** — no earnings announcement dates on disk; NSE's JSON calendar needs a cookie-primed session, so the read-only probe yields no usable dates (fail-closed, §4.5 — not fabricated) |
| Index incl/excl | fo_membership_pit.csv empty; no Nifty index membership-change file | **DATA-WALLED** — no announcement/effective dates for index changes |

## 2. Strategies (economic reason stated before testing)

| Strategy | calls | win | Sharpe/Sortino | maxDD (R) | total (mid/cross) | fees %gross | verdict |
|---|---|---|---|---|---|---|---|
| (b) dividend run-up (long t-6→t-1) | 0 | — | — | — | — | — | no edge (walk-forward hit-rate < 50%, gate correctly admitted none; 263 events) |
| (b) dividend post-ex drift (t+1→t+6) | 65 | 49.2% | -0.34/-0.59 | -32.28 | mid -1.64 / cross -8.14 | 7.3% | loses (crossing -8.1) |
| (d) expiry week (t-5→expiry) | 0 | — | — | — | — | — | DATA-THIN (too few events to test) |
| (a) post-earnings drift | — | — | — | — | — | — | **DATA-WALLED** (no earnings dates) |
| (c) index incl/excl flows | — | — | — | — | — | — | **DATA-WALLED** (no membership-change dates) |

_R proxy = net %-return per event (mid saves ½ the spread; crossing pays the full round-trip cost). 1 'call' = one gated event trade on the sealed slice. Persistence = first-half→second-half Wilson-LB hit rate by date. **Coverage wall:** the near-month futures store overlaps only 263 of 1806 dividends in the run-up window and 808 in the post-drift window; the option store yields only 8 monthly expiries (2025-06-26 -> 2026-09-29), so expiry is data-thin._

## 3. Event options — IV around expiry (index level)

- thin: only 7 expiries with a clean VIX window.
- **Single-stock event IV: DATA-WALLED** — no single-stock option chains deep enough (same wall as E4; only NIFTY/BankNifty have chains).

## Verdicts (one line each)

- (a) post-earnings drift — **DATA-WALLED** (earnings announcement dates absent; NSE probe reachable but yields no parseable dates without a cookie-primed session).
- (b) dividend ex-date — run-up: no edge (walk-forward hit-rate < 50%, gate correctly admitted none; 263 events); post-drift: loses (crossing -8.1).
- (c) index incl/excl — **DATA-WALLED** (membership-change dates absent).
- (d) expiry week — DATA-THIN (too few events to test).
- event options (index IV crush) — inconclusive/walled; single-stock IV DATA-WALLED.

Blotter: reports/E3-BLOTTER.csv (every gated call). _RECORD-ONLY; orders HELD. Audit queued._
