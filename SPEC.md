# AI Money Tracker — Product & Architecture Specification

**Product name:** AI Money Tracker (repo: `aitracker`)
**Status:** Draft v0.2 — core decisions ratified by the project owner (see §14 decision log)
**Date:** August 13, 2026

---

## 1. Vision

A public, **open-source**, continuously updated, neutral reference for the financial structure of the AI ecosystem: who the players are, how they monetize AI, how much money flows between them, how those flows are recognized in each party's accounts, and what risks (especially circularity and contagion) those structures create. The goal is to become the **de facto source of truth for AI-ecosystem financials** — thorough enough that every audience below finds their questions answerable here, and trusted enough that outsiders want to contribute to it.

The ambition is Wikipedia-grade trust applied to a domain currently dominated by hot takes: every number carries a source, every estimate carries a documented method, every change is versioned and reviewed, and analytical framings present the strongest form of both the bull and bear case.

**Audiences and what each needs:**

| Audience | Primary needs |
|---|---|
| Equity investors | Revenue tracking, cost tracking, cash-flow tracking, counterparty-risk tracking, balance-sheet risks, financial valuation, securities-mispricing identification, comparables |
| Credit investors | Cash-flow tracking, counterparty-risk tracking, balance-sheet tracking, credit-risk tracking, credit valuation, comparables |
| AI-ecosystem operators | Financial stability of partners, partnership suitability, risk assessment, M&A opportunities |
| Regulators / policy | Aggregate exposures, off-balance-sheet structures, private-credit and private-equity linkages, systemic risks |
| Journalists / public | A verifiable, high-trust, open-source map that replaces and grounds contradictory claims and opinions on social media with sourced facts |

**Coverage universe:** all systemically connected AI-ecosystem companies — hyperscalers, labs, chips, the full physical supply chain (power, electrical, cooling, construction), neoclouds and data-center operators, financiers, application-software incumbents with material AI businesses, and key international players including China — plus **any AI-native company with ≥$1B valuation or ≥$100M revenue**. Target scale: ~500 entities (tiered by coverage depth, §9).

**In scope (revised from v0.1):** near-real-time market data (prices/market caps via API Ninjas). **Non-goals (v1):** investment advice, price targets or recommendations, tick-level trading data (we show current quotes, not a trading terminal), paywalled content.

## 2. Design principles

