import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { setGlobalDispatcher, EnvHttpProxyAgent } from "undici";

// Honor HTTPS_PROXY/HTTP_PROXY/NO_PROXY (sandboxed dev environments); no-op when unset (CI).
setGlobalDispatcher(new EnvHttpProxyAgent());

export const ROOT = new URL("../..", import.meta.url).pathname;
export const TODAY = new Date().toISOString().slice(0, 10);

export const loadEntities = () =>
  readdirSync(join(ROOT, "data", "entities"))
    .filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(readFileSync(join(ROOT, "data", "entities", f), "utf8")));

export const saveEntity = (e) => {
  e.updated = TODAY;
  writeFileSync(join(ROOT, "data", "entities", `${e.id}.json`), JSON.stringify(e, null, 2) + "\n");
};

/**
 * Insert or replace an automated observation. Replacement key: same metric +
 * same source.publisher (i.e. this pipeline's own prior value). Hand-authored
 * observations from other sources are never touched.
 */
export const upsertObservation = (entity, obs) => {
  entity.observations = entity.observations ?? [];
  const i = entity.observations.findIndex(
    (o) => o.metric === obs.metric && o.source?.publisher === obs.source.publisher
  );
  if (i >= 0) entity.observations[i] = obs;
  else entity.observations.push(obs);
};

export const appendChangelog = (entry) => {
  const path = join(ROOT, "data", "changelog.json");
  let log = [];
  try { log = JSON.parse(readFileSync(path, "utf8")); } catch {}
  log.unshift({ date: TODAY, ...entry });
  writeFileSync(path, JSON.stringify(log.slice(0, 200), null, 2) + "\n");
};

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function getJSON(url, headers = {}, retries = 3) {
  for (let a = 0; a <= retries; a++) {
    try {
      const res = await fetch(url, { headers });
      if (res.status === 429 || res.status >= 500) throw new Error(`HTTP ${res.status}`);
      if (!res.ok) return { __error: `HTTP ${res.status}` };
      return await res.json();
    } catch (e) {
      if (a === retries) return { __error: e.message };
      await sleep(1000 * 2 ** a);
    }
  }
}
