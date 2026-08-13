# AI Money Map — Product & Architecture Specification

**Working title:** AI Money Map (repo: `aitracker`)
**Status:** Draft v0.1 for review — decisions marked ⚠️ need sign-off
**Date:** August 13, 2026

---

## 1. Vision

A public, continuously updated, neutral reference for the financial structure of the AI ecosystem: who the players are, how they monetize AI, how much money flows between them, how those flows are recognized in each party's accounts, and what risks (especially circularity and contagion) those structures create.

The ambition is Wikipedia-grade trust applied to a domain currently dominated by hot takes: every number carries a source, every estimate carries a method, every change is versioned, and analytical framings present the strongest form of both the bull and bear case.

**Audiences and what each needs:**

| Audience | Primary need |
|---|---|
| Equity/credit investors | Revenue quality, counterparty concentration, what happens to each balance sheet in a downcycle |
| AI-ecosystem operators | Who funds whom, market structure, precedent terms for deals |
| Regulators / policy | Aggregate exposure, off-balance-sheet structures, private-credit linkages, systemic channels |
| Journalists / public | A verifiable map that replaces contradictory claims with sourced facts |

**Non-goals (v1):** investment advice, price targets, real-time market data, coverage of every AI startup (we track the systemically connected core), paywalled content.

## 2. Design principles

1. **Provenance on every number.** Each figure is an *Observation* with a source URL, source type, date, and a basis tag: `disclosed` (filing/audited), `company_claimed` (PR/blog/exec statement), `press_reported` (reputable outlet), or `estimated` (ours, with method shown). The UI renders the basis as a badge everywhere the number appears.
2. **Git is the database and the audit trail.** All data lives as human-readable JSON in the repo. Every weekly update is a commit; the site links to file history. Anyone can diff what changed and when — the revision-history trust mechanism that makes Wikipedia auditable, for free.
3. **Two-sided accounting, always.** A money flow isn't understood until we can say how *both* parties record it (revenue vs. deferred revenue vs. RPO; capex vs. opex vs. equity-method investment; on- vs. off-balance-sheet). The relationship page template forces this question for every edge.
4. **Separate facts from framing.** Data pages are strictly factual. Analytical content (how to think about circularity, contagion scenarios) lives in clearly labeled *Insights* pages that present competing views with attribution, in the strongest form each side would accept.
5. **Commitments are not revenue.** The single largest source of public confusion is headline deal values ($300B Oracle–OpenAI, $100B Nvidia–OpenAI) vs. money actually moving. Every edge distinguishes `announced` → `contracted` → `realized-to-date`, and the UI never shows a committed number without that label.
6. **Estimates are welcome but quarantined.** AI P&L attribution mostly isn't disclosed; refusing to estimate would make the site useless, but estimates must never masquerade as facts. Estimated figures get a distinct visual treatment, a method note, and a sensitivity range.

## 3. Core data model

Four record types, stored as JSON files validated by JSON Schema in CI. This is the heart of the system — pages, the graph, and all analytics derive from these.

### 3.1 Entity (`data/entities/<id>.json`)

A company, financier, or special-purpose vehicle.

```jsonc
{
  "id": "nvidia",
  "name": "NVIDIA Corporation",
  "kind": "public_company",            // public_company | private_company | financial_institution | fund | sovereign_fund | spv_jv | government
  "category": "chip_designer",         // see taxonomy below
  "tickers": [{ "exchange": "NASDAQ", "symbol": "NVDA" }],
  "cik": "0001045810",                 // SEC identifier, enables automated XBRL pulls
  "fiscal_year_end": "01-31",
  "description_md": "…capiq-style profile…",
  "ai_monetization_md": "…how this company turns AI into money…",
  "ai_strategy_md": "…strategy narrative with sources…",
  "observations": [ /* Observation[] — see 3.3 */ ],
  "sources": [ /* Source[] */ ]
}
```

**Category taxonomy** (node color in the graph): `hyperscaler`, `model_lab`, `neocloud`, `chip_designer`, `foundry`, `memory`, `semi_equipment`, `datacenter_developer`, `energy`, `enterprise_software`, `financier_bank`, `financier_private_credit`, `financier_pe_vc`, `sovereign_fund`, `spv_jv`.

