# E4 — LIVE OPTION-CHAIN RECORDER (R-E4-RECORD-LIVE)

_Generated 2026-09-17 19:28 IST. Read-only Kite quote/depth, once per minute on login days; point-in-time chains under `Desktop\e1_deriv_store\live_chains`, stamped with E1's size forecast + regime. E4 (HAR + honest error band) and E10 SIZE run as a walk-forward PAPER log. No orders; token from the owner's daily login only. RECORD-ONLY._

## This week

- Login present now: **no — recorder armed, activates on the next login**.
- Days recorded: **0** · snapshots total: **0** · chain rows stored: **0**.
- Contracts covered (max underlyings in a day): **0**.
- Paper signals fired: **0** · paper P&L: **mid 0.0R / crossing 0.0R**.
- Earliest date a meaningful verdict is possible (≥30 fires, from the current rate): **unknown until recording begins (needs 30 fires; 0 so far)**.

## What is armed

- The recorder enumerates every F&O underlying's current + next expiry, all strikes, CE & PE, plus the near-month futures, and records last/bid/ask/volume/OI once per minute (within Kite's published rate limit).
- Each snapshot is stamped with E1's size forecast and the regime rulers.
- The daily paper log runs the E4 HAR signal and the E10 SIZE route record-only; **a fire is written only when it is genuinely measured** — nothing is fabricated before the chain history exists.

_RECORD-ONLY; no order endpoint exists in this module. Activates on the owner's next Kite login._
