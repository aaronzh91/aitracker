# Governance

AI Money Tracker aims for Wikipedia-grade trust: every number sourced, every estimate documented, every change reviewed and versioned. Governance exists to protect that.

## Roles

- **Owner** (currently [@aaronzh91](https://github.com/aaronzh91)): final authority on methodology, governance, and releases; reviews and merges all editorial changes today.
- **Maintainers** (as the project scales): merge rights over defined areas — a category (e.g., energy), a region (e.g., China coverage), or a subsystem (site, pipeline). Appointed by the owner based on a track record of accepted, well-sourced contributions. The bar: sustained accuracy, sourcing discipline, and neutral voice.
- **Contributors**: anyone. All PRs run the same CI validation.

## What needs review

- **Auto-mergeable:** schema-validated numeric refreshes from sources of record (EDGAR XBRL, market-data API) produced by the weekly pipeline.
- **Human review required:** everything editorial — new/changed edges, narrative text, estimates, methodology, bottleneck records, the AI-generated investor syntheses.

## Methodology changes

Changes to metrics definitions, the revenue-quality tiers, the contagion model, or the impact-filter rubric require an issue with rationale before the PR, and owner sign-off.

## Corrections

Errors are fixed in place with a correction note in the weekly changelog. The git history is the permanent record; nothing is silently rewritten.
