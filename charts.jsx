/* ============================================================
   Charts — hand-built SVG, theme-aware via currentColor/vars
   ============================================================ */

// smooth path from points
function smoothPath(pts) {
  if (pts.length < 2) return "";
  let d = `M ${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const cp1x = p1[0] + (p2[0] - p0[0]) / 6, cp1y = p1[1] + (p2[1] - p0[1]) / 6;
    const cp2x = p2[0] - (p3[0] - p1[0]) / 6, cp2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2[0]},${p2[1]}`;
  }
  return d;
}

function LineChart({ data, height = 200, color = "var(--accent)", fill = true, labels, showDots, valueFmt }) {
  const W = 600, H = height, padX = 8, padT = 14, padB = labels ? 24 : 10;
  const max = Math.max(...data) * 1.08, min = Math.min(...data) * 0.92;
  const range = max - min || 1;
  const pts = data.map((v, i) => [
    padX + (i / (data.length - 1)) * (W - padX * 2),
    padT + (1 - (v - min) / range) * (H - padT - padB),
  ]);
  const line = smoothPath(pts);
  const area = line + ` L ${pts[pts.length - 1][0]},${H - padB} L ${pts[0][0]},${H - padB} Z`;
  const gid = "g" + Math.random().toString(36).slice(2, 7);
  const grid = 4;
  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ height }}>
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {Array.from({ length: grid + 1 }).map((_, i) => {
          const y = padT + (i / grid) * (H - padT - padB);
          return <line key={i} x1={padX} y1={y} x2={W - padX} y2={y} stroke="var(--grid-line)" strokeWidth="1" />;
        })}
        {fill && <path d={area} fill={`url(#${gid})`} />}
        <path d={line} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
        {showDots && pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r="3" fill="var(--surface)" stroke={color} strokeWidth="2" />
        ))}
        {!showDots && <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="4" fill={color} />}
        {labels && labels.map((l, i) => (
          <text key={i} className="axis" x={padX + (i / (labels.length - 1)) * (W - padX * 2)}
            y={H - 6} textAnchor={i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle"}>{l}</text>
        ))}
      </svg>
    </div>
  );
}

function MultiLineChart({ seriesList, height = 220, labels }) {
  const W = 600, H = height, padX = 8, padT = 14, padB = 24;
  const all = seriesList.flatMap(s => s.data);
  const max = Math.max(...all) * 1.08, min = Math.min(...all) * 0.9, range = max - min || 1;
  const toPts = (d) => d.map((v, i) => [padX + (i / (d.length - 1)) * (W - padX * 2), padT + (1 - (v - min) / range) * (H - padT - padB)]);
  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ height }}>
        {Array.from({ length: 5 }).map((_, i) => {
          const y = padT + (i / 4) * (H - padT - padB);
          return <line key={i} x1={padX} y1={y} x2={W - padX} y2={y} stroke="var(--grid-line)" strokeWidth="1" />;
        })}
        {seriesList.map((s, si) => {
          const pts = toPts(s.data);
          return <g key={si}>
            <path d={smoothPath(pts)} fill="none" stroke={s.color} strokeWidth="2.4" strokeLinecap="round"
              strokeDasharray={s.dashed ? "5 5" : "none"} />
            <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="3.5" fill={s.color} />
          </g>;
        })}
        {labels && labels.map((l, i) => (
          <text key={i} className="axis" x={padX + (i / (labels.length - 1)) * (W - padX * 2)}
            y={H - 5} textAnchor={i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle"}>{l}</text>
        ))}
      </svg>
    </div>
  );
}

function BarChart({ data, height = 200, color = "var(--accent)", labels, valueOnTop }) {
  const W = 600, H = height, padB = labels ? 24 : 6, padT = valueOnTop ? 22 : 8, gap = 0.34;
  const max = Math.max(...data) * 1.12 || 1;
  const bw = (W / data.length);
  return (
    <div className="chart">
      <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ height }}>
        {data.map((v, i) => {
          const h = (v / max) * (H - padT - padB);
          const x = i * bw + bw * gap / 2;
          const w = bw * (1 - gap);
          const y = H - padB - h;
          return <g key={i}>
            <rect x={x} y={y} width={w} height={h} rx="5" fill={typeof color === "function" ? color(v, i) : color} />
            {valueOnTop && <text x={x + w / 2} y={y - 7} textAnchor="middle" className="axis" fill="var(--text-2)"
              style={{ fontSize: 11, fontWeight: 600 }}>{v}</text>}
            {labels && <text x={x + w / 2} y={H - 7} textAnchor="middle" className="axis">{labels[i]}</text>}
          </g>;
        })}
      </svg>
    </div>
  );
}

