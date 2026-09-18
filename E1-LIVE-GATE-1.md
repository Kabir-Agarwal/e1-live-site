# E1-LIVE-GATE-1 — live-safety gaps from AUDIT-3, fixed

_Paper only; no order code added; the running scan/watchdog were not touched. Tests: `tests/test_live_gate.py`
(18 tests). Every test and the dry run redirect the KILL flag/state and the breaker day-flags to a temp dir._

## State found vs the audit's description

The audit described `run_live.py → live.py → live_engine.py` as the ungated order-writing path. As built today
that loop's order-*writing* branch had already been removed (R-HOLD-AND-FIX: it writes only a record-only
JSON). But it was still ungated in every other sense: `record_only` was read once at session start, it never
consulted KILL / the hold / the breaker, the moment light was fail-open, and it kept simulating new entries.
All of that is fixed below.

## What now stops a live paper entry (checked on EVERY poll of the intraday loop)

| Gate | Where | Fails closed? |
|---|---|---|
| Telegram **KILL** | `live.live_gate` → `kill_switch.orders_allowed()` | yes |
| **Circuit breaker** (measured worst streak = 6) | `live.live_gate` calls `circuit_breaker.check(1, streak)` then `engine_allowed(1)` | yes |
| **Order hold** (R-HOLD-AND-FIX hold · two-key gate · positive-verdict hold) | `live.live_gate` | yes |
| **Moment light** (read-only quote) | `live_engine.run_session`: only `moment_ok is True` trades | yes — no quote/None/red = no entry |
| Any gate raising | `live.live_gate` → `(False, "gate error")` | yes |

A closed gate is recorded as a closed span (`live.track_closed`); `run_session` refuses every new entry that
fires inside one, so a KILL stops new entries from the next poll on while entries decided earlier stand. A
gate closed at the open closes the day from 00:00. Recorders never call the gate, so they keep running.
The evening path already takes its authority from `gate.order_ok()` (same gates, fail-closed) — proven by test.

**Today, with nothing stubbed: live would place orders = False (reason: order hold).**

## Dry-run KILL result (temp flags; live files untouched)

```
DRY RUN — KILL flag/state + breaker flags in C:\Users\LENOVO\AppData\Local\Temp\tmpcxdv3v3t (live files untouched)
0. real state today (hold in force):  live would place orders = False | reason: order hold
1. hold stubbed OPEN (to isolate KILL): live would place orders = True
2. after KILL:                         live would place orders = False | reason: KILL
3. after RESUME:                       live would place orders = True
4. breaker: measured worst streak = 6 | live streak 7 -> (False, 'circuit breaker')
5. live files after:  KILL flag exists = False | breaker day-flag exists = False
```

## Per item

| # | Item | Done | Commit |
|---|---|---|---|
| 1 | Gate the intraday loop per poll (KILL + hold), fail-closed | **wired** — `live.live_gate` every poll + closed spans in `run_session` | ba7e402 |
| 2a | Intraday moment light fail-closed | **fixed** — `moment_ok is True` required; docstrings corrected | de32421 |
| 2b | Evening gate fail-closed | **already so** (`gate.order_ok`, no `_sys_ok`) — proven by test | bdfba1b |
| 3 | Call `circuit_breaker.check()` in the live loop | **wired** — every poll, measured threshold (6), tracks even while held | bf6e212 |
| 4 | Desk trade-management rules | **relabelled** (not wired) — see below | 648a87b |
| 5 | Typed constants | **listed** for follow-up — nothing changed | this report |

### Item 4 — per rule (the record now matches the code)
Chosen: **relabel**. The named intraday loop runs none of these and is retired from order-writing; wiring
management into it would build on a ruled-dead path. Where each rule really stands:

| Rule | Status in code |
|---|---|
| Wiggle stop (measured 90th-pctl MAE) | **Relabelled — not wired live.** Backtest only; the 20-day path uses a flat 1×ATR. |
| Break-even | **Wired in `book20_runner` (the single order path) — but HELD, never run live.** |
| Trailing stop | **Wired in `book20_runner` — HELD.** |
| Partial at target | **Wired in `book20_runner` — HELD.** |
| Insured carry | **Relabelled — not live.** `eod_carry_gate` called with insurance cost 0.0 (nothing priced). |
| Hedge-by-cause | **Relabelled — not live.** Called with a placeholder beta; result discarded. |
| Limit-at-mid | **Relabelled — not the live fill.** Superseded by fill-at-the-touch; mid is a would-be column only. |

Corrected: `reports/CONFORMANCE.md` row 5 (had "put-carry + hedge-by-cause … apply live"), `book20_runner`
docstrings/inline "(wired)" comments, the stop cause label, and the ENTRY trade card's stop wording.

## Item 5 — typed constants still in the code (follow-up; none changed here)

| Constant | Governs today | Class | Follow-up |
|---|---|---|---|
| `DAY_HALT_R = −10` (live_engine) | the intraday loop's day halt on new entries | **should be MEASURED** | replace with the book's own measured worst daily drawdown (as `desk.book_guard` already does) |
| `STOP_ATR = 1.0`, `TGT_ATR = 1.5` (live_engine); 1×ATR stop / 1.5×ATR partial (book20) | intraday exits; 20-day stop + partial | **should be MEASURED** | wire `paper.pattern_stop_atr` (measured MAE) into book20; retire the intraday template |
| `HALF_SPREAD = 0.0005` (money) | spread charged until depth is recorded | **should be MEASURED** (mechanism exists: `money.half_spread()`) | needs the depth recorder to fill on a Kite login |
| `CUSHION_M = 0.05` (money) | breakeven cushion fallback | **should be MEASURED** (mechanism exists: `money.cushion()`) | activates once the blotter carries fire counts |
| `KELLY_FRACTION = 0.25` (desk) | shadow sizing diaries only (book sizes flat 1R) | **owner-set at funding** (risk appetite) | owner decision when funding is discussed |
| `PAPER_R_RUPEES`, `NOTIONAL_CAPITAL`, `MAX_OPEN` (money) | 1R size, stated capital, position cap | **owner-set at funding** | owner decision |

Also noted: `scripts/replay_session.py` (a research replay with no recorded quotes) now grades fires but takes
no entries — the intended consequence of the fail-closed moment light.

_RECORD-ONLY. The money/allocator/roof pipeline was not touched. Audit queued (AUDIT-QUEUE #57)._
