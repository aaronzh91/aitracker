# AI Money Tracker (`aitracker`)

An open-source, weekly-updated, neutral reference for the financial structure of the AI ecosystem: ~500 tracked players — labs, hyperscalers, the chip and physical-infrastructure supply chains, energy, financiers, and international/China — how they monetize AI, and, most importantly, the money flows between them (investments, compute commitments, hardware purchases, financing structures), with two-sided accounting treatment and full source provenance on every number.

**Goal:** be the de facto source of truth for AI-ecosystem financials — useful to equity and credit investors, operators, regulators, and the public — with Wikipedia-grade auditability: every figure sourced, every estimate's assumptions documented, every change versioned in git and reviewed before merge.

**Status:** Specification phase. See [`SPEC.md`](./SPEC.md) for the full product & architecture specification, and [`UNIVERSE.md`](./UNIVERSE.md) for the coverage census.

**Update rhythm:** weekly, Saturdays 8:00 pm ET — automated ingest (SEC EDGAR, API Ninjas market data, Epoch AI) plus an LLM-assisted news sweep whose editorial changes ship as reviewed pull requests, with a public changelog.

**Contributing:** updates, corrections, improvements, and new features are welcome via pull request — see [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the sourcing standard and [`GOVERNANCE.md`](./GOVERNANCE.md) for how review works. Data records live in [`/data`](./data) (one JSON file per entity/relationship/bottleneck, schema-validated in CI).

## Repo layout

```
data/         entities, relationships, bottlenecks (JSON, one file per record) + schemas + AUTHORING.md
scripts/      validate.mjs (schema + referential integrity) · derive.mjs (graph + analytics) · serve.mjs (Railway server)
site/         Astro app (home table + D3 money map, company/flow/bottleneck pages)
derived/      build-time analytics output (committed for diffability)
SPEC.md       full product & architecture specification · UNIVERSE.md coverage census
```

## Develop & deploy

```bash
npm install && npm --prefix site install   # once
npm run validate                           # schema + referential integrity checks
npm run build                              # validate + derive + build site into site/dist
npm start                                  # serve site/dist (Railway runs this; respects $PORT)
npm run dev                                # local dev server
```

**Railway:** point a service at this repo; build command `npm install && npm --prefix site install && npm run build`, start command `npm start`. **Licensing:** code MIT, data/content CC BY-SA 4.0 (see [`LICENSE`](./LICENSE)). Not investment advice.
