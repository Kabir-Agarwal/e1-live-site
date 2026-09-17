# E3 DATES — can TrueData Wealth supply the event calendar? (R-E3-DATES)

_Session E1-REBUILD-2, 2026-09-17. Checked the owner's logged-in TrueData **Wealth** (TrueWealth,
`wealth.truedata.in`) session on this laptop, **read-only** — no clicks that change state, subscribe, or
export. Paper only, RECORD-ONLY._

## What TrueWealth actually exposes (owner logged in, free tier)

TrueWealth has an **NSE & BSE Corporate Filings Event Calendar** (`/calender`) with Day/Week/Month/Year/
List views and filters **All · Corp. Action · Results · Other · Favourites**. It is a genuine, structured
events surface:

| Dataset | In TrueWealth? | Form |
|---|---|---|
| **Results / earnings dates** | **YES** | Calendar "Results" filter + List view: company name, NSE symbol, date, type — forward-looking and navigable across months/years. |
| **Board-meeting / AGM / outcomes** | **YES** | In the live announcements feed and under "Other" (e.g. `Outcome::AGM`, `Intimation::AGM`, analyst-meet intimations), each with a timestamp. |
| **Corporate actions** | **YES** | Corp. Action filter sub-types: **Dividend, Bonus, Rights, Demerger, Merger**. |
| **Index inclusion / exclusion dates** | **NO** | There is **no index-membership category** anywhere — Corp. Action is only Dividend/Bonus/Rights/Demerger/Merger; nothing tracks NIFTY/index additions or drops. |

## The two walls (stated exactly, per the ruling)

1. **NO BULK EXPORT ON THE FREE PLAN.** The only data-out controls in the whole calendar are **"Set Email
   Alert"** and a per-announcement **"Download PDF."** There is no CSV / Excel / bulk download in the
   Month, List, or Year views. The structured, exportable form of this data is TrueData's **paid**
   Corporate Announcements API / Corporate & Fundamental Data API — not the free Wealth UI. So the results/
   board-meeting dates are **viewable and session-readable, but not exportable** on the free plan.

2. **INDEX INCLUSION/EXCLUSION IS ABSENT.** TrueWealth is a corporate-filings product; index-membership
   changes are not one of its datasets at all. There is nothing to export, free or paid, from Wealth for
   the index-change strategy.

## Verdict per strategy

- **(a) Earnings / results-drift — DATA VIEWABLE, NOT FREELY EXPORTABLE.** The result-announcement dates
  exist in Wealth and can be read from the owner's session, but the free plan offers no export, so a
  backtest-grade F&O earnings calendar (2024–2026, ~190 names, aligned to the price store) cannot be pulled
  cleanly without either the **paid TrueData Corporate API** or a targeted multi-season scrape of the
  session. Not fabricated — **blocked on a clean free export.**
- **(c) Index inclusion/exclusion — WALLED.** Not present in TrueWealth in any form. Must come from **NSE
  Indices** (press releases / circulars), the fallback the ruling names.

## Fallback (named, as the ruling directs)

- **Earnings/board-meeting dates → NSE's own corporate-filings pages** (`nseindia.com` → Corporates →
  Board Meetings / Financial Results / Event Calendar), read with a **proper browser session** (they are
  bot-walled to plain fetches). This is itself a scrape, not a clean bulk export, but it is free and
  authoritative — the point-in-time announcement date is the board-meeting-intimation date.
- **Index inclusion/exclusion → NSE Indices press releases** (periodic index reconstitution
  announcements), also session-read. There is no free structured feed for these; each change is a dated
  press release.
- The **clean, paid** alternative for both-in-one is TrueData's **Corporate Announcements + Corporate Data
  API** (structured, historical + forward), which would remove the scrape entirely — a spend decision.

## Bottom line

TrueData Wealth **does** track results/board-meeting dates (a real, well-structured calendar), but **the
free plan gives no export** and **carries no index-membership data** — so E3's earnings-drift and
index-change backtests cannot be built from a clean free TrueData export today. The blocks are named
above; the NSE-session fallback and the paid-API path are the two ways forward. No backtest is reported
because no exportable calendar was obtained — RECORD-ONLY, nothing fabricated.
