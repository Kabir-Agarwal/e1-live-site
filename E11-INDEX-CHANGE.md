# ENGINE 11 — INDEX INCLUSION / EXCLUSION (R-MISSED-FIELDS 4)

_Generated 2026-09-18 06:00:55 IST. Engine 11 reopened. Parses free NSE Indices press-release PDFs for the securities included/excluded and their effective dates, then runs the standing-architecture event study — the announce→effective drift and the post-effective reversal — both fills, real cost, required-move rule, walk-forward. RECORD-ONLY; the live book is untouched._

## State

- PDFs: no press folder (drop free NSE Indices PDFs into C:\Users\LENOVO\Desktop\e1_index_press)
- Changes parsed: **0**
- Symbol→token map: **0** entries (built from the Kite instrument master on login)
- Resolved to a frozen-store token: **0**

## Verdict

ENGINE 11 REOPENED, PARSER BUILT, BACKTEST ARMED: no press folder (drop free NSE Indices PDFs into C:\Users\LENOVO\Desktop\e1_index_press); symbol→token map has 0 entries. The free NSE Indices press-release PDFs and the login-built token map are the wall — the parser is unit-tested and the event study runs the moment a PDF is dropped in C:\Users\LENOVO\Desktop\e1_index_press and the map exists. No fabricated dates (§4.4). Report-only.

_The parser (`parse_pdf_text`) is a pure, unit-tested function; drop dated NSE Indices press-release PDFs into `e1_index_press` (or fetch them on a networked login run) and build `data/symbol_token.json` from the instrument master to fill the study. No dates are ever fabricated. Blotter: reports/E11-INDEX-CHANGE-BLOTTER.csv. Audit queued._
