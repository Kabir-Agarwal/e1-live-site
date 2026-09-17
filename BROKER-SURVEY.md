# BROKER API SURVEY (R-E1-LAST-BACKTESTS 5)

_Generated 2026-09-18. Survey of Indian equity brokers with a public trading/data API — the machine opens
NO accounts; keys are only ever supplied later by the owner through the one-shot LAN key gate. RECORD-ONLY._

## The brokers (public API, Sept 2026)

| Broker (API) | Account required | API cost | Rate limit (typical) | NSE/BSE | Real-time quotes |
|---|---|---|---|---|---|
| **Zerodha — Kite Connect** | yes (demat) | **paid** (~₹500/mo connect + ~₹2000/mo historical) | ~3 req/s; 3 WS quote modes | NSE/BSE/MCX | yes (WebSocket) — the current feed |
| **Angel One — SmartAPI** | yes | **free** | ~pub. per-endpoint limits | NSE/BSE/MCX | yes (WS) |
| **Upstox — API v2** | yes | **free** | published per-endpoint | NSE/BSE/MCX | yes (WS) |
| **Dhan — API** | yes | free / ~₹500 data (reports conflict) | published | NSE/BSE/MCX | yes (WS) |
| **Fyers — API v3** | yes | **free** | published | NSE/BSE/MCX | yes (WS); noted for deep historical minute data |
| **Finvasia — Shoonya** | yes | **free** | published | NSE/BSE/MCX | yes (WS) |
| **5paisa — API** | yes | free-ish | published | NSE/BSE | yes |
| **ICICI Direct — Breeze** | yes | free | published | NSE/BSE | yes |
| **Kotak — Neo API** | yes | free | published | NSE/BSE | yes |
| **Alice Blue — ANT/Pi** | yes | free | published | NSE/BSE/MCX | yes |
| **Groww — API** | yes | (recently launched) | published | NSE/BSE | yes |
| **Motilal Oswal / Samco** | yes | free/low | published | NSE/BSE | yes |

**Every one requires a demat/trading account** (the owner opens it — never the machine). Most are free with
an account; Kite (the current feed) is the notable paid one. All offer real-time quotes over WebSocket with
an account.

## The recorder stub

`scripts/broker_quote_recorder.py` is **ready to accept a second broker's keys ONLY via the one-shot LAN key
gate** (`scripts/key_gate.py`, the same human path the Kite login uses — the machine hard-codes no key and
opens no account). Once keys exist, it captures that broker's quotes simultaneously with Kite's and measures,
per stock and broker pair: the price difference at the same instant, how often it exceeds a round-trip cost,
how long it lasts, and whether both sides were executable. Demo green; fail-closed without gate-supplied keys.

## Verdict

**A second broker's feed buys no cross-broker ARBITRAGE — it buys feed QUALITY.** Two brokers routing to the
same exchange see the **same order book** (NSE is one book), so a same-exchange cross-broker price difference
is a data-latency / staleness artefact, not an executable edge — you cannot arb one book against itself. The
only genuinely cross-venue difference is **NSE-vs-BSE**, which is engine **E12**'s job (a different book on
each side). So the value of adding a broker is (a) a **free** real-time feed (Angel/Upstox/Fyers/Dhan/Shoonya)
to replace or cross-check the paid Kite feed, and (b) measuring feed latency/quality — not a new arbitrage.
The stub is armed for whenever the owner supplies keys.

_RECORD-ONLY; no account opened, no order path. Audit queued._
