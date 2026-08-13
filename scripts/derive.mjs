#!/usr/bin/env node
/**
 * Derives build-time analytics from /data into /derived:
 *  - graph.json    nodes + edges for the network visualization
 *  - summary.json  headline stats + detected cycles
 * Every derived number is reproducible from the repo. No network access.
 */
import { readFileSync, readdirSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const load = (dir) => {
  try {
    return readdirSync(join(ROOT, "data", dir))
      .filter((f) => f.endsWith(".json"))
      .map((f) => JSON.parse(readFileSync(join(ROOT, "data", dir, f), "utf8")));
  } catch {
    return [];
  }
};

const entities = load("entities");
const relationships = load("relationships");
const bottlenecks = load("bottlenecks");

// --- helpers ---------------------------------------------------------------
const toUSDB = (m) => {
  if (!m || m.value == null) return null;
  switch (m.unit) {
    case "USD_B": case "USD_B_per_year": return m.value;
    case "USD_M": return m.value / 1000;
    case "EUR_B": return m.value * 1.1;
    case "GBP_B": return m.value * 1.3;
    default: return null;
  }
};

const latestObs = (e, metrics) => {
  const candidates = (e.observations ?? []).filter((o) => metrics.includes(o.metric) && o.value != null);
  if (!candidates.length) return null;
  return candidates.sort((a, b) => (a.as_of < b.as_of ? 1 : -1))[0];
};

// --- nodes -----------------------------------------------------------------
const nodes = entities.map((e) => {
  const cap = latestObs(e, ["market_cap", "valuation"]);
  const sizeUSDB = cap ? toUSDB(cap) : null;
  return {
    id: e.id,
    name: e.name,
    group: e.group,
    category: e.category,
    region: e.region,
    tier: e.tier,
    kind: e.kind,
    sizeUSDB,
    sizeBasis: cap?.basis ?? null,
    monetization: e.monetization,
  };
});
const nodeIds = new Set(nodes.map((n) => n.id));

// --- edges -----------------------------------------------------------------
const STYLE = {
  equity: ["equity_investment", "warrant", "convertible_debt", "jv_equity", "spv_capitalization", "acquisition"],
  debt: ["debt_financing", "bond_issuance", "credit_facility", "margin_loan", "project_debt", "backstop_guarantee", "vendor_financing"],
  commitment: ["prepayment", "cloud_credits", "grant"],
};
const styleFor = (r) => {
  if (STYLE.equity.includes(r.type)) return "equity";
  if (STYLE.debt.includes(r.type)) return "debt";
  if (["announced", "in_talks", "contracted"].includes(r.status)) return "commitment";
  return "revenue";
};

const DEAD = new Set(["dead", "cancelled", "withdrawn", "failed"]);
const edges = relationships
  .filter((r) => nodeIds.has(r.from) && nodeIds.has(r.to))
  .map((r) => ({
    id: r.id,
    source: r.from,
    target: r.to,
    type: r.type,
    status: r.status,
    dead: DEAD.has(r.status),
    headlineUSDB: toUSDB(r.headline),
    caveat: r.headline?.caveat ?? null,
    realizedUSDB: toUSDB(r.realized_to_date),
    style: styleFor(r),
    flags: r.accounting?.flags ?? [],
    offBalanceSheet: r.accounting?.off_balance_sheet ?? false,
  }));

// --- cycle detection (simple cycles length 2..4 over live edges) ------------
const adj = new Map();
for (const e of edges) {
  if (e.dead) continue;
  if (!adj.has(e.source)) adj.set(e.source, []);
  adj.get(e.source).push(e.target);
}
const cycles = [];
const seen = new Set();
const dfs = (start, node, path) => {
  if (path.length > 4) return;
  for (const next of adj.get(node) ?? []) {
    if (next === start && path.length >= 2) {
      const key = [...path].sort().join("|");
      if (!seen.has(key)) {
        seen.add(key);
        cycles.push([...path]);
      }
    } else if (!path.includes(next) && next > start) {
      dfs(start, next, [...path, next]);
    }
  }
};
for (const n of [...adj.keys()].sort()) dfs(n, n, [n]);

const cycleNodeSet = new Set(cycles.flat());
const cycleEdgeIds = new Set();
for (const cyc of cycles) {
  for (let i = 0; i < cyc.length; i++) {
    const a = cyc[i], b = cyc[(i + 1) % cyc.length];
    for (const e of edges) if (e.source === a && e.target === b && !e.dead) cycleEdgeIds.add(e.id);
  }
}
for (const e of edges) e.inCycle = cycleEdgeIds.has(e.id);

// --- summary stats -----------------------------------------------------------
const live = edges.filter((e) => !e.dead);
const summary = {
  generated: new Date().toISOString().slice(0, 10),
  entities: entities.length,
  relationships: relationships.length,
  bottlenecks: bottlenecks.length,
  totalHeadlineUSDB: Math.round(live.reduce((s, e) => s + (e.headlineUSDB ?? 0), 0)),
  cycles: cycles.length,
  cycleNodes: [...cycleNodeSet],
  flaggedEdges: live.filter((e) => e.flags.length > 0).length,
  offBalanceSheetEdges: live.filter((e) => e.offBalanceSheet).length,
};

mkdirSync(join(ROOT, "derived"), { recursive: true });
writeFileSync(join(ROOT, "derived", "graph.json"), JSON.stringify({ nodes, edges }, null, 1));
writeFileSync(join(ROOT, "derived", "summary.json"), JSON.stringify(summary, null, 2));
console.log(`✓ Derived: ${nodes.length} nodes, ${edges.length} edges, ${cycles.length} cycles, ~$${summary.totalHeadlineUSDB}B headline flow.`);
