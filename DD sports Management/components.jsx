/* ============================================================
   UI primitives + app chrome
   ============================================================ */

const ICONS = {
  grid:"M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z",
  users:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  search:"M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.35-4.35",
  bell:"M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
  settings:"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
  clipboard:"M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2 M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2z",
  trend:"M23 6l-9.5 9.5-5-5L1 18",
  file:"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6",
  alert:"M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01",
  "user-plus":"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M20 8v6 M23 11h-6",
  star:"M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01z",
  sun:"M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z M12 1v2 M12 21v2 M4.22 4.22l1.42 1.42 M18.36 18.36l1.42 1.42 M1 12h2 M21 12h2 M4.22 19.78l1.42-1.42 M18.36 5.64l1.42-1.42",
  moon:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
  "chevron-down":"M6 9l6 6 6-6",
  "chevron-right":"M9 18l6-6-6-6",
  "chevron-left":"M15 18l-6-6 6-6",
  menu:"M3 12h18 M3 6h18 M3 18h18",
  plus:"M12 5v14 M5 12h14",
  filter:"M22 3H2l8 9.46V19l4 2v-8.54z",
  briefcase:"M20 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
  target:"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  folder:"M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z",
  shield:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  eye:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
  lock:"M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z M7 11V7a5 5 0 0 1 10 0v4",
  mail:"M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z M22 6l-10 7L2 6",
  "arrow-up":"M12 19V5 M5 12l7-7 7 7",
  "arrow-down":"M12 5v14 M19 12l-7 7-7-7",
  "arrow-right":"M5 12h14 M12 5l7 7-7 7",
  more:"M12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M19 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z M5 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z",
  download:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M7 10l5 5 5-5 M12 15V3",
  calendar:"M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18",
  flag:"M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z M4 22v-7",
  trophy:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6 M18 9h1.5a2.5 2.5 0 0 0 0-5H18 M4 22h16 M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22 M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22 M18 2H6v7a6 6 0 0 0 12 0z",
  check:"M20 6L9 17l-5-5",
  x:"M18 6L6 18 M6 6l12 12",
  globe:"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M3 12h18 M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18z",
  layers:"M12 2L2 7l10 5 10-5z M2 17l10 5 10-5 M2 12l10 5 10-5",
  pie:"M21.21 15.89A10 10 0 1 1 8 2.83 M22 12A10 10 0 0 0 12 2v10z",
  logout:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
  edit:"M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4z",
  message:"M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z",
  activity:"M22 12h-4l-3 9L9 3l-3 9H2",
  whistle:"M3 12a6 6 0 1 0 12 0 6 6 0 0 0-12 0z M15 9l6-3 M9 12h.01",
  heart:"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z",
  zap:"M13 2L3 14h9l-1 8 10-12h-9z",
  dollar:"M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
  clock:"M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z M12 7v5l3 2",
  award:"M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14z M8.21 13.89L7 23l5-3 5 3-1.21-9.12",
};

function Icon({ name, size, style, className }) {
  const d = ICONS[name] || ICONS.grid;
  return (
    <svg className={className} width={size || 20} height={size || 20} viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={style}>
      {d.split(" M").map((seg, i) => <path key={i} d={(i ? "M" : "") + seg} />)}
    </svg>
  );
}

function Avatar({ name, color, src, size = 40, ring, square, fontScale = 0.4 }) {
  const initials = (name || "").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div className={"av" + (square ? " sq" : "") + (ring ? " av-ring" : "")}
      style={{ width: size, height: size, background: src ? undefined : (color || "var(--navy)"),
        backgroundImage: src ? `url(${src})` : undefined, fontSize: size * fontScale }}>
      {!src && initials}
    </div>
  );
}

function Badge({ tone = "gray", children, dot }) {
  return <span className={"badge " + tone}>{dot && <span className="pip"></span>}{children}</span>;
}

const STATUS_TONE = { "Active": "green", "Contract Risk": "red", "Prospect": "blue", "Injured": "amber", "Signed": "green" };
function StatusBadge({ status }) {
  return <Badge tone={STATUS_TONE[status] || "gray"} dot>{status}</Badge>;
}

const POS_GROUP = { GK: "GK", DF: "DF", MF: "MF", FW: "FW" };
function PosTag({ pos }) { return <span className={"pos-tag pos-" + (POS_GROUP[pos] || "MF")}>{pos}</span>; }

function RatingPill({ value }) {
  const v = parseFloat(value);
  const bg = v >= 7.5 ? "var(--green)" : v >= 7.0 ? "var(--accent)" : v >= 6.5 ? "var(--amber)" : "var(--red)";
  return <span className="rating" style={{ background: bg }}>{value.toFixed ? value.toFixed(1) : value}</span>;
}

function Meter({ value, tone, height = 7 }) {
  return <div className={"meter " + (tone || "")} style={{ height }}>
    <span style={{ width: Math.min(100, value) + "%" }}></span>
  </div>;
}

function KPI({ icon, label, value, unit, delta, deltaDir, tone = "blue", spark }) {
  const toneColor = { blue: "var(--accent)", gold: "var(--gold)", green: "var(--green)", red: "var(--red)", navy: "var(--navy-400)" }[tone];
  return (
    <div className="kpi">
      <div className="top">
        <div className="ic" style={{ background: `color-mix(in srgb, ${toneColor} 16%, transparent)`, color: toneColor }}>
          <Icon name={icon} />
        </div>
        {spark && <div className="spark" style={{ position: "static", opacity: 1 }}>
          <Sparkline data={spark} color={deltaDir === "down" ? "var(--red)" : "var(--green)"} />
        </div>}
      </div>
      <div className="lbl">{label}</div>
      <div className="val">{unit && <small>{unit}</small>}{value}</div>
      {delta && <div className={"delta " + (deltaDir || "up")}>
        <Icon name={deltaDir === "down" ? "arrow-down" : "arrow-up"} size={13} />{delta}
      </div>}
    </div>
  );
}

