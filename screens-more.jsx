/* ============================================================
   Scout Dashboard · Recruitment Pipeline · Player Dashboard
   Documents · Notifications · Managed Roster
   ============================================================ */
const { useState: useStateM, useRef: useRefM } = React;

// =================== PITCH HEAT MAP ===================
function PitchHeatMap({ zones }) {
  // zones: 18 values (6 rows × 3 cols), 0 (own goal row) → 5 (opp goal row)
  const W = 300, H = 420;
  const zW = W / 3, zH = H / 6;

  function zoneColor(v) {
    if (v < 20)  return "rgba(30,60,180,0.18)";
    if (v < 40)  return "rgba(30,90,220,0.32)";
    if (v < 55)  return "rgba(0,160,200,0.42)";
    if (v < 70)  return "rgba(60,190,120,0.52)";
    if (v < 83)  return "rgba(240,160,20,0.62)";
    return               "rgba(230,55,50,0.75)";
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ borderRadius: 10, overflow: "hidden" }}>
        {/* Pitch background */}
        <rect width={W} height={H} fill="#0a1a0a" rx="8" />
        {/* Heat zones */}
        {(zones || Array(18).fill(20)).map((v, i) => {
          const row = Math.floor(i / 3), col = i % 3;
          return (
            <rect key={i} x={col * zW} y={row * zH} width={zW} height={zH}
              fill={zoneColor(v)} />
          );
        })}
        {/* Pitch markings */}
        <g stroke="#ffffff" strokeWidth="1.2" fill="none" opacity="0.55">
          {/* Outline */}
          <rect x="8" y="8" width={W - 16} height={H - 16} rx="4" />
          {/* Halfway line */}
          <line x1="8" y1={H / 2} x2={W - 8} y2={H / 2} />
          {/* Centre circle */}
          <circle cx={W / 2} cy={H / 2} r="36" />
          <circle cx={W / 2} cy={H / 2} r="2.5" fill="#fff" stroke="none" />
          {/* Top penalty box */}
          <rect x={W * 0.2} y="8" width={W * 0.6} height={H * 0.18} />
          {/* Top 6-yard box */}
          <rect x={W * 0.34} y="8" width={W * 0.32} height={H * 0.07} />
          {/* Top penalty spot */}
          <circle cx={W / 2} cy={H * 0.14} r="2" fill="#fff" stroke="none" opacity="0.7" />
          {/* Bottom penalty box */}
          <rect x={W * 0.2} y={H - H * 0.18 - 8} width={W * 0.6} height={H * 0.18} />
          {/* Bottom 6-yard box */}
          <rect x={W * 0.34} y={H - H * 0.07 - 8} width={W * 0.32} height={H * 0.07} />
          {/* Bottom penalty spot */}
          <circle cx={W / 2} cy={H - H * 0.14} r="2" fill="#fff" stroke="none" opacity="0.7" />
        </g>
        {/* Direction label */}
        <text x={W / 2} y={H - 14} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9"
          fontFamily="var(--font-mono)" letterSpacing="0.1em">ATTACKING</text>
        <text x={W / 2} y="22" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="9"
          fontFamily="var(--font-mono)" letterSpacing="0.1em">DEFENDING</text>
      </svg>
      {/* Legend */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10.5, color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
        <span>Low</span>
        {["rgba(30,60,180,0.5)","rgba(0,160,200,0.6)","rgba(60,190,120,0.7)","rgba(240,160,20,0.75)","rgba(230,55,50,0.85)"].map((c, i) => (
          <div key={i} style={{ width: 22, height: 9, borderRadius: 3, background: c }} />
        ))}
        <span>High</span>
      </div>
    </div>
  );
}

