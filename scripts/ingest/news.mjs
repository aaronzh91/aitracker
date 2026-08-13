#!/usr/bin/env node
/**
 * Weekly news sweep: GDELT queries per Tier-1 entity → dedupe → OpenRouter LLM
 * triage against the impact rubric (SPEC §4.2). Output is a NOMINATIONS file
 * (data/queue/nominations.json) for the weekly editorial session to verify —
 * news never writes to the dataset directly.
 * Requires OPENROUTER_API_KEY for triage; without it, writes untriaged candidates.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { ROOT, TODAY, loadEntities, sleep, getJSON } from "./lib.mjs";

const TRIAGE_MODEL = process.env.TRIAGE_MODEL || "deepseek/deepseek-v4-flash-0731";
const KEY = process.env.OPENROUTER_API_KEY;

const RUBRIC = `An item qualifies ONLY if it (a) changes a number we track (revenue, capex, deal value, guidance),
(b) creates/modifies/kills a money-flow edge between AI-ecosystem companies, (c) materially affects counterparty or
credit risk, (d) is a management/strategy inflection, or (e) is a regulatory/legal action with financial consequence.
Explicitly noise (score 1): product reviews, feature launches, daily stock-move stories, opinion pieces, listicles.`;

const entities = loadEntities().filter((e) => e.tier === 1);
const seen = new Map();

for (const e of entities) {
  const q = encodeURIComponent(`"${e.name.replace(/ (Corporation|Corp\.?|Inc\.?|Group|Technologies|Company)$/i, "")}"`);
  const url = `https://api.gdeltproject.org/api/v2/doc/doc?query=${q}%20sourcelang:english&mode=artlist&maxrecords=15&timespan=7d&format=json&sort=hybridrel`;
  const res = await getJSON(url);
  await sleep(1100); // GDELT politeness
  if (res.__error || !res.articles) continue;
  for (const a of res.articles) {
    const key = (a.title ?? a.url).toLowerCase().slice(0, 80);
    if (!seen.has(key)) seen.set(key, { title: a.title, url: a.url, domain: a.domain, date: a.seendate, entities: [e.id] });
    else seen.get(key).entities.push(e.id);
  }
}
const candidates = [...seen.values()];
console.log(`GDELT sweep: ${candidates.length} unique candidates across ${entities.length} Tier-1 entities.`);

let nominations = [];
if (!KEY) {
  console.log("OPENROUTER_API_KEY not set — writing untriaged candidates (expected outside CI).");
  nominations = candidates.map((c) => ({ ...c, impact: null, extraction: null, triaged: false }));
} else {
  for (let i = 0; i < candidates.length; i += 12) {
    const batch = candidates.slice(i, i + 12);
    const body = {
      model: TRIAGE_MODEL,
      messages: [
        { role: "system", content: `You triage financial news for an AI-ecosystem money-flow tracker. Score each headline 1-5 against this rubric and extract structured hints. Ground everything in the given title only — do not invent facts.\n${RUBRIC}` },
        { role: "user", content: JSON.stringify(batch.map((c, j) => ({ i: j, title: c.title, domain: c.domain }))) },
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "triage", strict: true,
          schema: {
            type: "object", additionalProperties: false, required: ["items"],
            properties: {
              items: {
                type: "array",
                items: {
                  type: "object", additionalProperties: false,
                  required: ["i", "impact", "reason", "parties", "amount_hint"],
                  properties: {
                    i: { type: "integer" },
                    impact: { type: "integer", minimum: 1, maximum: 5 },
                    reason: { type: "string" },
                    parties: { type: "array", items: { type: "string" } },
                    amount_hint: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    };
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).then((r) => r.json()).catch((e) => ({ error: e.message }));
    const items = (() => { try { return JSON.parse(res.choices[0].message.content).items; } catch { return []; } })();
    for (const it of items) {
      const c = batch[it.i];
      if (c && it.impact >= 4) nominations.push({ ...c, impact: it.impact, extraction: { reason: it.reason, parties: it.parties, amount_hint: it.amount_hint }, triaged: true });
    }
    await sleep(400);
  }
  console.log(`Triage: ${nominations.length} high-impact nominations (score ≥4) survived from ${candidates.length} candidates.`);
}

mkdirSync(join(ROOT, "data", "queue"), { recursive: true });
writeFileSync(
  join(ROOT, "data", "queue", "nominations.json"),
  JSON.stringify({ generated: TODAY, model: KEY ? TRIAGE_MODEL : null, rubric_version: "spec-4.2-v1", nominations }, null, 2) + "\n"
);
console.log(`✓ Wrote data/queue/nominations.json`);
