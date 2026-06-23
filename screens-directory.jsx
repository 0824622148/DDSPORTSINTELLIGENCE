/* ============================================================
   Player Directory + Player Profile
   ============================================================ */
const { useState: useStateD, useMemo: useMemoD } = React;

// ---- position metric items helper ----
function posMetricItems(p) {
  const s = p.positionStats || {};
  if (p.pos === "FW") return [
    { label: "xG",          value: s.xG,                       color: "var(--gold)",   unit: "expected goals" },
    { label: "Shots",       value: s.shots,                    color: "var(--text)",   unit: "total shots" },
    { label: "On Target",   value: s.shotsOnTarget,            color: "var(--accent)", unit: "on target" },
    { label: "Conv. Rate",  value: (s.conversionRate || 0) + "%", color: "var(--green)", unit: "conversion" },
    { label: "Dribbles",    value: s.dribbles,                 color: "var(--text)",   unit: "completed" },
  ];
  if (p.pos === "MF") return [
    { label: "Key Passes",  value: s.keyPasses,                color: "var(--gold)",   unit: "season total" },
    { label: "Pass Acc.",   value: (s.passAcc || 0) + "%",     color: "var(--green)",  unit: "accuracy" },
    { label: "Chances",     value: s.chancesCreated,           color: "var(--accent)", unit: "created" },
    { label: "Prog. Passes",value: s.progressivePasses,        color: "var(--text)",   unit: "progressive" },
    { label: "Pressing",    value: s.pressingSucc,             color: "var(--text)",   unit: "successful" },
  ];
  if (p.pos === "DF") return [
    { label: "Tackles",      value: s.tackles,                 color: "var(--accent)", unit: "won" },
    { label: "Clearances",   value: s.clearances,              color: "var(--text)",   unit: "total" },
    { label: "Interceptions",value: s.interceptions,           color: "var(--gold)",   unit: "total" },
    { label: "Aerial Won",   value: s.aerialWon,               color: "var(--green)",  unit: "aerial duels" },
    { label: "Block Shots",  value: s.blockShots,              color: "var(--text)",   unit: "blocked" },
  ];
  if (p.pos === "GK") return [
    { label: "Saves",        value: s.saves,                   color: "var(--accent)", unit: "total" },
    { label: "Save %",       value: (s.savePerc || 0) + "%",   color: "var(--green)",  unit: "accuracy" },
    { label: "Clean Sheets", value: s.cleanSheets,             color: "var(--gold)",   unit: "this season" },
    { label: "Conceded",     value: s.goalsConceded,           color: "var(--red)",    unit: "goals against" },
    { label: "Sweep",        value: s.sweepActions,            color: "var(--text)",   unit: "actions" },
  ];
  return [];
}