1. **Provenance on every number.** Each figure is an *Observation* with a source URL, source type, date, and a basis tag: `disclosed` (filing/audited), `company_claimed` (PR/blog/exec statement), `press_reported` (reputable outlet), or `estimated` (ours, with method shown). The UI renders the basis as a badge everywhere the number appears.
2. **Git is the database and the audit trail.** All data lives as human-readable JSON in the repo. Every weekly update is a commit; the site links to file history. Anyone can diff what changed and when — the revision-history trust mechanism that makes Wikipedia auditable, for free.
3. **Two-sided accounting, always.** A money flow isn't understood until we can say how *both* parties record it (revenue vs. deferred revenue vs. RPO; capex vs. opex vs. equity-method investment; on- vs. off-balance-sheet). The relationship page template forces this question for every edge.
4. **Separate facts from framing.** Data pages are strictly factual. Analytical content (how to think about circularity, contagion scenarios) lives in clearly labeled *Insights* pages that present competing views with attribution, in the strongest form each side would accept.
5. **Commitments are not revenue.** The single largest source of public confusion is headline deal values ($300B Oracle–OpenAI, $100B Nvidia–OpenAI) vs. money actually moving. Every edge distinguishes `announced` → `contracted` → `realized-to-date`, and the UI never shows a committed number without that label.
6. **Reported first; estimates welcome but quarantined.** Ratified policy: where a reported figure exists, it is always used and preferred. Where nothing is reported (AI P&L attribution mostly isn't), we publish estimates — but the estimate's assumptions and derivation process must be documented and **easily accessible to the reader** (one click from the number: method note, inputs, sensitivity range), and estimated figures carry a distinct visual treatment everywhere they appear.
7. **Open by construction.** Code and data are open-source. Anyone can propose updates, error corrections, improvements, or new features via pull request; every contribution passes the same validation gates and human review. Review/approval authority starts with the project owner and widens to additional maintainers as the project scales (§12).

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

**Category taxonomy.** Two levels: a fine-grained `category` and a coarse `group` (used for node color — ~500 nodes need a legible legend). Groups → categories:

- **Labs & AI-native** — `model_lab`, `ai_native` (agents/apps/robotics/media startups meeting the $1B/$100M threshold)
- **Hyperscalers & clouds** — `hyperscaler`, `neocloud`, `datacenter_operator` (REITs/colo/miners-turned-AI), `datacenter_developer`
- **Compute supply chain** — `chip_designer`, `foundry`, `memory_storage`, `semi_equipment_eda`, `packaging_substrate`, `network_optics`, `server_oem_odm`, `power_semis`
- **Physical infrastructure** — `electrical_equipment` (Eaton/Schneider/Vertiv class), `cooling_thermal`, `engineering_construction` (Quanta/EMCOR/Comfort Systems class), `materials_cables`
- **Energy** — `power_utility`, `power_generation_ipp`, `nuclear_smr`, `turbines_gensets`, `energy_other`
- **Software & applications** — `enterprise_software` (incumbents with material AI businesses: Salesforce, ServiceNow, Adobe, SAP, Palantir…), `consumer_platform`
- **Capital** — `financier_bank`, `financier_private_credit`, `financier_pe_vc`, `sovereign_fund`, `insurer`, `spv_jv`
- **Government & state** — `government_program` (state funds, sovereign AI programs, subsidy vehicles)

Entities also carry `region` (`us`, `europe`, `china`, `japan`, `korea`, `taiwan`, `middle_east`, `india`, `other`) — China's semi-parallel ecosystem (Huawei/SMIC/Cambricon/DeepSeek/Alibaba et al.) and the export-control boundary are part of the money map, not an afterthought.

**Coverage tiers.** ~500 entities can't all get equal depth on day one; each entity carries a `tier`:

- **Tier 1 (~60):** full treatment — complete financials, all edges, narrative sections, weekly refresh.
- **Tier 2 (~150–200):** fundamentals (via automated ingest) + significant edges + short profile; refreshed weekly by automation, narratives quarterly.
- **Tier 3 (rest to ~500):** identity card (name, category, scale, AI relevance, key relationships list) + market data; promoted to Tier 2 when they become systemically connected or a contributor fleshes them out.

Tier is a coverage-depth label, never a judgment of importance — the UI says "coverage: basic" not "minor company."

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
| Revenue quality mix | compact stacked bar: share of revenue+backlog by quality tier (see below) with the financed/circular share as headline % |
| Top counterparty | largest customer's share of revenue/RPO, links to that relationship |
| Key counterparties | mini-list, links to relationship pages |

**Presenting circularity (ratified design direction: clearest and most useful for investors, not a black-box score).** The primary presentation is a *decomposition, not an index*: each company's revenue+backlog split into visible tiers — **T1 organic** / **T2 financed at arm's length** / **T3 circular** (customer funded partly by the seller or its consortium) / **T4 committed-but-unfunded** (backlog from counterparties without identified funding) — rendered as a compact stacked bar in the table, in dollars on the company page, with every dollar traceable one click down to the specific edges and sources that put it in that tier. The advantages over a composite score: the units are dollars, the definition is on the label, the evidence is inspectable, and an investor can apply their own haircut per tier (§10.3). A derived sort key (`financed revenue share` = T3+T4 %) exists for ranking/filtering — explicitly labeled as derived from the mix, never presented as a rating. Credit investors additionally get commitment-coverage and debt-location (on-BS vs SPV) columns on the credit view of the table.

Sortable/filterable by category, group, region, and tier; a row expands to show that company's edges. Default view shows Tier 1 (~60 rows) with search/filters across all ~500; estimated cells are visually distinct (badge + tint), per principle 6.

**Below: the money-flow network graph.**

- **Nodes:** companies; radius ∝ log(market cap or valuation); color = category; SPVs rendered with a distinct outline.
- **Edges:** directed, arrowhead pointing the way money flows; width ∝ annualized flow (committed values shown at reduced opacity/dashed — *commitments are not revenue*); style by type: solid = recognized revenue flows, dashed = commitments/backlog, dotted = equity/warrants, dash-dot = debt/lease.
- **Hover node →** card: name, category, market cap, AI revenue, capex, top 3 counterparties, "open page →".
- **Hover edge →** card: payer → payee, type, headline vs. realized value, one-line accounting treatment each side, circularity flags, "open page →".
- **Click** node/edge → its dedicated page.
- **Controls:** filter by edge type and category; minimum-flow slider; **"show circular flows"** toggle that dims everything except detected cycles and colors each cycle; **"follow the money"** mode — click a node, see all inbound/outbound paths to N hops with cumulative dollars.
- **Layout:** force-directed (D3) with group gravity wells so the picture is stable week-to-week (hyperscalers center-left, labs center, chips right, financiers bottom, energy/physical-infra as an outer ring); positions seeded deterministically so the map doesn't reshuffle every visit — recognizability builds trust.
- **Scale handling (~500 nodes):** default view renders Tier 1 nodes + edges above a flow threshold (legible, ~60 nodes); "expand" controls add tiers/categories/regions progressively; search jumps to any node with its ego-network. Full-graph mode exists but is a deliberate choice, not the landing state.
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
2. **Revenue-quality decomposition (per company):** assign every revenue/backlog dollar to a quality tier (T1 organic / T2 arm's-length financed / T3 circular / T4 committed-unfunded) based on the edge graph — the primary circularity output (§4.1). Tier boundaries reported as ranges where attribution is uncertain, not false precision. The derived `financed revenue share` (T3+T4) is the sortable summary statistic.
3. **Concentration metrics:** top-1/top-3 counterparty share of revenue and of RPO.
4. **Commitment coverage:** for net spenders (OpenAI et al.): total committed obligations vs. identified funding capacity — the "who pays for all this?" number.
5. **Contagion propagation:** shock vector → iterate flows with per-edge pass-through coefficients derived from contract type; parameters user-adjustable in the UI, defaults documented.

## 6. Architecture & stack

**Ratified:**

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

**Secrets handling:** the pipeline uses two paid keys supplied by the project owner — API Ninjas (market data) and OpenRouter (LLM extraction). Keys live only in GitHub Actions secrets (CI) and local `.env` files (git-ignored); the repo documents required keys in `CONTRIBUTING.md` but never contains them. The public site never needs a key — all API access happens at build/ingest time, and only the resulting data is published. Contributors' PRs run validation without secrets; ingest jobs run only on the maintained branch.

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

1. **Mechanical ingest (scripted, auto-mergeable):** pull latest quarterly XBRL facts (revenue, capex, RPO, segments) from SEC EDGAR for all public tracked entities; refresh prices/market caps for the full ticker universe via **API Ninjas**; fetch new 8-K/10-Q/10-K filings list since last run. These are schema-validated numeric refreshes from sources of record — they merge automatically when validation passes.
2. **News sweep with LLM triage (scripted):** GDELT/Google News queries per entity and per live deal → dedupe → a **cheap OpenRouter model** classifies and extracts candidate facts (deal announced/changed, amounts, parties, accounting hints) into structured nominations with the source article attached. Nominations never write to data directly — they feed step 3. Quality bar: extraction prompts demand quotes + URLs; anything the model can't ground gets dropped, not guessed.
3. **Editorial review (agentic + human):** a scheduled Claude session reviews the week's nominations and new filings against the dataset, drafts the actual data updates — new edges, revised observations, new events, each with sources and confidence — and opens a **pull request**. The project owner (initially; maintainers later, §12) reviews and merges. High-quality information is the product; nothing editorial ships unreviewed.
4. **Validation (CI, on every PR):** JSON Schema, referential integrity (edges point at real entities), basis rules (no `estimated` without documented method), link liveness, cycle-flag reconciliation.
5. **Derive + build + changelog:** analytics engine, site build, human-readable changelog entry; merge → CI deploys. The commit message is the changelog summary.

**Scheduling (ratified):** a scheduled Claude Code session (a "Routine") firing weekly — cron `0 0 * * 0` UTC = Saturday 8:00 pm ET during daylight time (winter: fires 7:00 pm ET; scheduler is UTC-based). Each run opens fresh, executes the pipeline, and leaves a merged mechanical update plus an editorial PR awaiting review. Runs that find nothing material still record a "no material changes" changelog entry — silence must be distinguishable from staleness.

Corrections between Saturdays (a bad number found mid-week) are pushed immediately; the weekly rhythm is a floor, not a ceiling.

## 8. Data sources

Verified as practical for an unattended weekly pipeline on a near-zero budget (as of Aug 2026):

| Need | Source | Automation notes |
|---|---|---|
| Public-co fundamentals (revenue, capex, RPO) | **SEC EDGAR XBRL APIs** — `companyfacts` / `companyconcept` at `data.sec.gov` | Free, no auth, explicitly automation-friendly. Requires a `User-Agent: <name> (<email>)` header; ≤10 req/s. Key tags: `PaymentsToAcquirePropertyPlantAndEquipment` (capex — add finance-lease ROU assets for Microsoft-style leasing), `RevenueRemainingPerformanceObligation` (RPO — the Oracle/Microsoft backlog number). Watch fiscal-year offsets (NVDA FY ends late Jan). |
| New filings & deal disclosures | **EDGAR submissions API + full-text search** (`efts.sec.gov`) | Weekly sweep of new 8-K/10-Q/10-K; full-text queries on counterparty names ("OpenAI" in others' filings) catch deal disclosures. Endpoint shape is unofficial — wrap defensively. |
| Segment / "AI revenue" detail | Filing-level XBRL or transcripts | The XBRL summary APIs carry **no dimensional/segment data** — segment revenue (e.g., Intelligent Cloud) needs filing-level parsing or prose extraction. Quarterly job, not weekly. |
| Private-co financials (OpenAI, Anthropic, xAI) | **Epoch AI datasets** (epoch.ai/data/ai-companies, /ai-data-centers) — CC-BY 4.0 CSVs | Best-in-class free source: revenue run-rates, funding, compute spend, with per-datapoint confidence ratings; updated ~weekly. Credit Epoch. Supplement with hand-entered press numbers (The Information, Reuters, Bloomberg) recorded as `press_reported` with source + confidence. |
| Prices & market caps (near-real-time) | **API Ninjas** — `/v1/stockprice`, `/v1/marketcap` (owner-supplied key) | `X-Api-Key` auth. Developer tier (~$39–59/mo, 100K calls/mo, commercial use, real-time) covers 500 tickers weekly at ~4% of quota. Claims international exchange coverage — test our non-US tickers (TSMC, SK Hynix, Samsung, ASML, Siemens…) before relying on it. Fallback: Stooq CSV × EDGAR shares outstanding. |
| Fundamentals cross-check | **API Ninjas** — `/v1/incomestatement`, `/v1/balancesheet`, `/v1/cashflow` (incl. `capital_expenditures`), `/v2/earnings` | US SEC filers only (it's SEC-derived, so EDGAR XBRL remains our source of record); useful as a standardized cross-check and for quick backfills. Historical years are premium-gated — covered by the same paid tier. |
| News/filing extraction | **OpenRouter** (owner-supplied key) — triage: `deepseek/deepseek-v4-flash` (~$0.08/$0.18 per M tokens); extraction: `google/gemini-3.1-flash-lite` or `openai/gpt-5-mini` with strict `json_schema` mode | OpenAI-compatible API. At ~1,000 articles/week triaged + ~100 deep-extracted: **≈$0.50/week** — cost is a rounding error, so model choice optimizes extraction quality, not price. Prompts must demand verbatim quotes + URLs; ungrounded output is dropped. `:batch` variants halve cost if async fits the cron. |
| Transcripts (AI commentary, prose-only numbers) | Motley Fool transcripts; NVIDIA CFO Commentary PDF from IR; prepared remarks via 8-K exhibits | Quarterly cadence; scraping is ToS-gray → keep low-volume, prefer IR/8-K documents. |
| Weekly news sweep | **GDELT DOC 2.0 API** (free, ~250 records/query) + Google News RSS (low volume) | Dedupe → triage → **review queue; news never auto-publishes a data change without agentic/human review**. Bing News API is retired (Aug 2025) — don't plan on it. |

Pipeline principle: EDGAR is the backbone of record for public companies; Epoch is the backbone for private ones; API Ninjas supplies live market data; the OpenRouter extraction layer and news feeds only *nominate* changes — they never write directly to data (§7 step 3 reviews every editorial change).

## 9. Seed dataset (launch universe)

Ratified scope: **~500 entities**, tiered per §3.1. The full census — including the physical-infrastructure supply chain (electrical equipment, cooling, power, engineering & construction labor), China and international players, application-software incumbents, and AI-natives meeting the $1B/$100M threshold — lives in [`UNIVERSE.md`](./UNIVERSE.md), which is the working document that becomes Tier-2/3 entity records in Phase 1.

This section lists the **Tier-1 core**: the entities and edges that get full hand-built treatment first, compiled from live research on Aug 13, 2026. Values are headline figures; the data files will carry the committed/realized distinction, accounting treatment, and citations.

### 9.1 Tier-1 entities (~60)

- **Model labs:** OpenAI ($852B, Mar 2026 round; ~$25B ARR Feb 2026; projected 2026 loss ≥$14B), Anthropic ($965B Series H May 2026; run-rate $9B→~$47B Dec 2025→May 2026), xAI (merged into SpaceX Feb 2026, combined ~$1.25T at merger).
- **Hyperscalers:** Microsoft (~$3.6T; CY26 capex plan ~$190B; Azure >$100B/yr), Alphabet (~$4.6T; 2026 capex $195–205B; Cloud +82% y/y), Amazon (~$3.1T; ~$220B capex; AWS backlog ~$496B), Meta (~$1.5T; capex $130–145B), Oracle (RPO **$638B**, +363% y/y; FY27 net capex ~$70B). Big-4 combined 2026 capex ≈ **$725B, +77% y/y**.
- **Chips & supply chain:** Nvidia (~$5.0–5.4T; FY26 revenue $215.9B; **4 customers = 61% of revenue**; >$40B equity bets across the ecosystem in 2026 YTD), AMD, Broadcom (FY26 AI revenue guide ~$56B), TSMC (HPC = 66% of revenue), SK Hynix (~58% HBM share), Samsung, Intel (Nvidia investee).
- **Neoclouds & DC developers:** CoreWeave (backlog ~$129B; debt ~$30B; spreads widening), Nebius (~$46B Microsoft+Meta contracts), Lambda, Crusoe (Stargate Abilene), Nscale, Vantage, Aligned (acquired $40B by AIP/MGX/GIP), Fluidstack.
- **SPVs / JVs (first-class nodes):** Stargate LLC (SoftBank ~40% / OpenAI ~40% / Oracle+MGX ~20%; $500B target), Hyperion JV (Meta 20% / Blue Owl 80%; $27B bonds), Meta El Paso SPV ($12.5B, BlackRock-led), xAI GPU SPV (~$20B: Valor equity anchor, Nvidia ≤$2B, ~$12.5B debt via Apollo/Diameter), AI Infrastructure Partnership (BlackRock/GIP + Microsoft + MGX + Nvidia + xAI).
- **Financial players:** SoftBank (>$60B into OpenAI; sold entire Nvidia stake to fund it), MGX, Blue Owl, PIMCO (~$18B Hyperion bonds), BlackRock/GIP, Apollo, Blackstone, Brookfield, KKR, Goldman Sachs, JPMorgan (co-lead $38B Vantage project debt), Morgan Stanley (arranged Hyperion; forecasts ~$570B AI debt issuance in 2026), MUFG, Valor Equity, Bank of America (OpenAI's first bank line, $520M).

### 9.2 Seed edges (~40, grouped by cluster)

**OpenAI cluster** — the densest node:
| Flow | Type | Headline |
|---|---|---|
| Nvidia → OpenAI | equity (**LOI dead**) | $100B Sept-2025 LOI never signed; superseded ↓ |
| Nvidia → OpenAI | equity, paid | $30B in the $122B round (Mar 2026) |
| Nvidia → OpenAI | debt guarantee, in talks | up to ~$250B backstop (Piketon OH campus) |
| Amazon → OpenAI | equity | $50B ($35B contingent on IPO/AGI milestone) |
| SoftBank → OpenAI | equity | >$60B cumulative |
| Microsoft → OpenAI | equity (historical) | $13.8B → 27% of OpenAI PBC |
| OpenAI → Microsoft | cloud commitment + rev share | $250B Azure commit; 20% rev-share now capped, exclusivity ended (Apr 2026 restructuring) |
| OpenAI → Oracle | compute contract | ~$300B/5yr from 2027 (dominates Oracle RPO) |
| OpenAI → AWS | compute contract | $38B/7yr + $100B/8yr expansion |
| OpenAI → CoreWeave | compute contracts | ~$22.4B (≈⅓ of CRWV contracted revenue) |
| OpenAI → AMD | GPU purchases | 6GW; first GW deploying 2H26 |
| AMD → OpenAI | warrant | up to 160M shares @$0.01, milestone-vested (contra-revenue accounting) |
| OpenAI → Broadcom | custom ASICs | 10GW co-developed |
| OpenAI → Google Cloud | compute contract | undisclosed (June 2025) |
| BofA → OpenAI | credit line | $520M — first bilateral bank loan |
| SoftBank/OpenAI/Oracle/MGX → Stargate | JV equity | $500B/10GW target; >$400B "in motion" |

**Anthropic cluster:**
| Flow | Type | Headline |
|---|---|---|
| Amazon → Anthropic | equity | $8B + $5B (2026); ~$53B fair-value gain booked Q2 26 |
| Anthropic → AWS | compute commitment | >$100B over a decade incl. up to 5GW Trainium |
| Google → Anthropic | equity + cloud | ~$3B equity; TPU deal up to 1M TPUs / >1GW |
| Anthropic → Broadcom | TPU capacity | ~3.5GW Google-designed TPUs from 2027 |
| Microsoft ≤$5B + Nvidia ≤$10B → Anthropic | equity | Nov 2025 announcement |
| Anthropic → Azure | compute commitment | $30B |
| Anthropic → Fluidstack | DC investment | $50B US buildout |
| Investors → Anthropic | Series H | $65B at $965B post (incl. Blackstone, Brookfield, Micron, Samsung, SK Hynix) |

**Meta & financier structures** — where off-balance-sheet lives:
| Flow | Type | Headline |
|---|---|---|
| Meta ↔ Blue Owl (Hyperion JV) | SPV capitalization | 80/20 JV; $27B A+ notes (PIMCO $18B); Meta took ~$3B distribution; residual-value guarantee |
| Meta ↔ BlackRock (El Paso SPV) | SPV bonds | $12.5B at ~7.53% — visibly costlier than Hyperion |
| Meta → bond markets | corporate debt | ~$25–30B (Oct 2025); Big-5 issued ~$121B bonds in 2025 |
| Meta → CoreWeave | compute | ~$35B through 2032 |
| Meta → Nebius | compute | up to $27B |
| Nvidia + Apollo/Blackstone/BlackRock/Brookfield/GS/KKR → Nvidia customers | financing coalition | **>$500B** compute-collateralized SPV financing (announced Aug 10, 2026) |
| AIP/MGX/GIP → Aligned | acquisition | $40B |
| JPMorgan/MUFG et al. → Vantage | project debt | $38B for Oracle-leased OpenAI sites |
| Banks → SoftBank | loans for OpenAI stake | $40B loan + $10B margin loan **collateralized by the OpenAI stake** |
| Blue Owl → Amazon | DC capital | $12B campus |

**Nvidia's investment web & neocloud financing:**
| Flow | Type | Headline |
|---|---|---|
| Nvidia ↔ CoreWeave | equity + backstop ↔ GPU purchases | ~5% stake; $6.3B capacity backstop through 2032 |
| Nvidia → xAI SPV | equity into GPU-leasing SPV | ≤$2B of $20B SPV that buys Nvidia GPUs (off xAI's balance sheet) |
| Nvidia → Intel | equity | $5B |
| Nvidia → Nokia/Lumentum/Coherent/Synopsys/Nebius/Nscale | equity | ~$1–2B each; >$40B total 2026 commitments |
| Microsoft → CoreWeave/Nebius/Lambda/Nscale | compute contracts | ~$60B+ across the four |
| CoreWeave → debt markets | GPU-backed + unsecured debt | ~$30B total; spreads +125bp Aug 2026 |
| OpenAI-linked developers → debt markets | project debt | ~$100B accumulated |

### 9.3 Why weekly updates are the product (evidence from Feb–Aug 2026 alone)

A Jan-2026 snapshot would today be wrong about nearly every major edge: the Nvidia–OpenAI $100B deal died; Microsoft–OpenAI was rewritten (exclusivity gutted, rev-share capped); xAI merged into SpaceX; Anthropic's run-rate quintupled and reportedly passed OpenAI's; OpenAI missed internal targets and pushed its IPO to 2027; the AI story moved decisively into **credit** (Morgan Stanley: ~$570B AI debt issuance in 2026; El Paso pricing at 7.53%; lenders demanding covenants; SoftBank margin-lending against its OpenAI stake); Nvidia stood up the $500B financier coalition; and ~$130B of US data-center projects were blocked or delayed in Q1 2026 (contested — SemiAnalysis rebuts the "half of 2026 builds delayed" framing). Deal snapshots rot in weeks; a maintained graph with a changelog is the moat.

Known data-quality flags to encode as low-confidence observations from day one: CoreWeave's FY26 revenue guidance conflicting with H1 actuals; Nvidia–Intel stake value discrepancies ($9.5B per 13F vs. higher press claims); Meta's Oct-2025 bond size ($25B vs $30B reports); private valuations are round marks, not traded prices; Microsoft-backlog-share-of-OpenAI figures come from secondary trackers, not filings.

## 10. The intellectual core: circularity & contagion framework

The user-facing goal: help a reader answer *"how should circularity risk be priced?"* and *"how does contagion spread in a downcycle?"* without telling them what to conclude. This section maps the live debate (surveyed Aug 2026) and defines the framework the tracker will build on top of it.

### 10.1 The debate we must represent fairly

**Bear case (attributed):** Burry (Scion) — hyperscalers understate depreciation ~$176B cumulatively 2026–28 by using 5–6-year lives for shorter-economic-life GPUs; "not Enron… clearly Cisco." Chanos — vendor financing at a scale dwarfing the ~$100B dot-com precedent (Lucent $8.1B/Nortel $3.1B/Cisco $2.4B): "if demand were that strong you wouldn't need to finance your customer." Einhorn — **$1 of loss-making end-customer revenue cascades into >$8 of recognized supply-chain revenue**; went capital-preservation Apr 2026. Zitron — OpenAI as the single point of failure (~$748B of performance obligations across Microsoft/Amazon/Oracle). Cahn (Sequoia) — 2026 infra spend ~$1.5T requiring ~$3T annual revenue to justify. Kedrosky — AI capex >1.2% of GDP in short-lived depreciating assets; lenders should price OpenAI "like a sovereign-backed utility."

**Bull case (attributed):** Huang — "the notion that it's circular is preposterous"; ~$1T of revenue visibility through 2027; Nvidia's checks are a fraction of customers' outside fundraising (Nvidia's Nov 2025 IR memo rebuts Enron/Lucent analogies point-by-point). CoreWeave — A100 contracts running into 2029, H100s re-leasing at ~95% of original price (the depreciation-life defense). O'Laughlin/SemiAnalysis — the buildout is fundable; 2026 drawdowns are rate-of-change repricings within a continuing cycle. Noah Smith — this is legitimate vendor financing (GM financing car buyers), not round-tripping; the real cost is added *correlation*, not fake revenue.

**Referees:** Usvyatsky/Deep Quarry — the depreciation issue is stale estimates, not fraud; Amazon's 6→5-year change cost $677M/9mo, material but far from Burry's scenario. Bain — $2T/yr of new revenue needed by 2030, ~$800B shortfall. Allianz — capex/revenue divergence ~46% vs 32% at the 2001 telecom peak.

**Official sector (2026 — the debate moved from equity to credit):** IMF GFSR Apr 2026 (framework below); Fed FSR May 2026 (AI is now the top-cited risk); BoE July 2026 (AI ≈ half of S&P 500 cap vs a quarter in 2022); BIS Bulletin 120 (private credit to AI borrowers $200B+, heading $300–600B by 2030); Chicago Fed (bank C&I commitments to AI-adjacent industries ≈ 25% of Tier 1 capital); Sens. Warren et al. pressing FSOC/OFR to probe the "AI debt bubble" (Jan 2026). Live market signals: CoreWeave CDS implying ~50% 5-yr default probability (Jul 2026); Oracle CDS at records with its own project-finance banks hedging via Oracle CDS; Fitch: record 6.0% US private-credit default rate (Apr 2026).

Every one of these positions becomes sourced content in Insights pages; none becomes the site's voice.

### 10.2 Quantitative building blocks that already exist (we adopt, cite, and connect them)

| Building block | Source | What it gives us |
|---|---|---|
| AI value-stack taxonomy + exposure heatmap (73 firms, 8 layers) | IMF GFSR Apr 2026 Fig 1.17 | A vetted classification and per-layer leverage/valuation scoring to align our entity taxonomy with |
| **Circularity premium**: ~7pp of the 12pp late-2025 outperformance of "AI-circle" firms attributable to intra-circle correlation ≈ ~$40B/firm of market cap | IMF GFSR Fig 1.18 | The first official *price* on circularity — the number that reverses in stress |
| Obsolescence stress test: implied useful life ~7yrs; at 3yrs hyperscaler EBIT margin −9pp+, debt >$1T, CDS +60bps | IMF GFSR Box 1.4 | A published sensitivity we can re-run per company with our data |
| $1.5T external-financing gap decomposition (private credit $800B+, ABS $150B, IG bonds…) | Morgan Stanley 2026 | The funding-side map for our financier nodes |
| Capex → debt-issuance share: $405B/26% (2025) → ~$750B/33% (2026) → ~$1.14T/35% (2027E) | Goldman Sachs | Trend lines for the changelog to track against |
| Cascade multipliers: $1 end-revenue → >$8 supply-chain revenue (Einhorn); $10B Nvidia investment → ~$35B GPU purchases (NewStreet, 3.5×) | investor letters/analyst notes | Simple, citable propagation coefficients as defaults in the stress engine |
| Bank/insurer exposure: AI C&I ≈ 25% of Tier 1 commitments; ~$1T insurer private-credit holdings; ~$1.2T total AI-company debt (JPM est.) | Chicago Fed / Moody's / JPM | The last hop of the contagion chain |
| CDS-implied default probabilities (CoreWeave, Oracle) | market data | Live counterparty-risk observations for relationship pages |

**The gap we fill:** no one has published a standardized revenue-quality haircut or a cross-exposure matrix at the entity level. The IMF heatmap, Chicago Fed tables, Bloomberg's graph, and CDS quotes are disconnected building blocks; joining them per-company, per-edge, continuously, is the tracker's original contribution.

### 10.3 Our framework

**(a) Revenue-quality decomposition (per company).** Split revenue/backlog into tiers: T1 organic (paying customers, no financing link), T2 financed-but-arm's-length (customer independently funded), T3 circular (customer funded in part by the seller or its consortium — Nvidia→OpenAI→Nvidia; warrant-linked AMD revenue; backstopped neocloud revenue), T4 committed-not-yet-real (RPO from counterparties whose funding for the commitment is unidentified — the Oracle case: RPO $638B, >50% OpenAI per BofA, against OpenAI's identified resources). Publish the tier mix with sources; let readers apply their own multiples per tier. We show *worked examples* of haircut math (e.g., "at a 50% haircut to T3/T4, company X trades at …×") without endorsing a number — the pricing question becomes calculable instead of rhetorical.

**(b) Contagion stress engine (per scenario).** The canonical chain assembled from the research: OpenAI demand shortfall → Oracle RPO fails to convert → Oracle's $153B debt + lease obligations strain → project-finance banks ($38B Vantage package et al.) and SPV lenders hit → private credit funds gate → insurers (~$1T private credit) absorb; parallel leg: Nvidia loses OpenAI-linked DC revenue while its equity stakes mark down simultaneously (correlation, the IMF's amplification point). The engine formalizes exactly this: user picks shock size and node; edges propagate by contract quality (take-or-pay/penalty-backed RPO propagates hard; cancellable commitments evaporate; equity marks to zero-order; GPU-collateralized debt margin-calls); defaults for pass-through coefficients seeded from the published multipliers in 10.2 and editable in the UI. Output: per-node revenue/EBIT/balance-sheet impact and a "who ultimately holds the loss" waterfall (equity → credit funds → insurers/banks).

**(c) The depreciation lens.** Per-company table: stated useful life, implied useful life (PP&E/depreciation, IMF method), earnings sensitivity per year of life change (Amazon's disclosed $677M/9mo change as calibration), plus the contract evidence on both sides (CoreWeave re-lease rates vs. "couldn't give Hoppers away"). Pure disclosure journalism — highest trust-per-effort feature on the site.

**(d) Historical base rates.** A standing page comparing this cycle to 1999–2001 vendor financing with actual numbers ($100B then vs. multi-hundred-billion now; Lucent's path from financing customers to bankruptcy; also the differences — today's funders are cash-rich) and to other capex manias (railroads, telecom). Base rates, not predictions.

### 10.4 Weekly monitoring list (feeds the Saturday routine)

Primary docs to poll: Oracle RPO + CDS; Microsoft 10-Q OpenAI equity-method line (the only public window into OpenAI's P&L — implied ~$11.5B quarterly loss in Q3 CY2025); AMD warrant-vesting disclosures; Nvidia 10-Q investment/concentration notes; CoreWeave debt + CDS; Meta SPV disclosures (EDGAR full-text: "special purpose", "useful life", "remaining performance obligations"). Secondary: Bloomberg circular-deals page, Burry's Substack, Where's Your Ed At, Kedrosky, SemiAnalysis, Deep Quarry; quarterly: IMF GFSR / Fed FSR / BoE FSR / BIS releases; The Information for private-co numbers; Senate Banking for FSOC escalation.

Caveat discipline: several widely-cited numbers are analyst estimates, not disclosures (Burry's $176B, the $300B Oracle-OpenAI RPO split, JPM's $1.2T, Zitron's $748B); CDS-implied PDs come from thin markets. All enter the dataset as `press_reported`/`estimated` with confidence ratings — never presented as fact.

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

**Open-source model (ratified — from day one, not Phase 4):**

- **Licensing (recommendation, needs owner confirmation):** code under **MIT**; data and written content under **CC BY-SA 4.0** — attribution keeps the project's name on every reuse, share-alike keeps derivative datasets open (the Wikipedia licensing model). Epoch-sourced data retains its CC-BY attribution.
- **Contribution flow:** all changes — updates, error corrections, improvements, new features — arrive as pull requests. `CONTRIBUTING.md` specifies the sourcing standard (every factual change needs a source meeting the hierarchy above; estimates need a documented method), schema requirements, and style rules. CI validates every PR identically whether it comes from automation, a maintainer, or a stranger.
- **Review ladder:** the project owner is the sole reviewer/approver initially (`CODEOWNERS` on `/data` and `/site`). As the project scales, contributors with a track record of accepted, well-sourced PRs are promoted to maintainers with merge rights over defined areas (e.g., a category or region); the owner retains final authority over methodology and governance changes. The ladder itself is documented publicly in `GOVERNANCE.md` so the path to trust is visible — that visibility is what converts readers into contributors.
- **Issue intake:** error reports are first-class — a "report an error" link on every page opens a pre-filled GitHub issue naming the exact record and observation. Corrections get priority review.

## 13. Phased roadmap

| Phase | Scope | Exit criterion |
|---|---|---|
| **0 — Spec** (this doc) | Align on design & decisions | Core decisions ratified (§14) — done |
| **1 — Foundation** | Schemas; open-source scaffolding (LICENSE, CONTRIBUTING, GOVERNANCE, CODEOWNERS, PR/issue templates, validation CI); Tier-1 seed dataset (~60 entities, ~80 edges, hand-built, fully sourced) + Tier-2/3 identity cards from the census (§9); Astro site: home table + graph + company pages + relationship pages + methodology stub | Site deployed; every number sourced; a stranger can open a valid data PR |
| **2 — Live** | Ingest scripts (EDGAR, API Ninjas, Epoch), OpenRouter news-triage pipeline, weekly Routine wired up (PR-based editorial flow), changelog page | Three consecutive Saturday cycles: mechanical auto-merge + editorial PR reviewed and merged |
| **3 — Analytics** | Cycle detection, revenue-quality decomposition live on the table, interactive contagion stress test, insights essays, depreciation lens | Contagion explorer public; methodology page complete |
| **4 — Scale & trust** | Tier-2 coverage to ~200 entities with automated fundamentals; Tier-3 to ~500; RSS/email digest; custom domain; maintainer ladder activated | First outside contribution merged; first non-owner maintainer appointed |

## 14. Decision log & remaining open items

**Ratified by the project owner (Aug 13, 2026):**

1. **Stack** — Astro static + JSON-in-git + GitHub Pages, as specified in §6. ✓
2. **Estimates policy** — reported figures always preferred; estimates permitted where nothing is reported, with assumptions and derivation documented and easily accessible to the reader (§2 principle 6). ✓
3. **Circularity presentation** — clearest-for-investors decomposition (revenue-quality mix with drill-down to edges), not a black-box score; derived summary % only as a sort key (§4.1). ✓
4. **Universe** — vastly expanded: ~500 entities across the full ecosystem incl. physical infrastructure, energy, China/international, application software, and AI-natives at ≥$1B valuation or ≥$100M revenue; tiered coverage (§3.1, §9). ✓
5. **Name** — **AI Money Tracker**. ✓
6. **Weekly run** — scheduled session, Saturdays 8pm ET (UTC-anchored cron; 7pm ET in winter). ✓
7. **Open source** — from day one; owner as initial sole reviewer/approver, maintainer ladder as it scales (§12). ✓
8. **Market data** — API Ninjas (owner-supplied key); **news/web extraction** — cheap OpenRouter models (owner-supplied key), quality-first configuration (§8). ✓

**Still open:**

1. **License confirmation** — recommended: MIT (code) + CC BY-SA 4.0 (data/content). Confirm before the repo goes public.
2. **Key handoff** — how the API Ninjas and OpenRouter keys reach CI (GitHub Actions secrets set by owner; needed at the start of Phase 2). Which API Ninjas tier to subscribe to (Developer tier suffices per §8 verification).
3. **Custom domain** — none chosen yet; GitHub Pages default until then.
4. **Repo visibility timing** — make `aitracker` public at Phase 1 completion, or immediately?

---

*Research basis: sections 8–11 were grounded in live web research conducted Aug 13, 2026 (deal facts, the circularity debate, prior art, and data-source assessments). Facts cited there carry their sources; anything single-sourced is flagged. Next step after spec sign-off: Phase 1 (schemas, seed data files, site skeleton).*
