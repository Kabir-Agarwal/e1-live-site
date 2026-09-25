# E19 finder — the context engine's rulers (R-DEPTH) — 2026-09-25 20:30 IST

_The same exact-condition finder the price side uses, pointed at four context lanes: 5-level depth, retail crowding, macro/overnight, breadth. A ruler's exam runs only when its lane is GREEN on the readiness page; a certified ruler enters PROBATION and never trades on history alone. RECORD-ONLY, no orders._

- **On probation (lane found an edge, must prove live):** 0  ·  **Tested, no edge beyond cost:** 1  ·  **Waiting for lane (not green):** 3  ·  **Green, adapter not wired yet:** 0

| ruler | context lane | lane state | recorded | E19 status |
|---|---|---|---|---|
| **depth-5-level** — the 5-level order-book (bid/ask sizes at five prices) | E13 microstructure | 🟡 amber | 2 | waiting-for-lane |
| **retail-crowding** — how one-sided retail positioning is in a name | E14 retail positioning | 🔴 red | 0 | waiting-for-lane |
| **macro-overnight** — overnight and macro moves before the cash open | L15 macro & overnight | 🔴 red | 0 | waiting-for-lane |
| **breadth** — how many names are advancing vs declining together | L16 breadth | 🟢 green | 892 | tested-no-edge |

_All four lanes fill on the owner's Kite login; each turns green on the readiness page when it reaches its recorded minimum, and only then does E19 run its exam against real facts. Nothing here is fabricated while a lane is empty (§4.4)._