// ---------- Sidebar ----------
function Sidebar({ nav, current, onNav, persona, collapsed, onPersonaClick }) {
  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <img src="assets/mark-white.png" alt="DD" />
        <div className="wm">
          <b>DD Sports</b>
          <span>Intelligence</span>
        </div>
      </div>
      <nav className="sb-nav" style={{ paddingTop: 14 }}>
        {nav.map((group, gi) => (
          <React.Fragment key={gi}>
            {group.label && <div className="sb-section"><div className="lbl">{group.label}</div></div>}
            {group.items.map(it => (
              <a key={it.id} className={"nav-item" + (current === it.id ? " active" : "")}
                onClick={() => onNav(it.id)}>
                <Icon name={it.icon} />
                <span>{it.label}</span>
                {it.badge && <span className="badge-dot">{it.badge}</span>}
              </a>
            ))}
          </React.Fragment>
        ))}
      </nav>
      <div className="sb-foot">
        <div className="persona-card" onClick={onPersonaClick}>
          <Avatar name={persona.name} color={persona.color} size={38} square />
          <div className="meta">
            <b>{persona.name}</b>
            <small>{persona.roleLabel}</small>
          </div>
          <Icon name="chevron-right" size={16} style={{ marginLeft: "auto", color: "#8ea0d8" }} />
        </div>
      </div>
    </aside>
  );
}

// ---------- Topbar ----------
function Topbar({ crumb, persona, role, onRole, theme, onTheme, onMenu, onBell, unread, density }) {
  return (
    <header className="topbar">
      <button className="icon-btn menu-toggle" onClick={onMenu}><Icon name="menu" /></button>
      <div className="crumb">
        <span className="crumb-path muted">{crumb.section}</span>
        {crumb.page && <><Icon name="chevron-right" size={14} style={{ color: "var(--text-3)" }} className="crumb-path" /><b>{crumb.page}</b></>}
      </div>
      <div className="topbar-spacer"></div>
      <div className="searchbar">
        <Icon name="search" />
        <input placeholder="Search players, clubs, reports…" />
        <span className="kbd">⌘K</span>
      </div>
      <div className="seg persona-seg">
        {[["admin", "Admin"], ["scout", "Scout"], ["club", "Club"], ["player", "Player"]].map(([k, l]) => (
          <button key={k} className={role === k ? "on" : ""} onClick={() => onRole(k)}>{l}</button>
        ))}
      </div>
      <button className="icon-btn" onClick={onTheme} title="Toggle theme">
        <Icon name={theme === "dark" ? "sun" : "moon"} />
      </button>
      <button className="icon-btn" onClick={onBell} title="Notifications">
        <Icon name="bell" />{unread > 0 && <span className="dot"></span>}
      </button>
      <Avatar name={persona.name} color={persona.color} size={36} square />
    </header>
  );
}

// ---------- Activity Feed ----------
const FEED_TONE = { report: "blue", player: "green", alert: "red", contract: "gold", perf: "green", default: "blue" };
function Feed({ items, limit }) {
  const list = limit ? items.slice(0, limit) : items;
  return (
    <div className="feed">
      {list.map((a, i) => {
        const tone = FEED_TONE[a.type] || FEED_TONE.default;
        const col = { blue: "var(--accent)", green: "var(--green)", red: "var(--red)", gold: "var(--gold)" }[tone];
        return (
          <div className="feed-item" key={i}>
            <div className="fi-ic" style={{ background: `color-mix(in srgb, ${col} 15%, transparent)`, color: col }}>
              <Icon name={a.icon} size={15} />
            </div>
            <div className="fi-body">
              <p dangerouslySetInnerHTML={{ __html: `<b>${a.who}</b> ${a.text}` }}></p>
              <div className="fi-time">{a.time}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SectionCard({ title, sub, action, children, className, style }) {
  return (
    <div className={"card card-pad " + (className || "")} style={style}>
      {(title || action) && (
        <div className="card-head">
          <div>
            {title && <h3>{title}</h3>}
            {sub && <div className="ttl-sub">{sub}</div>}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

function BenchmarkBar({ label, value, unit, percentile }) {
  const pct = Math.max(1, Math.min(99, percentile || 50));
  const tier = pct >= 90 ? "Top 10%" : pct >= 75 ? "Top 25%" : pct >= 50 ? "Above Avg" : pct >= 25 ? "Average" : "Below Avg";
  const color = pct >= 75 ? "var(--green)" : pct >= 50 ? "var(--accent)" : pct >= 25 ? "var(--amber)" : "var(--red)";
  return (
    <div style={{ marginBottom: 15 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: "var(--text-2)" }}>{label}</span>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <b className="mono" style={{ fontSize: 13 }}>{value != null ? value + (unit || "") : "—"}</b>
          <span style={{ fontSize: 11, fontWeight: 700, color, fontFamily: "var(--font-mono)", minWidth: 76, textAlign: "right" }}>{tier}</span>
        </div>
      </div>
      <div style={{ height: 7, background: "var(--surface-3)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", width: pct + "%", background: color, borderRadius: 4, transition: "width .5s ease" }} />
      </div>
    </div>
  );
}

Object.assign(window, { Icon, Avatar, Badge, StatusBadge, PosTag, RatingPill, Meter, KPI, Sidebar, Topbar, Feed, SectionCard, BenchmarkBar });
