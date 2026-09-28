# RETAIL POSITIONING (R-E1-LAST-BACKTESTS 4)

_Generated 2026-09-18. Survey of which brokers/sites publish clients-holding %, most-bought/most-sold or
similar — FREE and WITHOUT login — and whether any can be built into a ruler and hunted. RECORD-ONLY._

## What is free and login-free

| Source | What it shows | Free / no login | History? |
|---|---|---|---|
| **Groww — "Most Bought Stocks on Groww"** (`groww.in/stocks/most-bought-stocks-on-groww`) | a **ranked list** of the most-bought stocks by Groww users | **yes** (public page) | **no** — a live snapshot only |
| Zerodha / Upstox "most bought" | most-bought lists | in-app / login-gated | no public history |
| NSE / aggregators (Trendlyne, StockEdge, MoneyControl) | FII/DII flows, "most active", mutual-fund holdings | mixed; per-stock RETAIL holding-% is **not** published free | — |
| "% of clients holding" (Robinhood-style) | penetration per stock | **not published free by any Indian broker** | — |

**Finding:** the one genuinely free, no-login retail-positioning source is **Groww's public most-bought
ranking**. There is **no free source for per-stock "percentage of clients holding"** in India (that data is
in-app or paid). NSE and the aggregators publish institutional flows (FII/DII, MF holdings), not retail
positioning.

## Can it be hunted?

Not yet — **DATA-WALLED on history.** The Groww ranking is a **live snapshot with no time series and no
percentage**, so a contrarian/confirming ruler (does a stock being heavily bought by retail predict under-
or out-performance?) cannot be backtested: there is no past ranking to test on. What is built instead:

- **`scripts/positioning_recorder.py`** — a read-only, no-login daily recorder of the Groww most-bought
  ranking (stores `{date, rank, symbol}` under `e1_positioning_store`). Fail-closed if the page is JS-only
  or blocked (records nothing, never fabricates a ranking). Demo green. It accrues the walk-forward history
  the hunt needs.

## Verdict

**Retail positioning — one free source (Groww most-bought ranking), but DATA-WALLED for a backtest** (live
snapshot, no history, no holding-%). The recorder is armed to build the history going forward; the
contrarian/confirming hunt runs once enough daily rankings accumulate. Per-stock "clients holding %" is not
free anywhere in India. No ruler was fabricated without data.

_RECORD-ONLY; orders HELD. Audit queued._
