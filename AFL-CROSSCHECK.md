# AFL-CROSSCHECK — AmiBroker as an independent second backtester (R-E1-AFL-CROSSCHECK)

_Session E1-REBUILD-2, 2026-09-17. Independent reimplementation in AmiBroker AFL, written from the ruling
text (not the Python code), to reconcile line-by-line against the Python blotters. The office BestRT
database is NOT touched — a separate database is built under `afl/xcheck_db`. RECORD-ONLY, no order code._

## Status in one line

AmiBroker is **present and COM-drivable** (`C:\Program Files\AmiBroker\Broker.exe`, class
`Broker.Application`, **v6.30.0** verified this session). The independent **AFL reimplementations are
written** and the **data export is verified** against the Python stores. The one remaining step — letting
this session **drive the owner's AmiBroker unattended** to create the database, run the backtester, and
export trade lists — **was declined by the permission gate this turn** and needs the owner's explicit
go-ahead (it opens the desktop app and writes a database). **No AGREE/DISAGREE numbers are invented in the
meantime** (§4.4): the reconciliation table below is filled only once the runs actually execute.

## 1. DATA — the separate database (verified, ready to import)

- **Target DB path:** `afl/xcheck_db` (a NEW database, never the office BestRT one).
- **Source:** the owner's own stores — `Desktop\e1_deriv_store` (indices + near-month futures) and, with
  `--minute`, the 1-minute cash bars. The finished rules backtest on **daily-glued** bars, so the default
  export is daily (the granularity that reproduces the blotters); a `--minute` path is wired for the raw
  1-minute import the ruling names.
- **Export verified (no AmiBroker side-effect), real counts:**

  | Series | Python daily bars | Span |
  |---|---|---|
  | NIFTY (index) | 374 | 2025-02-21 → 2026-08-28 |
  | BANKNIFTY (index) | 373 | 2025-02-21 → 2026-08-28 |
  | AXISBANK-I (future) | 461 | 2024-08-12 → 2026-08-28 |

  The AmiBroker import will be reconciled bar-for-bar against these (`reports/AFL-DB-VERIFY.csv`) once the
  import runs. Harness: `python scripts/afl_crosscheck.py --builddb [--minute]` (prints the DB path and the
  imported-series count).

## 2. AFL — one script per rule, and the expressibility of each (the honest part)

The ruling asks for AFL "where expressible" and to report **NOT-EXPRESSIBLE** rules with the reason. This
is the core finding of the cross-check design: **most of the E1/E4 edge is not transcribable into AFL**,
because it is data-selected, not formulaic.

| Rule family | AFL file | Expressible? | Reason |
|---|---|---|---|
| (a) E1 same-stock — standing architecture | `afl/e1_samestock_required_move.afl` | **PARTIAL** | The MAE stop / break-even / trail / partial / required-move **architecture** is expressible; the **certified pattern conditions are NOT** — they are finder-derived quantile windows on dozens of metrics, luck-corrected per split, with no closed form to transcribe. The AFL encodes the architecture with a transparent momentum **proxy** entry, so the cross-check tests the *architecture*, not the un-transcribable conditions. |
| (b) E1 cross-stock / cross-metric / cross-timeframe | — | **MOSTLY NOT-EXPRESSIBLE** | Foreign-symbol refs can express a *single* named cross-pair condition, but the hunt's edge is the *selection* across 70,943 pairs × 7 timeframes with per-pair certified thresholds — AmiBroker cannot enumerate or certify that space. A handful of specific certified pairs could be hand-written; the population cannot. |
| (c) arbitrage — parity / conversion / basis | `afl/arb_parity.afl` | **PARTIAL** | Parity is expressible via `Foreign()` on synchronous CE/PE/FUT, but AFL runs here on **daily closes**, not Python's synchronous **minute** bars, so it reproduces the parity **verdict** (FAILS on cost), not a per-trade tie-out. Box/butterfly need the full multi-strike ladder synchronously — **NOT-EXPRESSIBLE**. |
| (d) options old (crude) / new (HAR) | — | **NOT-EXPRESSIBLE** | The signal needs **implied-vol inversion** per strike and a **HAR OLS forecast** with a residual error band, per decision day. Neither the Black-Scholes IV inversion nor a rolling multi-horizon regression is practical in AFL; this is a Python-native computation. |
| (e) E10 — DIRECTION / SIZE / GAP | `afl/e10_gap.afl` | **GAP: EXPRESSIBLE**; DIRECTION: PARTIAL (= same-stock); **SIZE: NOT-EXPRESSIBLE** (needs single-stock options, data-walled) | GAP (fade the overnight gap, required-move gate, open→close) is a clean price rule and is the **primary executable cross-check**. |
| (f) E3 — dividend / expiry events | `afl/e3_events.afl` | **PARTIAL** | Event dates are injected per symbol (AFL cannot enumerate them); the run-up/expiry trades around injected dates are expressible. Post-earnings drift & index incl/excl are **DATA-WALLED** upstream (no dates), so there is nothing to express. |

**Net:** the two cleanly-executable line-by-line cross-checks are **E10 GAP** and **E3 events** (both simple
price/date rules with Python blotters). E1 same-stock reconciles at the **architecture** level. E4 options
and the cross-stock population are **NOT-EXPRESSIBLE** — a finding in itself: a rule you cannot restate in a
second engine is a rule whose edge lives in the selection, not in a transcribable signal.

## 3. RUN + COMPARE — pending the go-ahead

`scripts/afl_crosscheck.py` is written to: `--builddb` (create + import + verify), `--run <afl> <fill>`
(backtest, export the trade list, both fills mid/cross), `--compare <afl> <blotter>` (trade count,
entry/exit dates & prices, P&L per trade, totals, Sharpe — any disagreement flagged as a bug to locate,
never smoothed). These stages **drive the AmiBroker GUI and write a database**; the automated attempt was
**declined this turn**, so the reconciliation table is intentionally empty rather than fabricated:

| Rule | AFL trades | Python trades | count | dates | P&L/trade | total | Sharpe | verdict |
|---|---|---|---|---|---|---|---|---|
| E10 GAP | _pending run_ | | | | | | | |
| E3 events | _pending run_ | | | | | | | |
| E1 arch | _pending run_ | | | | | | | |

## 4. Measured time

- AFL authoring + verified data export: this session (seconds for the export; the four AFL files are
  committed).
- AmiBroker import + backtest + export run time: **not yet measured** — it is the pending step.

## The question for the owner

Driving your AmiBroker unattended (creating the `afl/xcheck_db` database, running the backtester, exporting
trade lists) opens the desktop app and writes to disk; the automated attempt was declined this turn. **May
this session drive AmiBroker unattended to execute the RUN/COMPARE stages?** Everything else — the
independent AFL, the verified export, the expressibility analysis — is delivered above.

_RECORD-ONLY; orders HELD. Audit queued. No result is stated that was not measured._
