# E4 — IDEA OR EXECUTION: HAR forecast + capped structure (R-E4-IDEA-OR-EXECUTION)

_Generated 2026-09-17 17:07:53 IST. Execution fixes decided before any result: HAR realised-vol forecast from 1-min data (walk-forward + error band) replacing the crude trailing mean; cheapest capped-loss structure; signal unchanged (sell when IV > forecast+error+cost, buy when below). Holdout report-only; no re-tuning; no typed numbers. Paper only, RECORD-ONLY._

## 1. Forecast accuracy — crude vs HAR (before / after)

| Underlying | days | crude IC | crude RMSE | HAR IC | HAR RMSE | HAR error-band (daily vol) |
|---|---|---|---|---|---|---|
| NIFTY | 374 | 0.186 | 0.000194 | **0.21** | 0.00011429 | 0.01506659 |
| BANKNIFTY | 373 | 0.32 | 0.00019667 | **0.397** | 0.00015435 | 0.01429479 |

IC = correlation of the forecast with the realised next-day variance (out-of-sample). Higher IC / lower RMSE = a better forecast. This is the execution fix measured on its own terms.

## 2. Structure cost per trade

- Defined-risk vertical (E4's structure): **~Rs 12.33** round trip on a BANKNIFTY-lot, ~Rs 200 premium, on the real Zerodha F&O schedule (4 executions: open sell+buy, close buy+sell).
- Cheapest capped-loss structure: **~Rs 12.33** — the same. E4's vertical is already only **two economic legs** (sell the near strike, buy the wing); a single short leg with one bought protective is also two legs, so the per-order brokerage floor is identical. **The leg count is not the cost lever here — the bid/ask spread is.** Charging a cheaper structure changes nothing, because there is no cheaper structure than two legs with defined risk.

## 3. E4 re-run with the HAR forecast (tradeable option data: NIFTY, BANKNIFTY)

- **The corrected build fires ZERO trades on NIFTY and BANKNIFTY** — before: 62 calls under the crude EWMA forecast (+0.73R train+test / −2.28R holdout); after: **0 calls**, both fill models.
- **Why zero, and why that is the finding:** the old EWMA forecast carried a *parametric* error band (se = σ/√(2·N_eff)) that is artificially tight. E4's 62 trades needed IV to clear `forecast + K·se`; with a too-narrow band that hurdle was often beaten. Replace it with the HAR model's **measured** band (the standard deviation of its own out-of-sample residuals — the wider daily-vol figures in §1), and IV essentially **never** exceeds an honest forecast + error by more than cost. In plain words: **once the forecast tells the truth about how uncertain it is, NIFTY and BANKNIFTY option IV is not systematically rich enough to sell.** Most of E4's original trades were the crude band's over-confidence, not a real mispricing.

## VERDICT

**(c) UNDECIDED — but sharpened. The FORECAST fix is real and it works: HAR is materially more accurate than the crude average-of-past-moves on both underlyings (NIFTY RMSE 0.000194 → 0.000114, −41%; BANKNIFTY 0.000197 → 0.000154, −22%; IC up on both). That was the execution question, and the answer is that the execution WAS improvable. But the corrected build does not "pay where the old one lost" (not (a) EXECUTION) — with an honest error band the rich-IV signal fires zero times on the only two liquid underlyings, so there is no edge to harvest here. Nor can the IDEA be convicted (not (b) IDEA) on two index underlyings where the honest signal simply never triggers. The one place the idea could still be alive — the strong per-stock SIZE facts (62–63% out-of-sample) routed to options — is exactly the place with NO tradeable option data.**

DATA WALL: only NIFTY and BANKNIFTY have option chains deep/liquid enough on this laptop; the 208 single-stock F&O names lack option minute chains (1–3 strikes each). Settling IDEA vs EXECUTION for the single-stock universe — where the system's strongest signal lives — requires **PURCHASING single-stock option-chain minute data** (the named remaining test). On the data that exists, the corrected E4 makes no trades: the mispricing it was built to harvest is not present in the two liquid indices once the forecast is honest about its own error.

_RECORD-ONLY; orders HELD. Audit queued._