SPVs/JVs are first-class entities, not footnotes — structures like Meta's Hyperion JV or GPU-backed SPVs are precisely where balance-sheet risk hides, and modeling them as nodes makes "who actually holds the asset risk?" answerable from the graph.

### 3.2 Relationship (`data/relationships/<id>.json`) — the edges

One record per distinct financial arrangement between two entities. A pair of companies can have several edges (e.g., Microsoft→OpenAI equity *and* OpenAI→Microsoft cloud spend *and* OpenAI→Microsoft revenue share — three edges, separately sourced).

```jsonc
{
  "id": "nvidia--openai--equity-2025",
  "from": "nvidia",                    // direction MONEY flows
  "to": "openai",
  "type": "equity_investment",         // taxonomy below
  "status": "active",                  // announced | contracted | active | completed | cancelled | disputed
  "headline_value": { "value": 100, "unit": "USD_B", "caveat": "up to; staged tranches" },
  "realized_to_date": { "value": null, "unit": "USD_B", "as_of": "2026-08-13" },
  "annualized_flow_estimate": { "value": null, "unit": "USD_B_per_year", "method": "…" },
  "term": { "announced": "2025-09-22", "start": null, "end": null },
  "conditionality_md": "…tranches gated on gigawatt deployments; termination rights…",
  "accounting": {
    "payer_treatment_md": "Balance sheet: equity-method / cost-basis investment. Does NOT flow through NVDA income statement as expense.",
    "payee_treatment_md": "Equity financing; proceeds fund compute purchases that ARE recognized as supplier revenue.",
    "flags": ["equity_for_revenue"]     // see circularity flags, 3.5
  },
  "related_edges": ["openai--nvidia--gpu-purchases"],  // the return leg(s) of a circle
  "events": [ /* dated Event refs — timeline on the relationship page */ ],
  "observations": [ /* Observation[] for values that change over time */ ],
  "sources": [ /* Source[] */ ]
}
```

**Edge type taxonomy** (edge style in the graph): `equity_investment`, `warrant`, `convertible_debt`, `debt_financing`, `compute_purchase` (cloud/GPU-as-a-service), `hardware_purchase`, `prepayment`, `revenue_share`, `lease`, `spv_capitalization`, `credit_facility`, `vendor_financing`, `cloud_credits`, `acquisition`, `supply_agreement`.

### 3.3 Observation — the atomic sourced fact

Used inside entities and relationships for anything with a value and a date.

```jsonc
{
  "metric": "capex",        // revenue_total | revenue_ai | capex | capex_guidance | rpo | market_cap | net_income | ai_run_rate | depreciation_useful_life | headcount | …
  "period": "FY2026-Q2",    // or ISO date, or "run_rate@2026-07"
  "value": 30.0,
  "unit": "USD_B",
  "basis": "disclosed",     // disclosed | company_claimed | press_reported | estimated
  "method_md": null,        // REQUIRED when basis=estimated
  "confidence": "high",     // high | medium | low
  "source": { "url": "…", "publisher": "…", "published": "2026-07-30", "kind": "sec_filing" },
  "as_of": "2026-08-09"
}
```

### 3.4 Event (`data/events/YYYY-MM/<id>.json`)

Dated occurrences (deal announced, tranche funded, filing published, guidance changed, deal cancelled) that power relationship timelines and the weekly changelog. Each references entities/relationships and carries sources.

### 3.5 Circularity flags (annotations the analytics engine also verifies structurally)

- `equity_for_revenue` — investor's money returns as investee's purchases from the investor
- `warrant_for_revenue` — equity upside granted in exchange for purchase commitments (AMD–OpenAI pattern)
- `vendor_financing` — supplier finances the customer's purchase of its own products
- `round_trip_cloud` — investment delivered partly as credits for the investor's own cloud
- `spv_shift` — capex moved off balance sheet into a JV/SPV the company still effectively controls or guarantees
- `collateralized_gpu_debt` — borrowing secured by chips whose resale value depends on the same demand cycle

## 4. Product surfaces

### 4.1 Home page

**Top: the ecosystem table.** One row per tracked entity. Columns:

