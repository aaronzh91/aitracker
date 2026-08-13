#!/usr/bin/env node
/**
 * API Ninjas market-data ingest: refreshes market caps for public entities.
 * Requires APININJAS_API_KEY (GitHub Actions secret; never committed).
 */
import { loadEntities, saveEntity, upsertObservation, appendChangelog, sleep, getJSON, TODAY } from "./lib.mjs";

const KEY = process.env.APININJAS_API_KEY;
if (!KEY) {
  console.log("APININJAS_API_KEY not set — skipping market-data ingest (this is expected outside CI).");
  process.exit(0);
}

const entities = loadEntities().filter((e) => e.kind === "public_company" && e.tickers?.length);
let updated = 0, failed = [];

for (const e of entities) {
  const symbol = e.tickers[0].symbol;
  const res = await getJSON(`https://api.api-ninjas.com/v1/marketcap?ticker=${encodeURIComponent(symbol)}`, { "X-Api-Key": KEY });
  await sleep(120);
  if (res.__error || !res.market_cap) { failed.push(`${e.id}(${symbol})`); continue; }
  upsertObservation(e, {
    metric: "market_cap",
    period: TODAY,
    value: Math.round((res.market_cap / 1e9) * 10) / 10,
    unit: "USD_B",
    basis: "disclosed",
    confidence: "high",
    source: { url: "https://api-ninjas.com/api/marketcap", publisher: "API Ninjas", published: TODAY, kind: "dataset" },
    as_of: TODAY,
    notes: `Exchange market cap for ${symbol}; auto-refreshed weekly.`,
  });
  saveEntity(e);
  updated++;
}

console.log(`✓ Market data: ${updated}/${entities.length} tickers refreshed.` + (failed.length ? ` No data: ${failed.join(", ")}` : ""));
if (updated) appendChangelog({ kind: "mechanical", title: `Market caps refreshed: ${updated} tickers`, body: "Live market caps via API Ninjas." });
