# DATA READINESS — the five recording lanes (R-DATA-LANES)

_Generated 2026-09-18 04:16 IST. Each lane keeps a point-in-time store + manifest; this tracks how close each is to having enough to backtest. When a lane turns GREEN its backtest is queued automatically. RECORD-ONLY; nothing here places an order._

| Lane | flag | recorded | min | rate/day | projected enough | store |
|---|---|---|---|---|---|---|
| E4 options | 🔴 red | 0 days recorded | 30 | — | unknown until recording begins | `live_chains` |
| E7 arbitrage-tick | 🔴 red | 0 sessions | 5 | — | unknown until recording begins | `e7_ticks` |
| E12 cross-exchange | 🔴 red | 0 days recorded | 30 | — | unknown until recording begins | `xchange` |
| E13 microstructure | 🔴 red | 0 days recorded | 30 | — | unknown until recording begins | `depth5` |
| E14 retail positioning | 🟡 amber | 1 days recorded | 30 | 1.0 | 2026-10-17 | `e1_positioning_store` |

All lanes are recorder-fed and activate on the owner's Kite login. Currently RED (0 units): **E4 options, E7 arbitrage-tick, E12 cross-exchange, E13 microstructure** — they fill on the next login. When a lane reaches its minimum it flips GREEN and its backtest is queued (a ready-flag under `scheduler/`).

Queued this run: **none**.

_RECORD-ONLY. The live book, roof, E10/E11 logs, season and expiry-week shadows are untouched._
