/* ============================================================
   Analytics screens: AnalyticsDashboard, BenchmarkingEngine,
   ComparisonTool
   ============================================================ */
const { useState: useStateSA, useMemo: useMemoSA } = React;

// =================== API STATS SECTION (4 tabs) ===================
function ApiStatsSection({ apiStats: api }) {
  const [tab, setTab] = useStateSA("general");

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

// ---- Metric metadata per position ----
const METRIC_META = {
  FW: [
    { key: "xG",             label: "xG (Expected Goals)",  unit: ""  },
    { key: "shots",          label: "Total Shots",           unit: ""  },
    { key: "shotsOnTarget",  label: "Shots on Target",       unit: ""  },
    { key: "conversionRate", label: "Conversion Rate",       unit: "%" },
    { key: "dribbles",       label: "Dribbles Completed",    unit: ""  },
  ],
  MF: [
    { key: "keyPasses",         label: "Key Passes",          unit: "" },
    { key: "passAcc",           label: "Pass Accuracy",       unit: "%" },
    { key: "chancesCreated",    label: "Chances Created",     unit: "" },
    { key: "progressivePasses", label: "Progressive Passes",  unit: "" },
    { key: "pressingSucc",      label: "Pressing Successes",  unit: "" },
  ],
  DF: [
    { key: "tackles",       label: "Tackles Won",      unit: "" },
    { key: "clearances",    label: "Clearances",        unit: "" },
    { key: "interceptions", label: "Interceptions",     unit: "" },
    { key: "aerialWon",     label: "Aerial Duels Won",  unit: "" },
    { key: "blockShots",    label: "Shots Blocked",     unit: "" },
  ],
  GK: [
    { key: "saves",         label: "Saves",           unit: ""  },
    { key: "savePerc",      label: "Save Percentage",  unit: "%" },
    { key: "cleanSheets",   label: "Clean Sheets",     unit: ""  },
    { key: "goalsConceded", label: "Goals Conceded",   unit: ""  },
    { key: "sweepActions",  label: "Sweeping Actions", unit: ""  },
  ],
};

const COMPARE_MODES = [
  { id: "league",   label: "vs League Avg"   },
  { id: "position", label: "vs Position Avg" },
  { id: "age",      label: "vs Age Group"    },
];

const COMPARE_SUBTITLE = {
  league:   "Benchmarked against players in the same league",
  position: "Benchmarked against the global position average",
  age:      "Benchmarked against players in the same age group",
};

// ---- Shared benchmark section ----
function BenchmarkSection({ player, compareMode }) {
  const benchmarks = window.DD.getBenchmark(player, compareMode);
  const meta = METRIC_META[player.pos] || [];
  const stats = player.positionStats || {};
  const scores = meta.map(m => benchmarks[m.key] || 50);
  const overallScore = scores.length ? Math.round(scores.reduce((s, v) => s + v, 0) / scores.length) : 50;
  const overallTier = overallScore >= 90 ? "Elite" : overallScore >= 75 ? "Above Avg" : overallScore >= 50 ? "Average" : overallScore >= 25 ? "Below Avg" : "Low";
  const overallColor = overallScore >= 75 ? "var(--green)" : overallScore >= 50 ? "var(--accent)" : "var(--amber)";
  const ageGroup = window.DD.getAgeGroup(player.age);

  return (
    <div className="dash-grid">
      <SectionCard title="Performance Benchmarks" sub={COMPARE_SUBTITLE[compareMode]}>
        {meta.map(m => (
          <BenchmarkBar key={m.key}
            label={m.label}
            value={stats[m.key]}
            unit={m.unit}
            percentile={benchmarks[m.key] || 50} />
        ))}
      </SectionCard>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <SectionCard title="Overall Score" sub={"Composite percentile rank · " + ageGroup + " · " + player.posFull}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "12px 0 4px" }}>
            <Gauge value={overallScore} max={100} size={140}
              color={overallColor} label={overallTier} />
          </div>
          <div className="divider" style={{ margin: "16px 0 12px" }}></div>
          <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center" }}>
            {[
              { label: "Rating",  value: player.rating.toFixed(1), tone: "var(--green)" },
              { label: "Apps",    value: player.apps,               tone: "var(--text)" },
              { label: "Mkt Val", value: player.mv,                 tone: "var(--gold-soft)" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--text-3)", marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: s.tone }}>{s.value}</div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Context" sub="Player details">
          {[
            ["Position",    player.posFull],
            ["Age Group",   ageGroup],
            ["League",      player.league || "—"],
            ["Club",        player.club],
            ["Status",      player.status],
          ].map(([k, v], i) => (
            <div key={i} className="stat-line">
              <span className="k">{k}</span>
              <span className="v">{i === 4 ? <StatusBadge status={v} /> : v}</span>
            </div>
          ))}
        </SectionCard>
      </div>
    </div>
  );
}

// =================== ANALYTICS DASHBOARD (player profile tab) ===================
function AnalyticsDashboard({ player }) {
  const [compareMode, setCompareMode] = useStateSA("league");
  return (
    <div className="fade-in">
      <div className="filterbar" style={{ marginBottom: 18 }}>
        {COMPARE_MODES.map(m => (
          <button key={m.id}
            className={"chip-toggle" + (compareMode === m.id ? " on" : "")}
            onClick={() => setCompareMode(m.id)}>
            {m.label}
          </button>
        ))}
        <div className="muted" style={{ marginLeft: "auto", fontSize: 12 }}>
          {player.name} · {player.posFull} · {window.DD.getAgeGroup(player.age)}
        </div>
      </div>
      <BenchmarkSection player={player} compareMode={compareMode} />
      {player.apiStats && <ApiStatsSection apiStats={player.apiStats} />}
    </div>
  );
}

// =================== BENCHMARKING ENGINE (standalone screen) ===================
function BenchmarkingEngine() {
  const [playerId, setPlayerId] = useStateSA(1);
  const [compareMode, setCompareMode] = useStateSA("league");
  const [posFilter, setPosFilter] = useStateSA("all");
  const { PLAYERS } = window.DD;

  const filteredPlayers = posFilter === "all" ? PLAYERS : PLAYERS.filter(p => p.pos === posFilter);
  const player = PLAYERS.find(p => p.id === playerId) || PLAYERS[0];

  return (
    <div className="fade-in">
      <div className="page-head">
        <div>
          <div className="eyebrow">Analytics · Performance Intelligence</div>
          <h1>Benchmarking Engine</h1>
          <div className="sub">Compare any player's statistics against league, position, or age group averages.</div>
        </div>
      </div>

      <div className="filterbar" style={{ marginBottom: 18 }}>
        <select className="select" value={posFilter} onChange={e => { setPosFilter(e.target.value); }}>
          <option value="all">All positions</option>
          <option value="FW">Forwards</option>
          <option value="MF">Midfielders</option>
          <option value="DF">Defenders</option>
          <option value="GK">Goalkeepers</option>
        </select>
        <select className="select" value={playerId} onChange={e => setPlayerId(Number(e.target.value))} style={{ minWidth: 240 }}>
          {filteredPlayers.map(p => (
            <option key={p.id} value={p.id}>{p.name} — {p.pos} · {p.club}</option>
          ))}
        </select>
        <div style={{ display: "flex", gap: 6, marginLeft: "auto" }}>
          {COMPARE_MODES.map(m => (
            <button key={m.id}
              className={"chip-toggle" + (compareMode === m.id ? " on" : "")}
              onClick={() => setCompareMode(m.id)}>
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Player card */}
      <div className="card card-pad" style={{ marginBottom: 18, display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <Avatar name={player.name} color={player.avColor} size={64} ring={player.tier === "elite"} />
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <h2 style={{ margin: 0 }}>{player.name}</h2>
            <PosTag pos={player.pos} />
            {player.tier === "elite" && <Badge tone="gold" dot>Elite</Badge>}
          </div>
          <div className="muted" style={{ fontSize: 13 }}>
            {player.flag} {player.nation} · {player.club} · {player.league}
          </div>
        </div>
        <div style={{ display: "flex", gap: 24, textAlign: "center" }}>
          {[["Rating", player.rating.toFixed(1), "var(--green)"], ["Apps", player.apps, "var(--text)"], ["Goals", player.goals, "var(--gold)"], ["Assists", player.assists, "var(--accent)"]].map(([l, v, c], i) => (
            <div key={i}>
              <div className="dim" style={{ fontSize: 11, fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: 4 }}>{l}</div>
              <div style={{ fontWeight: 700, fontSize: 18, color: c }}>{v}</div>
            </div>
          ))}
        </div>
      </div>

      <BenchmarkSection player={player} compareMode={compareMode} />
      {player.apiStats && <ApiStatsSection apiStats={player.apiStats} />}
    </div>
  );
}

// =================== COMPARISON TOOL ===================
function ComparisonTool() {
  const { PLAYERS, getBenchmark } = window.DD;
  const [idA, setIdA] = useStateSA(1);
  const [idB, setIdB] = useStateSA(2);
  const pA = PLAYERS.find(p => p.id === idA) || PLAYERS[0];
  const pB = PLAYERS.find(p => p.id === idB) || PLAYERS[1];

  // Build radar axes — use percentile values so axes are comparable
  const radarAxes = useMemoSA(() => {
    const bA = getBenchmark(pA, "position");
    const bB = getBenchmark(pB, "position");
    if (pA.pos === pB.pos) {
      const meta = METRIC_META[pA.pos] || [];
      return meta.map(m => ({ label: m.label.split(" ")[0], a: bA[m.key] || 50, b: bB[m.key] || 50 }));
    }
    // Different positions — use general metrics
    const normalize = (v, lo, hi) => Math.max(5, Math.min(99, Math.round((v - lo) / (hi - lo) * 100)));
    return [
      { label: "Rating",    a: normalize(pA.rating, 6.5, 8.5),   b: normalize(pB.rating, 6.5, 8.5) },
      { label: "Goals",     a: normalize(pA.goals, 0, 22),        b: normalize(pB.goals, 0, 22) },
      { label: "Assists",   a: normalize(pA.assists, 0, 15),      b: normalize(pB.assists, 0, 15) },
      { label: "Pass %",    a: normalize(pA.passAcc, 70, 95),     b: normalize(pB.passAcc, 70, 95) },
      { label: "Mkt Value", a: normalize(pA.mvNum, 0, 45),        b: normalize(pB.mvNum, 0, 45) },
      { label: "Apps",      a: normalize(pA.apps, 10, 35),        b: normalize(pB.apps, 10, 35) },
    ];
  }, [idA, idB]);

  // Comparison stats rows
  const compRows = [
    { label: "Position",     vA: pA.posFull,             vB: pB.posFull,           numeric: false },
    { label: "Age",          vA: pA.age,                 vB: pB.age,               numeric: false },
    { label: "League",       vA: pA.league || "—",       vB: pB.league || "—",     numeric: false },
    { label: "Avg Rating",   vA: pA.rating.toFixed(1),   vB: pB.rating.toFixed(1), numeric: true, aWins: pA.rating > pB.rating },
    { label: "Appearances",  vA: pA.apps,                vB: pB.apps,              numeric: true, aWins: pA.apps > pB.apps },
    { label: "Goals",        vA: pA.goals,               vB: pB.goals,             numeric: true, aWins: pA.goals > pB.goals },
    { label: "Assists",      vA: pA.assists,             vB: pB.assists,           numeric: true, aWins: pA.assists > pB.assists },
    { label: "Pass Acc.",    vA: pA.passAcc + "%",       vB: pB.passAcc + "%",     numeric: true, aWins: pA.passAcc > pB.passAcc },
    { label: "Minutes",      vA: pA.mins,                vB: pB.mins,              numeric: true, aWins: pA.mins > pB.mins },
    { label: "Market Value", vA: pA.mv,                  vB: pB.mv,                numeric: true, aWins: pA.mvNum > pB.mvNum },
  ];

  const mhA = pA.matchHistory || [];
  const mhB = pB.matchHistory || [];

  const PlayerSelector = ({ value, onChange, exclude }) => (
    <select className="select" value={value} onChange={e => onChange(Number(e.target.value))} style={{ minWidth: 200 }}>
      {PLAYERS.map(p => (
        <option key={p.id} value={p.id} disabled={p.id === exclude}>
          {p.name} — {p.pos} · {p.club}
        </option>
      ))}
    </select>
  );

  return (
    <div className="fade-in">
      <div className="page-head">
        <div>
          <div className="eyebrow">Analytics · Intelligence Tools</div>
          <h1>Player Comparison</h1>
          <div className="sub">Side-by-side analysis with radar chart and statistical breakdown.</div>
        </div>
      </div>

      {/* Player selectors */}
      <div className="card card-pad" style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div className="dim" style={{ fontSize: 11, fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: 8 }}>Player A</div>
            <PlayerSelector value={idA} onChange={setIdA} exclude={idB} />
          </div>
          <div style={{ color: "var(--text-3)", fontSize: 22, fontWeight: 700, padding: "16px 8px", flexShrink: 0 }}>vs</div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div className="dim" style={{ fontSize: 11, fontFamily: "var(--font-mono)", textTransform: "uppercase", marginBottom: 8 }}>Player B</div>
            <PlayerSelector value={idB} onChange={setIdB} exclude={idA} />
          </div>
        </div>
        {/* Mini player cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginTop: 18, paddingTop: 18, borderTop: "1px solid var(--line)" }}>
          {[pA, pB].map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Avatar name={p.name} color={p.avColor} size={52} ring={p.tier === "elite"} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{p.name}</div>
                <div className="dim" style={{ fontSize: 12 }}>{p.flag} {p.nation} · {p.club}</div>
                <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
                  <PosTag pos={p.pos} />
                  <RatingPill value={p.rating} />
                  <Badge tone="gray">{p.mv}</Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Radar + stats table */}
      <div className="dash-grid" style={{ marginBottom: 18 }}>
        <SectionCard title="Radar Comparison" sub={pA.pos === pB.pos ? "Position metrics · percentile vs position average" : "General metrics · normalised score"}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <RadarChart axes={radarAxes} colorA="var(--accent)" colorB="var(--gold)" nameA={pA.name} nameB={pB.name} size={290} />
          </div>
        </SectionCard>

        <SectionCard title="Head to Head" sub="Key statistics compared">
          <div>
            {compRows.map((row, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", padding: "9px 0", borderBottom: i < compRows.length - 1 ? "1px solid var(--line)" : "none" }}>
                <div style={{ flex: 1, textAlign: "right", fontWeight: row.numeric && row.aWins === true ? 700 : 400, color: row.numeric && row.aWins === true ? "var(--green)" : "var(--text)" }}>
                  {row.vA}
                </div>
                <div style={{ width: 130, textAlign: "center", fontSize: 11, fontFamily: "var(--font-mono)", textTransform: "uppercase", color: "var(--text-3)" }}>{row.label}</div>
                <div style={{ flex: 1, fontWeight: row.numeric && row.aWins === false ? 700 : 400, color: row.numeric && row.aWins === false ? "var(--gold)" : "var(--text)" }}>
                  {row.vB}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* Rating trend */}
      <SectionCard title="Match Rating Trend" sub="Last 20 matches — head to head form">
        <MultiLineChart height={220}
          labels={["Aug", "Oct", "Dec", "Feb", "Apr"]}
          seriesList={[
            { color: "var(--accent)", data: mhA.map(m => m.rating), },
            { color: "var(--gold)",   data: mhB.map(m => m.rating), dashed: true },
          ]} />
        <div className="legend" style={{ marginTop: 10 }}>
          <div className="li"><span className="sw" style={{ background: "var(--accent)" }}></span>{pA.name}</div>
          <div className="li"><span className="sw" style={{ background: "var(--gold)" }}></span>{pB.name} (dashed)</div>
        </div>
      </SectionCard>
    </div>
  );
}

window.SA = {};
Object.assign(window.SA, { AnalyticsDashboard, BenchmarkingEngine, ComparisonTool });