| Column | Notes |
|---|---|
| Company (+ category chip) | links to company page |
| Market cap / valuation | public: live-ish; private: last round, labeled |
| How it monetizes AI | one-line summary |
| AI revenue (annualized) | with basis badge |
| Capex (TTM + FY guidance) | |
| Est. AI P&L | estimate badge + link to method |
| Circular exposure | % of revenue/backlog touching flagged circular flows — links to methodology |
| Key counterparties | mini-list, links to relationship pages |

Sortable/filterable by category; a row expands to show that company's edges. Estimated cells are visually distinct (badge + tint), per principle 6.

**Below: the money-flow network graph.**

- **Nodes:** companies; radius ∝ log(market cap or valuation); color = category; SPVs rendered with a distinct outline.
- **Edges:** directed, arrowhead pointing the way money flows; width ∝ annualized flow (committed values shown at reduced opacity/dashed — *commitments are not revenue*); style by type: solid = recognized revenue flows, dashed = commitments/backlog, dotted = equity/warrants, dash-dot = debt/lease.
- **Hover node →** card: name, category, market cap, AI revenue, capex, top 3 counterparties, "open page →".
- **Hover edge →** card: payer → payee, type, headline vs. realized value, one-line accounting treatment each side, circularity flags, "open page →".
- **Click** node/edge → its dedicated page.
- **Controls:** filter by edge type and category; minimum-flow slider; **"show circular flows"** toggle that dims everything except detected cycles and colors each cycle; **"follow the money"** mode — click a node, see all inbound/outbound paths to N hops with cumulative dollars.
- **Layout:** force-directed (D3) with category gravity wells so the picture is stable week-to-week (hyperscalers center-left, labs center, chips right, financiers bottom); positions seeded deterministically so the map doesn't reshuffle every visit — recognizability builds trust.
- **Mobile fallback:** the graph degrades to a ranked edge list.

### 4.2 Company page (`/companies/<id>`)

Terminal-style profile, in order:

1. **Header:** name, category, ticker(s), market cap/valuation, one-line monetization summary.
2. **Description** (CapIQ/Bloomberg-style business summary).
3. **Summary financials table:** revenue, gross margin, opex, net income, capex, FCF, cash & debt — last 4–8 quarters + FY, from XBRL where public; press-sourced for private cos. Basis badges throughout.
4. **AI breakdown:** AI revenue (disclosed segments where they exist, estimates elsewhere), AI-related capex, AI P&L attribution attempt with method, backlog/RPO where relevant, depreciation policy for compute assets (useful-life assumption — a load-bearing number in the bear case).
5. **AI strategy narrative** with sources.
6. **Money flows:** this company's edges as a mini-graph + table (in/out, type, value, counterparty), each linking to its relationship page.
7. **Risk notes:** concentration, circular exposure, financing dependencies — factual, sourced.
8. **Timeline** of events; **changelog** of edits to this page (git-derived).

### 4.3 Relationship page (`/flows/<id>`)

The page type that doesn't exist anywhere else on the internet, and our core differentiator:

1. **Header:** A → B, type, status, headline value vs. realized-to-date (side-by-side, always).
2. **Nature of the deal:** what is actually being exchanged, term, conditionality (take-or-pay? cancellable? gated tranches?).
3. **Accounting treatment — two columns**, payer and payee: where it sits in each income statement / balance sheet / cash-flow statement, what's in RPO vs. recognized, what's off-balance-sheet.
4. **Circularity analysis:** flags, the return-leg edges that close the loop, net-flow calculation where estimable ("of the $X A pays B, B has committed $Y back to A via …").
5. **Timeline** of events with sources.
6. **Both-sides framing** where the deal is contested: the strongest sourced version of "this is rational strategic alignment" and "this is manufactured demand."

### 4.4 Insights section (`/insights/…`)

Labeled analysis, separate from data pages. Launch set:

