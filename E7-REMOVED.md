# E7 ARBITRAGE — REMOVED AS AN ENGINE (R-E7-REMOVE)

_Session E1-REBUILD-2, 2026-09-17. Owner ruling: E7 is removed as an engine — no alarms, no attempts, no
site tab, no Telegram lines. Its read-only Kite quote reader is kept as a shared data feed (renamed to
`data_acquisition/quote_feed.py`) and its per-instrument data-fault flag is moved into the desk. Paper
only, RECORD-ONLY._

## Why E7 is removed — the evidence, in one place

Every honest, look-ahead-free test said the same thing: **there is no retail arbitrage edge here.**

- **Put-call parity — FAILS on cost.** Run on SYNCHRONOUS minute bars with next-bar fills and the real
  F&O cost schedule: net **−3,497R** (floor) across 7,957 attempts. The "gaps" the daily-close view showed
  **vanish before a retail fill** — by the time a retail order reaches the book the mispricing is gone, and
  what remains does not clear the round-trip cost of three legs.
- **Conversion / reversal — inherits parity.** It is the parity residual traded the other way; it fails
  for the same reason (net −3,497R).
- **Basis / cash-and-carry — below cost.** Across 5 index underlyings the basis rarely exceeds carry +
  cost; mean net **−130.6 per unit**. The carry trade does not pay at retail.
- **Box / butterfly — a daily-close artifact, not an edge.** The "98% net-positive" box on BankNifty was
  a **synchronisation artifact**: different strikes last-trade at different seconds and the per-strike
  option spread was unmodelled. The moment you demand synchronous prices and real spreads (as parity does),
  the edge is gone.
- **Calendar, index-vs-basket, NSE-vs-BSE — data-walled** (no far-month futures series, no Nifty
  constituent weight file, no BSE single-stock cash). None reachable to even test at retail.

**The one-line reason (the ruling's words): gaps vanish before a retail fill; the survivors are below
cost.** An engine that cannot surface a fillable, cost-clearing edge after this much testing should not be
spending alarms, Telegram lines, a site tab, or compute — so it is removed.

## What was removed (E7 no longer runs or surfaces)

- **No attempts:** the E7 runners (`run_e7.py` watchman loop, `run_e7_live.py` minute paper-arb,
  `run_e7_v2.py` backtest) are removed from `START_E1_ALL.bat`, so the watchdog no longer resurrects them;
  removed from the pause-list and the watchdog one-shot set.
- **No alarms / no Telegram:** those runners were the only source of E7 Telegram cards and feed-watchman
  alarms — with them unlaunched, E7 says nothing on Telegram.
- **No site tab:** the "E7 — parity and feed watchman" row is removed from the engines page
  (`site_build.py`), the E7 desk card and `_e7_state_words` from the terminal data (`terminal_data.py`),
  and the E7-EXPERIMENT block from the terminal HTML.
- **No roof freeze:** the roof brake no longer reads `e7_state` or freezes the desk on an E7-severe state.
- **Status prints:** the E7 watchman light and E7 build-status lines are removed from the lead digest.

## What was KEPT

- **The read-only Kite quote reader → `data_acquisition/quote_feed.py`** (renamed from
  `engine7_parity/live_feed.py`): a shared, read-only `/quote`+depth reader (`available()`, `poll()`,
  spread recorder). It calls only the walled read-only quote endpoint and places no order. Retained as a
  shared data feed for any engine that needs live quotes.
- **The per-instrument data-fault flag → the desk** (`engine1_rebuild/desk.py`): the staleness / OHLC-
  coherence / zero-or-negative-price checks that flag a bad feed (a data fault is not a trade) now live in
  the desk, where the whole book can read them, independent of the removed engine.

## What was left as frozen history (not deleted)

The E7 backtest scripts (`engine7_parity/backtest_e7*.py`, `v3_engine.py`), the dormant runners, and the
historical reports (`reports/E7-*.md`, `reports/ARB-EIGHT.md`, `reports/AUDIT-3.md`) stay on disk as the
record of what was tested and why it failed. They no longer run, import into the live path, or surface.

_RECORD-ONLY. The removal is a scope change the owner directed; the reader and the data-fault flag are the
two pieces worth keeping._
