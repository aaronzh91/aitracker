import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";

const GROUP_COLOR = {
  labs_ai_native: "var(--g-labs)",
  hyperscalers_clouds: "var(--g-clouds)",
  compute_supply_chain: "var(--g-compute)",
  physical_infrastructure: "var(--g-infra)",
  energy: "var(--g-energy)",
  software_applications: "var(--g-software)",
  capital: "var(--g-capital)",
  government_state: "var(--g-gov)",
};
// Stable gravity wells so the map looks the same week to week.
const GROUP_POS = {
  labs_ai_native: [0.5, 0.42],
  hyperscalers_clouds: [0.28, 0.5],
  compute_supply_chain: [0.74, 0.42],
  physical_infrastructure: [0.82, 0.72],
  energy: [0.6, 0.82],
  software_applications: [0.36, 0.18],
  capital: [0.3, 0.8],
  government_state: [0.62, 0.14],
};
const STYLE_DASH = { equity: "2,4", debt: "6,3", commitment: "8,5", revenue: null };

const fmtB = (v) =>
  v == null ? "undisclosed" : v >= 1000 ? `$${(v / 1000).toFixed(1)}T` : `$${v % 1 === 0 ? v : v.toFixed(1)}B`;

export default function Graph({ nodes, edges, height = 640 }) {
  const ref = useRef(null);
  const [tip, setTip] = useState(null);
  const [showTiers, setShowTiers] = useState(1);
  const [cyclesOnly, setCyclesOnly] = useState(false);
  const [minFlow, setMinFlow] = useState(0);

  const view = useMemo(() => {
    const ns = nodes.filter((n) => n.tier <= showTiers || showTiers === 3);
    const ids = new Set(ns.map((n) => n.id));
    const es = edges.filter(
      (e) =>
        ids.has(e.source.id ?? e.source) &&
        ids.has(e.target.id ?? e.target) &&
        !e.dead &&
        (e.headlineUSDB ?? 0) >= minFlow
    );
    // keep nodes that are connected or large
    const connected = new Set(es.flatMap((e) => [e.source.id ?? e.source, e.target.id ?? e.target]));
    return {
      nodes: ns.filter((n) => connected.has(n.id) || (n.sizeUSDB ?? 0) > 100).map((n) => ({ ...n })),
      edges: es.map((e) => ({ ...e, source: e.source.id ?? e.source, target: e.target.id ?? e.target })),
    };
  }, [nodes, edges, showTiers, minFlow]);

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const width = ref.current.clientWidth || 1100;
    const H = height;

    const defs = svg.append("defs");
    defs
      .append("marker")
      .attr("id", "arrow")
      .attr("viewBox", "0 -4 8 8")
      .attr("refX", 7).attr("refY", 0)
      .attr("markerWidth", 5).attr("markerHeight", 5)
      .attr("orient", "auto")
      .append("path").attr("d", "M0,-4L8,0L0,4").attr("fill", "var(--muted)");

    const r = (n) => 4 + Math.sqrt(Math.max(n.sizeUSDB ?? 8, 2)) / 3.2;
    const w = (e) => Math.min(0.6 + Math.sqrt(e.headlineUSDB ?? 0.5) / 5, 6);

    const sim = d3
      .forceSimulation(view.nodes)
      .force("link", d3.forceLink(view.edges).id((d) => d.id).distance(90).strength(0.25))
      .force("charge", d3.forceManyBody().strength(-160))
      .force("collide", d3.forceCollide().radius((d) => r(d) + 5))
      .force("x", d3.forceX((d) => (GROUP_POS[d.group]?.[0] ?? 0.5) * width).strength(0.14))
      .force("y", d3.forceY((d) => (GROUP_POS[d.group]?.[1] ?? 0.5) * H).strength(0.14))
      .stop();
    // deterministic layout: run synchronously with seeded positions
    view.nodes.forEach((n, i) => {
      const [gx, gy] = GROUP_POS[n.group] ?? [0.5, 0.5];
      n.x = gx * width + (((i * 137) % 60) - 30);
      n.y = gy * H + (((i * 89) % 60) - 30);
    });
    for (let i = 0; i < 200; i++) sim.tick();
    view.nodes.forEach((n) => {
      n.x = Math.max(r(n) + 4, Math.min(width - r(n) - 4, n.x));
      n.y = Math.max(r(n) + 4, Math.min(H - r(n) - 14, n.y));
    });

    const dim = (e) => cyclesOnly && !e.inCycle;

    const link = svg
      .append("g")
      .selectAll("path")
      .data(view.edges)
      .join("path")
      .attr("fill", "none")
      .attr("stroke", (e) => (e.inCycle && cyclesOnly ? "var(--warn)" : "var(--muted)"))
      .attr("stroke-opacity", (e) => (dim(e) ? 0.06 : e.style === "commitment" ? 0.4 : 0.55))
      .attr("stroke-width", (e) => w(e))
      .attr("stroke-dasharray", (e) => STYLE_DASH[e.style])
      .attr("marker-end", (e) => (dim(e) ? null : "url(#arrow)"))
      .attr("d", (e) => {
        const dx = e.target.x - e.source.x, dy = e.target.y - e.source.y;
        const dr = Math.hypot(dx, dy) * 1.8;
        return `M${e.source.x},${e.source.y}A${dr},${dr} 0 0,1 ${e.target.x},${e.target.y}`;
      })
      .style("cursor", "pointer")
      .on("mouseenter", (ev, e) =>
        setTip({
          x: ev.offsetX, y: ev.offsetY,
          html: `<strong>${e.source.name} → ${e.target.name}</strong><br/>${e.type.replaceAll("_", " ")} · ${e.status}<br/>headline ${fmtB(e.headlineUSDB)}${e.realizedUSDB != null ? ` · realized ${fmtB(e.realizedUSDB)}` : ""}${e.flags?.length ? `<br/><em>${e.flags.join(", ").replaceAll("_", " ")}</em>` : ""}<br/><span class="hint">click to open flow page</span>`,
        })
      )
      .on("mouseleave", () => setTip(null))
      .on("click", (_, e) => (window.location.href = `/flows/${e.id}`));

    const node = svg
      .append("g")
      .selectAll("g")
      .data(view.nodes)
      .join("g")
      .attr("transform", (n) => `translate(${n.x},${n.y})`)
      .style("cursor", "pointer")
      .on("mouseenter", (ev, n) =>
        setTip({
          x: ev.offsetX, y: ev.offsetY,
          html: `<strong>${n.name}</strong><br/>${n.category.replaceAll("_", " ")}${n.sizeUSDB ? ` · ${fmtB(n.sizeUSDB)} ${n.kind === "public_company" ? "mkt cap" : "valuation"}` : ""}<br/>${n.monetization ?? ""}<br/><span class="hint">click to open company page</span>`,
        })
      )
      .on("mouseleave", () => setTip(null))
      .on("click", (_, n) => (window.location.href = `/companies/${n.id}`));

    node
      .append("circle")
      .attr("r", (n) => r(n))
      .attr("fill", (n) => GROUP_COLOR[n.group] ?? "var(--muted)")
      .attr("fill-opacity", (n) => (cyclesOnly ? 0.35 : 0.85))
      .attr("stroke", (n) => (n.kind === "spv_jv" ? "var(--warn)" : "var(--surface)"))
      .attr("stroke-width", (n) => (n.kind === "spv_jv" ? 2.5 : 1.2))
      .attr("stroke-dasharray", (n) => (n.kind === "spv_jv" ? "3,2" : null));

    node
      .filter((n) => r(n) > 9)
      .append("text")
      .attr("dy", (n) => r(n) + 11)
      .attr("text-anchor", "middle")
      .attr("font-size", 10.5)
      .attr("fill", "var(--ink)")
      .attr("paint-order", "stroke")
      .attr("stroke", "var(--bg)")
      .attr("stroke-width", 3)
      .text((n) => n.name.length > 22 ? n.name.slice(0, 20) + "…" : n.name);
  }, [view, cyclesOnly, height]);

  return (
    <div style={{ position: "relative" }}>
      <div className="legend" style={{ marginBottom: 8 }}>
        <label><input type="checkbox" checked={showTiers === 3} onChange={(e) => setShowTiers(e.target.checked ? 3 : 1)} /> show all tiers</label>
        <label><input type="checkbox" checked={cyclesOnly} onChange={(e) => setCyclesOnly(e.target.checked)} /> highlight circular flows</label>
        <label>
          min flow ${minFlow}B
          <input type="range" min="0" max="50" step="5" value={minFlow} onChange={(e) => setMinFlow(+e.target.value)} style={{ verticalAlign: "middle", marginLeft: 6 }} />
        </label>
        <span>solid = recognized flows · long dash = commitments · short dash = debt · dots = equity · dashed ring = SPV/JV</span>
      </div>
      <svg ref={ref} width="100%" height={height} role="img" aria-label="Network graph of AI ecosystem money flows" style={{ border: "1px solid var(--line)", borderRadius: 8, background: "var(--surface)" }} />
      {tip && (
        <div
          style={{
            position: "absolute", left: Math.min(tip.x + 14, 820), top: tip.y + 10, maxWidth: 300,
            background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 6,
            padding: "8px 10px", fontSize: 12.5, pointerEvents: "none", zIndex: 5,
            boxShadow: "0 4px 14px rgba(0,0,0,.12)", lineHeight: 1.45,
          }}
          dangerouslySetInnerHTML={{ __html: tip.html }}
        />
      )}
    </div>
  );
}