function Donut({ segments, size = 168, thickness = 22, centerLabel, centerSub }) {
  const r = (size - thickness) / 2, c = size / 2, circ = 2 * Math.PI * r;
  const total = segments.reduce((a, s) => a + s.value, 0) || 1;
  let off = 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ flex: "none" }}>
        <circle cx={c} cy={c} r={r} fill="none" stroke="var(--surface-3)" strokeWidth={thickness} />
        <g transform={`rotate(-90 ${c} ${c})`}>
          {segments.map((s, i) => {
            const len = (s.value / total) * circ;
            const el = <circle key={i} cx={c} cy={c} r={r} fill="none" stroke={s.color} strokeWidth={thickness}
              strokeDasharray={`${len} ${circ - len}`} strokeDashoffset={-off} strokeLinecap="butt" />;
            off += len; return el;
          })}
        </g>
        {centerLabel != null && <text x={c} y={c - 2} textAnchor="middle" className="donut-center"
          fill="var(--text)" style={{ fontSize: 30 }}>{centerLabel}</text>}
        {centerSub && <text x={c} y={c + 18} textAnchor="middle" fill="var(--text-3)"
          style={{ fontSize: 11, fontFamily: "var(--font-mono)" }}>{centerSub}</text>}
      </svg>
      <div className="legend" style={{ flexDirection: "column", gap: 11 }}>
        {segments.map((s, i) => (
          <div className="li" key={i} style={{ justifyContent: "space-between", minWidth: 150 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span className="sw" style={{ background: s.color }}></span>{s.label}
            </span>
            <b className="mono" style={{ color: "var(--text)" }}>{s.value}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

function Sparkline({ data, color = "var(--green)", w = 90, h = 34 }) {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - 3 - ((v - min) / range) * (h - 6)]);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <path d={smoothPath(pts)} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// horizontal stat bars (recruitment pipeline funnel)
function FunnelBars({ rows }) {
  const max = Math.max(...rows.map(r => r.value)) || 1;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
      {rows.map((r, i) => (
        <div key={i}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12.5 }}>
            <span style={{ color: "var(--text-2)" }}>{r.label}</span>
            <b className="mono">{r.value}</b>
          </div>
          <div className="meter" style={{ height: 9 }}>
            <span style={{ width: `${(r.value / max) * 100}%`, background: r.color }}></span>
          </div>
        </div>
      ))}
    </div>
  );
}

// radial gauge for ratings
function Gauge({ value, max = 10, size = 92, color = "var(--accent)", label }) {
  const r = (size - 12) / 2, c = size / 2, circ = 2 * Math.PI * r;
  const pct = Math.min(1, value / max);
  return (
    <div style={{ textAlign: "center" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={c} cy={c} r={r} fill="none" stroke="var(--surface-3)" strokeWidth="9" />
        <g transform={`rotate(-90 ${c} ${c})`}>
          <circle cx={c} cy={c} r={r} fill="none" stroke={color} strokeWidth="9" strokeLinecap="round"
            strokeDasharray={`${pct * circ} ${circ}`} />
        </g>
        <text x={c} y={c + 1} textAnchor="middle" fill="var(--text)" className="donut-center"
          style={{ fontSize: 22 }}>{value}</text>
        <text x={c} y={c + 16} textAnchor="middle" fill="var(--text-3)" style={{ fontSize: 9, fontFamily: "var(--font-mono)" }}>/ {max}</text>
      </svg>
      {label && <div className="dim" style={{ fontSize: 11.5, marginTop: 4 }}>{label}</div>}
    </div>
  );
}

// Spider / radar chart for player comparison
function RadarChart({ axes, size = 300, colorA = "var(--accent)", colorB = "var(--gold)", nameA = "Player A", nameB = "Player B" }) {
  if (!axes || axes.length < 3) return null;
  const W = size, H = size, cx = W / 2, cy = H / 2;
  const r = W * 0.34;
  const n = axes.length;
  const ang = (i) => (2 * Math.PI * i / n) - Math.PI / 2;
  const pt = (val, i) => {
    const a = ang(i), d = r * Math.max(0, Math.min(100, val || 0)) / 100;
    return [cx + d * Math.cos(a), cy + d * Math.sin(a)];
  };
  const poly = (getter) => axes.map((ax, i) => pt(getter(ax), i)).map(p => p.join(",")).join(" ");
  return (
    <div>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
        {[25, 50, 75, 100].map(pct => (
          <polygon key={pct} points={axes.map((_, i) => pt(pct, i).join(",")).join(" ")}
            fill="none" stroke="var(--grid-line)" strokeWidth="1" />
        ))}
        {axes.map((_, i) => {
          const [x, y] = pt(100, i);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="var(--grid-line)" strokeWidth="1" />;
        })}
        <polygon points={poly(ax => ax.b)} fill={colorB} fillOpacity="0.15" stroke={colorB} strokeWidth="2" strokeLinejoin="round" />
        <polygon points={poly(ax => ax.a)} fill={colorA} fillOpacity="0.18" stroke={colorA} strokeWidth="2" strokeLinejoin="round" />
        {axes.map((ax, i) => { const p = pt(ax.a, i); return <circle key={"a" + i} cx={p[0]} cy={p[1]} r="4" fill={colorA} />; })}
        {axes.map((ax, i) => { const p = pt(ax.b, i); return <circle key={"b" + i} cx={p[0]} cy={p[1]} r="4" fill={colorB} />; })}
        {axes.map((ax, i) => {
          const [x, y] = pt(122, i);
          const ta = Math.abs(x - cx) < 8 ? "middle" : x > cx ? "start" : "end";
          return <text key={i} x={x} y={y + 4} textAnchor={ta} fill="var(--text-2)"
            style={{ fontSize: 11, fontFamily: "var(--font-mono)" }}>{ax.label}</text>;
        })}
      </svg>
      <div className="legend" style={{ marginTop: 8, justifyContent: "center" }}>
        <div className="li"><span className="sw" style={{ background: colorA }}></span>{nameA}</div>
        <div className="li"><span className="sw" style={{ background: colorB }}></span>{nameB}</div>
      </div>
    </div>
  );
}

Object.assign(window, { LineChart, MultiLineChart, BarChart, Donut, Sparkline, FunnelBars, Gauge, RadarChart, smoothPath });
