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

// =================== SCOUTING REQUEST MODAL ===================
function ScoutingRequestModal({ onClose, onSubmit }) {
  const POSITIONS = ["ST","CF","LW","RW","CAM","CM","CDM","LB","RB","CB","GK"];
  const ATTRS = ["Pace","Aerial","Technical","Leadership","Pressing","Creativity","Finishing","Composure"];
  const [form, setForm] = useState({
    position:"ST", foot:"Either", ageMin:"", ageMax:"",
    heightMin:"", heightMax:"", budget:"", nationality:"", notes:"", attributes:[]
  });
  const set = (k, v) => setForm(f => ({...f, [k]:v}));
  const toggleAttr = (a) => setForm(f => ({
    ...f, attributes: f.attributes.includes(a) ? f.attributes.filter(x => x !== a) : [...f.attributes, a]
  }));
  const submit = (ev) => { ev.preventDefault(); onSubmit(form); onClose(); };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={ev => ev.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h3>New Scouting Request</h3>
            <div className="ttl-sub" style={{marginTop:3}}>Define the player profile you're looking for</div>
          </div>
          <button className="btn btn-ghost btn-sm" type="button" onClick={onClose}><Icon name="x" size={16}/></button>
        </div>
        <form onSubmit={submit} className="modal-body">
          <div className="form-row-2">
            <div className="form-group">
              <label>Position</label>
              <select className="form-input" value={form.position} onChange={ev => set("position", ev.target.value)}>
                {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Preferred Foot</label>
              <select className="form-input" value={form.foot} onChange={ev => set("foot", ev.target.value)}>
                <option>Either</option><option>Left</option><option>Right</option>
              </select>
            </div>
          </div>
          <div className="form-row-2">
            <div className="form-group">
              <label>Age Range</label>
              <div style={{display:"flex",gap:8}}>
                <input className="form-input" type="number" placeholder="Min" min={15} max={45} value={form.ageMin} onChange={ev => set("ageMin", ev.target.value)} />
                <input className="form-input" type="number" placeholder="Max" min={15} max={45} value={form.ageMax} onChange={ev => set("ageMax", ev.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Height (ft)</label>
              <div style={{display:"flex",gap:8}}>
                <input className="form-input" type="text" placeholder="Min e.g. 5.9" value={form.heightMin} onChange={ev => set("heightMin", ev.target.value)} />
                <input className="form-input" type="text" placeholder="Max e.g. 6.4" value={form.heightMax} onChange={ev => set("heightMax", ev.target.value)} />
              </div>
            </div>
          </div>
          <div className="form-row-2">
            <div className="form-group">
              <label>Max Budget</label>
              <input className="form-input" type="text" placeholder="e.g. €25M" value={form.budget} onChange={ev => set("budget", ev.target.value)} />
            </div>
            <div className="form-group">
              <label>Preferred Nationality</label>
              <input className="form-input" type="text" placeholder="e.g. Brazilian, Spanish..." value={form.nationality} onChange={ev => set("nationality", ev.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label>Key Attributes</label>
            <div className="attr-tags">
              {ATTRS.map(a => (
                <div key={a} className={"attr-tag" + (form.attributes.includes(a) ? " on" : "")} onClick={() => toggleAttr(a)}>{a}</div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>Additional Notes</label>
            <textarea className="form-input" rows={3} placeholder="Any other details for the scouting team..." value={form.notes} onChange={ev => set("notes", ev.target.value)} style={{resize:"vertical"}} />
          </div>
          <div style={{display:"flex",gap:10,justifyContent:"flex-end",marginTop:4}}>
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Submit Request <Icon name="arrow-right" size={15}/></button>
          </div>
        </form>
      </div>
    </div>
  );
}

// =================== OWNER DASHBOARD ===================
function OwnerDashboard({ onOpenPlayer, goto }) {
  const [showRequest, setShowRequest] = useState(false);
  const [requests, setRequests] = useState([]);
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
            action={<div style={{display:"flex",gap:8}}>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowRequest(true)}><Icon name="plus" size={14}/>New Request</button>
              <button className="btn btn-ghost btn-sm" onClick={() => goto("pipeline")}>All</button>
            </div>}>
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
              {requests.length > 0 && (
                <div style={{marginTop:8,paddingTop:10,borderTop:"1px solid var(--line)"}}>
                  <div style={{fontSize:10.5,fontWeight:700,letterSpacing:".12em",textTransform:"uppercase",color:"var(--text-3)",marginBottom:8}}>Scouting Requests</div>
                  {requests.map((r, i) => (
                    <div key={i} className="stat-line" style={{marginBottom:4}}>
                      <div style={{display:"flex",alignItems:"center",gap:12}}>
                        <div style={{width:36,height:36,borderRadius:10,display:"grid",placeItems:"center",background:"color-mix(in srgb,var(--accent) 14%,transparent)",color:"var(--accent)",flexShrink:0}}>
                          <Icon name="target" size={16}/>
                        </div>
                        <div>
                          <div style={{fontWeight:600}}>{r.position} · {r.foot} foot{r.budget ? " · " + r.budget : ""}</div>
                          <div className="dim" style={{fontSize:12}}>
                            {[r.ageMin && r.ageMax && `Age ${r.ageMin}–${r.ageMax}`, r.heightMin && r.heightMax && `${r.heightMin}–${r.heightMax} ft`, r.nationality].filter(Boolean).join(" · ") || "No additional filters"}
                            {r.attributes.length > 0 && <span style={{marginLeft:4}}>{r.attributes.slice(0,3).map(a => <Badge key={a} tone="blue" style={{marginLeft:3,fontSize:10}}>{a}</Badge>)}</span>}
                          </div>
                        </div>
                      </div>
                      <Badge tone="gray">Pending</Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </SectionCard>
          {showRequest && <ScoutingRequestModal onClose={() => setShowRequest(false)} onSubmit={r => setRequests(rs => [...rs, r])} />}
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
