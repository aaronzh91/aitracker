# Contributing to AI Money Tracker

Updates, error corrections, improvements, and new features are all welcome — this project only becomes the source of truth for AI-ecosystem financials if many careful people maintain it. All changes arrive as pull requests and pass the same validation, whether they come from automation, a maintainer, or a first-time contributor.

## The sourcing standard (non-negotiable)

1. **Every factual change carries a source.** Observations and edges require a `source` object (URL, publisher, kind, date). Source hierarchy: audited SEC/regulatory filings > unaudited company disclosures > company statements/PR > tier-1 press with named sourcing > analyst estimates > our estimates.
2. **Reported beats estimated.** If a reported figure exists, use it. Estimates are welcome where nothing is reported, but `basis: "estimated"` requires `method_md` — the assumptions and derivation, written so a reader can follow them.
3. **Commitments are not revenue.** Never put an announced deal value where a realized figure belongs. Edges carry `headline` and `realized_to_date` separately.
4. **Both sides of the ledger.** A relationship isn't complete without `accounting.payer_treatment_md` and `accounting.payee_treatment_md`.
5. **Single-sourced claims** get `confidence: "low"` (or `"medium"` with a strong outlet) — never `"high"`.
6. **Neutral voice.** No unattributed judgments in data records. Contested framings belong in `both_sides_md`, with each side in its strongest sourced form.

## Mechanics

- Data lives in `/data` as one JSON file per record: `entities/<id>.json`, `relationships/<id>.json`, `bottlenecks/<id>.json`. Filename must equal `id`.
- Schemas are in `/data/schemas`. Run `npm run validate` locally; CI runs it on every PR.
- `npm run build` validates, derives graph/analytics JSON, and builds the site (`/site`, Astro).
- Corrections are first-class: open an issue with the "data error" template, or PR the fix directly. Errors are fixed in place with a note in the weekly changelog — never silently.

## Review & merge rights

See [GOVERNANCE.md](./GOVERNANCE.md). Today the project owner reviews and merges all editorial changes. Contributors with a track record of accepted, well-sourced PRs will be invited as maintainers over defined areas.

## Secrets

The automated pipeline (Phase 2) uses two keys, held only in GitHub Actions secrets: `APININJAS_API_KEY` (market data) and `OPENROUTER_API_KEY` (news triage/extraction). PRs from forks run validation only and never receive secrets. Never commit a key; `.env` is git-ignored.

## Licensing of contributions

Code contributions are MIT; data/content contributions are CC BY-SA 4.0 (see [LICENSE](./LICENSE)). By contributing you license your contribution under those terms.
