/* ============================================================
   DD SPORTS MANAGEMENT — Fictional Data
   (All players, clubs and people are invented)
   ============================================================ */
(function () {
  // ---- helpers ----
  const series = (n, base, vol, trend) =>
    Array.from({ length: n }, (_, i) =>
      Math.max(0, Math.round((base + trend * i + (Math.sin(i * 1.7) + Math.cos(i * 0.9)) * vol) * 10) / 10)
    );

  const CLUBS = [
    "Atlético Verano", "Olympia Nord", "Ribera CF", "Meridian City", "Falcão SC",
    "Vallensa United", "Köln Adler", "Porto Azul", "Highmoor FC", "Cádiz Marina",
    "Estrella Roja", "Vento FC", "Lyonne AC", "Borges United", "Saint-Croix",
    "Maple Rovers", "Delta Lagos", "Nordvik IF"
  ];
  const NATIONS = {
    "Brazil":"🇧🇷","Argentina":"🇦🇷","Spain":"🇪🇸","France":"🇫🇷","Germany":"🇩🇪",
    "Portugal":"🇵🇹","England":"🇬🇧","Nigeria":"🇳🇬","Senegal":"🇸🇳","Norway":"🇳🇴",
    "Colombia":"🇨🇴","Croatia":"🇭🇷","Netherlands":"🇳🇱","Morocco":"🇲🇦","Japan":"🇯🇵","Uruguay":"🇺🇾"
  };
  const AVCOL = ["#1f3aa6","#2a6f5a","#7a3b8f","#b8742a","#1d6f8f","#9a3550","#4a4f8f","#2f7a44"];

  let _id = 1;
  function P(o){
    const id = _id++;
    const avColor = AVCOL[id % AVCOL.length];
    return Object.assign({
      id, avColor,
      initials: o.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase(),
      flag: NATIONS[o.nation] || "🏳️",
      perf: series(12, o.rating*10-15, 7, o.form||1.2),
      mvTrend: series(12, o.mvNum*0.62, o.mvNum*0.05, o.mvNum*0.032),
      ratings: series(8, o.rating, 0.7, 0.04),
    }, o);
  }

  const PLAYERS = [
    P({name:"Mateo Rivas", pos:"FW", posFull:"Forward", age:21, nation:"Argentina", club:"Atlético Verano", mv:"€42.0M", mvNum:42, expiry:"2027-06", status:"Active", agent:"D. Duarte", rating:7.9, apps:28, goals:19, assists:7, passAcc:81, mins:2380, height:"1.83m", foot:"Right", tier:"elite", form:1.6}),
    P({name:"Luka Veselin", pos:"MF", posFull:"Att. Midfield", age:23, nation:"Croatia", club:"Olympia Nord", mv:"€31.5M", mvNum:31.5, expiry:"2026-06", status:"Active", agent:"S. Marín", rating:7.6, apps:31, goals:8, assists:14, passAcc:89, mins:2710, height:"1.79m", foot:"Left", tier:"key", form:1.1}),
    P({name:"Idriss Camara", pos:"DF", posFull:"Centre-Back", age:24, nation:"Senegal", club:"Ribera CF", mv:"€24.0M", mvNum:24, expiry:"2025-12", status:"Contract Risk", agent:"D. Duarte", rating:7.3, apps:30, goals:2, assists:1, passAcc:91, mins:2700, height:"1.91m", foot:"Right", tier:"key", form:0.5}),
    P({name:"Théo Lamballe", pos:"GK", posFull:"Goalkeeper", age:26, nation:"France", club:"Meridian City", mv:"€18.5M", mvNum:18.5, expiry:"2028-06", status:"Active", agent:"S. Marín", rating:7.4, apps:29, goals:0, assists:0, passAcc:78, mins:2610, height:"1.94m", foot:"Right", tier:"key", form:0.3}),
    P({name:"Bruno Sável", pos:"FW", posFull:"Winger", age:19, nation:"Portugal", club:"Falcão SC", mv:"€15.0M", mvNum:15, expiry:"2027-06", status:"Prospect", agent:"L. Ferreira", rating:7.1, apps:24, goals:9, assists:11, passAcc:83, mins:1980, height:"1.75m", foot:"Right", tier:"prospect", form:2.1}),
    P({name:"Adewale Okoye", pos:"MF", posFull:"Def. Midfield", age:22, nation:"Nigeria", club:"Vallensa United", mv:"€22.0M", mvNum:22, expiry:"2026-12", status:"Active", agent:"D. Duarte", rating:7.5, apps:33, goals:3, assists:5, passAcc:88, mins:2890, height:"1.85m", foot:"Right", tier:"key", form:0.8}),
    P({name:"Niklas Brandt", pos:"DF", posFull:"Right-Back", age:25, nation:"Germany", club:"Köln Adler", mv:"€16.5M", mvNum:16.5, expiry:"2026-06", status:"Active", agent:"S. Marín", rating:7.2, apps:27, goals:1, assists:6, passAcc:85, mins:2380, height:"1.81m", foot:"Right", tier:"squad", form:0.6}),
    P({name:"Rafael Pinto", pos:"FW", posFull:"Striker", age:28, nation:"Brazil", club:"Porto Azul", mv:"€28.0M", mvNum:28, expiry:"2025-06", status:"Contract Risk", agent:"L. Ferreira", rating:7.7, apps:30, goals:21, assists:4, passAcc:79, mins:2540, height:"1.88m", foot:"Left", tier:"key", form:0.9}),
    P({name:"Joel Hartman", pos:"MF", posFull:"Central Mid", age:20, nation:"England", club:"Highmoor FC", mv:"€19.0M", mvNum:19, expiry:"2028-06", status:"Prospect", agent:"D. Duarte", rating:7.0, apps:22, goals:4, assists:8, passAcc:86, mins:1760, height:"1.80m", foot:"Right", tier:"prospect", form:1.8}),
    P({name:"Diego Marín", pos:"DF", posFull:"Centre-Back", age:27, nation:"Spain", club:"Cádiz Marina", mv:"€12.0M", mvNum:12, expiry:"2026-06", status:"Active", agent:"S. Marín", rating:7.1, apps:28, goals:3, assists:0, passAcc:90, mins:2520, height:"1.89m", foot:"Right", tier:"squad", form:0.4}),
    P({name:"Yuki Tanabe", pos:"MF", posFull:"Winger", age:21, nation:"Japan", club:"Vento FC", mv:"€17.5M", mvNum:17.5, expiry:"2027-06", status:"Active", agent:"L. Ferreira", rating:7.3, apps:29, goals:7, assists:10, passAcc:84, mins:2340, height:"1.72m", foot:"Left", tier:"key", form:1.4}),
    P({name:"Karim El Fassi", pos:"FW", posFull:"Forward", age:23, nation:"Morocco", club:"Lyonne AC", mv:"€26.5M", mvNum:26.5, expiry:"2027-12", status:"Active", agent:"D. Duarte", rating:7.6, apps:31, goals:15, assists:9, passAcc:82, mins:2680, height:"1.84m", foot:"Right", tier:"key", form:1.3}),
    P({name:"Anton Skov", pos:"FW", posFull:"Striker", age:18, nation:"Norway", club:"Nordvik IF", mv:"€9.5M", mvNum:9.5, expiry:"2027-06", status:"Prospect", agent:"L. Ferreira", rating:6.9, apps:19, goals:11, assists:3, passAcc:77, mins:1480, height:"1.90m", foot:"Right", tier:"prospect", form:2.4}),
    P({name:"Felipe Andrade", pos:"DF", posFull:"Left-Back", age:24, nation:"Brazil", club:"Delta Lagos", mv:"€14.0M", mvNum:14, expiry:"2026-06", status:"Active", agent:"S. Marín", rating:7.0, apps:26, goals:2, assists:7, passAcc:84, mins:2300, height:"1.78m", foot:"Left", tier:"squad", form:0.7}),
    P({name:"Sergio Bonilla", pos:"MF", posFull:"Att. Midfield", age:26, nation:"Colombia", club:"Estrella Roja", mv:"€20.5M", mvNum:20.5, expiry:"2025-12", status:"Contract Risk", agent:"D. Duarte", rating:7.4, apps:30, goals:10, assists:12, passAcc:87, mins:2610, height:"1.76m", foot:"Right", tier:"key", form:0.6}),
    P({name:"Lars Ophoven", pos:"DF", posFull:"Centre-Back", age:22, nation:"Netherlands", club:"Borges United", mv:"€13.5M", mvNum:13.5, expiry:"2028-06", status:"Prospect", agent:"L. Ferreira", rating:7.0, apps:25, goals:1, assists:2, passAcc:89, mins:2200, height:"1.92m", foot:"Left", tier:"prospect", form:1.5}),
    P({name:"Emiliano Sosa", pos:"GK", posFull:"Goalkeeper", age:29, nation:"Uruguay", club:"Saint-Croix", mv:"€10.0M", mvNum:10, expiry:"2026-06", status:"Active", agent:"S. Marín", rating:7.2, apps:30, goals:0, assists:0, passAcc:75, mins:2700, height:"1.93m", foot:"Right", tier:"squad", form:0.2}),
    P({name:"Gabriel Nunes", pos:"FW", posFull:"Winger", age:20, nation:"Brazil", club:"Maple Rovers", mv:"€21.0M", mvNum:21, expiry:"2027-06", status:"Active", agent:"D. Duarte", rating:7.4, apps:27, goals:12, assists:8, passAcc:80, mins:2280, height:"1.74m", foot:"Right", tier:"key", form:1.7}),
  ];

  // ---- recruitment targets (not yet signed) ----
  const TARGETS = [
    {name:"Tomás Iglesias", pos:"FW", club:"Río Sur", mv:"€8.0M", scout:8.4, stage:"identified", nation:"Spain", age:19},
    {name:"Kwame Asante", pos:"MF", club:"Accra Lions", mv:"€6.5M", scout:8.1, stage:"identified", nation:"Nigeria", age:18},
    {name:"Dario Vinci", pos:"DF", club:"Genova FC", mv:"€11.0M", scout:7.8, stage:"review", nation:"Croatia", age:21},
    {name:"Pierre Aubry", pos:"FW", club:"Nantes B", mv:"€9.0M", scout:8.6, stage:"review", nation:"France", age:20},
    {name:"Stefan Marković", pos:"GK", club:"Beograd SK", mv:"€5.0M", scout:7.5, stage:"scouted", nation:"Croatia", age:22},
    {name:"Lamine Diatta", pos:"DF", club:"Dakar AC", mv:"€7.5M", scout:8.2, stage:"scouted", nation:"Senegal", age:19},
    {name:"Owen Brady", pos:"MF", club:"Tyne Albion", mv:"€10.5M", scout:8.0, stage:"negotiation", nation:"England", age:21},
    {name:"Nico Esteban", pos:"FW", club:"Valle FC", mv:"€13.0M", scout:8.7, stage:"negotiation", nation:"Argentina", age:20},
    {name:"Hugo Marchetti", pos:"MF", club:"Torino B", mv:"€12.0M", scout:8.5, stage:"opportunity", nation:"France", age:22},
    {name:"Bruno Sável", pos:"FW", club:"Falcão SC", mv:"€15.0M", scout:8.9, stage:"signed", nation:"Portugal", age:19},
    {name:"Anton Skov", pos:"FW", club:"Nordvik IF", mv:"€9.5M", scout:8.3, stage:"signed", nation:"Norway", age:18},
    {name:"Reuben Falk", pos:"DF", club:"Highmoor B", mv:"€4.0M", scout:6.4, stage:"rejected", nation:"Germany", age:23},
  ];

  const STAGES = [
    {id:"identified", label:"Identified", color:"#8590ad"},
    {id:"review", label:"Under Review", color:"#5b82ff"},
    {id:"scouted", label:"Scouted", color:"#1d6f8f"},
    {id:"negotiation", label:"Negotiation", color:"#e0a23c"},
    {id:"opportunity", label:"Active Opportunity", color:"#c8a24a"},
    {id:"signed", label:"Signed", color:"#3fae7a"},
    {id:"rejected", label:"Rejected", color:"#e0556b"},
  ];

  const SCOUTS = [
    {name:"Marco Solano", region:"South America", players:14, due:3, av:"#2a6f5a"},
    {name:"Yara Haddad", region:"North Africa", players:11, due:1, av:"#7a3b8f"},
    {name:"Erik Lindqvist", region:"Scandinavia", players:9, due:2, av:"#1d6f8f"},
    {name:"Priya Anand", region:"Europe / UK", players:16, due:4, av:"#b8742a"},
  ];

  const AGENTS = [
    {name:"David Duarte", role:"Founder & Lead Agent", players:7, value:"€172M", av:"#1f3aa6", initials:"DD"},
    {name:"Sofía Marín", role:"Senior Agent", players:6, value:"€96M", av:"#9a3550", initials:"SM"},
    {name:"Lucas Ferreira", role:"Agent — Talent ID", players:5, value:"€68M", av:"#2f7a44", initials:"LF"},
  ];

  const ACTIVITY = [
    {type:"report", who:"Marco Solano", text:"submitted a scout report on <b>Nico Esteban</b> — rating 8.7", time:"12m ago", icon:"clipboard"},
    {type:"player", who:"Sofía Marín", text:"added <b>Lars Ophoven</b> to the agency roster", time:"1h ago", icon:"user-plus"},
    {type:"alert", who:"System", text:"Contract alert — <b>Rafael Pinto</b> expires in 30 days", time:"2h ago", icon:"alert"},
    {type:"contract", who:"David Duarte", text:"updated contract terms for <b>Mateo Rivas</b>", time:"4h ago", icon:"file"},
    {type:"perf", who:"System", text:"<b>Bruno Sável</b> rated 8.4 — season-best performance", time:"6h ago", icon:"trend"},
    {type:"report", who:"Priya Anand", text:"moved <b>Owen Brady</b> to Negotiation stage", time:"Yesterday", icon:"clipboard"},
    {type:"player", who:"Lucas Ferreira", text:"flagged <b>Anton Skov</b> as a priority prospect", time:"Yesterday", icon:"star"},
  ];

  const NOTIFS = [
    {cat:"Contract", title:"Contract expiring soon", body:"Rafael Pinto's contract with Porto Azul expires in 30 days.", time:"2h ago", unread:true, kind:"red"},
    {cat:"Scouting", title:"New scout report", body:"Marco Solano submitted a report on Nico Esteban (8.7).", time:"12m ago", unread:true, kind:"blue"},
    {cat:"Performance", title:"Performance milestone", body:"Bruno Sável recorded a season-high match rating of 8.4.", time:"6h ago", unread:true, kind:"green"},
    {cat:"Transfer", title:"New transfer opportunity", body:"Meridian City registered interest in Mateo Rivas.", time:"1d ago", unread:false, kind:"gold"},
    {cat:"Contract", title:"Renewal signed", body:"Karim El Fassi extended terms through 2027.", time:"2d ago", unread:false, kind:"green"},
    {cat:"Scouting", title:"Watchlist update", body:"3 new prospects added to the South America region.", time:"3d ago", unread:false, kind:"blue"},
  ];

  const DOCS = [
    {name:"Rivas_Contract_2024.pdf", cat:"Contracts", size:"2.4 MB", date:"Apr 2024", ext:"PDF", color:"#9a3550", owner:"Mateo Rivas"},
    {name:"Pinto_Renewal_Draft.pdf", cat:"Contracts", size:"1.1 MB", date:"May 2024", ext:"PDF", color:"#9a3550", owner:"Rafael Pinto"},
    {name:"Camara_Passport.jpg", cat:"Passports", size:"840 KB", date:"Jan 2024", ext:"IMG", color:"#1d6f8f", owner:"Idriss Camara"},
    {name:"Veselin_Passport.pdf", cat:"Passports", size:"610 KB", date:"Feb 2024", ext:"PDF", color:"#1d6f8f", owner:"Luka Veselin"},
    {name:"Medical_Rivas_Q1.pdf", cat:"Medical", size:"3.2 MB", date:"Mar 2024", ext:"PDF", color:"#2f7a44", owner:"Mateo Rivas"},
    {name:"Medical_Sável_Intake.pdf", cat:"Medical", size:"2.8 MB", date:"Apr 2024", ext:"PDF", color:"#2f7a44", owner:"Bruno Sável"},
    {name:"FIFA_Reg_Rivas.pdf", cat:"Registrations", size:"520 KB", date:"Apr 2024", ext:"PDF", color:"#b8742a", owner:"Mateo Rivas"},
    {name:"Reg_Okoye_2024.pdf", cat:"Registrations", size:"498 KB", date:"Mar 2024", ext:"PDF", color:"#b8742a", owner:"Adewale Okoye"},
    {name:"Scout_Esteban_Report.pdf", cat:"Scouting Reports", size:"1.6 MB", date:"May 2024", ext:"PDF", color:"#1f3aa6", owner:"Nico Esteban"},
    {name:"Scout_Asante_Notes.docx", cat:"Scouting Reports", size:"340 KB", date:"May 2024", ext:"DOC", color:"#1f3aa6", owner:"Kwame Asante"},
  ];

  window.DD = {
    PLAYERS, TARGETS, STAGES, SCOUTS, AGENTS, ACTIVITY, NOTIFS, DOCS, CLUBS, NATIONS,
    findPlayer: (id) => PLAYERS.find(p => p.id === id),
  };
})();
