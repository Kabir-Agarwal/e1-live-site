# E7 — the arbitrage desk, in one page
_Updated 2026-09-16 15:58:51 IST. Paper only — no real money, no orders. For the office._

## What this desk does
It watches index and stock options against their own futures and looks for a price that does not add up. A call, a put and the future are tied together by a fixed relationship; when the three drift apart by more than it costs to trade both option legs, that gap is a chance to lock in the difference. The desk pays for both legs, holds until the gap closes, and books the difference. It never guesses direction — it only trades the gap.

## The one line it lives by
> **Call − Put should equal (Future − Strike), discounted for the days left.** When it doesn't, and the gap is bigger than the cost, there is an edge.

## The flaws we found and fixed (audit-3 → v2)
- **Dividends were ignored**, which made almost every 'gap' a mirage. Fixed by pricing off the **future**, which already has dividends and carry baked in.
- **We used to fill at the same second we saw the signal** — impossible in real life. Now we fill at the **next minute's price**.
- **Costs were a guess.** Now every trade is charged the firm's one cost number (0.40% for both legs, round trip).
- **No gate.** Now a trade is only taken if the gap **beats the cost** with a cushion, and **both legs actually traded in the same minute** with real volume.

## What the backtest says (v2, on real history)
- Trades taken: **1500** across 14 names with futures.
- Win rate **0.041**, profit factor **0.014**, expectancy **-0.3827 R** per trade, net **-574.1 R**.
- Where the money went: the market gave **Rs 25,900** before costs; costs took **Rs 600,000**; **net Rs -574,100**.
- **Verdict:** SUPERSEDED — see reports/E7-COST-PROOF.md; v3 re-runs with real lots + real Zerodha F&O cost + real spread

- **Every trade is downloadable:** `E7-BLOTTER-v2.csv` (time, legs, gap, cost, fill, exit, result).

## What today's live run shows
- Alarms raised: 6 · capturable (yes/no): 0/0
- Paper attempts: 0 · open now: 0 · P&L today: Rs 0
- _Live quotes were not available (no broker login today), so the desk recorded alarms only — no paper trades._

_This is an experiment. The backtest stands as it is — pending, negative or positive — and is shown honestly on the site's BACKTEST tab and here._