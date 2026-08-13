#!/usr/bin/env node
/**
 * SEC EDGAR XBRL ingest: refreshes disclosed revenue, capex, and RPO for every
 * entity with a CIK, from the companyfacts API. No key required; identifies
 * itself per SEC policy and stays well under 10 req/s.
 */
import { loadEntities, saveEntity, upsertObservation, appendChangelog, sleep, getJSON, TODAY } from "./lib.mjs";

// NB: SEC's WAF rejects User-Agents containing URLs — keep it to "name (contact email)".
const UA = { "User-Agent": "AI Money Tracker (aaronzh91@gmail.com)" };

// metric -> candidate us-gaap tags; the freshest fact ACROSS all candidates wins
const TAGS = {
  revenue_total: [
    "RevenueFromContractWithCustomerExcludingAssessedTax", "Revenues",
    "RevenueFromContractWithCustomerIncludingAssessedTax", "SalesRevenueNet",
  ],
  capex: [
    "PaymentsToAcquirePropertyPlantAndEquipment", "PurchasesOfPropertyAndEquipmentAndIntangibleAssets",
    "PaymentsToAcquirePropertyAndEquipment", "PaymentsToAcquireProductiveAssets",
    "PaymentsForCapitalImprovements",
  ],
  rpo: ["RevenueRemainingPerformanceObligation"],
};
const MAX_AGE_DAYS = 400; // never present stale disclosures as "latest"

const freshestFact = (gaap, tags) => {
  let best = null;
  for (const tag of tags) {
    for (const f of gaap[tag]?.units?.USD ?? []) {
      if (!["10-Q", "10-K", "20-F", "6-K", "40-F"].includes(f.form) || !f.end || f.val == null) continue;
      if ((Date.now() - Date.parse(f.end)) / 86400000 > MAX_AGE_DAYS) continue;
      if (!best || f.end > best.end || (f.end === best.end && (f.filed ?? "") > (best.filed ?? ""))) best = { ...f, tag };
    }
  }
  return best;
};

const entities = loadEntities().filter((e) => e.cik);
let updated = 0, failed = 0;

for (const e of entities) {
  const cik = e.cik.padStart(10, "0");
  const facts = await getJSON(`https://data.sec.gov/api/xbrl/companyfacts/CIK${cik}.json`, UA);
  await sleep(200);
  if (facts.__error) { console.error(`✗ ${e.id}: ${facts.__error}`); failed++; continue; }
  const gaap = facts.facts?.["us-gaap"] ?? {};
  let touched = false;
  for (const [metric, tags] of Object.entries(TAGS)) {
    const fact = freshestFact(gaap, tags);
    if (!fact) {
      // remove any stale row this pipeline wrote previously
      const before = e.observations?.length ?? 0;
      e.observations = (e.observations ?? []).filter(
        (o) => !(o.metric === metric && o.source?.publisher === "SEC EDGAR (XBRL)")
      );
      if ((e.observations?.length ?? 0) !== before) touched = true;
      continue;
    }
    const months = fact.start ? Math.round((Date.parse(fact.end) - Date.parse(fact.start)) / (86400000 * 30.44)) : null;
    const span = months ? `${months}-month` : "point-in-time";
    upsertObservation(e, {
      metric,
      period: `${span} to ${fact.end} (${fact.fp ?? ""} FY${fact.fy ?? "?"}, ${fact.form})`,
      value: Math.round((fact.val / 1e9) * 100) / 100,
      unit: "USD_B",
      basis: "disclosed",
      confidence: "high",
      source: {
        url: `https://data.sec.gov/api/xbrl/companyconcept/CIK${cik}/us-gaap/${fact.tag}.json`,
        publisher: "SEC EDGAR (XBRL)",
        published: fact.filed ?? fact.end,
        kind: "sec_filing",
      },
      as_of: TODAY,
      notes: `${fact.tag}; ${months ? `${months}-month duration value — 10-Q figures can be year-to-date, not single-quarter` : "balance as of period end"}; ${metric === "capex" ? "cash payments, may exclude finance leases; " : ""}auto-ingested from ${fact.form}.`,
    });
    touched = true;
  }
  if (touched) { saveEntity(e); updated++; }
}

console.log(`✓ EDGAR ingest: ${updated} entities refreshed, ${failed} failed, ${entities.length - updated - failed} had no matching facts.`);
if (updated) appendChangelog({ kind: "mechanical", title: `EDGAR refresh: ${updated} entities`, body: "Latest disclosed revenue/capex/RPO pulled from SEC XBRL companyfacts." });
