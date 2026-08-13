#!/usr/bin/env node
/**
 * Validates every data record against its JSON Schema and checks referential
 * integrity across the dataset. CI runs this on every PR; nothing merges red.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";
import Ajv from "ajv";
import addFormats from "ajv-formats";

const ROOT = new URL("..", import.meta.url).pathname;
const DATA = join(ROOT, "data");

const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

for (const f of ["common", "entity", "relationship", "bottleneck"]) {
  ajv.addSchema(JSON.parse(readFileSync(join(DATA, "schemas", `${f}.schema.json`), "utf8")));
}

const loadDir = (dir) => {
  let files = [];
  try {
    files = readdirSync(join(DATA, dir)).filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }
  return files.map((f) => {
    const path = join(DATA, dir, f);
    try {
      return { file: `${dir}/${f}`, id: basename(f, ".json"), record: JSON.parse(readFileSync(path, "utf8")) };
    } catch (e) {
      fail(`${dir}/${f}: invalid JSON — ${e.message}`);
      return null;
    }
  }).filter(Boolean);
};

let errors = 0;
const fail = (msg) => { errors++; console.error(`✗ ${msg}`); };

const entities = loadDir("entities");
const relationships = loadDir("relationships");
const bottlenecks = loadDir("bottlenecks");

const check = (items, schemaId) => {
  const validate = ajv.getSchema(schemaId);
  for (const { file, id, record } of items) {
    if (!validate(record)) {
      for (const err of validate.errors.slice(0, 5)) {
        fail(`${file}: ${err.instancePath || "/"} ${err.message}`);
      }
    }
    if (record.id !== id) fail(`${file}: id "${record.id}" does not match filename`);
  }
};

check(entities, "entity.schema.json");
check(relationships, "relationship.schema.json");
check(bottlenecks, "bottleneck.schema.json");

// Referential integrity
const entityIds = new Set(entities.map((e) => e.id));
const relIds = new Set(relationships.map((r) => r.id));
const bottleneckIds = new Set(bottlenecks.map((b) => b.id));

for (const { file, record } of relationships) {
  for (const side of ["from", "to"]) {
    if (record[side] && !entityIds.has(record[side])) fail(`${file}: ${side} "${record[side]}" is not a known entity id`);
  }
  for (const rel of record.related_edges ?? []) {
    if (!relIds.has(rel)) fail(`${file}: related_edge "${rel}" is not a known relationship id`);
  }
  for (const b of record.bottlenecks ?? []) {
    if (!bottleneckIds.has(b)) fail(`${file}: bottleneck "${b}" is not a known bottleneck id`);
  }
}

for (const { file, record } of bottlenecks) {
  for (const c of record.controlled_by ?? []) {
    if (!entityIds.has(c.entity)) fail(`${file}: controlled_by "${c.entity}" is not a known entity id`);
  }
  for (const d of record.dependents ?? []) {
    if (!entityIds.has(d.entity)) fail(`${file}: dependent "${d.entity}" is not a known entity id`);
  }
}

// Duplicate ids across files already impossible (filename = id), but check tickers sanity
const summary = `entities=${entities.length} relationships=${relationships.length} bottlenecks=${bottlenecks.length}`;
if (errors) {
  console.error(`\nValidation FAILED with ${errors} error(s). (${summary})`);
  process.exit(1);
}
console.log(`✓ Validation passed. (${summary})`);
