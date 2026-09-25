# DATA READINESS — the five recording lanes (R-DATA-LANES)

_Generated 2026-09-25 17:15 IST. Each lane keeps a point-in-time store + manifest; this tracks how close each is to having enough to backtest. When a lane turns GREEN its backtest is queued automatically. RECORD-ONLY; nothing here places an order._

| Lane | flag | recorded | min | rate/day | projected enough | store |
|---|---|---|---|---|---|---|
| E4 options | 🟡 amber | 1 days recorded | 30 | 1.0 | 2026-10-24 | `live_chains` |
| E7 arbitrage-tick | 🔴 red | 0 sessions | 5 | — | unknown until recording begins | `e7_ticks` |
| E12 cross-exchange | 🟡 amber | 1 days recorded | 30 | 1.0 | 2026-10-24 | `xchange` |
| E13 microstructure | 🟡 amber | 2 days recorded | 30 | 2.0 | 2026-10-09 | `depth5` |
| E14 retail positioning | 🔴 red | 0 days recorded | 30 | — | unknown until recording begins | `e1_positioning_store` |
| L14 public flows | 🔴 red | 0 observations | 30 | — | unknown until recording begins | `L14_public_flows` |
| L15 macro & overnight | 🔴 red | 0 observations | 30 | — | unknown until recording begins | `L15_macro` |
| L16 breadth | 🟢 green | 892 market-days hunted | 30 | 0.44 | reached | `reports` |

All lanes are recorder-fed and activate on the owner's Kite login. Currently RED (0 units): **E7 arbitrage-tick, E14 retail positioning, L14 public flows, L15 macro & overnight** — they fill on the next login. When a lane reaches its minimum it flips GREEN and its backtest is queued (a ready-flag under `scheduler/`).

Queued this run: **none**.

## Graveyard diaries — failed strategies logged live vs flat (R-GRAVEYARD-DIARY)

| Diary | live fires | live net-R (cross) | vs flat/fire | beats flat > noise? |
|---|---|---|---|---|
| e9-pairs | 0 | 0 | 0.0 | no |
| slow-trend | 0 | 0 | 0.0 | no |
| vol-sizing | 0 | 0 | 0.0 | no |
| gap-fade | 0 | 0 | 0.0 | no |
| shape-sweep-reverse | 0 | 0 | 0.0 | no |
| shape-order-block | 0 | 0 | 0.0 | no |
| shape-breakout-consolidation | 0 | 0 | 0.0 | no |
| breadth-ad-balance | 0 | 0 | 0.0 | no |
| breadth-above-ma50 | 0 | 0 | 0.0 | no |
| breadth-above-ma200 | 0 | 0 | 0.0 | no |
| breadth-nh-nl | 0 | 0 | 0.0 | no |

_A diary is proposed for paper orders only when it beats flat live beyond noise AND passes a fresh walk-forward backtest. Detail: reports/GRAVEYARD-DIARY.md. Diaries fill on login._

_RECORD-ONLY. The live book, roof, E10/E11 logs, season and expiry-week shadows are untouched._
