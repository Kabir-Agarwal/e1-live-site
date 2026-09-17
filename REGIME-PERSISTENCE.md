# E1 — REGIME-SPLIT PERSISTENCE (R-E1-REGIME-PERSISTENCE)

_Generated 2026-09-18 01:18:30 IST. For each certified-pattern family, hit-rate persistence on NON-OVERLAPPING fires recomputed SEPARATELY inside each market regime state (trend × wildness, stamped PIT from the NIFTY index), first-half vs second-half fires within that regime only, vs the mixed-weather number. Walk-forward; no typed numbers; a bucket needs ≥8 non-overlapping fires to split. CANDIDATE-GATE study only — no change to the live book. RECORD-ONLY._

Fires: 937 (875 with a warmed-up regime). Regimes seen: bearish/calm, bearish/normal, bearish/wild, bullish/calm, bullish/normal, bullish/wild, sideways/calm, sideways/normal, sideways/wild.

## Verdict

**NO — accuracy does NOT hold within a regime where it vanishes across them: no (family, regime) bucket shows persistent (both-half >0.5) hit-rate while its family's mixed number is gone. Regime-splitting does not resurrect the edge; the flat, mixed read stands.**

## Per family — mixed vs per-regime persistence

| Family | fires | mixed (1st→2nd) | best in-regime bucket |
|---|---|---|---|
| adx | 28 | thin | none ≥8 fires |
| atr | 20 | thin | none ≥8 fires |
| cci | 12 | thin | none ≥8 fires |
| dist_from_ma | 56 | 0.231→0.188 (n=11) | none ≥8 fires |
| ema | 153 | 0.121→0.063 (n=18) | bearish/wild: 0.0→0.15 (n=8) |
| hist_vol | 62 | 0.188→0.158 (n=13) | none ≥8 fires |
| mfi | 46 | 0.231→0.188 (n=11) | none ≥8 fires |
| obv | 92 | 0.082→0.25 (n=14) | none ≥8 fires |
| pct_from_hilo | 29 | 0.231→0.036 (n=10) | none ≥8 fires |
| roc | 6 | thin | none ≥8 fires |
| rsi | 35 | 0.359→0.409 (n=15) | none ≥8 fires |
| sma | 113 | 0.487→0.306 (n=15) | none ≥8 fires |
| stddev_returns | 75 | 0.121→0.189 (n=18) | bearish/wild: 0.118→0.231 (n=10) |
| vwap | 196 | 0.215→0.354 (n=17) | none ≥8 fires |
| zscore | 14 | thin | none ≥8 fires |

_Persistence = first-half vs second-half Wilson-LB hit rate on non-overlapping fires within the bucket. 'Holds' = both halves > 0.5. A candidate gate is a regime where a family stays accurate while its mixed number does not — a study result, never wired into the live book here._

_RECORD-ONLY; orders HELD. Audit queued._
