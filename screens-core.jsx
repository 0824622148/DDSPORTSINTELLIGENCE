/* ============================================================
   Core screens: Login, Owner Dashboard, Directory, Profile
   ============================================================ */
const { useState, useMemo } = React;

// ---- decorative pitch lines (simple geometry only) ----
function PitchLines() {
  return (
    <svg className="pitch" viewBox="0 0 600 800" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1.5">
      <rect x="40" y="40" width="520" height="720" rx="4" />
      <line x1="40" y1="400" x2="560" y2="400" />
      <circle cx="300" cy="400" r="78" />
      <circle cx="300" cy="400" r="3" fill="rgba(255,255,255,.5)" />
      <rect x="190" y="40" width="220" height="120" />
      <rect x="250" y="40" width="100" height="46" />
      <rect x="190" y="640" width="220" height="120" />
      <rect x="250" y="714" width="100" height="46" />
      <path d="M222 160 a78 78 0 0 0 156 0" />
      <path d="M222 640 a78 78 0 0 1 156 0" />
    </svg>
  );
}

function Login({ onLogin }) {
  const [email, setEmail] = useState("owner@ddsports.agency");
  const deriveRole = (e) => {
    const v = e.toLowerCase();
    if (v.includes("scout")) return "scout";
    if (v.includes("player")) return "player";
    return "owner";
  };
  const submit = (e) => { e.preventDefault(); onLogin(deriveRole(email)); };
  return (
    <div className="login">
      <div className="login-hero">
        <PitchLines />
        <div className="glow"></div>
        <div className="hero-top">
          <img src="assets/mark-white.png" alt="DD" />
          <div>
            <b>D.D Sports Management</b>
            <span>Confía en tu destino</span>
          </div>
        </div>
        <div className="hero-mid">
          <div className="tag">Football Agency Intelligence</div>
          <h2>Where talent meets <em>opportunity.</em></h2>
          <p>The centralized command center for elite player management — performance, market value, scouting and recruitment, in one premium platform.</p>
        </div>
        <div className="hero-stats">
          <div className="hs"><b>17</b><span>Players</span></div>
          <div className="hs"><b>€336M</b><span>Portfolio Value</span></div>
          <div className="hs"><b>4</b><span>Global Scouts</span></div>
        </div>
      </div>
      <div className="login-form-wrap">
        <form className="login-form" onSubmit={submit}>
          <h1>Sign in</h1>
          <p className="lead">Welcome back.</p>
          <div className="form-group">
            <label>Email address</label>
            <input className="form-input" type="email" value={email} onChange={ev => setEmail(ev.target.value)} />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input className="form-input" type="password" defaultValue="••••••••••" />
          </div>
          <div className="form-row">
            <label className="checkbox"><input type="checkbox" defaultChecked />Remember me</label>
            <a className="login-link">Forgot password?</a>
          </div>
          <button className="btn btn-primary" style={{ width: "100%", padding: "13px" }} type="submit">
            Sign in to platform <Icon name="arrow-right" size={17} />
          </button>
          <p className="dim" style={{ textAlign: "center", marginTop: 22, fontSize: 12 }}>
            Protected by FIFA-licensed agency security · ISO 27001
          </p>
        </form>
      </div>
    </div>
  );
}

