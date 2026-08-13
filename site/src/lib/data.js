import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../../../", import.meta.url).pathname; // repo root

const loadDir = (dir) => {
  try {
    return readdirSync(join(ROOT, "data", dir))
      .filter((f) => f.endsWith(".json"))
      .map((f) => JSON.parse(readFileSync(join(ROOT, "data", dir, f), "utf8")));
  } catch {
    return [];
  }
};

export const entities = loadDir("entities").sort((a, b) => a.name.localeCompare(b.name));
export const relationships = loadDir("relationships").sort((a, b) => a.id.localeCompare(b.id));
export const bottlenecks = loadDir("bottlenecks").sort((a, b) => a.name.localeCompare(b.name));

const readDerived = (name, fallback) => {
  try {
    return JSON.parse(readFileSync(join(ROOT, "derived", name), "utf8"));
  } catch {
    return fallback;
  }
};
export const graph = readDerived("graph.json", { nodes: [], edges: [] });
export const summary = readDerived("summary.json", {});

export const entityById = Object.fromEntries(entities.map((e) => [e.id, e]));
export const relById = Object.fromEntries(relationships.map((r) => [r.id, r]));

export const edgesFor = (id) => ({
  outbound: relationships.filter((r) => r.from === id),
  inbound: relationships.filter((r) => r.to === id),
});

export const latestObs = (e, metrics) => {
  const c = (e.observations ?? []).filter((o) => metrics.includes(o.metric) && o.value != null);
  if (!c.length) return null;
  return c.sort((a, b) => (a.as_of < b.as_of ? 1 : -1))[0];
};

export const GROUP_LABELS = {
  labs_ai_native: "Labs & AI-native",
  hyperscalers_clouds: "Hyperscalers & clouds",
  compute_supply_chain: "Compute supply chain",
  physical_infrastructure: "Physical infrastructure",
  energy: "Energy",
  software_applications: "Software & applications",
  capital: "Capital",
  government_state: "Government & state",
};

export const GROUP_VARS = {
  labs_ai_native: "--g-labs",
  hyperscalers_clouds: "--g-clouds",
  compute_supply_chain: "--g-compute",
  physical_infrastructure: "--g-infra",
  energy: "--g-energy",
  software_applications: "--g-software",
  capital: "--g-capital",
  government_state: "--g-gov",
};

export const TYPE_LABELS = {
  equity_investment: "Equity investment", warrant: "Warrant", convertible_debt: "Convertible debt",
  debt_financing: "Debt financing", bond_issuance: "Bond issuance", credit_facility: "Credit facility",
  margin_loan: "Margin loan", project_debt: "Project debt", compute_purchase: "Compute purchase",
  hardware_purchase: "Hardware purchase", supply_agreement: "Supply agreement", prepayment: "Prepayment",
  revenue_share: "Revenue share", lease: "Lease", ppa: "Power purchase agreement",
  spv_capitalization: "SPV capitalization", jv_equity: "JV equity", vendor_financing: "Vendor financing",
  cloud_credits: "Cloud credits", model_license: "Model license", acquisition: "Acquisition",
  backstop_guarantee: "Backstop / guarantee", government_contract: "Government contract", grant: "Grant",
};

export const FLAG_LABELS = {
  equity_for_revenue: "Equity-for-revenue",
  warrant_for_revenue: "Warrant-for-revenue",
  vendor_financing: "Vendor financing",
  round_trip_cloud: "Round-trip cloud",
  spv_shift: "Off-balance-sheet SPV",
  collateralized_gpu_debt: "GPU-collateralized debt",
  customer_concentration: "Customer concentration",
  commitment_unfunded: "Commitment vs. unidentified funding",
  loss_leader_distribution: "Loss-leader distribution",
};

export function fmtMoney(m) {
  if (!m || m.value == null) return m?.caveat ? `undisclosed (${m.caveat})` : "undisclosed";
  const v = m.value;
  const money = (n, sym = "$") =>
    n >= 1000 ? `${sym}${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}T` : `${sym}${n % 1 === 0 ? n : n.toFixed(1)}B`;
  switch (m.unit) {
    case "USD_B": return money(v);
    case "USD_B_per_year": return `${money(v)}/yr`;
    case "USD_M": return `$${v}M`;
    case "EUR_B": return money(v, "€");
    case "GBP_B": return money(v, "£");
    case "JPY_B": return `¥${v}B`;
    case "KRW_T": return `₩${v}T`;
    case "GW": return `${v} GW`;
    case "MW": return `${v} MW`;
    case "shares_M": return `${v}M shares`;
    case "pct": return `${v}%`;
    default: return `${v} ${m.unit}`;
  }
}

export const fmtObsValue = (o) => fmtMoney({ value: o.value, unit: o.unit });