- **Circularity: what it is, when it matters, how to price it.** Taxonomy of circular structures (§3.5) with live examples from our data; the honest version of both cases; a framework for revenue-quality haircuts (what multiple should funded revenue command vs. organic revenue); historical base rates — Lucent/Nortel/Cisco vendor financing in 1999–2001, what was and wasn't analogous.
- **Contagion: mapping the downcycle.** Interactive stress test on the real graph: pick a demand shock (e.g., "frontier-lab compute spend −30%"), the engine propagates it edge-by-edge using contract quality (take-or-pay survives, cancellable doesn't, equity marks down, GPU-collateralized debt gets margin-called), and shows per-node P&L/balance-sheet impact and who ultimately holds the losses (equity, credit funds, SPV lenders). Assumptions exposed as editable sliders.
- **The depreciation question.** Useful-life assumptions per company vs. actual GPU pricing/utilization data; sensitivity of reported earnings to a 1-year change.
- **Off-balance-sheet structures.** SPVs/JVs mapped, who bears residual asset risk.
- **Methodology** + **Glossary** (RPO, take-or-pay, equity method, vendor financing, residual value guarantee…) + **Sources & corrections policy**.

### 4.5 Changelog (`/changelog`)

Weekly digest, one entry per update run: new/changed edges, new filings ingested, metric revisions, corrections. Doubles as an RSS/email artifact later. This page is what makes "live" credible.

## 5. Analytics engine (build-time)

Pure TypeScript, runs at build; outputs derived JSON the site renders. All formulas documented on the methodology page.

1. **Cycle detection:** enumerate simple cycles in the directed graph (money out → money back, ≤4 hops); each detected cycle cross-checked against manual flags; discrepancies surface in CI as review items.
2. **Circular Exposure Score (per company):** share of revenue + backlog attributable to counterparties that the company (or its co-investors in the same structure) helps finance, weighted by financing share. Reported as a range, not false precision.
3. **Concentration metrics:** top-1/top-3 counterparty share of revenue and of RPO.
4. **Commitment coverage:** for net spenders (OpenAI et al.): total committed obligations vs. identified funding capacity — the "who pays for all this?" number.
5. **Contagion propagation:** shock vector → iterate flows with per-edge pass-through coefficients derived from contract type; parameters user-adjustable in the UI, defaults documented.

## 6. Architecture & stack

**⚠️ Recommendation (needs sign-off):**

| Layer | Choice | Why |
|---|---|---|
| Data store | JSON files in `/data`, JSON Schema validation in CI | Provenance, diffability, PR-able contributions, zero infra |
| Site | **Astro** (static output) + React islands + Tailwind | Page-per-entity/edge generated from data collections; near-zero client JS except the graph; MDX for insights essays |
| Graph viz | D3 force layout in one React island | Full control over hover cards, edge styling, cycle highlighting |
| Analytics | TypeScript scripts at build time (`/scripts`) | No server; every derived number reproducible from the repo |
| Charts on pages | Lightweight SVG (D3/Observable Plot) | consistency, no heavy chart lib |
| Hosting | GitHub Pages via Actions (custom domain optional) | Free, deploys on push — the weekly commit *is* the deploy |
| CI | GitHub Actions: schema validation, link checks, cycle-flag reconciliation, build | Trust = the data can't silently break |

Alternative considered: Next.js static export (fine, heavier); a database-backed app (rejected for v1 — kills the git-audit-trail trust story and adds ops burden for no v1 feature).

**Repo layout:**

```
/data
  /entities/*.json         /relationships/*.json
  /events/YYYY-MM/*.json   /schemas/*.schema.json
/scripts                   # ingest (EDGAR, market caps), validate, derive, changelog
/site                      # Astro app (pages render from /data + /derived)
/derived                   # build-time analytics output (committed for diffability)
SPEC.md  METHODOLOGY.md  CONTRIBUTING.md
```

## 7. The weekly update rhythm — Saturday 8:00 pm ET

The product commitment: **every Saturday evening the data is reconciled against the week's filings and news, and the changelog says exactly what changed.**

Pipeline per run:

1. **Mechanical ingest (scripted):** pull latest quarterly XBRL facts (revenue, capex, RPO, segments) from SEC EDGAR for all public tracked entities; refresh market caps; fetch new 8-K/10-Q/10-K filings list since last run.
2. **News & filings sweep (agentic):** a scheduled Claude session reviews the week's AI-finance news and new filings against the dataset; drafts data updates — new edges, revised observations, new events — every change carrying a source.
3. **Validation:** JSON Schema, referential integrity (edges point at real entities), basis rules (no `estimated` without method), link liveness.
4. **Derive + build + changelog:** analytics engine, site build, human-readable changelog entry.
5. **Commit + push** → CI deploys. The commit message is the changelog summary.

**Scheduling mechanism (⚠️ sign-off):** a scheduled Claude Code session (a "Routine") firing weekly — cron `0 0 * * 0` UTC = Saturday 8:00 pm ET during daylight time (winter: fires 7:00 pm ET, or we adjust the cron seasonally; scheduler is UTC-based). Each run opens fresh, executes the pipeline, commits, pushes. Runs that find nothing material still commit a "no material changes" changelog entry — silence must be distinguishable from staleness.

Corrections between Saturdays (a bad number found mid-week) are pushed immediately; the weekly rhythm is a floor, not a ceiling.

## 8. Data sources

Verified as practical for an unattended weekly pipeline on a near-zero budget (as of Aug 2026):

| Need | Source | Automation notes |
|---|---|---|
| Public-co fundamentals (revenue, capex, RPO) | **SEC EDGAR XBRL APIs** — `companyfacts` / `companyconcept` at `data.sec.gov` | Free, no auth, explicitly automation-friendly. Requires a `User-Agent: <name> (<email>)` header; ≤10 req/s. Key tags: `PaymentsToAcquirePropertyPlantAndEquipment` (capex — add finance-lease ROU assets for Microsoft-style leasing), `RevenueRemainingPerformanceObligation` (RPO — the Oracle/Microsoft backlog number). Watch fiscal-year offsets (NVDA FY ends late Jan). |
| New filings & deal disclosures | **EDGAR submissions API + full-text search** (`efts.sec.gov`) | Weekly sweep of new 8-K/10-Q/10-K; full-text queries on counterparty names ("OpenAI" in others' filings) catch deal disclosures. Endpoint shape is unofficial — wrap defensively. |
| Segment / "AI revenue" detail | Filing-level XBRL or transcripts | The XBRL summary APIs carry **no dimensional/segment data** — segment revenue (e.g., Intelligent Cloud) needs filing-level parsing or prose extraction. Quarterly job, not weekly. |
| Private-co financials (OpenAI, Anthropic, xAI) | **Epoch AI datasets** (epoch.ai/data/ai-companies, /ai-data-centers) — CC-BY 4.0 CSVs | Best-in-class free source: revenue run-rates, funding, compute spend, with per-datapoint confidence ratings; updated ~weekly. Credit Epoch. Supplement with hand-entered press numbers (The Information, Reuters, Bloomberg) recorded as `press_reported` with source + confidence. |
| Market caps | **Stooq daily price CSV** × shares outstanding from EDGAR cover-page XBRL (`dei:EntityCommonStockSharesOutstanding`) | Fully free and automatable. yfinance is fallback-only (CI IPs get rate-blocked). Alpha Vantage free tier (25 req/day) too small; FMP free tier (250/day) workable if needed. |
| Transcripts (AI commentary, prose-only numbers) | Motley Fool transcripts; NVIDIA CFO Commentary PDF from IR; prepared remarks via 8-K exhibits | Quarterly cadence; scraping is ToS-gray → keep low-volume, prefer IR/8-K documents. |
| Weekly news sweep | **GDELT DOC 2.0 API** (free, ~250 records/query) + Google News RSS (low volume) | Dedupe → triage → **review queue; news never auto-publishes a data change without agentic/human review**. Bing News API is retired (Aug 2025) — don't plan on it. |

Pipeline principle: EDGAR is the backbone of record for public companies; Epoch is the backbone for private ones; news feeds only *nominate* changes, they never write directly to data.

## 9. Seed dataset (launch universe)

<!-- RESEARCH-PENDING: ~25–35 entities and ~40+ edges with current values, from deal-map research -->

## 10. The intellectual core: circularity & contagion framework

<!-- RESEARCH-PENDING: grounded survey of the debate (named bulls/bears, quantitative frameworks proposed, dot-com precedents) feeding the Insights section outlines -->

## 11. Prior art & differentiation

What exists today (surveyed Aug 2026):

- **News-org graphics** — Bloomberg maintains a standing "AI Circular Deals" graphics page (grown from its Oct 2025 feature; refreshed when major deals land); FT, WSJ, Reuters, CNBC and Visual Capitalist have published one-off circular-deal diagrams. All are editorial snapshots: paywalled or static, no per-deal records, no primary-source citations per edge, no export.
- **ai-circular-economy.com** — the closest direct prior art: an interactive network graph (~26 companies, ~65 deals, typed edges, source link per figure), but manually maintained by a single person, with no company fundamentals, no per-deal permalink pages, no methodology framework, and no automation.
- **AI-bubble dashboards** (aibubble.watch, boomorbubble.ai, etc.) — indicator gauges answering "is it a bubble?"; none represent entity-to-entity money flows.
- **Epoch AI data hubs** — free CC-BY datasets on AI companies (revenue, funding, compute spend, with confidence ratings) and data centers (satellite/permit-derived capex); rigorous but tabular — no deal graph, no bilateral edges.
- **The Information / SemiAnalysis** — the deepest data (AI Data Center Database; 5,000+ tracked datacenters, accelerator installed-base models) but institutionally priced; defines the quality ceiling, not accessible prior art.
- **Niche trackers** — Fierce Network's editorial "Encyclopedia of AI Deals" (list, no data), Tow Center's publisher-licensing-deals tracker (different niche, good per-deal-record model), several facility-map projects.
- No maintained public **network dataset** of AI corporate money flows exists in academia either — a genuine gap.

**The open lane, and our differentiation:** nobody combines (1) automated weekly refresh, (2) per-deal permalink pages with primary-source citations and revision history, (3) company fundamentals (XBRL capex/revenue/RPO) joined to the deal graph, (4) two-sided accounting treatment per flow, (5) open data export, and (6) a documented neutrality methodology. That combination — roughly *ai-circular-economy.com's format × Epoch's rigor and licensing × Wikipedia's page/versioning model × weekly automation* — is this project. Main incumbent risks: Bloomberg keeping its graphic continuously fresh, or Epoch adding a graph view; both lack the per-deal accounting depth that is our core.

## 12. Trust & governance

- **Source hierarchy:** audited filings > unaudited company disclosures > company statements/PR > tier-1 press (with named sourcing) > analyst estimates > our estimates. When sources conflict, show both with dates.
- **NPOV rules for narrative text:** attribute all judgments; no unattributed adjectives ("aggressive", "unsustainable") in data pages; contested framings get both sides in their strongest form.
- **Corrections:** public corrections log; errors fixed in place with a note, never silently.
- **History:** every page links to its git file history.
- **Disclaimer:** educational reference, not investment advice; prominently but not defensively worded.
- **Contributions (Phase 4):** PRs against `/data` with required sources; maintainer review; this is the path to Wikipedia-like community trust if the project earns an audience.

## 13. Phased roadmap

| Phase | Scope | Exit criterion |
|---|---|---|
| **0 — Spec** (this doc) | Align on design & decisions | Sign-off on ⚠️ items |
| **1 — Foundation** | Schemas, seed dataset (hand-built, fully sourced), Astro site: home table + graph + company pages + relationship pages + methodology stub | Site deployed; every number sourced |
| **2 — Live** | Ingest scripts (EDGAR, market caps), weekly Routine wired up, changelog page, validation CI | Three consecutive autonomous Saturday updates with correct output |
| **3 — Analytics** | Cycle detection, exposure scores, interactive contagion stress test, insights essays | Contagion explorer public; methodology page complete |
| **4 — Trust at scale** | Contribution flow, corrections process, RSS/email digest, custom domain | First outside contribution merged |

## 14. Open decisions for review (⚠️)

1. **Stack:** Astro static + JSON-in-git + GitHub Pages (recommended above) — approve or prefer Next.js/hosted DB?
2. **Estimates policy:** publish our own labeled estimates for undisclosed figures (recommended — the site is toothless without them) vs. reported-only?
3. **Scores:** show a computed "circular exposure" number per company (recommended, with methodology link) vs. flags only? A score is an opinion; it trades some neutrality for usefulness.
4. **Universe v1:** the ~30-entity seed list in §9 — additions/removals?
5. **Naming & domain:** keep `aitracker` / pick a product name and custom domain?
6. **Weekly run:** confirm the scheduled-session mechanism and the DST handling choice for the 8pm ET Saturday slot.

---

*Sections 8–11 are being populated from live research (current deal facts, the risk debate, prior art, and data-source assessments) in this same working session.*
