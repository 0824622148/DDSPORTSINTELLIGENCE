/* ============================================================
   Player Directory + Player Profile
   ============================================================ */
const { useState: useStateD, useMemo: useMemoD } = React;

// =================== PLAYER DIRECTORY ===================
function PlayerDirectory({ onOpenPlayer }) {
  const P = window.DD.PLAYERS;
  const [q, setQ] = useStateD("");
  const [pos, setPos] = useStateD("all");
  const [status, setStatus] = useStateD("all");
  const [nation, setNation] = useStateD("all");
  const [sort, setSort] = useStateD({ k: "mvNum", dir: -1 });
  const [view, setView] = useStateD("table");

  const nations = [...new Set(P.map(p => p.nation))].sort();
  const rows = useMemoD(() => {
    let r = P.filter(p =>
      (q === "" || (p.name + p.club).toLowerCase().includes(q.toLowerCase())) &&
      (pos === "all" || p.pos === pos) &&
      (status === "all" || p.status === status) &&
      (nation === "all" || p.nation === nation)
    );
    r = [...r].sort((a, b) => {
      const av = a[sort.k], bv = b[sort.k];
      return (typeof av === "string" ? av.localeCompare(bv) : av - bv) * sort.dir;
    });
    return r;
  }, [q, pos, status, nation, sort]);

  const Th = ({ k, children, num }) => (
    <th onClick={() => setSort(s => ({ k, dir: s.k === k ? -s.dir : (num ? -1 : 1) }))} style={{ cursor: "pointer", textAlign: num ? "right" : "left" }}>
      <span className="th-sort">{children}<Icon name="chevron-down" size={11} style={{ transform: sort.k === k && sort.dir === 1 ? "rotate(180deg)" : "none", opacity: sort.k === k ? 1 : .35 }} /></span>
    </th>
  );

  return (
    <div className="fade-in">
      <div className="page-head">
        <div>
          <div className="eyebrow">Roster · {P.length} Players</div>
          <h1>Player Directory</h1>
          <div className="sub">Search, filter and analyze the full agency roster.</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-ghost"><Icon name="download" size={16} />Export CSV</button>
          <button className="btn btn-primary"><Icon name="user-plus" size={16} />Add Player</button>
        </div>
      </div>

      <div className="filterbar">
        <div className="searchbar" style={{ maxWidth: 280, flex: "none", width: 280 }}>
          <Icon name="search" />
          <input placeholder="Search name or club…" value={q} onChange={e => setQ(e.target.value)} />
        </div>
        <select className="select" value={pos} onChange={e => setPos(e.target.value)}>
          <option value="all">All positions</option><option value="GK">Goalkeeper</option>
          <option value="DF">Defender</option><option value="MF">Midfielder</option><option value="FW">Forward</option>
        </select>
        <select className="select" value={nation} onChange={e => setNation(e.target.value)}>
          <option value="all">All nationalities</option>
          {nations.map(n => <option key={n} value={n}>{n}</option>)}
        </select>
        <select className="select" value={status} onChange={e => setStatus(e.target.value)}>
          <option value="all">Any status</option><option>Active</option><option>Prospect</option><option value="Contract Risk">Contract Risk</option>
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
                <th>Nationality</th>
                <th>Club</th>
                <Th k="mvNum" num>Market Value</Th>
                <Th k="expiry">Contract</Th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(p => (
                <tr key={p.id} onClick={() => onOpenPlayer(p.id)}>
                  <td>
                    <div className="player-cell">
                      <Avatar name={p.name} color={p.avColor} size={38} />
                      <div><b>{p.name}</b><small>{p.posFull}</small></div>
                    </div>
                  </td>
                  <td><PosTag pos={p.pos} /></td>
                  <td className="num" style={{ textAlign: "right" }}>{p.age}</td>
                  <td><span style={{ marginRight: 7 }}>{p.flag}</span>{p.nation}</td>
                  <td className="muted">{p.club}</td>
                  <td className="num" style={{ textAlign: "right", fontWeight: 600 }}>{p.mv}</td>
                  <td className="num muted">{p.expiry}</td>
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
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 16 }}>
                <PosTag pos={p.pos} />
                <div className="mono" style={{ fontWeight: 700, fontSize: 15 }}>{p.mv}</div>
              </div>
              <div className="divider" style={{ margin: "14px 0" }}></div>
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
  const tabs = [["overview", "Overview"], ["performance", "Performance"], ["career", "Career"], ["agency", "Agency"], ["documents", "Documents"]];
  const docs = window.DD.DOCS.filter(d => d.owner === p.name);

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
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
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
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end" }}>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: ".14em", color: "#9fb0e8", textTransform: "uppercase" }}>Market Value</div>
                <div className="display" style={{ fontSize: 34, color: "var(--gold-soft)" }}>{p.mv}</div>
              </div>
              <div style={{ display: "flex", gap: 9 }}>
                <button className="btn btn-gold btn-sm"><Icon name="edit" size={15} />Edit</button>
                <button className="btn btn-sm" style={{ background: "rgba(255,255,255,.12)", color: "#fff" }}><Icon name="message" size={15} />Notes</button>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, padding: "14px 30px", borderTop: "1px solid var(--line)" }}>
          {[["Status", null], ["Assigned Agent", p.agent], ["Contract Until", p.expiry], ["Season Rating", null]].map((x, i) => (
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

      {(tab === "overview" || tab === "performance") && (
        <>
          <div className="grid" style={{ gridTemplateColumns: "repeat(6,1fr)", marginBottom: 18 }}>
            <StatBox label="Apps" value={p.apps} />
            <StatBox label="Goals" value={p.goals} tone="var(--gold)" />
            <StatBox label="Assists" value={p.assists} tone="var(--accent)" />
            <StatBox label="Pass %" value={p.passAcc} sub="accuracy" />
            <StatBox label="Minutes" value={p.mins} />
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
                { label: "Goals", value: p.goals, color: "var(--gold)" },
                { label: "Assists", value: p.assists, color: "var(--accent)" },
              ]} />
            </SectionCard>
          </div>
        </>
      )}

      {tab === "career" && (
        <div className="dash-grid">
          <SectionCard title="Career History" sub="Clubs & transfers">
            <div style={{ position: "relative", paddingLeft: 26 }}>
              <div style={{ position: "absolute", left: 7, top: 6, bottom: 6, width: 2, background: "var(--line)" }}></div>
              {[
                { club: p.club, years: "2023 — Present", fee: "Current club", cur: true },
                { club: "Juvenil Académica", years: "2021 — 2023", fee: "€6.5M transfer" },
                { club: "Club Formativo", years: "2019 — 2021", fee: "Youth academy" },
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
              {[["trophy", "League Top Scorer", "2024 season"], ["award", "Young Player of the Year", "2023"], ["star", "Team of the Season", "2024"], ["flag", "U-21 International Caps", "12 caps"]].map((a, i) => (
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

      {tab === "agency" && (
        <div className="dash-grid">
          <div className="grid" style={{ gap: 18 }}>
            <SectionCard title="Contract Information">
              <div className="stat-line"><span className="k">Assigned Agent</span><span className="v">{p.agent}</span></div>
              <div className="stat-line"><span className="k">Contract Expiry</span><span className="v">{p.expiry}</span></div>
              <div className="stat-line"><span className="k">Current Club</span><span className="v">{p.club}</span></div>
              <div className="stat-line"><span className="k">Release Clause</span><span className="v">€{Math.round(p.mvNum * 1.6)}M</span></div>
              <div className="stat-line"><span className="k">Annual Salary</span><span className="v">€{(p.mvNum * 0.12).toFixed(1)}M</span></div>
            </SectionCard>
            <SectionCard title="Development Objectives" sub="Set by agency staff">
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
          <SectionCard title="Internal Notes" sub="Visible to agency staff only"
            action={<button className="btn btn-ghost btn-sm"><Icon name="plus" size={14} />Add</button>}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { who: "David Duarte", av: "#1f3aa6", time: "2 days ago", text: "Spoke with the club's sporting director — open to a sell-on clause in any future deal. Player keen to stay focused on the season run-in." },
                { who: "Sofía Marín", av: "#9a3550", time: "1 week ago", text: "Strong interest from two top-tier clubs. Advising patience until summer window for maximum leverage on valuation." },
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