// =================== API STATS SECTION (4 tabs) ===================
function ApiStatsSection({ apiStats: api }) {
  const [tab, setTab] = useStateM("general");

  const TABS = [
    { key: "general",   label: "General",   color: "var(--accent)" },
    { key: "offensive", label: "Offensive", color: "var(--gold)"   },
    { key: "defensive", label: "Defensive", color: "var(--text)"   },
    { key: "overall",   label: "Overall",   color: "var(--green)"  },
  ];

  const genItems = [
    { label: "Appearances",         value: api.general.appearances },
    { label: "Lineups",             value: api.general.lineups },
    { label: "Bench",               value: api.general.bench },
    { label: "Minutes Played",      value: api.general.minutesPlayed },
    { label: "Cumulative Mins",     value: api.general.cumulativeMinutesPlayed },
    { label: "Own Goals",           value: api.general.ownGoals },
    { label: "Crosses Blocked",     value: api.general.crossesBlocked },
    { label: "Hattricks",           value: api.general.hattricks },
  ];
  const offItems = [
    { label: "Goals",               value: api.offensive.goals },
    { label: "Assists",             value: api.offensive.assists },
    { label: "Shots Total",         value: api.offensive.shotsTotal },
    { label: "Shots on Target",     value: api.offensive.shotsOnTarget },
    { label: "Shots off Target",    value: api.offensive.shotsOffTarget },
    { label: "Big Chances Created", value: api.offensive.bigChancesCreated },
    { label: "Big Chances Missed",  value: api.offensive.bigChancesMissed },
    { label: "Duels Won",           value: api.offensive.duelsWon },
    { label: "Total Duels",         value: api.offensive.totalDuels },
    { label: "Pass Acc. %",         value: api.offensive.accuratePassesPercentage + "%" },
    { label: "Dispossessed",        value: api.offensive.dispossessed },
    { label: "Hit Woodwork",        value: api.offensive.hitWoodwork },
    { label: "Offsides",            value: api.offensive.offsides },
  ];
  const defItems = [
    { label: "Tackles",             value: api.defensive.tackles },
    { label: "Interceptions",       value: api.defensive.interceptions },
    { label: "Clearances",          value: api.defensive.clearances },
    { label: "Blocks",              value: api.defensive.blocks },
    { label: "Saves",               value: api.defensive.saves },
    { label: "Saves Inside Box",    value: api.defensive.savesInsideBox },
    { label: "Fouls",               value: api.defensive.fouls },
    { label: "Goals Conceded",      value: api.defensive.goalsConceded },
    { label: "Error Lead to Goal",  value: api.defensive.errorLeadToGoal },
  ];
  const ovItems = [
    { label: "Rating",              value: api.overall.rating.toFixed(1) },
    { label: "Passes",              value: api.overall.passes },
    { label: "Accurate Passes",     value: api.overall.accuratePasses },
    { label: "Successful Passes",   value: api.overall.successfulPasses },
    { label: "Pass Acc. %",         value: api.overall.successfulPassesPercentage + "%" },
    { label: "Key Passes",          value: api.overall.keyPasses },
    { label: "Long Balls",          value: api.overall.longBalls },
    { label: "Long Balls Won",      value: api.overall.longBallsWon },
    { label: "Through Balls",       value: api.overall.throughBalls },
    { label: "Through Balls Won",   value: api.overall.throughBallsWon },
    { label: "Total Crosses",       value: api.overall.totalCrosses },
    { label: "Accurate Crosses",    value: api.overall.accurateCrosses },
    { label: "Aerials Won",         value: api.overall.aerialsWon },
    { label: "Dribbled Past",       value: api.overall.dribbledPast },
    { label: "Fouls Drawn",         value: api.overall.foulsDrawn },
    { label: "Substitutions",       value: api.overall.substitutions },
    { label: "Yellow Cards",        value: api.overall.yellowcards },
    { label: "Yellow-Red Cards",    value: api.overall.yellowredCards },
    { label: "Red Cards",           value: api.overall.redcards },
    { label: "Captain",             value: api.overall.captain },
  ];

  const items = { general: genItems, offensive: offItems, defensive: defItems, overall: ovItems }[tab];
  const color = (TABS.find(t => t.key === tab) || TABS[0]).color;

  return (
    <div className="card" style={{ marginBottom: 18 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px 0", flexWrap: "wrap", gap: 8 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 15 }}>Season Statistics</div>
          <div style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "var(--font-mono)", marginTop: 2 }}>SportsMonks field format · mock data</div>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {TABS.map(t => (
            <button key={t.key} className={"chip-toggle" + (tab === t.key ? " on" : "")}
              onClick={() => setTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, padding: 20 }}>
        {items.map((m, i) => (
          <div key={i} className="card" style={{ padding: "14px 16px", background: "var(--surface-2)", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 8 }}>{m.label}</div>
            <div className="display" style={{ fontSize: 26, color }}>{m.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// =================== SCOUT DASHBOARD ===================
const SCOUT_CATS = [
  { key: "pace",      label: "Pace & Acceleration", icon: "zap",       color: "#1d6f8f" },
  { key: "technical", label: "Technical Skills",    icon: "activity",  color: "#2f7a44" },
  { key: "control",   label: "Ball Control",        icon: "circle",    color: "#7a3b8f" },
  { key: "position",  label: "Positioning",         icon: "target",    color: "#1f3aa6" },
  { key: "workrate",  label: "Work Rate",           icon: "trend",     color: "#b8742a" },
  { key: "physical",  label: "Physical Strength",   icon: "shield",    color: "#4a4f8f" },
  { key: "aerial",    label: "Aerial Ability",      icon: "arrow-up",  color: "#9a3550" },
  { key: "decision",  label: "Decision Making",     icon: "eye",       color: "#2a6f5a" },
];

function StarRating({ value, onChange, readonly }) {
  const [hover, setHover] = useStateM(0);
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {[1,2,3,4,5].map(n => {
        const filled = (hover || value) >= n;
        return (
          <svg key={n} width="22" height="22" viewBox="0 0 24 24"
            style={{ cursor: readonly ? "default" : "pointer", flexShrink: 0 }}
            onClick={() => !readonly && onChange && onChange(n)}
            onMouseEnter={() => !readonly && setHover(n)}
            onMouseLeave={() => !readonly && setHover(0)}>
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"
              fill={filled ? "var(--gold)" : "none"}
              stroke={filled ? "var(--gold)" : "var(--text-3)"}
              strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
        );
      })}
    </div>
  );
}

function priorityBand(score10) {
  if (score10 >= 8) return { label: "Priority",    tone: "green", color: "var(--green)" };
  if (score10 >= 5) return { label: "Moderate",    tone: "gold",  color: "var(--gold)"  };
  return                   { label: "Low Impact",  tone: "red",   color: "var(--red)"   };
}

function ScoutDashboard({ onOpenPlayer }) {
  const targets = window.DD.TARGETS;
  const [sel, setSel] = useStateM(0);
  const [ratings, setRatings] = useStateM(() =>
    Object.fromEntries(SCOUT_CATS.map(c => [c.key, 0]))
  );
  const [submitted, setSubmitted] = useStateM(false);

  const prospects = targets.filter(t => ["identified","review","scouted"].includes(t.stage)).slice(0, 5);
  const evalP = prospects[sel] || prospects[0];

  const setRating = (key, val) => {
    setRatings(r => ({ ...r, [key]: val }));
    setSubmitted(false);
  };

  const totalFilled = Object.values(ratings).filter(v => v > 0).length;
  const avgScore10  = totalFilled > 0
    ? +(Object.values(ratings).reduce((s, v) => s + v * 2, 0) / SCOUT_CATS.length).toFixed(1)
    : 0;
  const band        = priorityBand(avgScore10);

  const handleNewPlayer = (i) => {
    setSel(i);
    setRatings(Object.fromEntries(SCOUT_CATS.map(c => [c.key, 0])));
    setSubmitted(false);
  };

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
        <KPI icon="users"     label="Assigned Players"   value="14" delta="+2 this month"   deltaDir="up"   tone="blue" />
        <KPI icon="eye"       label="Prospect Watchlist" value="9"  delta="3 high priority" deltaDir="up"   tone="gold" />
        <KPI icon="clipboard" label="Reports Due"        value="3"  delta="2 overdue"       deltaDir="down" tone="red"  />
        <KPI icon="zap"       label="New Opportunities"  value="5"  delta="this week"       deltaDir="up"   tone="green" />
      </div>

      <div className="dash-grid">
        {/* ---- Scouting Report with star ratings ---- */}
        <SectionCard title="Scouting Report"
          sub={"Rating · " + (evalP ? evalP.name : "—")}
          action={
            totalFilled > 0 && (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: band.color, fontWeight: 700 }}>
                  {avgScore10}/10
                </span>
                <Badge tone={band.tone} dot>{band.label}</Badge>
              </div>
            )
          }>
          {evalP && (
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18, paddingBottom: 16, borderBottom: "1px solid var(--line)" }}>
              <Avatar name={evalP.name} color="#1f3aa6" size={48} />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{evalP.name} <PosTag pos={evalP.pos} /></div>
                <div className="dim" style={{ fontSize: 12 }}>{evalP.club} · {evalP.age} yrs · {evalP.mv}</div>
              </div>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 18 }}>
            {SCOUT_CATS.map(cat => {
              const stars = ratings[cat.key];
              const score10 = stars * 2;
              return (
                <div key={cat.key} className="card"
                  style={{ padding: "14px 14px 12px", background: "var(--surface-2)", borderRadius: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, display: "grid", placeItems: "center",
                      background: `color-mix(in srgb,${cat.color} 20%,transparent)`, color: cat.color, flexShrink: 0 }}>
                      <Icon name={cat.icon} size={16} />
                    </div>
                    <div style={{ fontWeight: 600, fontSize: 12.5, lineHeight: 1.3 }}>{cat.label}</div>
                  </div>
                  <StarRating value={stars} onChange={v => setRating(cat.key, v)} />
                  {stars > 0 && (
                    <div style={{ marginTop: 7, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
                        Score: <b style={{ color: priorityBand(score10).color }}>{score10}/10</b>
                      </span>
                      <span style={{ fontSize: 10, color: priorityBand(score10).color, fontWeight: 600 }}>
                        {priorityBand(score10).label}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Score conversion key */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {[["1–4","Low Impact","var(--red)"],["5–7","Moderate","var(--gold)"],["8–10","Priority","var(--green)"]].map(([range, lbl, col]) => (
              <div key={range} style={{ flex: 1, padding: "8px 10px", borderRadius: 9, background: "var(--surface-2)", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, fontWeight: 700, color: col }}>{range}</div>
                <div style={{ fontSize: 10.5, color: "var(--text-3)", marginTop: 2 }}>{lbl}</div>
              </div>
            ))}
          </div>

          {totalFilled > 0 && (
            <div style={{ display: "flex", gap: 16, alignItems: "center", padding: "16px 18px", borderRadius: 12,
              background: `color-mix(in srgb,${band.color} 10%,transparent)`, border: `1px solid color-mix(in srgb,${band.color} 25%,transparent)` }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: "var(--text-3)", fontFamily: "var(--font-mono)", marginBottom: 4 }}>
                  OVERALL SCORE ({totalFilled}/{SCOUT_CATS.length} categories)
                </div>
                <div className="display" style={{ fontSize: 32, color: band.color }}>{avgScore10}<span style={{ fontSize: 14, color: "var(--text-3)" }}>/10</span></div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: 700, fontSize: 18, color: band.color }}>{band.label}</div>
                <button className="btn btn-sm" style={{ marginTop: 8, background: band.color, color: "#fff", border: "none" }}
                  onClick={() => setSubmitted(true)}>
                  <Icon name="clipboard" size={13} />Submit Report
                </button>
              </div>
            </div>
          )}
          {submitted && (
            <div style={{ marginTop: 10, padding: "10px 14px", borderRadius: 9, background: "color-mix(in srgb,var(--green) 12%,transparent)",
              color: "var(--green)", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 8 }}>
              <Icon name="check" size={15} />Report submitted successfully
            </div>
          )}
        </SectionCard>

        {/* ---- Prospect list ---- */}
        <SectionCard title="Prospect Comparison" sub="Select to evaluate"
          action={<button className="btn btn-ghost btn-sm">Compare</button>}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 18 }}>
            {prospects.map((t, i) => (
              <div key={i} className="stat-line"
                style={{ cursor: "pointer", background: sel === i ? "var(--surface-2)" : "", borderRadius: 10, padding: "10px 8px", border: "none" }}
                onClick={() => handleNewPlayer(i)}>
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
          <div className="eyebrow" style={{ marginBottom: 12 }}>Platform Score · {evalP ? evalP.name : "—"}</div>
          <div style={{ display: "grid", placeItems: "center", padding: "10px 0" }}>
            <Gauge value={evalP ? evalP.scout : 0} color="var(--accent)" label="Scout Score" />
          </div>
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
function PlayerDashboard({ player, role }) {
  const p = player;
  const months = ["Jul","Sep","Nov","Jan","Mar","May"];
  const canEdit = role === "admin" || role === "scout";

  // Editable development goals
  const [goals, setGoals] = useStateM(() =>
    (p.devGoals || [
      { title: "Weak-foot finishing",        progress: 70, tone: "green" },
      { title: "Match fitness — full 90s",   progress: 55, tone: "" },
      { title: "Brand & media presence",     progress: 40, tone: "gold" },
    ]).map(g => ({ ...g }))
  );
  const [editing, setEditing] = useStateM(false);
  const [editGoals, setEditGoals] = useStateM(null);

  const startEdit = () => {
    setEditGoals(goals.map(g => ({ ...g })));
    setEditing(true);
  };
  const saveEdit = () => {
    setGoals(editGoals);
    setEditing(false);
  };
  const cancelEdit = () => setEditing(false);

  const ext = p.apiStats;

  return (
    <div className="fade-in">
      {/* ---- Hero banner ---- */}
      <div className="card" style={{ overflow: "hidden", marginBottom: 18 }}>
        <div style={{ background: "linear-gradient(120deg,#061242,#031d72 60%,#0a2a8c)", padding: "32px 30px", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, opacity: .3 }}><PitchLines /></div>
          <div style={{ position: "relative", display: "flex", alignItems: "center", gap: 22, flexWrap: "wrap" }}>
            <Avatar name={p.name} color={p.avColor} size={92} ring fontScale={0.34} />
            <div style={{ color: "#fff", flex: 1, minWidth: 220 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".16em", color: "var(--gold-soft)", textTransform: "uppercase" }}>Welcome back</div>
              <h1 className="display" style={{ fontSize: 36, color: "#fff", margin: "4px 0" }}>{p.name}</h1>
              <div style={{ color: "#c4d0f0", fontSize: 13.5 }}>{p.posFull} · {p.club} · Managed by {p.agent !== "—" ? p.agent : "DD Sports"}</div>
            </div>
            <div style={{ textAlign: "right", color: "#fff" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".14em", color: "#9fb0e8", textTransform: "uppercase" }}>Your Market Value</div>
              <div className="display" style={{ fontSize: 36, color: "var(--gold-soft)" }}>{p.mv}</div>
              <Badge tone="green" dot>+12% this season</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* ---- Season KPIs ---- */}
      <div className="grid cols-4" style={{ marginBottom: 18 }}>
        <KPI icon="activity" label="Matches Played" value={p.apps}               tone="blue" />
        <KPI icon="target"   label="Goals"          value={p.goals}              tone="gold" />
        <KPI icon="zap"      label="Assists"         value={p.assists}            tone="green" />
        <KPI icon="award"    label="Avg Rating"      value={p.rating.toFixed(1)} tone="navy" />
      </div>

      {/* ---- Extended stats (3-tab) ---- */}
      {ext && <ApiStatsSection apiStats={ext} />}

      {/* ---- Performance graph + Heat map ---- */}
      <div className="dash-grid" style={{ marginBottom: 18 }}>
        <SectionCard title="Season Performance" sub="Match ratings throughout the season"
          action={<Badge tone="green" dot>In form</Badge>}>
          <LineChart height={230} color="var(--green)" labels={months} data={p.perf.filter((_, i) => i % 2 === 0)} showDots />
          <div className="legend" style={{ marginTop: 10 }}>
            <div className="li"><span className="sw" style={{ background: "var(--green)" }}></span>Match Rating</div>
          </div>
        </SectionCard>

        <SectionCard title="Position Heat Map" sub="Activity zones across the season">
          <div style={{ display: "flex", justifyContent: "center", paddingTop: 4 }}>
            <PitchHeatMap zones={p.heatZones} />
          </div>
        </SectionCard>
      </div>

      {/* ---- Development Goals + Upcoming Objectives ---- */}
      <div className="dash-grid" style={{ marginBottom: 18 }}>
        <SectionCard title="Development Goals" sub="Set by your agent and coaching staff"
          action={
            canEdit ? (
              editing
                ? <div style={{ display: "flex", gap: 6 }}>
                    <button className="btn btn-sm btn-primary" onClick={saveEdit}>Save</button>
                    <button className="btn btn-sm btn-ghost" onClick={cancelEdit}>Cancel</button>
                  </div>
                : <button className="btn btn-ghost btn-sm" onClick={startEdit}><Icon name="edit" size={13} />Edit</button>
            ) : null
          }>
          {(editing ? editGoals : goals).map((goal, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              {editing ? (
                <div style={{ marginBottom: 8 }}>
                  <input
                    value={editGoals[i].title}
                    onChange={e => {
                      const g = editGoals.map((x, j) => j === i ? { ...x, title: e.target.value } : x);
                      setEditGoals(g);
                    }}
                    style={{ width: "100%", background: "var(--surface-2)", border: "1px solid var(--line-strong)",
                      borderRadius: 8, padding: "6px 10px", color: "var(--text)", fontSize: 13, marginBottom: 6 }}
                  />
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <input type="range" min="0" max="100"
                      value={editGoals[i].progress}
                      onChange={e => {
                        const g = editGoals.map((x, j) => j === i ? { ...x, progress: +e.target.value } : x);
                        setEditGoals(g);
                      }}
                      style={{ flex: 1, accentColor: "var(--accent)" }}
                    />
                    <span className="mono" style={{ fontSize: 13, width: 38, textAlign: "right", fontWeight: 700 }}>
                      {editGoals[i].progress}%
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                    <span>{goal.title}</span><b className="mono">{goal.progress}%</b>
                  </div>
                  <Meter value={goal.progress} tone={goal.tone} />
                </>
              )}
            </div>
          ))}
          {canEdit && !editing && (
            <div style={{ marginTop: 4, fontSize: 11.5, color: "var(--text-3)", fontFamily: "var(--font-mono)" }}>
              Scouts and owners can update these goals at any time.
            </div>
          )}
        </SectionCard>

        <SectionCard title="Upcoming Objectives" action={<Icon name="calendar" size={18} style={{ color: "var(--text-3)" }} />}>
          {[
            ["Pre-season medical assessment",    "Jun 12", "blue"],
            ["Contract review with David Duarte","Jun 18", "gold"],
            ["Brand photoshoot — kit partner",   "Jun 24", "green"],
            ["Performance analysis session",     "Jul 02", "blue"],
          ].map((o, i) => (
            <div key={i} className="stat-line">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, display: "grid", placeItems: "center",
                  background: "color-mix(in srgb,var(--accent) 13%,transparent)", color: "var(--accent)" }}>
                  <Icon name="calendar" size={16} />
                </div>
                <span style={{ fontWeight: 600, fontSize: 13.5 }}>{o[0]}</span>
              </div>
              <Badge tone={o[2]}>{o[1]}</Badge>
            </div>
          ))}
        </SectionCard>
      </div>

      {/* ---- Agency Updates ---- */}
      <SectionCard title="Agency Updates" sub="From your management team">
        <Feed items={[
          { who: "David Duarte", text: "shared positive feedback on your last performance. Keep it up! 💪", time: "2h ago",    icon: "message", type: "perf"     },
          { who: "Sofía Marín",  text: "uploaded your updated <b>registration documents</b>",               time: "Yesterday", icon: "file",    type: "contract" },
          { who: "Agency",       text: "Your market value increased to <b>" + p.mv + "</b>",                time: "3 days ago",icon: "trend",   type: "perf"     },
        ]} />
      </SectionCard>
    </div>
  );
}

// =================== DOCUMENTS ===================
function Documents() {
  const [cat, setCat] = useStateM("All");
  const cats = ["All","Contracts","Medical","Passports","Registrations","Scouting Reports"];
  const docs = window.DD.DOCS.filter(d => cat === "All" || d.cat === cat);
  const catIcon = { Contracts:"file", Medical:"heart", Passports:"globe", Registrations:"shield", "Scouting Reports":"clipboard" };
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
          const cols = ["#9a3550","#2f7a44","#1d6f8f","#b8742a","#1f3aa6"];
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
  const cats = ["All","Contract","Scouting","Performance","Transfer"];
  const list = window.DD.NOTIFS.filter(n => filter === "All" || n.cat === filter);
  const icon = { Contract:"file", Scouting:"clipboard", Performance:"trend", Transfer:"zap" };
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
            <div className="fi-ic" style={{ width: 40, height: 40, borderRadius: 11, flex: "none",
              background: `color-mix(in srgb,var(--${n.kind === "gold" ? "gold" : n.kind === "red" ? "red" : n.kind === "green" ? "green" : "accent"}) 15%,transparent)`,
              color: `var(--${n.kind === "gold" ? "gold" : n.kind === "red" ? "red" : n.kind === "green" ? "green" : "accent"})`,
              display: "grid", placeItems: "center" }}>
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
  const agentName = managed[0]?.agent || "Donte Dorlly";
  const totalMV = managed.reduce((s, p) => s + p.mvNum, 0).toFixed(1);

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
          <h1>Players</h1>
        </div>
      </div>

      <SectionCard title={agentName} sub={managed.length + " clients · €" + totalMV + "M portfolio"}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <tbody>
            {managed.map((p, i) => (
              <tr key={p.id} onClick={() => onOpenPlayer(p.id)}
                style={{ cursor: "pointer", borderBottom: i < managed.length - 1 ? "1px solid var(--line)" : "none" }}
                onMouseEnter={e => e.currentTarget.style.background = "var(--surface-2)"}
                onMouseLeave={e => e.currentTarget.style.background = ""}>
                <td style={{ padding: "11px 8px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar name={p.name} color={p.avColor} size={40} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{p.flag} {p.name} <PosTag pos={p.pos} /></div>
                      <div className="dim" style={{ fontSize: 12, marginTop: 2 }}>{p.posFull} · {p.club}{p.league ? " · " + p.league : ""}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "11px 8px", textAlign: "right", minWidth: 80 }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{p.mv !== "—" ? p.mv : "Free Agent"}</div>
                  <div className="dim" style={{ fontSize: 11 }}>MV</div>
                </td>
                <td style={{ padding: "11px 8px", textAlign: "center", minWidth: 48 }}>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{p.rating}</div>
                  <div className="dim" style={{ fontSize: 11 }}>Rating</div>
                </td>
                <td style={{ padding: "11px 8px" }}>
                  <span style={pill(p.status)}>{p.status}</span>
                </td>
                <td style={{ padding: "11px 8px", color: "var(--text-3)" }}>
                  <Icon name="chevron-right" size={14} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SectionCard>
    </div>
  );
}

window.Screens = window.Screens || {};
Object.assign(window.Screens, { ScoutDashboard, RecruitmentPipeline, PlayerDashboard, Documents, Notifications, ManagedRoster });
