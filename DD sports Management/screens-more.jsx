/* ============================================================
   Scout Dashboard · Recruitment Pipeline · Player Dashboard
   Documents · Notifications
   ============================================================ */
const { useState: useStateM } = React;

// =================== SCOUT DASHBOARD ===================
function ScoutDashboard({ onOpenPlayer }) {
  const targets = window.DD.TARGETS;
  const [sel, setSel] = useStateM(0);
  const prospects = targets.filter(t => ["identified", "review", "scouted"].includes(t.stage)).slice(0, 5);
  const evalP = prospects[sel] || prospects[0];
  const attrs = [["Pace", 88], ["Finishing", 82], ["Vision", 79], ["Physical", 74], ["Technique", 86], ["Mentality", 80]];
  return (
    <div className="fade-in">
      <div className="page-head">
        <div>
          <div className="eyebrow">Scout · Marco Solano</div>
          <h1>Scout Workspace</h1>
          <div className="sub">South America region · 14 players tracked</div>
        </div>
        <button className="btn btn-primary"><Icon name="plus" size={16} />New Scout Report</button>
      </div>

      <div className="grid cols-4" style={{ marginBottom: 18 }}>
        <KPI icon="users" label="Assigned Players" value="14" delta="+2 this month" deltaDir="up" tone="blue" />
        <KPI icon="eye" label="Prospect Watchlist" value="9" delta="3 high priority" deltaDir="up" tone="gold" />
        <KPI icon="clipboard" label="Reports Due" value="3" delta="2 overdue" deltaDir="down" tone="red" />
        <KPI icon="zap" label="New Opportunities" value="5" delta="this week" deltaDir="up" tone="green" />
      </div>

      <div className="dash-grid">
        <SectionCard title="Scout Report" sub={"Evaluation · " + evalP.name}
          action={<RatingPill value={evalP.scout} />}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20, paddingBottom: 18, borderBottom: "1px solid var(--line)" }}>
            <Avatar name={evalP.name} color="#1f3aa6" size={52} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 16 }}>{evalP.name} <PosTag pos={evalP.pos} /></div>
              <div className="dim" style={{ fontSize: 12.5 }}>{evalP.club} · {evalP.age} yrs · {evalP.mv}</div>
            </div>
          </div>

          <div className="grid cols-2" style={{ gap: 18, marginBottom: 20 }}>
            <div>
              <div className="eyebrow" style={{ color: "var(--green)", marginBottom: 10 }}>Strengths</div>
              {["Explosive acceleration in transition", "Composed finishing under pressure", "Excellent off-ball movement"].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 9, fontSize: 13, marginBottom: 8, color: "var(--text-2)" }}>
                  <Icon name="check" size={15} style={{ color: "var(--green)", flex: "none", marginTop: 1 }} />{s}
                </div>
              ))}
            </div>
            <div>
              <div className="eyebrow" style={{ color: "var(--red)", marginBottom: 10 }}>Areas to Develop</div>
              {["Aerial duels & physical strength", "Defensive work-rate off the ball", "Consistency across full 90"].map((s, i) => (
                <div key={i} style={{ display: "flex", gap: 9, fontSize: 13, marginBottom: 8, color: "var(--text-2)" }}>
                  <Icon name="x" size={15} style={{ color: "var(--red)", flex: "none", marginTop: 1 }} />{s}
                </div>
              ))}
            </div>
          </div>

          <div className="grid cols-3" style={{ gap: 16, alignItems: "center" }}>
            <div className="card" style={{ padding: 16, textAlign: "center" }}>
              <div className="dim eyebrow" style={{ marginBottom: 8 }}>Recommendation</div>
              <div className="display" style={{ fontSize: 18, color: "var(--green)" }}>Sign — Priority</div>
            </div>
            <div style={{ display: "grid", placeItems: "center" }}>
              <Gauge value={evalP.scout} color="var(--accent)" label="Scout Score" />
            </div>
            <div style={{ display: "grid", placeItems: "center" }}>
              <Gauge value={9.1} color="var(--gold)" label="Potential" />
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Prospect Comparison" sub="Select to evaluate"
          action={<button className="btn btn-ghost btn-sm">Compare</button>}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 18 }}>
            {prospects.map((t, i) => (
              <div key={i} className="stat-line" style={{ cursor: "pointer", background: sel === i ? "var(--surface-2)" : "", borderRadius: 10, padding: "10px 8px", border: "none" }} onClick={() => setSel(i)}>
                <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                  <Avatar name={t.name} color={sel === i ? "var(--accent)" : "#4a4f8f"} size={34} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13 }}>{t.name}</div>
                    <div className="dim mono" style={{ fontSize: 11 }}>{t.club} · {t.pos}</div>
                  </div>
                </div>
                <RatingPill value={t.scout} />
              </div>
            ))}
          </div>
          <div className="divider"></div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Attribute Profile · {evalP.name}</div>
          {attrs.map((a, i) => (
            <div key={i} style={{ marginBottom: 11 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 5 }}>
                <span className="muted">{a[0]}</span><b className="mono">{a[1]}</b>
              </div>
              <Meter value={a[1]} tone={a[1] >= 85 ? "green" : a[1] >= 78 ? "" : "gold"} />
            </div>
          ))}
        </SectionCard>
      </div>
    </div>
  );
}

