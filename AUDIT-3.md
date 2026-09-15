# AUDIT-3 — hostile check of the E4 (options) & E7 (arbitrage) backtests, + delivered-vs-ordered scorecard

_Session E1-REBUILD-2, 2026-09-15 IST. Stance: assume the builder cheated and try to convict. Scratch/
read-only; no running job or store checkpoint was touched; nothing was re-tuned. The E1 (equity) backtest
folds into AUDIT-2 when the re-scan certificate lands._

Harness: `scripts/audit3.py` (determinism, signal-PIT poison, 20-breach hand check) + a mutation loop over
the money math. All figures below are measured, not asserted.

---

## A. Cheating check — grade per item

| # | Check | Grade | Finding (measured) |
|---|-------|:---:|--------------------|
| 1 | Future data in signals / IV | **A** | Poison test PASS: blow up every FUTURE bar 5× and a PAST day's realised-vol reference is byte-unchanged; the future values do change (sanity). IV is inverted from the option's OWN same-bar price and same-bar spot. No look-ahead in the signal or the IV. |
| 2 | Holdout report-only | **A** | E4 splits the last 10% of entry-dates as report-only and the rule is FIXED (nothing is fit on train), so the holdout cannot leak into selection. E7 has no selection step (it replays every breach), so a holdout is N/A. |
| 3 | Costs correct & consistent with money.py | **D** | **Not consistent.** E4 charges `FEE_RT=0.0012` (12 bps), `money.COST_RT=0.002` (20 bps), E7 uses `RETAIL_RT_COST_FRAC=0.004` (40 bps) — three different numbers, and **neither backtest imports money.py**. Direction matters: E4 **undercharges** vs the canonical 20 bps → optimistic. (E7's 40 bps for a two-option-leg round trip is defensible but still unsourced.) Fix: one documented options round-trip cost, imported, not three literals. |
| 4 | Fills at the NEXT bar, never same bar | **D** | **Same-bar fills.** E4 enters at the decision day's OWN close (the same close that computed the "IV rich" signal); E7 enters at the breach bar's OWN residual. A strict backtest fills at the next bar's open. This is optimistic. |
| 5 | "Sparse prints, not real arbitrage" claim | **B** | The CONCLUSION (not real arb) is confirmed, but my earlier stated REASON was imprecise. 20 random capturable breaches: **20/20 negative-signed**, 19/20 sit marginally past the 0.4% cost line. A one-signed cluster is a **model bias, not two-sided dislocation** — put-call parity here omits the **dividend yield** (~1%+ on the index), which biases the residual negative. (Open interest is 0 across the whole store, so it is NOT a usable liquidity filter — my first pass wrongly flagged 100% on it; corrected.) So E7's "breaches" are largely a parity-spec artifact, compounded by non-synchronous daily last-prints. |
| 6 | Determinism (byte-identical re-run) | **A** | 5/5 underlyings produce byte-identical E4 and E7 output on re-run. No RNG in the paths. |
| 7 | Mutation test of the money math | **D** | Kill rate **3/7 = 43%**. KILLED: E4 pnl sign (credit−exit), E4 max-loss (width−credit), E4 qty sizing. **SURVIVED: E4 fee sign (gross−fees), E7 convergence-pnl sign (entry−v), E7 win-rate (wins/len), arb result_R scaling (pnl/R).** The tests pin signs/bounds/membership but not exact P&L, so several sign/scaling errors would pass unnoticed. Recommend exact-value assertions on each. |

**Overall E4/E7 verdict.** The backtests are **honest in the ways that matter for the conclusion**: PIT
signals, deterministic, holdout clean. Their real flaws — same-bar fills (check 4) and E4's undercharged
cost (check 3) — all bias results **toward looking better**. E4 still lost and E7 still didn't pay, so the
**negative conclusions are robust**: they hold despite an optimistic bias, not because of a pessimistic one.
The two items to fix before any of this is trusted as a positive result: next-bar fills, and one sourced
cost. E7's negative is mostly a parity-spec artifact (dividend yield) — do not read it as "arbitrage was
tried and failed"; read it as "this parity test, as specified, does not surface tradeable arbitrage."

---

## B. Delivered-vs-ordered scorecard

| Ordered | Status | Proof / honest reason for any gap |
|---------|:---:|-----------------------------------|
| Three engines built | **DELIVERED** | `engine1_rebuild/` (equity), `engine4_options/` (options: honest_e4 + bs + backtest), `engine7_parity/` (parity: feed_sanity + arb + backtest). |
| Three engines backtested, every call | **PARTIAL** | E4 (86 calls) and E7 (483 attempts) backtested — `reports/E4-BACKTEST.json`, `E7-BACKTEST.json`. **E1 pending** the re-scan certificate (folds into AUDIT-2). Reason: DATA/compute — the point-in-time re-scan is still running (~90/210). |
| All NSE stocks | **NOT** (data) | The universe is the 210 F&O stocks; only **30 underlyings have options** in the store, and **zero cash equities exist anywhere on the machine** (exhaustively confirmed earlier). Reason: DATA — the vendor (AmiBroker BestRT) carries F&O only. |
| All metrics | **PARTIAL** | Win rate, profit factor, expectancy, Sharpe, max drawdown, monthly, results-by-regime scaffolding all present for E4/E7. E1's fold in when it certifies. |
| All combos (same-stock; cross-stock, every timeframe, no tiers) | **PARTIAL** | Same-stock = the re-scan (running). Cross-stock = the minute-pair sweep at **140/70,943** pairs (1/3/5-min), permanent+resumable, ~11-day projection. Reason: COMPUTE — this laptop; the always-on cloud box would collapse it. |
| Live paper trading + desk management | **PARTIAL** | `live.py` runs RECORD-ONLY behind the two-key gate; `desk.py` has sizing/stops/conflict/regime-gate (labelled MANAGEMENT-UNTESTED). Correlation-cluster sizing and hedge-by-cause stops (THREE-ENGINE items 3-4) are **not yet built**. Reason: BUILDER — queued behind the re-scan. |
| Public terminal site | **DELIVERED** | GitHub Pages (`terminal/` → `site/`), now incl. `/alarm.html`. https://kabir-agarwal.github.io/e1-live-site/ |
| Alerts | **DELIVERED** | Telegram 3-emoji (⏱/✅/🙋), MacroDroid ring recipe, external healthchecks dead-man (setup 🙋 sent), and the new browser alarm page. |
| Ledger / digest | **DELIVERED** | `reports/E1-BLOTTER.*`, `scripts/lead_digest.py`, `scripts/day_report.py`; published to the site + `/lead-digest.txt`. |

**Reading:** everything that depends only on THIS laptop and the F&O data is delivered; every PARTIAL/NOT
is gated by one of three honest walls — **no cash-equity data exists** (all-NSE-stocks), **this laptop's
RAM/compute** (all-combos, E1 backtest still running), or **build order** (desk items 3-4, queued behind
the re-scan). None is hidden.

---

## C. Publication
This report is committed, published on the site's HOW-IT-WORKS tab and the lead digest, and sent to
Telegram as a document with a ✅ and the scorecard summary.

_Paper only. No order-placing code anywhere. Simulated from the ingested AmiBroker F&O history._
