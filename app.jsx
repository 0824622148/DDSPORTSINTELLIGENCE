/* ============================================================
   App shell — routing, persona, theme
   ============================================================ */
const { useState: useStateA, useEffect: useEffectA } = React;
const S = window.Screens;

const PERSONAS = {
  admin:  { name: "David Duarte",  color: "#1f3aa6", roleLabel: "Platform Administrator" },
  scout:  { name: "Marco Solano",  color: "#2a6f5a", roleLabel: "Scout · South America"  },
  club:   { name: "FC Analytics",  color: "#6d28d9", roleLabel: "Club · Recruitment"      },
  player: { name: "Mateo Rivas",   color: "#b8742a", roleLabel: "Forward · Liga Portugal" },
};

const NAV = {
  admin: [
    { label: "Overview", items: [
      { id: "dashboard",   label: "Dashboard",        icon: "grid"      },
    ]},
    { label: "Intelligence", items: [
      { id: "directory",   label: "Player Database",  icon: "users"     },
      { id: "benchmarks",  label: "Benchmarking",     icon: "pie"       },
      { id: "compare",     label: "Compare Players",  icon: "layers"    },
    ]},
    { label: "Operations", items: [
      { id: "pipeline",    label: "Recruitment",      icon: "target"    },
      { id: "scoutdash",   label: "Scouting",         icon: "search"    },
      { id: "documents",   label: "Documents",        icon: "folder"    },
    ]},
    { label: "Account", items: [
      { id: "notifications",label: "Notifications",   icon: "bell", badge: 3 },
    ]},
  ],
  scout: [
    { label: "Scouting", items: [
      { id: "scoutdash",   label: "Dashboard",        icon: "grid"      },
      { id: "directory",   label: "Player Database",  icon: "users"     },
      { id: "pipeline",    label: "Recruitment",      icon: "target"    },
    ]},
    { label: "Analytics", items: [
      { id: "benchmarks",  label: "Benchmarking",     icon: "pie"       },
      { id: "compare",     label: "Compare Players",  icon: "layers"    },
    ]},
    { label: "Account", items: [
      { id: "documents",   label: "Reports",          icon: "folder"    },
      { id: "notifications",label: "Notifications",   icon: "bell", badge: 2 },
    ]},
  ],
  club: [
    { label: "Recruitment", items: [
      { id: "dashboard",   label: "Dashboard",        icon: "grid"      },
      { id: "directory",   label: "Player Database",  icon: "users"     },
      { id: "pipeline",    label: "Pipeline",         icon: "target"    },
    ]},
    { label: "Analytics", items: [
      { id: "benchmarks",  label: "Benchmarking",     icon: "pie"       },
      { id: "compare",     label: "Compare Players",  icon: "layers"    },
    ]},
    { label: "Account", items: [
      { id: "notifications",label: "Notifications",   icon: "bell", badge: 1 },
    ]},
  ],
  player: [
    { label: "My Career", items: [
      { id: "playerdash",  label: "My Dashboard",     icon: "grid"      },
      { id: "profile",     label: "My Profile",       icon: "shield"    },
    ]},
    { label: "Analytics", items: [
      { id: "benchmarks",  label: "My Benchmarks",    icon: "pie"       },
    ]},
    { label: "Account", items: [
      { id: "documents",   label: "Documents",        icon: "folder"    },
      { id: "notifications",label: "Updates",         icon: "bell", badge: 1 },
    ]},
  ],
};

const HOME  = { admin: "dashboard", scout: "scoutdash", club: "dashboard", player: "playerdash" };
const CRUMB = {
  dashboard:     { section: "Overview",     page: "Dashboard"          },
  directory:     { section: "Intelligence", page: "Player Database"    },
  profile:       { section: "Intelligence", page: "Player Profile"     },
  pipeline:      { section: "Operations",   page: "Recruitment Pipeline"},
  scoutdash:     { section: "Scouting",     page: "Scout Workspace"    },
  playerdash:    { section: "My Career",    page: "Dashboard"          },
  documents:     { section: "Files",        page: "Documents"          },
  notifications: { section: "Account",      page: "Notifications"      },
  benchmarks:    { section: "Analytics",    page: "Benchmarking Engine"},
  compare:       { section: "Analytics",    page: "Player Comparison"  },
};