// =================== RECRUITMENT PIPELINE (Kanban) ===================
function RecruitmentPipeline() {
  const [cards, setCards] = useStateM(() => window.DD.TARGETS.map((t, i) => ({ ...t, uid: i })));
  const [drag, setDrag] = useStateM(null);
  const [over, setOver] = useStateM(null);
  const stages = window.DD.STAGES;

  const drop = (stageId) => {
    if (drag == null) return;
    setCards(cs => cs.map(c => c.uid === drag ? { ...c, stage: stageId } : c));
    setDrag(null); setOver(null);
  };

  return (
    <div className="fade-in" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div className="page-head">
        <div>
          <div className="eyebrow">Recruitment · {cards.length} Targets</div>
          <h1>Recruitment Pipeline</h1>
          <div className="sub">Drag prospects across stages to track recruitment progress.</div>
        </div>
        <button className="btn btn-primary"><Icon name="plus" size={16} />Add Target</button>
      </div>
      <div className="kanban">
        {stages.map(s => {
          const col = cards.filter(c => c.stage === s.id);
          return (
            <div key={s.id} className={"kcol" + (over === s.id ? " drop-target" : "")}
              onDragOver={e => { e.preventDefault(); setOver(s.id); }}
              onDragLeave={() => setOver(o => o === s.id ? null : o)}
              onDrop={() => drop(s.id)}>
              <div className="kcol-head">
                <span className="dotc" style={{ background: s.color }}></span>
                <b>{s.label}</b>
                <span className="cnt">{col.length}</span>
              </div>
              <div className="kcol-body">
                {col.map(c => (
                  <div key={c.uid} className={"kcard" + (drag === c.uid ? " drag" : "")} draggable
                    onDragStart={() => setDrag(c.uid)} onDragEnd={() => { setDrag(null); setOver(null); }}>
                    <div className="kc-top">
                      <Avatar name={c.name} color="#2a3a7a" size={36} />
                      <div style={{ minWidth: 0 }}>
                        <b>{c.name}</b><br /><small>{c.club}</small>
                      </div>
                    </div>
                    <div className="kc-meta">
                      <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                        <PosTag pos={c.pos} />
                        <span className="dim mono" style={{ fontSize: 11 }}>{c.age}y · {c.mv}</span>
                      </div>
                      <RatingPill value={c.scout} />
                    </div>
                  </div>
                ))}
                {col.length === 0 && <div className="dim" style={{ textAlign: "center", padding: "18px 0", fontSize: 12, fontFamily: "var(--font-mono)" }}>Drop here</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =================== PLAYER DASHBOARD ===================
function PlayerDashboard({ player }) {
  const p = player;
  const months = ["Jul", "Sep", "Nov", "Jan", "Mar", "May"];
  return (
    <div className="fade-in">
      <div className="card" style={{ overflow: "hidden", marginBottom: 18 }}>
        <div style={{ background: "linear-gradient(120deg,#061242,#031d72 60%,#0a2a8c)", padding: "32px 30px", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, opacity: .3 }}><PitchLines /></div>
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
            <Avatar name={p.name} color={p.avColor} size={92} ring fontScale={0.34} />
            <div style={{ color: "#fff", flex: 1, minWidth: 220 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".16em", color: "var(--gold-soft)", textTransform: "uppercase" }}>Welcome back</div>
              <h1 className="display" style={{ fontSize: 36, color: "#fff", margin: "4px 0" }}>{p.name}</h1>
              <div style={{ color: "#c4d0f0", fontSize: 13.5 }}>{p.posFull} · {p.club} · Managed by {p.agent}</div>
            </div>
            <div style={{ textAlign: "right", color: "#fff" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".14em", color: "#9fb0e8", textTransform: "uppercase" }}>Your Market Value</div>
              <div className="display" style={{ fontSize: 36, color: "var(--gold-soft)" }}>{p.mv}</div>
              <Badge tone="green" dot>+12% this season</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid cols-4" style={{ marginBottom: 18 }}>
        <KPI icon="activity" label="Matches Played" value={p.apps} tone="blue" />
        <KPI icon="target" label="Goals" value={p.goals} tone="gold" />
        <KPI icon="zap" label="Assists" value={p.assists} tone="green" />
        <KPI icon="award" label="Avg Rating" value={p.rating.toFixed(1)} tone="navy" />
      </div>

      <div className="dash-grid" style={{ marginBottom: 18 }}>
        <SectionCard title="Your Performance" sub="Match ratings this season" action={<Badge tone="green" dot>In form</Badge>}>
          <LineChart height={230} color="var(--green)" labels={months} data={p.perf.filter((_, i) => i % 2 === 0)} showDots />
        </SectionCard>
        <SectionCard title="Development Goals" sub="Set with your agent">
          {[["Weak-foot finishing", 70, "green"], ["Match fitness — full 90s", 55, ""], ["Brand & media presence", 40, "gold"]].map((o, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                <span>{o[0]}</span><b className="mono">{o[1]}%</b>
              </div>
              <Meter value={o[1]} tone={o[2]} />
            </div>
          ))}
        </SectionCard>
      </div>

      <div className="dash-grid">
        <SectionCard title="Upcoming Objectives" action={<Icon name="calendar" size={18} style={{ color: "var(--text-3)" }} />}>
          {[["Pre-season medical assessment", "Jun 12", "blue"], ["Contract review with David Duarte", "Jun 18", "gold"], ["Brand photoshoot — kit partner", "Jun 24", "green"], ["Performance analysis session", "Jul 02", "blue"]].map((o, i) => (
            <div key={i} className="stat-line">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, display: "grid", placeItems: "center", background: "color-mix(in srgb,var(--accent) 13%,transparent)", color: "var(--accent)" }}><Icon name="calendar" size={16} /></div>
                <span style={{ fontWeight: 600, fontSize: 13.5 }}>{o[0]}</span>
              </div>
              <Badge tone={o[2]}>{o[1]}</Badge>
            </div>
          ))}
        </SectionCard>
        <SectionCard title="Agency Updates" sub="From your management team">
          <Feed items={[
            { who: "David Duarte", text: "shared positive feedback on your last performance. Keep it up! 💪", time: "2h ago", icon: "message", type: "perf" },
            { who: "Sofía Marín", text: "uploaded your updated <b>registration documents</b>", time: "Yesterday", icon: "file", type: "contract" },
            { who: "Agency", text: "Your market value increased to <b>" + p.mv + "</b>", time: "3 days ago", icon: "trend", type: "perf" },
          ]} />
        </SectionCard>
      </div>
    </div>
  );
}

// =================== DOCUMENTS ===================
function Documents() {
  const [cat, setCat] = useStateM("All");
  const cats = ["All", "Contracts", "Medical", "Passports", "Registrations", "Scouting Reports"];
  const docs = window.DD.DOCS.filter(d => cat === "All" || d.cat === cat);
  const catIcon = { Contracts: "file", Medical: "heart", Passports: "globe", Registrations: "shield", "Scouting Reports": "clipboard" };
  return (
    <div className="fade-in">
      <div className="page-head">
        <div>
          <div className="eyebrow">Secure Repository</div>
          <h1>Document Management</h1>
          <div className="sub">Encrypted storage for all agency and player documents.</div>
        </div>
        <button className="btn btn-primary"><Icon name="plus" size={16} />Upload</button>
      </div>

      <div className="grid cols-4" style={{ marginBottom: 22 }}>
        {cats.slice(1).map((c, i) => {
          const n = window.DD.DOCS.filter(d => d.cat === c).length;
          const cols = ["#9a3550", "#2f7a44", "#1d6f8f", "#b8742a", "#1f3aa6"];
          return (
            <div key={c} className="kpi" style={{ cursor: "pointer" }} onClick={() => setCat(c)}>
              <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                <div className="file-ic" style={{ background: cols[i], width: 44, height: 44 }}><Icon name={catIcon[c]} size={19} /></div>
                <div>
                  <div style={{ fontWeight: 600 }}>{c}</div>
                  <div className="dim mono" style={{ fontSize: 12 }}>{n} {n === 1 ? "file" : "files"}</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="filterbar">
        {cats.map(c => <button key={c} className={"chip-toggle" + (cat === c ? " on" : "")} onClick={() => setCat(c)}>{c}</button>)}
        <div className="searchbar" style={{ marginLeft: "auto", maxWidth: 240, flex: "none", width: 240 }}>
          <Icon name="search" /><input placeholder="Search files…" />
        </div>
      </div>

      <div className="grid cols-3">
        {docs.map((d, i) => (
          <div key={i} className="file-card">
            <div className="file-ic" style={{ background: d.color }}>{d.ext}</div>
            <div className="fc-body">
              <b>{d.name}</b>
              <small>{d.cat} · {d.size}</small>
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className="dim mono" style={{ fontSize: 11 }}>{d.date}</span>
                <Icon name="lock" size={13} style={{ color: "var(--green)" }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =================== NOTIFICATIONS ===================
function Notifications() {
  const [filter, setFilter] = useStateM("All");
  const cats = ["All", "Contract", "Scouting", "Performance", "Transfer"];
  const list = window.DD.NOTIFS.filter(n => filter === "All" || n.cat === filter);
  const icon = { Contract: "file", Scouting: "clipboard", Performance: "trend", Transfer: "zap" };
  return (
    <div className="fade-in">
      <div className="page-head">
        <div>
          <div className="eyebrow">{window.DD.NOTIFS.filter(n => n.unread).length} Unread</div>
          <h1>Notifications</h1>
          <div className="sub">Stay on top of contracts, reports and opportunities.</div>
        </div>
        <button className="btn btn-ghost"><Icon name="check" size={16} />Mark all read</button>
      </div>
      <div className="filterbar">
        {cats.map(c => <button key={c} className={"chip-toggle" + (filter === c ? " on" : "")} onClick={() => setFilter(c)}>{c}</button>)}
      </div>
      <div className="card" style={{ overflow: "hidden", maxWidth: 760 }}>
        {list.map((n, i) => (
          <div key={i} style={{ display: "flex", gap: 15, padding: "17px 20px", borderBottom: i < list.length - 1 ? "1px solid var(--line)" : "none", background: n.unread ? "color-mix(in srgb,var(--accent) 5%,transparent)" : "" }}>
            <div className="fi-ic" style={{ width: 40, height: 40, borderRadius: 11, flex: "none", background: `color-mix(in srgb,var(--${n.kind === "gold" ? "gold" : n.kind === "red" ? "red" : n.kind === "green" ? "green" : "accent"}) 15%,transparent)`, color: `var(--${n.kind === "gold" ? "gold" : n.kind === "red" ? "red" : n.kind === "green" ? "green" : "accent"})`, display: "grid", placeItems: "center" }}>
              <Icon name={icon[n.cat]} size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 3 }}>
                <b style={{ fontSize: 14 }}>{n.title}</b>
                {n.unread && <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent)" }}></span>}
              </div>
              <p className="muted" style={{ fontSize: 13, lineHeight: 1.5 }}>{n.body}</p>
              <div className="dim mono" style={{ fontSize: 11, marginTop: 5 }}>{n.cat} · {n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =================== MANAGED ROSTER ===================
function ManagedRoster({ onOpenPlayer }) {
  const managed = window.DD.PLAYERS.filter(p => p.agent && p.agent !== "—");
  const agentMap = {};
  managed.forEach(p => {
    if (!agentMap[p.agent]) agentMap[p.agent] = [];
    agentMap[p.agent].push(p);
  });
  const totalMV = managed.reduce((s, p) => s + p.mvNum, 0).toFixed(1);
  const risks    = managed.filter(p => p.status === "Contract Risk").length;
  const active   = managed.filter(p => p.status === "Active").length;

  const pill = (status) => {
    const t = { "Active": "green", "Contract Risk": "red", "Prospect": "gold" }[status] || "accent";
    return { padding: "3px 10px", borderRadius: 999, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap",
      background: `color-mix(in srgb,var(--${t}) 14%,transparent)`, color: `var(--${t})` };
  };

  return (
    <div className="fade-in">
      <div className="page-head">
        <div>
          <div className="eyebrow">DD Sports Management</div>
          <h1>Managed Players</h1>
          <div className="sub">{managed.length} players under management · {Object.keys(agentMap).length} agents</div>
        </div>
        <button className="btn btn-primary"><Icon name="plus" size={16} />Add Player</button>
      </div>

      <div className="grid cols-4" style={{ marginBottom: 18 }}>
        <KPI icon="users" label="Total Clients"    value={managed.length}      delta="across 3 agents"        tone="blue"  />
        <KPI icon="trend" label="Portfolio Value"  value={"€" + totalMV + "M"} delta="combined market value"  tone="green" />
        <KPI icon="check" label="Active Contracts" value={active}               delta={active + " in season"}  tone="green" deltaDir="up" />
        <KPI icon="zap"   label="Contract Risk"    value={risks}                delta="expiring soon"          tone="red"   deltaDir={risks > 0 ? "down" : "up"} />
      </div>

      {Object.entries(agentMap).map(([agent, players]) => {
        const agMV = players.reduce((s, p) => s + p.mvNum, 0).toFixed(1);
        return (
          <div key={agent} style={{ marginBottom: 20 }}>
            <SectionCard title={agent} sub={players.length + " clients · €" + agMV + "M portfolio"}>
              {players.map((p, i) => (
                <div key={p.id}
                  onClick={() => onOpenPlayer && onOpenPlayer(p.id)}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--surface-2)"}
                  onMouseLeave={e  => e.currentTarget.style.background = ""}
                  style={{ display: "flex", alignItems: "center", gap: 14, padding: "11px 6px", cursor: "pointer",
                    borderBottom: i < players.length - 1 ? "1px solid var(--line)" : "none", borderRadius: 8 }}>
                  <Avatar name={p.name} color={p.avColor} size={42} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{p.flag} {p.name} <PosTag pos={p.pos} /></div>
                    <div className="dim" style={{ fontSize: 12, marginTop: 2 }}>{p.posFull} · {p.club} · {p.league}</div>
                  </div>
                  <div style={{ textAlign: "right", minWidth: 72 }}>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text-1)" }}>{p.mv}</div>
                    <div className="dim" style={{ fontSize: 11 }}>Market Value</div>
                  </div>
                  <div style={{ textAlign: "center", minWidth: 52 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{p.rating}</div>
                    <div className="dim" style={{ fontSize: 11 }}>Rating</div>
                  </div>
                  <span style={pill(p.status)}>{p.status}</span>
                  <Icon name="chevron-right" size={14} style={{ color: "var(--text-3)", flex: "none" }} />
                </div>
              ))}
            </SectionCard>
          </div>
        );
      })}
    </div>
  );
}

window.Screens = window.Screens || {};
Object.assign(window.Screens, { ScoutDashboard, RecruitmentPipeline, PlayerDashboard, Documents, Notifications, ManagedRoster });