// =================== API STATS SECTION (4 tabs) ===================
function ApiStatsSection({ apiStats: api }) {
  const [tab, setTab] = useStateD("general");

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

// =================== PLAYER DIRECTORY ===================
function PlayerDirectory({ onOpenPlayer }) {
  const P = window.DD.PLAYERS;
  const LEAGUES = window.DD.LEAGUES;
  const [q, setQ] = useStateD("");
  const [pos, setPos] = useStateD("all");
  const [status, setStatus] = useStateD("all");
  const [nation, setNation] = useStateD("all");
  const [leagueId, setLeagueId] = useStateD("all");
  const [sort, setSort] = useStateD({ k: "mvNum", dir: -1 });
  const [view, setView] = useStateD("table");

  const nations = [...new Set(P.map(p => p.nation))].sort();
  const rows = useMemoD(() => {
    let r = P.filter(p =>
      (q === "" || (p.name + p.club + (p.league || "")).toLowerCase().includes(q.toLowerCase())) &&
      (pos === "all" || p.pos === pos) &&
      (status === "all" || p.status === status) &&
      (nation === "all" || p.nation === nation) &&
      (leagueId === "all" || p.leagueId === leagueId)
    );
    r = [...r].sort((a, b) => {
      const av = a[sort.k], bv = b[sort.k];
      return (typeof av === "string" ? av.localeCompare(bv) : av - bv) * sort.dir;
    });
    return r;
  }, [q, pos, status, nation, leagueId, sort]);

  const Th = ({ k, children, num }) => (
    <th onClick={() => setSort(s => ({ k, dir: s.k === k ? -s.dir : (num ? -1 : 1) }))} style={{ cursor: "pointer", textAlign: num ? "right" : "left" }}>
      <span className="th-sort">{children}<Icon name="chevron-down" size={11} style={{ transform: sort.k === k && sort.dir === 1 ? "rotate(180deg)" : "none", opacity: sort.k === k ? 1 : .35 }} /></span>
    </th>
  );

  return (
    <div className="fade-in">
      <div className="page-head">
        <div>
          <div className="eyebrow">Intelligence Database · {P.length} Players</div>
          <h1>Player Directory</h1>
          <div className="sub">Search and filter {P.length} players across {LEAGUES.length} leagues.</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-ghost"><Icon name="download" size={16} />Export CSV</button>
          <button className="btn btn-primary"><Icon name="plus" size={16} />Add to Watchlist</button>
        </div>
      </div>

      <div className="filterbar">
        <div className="searchbar" style={{ maxWidth: 260, flex: "none", width: 260 }}>
          <Icon name="search" />
          <input placeholder="Search name, club, league…" value={q} onChange={e => setQ(e.target.value)} />
        </div>
        <select className="select" value={pos} onChange={e => setPos(e.target.value)}>
          <option value="all">All positions</option>
          <option value="GK">Goalkeeper</option>
          <option value="DF">Defender</option>
          <option value="MF">Midfielder</option>
          <option value="FW">Forward</option>
        </select>
        <select className="select" value={leagueId} onChange={e => setLeagueId(e.target.value)} style={{ minWidth: 180 }}>
          <option value="all">All leagues</option>
          <optgroup label="── Professional ──">
            {LEAGUES.filter(l => l.tier === "professional").map(l =>
              <option key={l.id} value={l.id}>{l.name}</option>
            )}
          </optgroup>
          <optgroup label="── Development ──">
            {LEAGUES.filter(l => l.tier === "development").map(l =>
              <option key={l.id} value={l.id}>{l.name}</option>
            )}
          </optgroup>
        </select>
        <select className="select" value={nation} onChange={e => setNation(e.target.value)}>
          <option value="all">All nationalities</option>
          {nations.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <select className="select" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="all">Any status</option>
          <option>Active</option>
          <option>Prospect</option>
          <option value="Contract Risk">Contract Risk</option>
        </select>
        <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
          <button className={"chip-toggle" + (view === "table" ? " on" : "")} onClick={() => setView("table")}>Table</button>
          <button className={"chip-toggle" + (view === "grid" ? " on" : "")} onClick={() => setView("grid")}>Cards</button>
        </div>
      </div>

      {view === "table" ? (
        <div className="tbl-wrap">
          <table className="tbl">
            <thead>
              <tr>
                <Th k="name">Player</Th>
                <Th k="pos">Pos</Th>
                <Th k="age" num>Age</Th>
                <th>Nation</th>
                <Th k="mvNum" num>Market Value</Th>
                <Th k="rating" num>Rating</Th>
                <Th k="leagueId">League</Th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(p => (
                <tr key={p.id} onClick={() => onOpenPlayer(p.id)}>
                  <td>
                    <div className="player-cell">
                      <Avatar name={p.name} color={p.avColor} size={38} />
                      <div>
                        <b>{p.name}</b>
                        <small>{p.posFull} · <span className="dim">{p.club}</span></small>
                      </div>
                    </div>
                  </td>
                  <td><PosTag pos={p.pos} /></td>
                  <td className="num" style={{ textAlign: "right" }}>{p.age}</td>
                  <td><span style={{ marginRight: 7 }}>{p.flag}</span>{p.nation}</td>
                  <td className="num" style={{ textAlign: "right", fontWeight: 600 }}>{p.mv}</td>
                  <td className="num" style={{ textAlign: "right" }}><RatingPill value={p.rating} /></td>
                  <td className="muted" style={{ fontSize: 12 }}>{p.league || "—"}</td>
                  <td><StatusBadge status={p.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && <div className="empty">No players match your filters.</div>}
        </div>
      ) : (
        <div className="grid cols-4">
          {rows.map(p => (
            <div key={p.id} className="kpi" style={{ cursor: "pointer" }} onClick={() => onOpenPlayer(p.id)}>
              <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
                <Avatar name={p.name} color={p.avColor} size={50} ring={p.tier === "elite"} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{p.name}</div>
                  <div className="dim" style={{ fontSize: 12 }}>{p.flag} {p.club}</div>
                  <div className="dim" style={{ fontSize: 11, color: "var(--text-3)", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.league}</div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14 }}>
                <PosTag pos={p.pos} />
                <div className="mono" style={{ fontWeight: 700, fontSize: 15 }}>{p.mv}</div>
              </div>
              <div className="divider" style={{ margin: "12px 0" }}></div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <StatusBadge status={p.status} />
                <RatingPill value={p.rating} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// =================== PLAYER PROFILE ===================
function PlayerProfile({ player, onBack }) {
  const p = player;
  const [tab, setTab] = useStateD("overview");
  const months = ["Jul", "Sep", "Nov", "Jan", "Mar", "May"];
  const tabs = [
    ["overview", "Overview"],
    ["performance", "Performance"],
    ["analytics", "Analytics"],
    ["career", "Career"],
    ["agency", "Agency"],
    ["documents", "Documents"],
  ];
  const docs = window.DD.DOCS.filter(d => d.owner === p.name);

  // ---- Match history derived data ----
  const mh = p.matchHistory || [];
  const mhRatings = mh.map(m => m.rating);
  const mhMinutes = mh.map(m => m.minutes);
  const mhMatchNums = mh.map((_, i) => String(i + 1));
  const MH_MONTHS = ["Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May"];
  const gaMonths = MH_MONTHS.filter(mo => mh.some(m => m.date && m.date.startsWith(mo)));
  const gaGoals   = gaMonths.map(mo => mh.filter(m => m.date && m.date.startsWith(mo)).reduce((s, m) => s + (m.goals || 0), 0));
  const gaAssists = gaMonths.map(mo => mh.filter(m => m.date && m.date.startsWith(mo)).reduce((s, m) => s + (m.assists || 0), 0));
  const last8ratings = mh.slice(-8).map(m => Math.round(m.rating * 10) / 10);

  // ---- Analytics tab component ----
  const AnalyticsDashboard = window.SA && window.SA.AnalyticsDashboard;

  const StatBox = ({ label, value, sub, tone }) => (
    <div className="card card-pad" style={{ padding: 18 }}>
      <div className="lbl" style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 8 }}>{label}</div>
      <div className="display" style={{ fontSize: 30, color: tone }}>{value}</div>
      {sub && <div className="dim" style={{ fontSize: 12, marginTop: 4 }}>{sub}</div>}
    </div>
  );

  return (
    <div className="fade-in">
      <button className="btn btn-ghost btn-sm" style={{ marginBottom: 18 }} onClick={onBack}>
        <Icon name="chevron-left" size={15} />Back to directory
      </button>

      {/* Header */}
      <div className="card" style={{ overflow: "hidden", marginBottom: 18 }}>
        <div style={{ background: "linear-gradient(120deg,#061242,#031d72 60%,#0a2a8c)", padding: "30px 30px 26px", position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, opacity: .35, pointerEvents: "none" }}>
            <PitchLines />
          </div>
          <div style={{ display: "flex", gap: 24, alignItems: "center", position: "relative", flexWrap: "wrap" }}>
            <Avatar name={p.name} color={p.avColor} size={104} ring={p.tier === "elite"} fontScale={0.34} />
            <div style={{ flex: 1, minWidth: 240, color: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                <PosTag pos={p.pos} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: ".12em", color: "#9fb0e8", textTransform: "uppercase" }}>{p.posFull}</span>
                {p.tier === "elite" && <Badge tone="gold" dot>Elite Tier</Badge>}
              </div>
              <h1 className="display" style={{ fontSize: 38, color: "#fff", lineHeight: 1 }}>{p.name}</h1>
              <div style={{ display: "flex", gap: 20, marginTop: 14, color: "#c4d0f0", fontSize: 13.5, flexWrap: "wrap" }}>
                <span>{p.flag} {p.nation}</span>
                <span>· {p.club}</span>
                <span>· {p.age} yrs</span>
                <span>· {p.height}</span>
                <span>· {p.foot} foot</span>
              </div>
              {p.league && (
                <div style={{ marginTop: 10 }}>
                  <span style={{ fontSize: 12, color: "#9fb0e8", background: "rgba(255,255,255,.1)", padding: "3px 10px", borderRadius: 20, fontFamily: "var(--font-mono)" }}>
                    {p.league}
                  </span>
                </div>
              )}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".14em", color: "#9fb0e8", textTransform: "uppercase" }}>Market Value</div>
                <div className="display" style={{ fontSize: 34, color: "var(--gold-soft)" }}>{p.mv}</div>
              </div>
              <div style={{ display: "flex", gap: 9 }}>
                <button className="btn btn-gold btn-sm"><Icon name="eye" size={15} />Watchlist</button>
                <button className="btn btn-sm" style={{ background: "rgba(255,255,255,.12)", color: "#fff" }}><Icon name="message" size={15} />Notes</button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, padding: "14px 30px", borderTop: "1px solid var(--line)" }}>
          {[["Status", null], ["Assigned Agent", p.agent !== "—" ? p.agent : "Unmanaged"], ["League", p.league || "—"], ["Season Rating", null]].map((x, i) => (
            <div key={i}>
              <div className="dim" style={{ fontSize: 11, fontFamily: "var(--font-mono)", letterSpacing: ".08em", textTransform: "uppercase" }}>{x[0]}</div>
              <div style={{ marginTop: 5, fontWeight: 600 }}>
                {i === 0 ? <StatusBadge status={p.status} /> : i === 3 ? <RatingPill value={p.rating} /> : x[1]}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="tabs">
        {tabs.map(([k, l]) => <button key={k} className={"tab" + (tab === k ? " on" : "")} onClick={() => setTab(k)}>{l}</button>)}
      </div>

      {/* ---- OVERVIEW TAB ---- */}
      {tab === "overview" && (
        <>
          <div className="grid" style={{ gridTemplateColumns: "repeat(6,1fr)", marginBottom: 18 }}>
            <StatBox label="Apps"       value={p.apps} />
            <StatBox label="Goals"      value={p.goals}   tone="var(--gold)" />
            <StatBox label="Assists"    value={p.assists}  tone="var(--accent)" />
            <StatBox label="Pass %"     value={p.passAcc}  sub="accuracy" />
            <StatBox label="Minutes"    value={p.mins} />
            <StatBox label="Avg Rating" value={p.rating.toFixed(1)} tone="var(--green)" />
          </div>
          <div className="dash-grid" style={{ marginBottom: 18 }}>
            <SectionCard title="Performance Trend" sub="Match rating across the season"
              action={<Badge tone="green" dot>In form</Badge>}>
              <LineChart height={230} color="var(--green)" labels={months} data={p.perf.filter((_, i) => i % 2 === 0)} showDots />
            </SectionCard>
            <SectionCard title="Match Ratings" sub="Last 8 matches">
              <BarChart height={230} labels={["1","2","3","4","5","6","7","8"]} valueOnTop
                data={p.ratings.map(r => Math.round(r * 10) / 10)}
                color={(v) => v >= 7.5 ? "var(--green)" : v >= 7 ? "var(--accent)" : "var(--amber)"} />
            </SectionCard>
          </div>
          <div className="dash-grid">
            <SectionCard title="Market Value Trend" sub="12-month valuation" action={<Badge tone="gold" dot>{p.mv}</Badge>}>
              <LineChart height={210} color="var(--gold)" labels={["Jul","Oct","Jan","Apr"]} data={p.mvTrend.filter((_, i) => i % 3 === 0)} />
            </SectionCard>
            <SectionCard title="Goal Contributions" sub="Goals + assists split">
              <Donut size={150} centerLabel={p.goals + p.assists} centerSub="G+A" segments={[
                { label: "Goals",   value: p.goals,   color: "var(--gold)" },
                { label: "Assists", value: p.assists, color: "var(--accent)" },
              ]} />
            </SectionCard>
          </div>
        </>
      )}

      {/* ---- PERFORMANCE TAB ---- */}
      {tab === "performance" && (
        <>
          {/* Season KPIs */}
          <div className="grid" style={{ gridTemplateColumns: "repeat(5,1fr)", marginBottom: 18 }}>
            {[
              { icon:"activity", label:"Appearances", value:p.apps,            tone:"blue" },
              { icon:"target",   label:"Goals",       value:p.goals,           tone:"gold" },
              { icon:"zap",      label:"Assists",     value:p.assists,         tone:"green" },
              { icon:"award",    label:"Avg Rating",  value:p.rating.toFixed(1),tone:"navy" },
              { icon:"clock",    label:"Minutes",     value:p.mins,            tone:"blue" },
            ].map((kpi, i) => (
              <KPI key={i} icon={kpi.icon} label={kpi.label} value={kpi.value} tone={kpi.tone} />
            ))}
          </div>

          {/* Match rating trend + playing time */}
          <div className="dash-grid" style={{ marginBottom: 18 }}>
            <SectionCard title="Match Rating Trend" sub="Last 20 matches"
              action={<Badge tone="green" dot>Season view</Badge>}>
              <LineChart height={220} color="var(--green)"
                data={mhRatings}
                labels={["Aug","Oct","Dec","Feb","Apr"]}
                showDots />
            </SectionCard>
            <SectionCard title="Playing Time" sub="Minutes per appearance">
              <BarChart height={220}
                data={mhMinutes}
                labels={["Aug","","Oct","","Dec","","Feb","","Apr",""]}
                color="var(--accent)" />
            </SectionCard>
          </div>

          {/* Position stats */}
          <SectionCard title="Position Metrics" sub={"Key statistics for " + p.posFull} style={{ marginBottom: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14 }}>
              {posMetricItems(p).map((m, i) => (
                <div key={i} className="card" style={{ padding: "16px 14px", textAlign: "center", background: "var(--surface-2)" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 10 }}>{m.label}</div>
                  <div className="display" style={{ fontSize: 28, color: m.color }}>{m.value}</div>
                  <div className="dim" style={{ fontSize: 11, marginTop: 6 }}>{m.unit}</div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Extended stats — Defending / Possession / Attacking */}
          {p.apiStats && <ApiStatsSection apiStats={p.apiStats} />}

          {/* G+A by month + last 8 match ratings */}
          <div className="dash-grid">
            <SectionCard title="Goal Contributions by Month" sub="Goals & assists accumulated">
              {gaMonths.length > 0 ? (
                <>
                  <MultiLineChart height={200} labels={gaMonths} seriesList={[
                    { color: "var(--gold)",   data: gaGoals },
                    { color: "var(--accent)", dashed: true, data: gaAssists },
                  ]} />
                  <div className="legend" style={{ marginTop: 10 }}>
                    <div className="li"><span className="sw" style={{ background: "var(--gold)" }}></span>Goals</div>
                    <div className="li"><span className="sw" style={{ background: "var(--accent)" }}></span>Assists</div>
                  </div>
                </>
              ) : <div className="empty">No match data available.</div>}
            </SectionCard>
            <SectionCard title="Recent Match Ratings" sub="Last 8 appearances">
              <BarChart height={200}
                labels={["1","2","3","4","5","6","7","8"]} valueOnTop
                data={last8ratings.length >= 8 ? last8ratings : p.ratings.map(r => Math.round(r * 10) / 10)}
                color={(v) => v >= 7.5 ? "var(--green)" : v >= 7 ? "var(--accent)" : "var(--amber)"} />
            </SectionCard>
          </div>
        </>
      )}

      {/* ---- ANALYTICS TAB (Benchmarking) ---- */}
      {tab === "analytics" && (
        AnalyticsDashboard
          ? <AnalyticsDashboard player={p} />
          : (
            <div style={{ padding: "40px 0", textAlign: "center", color: "var(--text-3)" }}>
              <Icon name="pie" size={32} style={{ marginBottom: 12, opacity: .4 }} />
              <div style={{ fontWeight: 600 }}>Analytics module loading…</div>
              <div className="dim" style={{ fontSize: 13, marginTop: 6 }}>Ensure screens-analytics.jsx is included.</div>
            </div>
          )
      )}

      {/* ---- CAREER TAB ---- */}
      {tab === "career" && (
        <div className="dash-grid">
          <SectionCard title="Career History" sub="Clubs & transfers">
            <div style={{ position: "relative", paddingLeft: 26 }}>
              <div style={{ position: "absolute", left: 7, top: 6, bottom: 6, width: 2, background: "var(--line)" }}></div>
              {[
                { club: p.club, years: "2023 — Present", fee: "Current club", cur: true },
                { club: "Juvenil Académica",  years: "2021 — 2023", fee: "€6.5M transfer" },
                { club: "Club Formativo",     years: "2019 — 2021", fee: "Youth academy" },
              ].map((c, i) => (
                <div key={i} style={{ position: "relative", paddingBottom: 22 }}>
                  <div style={{ position: "absolute", left: -26, top: 2, width: 16, height: 16, borderRadius: "50%", background: c.cur ? "var(--gold)" : "var(--surface)", border: "2px solid " + (c.cur ? "var(--gold)" : "var(--line-strong)") }}></div>
                  <div style={{ fontWeight: 600 }}>{c.club}</div>
                  <div className="dim mono" style={{ fontSize: 12, margin: "2px 0 4px" }}>{c.years}</div>
                  <Badge tone={c.cur ? "gold" : "gray"}>{c.fee}</Badge>
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard title="Achievements" sub="Honours & milestones">
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[["trophy","League Top Scorer","2024 season"],["award","Young Player of the Year","2023"],["star","Team of the Season","2024"],["flag","U-21 International Caps","12 caps"]].map((a, i) => (
                <div key={i} className="stat-line">
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, display: "grid", placeItems: "center", background: "color-mix(in srgb,var(--gold) 14%,transparent)", color: "var(--gold)" }}><Icon name={a[0]} size={16} /></div>
                    <div style={{ fontWeight: 600 }}>{a[1]}</div>
                  </div>
                  <span className="dim mono" style={{ fontSize: 12 }}>{a[2]}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {/* ---- AGENCY TAB ---- */}
      {tab === "agency" && (
        <div className="dash-grid">
          <div className="grid" style={{ gap: 18 }}>
            <SectionCard title="Contract Information">
              <div className="stat-line"><span className="k">Assigned Agent</span><span className="v">{p.agent !== "—" ? p.agent : "Unmanaged"}</span></div>
              <div className="stat-line"><span className="k">Contract Expiry</span><span className="v">{p.expiry || "Unknown"}</span></div>
              <div className="stat-line"><span className="k">Current Club</span><span className="v">{p.club}</span></div>
              <div className="stat-line"><span className="k">Release Clause</span><span className="v">€{Math.round(p.mvNum * 1.6)}M</span></div>
              <div className="stat-line"><span className="k">Annual Salary (est.)</span><span className="v">€{(p.mvNum * 0.12).toFixed(1)}M</span></div>
            </SectionCard>
            <SectionCard title="Development Objectives" sub="Set by scouting team">
              {[["Improve weak-foot finishing", 70, "green"], ["Increase 90-min appearances", 55, ""], ["Media & brand presence", 40, "gold"]].map((o, i) => (
                <div key={i} style={{ marginBottom: 15 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                    <span>{o[0]}</span><b className="mono">{o[1]}%</b>
                  </div>
                  <Meter value={o[1]} tone={o[2]} />
                </div>
              ))}
            </SectionCard>
          </div>
          <SectionCard title="Scout Notes" sub="Internal notes — platform staff only"
            action={<button className="btn btn-ghost btn-sm"><Icon name="plus" size={14} />Add</button>}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { who: "Marco Solano",  av: "#2a6f5a", time: "2 days ago",  text: "Excellent movement in transition. Could be a target for a mid-table Liga Portugal club looking to push for Europe." },
                { who: "Priya Anand",   av: "#b8742a", time: "1 week ago",  text: "Strong in 1v1 situations. Recommending close monitoring through the second half of the season." },
              ].map((n, i) => (
                <div key={i} style={{ display: "flex", gap: 12 }}>
                  <Avatar name={n.who} color={n.av} size={34} />
                  <div style={{ flex: 1, background: "var(--surface-2)", borderRadius: 12, padding: "11px 14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <b style={{ fontSize: 13 }}>{n.who}</b><span className="dim mono" style={{ fontSize: 11 }}>{n.time}</span>
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.5 }}>{n.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {/* ---- DOCUMENTS TAB ---- */}
      {tab === "documents" && (
        <div className="grid cols-3">
          {(docs.length ? docs : window.DD.DOCS.slice(0, 3)).map((d, i) => (
            <div key={i} className="file-card">
              <div className="file-ic" style={{ background: d.color }}>{d.ext}</div>
              <div className="fc-body">
                <b>{d.name}</b>
                <small>{d.cat} · {d.size} · {d.date}</small>
              </div>
              <button className="icon-btn" style={{ width: 32, height: 32 }}><Icon name="download" size={15} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

window.Screens = window.Screens || {};
Object.assign(window.Screens, { PlayerDirectory, PlayerProfile });