function NotifPanel({ onClose }) {
  const icon = { Contract: "file", Scouting: "clipboard", Performance: "trend", Transfer: "zap" };
  return (
    <div className="panel" onClick={e => e.stopPropagation()}>
      <div className="panel-head">
        <b>Notifications</b>
        <button className="btn btn-ghost btn-sm">Mark all read</button>
      </div>
      <div className="panel-list">
        {window.DD.NOTIFS.slice(0, 5).map((n, i) => {
          const tone = n.kind === "gold" ? "gold" : n.kind === "red" ? "red" : n.kind === "green" ? "green" : "accent";
          return (
            <div key={i} style={{ display: "flex", gap: 12, padding: "13px 16px", borderBottom: "1px solid var(--line)", background: n.unread ? "color-mix(in srgb,var(--accent) 5%,transparent)" : "" }}>
              <div className="fi-ic" style={{ width: 34, height: 34, borderRadius: 9, flex: "none", display: "grid", placeItems: "center", background: `color-mix(in srgb,var(--${tone}) 14%,transparent)`, color: `var(--${tone})` }}>
                <Icon name={icon[n.cat]} size={15} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{n.title}</div>
                <div className="muted" style={{ fontSize: 12, lineHeight: 1.45, marginTop: 2 }}>{n.body}</div>
                <div className="dim mono" style={{ fontSize: 10.5, marginTop: 4 }}>{n.time}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function App() {
  const [authed,   setAuthed]   = useStateA(false);
  const [role,     setRole]     = useStateA("admin");
  const [screen,   setScreen]   = useStateA("dashboard");
  const [theme,    setTheme]    = useStateA("dark");
  const [playerId, setPlayerId] = useStateA(1);
  const [navOpen,  setNavOpen]  = useStateA(false);
  const [bell,     setBell]     = useStateA(false);
  const [toast,    setToast]    = useStateA(null);

  useEffectA(() => { document.documentElement.setAttribute("data-theme", theme); }, [theme]);
  useEffectA(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const showToast = (msg) => setToast(msg);

  const login = (r) => {
    setRole(r); setAuthed(true); setScreen(HOME[r] || "dashboard");
    if (r === "player") setPlayerId(1);
  };

  const switchRole = (r) => {
    setRole(r); setScreen(HOME[r] || "dashboard"); setNavOpen(false);
    showToast("Switched to " + r.charAt(0).toUpperCase() + r.slice(1) + " view");
  };

  const openPlayer = (id) => { setPlayerId(id); setScreen("profile"); };
  const goto = (s) => { setScreen(s); setNavOpen(false); };

  if (!authed) return <S.Login onLogin={login} />;

  const persona = PERSONAS[role] || PERSONAS.admin;
  const player  = window.DD.findPlayer(playerId) || window.DD.PLAYERS[0];

  const renderScreen = () => {
    const SA = window.SA;
    switch (screen) {
      case "dashboard":     return <S.OwnerDashboard onOpenPlayer={openPlayer} goto={goto} />;
      case "directory":     return <S.PlayerDirectory onOpenPlayer={openPlayer} />;
      case "profile":       return <S.PlayerProfile player={player} onBack={() => goto(role === "player" ? "playerdash" : "directory")} />;
      case "pipeline":      return <S.RecruitmentPipeline />;
      case "scoutdash":     return <S.ScoutDashboard onOpenPlayer={openPlayer} />;
      case "playerdash":    return <S.PlayerDashboard player={window.DD.PLAYERS[0]} />;
      case "documents":     return <S.Documents />;
      case "notifications": return <S.Notifications />;
      case "benchmarks":    return SA ? <SA.BenchmarkingEngine /> : <div className="empty">Analytics module not loaded.</div>;
      case "compare":       return SA ? <SA.ComparisonTool />     : <div className="empty">Analytics module not loaded.</div>;
      default:              return <S.OwnerDashboard onOpenPlayer={openPlayer} goto={goto} />;
    }
  };

  const ROLE_CYCLE = { admin: "scout", scout: "club", club: "player", player: "admin" };

  return (
    <div className={"app" + (navOpen ? " nav-open" : "")}>
      <div className="mobile-overlay" onClick={() => setNavOpen(false)}></div>
      <Sidebar nav={NAV[role] || NAV.admin} current={screen} onNav={goto} persona={persona}
        onPersonaClick={() => switchRole(ROLE_CYCLE[role] || "admin")} />
      <div className="main">
        <div onClick={() => bell && setBell(false)} style={{ display: "contents" }}>
          <Topbar crumb={CRUMB[screen] || { section: "Platform", page: screen }}
            persona={persona} role={role} onRole={switchRole}
            theme={theme} onTheme={() => setTheme(t => t === "dark" ? "light" : "dark")}
            onMenu={() => setNavOpen(o => !o)} onBell={() => setBell(b => !b)}
            unread={window.DD.NOTIFS.filter(n => n.unread).length} />
        </div>
        <div className="content">
          {bell && (
            <div style={{ position: "absolute", inset: 0, zIndex: 40 }} onClick={() => setBell(false)}>
              <div style={{ position: "absolute", top: -8, right: 26 }}>
                <NotifPanel onClose={() => setBell(false)} />
              </div>
            </div>
          )}
          <div className="content-wrap" key={screen + role}>
            {renderScreen()}
          </div>
        </div>
      </div>
      {toast && <div className="toast"><Icon name="check" size={16} style={{ color: "var(--green)" }} />{toast}</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
