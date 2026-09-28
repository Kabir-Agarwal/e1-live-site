# E12 — CROSS-EXCHANGE: NSE-vs-BSE + ETF-vs-basket (R-E1-LAST-BACKTESTS 1)

_Generated 2026-09-18. New engine (docs/architecture/ENGINE_E12.md). RECORD-ONLY; read-only Kite quote
endpoint only, no order path._

## Verdict per sub-part

- **(a) NSE-vs-BSE — DATA-WALLED until recorded.** The store has no BSE single-stock history (only the
  SENSEX index level), so there is nothing to backtest yet. The E12 recorder
  (`engine12_xchange/xchange_recorder.py`) is **ARMED** and wired into the post-login chain: on each Kite
  login it records NSE + BSE read-only quotes for all 95 both-listed F&O names, once a minute, point-in-time
  (`Desktop\e1_deriv_store\xchange`). Days recorded so far: **0**. When snapshots accumulate, the
  gap-vs-cost + next-minute-survival backtest runs. **Built-in caveat:** NSE and BSE are two different order
  books — a same-name gap is a real arbitrage only if BOTH legs are executable at the same instant, which is
  exactly what the recorder measures (next-minute survival + both-side depth).

- **(b) ETF-vs-basket — DATA-WALLED.** No index-ETF price or NAV series is on disk; the index future
  (`NIFTY-I`) exists but has nothing to converge against. The recorder captures the liquid ETFs (NIFTYBEES,
  BANKBEES, SETFNIF50, JUNIORBEES) on login for the future premium/discount + convergence book.

## What was built

- **ENGINE_E12.md** — the cross-exchange engine, four-part defense.
- **engine12_xchange/xchange_recorder.py** — token-gated, fail-closed, read-only; records NSE+BSE quotes for
  the both-listed universe + ETFs; PIT store + manifest; the cross-exchange gap-vs-cost math; demo green
  (196 keys).
- **Armed** via the post-login chain (activates on the owner's next Kite login).

_RECORD-ONLY; orders HELD. Audit queued. Both backtests are named DATA-WALLED, not faked — they run when the
recorder has data._
