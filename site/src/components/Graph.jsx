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
const GROUP_POS = {
  labs_ai_native: [0.5, 0.42],
  hyperscalers_clouds: [0.27, 0.48],
  compute_supply_chain: [0.75, 0.4],
  physical_infrastructure: [0.84, 0.72],
  energy: [0.6, 0.84],
  software_applications: [0.34, 0.16],
  capital: [0.28, 0.82],
  government_state: [0.64, 0.12],
};
const STYLE_DASH = { equity: "2,5", debt: "7,4", commitment: "10,6", revenue: null };

const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);
const label = (s) => cap(String(s ?? "").replaceAll("_", " "));
const fmtB = (v) =>
  v == null ? "undisclosed" : v >= 1000 ? `$${(v / 1000).toFixed(1)}T` : `$${v % 1 === 0 ? v : v.toFixed(1)}B`;

export default function Graph({ nodes, edges, height = 720 }) {
  const svgRef = useRef(null);
  const boxRef = useRef(null);
  const zoomRef = useRef(null);
  const transformRef = useRef(d3.zoomIdentity);
  const [tip, setTip] = useState(null);
  const [selected, setSelected] = useState(null);
  const [cyclesOnly, setCyclesOnly] = useState(false);
  const [minFlow, setMinFlow] = useState(0);

  // ---- layout (computed once per filter change, deterministic) ----
  const layout = useMemo(() => {
    const W = 1600, H = 1100; // world coordinates; zoom handles the viewport
    const es = edges
      .filter((e) => !e.dead && (e.headlineUSDB ?? 0) >= minFlow)
      .map((e) => ({ ...e, source: e.source.id ?? e.source, target: e.target.id ?? e.target }));
    const connected = new Set(es.flatMap((e) => [e.source, e.target]));
    const ns = nodes.filter((n) => connected.has(n.id) || (n.sizeUSDB ?? 0) > 60).map((n) => ({ ...n }));
    const ids = new Set(ns.map((n) => n.id));
    const es2 = es.filter((e) => ids.has(e.source) && ids.has(e.target));

    const r = (n) => 7 + Math.sqrt(Math.max(n.sizeUSDB ?? 10, 3)) / 2.1;
    ns.forEach((n, i) => {
      const [gx, gy] = GROUP_POS[n.group] ?? [0.5, 0.5];
      n.r = r(n);
      n.x = gx * W + (((i * 137) % 240) - 120);
      n.y = gy * H + (((i * 89) % 240) - 120);
    });
    const sim = d3
      .forceSimulation(ns)
      .force("link", d3.forceLink(es2).id((d) => d.id).distance(130).strength(0.2))
      .force("charge", d3.forceManyBody().strength(-420))
      .force("collide", d3.forceCollide().radius((d) => d.r + 16))
      .force("x", d3.forceX((d) => (GROUP_POS[d.group]?.[0] ?? 0.5) * W).strength(0.12))
      .force("y", d3.forceY((d) => (GROUP_POS[d.group]?.[1] ?? 0.5) * H).strength(0.12))
      .stop();
    for (let i = 0; i < 300; i++) sim.tick();
    return { nodes: ns, edges: es2, W, H };
  }, [nodes, edges, minFlow]);

  const neighborhood = useMemo(() => {
    if (!selected) return null;
    const set = new Set([selected]);
    for (const e of layout.edges) {
      if (e.source.id === selected || e.target.id === selected) {
        set.add(e.source.id);
        set.add(e.target.id);
      }
    }
    return set;
  }, [selected, layout]);

  // ---- render ----
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const { nodes: ns, edges: es, W, H } = layout;

    const defs = svg.append("defs");
    for (const [id, color] of [["arrow", "var(--muted)"], ["arrow-hot", "var(--bad)"], ["arrow-sel", "var(--accent)"]]) {
      defs.append("marker")
        .attr("id", id).attr("viewBox", "0 -4 8 8")
        .attr("refX", 7).attr("refY", 0)
        .attr("markerWidth", 4.6).attr("markerHeight", 4.6)
        .attr("orient", "auto")
        .append("path").attr("d", "M0,-4L8,0L0,4").attr("fill", color);
    }

    const root = svg.append("g");

    const w = (e) => Math.min(1 + Math.sqrt(e.headlineUSDB ?? 0.5) / 3.4, 9);
    const arc = (e) => {
      const dx = e.target.x - e.source.x, dy = e.target.y - e.source.y;
      const dr = Math.hypot(dx, dy) * 1.9;
      return `M${e.source.x},${e.source.y}A${dr},${dr} 0 0,1 ${e.target.x},${e.target.y}`;
    };

    const edgeState = (e) => {
      if (cyclesOnly) return e.inCycle ? "hot" : "faded";
      if (neighborhood) {
        const inc = e.source.id === selected || e.target.id === selected;
        return inc ? "sel" : "faded";
      }
      return "base";
    };
    const nodeState = (n) => {
      if (cyclesOnly) return n.inCycle ? "hot" : "faded";
      if (neighborhood) return neighborhood.has(n.id) ? (n.id === selected ? "sel" : "near") : "faded";
      return "base";
    };
    const cycleNodes = new Set(es.filter((e) => e.inCycle).flatMap((e) => [e.source.id, e.target.id]));
    ns.forEach((n) => (n.inCycle = cycleNodes.has(n.id)));

    // visible edges
    const linkSel = root.append("g")
      .selectAll("path.vis")
      .data(es)
      .join("path")
      .attr("class", "vis")
      .attr("fill", "none")
      .attr("stroke", (e) => ({ hot: "var(--bad)", sel: "var(--accent)" }[edgeState(e)] ?? "var(--muted)"))
      .attr("stroke-opacity", (e) => ({ hot: 0.95, sel: 0.9, faded: 0.05, base: e.style === "commitment" ? 0.42 : 0.6 }[edgeState(e)]))
      .attr("stroke-width", (e) => w(e) * (edgeState(e) === "hot" || edgeState(e) === "sel" ? 1.4 : 1))
      .attr("stroke-dasharray", (e) => STYLE_DASH[e.style])
      .attr("marker-end", (e) => {
        const s = edgeState(e);
        return s === "faded" ? null : `url(#arrow${s === "hot" ? "-hot" : s === "sel" ? "-sel" : ""})`;
      })
      .attr("d", arc);

    // fat invisible hit targets so hovering a flow is easy
    root.append("g")
      .selectAll("path.hit")
      .data(es)
      .join("path")
      .attr("class", "hit")
      .attr("fill", "none")
      .attr("stroke", "transparent")
      .attr("stroke-width", 18)
      .attr("d", arc)
      .style("cursor", "pointer")
      .on("mousemove", (ev, e) => {
        const box = boxRef.current.getBoundingClientRect();
        setTip({
          x: ev.clientX - box.left, y: ev.clientY - box.top,
          html: `<strong>${e.source.name} → ${e.target.name}</strong><br/>${label(e.type)} · ${label(e.status)}<br/>Headline ${fmtB(e.headlineUSDB)}${e.realizedUSDB != null ? ` · realized ${fmtB(e.realizedUSDB)}` : ""}${e.flags?.length ? `<br/><em>${e.flags.map(label).join(", ")}</em>` : ""}<br/><span style="color:var(--muted)">Click to open this flow</span>`,
        });
      })
      .on("mouseleave", () => setTip(null))
      .on("click", (ev, e) => { ev.stopPropagation(); window.location.href = `/flows/${e.id}`; });

    // nodes
    const nodeSel = root.append("g")
      .selectAll("g.node")
      .data(ns)
      .join("g")
      .attr("class", "node")
      .attr("transform", (n) => `translate(${n.x},${n.y})`)
      .style("cursor", "pointer");

    nodeSel.append("circle")
      .attr("r", (n) => n.r)
      .attr("fill", (n) => GROUP_COLOR[n.group] ?? "var(--muted)")
      .attr("fill-opacity", (n) => ({ hot: 1, sel: 1, near: 0.95, faded: 0.12, base: 0.9 }[nodeState(n)]))
      .attr("stroke", (n) => (nodeState(n) === "sel" ? "var(--accent)" : nodeState(n) === "hot" ? "var(--bad)" : n.kind === "spv_jv" ? "var(--warn)" : "var(--surface)"))
      .attr("stroke-width", (n) => (nodeState(n) === "sel" || nodeState(n) === "hot" ? 3.5 : n.kind === "spv_jv" ? 2.5 : 1.4))
      .attr("stroke-dasharray", (n) => (n.kind === "spv_jv" && nodeState(n) !== "sel" ? "4,3" : null));

    nodeSel.append("text")
      .attr("class", (n) => (n.r >= 11 ? "lbl big" : "lbl small"))
      .attr("dy", (n) => n.r + 14)
      .attr("text-anchor", "middle")
      .attr("font-size", (n) => (n.r >= 14 ? 15 : 12.5))
      .attr("font-weight", (n) => (n.r >= 14 ? 600 : 400))
      .attr("fill", "var(--ink)")
      .attr("opacity", (n) => ({ faded: 0.15 }[nodeState(n)] ?? 1))
      .attr("paint-order", "stroke")
      .attr("stroke", "var(--bg)")
      .attr("stroke-width", 3.5)
      .style("display", (n) => (n.r >= 11 || transformRef.current.k >= 1.4 ? null : "none"))
      .text((n) => (n.name.length > 26 ? n.name.slice(0, 24) + "…" : n.name));

    nodeSel
      .on("mousemove", (ev, n) => {
        const box = boxRef.current.getBoundingClientRect();
        setTip({
          x: ev.clientX - box.left, y: ev.clientY - box.top,
          html: `<strong>${n.name}</strong><br/>${label(n.category)}${n.sizeUSDB ? ` · ${fmtB(n.sizeUSDB)} ${n.kind === "public_company" ? "mkt cap" : "valuation"}` : ""}<br/><span style="color:var(--muted)">Click to focus · double-click to open page</span>`,
        });
      })
      .on("mouseleave", () => setTip(null))
      .on("click", (ev, n) => { ev.stopPropagation(); setSelected((s) => (s === n.id ? null : n.id)); setTip(null); })
      .on("dblclick", (ev, n) => { ev.stopPropagation(); window.location.href = `/companies/${n.id}`; });

    // drag to untangle
    nodeSel.call(
      d3.drag()
        .on("drag", function (ev, n) {
          n.x = ev.x; n.y = ev.y;
          d3.select(this).attr("transform", `translate(${n.x},${n.y})`);
          linkSel.attr("d", arc);
          root.selectAll("path.hit").attr("d", arc);
        })
    );

    // zoom & pan (wheel, pinch, drag on background, double-click zoom disabled in favor of open-page)
    const zoom = d3.zoom()
      .scaleExtent([0.35, 9])
      .on("zoom", (ev) => {
        transformRef.current = ev.transform;
        root.attr("transform", ev.transform);
        root.selectAll("text.lbl.small").style("display", ev.transform.k >= 1.4 ? null : "none");
      });
    zoomRef.current = zoom;
    svg.call(zoom).on("dblclick.zoom", null);
    svg.on("click", () => { setSelected(null); setTip(null); });

    // initial fit
    const el = svgRef.current;
    const vw = el.clientWidth || 1100, vh = el.clientHeight || height;
    const k = Math.min(vw / W, vh / H) * 1.12;
    const t = d3.zoomIdentity.translate(vw / 2 - (W / 2) * k, vh / 2 - (H / 2) * k).scale(k);
    svg.call(zoom.transform, transformRef.current === d3.zoomIdentity ? t : transformRef.current);
  }, [layout, cyclesOnly, selected, neighborhood]);

  const zoomBy = (f) => d3.select(svgRef.current).transition().duration(200).call(zoomRef.current.scaleBy, f);
  const reset = () => {
    transformRef.current = d3.zoomIdentity;
    const el = svgRef.current;
    const vw = el.clientWidth, vh = el.clientHeight;
    const k = Math.min(vw / layout.W, vh / layout.H) * 1.12;
    d3.select(el).transition().duration(300).call(
      zoomRef.current.transform,
      d3.zoomIdentity.translate(vw / 2 - (layout.W / 2) * k, vh / 2 - (layout.H / 2) * k).scale(k)
    );
  };
  const fullscreen = () => {
    const el = boxRef.current;
    document.fullscreenElement ? document.exitFullscreen() : el.requestFullscreen?.();
  };

  const sel = selected ? layout.nodes.find((n) => n.id === selected) : null;
  const selEdges = sel ? layout.edges.filter((e) => e.source.id === sel.id || e.target.id === sel.id) : [];

  return (
    <div>
      <div className="legend" style={{ marginBottom: 8, gap: 18 }}>
        <label><input type="checkbox" checked={cyclesOnly} onChange={(e) => { setCyclesOnly(e.target.checked); setSelected(null); }} /> Highlight circular flows</label>
        <label>
          Min flow ${minFlow}B
          <input type="range" min="0" max="50" step="5" value={minFlow} onChange={(e) => setMinFlow(+e.target.value)} style={{ verticalAlign: "middle", marginLeft: 6 }} />
        </label>
        <span>Scroll or pinch to zoom · drag to pan · drag a node to untangle · click a company to focus its flows</span>
      </div>
      <div ref={boxRef} style={{ position: "relative", background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8 }}>
        <svg ref={svgRef} width="100%" height={height} role="img" aria-label="Interactive map of AI ecosystem money flows" style={{ display: "block", borderRadius: 8, touchAction: "none" }} />
        <div style={{ position: "absolute", top: 10, right: 10, display: "flex", flexDirection: "column", gap: 6 }}>
          {[["+", () => zoomBy(1.45)], ["−", () => zoomBy(1 / 1.45)], ["⤢", fullscreen], ["⌂", reset]].map(([t, fn]) => (
            <button key={t} onClick={fn} aria-label={t} style={{
              width: 34, height: 34, borderRadius: 7, border: "1px solid var(--line)", background: "var(--surface)",
              color: "var(--ink)", fontSize: 17, cursor: "pointer", lineHeight: 1,
            }}>{t}</button>
          ))}
        </div>
        {cyclesOnly && (
          <div style={{ position: "absolute", top: 10, left: 10, background: "var(--surface)", border: "1px solid var(--bad)", borderRadius: 7, padding: "7px 12px", fontSize: 12.5, maxWidth: 320 }}>
            <strong style={{ color: "var(--bad)" }}>Circular flows</strong> — red edges sit on a detected money loop
            (A funds B, B pays A back through purchases or intermediaries). Everything else is faded. Hover any red edge for the detail.
          </div>
        )}
        {sel && (
          <div style={{ position: "absolute", top: 10, left: 10, background: "var(--surface)", border: "1px solid var(--accent)", borderRadius: 8, padding: "10px 14px", fontSize: 13, maxWidth: 320, boxShadow: "0 6px 18px rgba(0,0,0,.14)" }}>
            <strong style={{ fontSize: 15 }}>{sel.name}</strong>
            <div style={{ color: "var(--muted)", margin: "2px 0 6px" }}>{label(sel.category)}{sel.sizeUSDB ? ` · ${fmtB(sel.sizeUSDB)}` : ""}</div>
            <div style={{ maxHeight: 180, overflowY: "auto" }}>
              {selEdges
                .sort((a, b) => (b.headlineUSDB ?? 0) - (a.headlineUSDB ?? 0))
                .slice(0, 8)
                .map((e) => (
                  <div key={e.id} style={{ margin: "3px 0" }}>
                    <a href={`/flows/${e.id}`}>{e.source.id === sel.id ? `→ ${e.target.name}` : `← ${e.source.name}`}</a>
                    <span style={{ color: "var(--muted)" }}> {fmtB(e.headlineUSDB)}</span>
                  </div>
                ))}
              {selEdges.length > 8 && <div style={{ color: "var(--muted)" }}>+{selEdges.length - 8} more…</div>}
            </div>
            <div style={{ marginTop: 8 }}>
              <a href={`/companies/${sel.id}`}><strong>Open company page →</strong></a>
              <button onClick={() => setSelected(null)} style={{ float: "right", border: "none", background: "none", color: "var(--muted)", cursor: "pointer", fontSize: 13 }}>✕ close</button>
            </div>
          </div>
        )}
        {tip && (
          <div style={{
            position: "absolute", left: Math.min(tip.x + 16, (boxRef.current?.clientWidth ?? 900) - 320), top: tip.y + 12,
            maxWidth: 300, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 7,
            padding: "9px 12px", fontSize: 13, pointerEvents: "none", zIndex: 6,
            boxShadow: "0 6px 18px rgba(0,0,0,.14)", lineHeight: 1.5,
          }} dangerouslySetInnerHTML={{ __html: tip.html }} />
        )}
      </div>
    </div>
  );
}
