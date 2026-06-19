/* ============================================================
   DD SPORTS INTELLIGENCE — Fictional Data
   (All players, clubs and people are invented)
   ============================================================ */
(function () {

  // ---- helpers ----
  const series = (n, base, vol, trend) =>
    Array.from({ length: n }, (_, i) =>
      Math.max(0, Math.round((base + trend * i + (Math.sin(i * 1.7) + Math.cos(i * 0.9)) * vol) * 10) / 10)
    );

  const NATIONS = {
    "Argentina":"🇦🇷","Austria":"🇦🇹","Belgium":"🇧🇪","Brazil":"🇧🇷","Bulgaria":"🇧🇬",
    "Cameroon":"🇨🇲","Chile":"🇨🇱","Colombia":"🇨🇴","Croatia":"🇭🇷","Czech Republic":"🇨🇿",
    "Denmark":"🇩🇰","Ecuador":"🇪🇨","England":"🇬🇧","Finland":"🇫🇮","France":"🇫🇷",
    "Germany":"🇩🇪","Ghana":"🇬🇭","Greece":"🇬🇷","Hungary":"🇭🇺","Ireland":"🇮🇪",
    "Italy":"🇮🇹","Ivory Coast":"🇨🇮","Japan":"🇯🇵","Latvia":"🇱🇻","Mexico":"🇲🇽",
    "Morocco":"🇲🇦","Netherlands":"🇳🇱","Nigeria":"🇳🇬","Norway":"🇳🇴","Paraguay":"🇵🇾",
    "Poland":"🇵🇱","Portugal":"🇵🇹","Romania":"🇷🇴","Russia":"🇷🇺","Scotland":"🏴󠁧󠁢󠁳󠁣󠁴󠁿",
    "Senegal":"🇸🇳","Serbia":"🇷🇸","Slovakia":"🇸🇰","Spain":"🇪🇸","Sweden":"🇸🇪",
    "Switzerland":"🇨🇭","Tunisia":"🇹🇳","Turkey":"🇹🇷","Ukraine":"🇺🇦","Uruguay":"🇺🇾",
    "Wales":"🏴󠁧󠁢󠁷󠁬󠁳󠁿",
  };

  const AVCOL = ["#1f3aa6","#2a6f5a","#7a3b8f","#b8742a","#1d6f8f","#9a3550","#4a4f8f","#2f7a44"];

  // ---- 26 Leagues ----
  const LEAGUES = [
    { id:"esp2",    name:"Spain Segunda División",       country:"Spain",        tier:"professional" },
    { id:"por1",    name:"Portugal Liga Portugal",       country:"Portugal",     tier:"professional" },
    { id:"por2",    name:"Portugal Liga 2",              country:"Portugal",     tier:"professional" },
    { id:"ita2",    name:"Italy Serie B",                country:"Italy",        tier:"professional" },
    { id:"den1",    name:"Denmark Superliga",            country:"Denmark",      tier:"professional" },
    { id:"ger2",    name:"Germany Bundesliga 2",         country:"Germany",      tier:"professional" },
    { id:"ger3",    name:"Germany 3. Liga",              country:"Germany",      tier:"professional" },
    { id:"aut1",    name:"Austria Bundesliga",           country:"Austria",      tier:"professional" },
    { id:"swe1",    name:"Sweden Allsvenskan",           country:"Sweden",       tier:"professional" },
    { id:"bul1",    name:"Bulgaria First League",        country:"Bulgaria",     tier:"professional" },
    { id:"rus1",    name:"Russia Premier League",        country:"Russia",       tier:"professional" },
    { id:"gre1",    name:"Greece Super League",          country:"Greece",       tier:"professional" },
    { id:"gre2",    name:"Greece Super League 2",        country:"Greece",       tier:"professional" },
    { id:"bel1",    name:"Belgium Pro League",           country:"Belgium",      tier:"professional" },
    { id:"bel2",    name:"Belgium Challenger Pro League",country:"Belgium",      tier:"professional" },
    { id:"ned2",    name:"Netherlands Eerste Divisie",   country:"Netherlands",  tier:"professional" },
    { id:"fra3",    name:"France Championnat National",  country:"France",       tier:"professional" },
    { id:"esp3",    name:"Spain Primera Federación",     country:"Spain",        tier:"professional" },
    { id:"lat1",    name:"Latvia Higher League",         country:"Latvia",       tier:"professional" },
    { id:"swe-u21", name:"Sweden U21",                   country:"Sweden",       tier:"development"  },
    { id:"ned-u21", name:"Netherlands U21",              country:"Netherlands",  tier:"development"  },
    { id:"por-u23", name:"Portugal U23",                 country:"Portugal",     tier:"development"  },
    { id:"eng-u18", name:"Premier League U18",           country:"England",      tier:"development"  },
    { id:"ger-u19", name:"Germany U19",                  country:"Germany",      tier:"development"  },
    { id:"rou-u19", name:"Romania U19",                  country:"Romania",      tier:"development"  },
    { id:"sui-u19", name:"Switzerland U19 Elite",        country:"Switzerland",  tier:"development"  },
  ];

  // ---- Position-specific stats generator ----
  function posStats(pos, rating, apps, seed) {
    const s = seed || 1;
    const rnd = (n) => Math.abs((Math.sin(s * 127 + n * 311) % 1));
    const r = rating, a = Math.max(1, apps);
    if (pos === "FW") return {
      xG:             +(r * 0.38 * (a / 28) + rnd(1) * 2.5).toFixed(1),
      shots:          Math.max(5, Math.round(r * 2.3 * (a / 28) + rnd(2) * 8)),
      shotsOnTarget:  Math.max(2, Math.round(r * 1.15 * (a / 28) + rnd(3) * 4)),
      conversionRate: +(10 + (r - 7) * 3.5 + rnd(4) * 6).toFixed(1),
      dribbles:       Math.max(3, Math.round(r * 1.4 * (a / 28) + rnd(5) * 5)),
    };
    if (pos === "MF") return {
      keyPasses:         Math.max(5, Math.round(r * 0.9 * (a / 28) + rnd(1) * 6)),
      passAcc:           Math.min(96, Math.max(72, Math.round(80 + (r - 7) * 3 + rnd(2) * 5))),
      chancesCreated:    Math.max(3, Math.round(r * 0.55 * (a / 28) + rnd(3) * 4)),
      progressivePasses: Math.max(10, Math.round(r * 3.0 * (a / 28) + rnd(4) * 10)),
      pressingSucc:      Math.max(5, Math.round(r * 1.0 * (a / 28) + rnd(5) * 4)),
    };
    if (pos === "DF") return {
      tackles:       Math.max(8, Math.round(r * 2.0 * (a / 28) + rnd(1) * 8)),
      clearances:    Math.max(10, Math.round(r * 3.2 * (a / 28) + rnd(2) * 12)),
      interceptions: Math.max(6, Math.round(r * 1.7 * (a / 28) + rnd(3) * 6)),
      aerialWon:     Math.max(8, Math.round(r * 1.9 * (a / 28) + rnd(4) * 8)),
      blockShots:    Math.max(2, Math.round(r * 0.75 * (a / 28) + rnd(5) * 3)),
    };
    if (pos === "GK") return {
      saves:         Math.max(20, Math.round(r * 3.4 * (a / 28) + rnd(1) * 10)),
      savePerc:      +(65 + (r - 7) * 4 + rnd(2) * 6).toFixed(1),
      cleanSheets:   Math.max(2, Math.round(r * 0.85 * (a / 28) + rnd(3) * 3)),
      goalsConceded: Math.max(8, Math.round((10.5 - r) * 1.5 * (a / 28) + rnd(4) * 5)),
      sweepActions:  Math.max(2, Math.round(r * 0.65 * (a / 28) + rnd(5) * 3)),
    };
    return {};
  }

  // ---- Match history generator ----
  const OPP = [
    "FC Ribeira","Olympia SV","Coastal FC","Meridian City","Falcão SC",
    "Vallensa United","Köln Adler","Porto Azul","Highmoor FC","Cádiz Marina",
    "Estrella Roja","Vento FC","Lyonne AC","Borges United","Saint-Croix",
    "Delta Lagos","Nordvik IF","Atlético Sur","FC Westend","Balear CF",
  ];
  function matchHistory(o, seed) {
    const s = seed || 1;
    const rnd = (i, n) => Math.abs(Math.sin(s * 53 + i * 179 + n * 311) % 1);
    const results = ["W","W","W","D","L"];
    return Array.from({ length: 20 }, (_, i) => {
      const started = i < 16 || rnd(i, 9) > 0.35;
      const mins = started ? Math.round(60 + rnd(i, 10) * 30) : Math.round(5 + rnd(i, 11) * 30);
      const rating = +(o.rating - 0.9 + rnd(i, 12) * 1.8).toFixed(1);
      const goals = o.pos === "FW" ? (rnd(i, 13) < 0.40 ? (rnd(i, 14) < 0.15 ? 2 : 1) : 0)
        : o.pos === "MF" ? (rnd(i, 13) < 0.18 ? 1 : 0) : (rnd(i, 13) < 0.05 ? 1 : 0);
      const assists = o.pos === "MF" ? (rnd(i, 15) < 0.35 ? 1 : 0)
        : o.pos === "FW" ? (rnd(i, 15) < 0.24 ? 1 : 0) : (rnd(i, 15) < 0.08 ? 1 : 0);
      const mth = Math.floor(i / 2);
      const day = 8 + (i % 2) * 7;
      const months = ["Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May"];
      return {
        date: months[mth] + " " + day,
        opponent: OPP[i % OPP.length],
        result: results[Math.floor(rnd(i, 16) * results.length)],
        rating: Math.max(5.5, Math.min(9.5, rating)),
        goals, assists, minutes: mins, started,
      };
    });
  }

  // ---- Player factory ----
  let _id = 1;
  function P(o) {
    const id = _id++;
    const avColor = AVCOL[id % AVCOL.length];
    const leagueName = (LEAGUES.find(l => l.id === o.leagueId) || {}).name || "";
    return Object.assign({
      id, avColor,
      initials: o.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(),
      flag: NATIONS[o.nation] || "🏳️",
      perf: series(12, o.rating * 10 - 15, 7, o.form || 1.2),
      mvTrend: series(12, o.mvNum * 0.62, o.mvNum * 0.05, o.mvNum * 0.032),
      ratings: series(8, o.rating, 0.7, 0.04),
      league: leagueName,
      positionStats: posStats(o.pos, o.rating, o.apps, id),
      matchHistory: matchHistory(o, id),
    }, o);
  }

  // =================== PLAYERS ===================
  const PLAYERS = [
    // ---- Existing agency roster (18) — leagueId added ----
    P({name:"Mateo Rivas",     pos:"FW", posFull:"Forward",      age:21, nation:"Argentina",  club:"Atlético Verano",   leagueId:"por1",    mv:"€42.0M", mvNum:42,   expiry:"2027-06", status:"Active",        agent:"D. Duarte",   rating:7.9, apps:28, goals:19, assists:7,  passAcc:81, mins:2380, height:"1.83m", foot:"Right", tier:"elite",   form:1.6}),
    P({name:"Luka Veselin",    pos:"MF", posFull:"Att. Midfield", age:23, nation:"Croatia",    club:"Olympia Nord",      leagueId:"den1",    mv:"€31.5M", mvNum:31.5, expiry:"2026-06", status:"Active",        agent:"S. Marín",    rating:7.6, apps:31, goals:8,  assists:14, passAcc:89, mins:2710, height:"1.79m", foot:"Left",  tier:"key",     form:1.1}),
    P({name:"Idriss Camara",   pos:"DF", posFull:"Centre-Back",  age:24, nation:"Senegal",    club:"Ribera CF",         leagueId:"esp2",    mv:"€24.0M", mvNum:24,   expiry:"2025-12", status:"Contract Risk", agent:"D. Duarte",   rating:7.3, apps:30, goals:2,  assists:1,  passAcc:91, mins:2700, height:"1.91m", foot:"Right", tier:"key",     form:0.5}),
    P({name:"Théo Lamballe",   pos:"GK", posFull:"Goalkeeper",   age:26, nation:"France",     club:"Meridian City",     leagueId:"bel1",    mv:"€18.5M", mvNum:18.5, expiry:"2028-06", status:"Active",        agent:"S. Marín",    rating:7.4, apps:29, goals:0,  assists:0,  passAcc:78, mins:2610, height:"1.94m", foot:"Right", tier:"key",     form:0.3}),
    P({name:"Bruno Sável",     pos:"FW", posFull:"Winger",       age:19, nation:"Portugal",   club:"Falcão SC",         leagueId:"por2",    mv:"€15.0M", mvNum:15,   expiry:"2027-06", status:"Prospect",      agent:"L. Ferreira", rating:7.1, apps:24, goals:9,  assists:11, passAcc:83, mins:1980, height:"1.75m", foot:"Right", tier:"prospect",form:2.1}),
    P({name:"Adewale Okoye",   pos:"MF", posFull:"Def. Midfield",age:22, nation:"Nigeria",    club:"Vallensa United",   leagueId:"ned2",    mv:"€22.0M", mvNum:22,   expiry:"2026-12", status:"Active",        agent:"D. Duarte",   rating:7.5, apps:33, goals:3,  assists:5,  passAcc:88, mins:2890, height:"1.85m", foot:"Right", tier:"key",     form:0.8}),
    P({name:"Niklas Brandt",   pos:"DF", posFull:"Right-Back",   age:25, nation:"Germany",    club:"Köln Adler",        leagueId:"ger2",    mv:"€16.5M", mvNum:16.5, expiry:"2026-06", status:"Active",        agent:"S. Marín",    rating:7.2, apps:27, goals:1,  assists:6,  passAcc:85, mins:2380, height:"1.81m", foot:"Right", tier:"squad",   form:0.6}),
    P({name:"Rafael Pinto",    pos:"FW", posFull:"Striker",      age:28, nation:"Brazil",     club:"Porto Azul",        leagueId:"por1",    mv:"€28.0M", mvNum:28,   expiry:"2025-06", status:"Contract Risk", agent:"L. Ferreira", rating:7.7, apps:30, goals:21, assists:4,  passAcc:79, mins:2540, height:"1.88m", foot:"Left",  tier:"key",     form:0.9}),
    P({name:"Joel Hartman",    pos:"MF", posFull:"Central Mid",  age:20, nation:"England",    club:"Highmoor FC",       leagueId:"swe1",    mv:"€19.0M", mvNum:19,   expiry:"2028-06", status:"Prospect",      agent:"D. Duarte",   rating:7.0, apps:22, goals:4,  assists:8,  passAcc:86, mins:1760, height:"1.80m", foot:"Right", tier:"prospect",form:1.8}),
    P({name:"Diego Marín",     pos:"DF", posFull:"Centre-Back",  age:27, nation:"Spain",      club:"Cádiz Marina",      leagueId:"esp2",    mv:"€12.0M", mvNum:12,   expiry:"2026-06", status:"Active",        agent:"S. Marín",    rating:7.1, apps:28, goals:3,  assists:0,  passAcc:90, mins:2520, height:"1.89m", foot:"Right", tier:"squad",   form:0.4}),
    P({name:"Yuki Tanabe",     pos:"MF", posFull:"Winger",       age:21, nation:"Japan",      club:"Vento FC",          leagueId:"aut1",    mv:"€17.5M", mvNum:17.5, expiry:"2027-06", status:"Active",        agent:"L. Ferreira", rating:7.3, apps:29, goals:7,  assists:10, passAcc:84, mins:2340, height:"1.72m", foot:"Left",  tier:"key",     form:1.4}),
    P({name:"Karim El Fassi",  pos:"FW", posFull:"Forward",      age:23, nation:"Morocco",    club:"Lyonne AC",         leagueId:"fra3",    mv:"€26.5M", mvNum:26.5, expiry:"2027-12", status:"Active",        agent:"D. Duarte",   rating:7.6, apps:31, goals:15, assists:9,  passAcc:82, mins:2680, height:"1.84m", foot:"Right", tier:"key",     form:1.3}),
    P({name:"Anton Skov",      pos:"FW", posFull:"Striker",      age:18, nation:"Norway",     club:"Nordvik IF",        leagueId:"den1",    mv:"€9.5M",  mvNum:9.5,  expiry:"2027-06", status:"Prospect",      agent:"L. Ferreira", rating:6.9, apps:19, goals:11, assists:3,  passAcc:77, mins:1480, height:"1.90m", foot:"Right", tier:"prospect",form:2.4}),
    P({name:"Felipe Andrade",  pos:"DF", posFull:"Left-Back",    age:24, nation:"Brazil",     club:"Delta Lagos",       leagueId:"lat1",    mv:"€14.0M", mvNum:14,   expiry:"2026-06", status:"Active",        agent:"S. Marín",    rating:7.0, apps:26, goals:2,  assists:7,  passAcc:84, mins:2300, height:"1.78m", foot:"Left",  tier:"squad",   form:0.7}),
    P({name:"Sergio Bonilla",  pos:"MF", posFull:"Att. Midfield",age:26, nation:"Colombia",   club:"Estrella Roja",     leagueId:"esp3",    mv:"€20.5M", mvNum:20.5, expiry:"2025-12", status:"Contract Risk", agent:"D. Duarte",   rating:7.4, apps:30, goals:10, assists:12, passAcc:87, mins:2610, height:"1.76m", foot:"Right", tier:"key",     form:0.6}),
    P({name:"Lars Ophoven",    pos:"DF", posFull:"Centre-Back",  age:22, nation:"Netherlands",club:"Borges United",     leagueId:"ned2",    mv:"€13.5M", mvNum:13.5, expiry:"2028-06", status:"Prospect",      agent:"L. Ferreira", rating:7.0, apps:25, goals:1,  assists:2,  passAcc:89, mins:2200, height:"1.92m", foot:"Left",  tier:"prospect",form:1.5}),
    P({name:"Emiliano Sosa",   pos:"GK", posFull:"Goalkeeper",   age:29, nation:"Uruguay",    club:"Saint-Croix",       leagueId:"bel2",    mv:"€10.0M", mvNum:10,   expiry:"2026-06", status:"Active",        agent:"S. Marín",    rating:7.2, apps:30, goals:0,  assists:0,  passAcc:75, mins:2700, height:"1.93m", foot:"Right", tier:"squad",   form:0.2}),
    P({name:"Gabriel Nunes",   pos:"FW", posFull:"Winger",       age:20, nation:"Brazil",     club:"Maple Rovers",      leagueId:"swe1",    mv:"€21.0M", mvNum:21,   expiry:"2027-06", status:"Active",        agent:"D. Duarte",   rating:7.4, apps:27, goals:12, assists:8,  passAcc:80, mins:2280, height:"1.74m", foot:"Right", tier:"key",     form:1.7}),

    // ---- Liga Portugal (por1) ----
    P({name:"João Ferreira",   pos:"FW", posFull:"Forward",      age:22, nation:"Portugal",   club:"Lusitano FC",       leagueId:"por1",    mv:"€8.5M",  mvNum:8.5,  expiry:"2027-06", status:"Active",   agent:"—", rating:7.3, apps:26, goals:13, assists:5,  passAcc:79, mins:2180, height:"1.82m", foot:"Right", tier:"key",     form:1.2}),
    P({name:"Pedro Gomes",     pos:"MF", posFull:"Central Mid",  age:25, nation:"Portugal",   club:"Sporting Atlético", leagueId:"por1",    mv:"€12.0M", mvNum:12,   expiry:"2027-12", status:"Active",   agent:"—", rating:7.4, apps:29, goals:5,  assists:11, passAcc:88, mins:2510, height:"1.78m", foot:"Right", tier:"key",     form:0.9}),
    P({name:"Cristiano Barros",pos:"DF", posFull:"Centre-Back",  age:23, nation:"Brazil",     club:"FC Noroeste",       leagueId:"por1",    mv:"€9.0M",  mvNum:9,    expiry:"2028-06", status:"Prospect", agent:"—", rating:7.1, apps:27, goals:2,  assists:1,  passAcc:87, mins:2360, height:"1.90m", foot:"Right", tier:"prospect",form:1.3}),
    P({name:"Nuno Peixe",      pos:"GK", posFull:"Goalkeeper",   age:28, nation:"Portugal",   club:"Varzim SC",         leagueId:"por1",    mv:"€6.5M",  mvNum:6.5,  expiry:"2026-06", status:"Active",   agent:"—", rating:7.2, apps:28, goals:0,  assists:0,  passAcc:76, mins:2520, height:"1.91m", foot:"Right", tier:"squad",   form:0.3}),

    // ---- Spain Segunda (esp2) ----
    P({name:"Álvaro Castillo", pos:"FW", posFull:"Striker",      age:23, nation:"Spain",      club:"FC Torrente",       leagueId:"esp2",    mv:"€11.0M", mvNum:11,   expiry:"2026-06", status:"Active",   agent:"—", rating:7.2, apps:28, goals:14, assists:4,  passAcc:78, mins:2300, height:"1.84m", foot:"Right", tier:"key",     form:1.0}),
    P({name:"Pablo Ruiz",      pos:"MF", posFull:"Att. Midfield",age:26, nation:"Spain",      club:"UD Montería",       leagueId:"esp2",    mv:"€8.0M",  mvNum:8,    expiry:"2026-12", status:"Active",   agent:"—", rating:7.1, apps:30, goals:6,  assists:9,  passAcc:85, mins:2590, height:"1.77m", foot:"Left",  tier:"squad",   form:0.8}),
    P({name:"Roberto Lara",    pos:"DF", posFull:"Centre-Back",  age:24, nation:"Spain",      club:"Atlético Sur",      leagueId:"esp2",    mv:"€7.5M",  mvNum:7.5,  expiry:"2027-06", status:"Active",   agent:"—", rating:7.0, apps:27, goals:1,  assists:2,  passAcc:88, mins:2360, height:"1.88m", foot:"Right", tier:"squad",   form:0.5}),

    // ---- Italy Serie B (ita2) ----
    P({name:"Lorenzo Ferrari", pos:"FW", posFull:"Forward",      age:22, nation:"Italy",      club:"AC Reggio",         leagueId:"ita2",    mv:"€9.5M",  mvNum:9.5,  expiry:"2027-06", status:"Active",   agent:"—", rating:7.2, apps:27, goals:13, assists:5,  passAcc:80, mins:2240, height:"1.81m", foot:"Right", tier:"key",     form:1.1}),
    P({name:"Marco Conti",     pos:"MF", posFull:"Central Mid",  age:25, nation:"Italy",      club:"FC Brescia Sud",    leagueId:"ita2",    mv:"€10.0M", mvNum:10,   expiry:"2026-06", status:"Active",   agent:"—", rating:7.3, apps:30, goals:4,  assists:10, passAcc:87, mins:2640, height:"1.79m", foot:"Right", tier:"key",     form:0.7}),
    P({name:"Alessandro Vitali",pos:"DF",posFull:"Centre-Back",  age:26, nation:"Italy",      club:"Genova FC",         leagueId:"ita2",    mv:"€8.0M",  mvNum:8,    expiry:"2026-12", status:"Active",   agent:"—", rating:7.1, apps:28, goals:2,  assists:1,  passAcc:86, mins:2450, height:"1.89m", foot:"Right", tier:"squad",   form:0.4}),

    // ---- Germany Bundesliga 2 (ger2) ----
    P({name:"Lukas Wagner",    pos:"FW", posFull:"Striker",      age:23, nation:"Germany",    club:"Westend FC",        leagueId:"ger2",    mv:"€14.0M", mvNum:14,   expiry:"2027-06", status:"Active",   agent:"—", rating:7.4, apps:29, goals:16, assists:5,  passAcc:80, mins:2480, height:"1.87m", foot:"Right", tier:"key",     form:1.2}),
    P({name:"Max Schreiber",   pos:"MF", posFull:"Def. Midfield",age:24, nation:"Germany",    club:"Berlin Select",     leagueId:"ger2",    mv:"€11.5M", mvNum:11.5, expiry:"2027-12", status:"Active",   agent:"—", rating:7.3, apps:31, goals:3,  assists:8,  passAcc:89, mins:2710, height:"1.82m", foot:"Right", tier:"key",     form:0.9}),
    P({name:"Tim Vogt",        pos:"DF", posFull:"Right-Back",   age:22, nation:"Germany",    club:"Hamburg Star",      leagueId:"ger2",    mv:"€9.0M",  mvNum:9,    expiry:"2028-06", status:"Prospect", agent:"—", rating:7.1, apps:26, goals:1,  assists:5,  passAcc:84, mins:2220, height:"1.80m", foot:"Right", tier:"prospect",form:1.4}),

    // ---- Denmark Superliga (den1) ----
    P({name:"Mikkel Andersen", pos:"FW", posFull:"Winger",       age:21, nation:"Denmark",    club:"Copenhagen FC",     leagueId:"den1",    mv:"€8.0M",  mvNum:8,    expiry:"2027-06", status:"Active",   agent:"—", rating:7.2, apps:25, goals:10, assists:7,  passAcc:81, mins:2050, height:"1.76m", foot:"Left",  tier:"key",     form:1.5}),
    P({name:"Christian Berg",  pos:"MF", posFull:"Central Mid",  age:24, nation:"Denmark",    club:"Aarhus BK",         leagueId:"den1",    mv:"€9.5M",  mvNum:9.5,  expiry:"2026-06", status:"Active",   agent:"—", rating:7.3, apps:28, goals:5,  assists:9,  passAcc:86, mins:2380, height:"1.81m", foot:"Right", tier:"key",     form:0.8}),

    // ---- Belgium Pro League (bel1) ----
    P({name:"Ruben Janssen",   pos:"MF", posFull:"Att. Midfield",age:23, nation:"Belgium",    club:"Gent Select",       leagueId:"bel1",    mv:"€11.0M", mvNum:11,   expiry:"2027-06", status:"Active",   agent:"—", rating:7.3, apps:29, goals:7,  assists:11, passAcc:86, mins:2490, height:"1.78m", foot:"Right", tier:"key",     form:1.1}),
    P({name:"Ahmed Diallo",    pos:"FW", posFull:"Forward",      age:22, nation:"Senegal",    club:"Standard B",        leagueId:"bel1",    mv:"€9.0M",  mvNum:9,    expiry:"2026-06", status:"Active",   agent:"—", rating:7.1, apps:26, goals:11, assists:4,  passAcc:78, mins:2100, height:"1.85m", foot:"Right", tier:"key",     form:1.3}),

    // ---- Netherlands Eerste Divisie (ned2) ----
    P({name:"Stefan van Dijk", pos:"FW", posFull:"Striker",      age:21, nation:"Netherlands",club:"Ajax B",            leagueId:"ned2",    mv:"€10.5M", mvNum:10.5, expiry:"2027-06", status:"Prospect", agent:"—", rating:7.2, apps:24, goals:13, assists:4,  passAcc:79, mins:1960, height:"1.83m", foot:"Right", tier:"prospect",form:1.8}),
    P({name:"Thomas Visser",   pos:"MF", posFull:"Central Mid",  age:23, nation:"Netherlands",club:"PSV B",             leagueId:"ned2",    mv:"€9.0M",  mvNum:9,    expiry:"2026-12", status:"Active",   agent:"—", rating:7.1, apps:27, goals:3,  assists:8,  passAcc:87, mins:2290, height:"1.80m", foot:"Right", tier:"squad",   form:0.9}),

    // ---- Austria Bundesliga (aut1) ----
    P({name:"Lukas Müller",    pos:"FW", posFull:"Striker",      age:22, nation:"Austria",    club:"Rapid Wien B",      leagueId:"aut1",    mv:"€7.5M",  mvNum:7.5,  expiry:"2027-06", status:"Active",   agent:"—", rating:7.0, apps:25, goals:10, assists:3,  passAcc:77, mins:2010, height:"1.86m", foot:"Right", tier:"squad",   form:0.9}),
    P({name:"David Gruber",    pos:"MF", posFull:"Def. Midfield",age:25, nation:"Austria",    club:"Salzburg B",        leagueId:"aut1",    mv:"€9.0M",  mvNum:9,    expiry:"2026-06", status:"Active",   agent:"—", rating:7.2, apps:28, goals:2,  assists:6,  passAcc:88, mins:2440, height:"1.82m", foot:"Right", tier:"squad",   form:0.6}),

    // ---- Sweden Allsvenskan (swe1) ----
    P({name:"Erik Lindgren",   pos:"FW", posFull:"Winger",       age:22, nation:"Sweden",     club:"Malmö Select",      leagueId:"swe1",    mv:"€8.0M",  mvNum:8,    expiry:"2026-06", status:"Active",   agent:"—", rating:7.1, apps:24, goals:9,  assists:6,  passAcc:80, mins:1980, height:"1.77m", foot:"Left",  tier:"squad",   form:1.2}),
    P({name:"Viktor Svensson", pos:"MF", posFull:"Central Mid",  age:24, nation:"Sweden",     club:"Gothenburg FC",     leagueId:"swe1",    mv:"€9.5M",  mvNum:9.5,  expiry:"2027-06", status:"Active",   agent:"—", rating:7.2, apps:27, goals:4,  assists:9,  passAcc:85, mins:2310, height:"1.80m", foot:"Right", tier:"key",     form:0.8}),

    // ---- France Championnat National (fra3) ----
    P({name:"Théo Girard",     pos:"FW", posFull:"Forward",      age:21, nation:"France",     club:"Nantes B",          leagueId:"fra3",    mv:"€7.0M",  mvNum:7,    expiry:"2026-06", status:"Active",   agent:"—", rating:7.0, apps:23, goals:9,  assists:4,  passAcc:78, mins:1870, height:"1.80m", foot:"Right", tier:"squad",   form:1.0}),
    P({name:"Lucas Bernard",   pos:"MF", posFull:"Att. Midfield",age:23, nation:"France",     club:"Lyon B",            leagueId:"fra3",    mv:"€8.5M",  mvNum:8.5,  expiry:"2027-06", status:"Active",   agent:"—", rating:7.1, apps:27, goals:6,  assists:8,  passAcc:84, mins:2280, height:"1.76m", foot:"Right", tier:"squad",   form:0.7}),

    // ---- Portugal Liga 2 (por2) ----
    P({name:"Tiago Correia",   pos:"FW", posFull:"Winger",       age:20, nation:"Portugal",   club:"Varzim B",          leagueId:"por2",    mv:"€6.5M",  mvNum:6.5,  expiry:"2027-06", status:"Prospect", agent:"—", rating:6.9, apps:22, goals:8,  assists:5,  passAcc:79, mins:1740, height:"1.75m", foot:"Left",  tier:"prospect",form:1.7}),
    P({name:"Paulo Almeida",   pos:"DF", posFull:"Centre-Back",  age:24, nation:"Portugal",   club:"FC Póvoa",          leagueId:"por2",    mv:"€5.5M",  mvNum:5.5,  expiry:"2026-06", status:"Active",   agent:"—", rating:6.8, apps:25, goals:1,  assists:1,  passAcc:85, mins:2150, height:"1.88m", foot:"Right", tier:"squad",   form:0.4}),

    // ---- Greece Super League (gre1) ----
    P({name:"Nikos Papadopoulos",pos:"FW",posFull:"Forward",     age:23, nation:"Greece",     club:"Olympiacos B",      leagueId:"gre1",    mv:"€8.0M",  mvNum:8,    expiry:"2026-06", status:"Active",   agent:"—", rating:7.1, apps:26, goals:11, assists:4,  passAcc:79, mins:2140, height:"1.83m", foot:"Right", tier:"key",     form:1.0}),
    P({name:"Kostas Stavros",  pos:"MF", posFull:"Central Mid",  age:25, nation:"Greece",     club:"PAOK Select",       leagueId:"gre1",    mv:"€7.5M",  mvNum:7.5,  expiry:"2027-06", status:"Active",   agent:"—", rating:7.0, apps:27, goals:3,  assists:7,  passAcc:84, mins:2290, height:"1.79m", foot:"Right", tier:"squad",   form:0.7}),

    // ---- Germany 3. Liga (ger3) ----
    P({name:"Finn Hoffmann",   pos:"FW", posFull:"Forward",      age:20, nation:"Germany",    club:"Augsburg B",        leagueId:"ger3",    mv:"€5.0M",  mvNum:5,    expiry:"2027-06", status:"Prospect", agent:"—", rating:6.9, apps:21, goals:8,  assists:3,  passAcc:77, mins:1680, height:"1.85m", foot:"Right", tier:"prospect",form:1.9}),
    P({name:"Nico Becker",     pos:"MF", posFull:"Att. Midfield",age:22, nation:"Germany",    club:"Leipzig B",         leagueId:"ger3",    mv:"€6.5M",  mvNum:6.5,  expiry:"2026-06", status:"Active",   agent:"—", rating:7.0, apps:24, goals:5,  assists:7,  passAcc:83, mins:1980, height:"1.77m", foot:"Left",  tier:"squad",   form:1.1}),

    // ---- Spain Primera Federación (esp3) ----
    P({name:"Adrián Moreno",   pos:"FW", posFull:"Winger",       age:20, nation:"Spain",      club:"Barça B",           leagueId:"esp3",    mv:"€6.0M",  mvNum:6,    expiry:"2026-06", status:"Prospect", agent:"—", rating:7.0, apps:22, goals:8,  assists:6,  passAcc:81, mins:1780, height:"1.73m", foot:"Left",  tier:"prospect",form:1.6}),
    P({name:"Sergio Delgado",  pos:"MF", posFull:"Central Mid",  age:22, nation:"Spain",      club:"Sevilla B",         leagueId:"esp3",    mv:"€5.5M",  mvNum:5.5,  expiry:"2026-12", status:"Active",   agent:"—", rating:6.9, apps:24, goals:4,  assists:6,  passAcc:84, mins:1980, height:"1.78m", foot:"Right", tier:"squad",   form:0.9}),

    // ---- Bulgaria First League (bul1) ----
    P({name:"Nikolay Petrov",  pos:"FW", posFull:"Striker",      age:23, nation:"Bulgaria",   club:"Sofia FC",          leagueId:"bul1",    mv:"€4.5M",  mvNum:4.5,  expiry:"2026-06", status:"Active",   agent:"—", rating:6.8, apps:24, goals:9,  assists:3,  passAcc:75, mins:1940, height:"1.87m", foot:"Right", tier:"squad",   form:0.8}),

    // ---- Russia Premier League (rus1) ----
    P({name:"Ivan Kozlov",     pos:"MF", posFull:"Def. Midfield",age:25, nation:"Russia",     club:"Spartak B",         leagueId:"rus1",    mv:"€6.0M",  mvNum:6,    expiry:"2026-06", status:"Active",   agent:"—", rating:7.0, apps:26, goals:2,  assists:5,  passAcc:86, mins:2240, height:"1.83m", foot:"Right", tier:"squad",   form:0.6}),

    // ---- Latvia Higher League (lat1) ----
    P({name:"Arturs Bērziņš",  pos:"FW", posFull:"Forward",      age:22, nation:"Latvia",     club:"RFS Riga",          leagueId:"lat1",    mv:"€1.5M",  mvNum:1.5,  expiry:"2026-06", status:"Active",   agent:"—", rating:6.7, apps:22, goals:7,  assists:3,  passAcc:75, mins:1760, height:"1.80m", foot:"Right", tier:"squad",   form:0.7}),

    // ---- Greece Super League 2 (gre2) ----
    P({name:"Alexandros Tsakiris",pos:"MF",posFull:"Central Mid",age:22, nation:"Greece",     club:"Kerkyra BK",        leagueId:"gre2",    mv:"€3.0M",  mvNum:3,    expiry:"2026-06", status:"Active",   agent:"—", rating:6.8, apps:23, goals:3,  assists:5,  passAcc:82, mins:1880, height:"1.78m", foot:"Right", tier:"squad",   form:0.5}),

    // ---- Belgium Challenger (bel2) ----
    P({name:"Jonas Declercq",  pos:"DF", posFull:"Centre-Back",  age:23, nation:"Belgium",    club:"OH Leuven B",       leagueId:"bel2",    mv:"€4.0M",  mvNum:4,    expiry:"2026-06", status:"Active",   agent:"—", rating:6.9, apps:24, goals:1,  assists:1,  passAcc:84, mins:2020, height:"1.90m", foot:"Right", tier:"squad",   form:0.5}),

    // ---- Development Leagues ----
    P({name:"Oscar Nilsson",   pos:"FW", posFull:"Winger",       age:19, nation:"Sweden",     club:"Malmö U21",         leagueId:"swe-u21", mv:"€3.0M",  mvNum:3,    expiry:"2027-06", status:"Prospect", agent:"—", rating:6.8, apps:18, goals:7,  assists:4,  passAcc:78, mins:1380, height:"1.76m", foot:"Left",  tier:"prospect",form:2.1}),
    P({name:"Daan de Vries",   pos:"MF", posFull:"Central Mid",  age:19, nation:"Netherlands",club:"Ajax U21",          leagueId:"ned-u21", mv:"€4.5M",  mvNum:4.5,  expiry:"2027-06", status:"Prospect", agent:"—", rating:7.0, apps:20, goals:4,  assists:7,  passAcc:85, mins:1600, height:"1.79m", foot:"Right", tier:"prospect",form:1.8}),
    P({name:"Gonçalo Moreira", pos:"FW", posFull:"Forward",      age:20, nation:"Portugal",   club:"Benfica B",         leagueId:"por-u23", mv:"€5.5M",  mvNum:5.5,  expiry:"2026-06", status:"Prospect", agent:"—", rating:7.0, apps:21, goals:10, assists:4,  passAcc:80, mins:1680, height:"1.81m", foot:"Right", tier:"prospect",form:1.9}),
    P({name:"Callum Wright",   pos:"MF", posFull:"Att. Midfield",age:17, nation:"England",    club:"Man City U18",      leagueId:"eng-u18", mv:"€3.5M",  mvNum:3.5,  expiry:"2026-06", status:"Prospect", agent:"—", rating:7.1, apps:19, goals:5,  assists:8,  passAcc:84, mins:1480, height:"1.74m", foot:"Right", tier:"prospect",form:2.3}),
    P({name:"Luca Schneider",  pos:"FW", posFull:"Striker",      age:18, nation:"Germany",    club:"Bayern U19",        leagueId:"ger-u19", mv:"€4.0M",  mvNum:4,    expiry:"2026-06", status:"Prospect", agent:"—", rating:6.9, apps:20, goals:12, assists:3,  passAcc:76, mins:1580, height:"1.86m", foot:"Right", tier:"prospect",form:2.0}),
    P({name:"Andrei Ionescu",  pos:"FW", posFull:"Winger",       age:18, nation:"Romania",    club:"Steaua B U19",      leagueId:"rou-u19", mv:"€2.5M",  mvNum:2.5,  expiry:"2026-06", status:"Prospect", agent:"—", rating:6.7, apps:17, goals:6,  assists:5,  passAcc:77, mins:1260, height:"1.78m", foot:"Right", tier:"prospect",form:1.8}),
    P({name:"Noah Keller",     pos:"MF", posFull:"Central Mid",  age:18, nation:"Switzerland",club:"Basel U19",         leagueId:"sui-u19", mv:"€3.0M",  mvNum:3,    expiry:"2026-06", status:"Prospect", agent:"—", rating:6.8, apps:18, goals:3,  assists:6,  passAcc:83, mins:1380, height:"1.77m", foot:"Right", tier:"prospect",form:1.6}),
  ];

  // ---- Recruitment targets ----
  const TARGETS = [
    {name:"Tomás Iglesias", pos:"FW", club:"Río Sur",    mv:"€8.0M",  scout:8.4, stage:"identified",  nation:"Spain",    age:19},
    {name:"Kwame Asante",   pos:"MF", club:"Accra Lions",mv:"€6.5M",  scout:8.1, stage:"identified",  nation:"Nigeria",  age:18},
    {name:"Dario Vinci",    pos:"DF", club:"Genova FC",  mv:"€11.0M", scout:7.8, stage:"review",      nation:"Croatia",  age:21},
    {name:"Pierre Aubry",   pos:"FW", club:"Nantes B",   mv:"€9.0M",  scout:8.6, stage:"review",      nation:"France",   age:20},
    {name:"Stefan Marković",pos:"GK", club:"Beograd SK", mv:"€5.0M",  scout:7.5, stage:"scouted",     nation:"Croatia",  age:22},
    {name:"Lamine Diatta",  pos:"DF", club:"Dakar AC",   mv:"€7.5M",  scout:8.2, stage:"scouted",     nation:"Senegal",  age:19},
    {name:"Owen Brady",     pos:"MF", club:"Tyne Albion", mv:"€10.5M",scout:8.0, stage:"negotiation", nation:"England",  age:21},
    {name:"Nico Esteban",   pos:"FW", club:"Valle FC",   mv:"€13.0M", scout:8.7, stage:"negotiation", nation:"Argentina",age:20},
    {name:"Hugo Marchetti", pos:"MF", club:"Torino B",   mv:"€12.0M", scout:8.5, stage:"opportunity", nation:"France",   age:22},
    {name:"Bruno Sával",    pos:"FW", club:"Falcão SC",  mv:"€15.0M", scout:8.9, stage:"signed",      nation:"Portugal", age:19},
    {name:"Anton Skov",     pos:"FW", club:"Nordvik IF", mv:"€9.5M",  scout:8.3, stage:"signed",      nation:"Norway",   age:18},
    {name:"Reuben Falk",    pos:"DF", club:"Highmoor B", mv:"€4.0M",  scout:6.4, stage:"rejected",    nation:"Germany",  age:23},
  ];

  const STAGES = [
    {id:"identified",  label:"Identified",        color:"#8590ad"},
    {id:"review",      label:"Under Review",       color:"#5b82ff"},
    {id:"scouted",     label:"Scouted",            color:"#1d6f8f"},
    {id:"negotiation", label:"Negotiation",        color:"#e0a23c"},
    {id:"opportunity", label:"Active Opportunity", color:"#c8a24a"},
    {id:"signed",      label:"Signed",             color:"#3fae7a"},
    {id:"rejected",    label:"Rejected",           color:"#e0556b"},
  ];

  const SCOUTS = [
    {name:"Marco Solano",  region:"South America", players:14, due:3, av:"#2a6f5a"},
    {name:"Yara Haddad",   region:"North Africa",  players:11, due:1, av:"#7a3b8f"},
    {name:"Erik Lindqvist",region:"Scandinavia",   players:9,  due:2, av:"#1d6f8f"},
    {name:"Priya Anand",   region:"Europe / UK",   players:16, due:4, av:"#b8742a"},
  ];

  const AGENTS = [
    {name:"David Duarte",  role:"Founder & Lead Agent",  players:7, value:"€172M", av:"#1f3aa6", initials:"DD"},
    {name:"Sofía Marín",   role:"Senior Agent",           players:6, value:"€96M",  av:"#9a3550", initials:"SM"},
    {name:"Lucas Ferreira",role:"Agent — Talent ID",      players:5, value:"€68M",  av:"#2f7a44", initials:"LF"},
  ];

  const ACTIVITY = [
    {type:"report",   who:"Marco Solano",  text:"submitted a scout report on <b>Nico Esteban</b> — rating 8.7",         time:"12m ago",   icon:"clipboard"},
    {type:"player",   who:"Sofía Marín",   text:"added <b>Lars Ophoven</b> to the agency roster",                        time:"1h ago",    icon:"user-plus"},
    {type:"alert",    who:"System",        text:"Contract alert — <b>Rafael Pinto</b> expires in 30 days",               time:"2h ago",    icon:"alert"},
    {type:"contract", who:"David Duarte",  text:"updated contract terms for <b>Mateo Rivas</b>",                         time:"4h ago",    icon:"file"},
    {type:"perf",     who:"System",        text:"<b>Bruno Sável</b> rated 8.4 — season-best performance",                time:"6h ago",    icon:"trend"},
    {type:"report",   who:"Priya Anand",   text:"moved <b>Owen Brady</b> to Negotiation stage",                          time:"Yesterday", icon:"clipboard"},
    {type:"player",   who:"Lucas Ferreira",text:"flagged <b>Anton Skov</b> as a priority prospect",                      time:"Yesterday", icon:"star"},
  ];

  const NOTIFS = [
    {cat:"Contract",    title:"Contract expiring soon",  body:"Rafael Pinto's contract with Porto Azul expires in 30 days.",          time:"2h ago",  unread:true,  kind:"red"},
    {cat:"Scouting",    title:"New scout report",        body:"Marco Solano submitted a report on Nico Esteban (8.7).",               time:"12m ago", unread:true,  kind:"blue"},
    {cat:"Performance", title:"Performance milestone",   body:"Bruno Sável recorded a season-high match rating of 8.4.",              time:"6h ago",  unread:true,  kind:"green"},
    {cat:"Transfer",    title:"New transfer opportunity",body:"Meridian City registered interest in Mateo Rivas.",                    time:"1d ago",  unread:false, kind:"gold"},
    {cat:"Contract",    title:"Renewal signed",          body:"Karim El Fassi extended terms through 2027.",                          time:"2d ago",  unread:false, kind:"green"},
    {cat:"Scouting",    title:"Watchlist update",        body:"3 new prospects added to the South America region.",                   time:"3d ago",  unread:false, kind:"blue"},
  ];

  const DOCS = [
    {name:"Rivas_Contract_2024.pdf",   cat:"Contracts",       size:"2.4 MB", date:"Apr 2024", ext:"PDF", color:"#9a3550", owner:"Mateo Rivas"},
    {name:"Pinto_Renewal_Draft.pdf",   cat:"Contracts",       size:"1.1 MB", date:"May 2024", ext:"PDF", color:"#9a3550", owner:"Rafael Pinto"},
    {name:"Camara_Passport.jpg",       cat:"Passports",       size:"840 KB", date:"Jan 2024", ext:"IMG", color:"#1d6f8f", owner:"Idriss Camara"},
    {name:"Veselin_Passport.pdf",      cat:"Passports",       size:"610 KB", date:"Feb 2024", ext:"PDF", color:"#1d6f8f", owner:"Luka Veselin"},
    {name:"Medical_Rivas_Q1.pdf",      cat:"Medical",         size:"3.2 MB", date:"Mar 2024", ext:"PDF", color:"#2f7a44", owner:"Mateo Rivas"},
    {name:"Medical_Sável_Intake.pdf",  cat:"Medical",         size:"2.8 MB", date:"Apr 2024", ext:"PDF", color:"#2f7a44", owner:"Bruno Sável"},
    {name:"FIFA_Reg_Rivas.pdf",        cat:"Registrations",   size:"520 KB", date:"Apr 2024", ext:"PDF", color:"#b8742a", owner:"Mateo Rivas"},
    {name:"Reg_Okoye_2024.pdf",        cat:"Registrations",   size:"498 KB", date:"Mar 2024", ext:"PDF", color:"#b8742a", owner:"Adewale Okoye"},
    {name:"Scout_Esteban_Report.pdf",  cat:"Scouting Reports",size:"1.6 MB", date:"May 2024", ext:"PDF", color:"#1f3aa6", owner:"Nico Esteban"},
    {name:"Scout_Asante_Notes.docx",   cat:"Scouting Reports",size:"340 KB", date:"May 2024", ext:"DOC", color:"#1f3aa6", owner:"Kwame Asante"},
  ];

  // =================== BENCHMARKING AVERAGES ===================
  const POSITION_AVGS = {
    FW: { xG:8.4,  shots:44,  shotsOnTarget:22, conversionRate:13.8, dribbles:30 },
    MF: { keyPasses:18, passAcc:84, chancesCreated:12, progressivePasses:48, pressingSucc:17 },
    DF: { tackles:40, clearances:65, interceptions:33, aerialWon:38, blockShots:14 },
    GK: { saves:80, savePerc:71.5, cleanSheets:10, goalsConceded:30, sweepActions:12 },
  };

  const LEAGUE_AVGS = {
    por1: {
      FW: { xG:9.2,  shots:47,  shotsOnTarget:24, conversionRate:15.1, dribbles:33 },
      MF: { keyPasses:20, passAcc:86, chancesCreated:13, progressivePasses:51, pressingSucc:18 },
      DF: { tackles:42, clearances:68, interceptions:35, aerialWon:40, blockShots:15 },
      GK: { saves:84, savePerc:72.8, cleanSheets:11, goalsConceded:28, sweepActions:13 },
    },
    esp2: {
      FW: { xG:8.8,  shots:45,  shotsOnTarget:23, conversionRate:14.4, dribbles:31 },
      MF: { keyPasses:19, passAcc:85, chancesCreated:13, progressivePasses:50, pressingSucc:18 },
      DF: { tackles:41, clearances:67, interceptions:34, aerialWon:39, blockShots:15 },
      GK: { saves:82, savePerc:71.9, cleanSheets:10, goalsConceded:29, sweepActions:12 },
    },
    ita2: {
      FW: { xG:8.5,  shots:44,  shotsOnTarget:22, conversionRate:14.0, dribbles:29 },
      MF: { keyPasses:18, passAcc:85, chancesCreated:12, progressivePasses:49, pressingSucc:17 },
      DF: { tackles:40, clearances:66, interceptions:33, aerialWon:39, blockShots:14 },
      GK: { saves:81, savePerc:71.6, cleanSheets:10, goalsConceded:30, sweepActions:12 },
    },
    ger2: {
      FW: { xG:9.0,  shots:46,  shotsOnTarget:23, conversionRate:14.8, dribbles:32 },
      MF: { keyPasses:20, passAcc:87, chancesCreated:13, progressivePasses:52, pressingSucc:19 },
      DF: { tackles:42, clearances:67, interceptions:35, aerialWon:40, blockShots:15 },
      GK: { saves:83, savePerc:72.5, cleanSheets:11, goalsConceded:29, sweepActions:13 },
    },
    den1: {
      FW: { xG:8.2,  shots:43,  shotsOnTarget:21, conversionRate:13.5, dribbles:29 },
      MF: { keyPasses:18, passAcc:84, chancesCreated:12, progressivePasses:47, pressingSucc:17 },
      DF: { tackles:39, clearances:64, interceptions:32, aerialWon:37, blockShots:14 },
      GK: { saves:80, savePerc:71.2, cleanSheets:10, goalsConceded:31, sweepActions:12 },
    },
    bel1: {
      FW: { xG:8.6,  shots:44,  shotsOnTarget:22, conversionRate:14.2, dribbles:30 },
      MF: { keyPasses:19, passAcc:85, chancesCreated:13, progressivePasses:49, pressingSucc:18 },
      DF: { tackles:41, clearances:66, interceptions:34, aerialWon:39, blockShots:14 },
      GK: { saves:81, savePerc:71.8, cleanSheets:10, goalsConceded:30, sweepActions:12 },
    },
    ned2: {
      FW: { xG:8.0,  shots:42,  shotsOnTarget:21, conversionRate:13.2, dribbles:29 },
      MF: { keyPasses:18, passAcc:84, chancesCreated:12, progressivePasses:47, pressingSucc:17 },
      DF: { tackles:39, clearances:64, interceptions:32, aerialWon:37, blockShots:13 },
      GK: { saves:79, savePerc:70.8, cleanSheets:10, goalsConceded:31, sweepActions:11 },
    },
    swe1: {
      FW: { xG:7.8,  shots:41,  shotsOnTarget:20, conversionRate:13.0, dribbles:28 },
      MF: { keyPasses:17, passAcc:83, chancesCreated:11, progressivePasses:45, pressingSucc:16 },
      DF: { tackles:38, clearances:62, interceptions:31, aerialWon:36, blockShots:13 },
      GK: { saves:78, savePerc:70.5, cleanSheets:9,  goalsConceded:32, sweepActions:11 },
    },
    fra3: {
      FW: { xG:7.5,  shots:40,  shotsOnTarget:20, conversionRate:12.5, dribbles:27 },
      MF: { keyPasses:16, passAcc:82, chancesCreated:11, progressivePasses:44, pressingSucc:15 },
      DF: { tackles:37, clearances:61, interceptions:30, aerialWon:35, blockShots:12 },
      GK: { saves:77, savePerc:70.2, cleanSheets:9,  goalsConceded:33, sweepActions:11 },
    },
    aut1: {
      FW: { xG:7.8,  shots:41,  shotsOnTarget:20, conversionRate:13.1, dribbles:27 },
      MF: { keyPasses:17, passAcc:83, chancesCreated:11, progressivePasses:45, pressingSucc:16 },
      DF: { tackles:38, clearances:62, interceptions:31, aerialWon:36, blockShots:13 },
      GK: { saves:78, savePerc:70.6, cleanSheets:9,  goalsConceded:32, sweepActions:11 },
    },
    por2: { FW: { xG:7.2, shots:38, shotsOnTarget:19, conversionRate:12.0, dribbles:26 }, MF: { keyPasses:15, passAcc:81, chancesCreated:10, progressivePasses:42, pressingSucc:15 }, DF: { tackles:36, clearances:60, interceptions:29, aerialWon:34, blockShots:12 }, GK: { saves:75, savePerc:69.5, cleanSheets:8, goalsConceded:35, sweepActions:10 } },
    gre1: { FW: { xG:7.8, shots:41, shotsOnTarget:20, conversionRate:13.2, dribbles:28 }, MF: { keyPasses:17, passAcc:83, chancesCreated:11, progressivePasses:45, pressingSucc:16 }, DF: { tackles:38, clearances:62, interceptions:31, aerialWon:36, blockShots:13 }, GK: { saves:78, savePerc:70.4, cleanSheets:9, goalsConceded:32, sweepActions:11 } },
    ger3: { FW: { xG:7.0, shots:38, shotsOnTarget:19, conversionRate:11.8, dribbles:25 }, MF: { keyPasses:15, passAcc:81, chancesCreated:10, progressivePasses:42, pressingSucc:14 }, DF: { tackles:36, clearances:59, interceptions:29, aerialWon:33, blockShots:12 }, GK: { saves:75, savePerc:69.2, cleanSheets:8, goalsConceded:36, sweepActions:10 } },
    esp3: { FW: { xG:7.2, shots:39, shotsOnTarget:19, conversionRate:12.2, dribbles:26 }, MF: { keyPasses:16, passAcc:82, chancesCreated:10, progressivePasses:43, pressingSucc:15 }, DF: { tackles:37, clearances:61, interceptions:30, aerialWon:35, blockShots:12 }, GK: { saves:76, savePerc:69.8, cleanSheets:9, goalsConceded:34, sweepActions:10 } },
    bul1: { FW: { xG:7.0, shots:37, shotsOnTarget:18, conversionRate:11.5, dribbles:25 }, MF: { keyPasses:15, passAcc:80, chancesCreated:10, progressivePasses:41, pressingSucc:14 }, DF: { tackles:36, clearances:60, interceptions:29, aerialWon:33, blockShots:11 }, GK: { saves:74, savePerc:68.8, cleanSheets:8, goalsConceded:36, sweepActions:10 } },
    rus1: { FW: { xG:7.8, shots:41, shotsOnTarget:20, conversionRate:13.0, dribbles:28 }, MF: { keyPasses:17, passAcc:83, chancesCreated:11, progressivePasses:45, pressingSucc:16 }, DF: { tackles:38, clearances:62, interceptions:31, aerialWon:36, blockShots:13 }, GK: { saves:78, savePerc:70.4, cleanSheets:9, goalsConceded:32, sweepActions:11 } },
    gre2: { FW: { xG:6.5, shots:35, shotsOnTarget:17, conversionRate:11.0, dribbles:23 }, MF: { keyPasses:14, passAcc:79, chancesCreated:9, progressivePasses:39, pressingSucc:13 }, DF: { tackles:34, clearances:57, interceptions:27, aerialWon:31, blockShots:10 }, GK: { saves:72, savePerc:67.5, cleanSheets:7, goalsConceded:38, sweepActions:9 } },
    bel2: { FW: { xG:7.0, shots:37, shotsOnTarget:18, conversionRate:12.0, dribbles:25 }, MF: { keyPasses:15, passAcc:81, chancesCreated:10, progressivePasses:41, pressingSucc:14 }, DF: { tackles:36, clearances:59, interceptions:29, aerialWon:33, blockShots:12 }, GK: { saves:74, savePerc:69.0, cleanSheets:8, goalsConceded:35, sweepActions:10 } },
    lat1: { FW: { xG:6.2, shots:33, shotsOnTarget:16, conversionRate:10.5, dribbles:22 }, MF: { keyPasses:13, passAcc:78, chancesCreated:8, progressivePasses:37, pressingSucc:12 }, DF: { tackles:33, clearances:55, interceptions:26, aerialWon:30, blockShots:10 }, GK: { saves:70, savePerc:66.5, cleanSheets:7, goalsConceded:40, sweepActions:9 } },
    "swe-u21": { FW: { xG:6.0, shots:32, shotsOnTarget:16, conversionRate:10.0, dribbles:22 }, MF: { keyPasses:13, passAcc:79, chancesCreated:8, progressivePasses:36, pressingSucc:12 }, DF: { tackles:32, clearances:54, interceptions:25, aerialWon:29, blockShots:10 }, GK: { saves:68, savePerc:65.8, cleanSheets:6, goalsConceded:40, sweepActions:8 } },
    "ned-u21": { FW: { xG:6.5, shots:34, shotsOnTarget:17, conversionRate:10.8, dribbles:23 }, MF: { keyPasses:14, passAcc:81, chancesCreated:9, progressivePasses:38, pressingSucc:13 }, DF: { tackles:33, clearances:55, interceptions:26, aerialWon:30, blockShots:10 }, GK: { saves:70, savePerc:66.5, cleanSheets:7, goalsConceded:39, sweepActions:9 } },
    "por-u23": { FW: { xG:6.5, shots:34, shotsOnTarget:17, conversionRate:10.5, dribbles:23 }, MF: { keyPasses:14, passAcc:80, chancesCreated:9, progressivePasses:38, pressingSucc:13 }, DF: { tackles:33, clearances:55, interceptions:26, aerialWon:30, blockShots:10 }, GK: { saves:70, savePerc:66.0, cleanSheets:7, goalsConceded:39, sweepActions:9 } },
    "eng-u18": { FW: { xG:5.8, shots:31, shotsOnTarget:15, conversionRate:10.0, dribbles:21 }, MF: { keyPasses:13, passAcc:80, chancesCreated:8, progressivePasses:36, pressingSucc:12 }, DF: { tackles:32, clearances:53, interceptions:25, aerialWon:28, blockShots:9 }, GK: { saves:66, savePerc:64.5, cleanSheets:6, goalsConceded:42, sweepActions:8 } },
    "ger-u19": { FW: { xG:6.0, shots:32, shotsOnTarget:16, conversionRate:10.2, dribbles:22 }, MF: { keyPasses:13, passAcc:80, chancesCreated:8, progressivePasses:37, pressingSucc:12 }, DF: { tackles:32, clearances:54, interceptions:25, aerialWon:29, blockShots:9 }, GK: { saves:67, savePerc:64.8, cleanSheets:6, goalsConceded:41, sweepActions:8 } },
    "rou-u19": { FW: { xG:5.5, shots:30, shotsOnTarget:14, conversionRate:9.5, dribbles:20 }, MF: { keyPasses:12, passAcc:77, chancesCreated:7, progressivePasses:34, pressingSucc:11 }, DF: { tackles:30, clearances:51, interceptions:24, aerialWon:27, blockShots:9 }, GK: { saves:64, savePerc:63.5, cleanSheets:5, goalsConceded:44, sweepActions:7 } },
    "sui-u19": { FW: { xG:5.8, shots:31, shotsOnTarget:15, conversionRate:10.0, dribbles:21 }, MF: { keyPasses:13, passAcc:79, chancesCreated:8, progressivePasses:35, pressingSucc:12 }, DF: { tackles:31, clearances:52, interceptions:24, aerialWon:28, blockShots:9 }, GK: { saves:65, savePerc:64.0, cleanSheets:6, goalsConceded:43, sweepActions:8 } },
  };

  const AGE_GROUP_AVGS = {
    "U21": {
      FW: { xG:6.2, shots:34, shotsOnTarget:17, conversionRate:10.5, dribbles:24 },
      MF: { keyPasses:14, passAcc:81, chancesCreated:9, progressivePasses:39, pressingSucc:13 },
      DF: { tackles:33, clearances:56, interceptions:26, aerialWon:30, blockShots:11 },
      GK: { saves:70, savePerc:67.0, cleanSheets:7, goalsConceded:38, sweepActions:9 },
    },
    "21-25": {
      FW: { xG:8.0, shots:42, shotsOnTarget:21, conversionRate:13.5, dribbles:29 },
      MF: { keyPasses:18, passAcc:84, chancesCreated:12, progressivePasses:47, pressingSucc:17 },
      DF: { tackles:39, clearances:63, interceptions:32, aerialWon:37, blockShots:13 },
      GK: { saves:79, savePerc:71.0, cleanSheets:10, goalsConceded:31, sweepActions:12 },
    },
    "26-30": {
      FW: { xG:8.8, shots:45, shotsOnTarget:23, conversionRate:14.8, dribbles:28 },
      MF: { keyPasses:20, passAcc:86, chancesCreated:13, progressivePasses:51, pressingSucc:18 },
      DF: { tackles:41, clearances:67, interceptions:34, aerialWon:40, blockShots:15 },
      GK: { saves:82, savePerc:72.5, cleanSheets:11, goalsConceded:28, sweepActions:13 },
    },
    "30+": {
      FW: { xG:7.5, shots:39, shotsOnTarget:19, conversionRate:13.0, dribbles:22 },
      MF: { keyPasses:17, passAcc:85, chancesCreated:11, progressivePasses:45, pressingSucc:14 },
      DF: { tackles:37, clearances:64, interceptions:31, aerialWon:38, blockShots:14 },
      GK: { saves:80, savePerc:72.0, cleanSheets:10, goalsConceded:30, sweepActions:12 },
    },
  };

  // ---- Benchmark: returns { metricKey: percentile 0–100 } ----
  function getAgeGroup(age) {
    if (age < 21) return "U21";
    if (age <= 25) return "21-25";
    if (age <= 30) return "26-30";
    return "30+";
  }

  function getBenchmark(player, compareMode) {
    let avgs;
    if (compareMode === "position") avgs = POSITION_AVGS[player.pos];
    else if (compareMode === "age")  avgs = (AGE_GROUP_AVGS[getAgeGroup(player.age)] || {})[player.pos];
    else avgs = (LEAGUE_AVGS[player.leagueId] || {})[player.pos] || POSITION_AVGS[player.pos];
    if (!avgs) return {};
    const stats = player.positionStats || {};
    const out = {};
    for (const key of Object.keys(avgs)) {
      const pv = stats[key], av = avgs[key];
      if (pv == null || !av) continue;
      const inverse = key === "goalsConceded";
      const ratio = inverse ? av / (pv || 1) : pv / av;
      out[key] = Math.min(99, Math.max(1, Math.round(50 + (ratio - 1) * 55)));
    }
    return out;
  }

  const CLUBS = [...new Set(PLAYERS.map(p => p.club))];

  window.DD = {
    PLAYERS, LEAGUES, TARGETS, STAGES, SCOUTS, AGENTS, ACTIVITY, NOTIFS, DOCS, CLUBS, NATIONS,
    POSITION_AVGS, LEAGUE_AVGS, AGE_GROUP_AVGS,
    findPlayer:       (id)          => PLAYERS.find(p => p.id === id),
    getLeague:        (id)          => LEAGUES.find(l => l.id === id),
    getPlayersByLeague:(leagueId)   => PLAYERS.filter(p => p.leagueId === leagueId),
    getBenchmark,
    getAgeGroup,
  };
})();