// =================== OWNER DASHBOARD ===================
function OwnerDashboard({ onOpenPlayer, goto }) {
  const P = window.DD.PLAYERS;
  const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const totalMV = P.reduce((a, p) => a + p.mvNum, 0);
  const risks = P.filter(p => p.status === "Contract Risk");
  const statusDist = [
    { label: "Active", value: P.filter(p => p.status === "Active").length, color: "var(--green)" },
    { label: "Prospect", value: P.filter(p => p.status === "Prospect").length, color: "var(--accent)" },
    { label: "Contract Risk", value: risks.length, color: "var(--red)" },
  ];
  const pipelineRows = window.DD.STAGES.slice(0, 6).map(s => ({
    label: s.label, color: s.color,
    value: window.DD.TARGETS.filter(t => t.stage === s.id).length + (s.id === "identified" ? 5 : s.id === "review" ? 4 : 0),
  }));
  return (
    <div className="fade-in">
      <div className="page-head">
        <div>
          <div className="eyebrow">Agency Overview</div>
          <h1>Good morning, David</h1>
          <div className="sub">Here's what's happening across your portfolio today — Sunday, 1 June 2026.</div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-ghost"><Icon name="download" size={16} />Export</button>
          <button className="btn btn-primary"><Icon name="user-plus" size={16} />Add Player</button>
        </div>
      </div>

      <div className="grid cols-4" style={{ marginBottom: 18 }}>
        <KPI icon="users" label="Total Players" value={P.length} delta="+3 this quarter" deltaDir="up" tone="blue" spark={[12,13,13,14,15,15,16,17]} />
        <KPI icon="dollar" label="Agency Market Value" unit="€" value={totalMV.toFixed(0) + "M"} delta="+8.4%" deltaDir="up" tone="gold" spark={[280,290,300,305,315,322,330,336]} />
        <KPI icon="search" label="Active Scouts" value="4" delta="14 reports due" deltaDir="up" tone="green" />
        <KPI icon="briefcase" label="Active Agents" value="3" delta="100% utilization" deltaDir="up" tone="navy" />
      </div>

      <div className="dash-grid" style={{ marginBottom: 18 }}>
        <SectionCard title="Market Value Trends" sub="Portfolio valuation over the last 12 months"
          action={<Badge tone="gold" dot>+€56M YoY</Badge>}>
          <MultiLineChart height={240} labels={months} seriesList={[
            { color: "var(--gold)", data: [280,288,295,300,308,312,318,322,328,330,333,336] },
            { color: "var(--accent)", dashed: true, data: [180,184,188,190,196,198,202,205,210,213,216,220] },
          ]} />
          <div className="legend" style={{ marginTop: 14 }}>
            <div className="li"><span className="sw" style={{ background: "var(--gold)" }}></span>Total portfolio (€M)</div>
            <div className="li"><span className="sw" style={{ background: "var(--accent)" }}></span>Top-10 players (€M)</div>
          </div>
        </SectionCard>
        <SectionCard title="Player Status">
          <Donut centerLabel={P.length} centerSub="PLAYERS" segments={statusDist} size={172} />
        </SectionCard>
      </div>

      <div className="dash-grid" style={{ marginBottom: 18 }}>
        <SectionCard title="Player Performance Trends" sub="Aggregate average match rating — all rostered players"
          action={<button className="btn btn-ghost btn-sm" onClick={() => goto("directory")}>View players</button>}>
          <LineChart height={220} color="var(--accent)" labels={months}
            data={[7.0,7.05,7.1,7.0,7.15,7.2,7.18,7.25,7.3,7.28,7.35,7.4]} showDots />
        </SectionCard>
        <SectionCard title="Recruitment Pipeline" sub="Targets by stage"
          action={<button className="btn btn-ghost btn-sm" onClick={() => goto("pipeline")}>Open board</button>}>
          <FunnelBars rows={pipelineRows} />
        </SectionCard>
      </div>

      <div className="dash-grid">
        <div className="grid" style={{ gap: 18 }}>
          <SectionCard title="Contract Expiry Alerts" sub={risks.length + " players require attention"}
            action={<Badge tone="red" dot>Action needed</Badge>}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {risks.map(p => (
                <div key={p.id} className="stat-line" style={{ cursor: "pointer" }} onClick={() => onOpenPlayer(p.id)}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Avatar name={p.name} color={p.avColor} size={36} />
                    <div>
                      <div style={{ fontWeight: 600 }}>{p.name} <PosTag pos={p.pos} /></div>
                      <div className="dim mono" style={{ fontSize: 11.5 }}>{p.club} · {p.mv}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <Badge tone="red">Expires {p.expiry}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
          <SectionCard title="Transfer Opportunities" sub="Inbound interest & active windows"
            action={<button className="btn btn-ghost btn-sm" onClick={() => goto("pipeline")}>All</button>}>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {[["Mateo Rivas", "Meridian City", "€48M offer", "gold"], ["Karim El Fassi", "Lyonne AC", "Loan + option", "blue"], ["Gabriel Nunes", "Borges United", "Scouting interest", "blue"]].map((o, i) => (
                <div key={i} className="stat-line">
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div className="ic" style={{ width: 36, height: 36, borderRadius: 10, display: "grid", placeItems: "center", background: "color-mix(in srgb,var(--gold) 14%,transparent)", color: "var(--gold)" }}>
                      <Icon name="zap" size={16} />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{o[0]}</div>
                      <div className="dim" style={{ fontSize: 12 }}>{o[1]}</div>
                    </div>
                  </div>
                  <Badge tone={o[3]}>{o[2]}</Badge>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
        <SectionCard title="Recent Activity" action={<button className="btn btn-ghost btn-sm">All</button>}>
          <Feed items={window.DD.ACTIVITY} limit={7} />
        </SectionCard>
      </div>
    </div>
  );
}

window.Screens = window.Screens || {};
Object.assign(window.Screens, { Login, OwnerDashboard });
