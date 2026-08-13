# Data authoring guide

Conventions for writing records in `/data`. CI enforces the schemas (`/data/schemas`); this file covers what schemas can't.

## Ground rules

1. One JSON file per record; **filename = `id`** (lowercase, hyphens).
2. `updated` = the date you wrote/last revised the record.
3. **Every factual claim needs a source** with a real URL. Sourcing hierarchy: SEC filings > company IR/PR > tier-1 press > analyst. Single-sourced claims → `confidence: "low"` (or `"medium"` from a strong outlet). `basis: "estimated"` requires `method_md`.
4. **Headline ≠ realized.** `headline` is the announced/committed value; `realized_to_date` is money that actually moved (null if unknown — that's informative too).
5. **Two-sided accounting on every edge**: how the payer books it, how the payee books it. If unknown, say what is publicly known and what isn't.
6. Neutral voice in all `*_md` fields; contested judgments go to `both_sides_md` with attribution.
7. Debt issuances without an identifiable counterparty (e.g., "Oracle sells $25B of bonds") are **not edges** — record them as `events` + `total_debt` observations on the entity. Edges require two identifiable parties.
8. Exemplars to copy: `entities/nvidia.json`, `relationships/nvidia--openai--equity-2026.json`.

## Canonical entity IDs (Tier 1)

Use these exact ids in `from`/`to`/`related_edges`/`controlled_by` references:

`openai, anthropic, xai, mistral, safe-superintelligence, perplexity, databricks, scale-ai, cerebras, waymo, anysphere, cognition, microsoft, alphabet, amazon, meta, oracle, coreweave, nebius, lambda, crusoe, nscale, fluidstack, vantage, amd, broadcom, tsmc, intel, sk-hynix, samsung, micron, asml, dell, foxconn, vertiv, eaton, schneider-electric, quanta-services, ge-vernova, siemens-energy, constellation-energy, vistra, talen-energy, comfort-systems, salesforce, servicenow, palantir, apple, alibaba, tencent, bytedance, huawei, deepseek, softbank, blue-owl, pimco, blackrock, mgx, apollo, blackstone, brookfield, kkr, goldman-sachs, jpmorgan, morgan-stanley, stargate, hyperion-jv, xai-gpu-spv, aip, humain, g42, us-government, nvidia`

Notes: `xai` = the merged xAI/SpaceX entity (record the Feb 2026 merger as an event). `alphabet` covers Google/Google Cloud/DeepMind. `stargate` = Stargate LLC. `aip` = AI Infrastructure Partnership. `nvidia-financing-coalition` = the Aug 2026 >$500B financing coalition (spv_jv).

Minimal Tier-2/3 entities (identity cards: id, name, kind, category, group, region, tier, monetization one-liner, 1–2 observations, sources, updated) are created as edges need them — but only by the author assigned to that entity, to avoid file conflicts.

## Edge ID convention

`<payer>--<payee>--<type-shorthand>[-<year>]`, e.g. `openai--oracle--compute-2025`, `meta--blue-owl--hyperion-jv`.
