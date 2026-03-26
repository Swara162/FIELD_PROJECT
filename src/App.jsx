import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const GlobalCSS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&family=Nunito:wght@400;500;600;700&display=swap');
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root{
      --primary:#C8522A;--primary-h:#B04420;--primary-pale:#FBE8DF;
      --secondary:#5E9E7A;--secondary-pale:#E4F2EB;
      --accent:#EDB84A;--accent-pale:#FDF3D8;
      --admin:#2D6A4F;
      --bg:#FDF6EE;--surface:#FFFFFF;--surface-2:#FFF9F4;
      --text:#2D2420;--text-muted:#8A6E65;--border:#ECD9CC;
      --shadow:0 4px 16px rgba(45,36,32,.09);
      --radius:14px;--sidebar-w:248px;
    }
    body{font-family:'Nunito',sans-serif;background:var(--bg);color:var(--text)}
    .badge{display:inline-flex;padding:4px 10px;border-radius:20px;font-size:.72rem;font-weight:700}
    .badge-green{background:var(--secondary-pale);color:#2d7a50}
    .badge-orange{background:var(--primary-pale);color:var(--primary)}
    .badge-amber{background:var(--accent-pale);color:#8B6A00}
    .badge-gray{background:#f0ece8;color:#8A6E65}
    .badge-red{background:#fde8e8;color:#c0392b}
    .btn{padding:10px 18px;border-radius:8px;font-family:'Nunito',sans-serif;font-size:.85rem;font-weight:700;cursor:pointer;border:none;transition:all .15s;display:inline-flex;align-items:center;gap:7px}
    .btn-primary{background:var(--primary);color:#fff;box-shadow:0 3px 10px rgba(200,82,42,.3)}
    .btn-primary:hover{background:var(--primary-h)}
    .btn-ghost{background:var(--surface);color:var(--text-muted);border:1px solid var(--border)}
    .btn-ghost:hover{background:var(--bg)}
    .sidebar{width:var(--sidebar-w);background:var(--surface);border-right:1px solid var(--border);display:flex;flex-direction:column;position:fixed;top:0;left:0;bottom:0;z-index:50}
    .sidebar-brand{padding:24px 20px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px}
    .brand-icon{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .brand-name{font-family:'Fraunces',serif;font-size:1.1rem;font-weight:700;color:var(--text)}
    .brand-role{font-size:.68rem;font-weight:700;display:block}
    .sidebar-nav{flex:1;padding:16px 12px;display:flex;flex-direction:column;gap:3px;overflow-y:auto}
    .nav-section{font-size:.65rem;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:var(--text-muted);padding:10px 10px 5px;margin-top:6px}
    .nav-item{display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:10px;text-decoration:none;font-size:.88rem;font-weight:600;color:var(--text-muted);transition:all .15s;cursor:pointer;border:none;background:none;width:100%;text-align:left}
    .nav-item svg{width:18px;height:18px;fill:currentColor;flex-shrink:0}
    .nav-item:hover{background:var(--bg);color:var(--text)}
    .nav-item.active{background:var(--primary-pale);color:var(--primary)}
    .sidebar-footer{padding:16px 12px;border-top:1px solid var(--border)}
    .user-card{display:flex;align-items:center;gap:10px;padding:10px;border-radius:10px;background:var(--bg)}
    .user-avatar-sm{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;color:#fff;font-size:.85rem;flex-shrink:0}
    .user-name{font-size:.85rem;font-weight:700;color:var(--text)}
    .user-role-text{font-size:.72rem;font-weight:600}
    .logout-btn{margin-left:auto;background:none;border:none;cursor:pointer;color:var(--text-muted)}
    .logout-btn svg{width:16px;height:16px;fill:currentColor}
    .main-wrap{margin-left:var(--sidebar-w);flex:1;display:flex;flex-direction:column;min-height:100vh}
    .topbar{background:var(--surface);border-bottom:1px solid var(--border);padding:0 32px;height:64px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:40}
    .topbar-title{font-family:'Fraunces',serif;font-size:1.15rem;font-weight:700;color:var(--text)}
    .content{padding:32px}
    .panel{background:var(--surface);border:1px solid var(--border);border-radius:var(--radius);overflow:hidden;margin-bottom:20px}
    .panel-header{display:flex;align-items:center;justify-content:space-between;padding:18px 22px;border-bottom:1px solid var(--border)}
    .panel-title{font-family:'Fraunces',serif;font-size:1rem;font-weight:700;color:var(--text)}
    .panel-body{padding:20px 22px}
    .form-field{margin-bottom:18px}
    .form-field label{display:block;font-size:.82rem;font-weight:700;color:var(--text);margin-bottom:7px}
    .input-wrap{position:relative}
    .input-wrap svg{position:absolute;left:14px;top:50%;transform:translateY(-50%);width:16px;height:16px;fill:var(--text-muted);pointer-events:none}
    .input-wrap input,.input-wrap select,.input-wrap textarea{width:100%;padding:12px 14px 12px 42px;border:2px solid var(--border);border-radius:12px;font-family:'Nunito',sans-serif;font-size:.9rem;color:var(--text);background:var(--surface);outline:none;transition:border-color .2s}
    .input-wrap input:focus,.input-wrap select:focus,.input-wrap textarea:focus{border-color:var(--primary)}
    .modal-overlay{position:fixed;inset:0;background:rgba(45,36,32,.4);backdrop-filter:blur(4px);z-index:100;display:flex;align-items:center;justify-content:center}
    .modal{background:var(--surface);border-radius:20px;padding:32px;width:560px;max-width:90vw;max-height:85vh;overflow-y:auto;box-shadow:0 20px 60px rgba(45,36,32,.2)}
    .modal-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}
    .modal-title{font-family:'Fraunces',serif;font-size:1.3rem;font-weight:700;color:var(--text)}
    .modal-close{width:32px;height:32px;border-radius:8px;border:1px solid var(--border);background:var(--bg);cursor:pointer;font-size:1rem;color:var(--text-muted);display:flex;align-items:center;justify-content:center}
    table{width:100%;border-collapse:collapse;font-size:.84rem}
    thead th{padding:10px 14px;text-align:left;font-size:.68rem;font-weight:700;letter-spacing:.6px;text-transform:uppercase;color:var(--text-muted);background:var(--surface-2);border-bottom:2px solid var(--border)}
    tbody td{padding:12px 14px;border-bottom:1px solid var(--border);vertical-align:middle}
    tbody tr:last-child td{border-bottom:none}
    tbody tr:hover td{background:var(--surface-2)}
    @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  `}</style>
);

/* ─────────────────────────────────────────────
   SVG ICONS
───────────────────────────────────────────── */
const Icon = ({ d, style }) => (
  <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: "currentColor", ...style }}>
    <path d={d} />
  </svg>
);
const ICONS = {
  heart: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
  home: "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z",
  people: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  calendar: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z",
  forms: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
  reports: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 3c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm7 13H5v-.23c0-.62.28-1.2.76-1.58C7.47 15.82 9.64 15 12 15s4.53.82 6.24 2.19c.48.38.76.97.76 1.58V19z",
  logout: "M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z",
  email: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
  lock: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z",
  eye: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z",
  shield: "M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z",
  back: "M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z",
  pin: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z",
  clock: "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z",
  notif: "M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z",
  check: "M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z",
  search: "M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z",
  edit: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z",
  trash: "M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z",
  attendance: "M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z",
  user: "M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z",
};

const avatarColors = [
  "linear-gradient(135deg,#C8522A,#EDB84A)",
  "linear-gradient(135deg,#5E9E7A,#40916C)",
  "linear-gradient(135deg,#9b59b6,#3498db)",
  "linear-gradient(135deg,#2D6A4F,#40916C)",
  "linear-gradient(135deg,#EDB84A,#C8522A)",
];

/* ─────────────────────────────────────────────
   ADMIN SIDEBAR
───────────────────────────────────────────── */
function AdminSidebar({ current, navigate }) {
  const links = [
    { section: "Overview" },
    { id: "admin-dashboard", label: "Dashboard", icon: "home" },
    { section: "Management" },
    { id: "volunteer-management", label: "Volunteers", icon: "people" },
    { id: "event-management", label: "Events", icon: "calendar" },
    { section: "Tracking" },
    { id: "attendance-tracking", label: "Attendance", icon: "attendance" },
    { section: "Insights" },
    { id: "reports", label: "Reports", icon: "reports" },
  ];
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon" style={{ background: "linear-gradient(135deg,var(--admin),#40916C)" }}>
          <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "#fff" }}><path d={ICONS.heart} /></svg>
        </div>
        <div><div className="brand-name">VolunteerHub</div><span className="brand-role" style={{ color: "var(--admin)" }}>Admin Portal</span></div>
      </div>
      <nav className="sidebar-nav">
        {links.map((l, i) =>
          l.section ? (
            <span key={i} className="nav-section">{l.section}</span>
          ) : (
            <button key={l.id} className={`nav-item${current === l.id ? " active" : ""}`} onClick={() => navigate(l.id)}>
              <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: "currentColor" }}><path d={ICONS[l.icon]} /></svg>
              {l.label}
            </button>
          )
        )}
      </nav>
      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-avatar-sm" style={{ background: "linear-gradient(135deg,var(--admin),#40916C)" }}>S</div>
          <div><div className="user-name">Shreya Nair</div><div className="user-role-text" style={{ color: "var(--admin)" }}>Super Admin</div></div>
          <button className="logout-btn" onClick={() => navigate("admin-login")}>
            <svg viewBox="0 0 24 24"><path d={ICONS.logout} /></svg>
          </button>
        </div>
      </div>
    </aside>
  );
}

/* ─────────────────────────────────────────────
   VOLUNTEER SIDEBAR
───────────────────────────────────────────── */
function VolSidebar({ current, navigate, volunteer }) {
  const name = volunteer ? `${volunteer.firstName} ${volunteer.lastName}` : "Arjun Sharma";
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon" style={{ background: "linear-gradient(135deg,var(--primary),var(--accent))" }}>
          <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "#fff" }}><path d={ICONS.heart} /></svg>
        </div>
        <div><div className="brand-name">VolunteerHub</div><span className="brand-role" style={{ color: "var(--primary)" }}>Volunteer Portal</span></div>
      </div>
      <nav className="sidebar-nav">
        <span className="nav-section">My Dashboard</span>
        <button className={`nav-item ${current === 'volunteer-dashboard' || !current ? 'active' : ''}`} onClick={() => navigate('volunteer-dashboard')}><svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: "currentColor" }}><path d={ICONS.home} /></svg>Home</button>
        <span className="nav-section">Participate</span>
        <button className={`nav-item ${current === 'browse-events' ? 'active' : ''}`} onClick={() => navigate('browse-events')}><svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: "currentColor" }}><path d={ICONS.calendar} /></svg>Browse Events</button>
        <button className={`nav-item ${current === 'my-schedule' ? 'active' : ''}`} onClick={() => navigate('my-schedule')}><svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: "currentColor" }}><path d={ICONS.calendar} /></svg>My Schedule</button>
        <span className="nav-section">Records</span>
        <button className={`nav-item ${current === 'participation-history' ? 'active' : ''}`} onClick={() => navigate('participation-history')}><svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: "currentColor" }}><path d={ICONS.reports} /></svg>Participation History</button>
        <button className={`nav-item ${current === 'volunteer-attendance' ? 'active' : ''}`} onClick={() => navigate('volunteer-attendance')}><svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: "currentColor" }}><path d={ICONS.attendance} /></svg>Attendance</button>
      </nav>
      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-avatar-sm" style={{ background: "linear-gradient(135deg,var(--primary),var(--accent))" }}>{initials}</div>
          <div><div className="user-name">{name}</div><div className="user-role-text" style={{ color: "var(--primary)" }}>Volunteer</div></div>
          <button className="logout-btn" onClick={() => navigate("volunteer-login")}>
            <svg viewBox="0 0 24 24"><path d={ICONS.logout} /></svg>
          </button>
        </div>
      </div>
    </aside>
  );
}

/* ─────────────────────────────────────────────
   PAGE: VOLUNTEER LOGIN
───────────────────────────────────────────── */
function VolunteerLogin({ navigate }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");

  function doLogin() {
    setError("");
    if (!email || !password) { setError("empty"); return; }
    const registered = JSON.parse(localStorage.getItem("vh_volunteers") || "[]");
    const vol = registered.find(v => v.email.toLowerCase() === email.toLowerCase());
    if (!vol) { setError("notfound"); return; }
    if (vol.password !== password) { setError("badpw"); return; }
    localStorage.setItem("vh_current_volunteer", JSON.stringify(vol));
    navigate("volunteer-dashboard");
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
      <style>{`.vol-login-hero{background:linear-gradient(160deg,#1a4731 0%,#2D6A4F 40%,#40916C 100%);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 48px;position:relative;overflow:hidden}.hd-circle{position:absolute;border-radius:50%;background:rgba(255,255,255,.06)}.hero-title{font-family:'Fraunces',serif;font-size:2.2rem;font-weight:700;color:#fff;line-height:1.2;margin-bottom:16px}.hero-title em{font-style:italic;color:var(--accent)}`}</style>
      <div className="vol-login-hero">
        <div className="hd-circle" style={{ width: 400, height: 400, bottom: -80, right: -80 }}></div>
        <div className="hd-circle" style={{ width: 250, height: 250, top: -40, left: -40 }}></div>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 360 }}>
          <div style={{ width: 72, height: 72, background: "rgba(255,255,255,.15)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", border: "1px solid rgba(255,255,255,.2)" }}>
            <svg viewBox="0 0 24 24" style={{ width: 36, height: 36, fill: "#fff" }}><path d={ICONS.heart} /></svg>
          </div>
          <h1 className="hero-title">Make a <em>difference</em> today</h1>
          <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,.75)", lineHeight: 1.6, marginBottom: 36 }}>Join thousands of volunteers creating positive change in communities across Bangalore.</p>
          <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
            {[["4,200+", "VOLUNTEERS"], ["180+", "EVENTS"], ["12K hrs", "GIVEN"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.8rem", fontWeight: 700, color: "#fff" }}>{n}</div>
                <div style={{ fontSize: ".72rem", color: "rgba(255,255,255,.6)", fontWeight: 600, letterSpacing: .5 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 40px", overflowY: "auto" }}>
        <div style={{ width: "100%", maxWidth: 400 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 40 }}>
            <div style={{ width: 40, height: 40, background: "linear-gradient(135deg,var(--primary),var(--accent))", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg viewBox="0 0 24 24" style={{ width: 20, height: 20, fill: "#fff" }}><path d={ICONS.heart} /></svg>
            </div>
            <div><div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--text)" }}>VolunteerHub</div><div style={{ fontSize: ".68rem", color: "var(--primary)", fontWeight: 700, letterSpacing: .5 }}>VOLUNTEER PORTAL</div></div>
          </div>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "1.7rem", fontWeight: 700, marginBottom: 6 }}>Sign in</h2>
          <p style={{ fontSize: ".88rem", color: "var(--text-muted)", marginBottom: 32 }}>Welcome back! Enter your details to continue.</p>

          {error === "empty" && <div style={{ background: "#fde8e8", border: "1px solid #f5c6c6", borderRadius: 12, padding: "12px 16px", fontSize: ".83rem", fontWeight: 600, color: "#c0392b", marginBottom: 18 }}>⚠ Please enter both your email and password.</div>}
          {error === "notfound" && <div style={{ background: "var(--accent-pale)", border: "1px solid #f0d080", borderRadius: 12, padding: "12px 16px", fontSize: ".83rem", fontWeight: 600, color: "#7a5800", marginBottom: 18 }}>⚠️ No account found. <span style={{ color: "var(--primary)", cursor: "pointer", fontWeight: 700, textDecoration: "underline" }} onClick={() => navigate("volunteer-register")}>Register first</span>.</div>}
          {error === "badpw" && <div style={{ background: "#fde8e8", border: "1px solid #f5c6c6", borderRadius: 12, padding: "12px 16px", fontSize: ".83rem", fontWeight: 600, color: "#c0392b", marginBottom: 18 }}>⚠ Incorrect password. Please try again.</div>}

          <div className="form-field">
            <label>Email Address</label>
            <div className="input-wrap">
              <svg viewBox="0 0 24 24"><path d={ICONS.email} /></svg>
              <input type="email" placeholder="you@email.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && doLogin()} style={{ borderColor: error === "notfound" || error === "empty" ? "#e74c3c" : undefined }} />
            </div>
          </div>
          <div className="form-field">
            <label>Password</label>
            <div className="input-wrap" style={{ position: "relative" }}>
              <svg viewBox="0 0 24 24"><path d={ICONS.lock} /></svg>
              <input type={showPw ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && doLogin()} style={{ paddingRight: 42, borderColor: error === "badpw" || error === "empty" ? "#e74c3c" : undefined }} />
              <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                <svg viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: "currentColor" }}><path d={ICONS.eye} /></svg>
              </button>
            </div>
            <a href="#" style={{ fontSize: ".8rem", color: "var(--primary)", fontWeight: 600, textDecoration: "none", display: "block", textAlign: "right", marginTop: 6 }}>Forgot password?</a>
          </div>

          <button onClick={doLogin} style={{ width: "100%", padding: 14, borderRadius: 12, background: "linear-gradient(135deg,var(--primary),var(--primary-h))", color: "#fff", fontFamily: "'Nunito',sans-serif", fontSize: ".95rem", fontWeight: 700, border: "none", cursor: "pointer", marginTop: 8, boxShadow: "0 4px 14px rgba(200,82,42,.3)" }}>Sign In</button>
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0", color: "var(--text-muted)", fontSize: ".8rem" }}>
            <div style={{ flex: 1, height: 1, background: "var(--border)" }}></div>new here?<div style={{ flex: 1, height: 1, background: "var(--border)" }}></div>
          </div>
          <button onClick={() => navigate("volunteer-register")} style={{ display: "block", textAlign: "center", padding: 12, border: "2px solid var(--border)", borderRadius: 12, fontSize: ".85rem", fontWeight: 600, color: "var(--text-muted)", width: "100%", background: "none", cursor: "pointer" }}>🌱 Register as a Volunteer</button>
          <button onClick={() => navigate("admin-login")} style={{ display: "block", textAlign: "center", fontSize: ".8rem", color: "var(--text-muted)", marginTop: 20, background: "none", border: "none", cursor: "pointer", width: "100%" }}>Admin? Sign in here →</button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE: VOLUNTEER REGISTER
───────────────────────────────────────────── */
function VolunteerRegister({ navigate }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ firstName: "", lastName: "", age: "", gender: "", email: "", phone: "", password: "", confirmPassword: "", city: "", state: "", pincode: "", travelRadius: "", bio: "", availability: "" });
  const [skills, setSkills] = useState(new Set());
  const [interests, setInterests] = useState(new Set());
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  const upd = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleChip = (val, set, setFn) => {
    const next = new Set(set);
    next.has(val) ? next.delete(val) : next.add(val);
    setFn(next);
  };

  function validateStep1() {
    const e = {};
    if (!form.firstName.trim()) e.firstName = true;
    if (!form.lastName.trim()) e.lastName = true;
    if (!form.age || +form.age < 16 || +form.age > 99) e.age = true;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = true;
    if (form.phone.trim().replace(/\s/g, "").length < 7) e.phone = true;
    if (form.password.length < 6) e.password = true;
    if (form.password !== form.confirmPassword) e.confirmPassword = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  function validateStep2() {
    const e = {};
    if (skills.size === 0) e.skills = true;
    if (interests.size === 0) e.interests = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  }
  function validateStep3() {
    const e = {};
    if (!form.city.trim()) e.city = true;
    if (!form.agree) e.terms = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit() {
    if (!validateStep3()) return;
    const vols = JSON.parse(localStorage.getItem("vh_volunteers") || "[]");
    vols.push({ ...form, skills: [...skills], interests: [...interests], registeredAt: new Date().toISOString() });
    localStorage.setItem("vh_volunteers", JSON.stringify(vols));
    setDone(true);
  }

  const SKILLS = ["Teaching", "Medical / First Aid", "Photography", "Cooking", "Graphic Design", "Web / Tech", "Event Planning", "Fundraising", "Languages", "Legal", "Counselling", "Driving / Logistics"];
  const INTERESTS = ["Education", "Environment", "Animal Welfare", "Healthcare", "Women & Girls", "Elderly Care", "Disaster Relief", "Arts & Culture", "Children", "Food Security", "Community Dev.", "Mental Health"];
  const pct = step === 1 ? 33.3 : step === 2 ? 66.6 : 100;

  if (done) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
      <div style={{ textAlign: "center", maxWidth: 400, padding: 40 }}>
        <div style={{ width: 80, height: 80, background: "linear-gradient(135deg,var(--secondary),var(--admin))", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
          <svg viewBox="0 0 24 24" style={{ width: 40, height: 40, fill: "#fff" }}><path d={ICONS.check} /></svg>
        </div>
        <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "1.8rem", fontWeight: 700, marginBottom: 10 }}>You're all set! 🎉</h2>
        <p style={{ fontSize: ".9rem", color: "var(--text-muted)", marginBottom: 28 }}>Welcome to VolunteerHub. Your registration is complete.</p>
        <button onClick={() => navigate("volunteer-login")} style={{ padding: "13px 28px", background: "linear-gradient(135deg,var(--primary),var(--primary-h))", color: "#fff", borderRadius: 12, fontFamily: "'Nunito',sans-serif", fontSize: ".9rem", fontWeight: 700, border: "none", cursor: "pointer" }}>Go to Sign In →</button>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", overflowX: "hidden" }}>
      <div style={{ background: "linear-gradient(160deg,#1a1a2e 0%,#C8522A 55%,#EDB84A 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 48px", position: "relative", overflow: "hidden", minHeight: "100vh" }}>
        <div style={{ position: "relative", zIndex: 1, textAlign: "center", maxWidth: 360 }}>
          <h1 style={{ fontFamily: "'Fraunces',serif", fontSize: "2.4rem", fontWeight: 700, color: "#fff", marginBottom: 16 }}>Start your <em style={{ fontStyle: "italic", color: "var(--accent)" }}>journey</em> with us</h1>
          <p style={{ fontSize: ".95rem", color: "rgba(255,255,255,.78)", lineHeight: 1.65, marginBottom: 36 }}>It only takes 2 minutes to register.</p>
          {[["1", "Personal Details", "Tell us who you are — your name, age, and contact info."], ["2", "Skills & Interests", "Help us match you with events that fit your passions."], ["3", "Location & Bio", "Let us know where you're based so we can find nearby opportunities."]].map(([n, t, d]) => (
            <div key={n} style={{ display: "flex", alignItems: "flex-start", gap: 14, textAlign: "left", marginBottom: 16 }}>
              <div style={{ width: 28, height: 28, background: "rgba(255,255,255,.18)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".72rem", fontWeight: 700, color: "#fff", flexShrink: 0 }}>{n}</div>
              <div><strong style={{ color: "#fff", display: "block", fontSize: ".88rem" }}>{t}</strong><span style={{ fontSize: ".85rem", color: "rgba(255,255,255,.8)" }}>{d}</span></div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "48px 40px", overflowY: "auto", minHeight: "100vh" }}>
        <div style={{ width: "100%", maxWidth: 480, paddingBottom: 40 }}>
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              {["PERSONAL", "SKILLS", "LOCATION"].map((l, i) => <span key={l} style={{ fontSize: ".72rem", fontWeight: 700, color: step === i + 1 ? "var(--primary)" : step > i + 1 ? "var(--secondary)" : "var(--text-muted)", letterSpacing: .4 }}>{l}</span>)}
            </div>
            <div style={{ height: 5, background: "var(--border)", borderRadius: 10, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg,var(--primary),var(--accent))", borderRadius: 10, transition: "width .4s ease" }}></div>
            </div>
          </div>

          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "1.8rem", fontWeight: 700, marginBottom: 6 }}>Create your account</h2>
          <p style={{ fontSize: ".88rem", color: "var(--text-muted)", marginBottom: 28 }}>Join thousands making a difference in Bangalore.</p>

          {step === 1 && (
            <div style={{ animation: "fadeIn .35s ease" }}>
              <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: "1.05rem", marginBottom: 20, paddingBottom: 10, borderBottom: "2px solid var(--border)" }}>1. Personal Details</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[["firstName", "First Name", "text", "Priya"], ["lastName", "Last Name", "text", "Sharma"]].map(([k, l, t, p]) => (
                  <div key={k} className="form-field"><label>{l} *</label><div className="input-wrap"><svg viewBox="0 0 24 24"><path d={ICONS.user} /></svg><input type={t} placeholder={p} value={form[k]} onChange={e => upd(k, e.target.value)} style={{ borderColor: errors[k] ? "#e74c3c" : undefined }} /></div>{errors[k] && <div style={{ fontSize: ".75rem", color: "#e74c3c", marginTop: 5 }}>Required</div>}</div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div className="form-field"><label>Age *</label><div className="input-wrap"><svg viewBox="0 0 24 24"><path d={ICONS.user} /></svg><input type="number" placeholder="24" value={form.age} onChange={e => upd("age", e.target.value)} style={{ borderColor: errors.age ? "#e74c3c" : undefined }} /></div>{errors.age && <div style={{ fontSize: ".75rem", color: "#e74c3c", marginTop: 5 }}>Valid age (16-99)</div>}</div>
                <div className="form-field"><label>Gender</label><div className="input-wrap"><svg viewBox="0 0 24 24"><path d={ICONS.user} /></svg><select value={form.gender} onChange={e => upd("gender", e.target.value)}><option value="">Select…</option>{["Male", "Female", "Non-binary", "Prefer not to say"].map(g => <option key={g}>{g}</option>)}</select></div></div>
              </div>
              <div className="form-field"><label>Email *</label><div className="input-wrap"><svg viewBox="0 0 24 24"><path d={ICONS.email} /></svg><input type="email" placeholder="priya@email.com" value={form.email} onChange={e => upd("email", e.target.value)} style={{ borderColor: errors.email ? "#e74c3c" : undefined }} /></div>{errors.email && <div style={{ fontSize: ".75rem", color: "#e74c3c", marginTop: 5 }}>Valid email required</div>}</div>
              <div className="form-field"><label>Phone *</label><div className="input-wrap"><svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" /></svg><input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => upd("phone", e.target.value)} style={{ borderColor: errors.phone ? "#e74c3c" : undefined }} /></div>{errors.phone && <div style={{ fontSize: ".75rem", color: "#e74c3c", marginTop: 5 }}>Valid phone required</div>}</div>
              <div className="form-field"><label>Password *</label><div className="input-wrap"><svg viewBox="0 0 24 24"><path d={ICONS.lock} /></svg><input type="password" placeholder="Min. 6 characters" value={form.password} onChange={e => upd("password", e.target.value)} style={{ borderColor: errors.password ? "#e74c3c" : undefined }} /></div>{errors.password && <div style={{ fontSize: ".75rem", color: "#e74c3c", marginTop: 5 }}>Min. 6 characters</div>}</div>
              <div className="form-field"><label>Confirm Password *</label><div className="input-wrap"><svg viewBox="0 0 24 24"><path d={ICONS.lock} /></svg><input type="password" placeholder="Re-enter password" value={form.confirmPassword} onChange={e => upd("confirmPassword", e.target.value)} style={{ borderColor: errors.confirmPassword ? "#e74c3c" : undefined }} /></div>{errors.confirmPassword && <div style={{ fontSize: ".75rem", color: "#e74c3c", marginTop: 5 }}>Passwords do not match</div>}</div>
              <button onClick={() => validateStep1() && setStep(2)} style={{ width: "100%", padding: 13, borderRadius: 12, background: "linear-gradient(135deg,var(--primary),var(--primary-h))", color: "#fff", fontFamily: "'Nunito',sans-serif", fontSize: ".95rem", fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 4px 14px rgba(200,82,42,.28)" }}>Continue →</button>
            </div>
          )}

          {step === 2 && (
            <div style={{ animation: "fadeIn .35s ease" }}>
              <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: "1.05rem", marginBottom: 20, paddingBottom: 10, borderBottom: "2px solid var(--border)" }}>2. Skills & Interests</h3>
              <div style={{ marginBottom: 16 }}><label style={{ fontSize: ".82rem", fontWeight: 700, display: "block", marginBottom: 10 }}>Your Skills *</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {SKILLS.map(s => <button key={s} onClick={() => toggleChip(s, skills, setSkills)} style={{ padding: "7px 14px", border: `2px solid ${skills.has(s) ? "var(--secondary)" : "var(--border)"}`, borderRadius: 20, fontSize: ".8rem", fontWeight: 600, cursor: "pointer", background: skills.has(s) ? "var(--secondary-pale)" : "var(--surface)", color: skills.has(s) ? "var(--admin)" : "var(--text-muted)" }}>{s}</button>)}
                </div>
                {errors.skills && <div style={{ fontSize: ".75rem", color: "#e74c3c", marginTop: 8 }}>Select at least one skill</div>}
              </div>
              <div style={{ marginBottom: 16 }}><label style={{ fontSize: ".82rem", fontWeight: 700, display: "block", marginBottom: 10 }}>Areas of Interest *</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {INTERESTS.map(s => <button key={s} onClick={() => toggleChip(s, interests, setInterests)} style={{ padding: "7px 14px", border: `2px solid ${interests.has(s) ? "var(--accent)" : "var(--border)"}`, borderRadius: 20, fontSize: ".8rem", fontWeight: 600, cursor: "pointer", background: interests.has(s) ? "var(--accent-pale)" : "var(--surface)", color: interests.has(s) ? "#7a5800" : "var(--text-muted)" }}>{s}</button>)}
                </div>
                {errors.interests && <div style={{ fontSize: ".75rem", color: "#e74c3c", marginTop: 8 }}>Select at least one interest</div>}
              </div>
              <div className="form-field"><label>Availability</label><div className="input-wrap"><svg viewBox="0 0 24 24"><path d={ICONS.calendar} /></svg><select value={form.availability} onChange={e => upd("availability", e.target.value)}><option value="">Select…</option>{["Weekdays only", "Weekends only", "Both weekdays & weekends", "Flexible / Anytime"].map(a => <option key={a}>{a}</option>)}</select></div></div>
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button onClick={() => setStep(1)} style={{ padding: "13px 22px", borderRadius: 12, border: "2px solid var(--border)", background: "transparent", fontFamily: "'Nunito',sans-serif", fontSize: ".9rem", fontWeight: 700, color: "var(--text-muted)", cursor: "pointer" }}>← Back</button>
                <button onClick={() => validateStep2() && setStep(3)} style={{ flex: 1, padding: 13, borderRadius: 12, background: "linear-gradient(135deg,var(--primary),var(--primary-h))", color: "#fff", fontFamily: "'Nunito',sans-serif", fontSize: ".95rem", fontWeight: 700, border: "none", cursor: "pointer" }}>Continue →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ animation: "fadeIn .35s ease" }}>
              <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: "1.05rem", marginBottom: 20, paddingBottom: 10, borderBottom: "2px solid var(--border)" }}>3. Location & About You</h3>
              <div className="form-field"><label>City / District *</label><div className="input-wrap"><svg viewBox="0 0 24 24"><path d={ICONS.pin} /></svg><input type="text" placeholder="e.g. Bangalore" value={form.city} onChange={e => upd("city", e.target.value)} style={{ borderColor: errors.city ? "#e74c3c" : undefined }} /></div>{errors.city && <div style={{ fontSize: ".75rem", color: "#e74c3c", marginTop: 5 }}>City required</div>}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div className="form-field"><label>State</label><div className="input-wrap"><svg viewBox="0 0 24 24"><path d={ICONS.pin} /></svg><select value={form.state} onChange={e => upd("state", e.target.value)}><option value="">Select…</option>{["Karnataka", "Maharashtra", "Tamil Nadu", "Kerala", "Delhi", "Gujarat", "Other"].map(s => <option key={s}>{s}</option>)}</select></div></div>
                <div className="form-field"><label>Pincode</label><div className="input-wrap"><svg viewBox="0 0 24 24"><path d={ICONS.pin} /></svg><input type="text" placeholder="560001" maxLength={6} value={form.pincode} onChange={e => upd("pincode", e.target.value)} /></div></div>
              </div>
              <div className="form-field"><label>About You</label><div className="input-wrap"><svg viewBox="0 0 24 24" style={{ top: 16, transform: "none" }}><path d={ICONS.edit} /></svg><textarea placeholder="Tell us about your motivation…" maxLength={300} value={form.bio} onChange={e => upd("bio", e.target.value)} style={{ padding: "12px 14px 12px 42px", resize: "vertical", minHeight: 80 }} /></div></div>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 8 }}>
                <input type="checkbox" checked={form.agree || false} onChange={e => upd("agree", e.target.checked)} style={{ marginTop: 3, accentColor: "var(--primary)", width: 16, height: 16 }} />
                <span style={{ fontSize: ".83rem", fontWeight: 600, color: "var(--text-muted)" }}>I agree to the <a href="#" style={{ color: "var(--primary)" }}>Terms & Conditions</a> *</span>
              </label>
              {errors.terms && <div style={{ fontSize: ".75rem", color: "#e74c3c", marginBottom: 8 }}>You must agree to the terms</div>}
              <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
                <button onClick={() => setStep(2)} style={{ padding: "13px 22px", borderRadius: 12, border: "2px solid var(--border)", background: "transparent", fontFamily: "'Nunito',sans-serif", fontSize: ".9rem", fontWeight: 700, color: "var(--text-muted)", cursor: "pointer" }}>← Back</button>
                <button onClick={submit} style={{ flex: 1, padding: 13, borderRadius: 12, background: "linear-gradient(135deg,var(--secondary),var(--admin))", color: "#fff", fontFamily: "'Nunito',sans-serif", fontSize: ".95rem", fontWeight: 700, border: "none", cursor: "pointer" }}>🌱 Complete Registration</button>
              </div>
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: 20, fontSize: ".84rem", color: "var(--text-muted)" }}>Already registered? <button onClick={() => navigate("volunteer-login")} style={{ color: "var(--primary)", fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>Sign in here</button></div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE: ADMIN LOGIN
───────────────────────────────────────────── */
function AdminLogin({ navigate }) {
  const [email, setEmail] = useState("shreya@volunteerhub.org");
  const [password, setPassword] = useState("admin123");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState(false);

  function doLogin() {
    if (email && password) navigate("admin-dashboard");
    else setError(true);
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, position: "relative", overflow: "hidden" }}>
      {[[500, -120, -120, "var(--primary)"], [350, null, -80, "var(--admin)", null, -80], [200, "50%", "20%", "var(--accent)"]].map(([s, t, l, bg, b, r], i) => (
        <div key={i} style={{ position: "fixed", width: s, height: s, borderRadius: "50%", background: bg, opacity: .08, top: t !== null && typeof t === "number" ? t : typeof t === "string" ? t : undefined, bottom: b ?? undefined, left: l !== null && typeof l === "number" ? l : typeof l === "string" ? l : undefined, right: r ?? undefined, pointerEvents: "none" }}></div>
      ))}
      <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 24, padding: 48, width: "100%", maxWidth: 440, boxShadow: "0 20px 60px rgba(45,36,32,.12)", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 36 }}>
          <div style={{ width: 44, height: 44, background: "linear-gradient(135deg,var(--admin),#40916C)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg viewBox="0 0 24 24" style={{ width: 22, height: 22, fill: "#fff" }}><path d={ICONS.heart} /></svg>
          </div>
          <div><div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.25rem", fontWeight: 700 }}>VolunteerHub</div><div style={{ fontSize: ".72rem", color: "var(--admin)", fontWeight: 700, letterSpacing: .5 }}>ADMIN PORTAL</div></div>
        </div>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "linear-gradient(135deg,var(--admin),#40916C)", color: "#fff", padding: "6px 14px", borderRadius: 20, fontSize: ".75rem", fontWeight: 700, marginBottom: 28 }}>
          <svg viewBox="0 0 24 24" style={{ width: 13, height: 13, fill: "#fff" }}><path d={ICONS.shield} /></svg>Admin Access Only
        </div>
        <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "1.8rem", fontWeight: 700, marginBottom: 6 }}>Welcome back</h2>
        <p style={{ fontSize: ".88rem", color: "var(--text-muted)", marginBottom: 32 }}>Sign in to manage your volunteer programs</p>
        {error && <div style={{ background: "#fde8e8", border: "1px solid #f5c6c6", borderRadius: 10, padding: "10px 14px", fontSize: ".82rem", color: "#c0392b", fontWeight: 600, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>⚠ Invalid credentials. Please try again.</div>}
        <div className="form-field"><label>Email Address</label><div className="input-wrap"><svg viewBox="0 0 24 24"><path d={ICONS.email} /></svg><input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ borderColor: "var(--admin)" }} onKeyDown={e => e.key === "Enter" && doLogin()} /></div></div>
        <div className="form-field"><label>Password</label><div className="input-wrap" style={{ position: "relative" }}>
          <svg viewBox="0 0 24 24"><path d={ICONS.lock} /></svg>
          <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} style={{ paddingRight: 42, borderColor: "var(--admin)" }} onKeyDown={e => e.key === "Enter" && doLogin()} />
          <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}><svg viewBox="0 0 24 24" style={{ width: 16, height: 16, fill: "currentColor" }}><path d={ICONS.eye} /></svg></button>
        </div></div>
        <button onClick={doLogin} style={{ width: "100%", padding: 14, borderRadius: 12, background: "linear-gradient(135deg,var(--admin),#40916C)", color: "#fff", fontFamily: "'Nunito',sans-serif", fontSize: ".95rem", fontWeight: 700, border: "none", cursor: "pointer", boxShadow: "0 4px 14px rgba(45,106,79,.35)" }}>Sign In to Admin Portal</button>
        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "24px 0", color: "var(--text-muted)", fontSize: ".8rem" }}>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }}></div>or<div style={{ flex: 1, height: 1, background: "var(--border)" }}></div>
        </div>
        <button onClick={() => navigate("volunteer-login")} style={{ display: "block", textAlign: "center", padding: 12, border: "2px solid var(--border)", borderRadius: 12, fontSize: ".85rem", fontWeight: 600, color: "var(--text-muted)", width: "100%", background: "none", cursor: "pointer" }}>🤝 Volunteer? Sign in here</button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE: VOLUNTEER DASHBOARD
───────────────────────────────────────────── */
function VolunteerDashboard({ navigate, volunteer }) {
  const [status, setStatus] = useState("Available"); // Added state for availability toggle

  const myEvents = [
    { icon: "🌿", color: "#e4f2eb", name: "Community Park Clean-Up Drive", date: "Apr 3, 2026 · 8:00 AM", status: "Upcoming" },
    { icon: "📚", color: "#FBE8DF", name: "Children's Reading Workshop", date: "Apr 8, 2026 · 10:00 AM", status: "Upcoming" },
    { icon: "🍱", color: "#FDF3D8", name: "Food Distribution Drive", date: "Apr 15, 2026 · 6:00 AM", status: "Active" },
  ];
  const avail = [
    { icon: "🏥", color: "#f3e8fd", name: "Health Camp", date: "Apr 22" },
    { icon: "💡", color: "#e8f0fe", name: "Skill Workshop", date: "Apr 28" },
    { icon: "🎨", color: "#FBE8DF", name: "Art for Seniors", date: "May 5" },
    { icon: "🌳", color: "#e4f2eb", name: "Tree Plantation", date: "May 12" },
  ];
  const name = volunteer ? `${volunteer.firstName} ${volunteer.lastName}` : "Arjun Sharma";
  const initials = name.split(" ").map(n => n[0]).join("").slice(0, 2);

  return (
    <div style={{ display: "flex" }}>
      <VolSidebar current="volunteer-dashboard" navigate={navigate} volunteer={volunteer} />
      <div className="main-wrap">
        <div className="topbar"><span className="topbar-title">My Dashboard</span></div>
        <div className="content">
          <div style={{ background: "linear-gradient(135deg,var(--primary) 0%,#B04420 50%,var(--accent) 100%)", borderRadius: "var(--radius)", padding: "28px 32px", marginBottom: 28, display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(255,255,255,.25)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Fraunces',serif", fontSize: "1.8rem", fontWeight: 700, color: "#fff", flexShrink: 0, border: "3px solid rgba(255,255,255,.4)" }}>{initials}</div>
              <div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.4rem", fontWeight: 700, color: "#fff", marginBottom: 3 }}>{name}</div>
                <div style={{ fontSize: ".85rem", color: "rgba(255,255,255,.75)", marginBottom: 12 }}>📍 Bangalore</div>
                <div style={{ display: "flex", gap: 24 }}>
                  {[["13", "HOURS"], ["3", "EVENTS"]].map(([n, l]) => (
                    <div key={l} style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.3rem", fontWeight: 700, color: "#fff" }}>{n}</div>
                      <div style={{ fontSize: ".7rem", color: "rgba(255,255,255,.65)", fontWeight: 600 }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Availability Toggle */}
            <div style={{ background: "rgba(255,255,255,0.15)", padding: "12px 18px", borderRadius: 16, backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "rgba(255,255,255,0.9)", letterSpacing: 0.5 }}>STATUS</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: status === "Available" ? "#9ef01a" : "rgba(255,255,255,0.5)" }}>Available</span>
                <div 
                  onClick={() => setStatus(prev => prev === "Available" ? "Busy" : "Available")}
                  style={{ width: 44, height: 22, background: status === "Available" ? "#38b000" : "#d00000", borderRadius: 20, position: "relative", cursor: "pointer", transition: "all 0.3s ease", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)" }}
                >
                  <div style={{ width: 18, height: 18, background: "#fff", borderRadius: "50%", position: "absolute", top: 2, left: status === "Available" ? 24 : 2, transition: "all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)", boxShadow: "0 2px 4px rgba(0,0,0,0.3)" }}></div>
                </div>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: status === "Busy" ? "#ff4d4d" : "rgba(255,255,255,0.5)" }}>Busy</span>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
            {[["⭐", "var(--accent-pale)", "Top 5%", "Volunteer Rank"], ["🌱", "var(--secondary-pale)", "2 yrs", "Member Since"], ["🔥", "var(--primary-pale)", "12", "Week Streak"]].map(([ic, bg, n, l]) => (
              <div key={l} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 20, display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>{ic}</div>
                <div><div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.6rem", fontWeight: 700 }}>{n}</div><div style={{ fontSize: ".78rem", color: "var(--text-muted)", fontWeight: 600 }}>{l}</div></div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }}>
            <div>
              <div className="panel">
                <div className="panel-header"><span className="panel-title">My Upcoming Events</span><span className="badge badge-amber">3 registered</span></div>
                <div className="panel-body">
                  {myEvents.map((e, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: i < myEvents.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, background: e.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>{e.icon}</div>
                      <div style={{ flex: 1 }}><div style={{ fontSize: ".88rem", fontWeight: 700 }}>{e.name}</div><div style={{ fontSize: ".76rem", color: "var(--text-muted)", marginTop: 2 }}>{e.date}</div></div>
                      <span className={`badge ${e.status === "Active" ? "badge-orange" : "badge-amber"}`}>{e.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="panel">
                <div className="panel-header"><span className="panel-title">Available Events</span></div>
                <div className="panel-body">
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    {avail.map((e, i) => (
                      <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 16, transition: "all .2s" }}>
                        <div style={{ fontSize: "1.6rem", marginBottom: 10 }}>{e.icon}</div>
                        <div style={{ fontSize: ".88rem", fontWeight: 700, marginBottom: 4 }}>{e.name}</div>
                        <div style={{ fontSize: ".76rem", color: "var(--text-muted)", marginBottom: 10 }}>{e.date}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE: ADMIN DASHBOARD
───────────────────────────────────────────── */
function AdminDashboard({ navigate }) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const vals = [32, 47, 28, 55, 41, 38, 62];
  const maxV = Math.max(...vals);
  const colors = ["#5E9E7A", "#5E9E7A", "#5E9E7A", "#C8522A", "#5E9E7A", "#5E9E7A", "#5E9E7A"];
  const [pendingList, setPendingList] = useState([
    { name: "Rahul Menon", event: "Park Clean-Up Drive", color: "linear-gradient(135deg,#5E9E7A,#40916C)" },
    { name: "Vikram Patel", event: "Community Health Camp", color: "linear-gradient(135deg,#C8522A,#EDB84A)" },
    { name: "Sunita Bose", event: "Children's Reading Workshop", color: "linear-gradient(135deg,#9b59b6,#3498db)" },
    { name: "Ajay Thomas", event: "Food Distribution Drive", color: "linear-gradient(135deg,#2D6A4F,#40916C)" },
    { name: "Riya Desai", event: "Park Clean-Up Drive", color: "linear-gradient(135deg,#EDB84A,#C8522A)" },
  ]);
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const events = [
    { day: "3", month: "APR", name: "Park Clean-Up Drive", loc: "Cubbon Park", slots: "6/20" },
    { day: "8", month: "APR", name: "Children's Reading Workshop", loc: "City Library", slots: "12/15" },
    { day: "15", month: "APR", name: "Food Distribution Drive", loc: "Whitefield", slots: "18/30" },
    { day: "22", month: "APR", name: "Community Health Camp", loc: "Koramangala", slots: "3/10" },
  ];
  const activity = [
    { color: "#EDB84A", text: "Food Distribution Drive: 5 new volunteer sign-ups", time: "28m ago" },
    { color: "#5E9E7A", text: "Park Clean-Up Drive: 3 volunteers confirmed", time: "1h ago" },
    { color: "#3498db", text: "Community Health Camp event created", time: "3h ago" },
    { color: "#C8522A", text: "Tree Plantation Drive marked as Completed", time: "Yesterday" },
    { color: "#5E9E7A", text: "Children's Reading Workshop: 2 new sign-ups", time: "Yesterday" },
  ];

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar current="admin-dashboard" navigate={navigate} />
      <div className="main-wrap">
        <div className="topbar">
          <div><div className="topbar-title">Dashboard</div><div style={{ fontSize: ".78rem", color: "var(--text-muted)" }}>Thursday, 26 March 2026</div></div>
          <div ref={notifRef} style={{ position: "relative" }}>
            <button onClick={() => setShowNotif(v => !v)} style={{ width: 38, height: 38, borderRadius: 9, border: `1px solid ${showNotif ? "var(--primary)" : "var(--border)"}`, background: showNotif ? "var(--primary-pale)" : "var(--surface)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", transition: "all .15s" }}>
              <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: showNotif ? "var(--primary)" : "var(--text-muted)" }}><path d={ICONS.notif} /></svg>
              {pendingList.length > 0 && (
                <div style={{ position: "absolute", top: 5, right: 5, minWidth: 16, height: 16, background: "var(--primary)", borderRadius: 8, border: "2px solid var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".6rem", fontWeight: 700, color: "#fff", padding: "0 3px" }}>
                  {pendingList.length}
                </div>
              )}
            </button>
            {showNotif && (
              <div style={{ position: "absolute", top: 48, right: 0, width: 360, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 16, boxShadow: "0 12px 40px rgba(45,36,32,.15)", zIndex: 200, overflow: "hidden", animation: "fadeIn .2s ease" }}>
                <div style={{ padding: "16px 18px 12px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div>
                    <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1rem", fontWeight: 700, color: "var(--text)" }}>Pending Approvals</div>
                    <div style={{ fontSize: ".74rem", color: "var(--text-muted)", marginTop: 2 }}>{pendingList.length} volunteer{pendingList.length !== 1 ? "s" : ""} awaiting review</div>
                  </div>
                  <button onClick={() => navigate("volunteer-management")} style={{ fontSize: ".76rem", color: "var(--primary)", fontWeight: 700, background: "none", border: "none", cursor: "pointer", whiteSpace: "nowrap" }}>View all →</button>
                </div>
                <div style={{ maxHeight: 340, overflowY: "auto" }}>
                  {pendingList.length === 0 ? (
                    <div style={{ padding: "28px 18px", textAlign: "center" }}>
                      <div style={{ fontSize: "2rem", marginBottom: 8 }}>✅</div>
                      <div style={{ fontSize: ".86rem", fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>All caught up!</div>
                      <div style={{ fontSize: ".78rem", color: "var(--text-muted)" }}>No pending approvals right now.</div>
                    </div>
                  ) : pendingList.map((p, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 18px", borderBottom: i < pendingList.length - 1 ? "1px solid var(--border)" : "none", background: "var(--surface)", transition: "background .15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "var(--surface-2)"}
                      onMouseLeave={e => e.currentTarget.style.background = "var(--surface)"}
                    >
                      <div style={{ width: 36, height: 36, borderRadius: "50%", background: p.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: ".85rem", flexShrink: 0 }}>{p.name[0]}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: ".86rem", fontWeight: 700, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                        <div style={{ fontSize: ".74rem", color: "var(--text-muted)", marginTop: 1 }}>📅 {p.event}</div>
                      </div>
                      <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                        <button onClick={() => setPendingList(pl => pl.filter((_, j) => j !== i))} style={{ padding: "5px 11px", borderRadius: 7, background: "var(--secondary-pale)", color: "#2d7a50", fontFamily: "'Nunito',sans-serif", fontSize: ".76rem", fontWeight: 700, cursor: "pointer", border: "none" }}>✓ Approve</button>
                        <button onClick={() => setPendingList(pl => pl.filter((_, j) => j !== i))} style={{ padding: "5px 9px", borderRadius: 7, background: "#fde8e8", color: "#c0392b", fontFamily: "'Nunito',sans-serif", fontSize: ".76rem", fontWeight: 700, cursor: "pointer", border: "none" }}>✗</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="content">
          <div style={{ background: "linear-gradient(135deg,var(--admin),#40916C)", borderRadius: "var(--radius)", padding: "28px 32px", marginBottom: 28, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div><div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: 4 }}>Good morning, Shreya 👋</div><div style={{ fontSize: ".88rem", color: "rgba(255,255,255,.75)" }}>8 volunteers pending approval · 3 events this week</div></div>
            <div style={{ fontSize: "3rem", opacity: .6 }}>🌿</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 28 }}>
            {[["🟢", "var(--secondary-pale)", "3,104", "Active Volunteers", "↑ 86 this month", true], ["📅", "var(--primary-pale)", "5", "Active Events", "↑ 2 from last week", true], ["⏱", "var(--accent-pale)", "12.4K", "Volunteer Hours", "↑ 320 this week", true], ["✅", "#f3e8fd", "8", "Pending Approvals", "↑ 3 since yesterday", false]].map(([ic, bg, n, l, c, up]) => (
              <div key={l} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 22, display: "flex", alignItems: "flex-start", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>{ic}</div>
                <div><div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.9rem", fontWeight: 700, lineHeight: 1 }}>{n}</div><div style={{ fontSize: ".78rem", color: "var(--text-muted)", fontWeight: 600, marginTop: 3 }}>{l}</div><div style={{ fontSize: ".72rem", fontWeight: 700, marginTop: 6, color: up ? "var(--secondary)" : "var(--primary)" }}>{c}</div></div>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 20 }}>
            <div className="panel">
              <div className="panel-header"><span className="panel-title">Volunteer Activity (Last 7 Days)</span><span className="badge badge-green">62 hrs peak — Sunday</span></div>
              <div className="panel-body">
                <div style={{ height: 160, display: "flex", alignItems: "flex-end", gap: 8 }}>
                  {vals.map((v, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <div style={{ fontSize: ".68rem", color: "var(--text-muted)", fontWeight: 700 }}>{v}</div>
                      <div style={{ width: "100%", height: (v / maxV) * 120, background: colors[i], borderRadius: "6px 6px 0 0", minHeight: 10, transition: "opacity .2s" }} title={`${v} hrs`}></div>
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 8, padding: "8px 0 0", fontSize: ".7rem", color: "var(--text-muted)" }}>
                  {days.map(d => <span key={d} style={{ flex: 1, textAlign: "center" }}>{d}</span>)}
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div className="panel">
              <div className="panel-header"><span className="panel-title">Upcoming Events</span><button onClick={() => navigate("event-management")} style={{ fontSize: ".8rem", color: "var(--primary)", fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>Manage</button></div>
              <div className="panel-body">
                {events.map((e, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: i < events.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: "var(--primary-pale)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                      <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1rem", fontWeight: 700, color: "var(--primary)", lineHeight: 1 }}>{e.day}</div>
                      <div style={{ fontSize: ".62rem", color: "var(--primary)", fontWeight: 700, textTransform: "uppercase" }}>{e.month}</div>
                    </div>
                    <div><div style={{ fontSize: ".86rem", fontWeight: 700 }}>{e.name}</div><div style={{ fontSize: ".74rem", color: "var(--text-muted)", marginTop: 2 }}>📍 {e.loc}</div></div>
                    <div style={{ marginLeft: "auto", textAlign: "right" }}>
                      <span style={{ fontFamily: "'Fraunces',serif", fontSize: "1rem", fontWeight: 700, display: "block" }}>{e.slots}</span>
                      <span style={{ fontSize: ".76rem", color: "var(--text-muted)" }}>slots</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="panel">
              <div className="panel-header"><span className="panel-title">Recent Activity</span></div>
              <div className="panel-body">
                {activity.map((a, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "10px 0", borderBottom: i < activity.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: a.color, flexShrink: 0, marginTop: 5 }}></div>
                    <div style={{ fontSize: ".84rem", flex: 1, lineHeight: 1.4 }}>{a.text}</div>
                    <div style={{ fontSize: ".74rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>{a.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE: VOLUNTEER MANAGEMENT
───────────────────────────────────────────── */
function VolunteerManagement({ navigate }) {
  const allVols = [
    { name: "Arjun Sharma", email: "arjun.s@email.com", status: "Active", area: "Environment", skills: ["Teaching", "First Aid"], hours: 148, events: 23, joined: "Jan 2024" },
    { name: "Priya Mehta", email: "priya.m@email.com", status: "Active", area: "Education", skills: ["Literacy", "Mentoring"], hours: 220, events: 31, joined: "Mar 2022" },
    { name: "Rahul Menon", email: "rahul.m@email.com", status: "Pending", area: "Environment", skills: ["Gardening"], hours: 0, events: 0, joined: "Mar 2026" },
    { name: "Deepa Krishnan", email: "deepa.k@email.com", status: "Active", area: "Education", skills: ["Teaching", "Coding"], hours: 96, events: 14, joined: "Aug 2023" },
    { name: "Vikram Patel", email: "vikram.p@email.com", status: "Pending", area: "Healthcare", skills: ["First Aid", "CPR"], hours: 0, events: 0, joined: "Mar 2026" },
    { name: "Meena Subramaniam", email: "meena.s@email.com", status: "Active", area: "Food & Nutrition", skills: ["Cooking", "Logistics"], hours: 180, events: 26, joined: "May 2023" },
    { name: "Karthik Rao", email: "karthik.r@email.com", status: "Inactive", area: "Environment", skills: ["Carpentry"], hours: 42, events: 6, joined: "Jul 2022" },
    { name: "Ananya Iyer", email: "ananya.i@email.com", status: "Active", area: "Education", skills: ["Teaching", "Arts"], hours: 134, events: 20, joined: "Nov 2023" },
    { name: "Siddharth Kumar", email: "siddharth.k@email.com", status: "Active", area: "Healthcare", skills: ["Nursing", "First Aid"], hours: 210, events: 28, joined: "Feb 2023" },
    { name: "Lakshmi Nair", email: "lakshmi.n@email.com", status: "Active", area: "Food & Nutrition", skills: ["Cooking", "Distribution"], hours: 167, events: 22, joined: "Apr 2023" },
  ];
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [modalVol, setModalVol] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(""); // Added state for event assignment dropdown

  const availableEvents = [
    "Community Park Clean-Up Drive",
    "Children's Reading Workshop",
    "Food Distribution Drive",
    "Community Health Camp",
    "Skill Development Workshop"
  ];

  const filtered = allVols.filter(v => {
    const q = search.toLowerCase();
    const matchQ = v.name.toLowerCase().includes(q) || v.email.toLowerCase().includes(q) || v.skills.some(s => s.toLowerCase().includes(q));
    const matchS = !statusFilter || v.status === statusFilter;
    return matchQ && matchS;
  });

  const statusBadge = { Active: "badge-green", Pending: "badge-amber", Inactive: "badge-gray" };

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar current="volunteer-management" navigate={navigate} />
      <div className="main-wrap">
        <div className="topbar">
          <span className="topbar-title">Volunteer Management</span>
          <div style={{ display: "flex", gap: 10 }}><button className="btn btn-ghost">📥 Export</button><button className="btn btn-primary">+ Invite Volunteer</button></div>
        </div>
        <div className="content">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 24 }}>
            {[["👥", "#e4f2eb", "4,218", "Total Volunteers"], ["✅", "var(--secondary-pale)", "3,804", "Active"], ["⏳", "var(--accent-pale)", "8", "Pending Approval"], ["🚫", "#fde8e8", "406", "Inactive"]].map(([ic, bg, n, l]) => (
              <div key={l} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: 18, display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 9, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>{ic}</div>
                <div><div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.6rem", fontWeight: 700, lineHeight: 1 }}>{n}</div><div style={{ fontSize: ".75rem", color: "var(--text-muted)", fontWeight: 600, marginTop: 2 }}>{l}</div></div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 240 }}>
              <svg viewBox="0 0 24 24" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, fill: "var(--text-muted)" }}><path d={ICONS.search} /></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search volunteers by name, email or skill…" style={{ width: "100%", padding: "10px 14px 10px 38px", border: "2px solid var(--border)", borderRadius: 10, fontFamily: "'Nunito',sans-serif", fontSize: ".88rem", color: "var(--text)", outline: "none" }} />
            </div>
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: "10px 14px", border: "2px solid var(--border)", borderRadius: 10, fontFamily: "'Nunito',sans-serif", fontSize: ".85rem", outline: "none" }}>
              <option value="">All Status</option><option>Active</option><option>Pending</option><option>Inactive</option>
            </select>
          </div>
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table>
                <thead><tr><th>Volunteer</th><th>Status</th><th>Skills</th><th>Hours</th><th>Events</th><th>Joined</th><th>Actions</th></tr></thead>
                <tbody>
                  {filtered.map((v, i) => (
                    <tr key={i}>
                      <td><div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: avatarColors[i % 5], display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: ".85rem" }}>{v.name[0]}</div>
                        <div><div style={{ fontSize: ".88rem", fontWeight: 700 }}>{v.name}</div><div style={{ fontSize: ".74rem", color: "var(--text-muted)" }}>{v.email}</div></div>
                      </div></td>
                      <td><span className={`badge ${statusBadge[v.status]}`}>{v.status}</span></td>
                      <td>{v.skills.map(s => <span key={s} style={{ display: "inline-block", background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 6, padding: "2px 8px", fontSize: ".7rem", color: "var(--text-muted)", fontWeight: 600, margin: 2 }}>{s}</span>)}</td>
                      <td style={{ fontWeight: 700, fontSize: ".88rem" }}>{v.hours} hrs</td>
                      <td style={{ fontSize: ".88rem" }}>{v.events}</td>
                      <td style={{ fontSize: ".8rem", color: "var(--text-muted)" }}>{v.joined}</td>
                      <td>
                        {v.status === "Pending" ? (
                          <div style={{ display: "flex", gap: 6 }}>
                            <button style={{ padding: "5px 10px", borderRadius: 6, background: "var(--secondary-pale)", color: "var(--secondary)", fontFamily: "'Nunito',sans-serif", fontSize: ".75rem", fontWeight: 700, border: "none", cursor: "pointer" }}>✓ Approve</button>
                            <button style={{ padding: "5px 10px", borderRadius: 6, background: "#fde8e8", color: "#c0392b", fontFamily: "'Nunito',sans-serif", fontSize: ".75rem", fontWeight: 700, border: "none", cursor: "pointer" }}>✗</button>
                          </div>
                        ) : (
                          <button onClick={() => setModalVol({ ...v, idx: i })} style={{ padding: "5px 10px", borderRadius: 6, background: "var(--bg)", color: "var(--text-muted)", border: "1px solid var(--border)", fontFamily: "'Nunito',sans-serif", fontSize: ".75rem", fontWeight: 700, cursor: "pointer" }}>View</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderTop: "1px solid var(--border)" }}>
              <span style={{ fontSize: ".8rem", color: "var(--text-muted)" }}>Showing 1–{filtered.length} of 4,218 volunteers</span>
              <div style={{ display: "flex", gap: 6 }}>
                {["←", "1", "2", "3", "→"].map((p, i) => <button key={i} style={{ width: 32, height: 32, borderRadius: 7, border: "1px solid var(--border)", background: p === "1" ? "var(--primary)" : "var(--surface)", color: p === "1" ? "#fff" : "var(--text-muted)", fontFamily: "'Nunito',sans-serif", fontSize: ".82rem", cursor: "pointer", fontWeight: 600 }}>{p}</button>)}
              </div>
            </div>
          </div>
        </div>
      </div>
      {modalVol && (
        <div className="modal-overlay" onClick={() => setModalVol(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">{modalVol.name}</span>
              <button className="modal-close" onClick={() => setModalVol(null)}>✕</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: 20, background: "var(--bg)", borderRadius: 12, marginBottom: 20 }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: avatarColors[modalVol.idx % 5], display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: "1.4rem" }}>{modalVol.name[0]}</div>
              <div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.2rem", fontWeight: 700 }}>{modalVol.name}</div>
                <div style={{ fontSize: ".83rem", color: "var(--text-muted)", marginTop: 3 }}>{modalVol.email}</div>
                <span className={`badge ${statusBadge[modalVol.status]}`} style={{ marginTop: 8, display: "inline-block" }}>{modalVol.status}</span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
              {[["Joined", modalVol.joined], ["Hours Logged", `${modalVol.hours} hrs`], ["Events Attended", modalVol.events]].map(([l, v]) => (
                <div key={l} style={{ background: "var(--bg)", borderRadius: 8, padding: "10px 14px" }}>
                  <div style={{ fontSize: ".7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: .5, color: "var(--text-muted)", marginBottom: 3 }}>{l}</div>
                  <div style={{ fontSize: ".88rem", fontWeight: 600 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
              <div style={{ flex: 1, position: "relative" }}>
                <select 
                  value={selectedEvent} 
                  onChange={(e) => setSelectedEvent(e.target.value)}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: 12, border: "2px solid var(--border)", fontFamily: "'Nunito',sans-serif", fontSize: "0.85rem", fontWeight: 600, appearance: "none", outline: "none", cursor: "pointer" }}
                >
                  <option value="">Select Event to Assign...</option>
                  {availableEvents.map(ev => <option key={ev} value={ev}>{ev}</option>)}
                </select>
                <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "var(--text-muted)" }}>▼</div>
              </div>
              <button 
                className="btn btn-primary" 
                onClick={() => {
                  if (selectedEvent) {
                    alert(`Assigned ${modalVol.name} to ${selectedEvent}`);
                    setModalVol(null);
                    setSelectedEvent("");
                  } else {
                    alert("Please select an event first");
                  }
                }}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE: EVENT MANAGEMENT
───────────────────────────────────────────── */
function EventManagement({ navigate }) {
  const events = [
    { id: 1, icon: "🌿", color: "#e4f2eb", title: "Community Park Clean-Up Drive", cat: "Environment", date: "Apr 3, 2026", time: "8:00 AM", location: "Cubbon Park, Bangalore", slots: 20, filled: 6, status: "Upcoming" },
    { id: 2, icon: "📚", color: "#FBE8DF", title: "Children's Reading Workshop", cat: "Education", date: "Apr 8, 2026", time: "10:00 AM", location: "City Library, Hall B", slots: 15, filled: 12, status: "Upcoming" },
    { id: 3, icon: "🍱", color: "#FDF3D8", title: "Food Distribution Drive — Whitefield", cat: "Food & Nutrition", date: "Apr 15, 2026", time: "6:00 AM", location: "Whitefield Bus Stand", slots: 30, filled: 18, status: "Active" },
    { id: 4, icon: "🏥", color: "#f3e8fd", title: "Community Health Camp", cat: "Healthcare", date: "Apr 22, 2026", time: "9:00 AM", location: "Koramangala", slots: 10, filled: 3, status: "Upcoming" },
    { id: 5, icon: "💡", color: "#e8f0fe", title: "Skill Development Workshop", cat: "Community", date: "Apr 28, 2026", time: "2:00 PM", location: "NGO Office, Indiranagar", slots: 25, filled: 9, status: "Upcoming" },
    { id: 6, icon: "🌳", color: "#e4f2eb", title: "Tree Plantation Drive — JP Nagar", cat: "Environment", date: "Mar 20, 2026", time: "7:00 AM", location: "JP Nagar Park", slots: 40, filled: 40, status: "Completed" },
    { id: 7, icon: "🎨", color: "#FBE8DF", title: "Art Therapy for Seniors", cat: "Community", date: "Mar 15, 2026", time: "11:00 AM", location: "HSR Layout", slots: 12, filled: 12, status: "Completed" },
    { id: 8, icon: "💊", color: "#f3e8fd", title: "Free Medical Check-Up Camp", cat: "Healthcare", date: "Mar 10, 2026", time: "8:00 AM", location: "Shivajinagar", slots: 8, filled: 8, status: "Completed" },
  ];
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const statusBadge = { Active: "badge-orange", Upcoming: "badge-amber", Completed: "badge-green", Cancelled: "badge-red" };

  const filtered = events.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar current="event-management" navigate={navigate} />
      <div className="main-wrap">
        <div className="topbar">
          <span className="topbar-title">Event Management</span>
          <div style={{ display: "flex", gap: 10 }}><button className="btn btn-ghost">📥 Export</button><button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Create Event</button></div>
        </div>
        <div className="content">
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: 240 }}>
              <svg viewBox="0 0 24 24" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, fill: "var(--text-muted)" }}><path d={ICONS.search} /></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search events…" style={{ width: "100%", padding: "10px 14px 10px 38px", border: "2px solid var(--border)", borderRadius: 10, fontFamily: "'Nunito',sans-serif", fontSize: ".88rem", outline: "none" }} />
            </div>
            <select style={{ padding: "10px 14px", border: "2px solid var(--border)", borderRadius: 10, fontFamily: "'Nunito',sans-serif", fontSize: ".85rem", outline: "none" }}><option>All Status</option><option>Active</option><option>Upcoming</option><option>Completed</option></select>
            <select style={{ padding: "10px 14px", border: "2px solid var(--border)", borderRadius: 10, fontFamily: "'Nunito',sans-serif", fontSize: ".85rem", outline: "none" }}><option>All Categories</option><option>Environment</option><option>Education</option><option>Healthcare</option><option>Food & Nutrition</option></select>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 18 }}>
            {filtered.map((e) => {
              const pct = Math.round((e.filled / e.slots) * 100);
              const fc = pct >= 80 ? "#C8522A" : pct >= 50 ? "#EDB84A" : "#5E9E7A";
              return (
                <div key={e.id} onClick={() => navigate("event-details")} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden", cursor: "pointer", transition: "all .2s" }}>
                  <div style={{ height: 110, background: e.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.8rem", position: "relative" }}>
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.15)" }}></div>
                    <span style={{ position: "relative", zIndex: 1, textShadow: "0 2px 8px rgba(0,0,0,.2)" }}>{e.icon}</span>
                  </div>
                  <div style={{ padding: "18px 20px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10, gap: 10 }}>
                      <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1rem", fontWeight: 700, lineHeight: 1.3, flex: 1 }}>{e.title}</div>
                      <span className={`badge ${statusBadge[e.status]}`}>{e.status}</span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 14 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: ".8rem", color: "var(--text-muted)" }}><svg viewBox="0 0 24 24" style={{ width: 13, height: 13, fill: "currentColor", flexShrink: 0 }}><path d={ICONS.calendar} /></svg>{e.date} · {e.time}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: ".8rem", color: "var(--text-muted)" }}><svg viewBox="0 0 24 24" style={{ width: 13, height: 13, fill: "currentColor", flexShrink: 0 }}><path d={ICONS.pin} /></svg>{e.location}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: "1px solid var(--border)" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: ".8rem", color: "var(--text-muted)" }}>{e.filled} / {e.slots} volunteers filled</div>
                        <div style={{ height: 5, background: "var(--border)", borderRadius: 3, overflow: "hidden", marginTop: 4 }}><div style={{ height: "100%", width: `${pct}%`, background: fc, borderRadius: 3 }}></div></div>
                      </div>
                      <div style={{ display: "flex", gap: 6, marginLeft: 12 }}>
                        {[ICONS.edit, ICONS.trash].map((ic, j) => (
                          <button key={j} onClick={e => e.stopPropagation()} style={{ width: 30, height: 30, borderRadius: 7, border: "1px solid var(--border)", background: "var(--surface)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg viewBox="0 0 24 24" style={{ width: 14, height: 14, fill: "var(--text-muted)" }}><path d={ic} /></svg>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><span className="modal-title">Create New Event</span><button className="modal-close" onClick={() => setShowModal(false)}>✕</button></div>
            <div className="form-field"><label>Event Name</label><div className="input-wrap"><svg viewBox="0 0 24 24"><path d={ICONS.calendar} /></svg><input type="text" placeholder="e.g. Community Clean-Up Drive" /></div></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div className="form-field"><label>Category</label><div className="input-wrap"><svg viewBox="0 0 24 24"><path d={ICONS.forms} /></svg><select><option>Environment</option><option>Education</option><option>Healthcare</option><option>Food & Nutrition</option><option>Community</option></select></div></div>
              <div className="form-field"><label>Volunteer Slots</label><div className="input-wrap"><svg viewBox="0 0 24 24"><path d={ICONS.people} /></svg><input type="number" placeholder="20" /></div></div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <div className="form-field"><label>Date</label><div className="input-wrap"><svg viewBox="0 0 24 24"><path d={ICONS.calendar} /></svg><input type="date" /></div></div>
              <div className="form-field"><label>Time</label><div className="input-wrap"><svg viewBox="0 0 24 24"><path d={ICONS.clock} /></svg><input type="time" /></div></div>
            </div>
            <div className="form-field"><label>Location</label><div className="input-wrap"><svg viewBox="0 0 24 24"><path d={ICONS.pin} /></svg><input type="text" placeholder="Venue name or address" /></div></div>
            <div className="form-field"><label>Description</label><div className="input-wrap"><svg viewBox="0 0 24 24" style={{ top: 16, transform: "none" }}><path d={ICONS.edit} /></svg><textarea placeholder="Describe the event…" style={{ padding: "12px 14px 12px 42px", minHeight: 72, resize: "vertical" }} /></div></div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 20 }}>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setShowModal(false)}>Create Event</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE: EVENT DETAILS
───────────────────────────────────────────── */
function EventDetails({ navigate }) {
  const [showAddVolModal, setShowAddVolModal] = useState(false);
  const vols = [
    { name: "Arjun Sharma", email: "arjun.s@email.com", checked: true },
    { name: "Priya Mehta", email: "priya.m@email.com", checked: true },
    { name: "Meena S.", email: "meena.s@email.com", checked: false },
    { name: "Deepa K.", email: "deepa.k@email.com", checked: false },
    { name: "Karthik Rao", email: "karthik.r@email.com", checked: false },
  ];
  const [tasks, setTasks] = useState([
    { text: "Confirm venue booking with Whitefield authority", done: true },
    { text: "Prepare and print volunteer ID badges", done: true },
    { text: "Coordinate food parcel pickup from donor warehouse", done: false },
    { text: "Brief all volunteers on distribution zones", done: false },
    { text: "Arrange transport for food parcels", done: false },
    { text: "Post-event cleanup and report submission", done: false },
  ]);

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar current="event-management" navigate={navigate} />
      <div className="main-wrap">
        <div className="topbar">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => navigate("event-management")} style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid var(--border)", background: "var(--surface)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--text-muted)" }}>
              <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: "currentColor" }}><path d={ICONS.back} /></svg>
            </button>
            <span className="topbar-title">Event Details</span>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn btn-ghost">✏️ Edit Event</button>
          </div>
        </div>
        <div className="content">
          <div style={{ background: "linear-gradient(135deg,#1a4731,#2D6A4F,#40916C)", borderRadius: "var(--radius)", padding: 36, marginBottom: 24, display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: -40, top: -40, fontSize: "8rem", opacity: .1 }}>🍱</div>
            <div>
              <div style={{ display: "inline-flex", padding: "5px 12px", borderRadius: 20, fontSize: ".75rem", fontWeight: 700, background: "rgba(255,255,255,.2)", color: "#fff", marginBottom: 14 }}>🍱 Food & Nutrition</div>
              <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: "1.8rem", fontWeight: 700, color: "#fff", marginBottom: 16, lineHeight: 1.2 }}>Food Distribution Drive — Whitefield</h2>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                {[["calendar", "April 15, 2026 · 6:00 AM"], ["pin", "Whitefield Bus Stand, Bangalore"], ["clock", "~4–5 hours"]].map(([ic, t]) => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: ".85rem", color: "rgba(255,255,255,.8)" }}>
                    <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, fill: "currentColor" }}><path d={ICONS[ic]} /></svg>{t}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12, position: "relative", zIndex: 1 }}>
              <div style={{ background: "rgba(255,255,255,.15)", borderRadius: 14, padding: "16px 20px", textAlign: "center", backdropFilter: "blur(10px)" }}>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: "2rem", fontWeight: 700, color: "#fff", lineHeight: 1 }}>18/30</div>
                <div style={{ fontSize: ".75rem", color: "rgba(255,255,255,.7)", fontWeight: 600 }}>VOLUNTEERS</div>
                <div style={{ height: 8, background: "rgba(255,255,255,.2)", borderRadius: 4, overflow: "hidden", width: 120, margin: "8px auto 0" }}>
                  <div style={{ height: "100%", width: "60%", background: "#EDB84A", borderRadius: 4 }}></div>
                </div>
              </div>
              <span style={{ display: "inline-flex", padding: "4px 10px", borderRadius: 20, fontSize: ".71rem", fontWeight: 700, background: "rgba(200,82,42,.3)", color: "#fff" }}>Active</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
            <div>
              <div className="panel">
                <div className="panel-header"><span className="panel-title">About this Event</span></div>
                <div className="panel-body">
                  <p style={{ fontSize: ".9rem", lineHeight: 1.7, marginBottom: 20 }}>Volunteers will assist in sorting, packing, and distributing food parcels to underprivileged families around the Whitefield area. Each team will be assigned a specific distribution zone.</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {[["Organiser", "Shreya Nair"], ["Category", "Food & Nutrition"], ["Min Age", "18 years"], ["Skills Needed", "Physical fitness, Logistics"]].map(([l, v]) => (
                      <div key={l} style={{ background: "var(--bg)", borderRadius: 10, padding: "12px 14px" }}>
                        <div style={{ fontSize: ".7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: .5, color: "var(--text-muted)", marginBottom: 4 }}>{l}</div>
                        <div style={{ fontSize: ".9rem", fontWeight: 700 }}>{v}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="panel">
                <div className="panel-header"><span className="panel-title">Assigned Volunteers (18)</span><button onClick={() => setShowAddVolModal(true)} className="btn btn-primary" style={{ fontSize: ".8rem", padding: "7px 14px" }}>+ Add</button></div>
                <table>
                  <thead><tr><th>Volunteer</th><th>Status</th><th></th></tr></thead>
                  <tbody>
                    {vols.map((v, i) => (
                      <tr key={i}>
                        <td><div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div style={{ width: 32, height: 32, borderRadius: "50%", background: avatarColors[i % 5], display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: ".8rem" }}>{v.name[0]}</div>
                          <div><div style={{ fontSize: ".86rem", fontWeight: 700 }}>{v.name}</div><div style={{ fontSize: ".72rem", color: "var(--text-muted)" }}>{v.email}</div></div>
                        </div></td>
                        <td><span className={`badge ${v.checked ? "badge-green" : "badge-amber"}`}>{v.checked ? "Confirmed" : "Pending"}</span></td>
                        <td><button style={{ padding: "5px 10px", borderRadius: 6, background: "#fde8e8", color: "#c0392b", fontFamily: "'Nunito',sans-serif", fontSize: ".75rem", fontWeight: 700, border: "none", cursor: "pointer" }}>Remove</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div className="panel">
                <div className="panel-header"><span className="panel-title">Event Checklist</span></div>
                <div className="panel-body">
                  {tasks.map((t, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: i < tasks.length - 1 ? "1px solid var(--border)" : "none" }}>
                      <input type="checkbox" checked={t.done} onChange={() => setTasks(ts => ts.map((x, j) => j === i ? { ...x, done: !x.done } : x))} style={{ width: 18, height: 18, accentColor: "var(--secondary)", cursor: "pointer", flexShrink: 0 }} />
                      <span style={{ fontSize: ".88rem", textDecoration: t.done ? "line-through" : "none", color: t.done ? "var(--text-muted)" : "var(--text)" }}>{t.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="panel">
                <div className="panel-header"><span className="panel-title">Quick Stats</span></div>
                <div className="panel-body">
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {[["Est. Hours", "~90 hrs", "var(--bg)", "var(--border)"], ["Total Volunteers", "30", "var(--secondary-pale)", "transparent"], ["Accepted", "18", "var(--accent-pale)", "transparent"]].map(([l, v, bg, border]) => (
                      <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: 12, background: bg, borderRadius: 10, border: `1px solid ${border}` }}>
                        <span style={{ fontSize: ".84rem", fontWeight: 700 }}>{l}</span>
                        <span style={{ fontFamily: "'Fraunces',serif", fontSize: "1.3rem", fontWeight: 700 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showAddVolModal && (
        <div className="modal-overlay" onClick={() => setShowAddVolModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <span className="modal-title">Add Volunteer</span>
              <button className="modal-close" onClick={() => setShowAddVolModal(false)}>✕</button>
            </div>
            <div className="form-field">
              <label>Select Volunteer</label>
              <div className="input-wrap">
                <svg viewBox="0 0 24 24"><path d={ICONS.people} /></svg>
                <select style={{ padding: "12px 14px 12px 42px", width: "100%", border: "2px solid var(--border)", borderRadius: "12px", background: "var(--surface)", fontFamily: "'Nunito',sans-serif" }}>
                  <option value="">Select a volunteer to assign...</option>
                  <option>Rahul Menon</option>
                  <option>Riya Desai</option>
                  <option>Siddharth Kumar</option>
                  <option>Ananya Iyer</option>
                </select>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 24 }}>
              <button className="btn btn-ghost" onClick={() => setShowAddVolModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => { alert("Volunteer assigned"); setShowAddVolModal(false); }}>Add</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE: FORM MANAGEMENT
───────────────────────────────────────────── */
function FormManagement({ navigate }) {
  const forms = [
    { id: 1, icon: "📋", title: "Volunteer Onboarding Form", desc: "Collects personal info, skills, availability and emergency contacts.", cat: "Onboarding", status: "active", responses: 248, fields: 12 },
    { id: 2, icon: "🔍", title: "Background Verification Consent", desc: "Consent form for background check required for child-facing roles.", cat: "Background Check", status: "active", responses: 186, fields: 8 },
    { id: 3, icon: "📝", title: "Event Feedback Survey", desc: "Post-event satisfaction survey to gather volunteer feedback.", cat: "Feedback", status: "active", responses: 412, fields: 10 },
    { id: 4, icon: "🎪", title: "Park Clean-Up Registration", desc: "Sign-up form for the Community Park Clean-Up event on April 3rd.", cat: "Event Registration", status: "active", responses: 32, fields: 6 },
    { id: 5, icon: "📚", title: "Reading Workshop Registration", desc: "Registration form for the Children's Reading Workshop at City Library.", cat: "Event Registration", status: "active", responses: 24, fields: 7 },
    { id: 6, icon: "🏥", title: "Health Camp Volunteer Form", desc: "Special skills form for medical volunteers at the community health camp.", cat: "Onboarding", status: "draft", responses: 0, fields: 15 },
    { id: 7, icon: "⭐", title: "Volunteer of the Month Nomination", desc: "Internal nomination form for recognising outstanding volunteer contributions.", cat: "Feedback", status: "draft", responses: 0, fields: 5 },
    { id: 8, icon: "📦", title: "Skills & Interests Survey 2024", desc: "Annual survey capturing volunteer skill sets and program interests.", cat: "Onboarding", status: "archived", responses: 891, fields: 20 },
  ];
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const statusMap = { active: "badge-green", draft: "badge-amber", archived: "badge-gray" };
  const statusLabel = { active: "Active", draft: "Draft", archived: "Archived" };
  const filtered = forms.filter(f => (tab === "all" || f.status === tab) && (f.title.toLowerCase().includes(search.toLowerCase())));

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar current="form-management" navigate={navigate} />
      <div className="main-wrap">
        <div className="topbar">
          <span className="topbar-title">Form Management</span>
          <div style={{ display: "flex", gap: 10 }}><button className="btn btn-ghost">📥 Export</button><button className="btn btn-primary" onClick={() => setShowModal(true)}>+ Create Form</button></div>
        </div>
        <div className="content">
          <div style={{ display: "flex", gap: 4, background: "var(--bg)", borderRadius: 10, padding: 4, marginBottom: 24, width: "fit-content", border: "1px solid var(--border)" }}>
            {["all", "active", "draft", "archived"].map(t => <button key={t} onClick={() => setTab(t)} style={{ padding: "8px 18px", borderRadius: 7, fontSize: ".85rem", fontWeight: 600, color: tab === t ? "var(--text)" : "var(--text-muted)", cursor: "pointer", border: "none", background: tab === t ? "var(--surface)" : "transparent", fontFamily: "'Nunito',sans-serif", boxShadow: tab === t ? "0 1px 4px rgba(45,36,32,.1)" : "none" }}>{t.charAt(0).toUpperCase() + t.slice(1)}{t === "all" ? " Forms" : ""}</button>)}
          </div>
          <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
            <div style={{ position: "relative", flex: 1 }}>
              <svg viewBox="0 0 24 24" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 16, height: 16, fill: "var(--text-muted)" }}><path d={ICONS.search} /></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search forms…" style={{ width: "100%", padding: "10px 14px 10px 38px", border: "2px solid var(--border)", borderRadius: 10, fontFamily: "'Nunito',sans-serif", fontSize: ".88rem", outline: "none" }} />
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))", gap: 18 }}>
            {filtered.map(f => (
              <div key={f.id} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden", cursor: "pointer" }}>
                <div style={{ padding: "20px 22px 16px", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 10, background: "var(--accent-pale)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>{f.icon}</div>
                    <span className={`badge ${statusMap[f.status]}`}>{statusLabel[f.status]}</span>
                  </div>
                  <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.05rem", fontWeight: 700, marginBottom: 6 }}>{f.title}</div>
                  <div style={{ fontSize: ".82rem", color: "var(--text-muted)", lineHeight: 1.5 }}>{f.desc}</div>
                </div>
                <div style={{ padding: "14px 22px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: 14 }}>
                    <span style={{ fontSize: ".78rem", color: "var(--text-muted)" }}>👥 {f.responses} responses</span>
                    <span style={{ fontSize: ".78rem", color: "var(--text-muted)" }}>📋 {f.fields} fields</span>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[ICONS.edit, ICONS.trash].map((ic, j) => (
                      <button key={j} style={{ width: 32, height: 32, borderRadius: 7, border: "1px solid var(--border)", background: "var(--surface)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <svg viewBox="0 0 24 24" style={{ width: 15, height: 15, fill: "var(--text-muted)" }}><path d={ic} /></svg>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div onClick={() => setShowModal(true)} style={{ background: "var(--surface)", border: "2px dashed var(--border)", borderRadius: "var(--radius)", padding: 48, textAlign: "center", color: "var(--text-muted)", cursor: "pointer" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>➕</div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1rem", fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>Create New Form</div>
              <div style={{ fontSize: ".82rem" }}>Click to build a custom form</div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header"><span className="modal-title">Create New Form</span><button className="modal-close" onClick={() => setShowModal(false)}>✕</button></div>
            {[["Form Title", "text", "e.g. Volunteer Onboarding Form"], ["Category", "select"], ["Description", "textarea"]].map(([l, t, p]) => (
              <div key={l} className="form-field"><label>{l}</label><div className="input-wrap">
                <svg viewBox="0 0 24 24"><path d={ICONS.forms} /></svg>
                {t === "textarea" ? <textarea placeholder={p || ""} style={{ padding: "12px 14px 12px 42px", minHeight: 80, resize: "vertical" }} /> : t === "select" ? <select><option>Onboarding</option><option>Event Registration</option><option>Feedback</option><option>Background Check</option></select> : <input type={t} placeholder={p || ""} />}
              </div></div>
            ))}
            <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 24 }}>
              <button className="btn btn-ghost" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => setShowModal(false)}>Create Form</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE: REPORTS
───────────────────────────────────────────── */
function Reports({ navigate }) {
  const [range, setRange] = useState("30d");
  const weeks = ["Wk 1", "Wk 2", "Wk 3", "Wk 4"];
  const wkHrs = [310, 390, 340, 390];
  const maxH = Math.max(...wkHrs);
  const wkColors = ["#5E9E7A", "#5E9E7A", "#5E9E7A", "#C8522A"];
  const topVols = [
    { name: "Priya Mehta", hrs: 72, events: 10 },
    { name: "Siddharth Kumar", hrs: 68, events: 9 },
    { name: "Meena S.", hrs: 55, events: 8 },
    { name: "Lakshmi Nair", hrs: 48, events: 7 },
    { name: "Arjun Sharma", hrs: 42, events: 7 },
  ];
  const engData = [
    { name: "Priya Mehta", pct: 96, color: "#C8522A" },
    { name: "Siddharth K.", pct: 92, color: "#5E9E7A" },
    { name: "Meena S.", pct: 88, color: "#9b59b6" },
    { name: "Lakshmi N.", pct: 84, color: "#2D6A4F" },
    { name: "Arjun Sharma", pct: 79, color: "#EDB84A" },
  ];

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar current="reports" navigate={navigate} />
      <div className="main-wrap">
        <div className="topbar">
          <span className="topbar-title">Reports & Analytics</span>
          <div style={{ display: "flex", gap: 10 }}><button className="btn btn-ghost">📥 Export PDF</button><button className="btn btn-ghost">📊 Export CSV</button></div>
        </div>
        <div className="content">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 28, flexWrap: "wrap" }}>
            <div style={{ display: "flex", background: "var(--bg)", borderRadius: 8, padding: 3, border: "1px solid var(--border)" }}>
              {[["7d", "7 Days"], ["30d", "30 Days"], ["3m", "3 Months"], ["yr", "This Year"]].map(([v, l]) => (
                <button key={v} onClick={() => setRange(v)} style={{ padding: "7px 16px", border: "none", background: range === v ? "var(--surface)" : "transparent", borderRadius: 6, cursor: "pointer", fontFamily: "'Nunito',sans-serif", fontSize: ".83rem", fontWeight: 600, color: range === v ? "var(--text)" : "var(--text-muted)", boxShadow: range === v ? "0 1px 3px rgba(45,36,32,.1)" : "none" }}>{l}</button>
              ))}
            </div>
            <span style={{ fontSize: ".8rem", fontWeight: 600, background: "var(--secondary-pale)", color: "#2d7a50", padding: "6px 12px", borderRadius: 6, fontFamily: "'Nunito',sans-serif" }}>📅 Showing: Last {range === "30d" ? "30 Days" : range === "7d" ? "7 Days" : range === "3m" ? "3 Months" : "Year"}</span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
            {[["🟢", "3,104", "Active Volunteers", "↑ 2.8% vs last month", true], ["⏱", "12,430", "Volunteer Hours", "↑ 8.2% vs last month", true], ["📅", "23", "Events Completed", "↑ 15% vs last month", true]].map(([ic, n, l, c, up]) => (
              <div key={l} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 22, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", right: -10, top: -10, fontSize: "3.5rem", opacity: .07 }}>{ic}</div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: "2rem", fontWeight: 700, lineHeight: 1, marginBottom: 4 }}>{n}</div>
                <div style={{ fontSize: ".78rem", color: "var(--text-muted)", fontWeight: 600 }}>{l}</div>
                <div style={{ fontSize: ".75rem", fontWeight: 700, marginTop: 8, color: up ? "var(--secondary)" : "var(--primary)" }}>{c}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
            <div className="panel">
              <div className="panel-header"><span className="panel-title">Volunteer Hours — Last 30 Days</span></div>
              <div className="panel-body">
                <div style={{ height: 180, display: "flex", alignItems: "flex-end", gap: 10 }}>
                  {wkHrs.map((h, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <span style={{ fontSize: ".68rem", fontWeight: 700, color: "var(--text-muted)" }}>{h}</span>
                      <div style={{ width: "100%", height: (h / maxH) * 160, background: wkColors[i], borderRadius: "6px 6px 0 0", minHeight: 8 }} title={`${weeks[i]}: ${h} hrs`}></div>
                      <span style={{ fontSize: ".68rem", color: "var(--text-muted)" }}>{weeks[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="panel">
              <div className="panel-header"><span className="panel-title">Events by Category</span></div>
              <div className="panel-body">
                <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                  <svg width="110" height="110" viewBox="0 0 110 110" style={{ flexShrink: 0 }}>
                    <circle cx="55" cy="55" r="40" fill="none" stroke="var(--border)" strokeWidth="18" />
                    <circle cx="55" cy="55" r="40" fill="none" stroke="#5E9E7A" strokeWidth="18" strokeDasharray="75 176" strokeDashoffset="0" transform="rotate(-90 55 55)" />
                    <circle cx="55" cy="55" r="40" fill="none" stroke="#C8522A" strokeWidth="18" strokeDasharray="50 201" strokeDashoffset="-75" transform="rotate(-90 55 55)" />
                    <circle cx="55" cy="55" r="40" fill="none" stroke="#EDB84A" strokeWidth="18" strokeDasharray="35 216" strokeDashoffset="-125" transform="rotate(-90 55 55)" />
                    <circle cx="55" cy="55" r="40" fill="none" stroke="#9b59b6" strokeWidth="18" strokeDasharray="25 226" strokeDashoffset="-160" transform="rotate(-90 55 55)" />
                    <circle cx="55" cy="55" r="40" fill="none" stroke="#3498db" strokeWidth="18" strokeDasharray="66 185" strokeDashoffset="-185" transform="rotate(-90 55 55)" />
                    <text x="55" y="58" textAnchor="middle" fontFamily="Fraunces,serif" fontSize="14" fontWeight="700" fill="var(--text)">23</text>
                  </svg>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[["#5E9E7A", "Environment", "30%"], ["#C8522A", "Food", "20%"], ["#EDB84A", "Education", "14%"], ["#9b59b6", "Healthcare", "10%"], ["#3498db", "Community", "26%"]].map(([c, l, v]) => (
                      <div key={l} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: ".82rem" }}>
                        <div style={{ width: 10, height: 10, borderRadius: "50%", background: c, flexShrink: 0 }}></div>
                        <span style={{ color: "var(--text-muted)" }}>{l}</span>
                        <span style={{ fontWeight: 700, marginLeft: "auto" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            <div className="panel">
              <div className="panel-header"><span className="panel-title">Top Volunteers by Hours</span></div>
              <table>
                <thead><tr><th>#</th><th>Volunteer</th><th>Hours</th><th>Events</th></tr></thead>
                <tbody>
                  {topVols.map((v, i) => (
                    <tr key={i}>
                      <td><span style={{ fontFamily: "'Fraunces',serif", fontSize: ".95rem", fontWeight: 700, color: "var(--text-muted)" }}>{i + 1}</span></td>
                      <td><div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 30, height: 30, borderRadius: "50%", background: avatarColors[i % 5], display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: ".78rem" }}>{v.name[0]}</div>
                        <span style={{ fontSize: ".86rem", fontWeight: 700 }}>{v.name}</span>
                      </div></td>
                      <td style={{ fontWeight: 700, fontSize: ".88rem" }}>{v.hrs}</td>
                      <td style={{ fontSize: ".86rem" }}>{v.events}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="panel">
              <div className="panel-header"><span className="panel-title">Volunteer Engagement</span></div>
              <div className="panel-body">
                {engData.map((d, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: i < engData.length - 1 ? 14 : 0 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: avatarColors[i % 5], display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: ".8rem" }}>{d.name[0]}</div>
                    <span style={{ fontSize: ".84rem", fontWeight: 700, minWidth: 100 }}>{d.name}</span>
                    <div style={{ flex: 1, height: 8, background: "var(--border)", borderRadius: 4, overflow: "hidden" }}><div style={{ height: "100%", width: `${d.pct}%`, background: d.color, borderRadius: 4 }}></div></div>
                    <span style={{ fontSize: ".78rem", fontWeight: 700, color: "var(--text-muted)", width: 36, textAlign: "right" }}>{d.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE: ATTENDANCE TRACKING
───────────────────────────────────────────── */
function AttendanceTracking({ navigate }) {
  const EVENTS_DATA = [
    { id: "e1", name: "Coastal Cleanup Drive", date: "28 Mar 2026", location: "Juhu Beach", volunteers: [1, 2, 3, 4, 5, 6, 7, 8] },
    { id: "e2", name: "Tree Plantation Campaign", date: "2 Apr 2026", location: "Cubbon Park", volunteers: [1, 3, 5, 9, 10, 11] },
    { id: "e3", name: "Elderly Care Visit", date: "5 Apr 2026", location: "Koramangala", volunteers: [2, 4, 6, 7, 12, 13, 14] },
    { id: "e4", name: "Digital Literacy Workshop", date: "10 Apr 2026", location: "Indiranagar", volunteers: [1, 2, 5, 8, 9, 11, 12] },
    { id: "e5", name: "Food Distribution Drive", date: "15 Apr 2026", location: "KR Market", volunteers: [3, 4, 6, 10, 13, 14, 15] },
  ];
  const VOLS_DATA = [
    { id: 1, name: "Priya Sharma", email: "priya@email.com", color: "#C8522A" },
    { id: 2, name: "Arjun Menon", email: "arjun@email.com", color: "#2D6A4F" },
    { id: 3, name: "Sneha Iyer", email: "sneha@email.com", color: "#EDB84A" },
    { id: 4, name: "Rahul Verma", email: "rahul@email.com", color: "#5E9E7A" },
    { id: 5, name: "Ananya Nair", email: "ananya@email.com", color: "#8B5CF6" },
    { id: 6, name: "Kiran Reddy", email: "kiran@email.com", color: "#C8522A" },
    { id: 7, name: "Divya Pillai", email: "divya@email.com", color: "#2D6A4F" },
    { id: 8, name: "Sanjay Bhat", email: "sanjay@email.com", color: "#EDB84A" },
    { id: 9, name: "Meera Krishnan", email: "meera@email.com", color: "#5E9E7A" },
    { id: 10, name: "Vikram Joshi", email: "vikram@email.com", color: "#8B5CF6" },
    { id: 11, name: "Pooja Desai", email: "pooja@email.com", color: "#C8522A" },
    { id: 12, name: "Rohit Patil", email: "rohit@email.com", color: "#2D6A4F" },
    { id: 13, name: "Lakshmi Rao", email: "lakshmi@email.com", color: "#EDB84A" },
    { id: 14, name: "Aditya Kumar", email: "aditya@email.com", color: "#5E9E7A" },
    { id: 15, name: "Ritu Gupta", email: "ritu@email.com", color: "#8B5CF6" },
  ];

  const [selectedEvent, setSelectedEvent] = useState("");
  const [attendance, setAttendance] = useState({ e1: { 1: "present", 2: "present", 3: "absent", 4: "present", 5: "present", 6: "unmarked", 7: "present", 8: "absent" } });
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [notes, setNotes] = useState({});
  const [toast, setToast] = useState(null);

  function showToast(msg, type = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  }

  function getStatus(eid, vid) { return (attendance[eid] || {})[vid] || "unmarked"; }

  function setStatus(vid, status) {
    setAttendance(a => ({ ...a, [selectedEvent]: { ...(a[selectedEvent] || {}), [vid]: status } }));
    showToast(`${VOLS_DATA.find(v => v.id === vid)?.name} marked as ${status}`, "success");
  }

  const curEvent = EVENTS_DATA.find(e => e.id === selectedEvent);
  const vols = curEvent ? curEvent.volunteers.map(id => VOLS_DATA.find(v => v.id === id)).filter(Boolean).filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || getStatus(selectedEvent, v.id) === statusFilter;
    return matchSearch && matchStatus;
  }) : [];

  const total = curEvent ? curEvent.volunteers.length : 0;
  const present = curEvent ? curEvent.volunteers.filter(vid => getStatus(selectedEvent, vid) === "present").length : 0;
  const absent = curEvent ? curEvent.volunteers.filter(vid => getStatus(selectedEvent, vid) === "absent").length : 0;
  const rate = (present + absent) > 0 ? Math.round((present / (present + absent)) * 100) + "%" : "—";

  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar current="attendance-tracking" navigate={navigate} />
      <div className="main-wrap">
        <div className="topbar">
          <div><div className="topbar-title">Attendance Tracking</div><div style={{ fontSize: ".78rem", color: "var(--text-muted)" }}>Thursday, 26 March 2026</div></div>
          <button style={{ width: 38, height: 38, borderRadius: 9, border: "1px solid var(--border)", background: "var(--surface)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
            <svg viewBox="0 0 24 24" style={{ width: 18, height: 18, fill: "var(--text-muted)" }}><path d={ICONS.notif} /></svg>
            <div style={{ position: "absolute", top: 7, right: 7, width: 8, height: 8, background: "var(--primary)", borderRadius: "50%", border: "2px solid var(--surface)" }}></div>
          </button>
        </div>
        <div className="content">
          <div style={{ background: "linear-gradient(135deg,var(--admin),#40916C)", borderRadius: "var(--radius)", padding: "26px 32px", marginBottom: 26, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div><div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.45rem", fontWeight: 700, color: "#fff", marginBottom: 4 }}>Attendance Tracking</div><div style={{ fontSize: ".86rem", color: "rgba(255,255,255,.75)" }}>Mark and manage volunteer attendance per event</div></div>
            <div style={{ fontSize: "2.6rem", opacity: .55 }}>📋</div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
            {[["👥", "var(--secondary-pale)", total || "—", "Total Registered"], ["✅", "var(--secondary-pale)", curEvent ? present : "—", "Present"], ["❌", "var(--primary-pale)", curEvent ? absent : "—", "Absent"], ["⏳", "var(--accent-pale)", curEvent ? rate : "—", "Attendance Rate"]].map(([ic, bg, n, l]) => (
              <div key={l} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "18px 20px", display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem" }}>{ic}</div>
                <div><div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.7rem", fontWeight: 700, lineHeight: 1 }}>{n}</div><div style={{ fontSize: ".75rem", color: "var(--text-muted)", fontWeight: 600, marginTop: 2 }}>{l}</div></div>
              </div>
            ))}
          </div>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "18px 22px", marginBottom: 20, display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 180 }}>
              <label style={{ fontSize: ".78rem", fontWeight: 700, color: "var(--text-muted)", whiteSpace: "nowrap" }}>Event</label>
              <select value={selectedEvent} onChange={e => { setSelectedEvent(e.target.value); setSearch(""); setStatusFilter("all"); }} style={{ flex: 1, padding: "9px 14px", border: "2px solid var(--border)", borderRadius: 10, fontFamily: "'Nunito',sans-serif", fontSize: ".86rem", outline: "none", background: "var(--bg)", cursor: "pointer" }}>
                <option value="">— Select an event —</option>
                {EVENTS_DATA.map(e => <option key={e.id} value={e.id}>{e.name} — {e.date}</option>)}
              </select>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, minWidth: 160 }}>
              <label style={{ fontSize: ".78rem", fontWeight: 700, color: "var(--text-muted)", whiteSpace: "nowrap" }}>Status</label>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ flex: 1, padding: "9px 14px", border: "2px solid var(--border)", borderRadius: 10, fontFamily: "'Nunito',sans-serif", fontSize: ".86rem", outline: "none", background: "var(--bg)", cursor: "pointer" }}>
                <option value="all">All Volunteers</option><option value="present">Present Only</option><option value="absent">Absent Only</option><option value="unmarked">Unmarked</option>
              </select>
            </div>
            <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
              <svg viewBox="0 0 24 24" style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", width: 15, height: 15, fill: "var(--text-muted)", pointerEvents: "none" }}><path d={ICONS.search} /></svg>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search volunteer…" style={{ width: "100%", padding: "9px 12px 9px 34px", border: "2px solid var(--border)", borderRadius: 10, fontFamily: "'Nunito',sans-serif", fontSize: ".86rem", outline: "none", background: "var(--bg)" }} />
            </div>
          </div>

          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 22px", borderBottom: "1px solid var(--border)" }}>
              <span style={{ fontFamily: "'Fraunces',serif", fontSize: "1rem", fontWeight: 700 }}>{curEvent ? curEvent.name : "Select an event to begin"}</span>
              <span style={{ fontSize: ".78rem", color: "var(--text-muted)" }}>{curEvent ? `${curEvent.date} · ${curEvent.location} · ${total} registered` : ""}</span>
            </div>
            {!curEvent ? (
              <div style={{ padding: "60px 20px", textAlign: "center", color: "var(--text-muted)" }}>
                <svg viewBox="0 0 24 24" style={{ width: 48, height: 48, fill: "var(--border)", marginBottom: 14, display: "block", margin: "0 auto 14px" }}><path d={ICONS.attendance} /></svg>
                <p style={{ fontSize: ".9rem" }}>Choose an event from the dropdown above<br />to view and manage volunteer attendance.</p>
              </div>
            ) : vols.length === 0 ? (
              <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--text-muted)", fontSize: ".9rem" }}>No volunteers match your filters.</div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table>
                  <thead><tr><th>Volunteer</th><th>Status</th><th>Notes</th><th style={{ textAlign: "center" }}>Action</th></tr></thead>
                  <tbody>
                    {vols.map(v => {
                      const status = getStatus(selectedEvent, v.id);
                      return (
                        <tr key={v.id}>
                          <td><div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 34, height: 34, borderRadius: "50%", background: v.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: "#fff", fontSize: ".8rem" }}>{v.name.slice(0, 2)}</div>
                            <div><div style={{ fontSize: ".87rem", fontWeight: 700 }}>{v.name}</div><div style={{ fontSize: ".74rem", color: "var(--text-muted)" }}>{v.email}</div></div>
                          </div></td>
                          <td>
                            <div style={{ display: "inline-flex", borderRadius: 20, overflow: "hidden", border: "1.5px solid var(--border)", background: "var(--bg)" }}>
                              <button onClick={() => setStatus(v.id, "present")} style={{ padding: "5px 14px", fontFamily: "'Nunito',sans-serif", fontSize: ".76rem", fontWeight: 700, border: "none", cursor: "pointer", background: status === "present" ? "var(--secondary-pale)" : "transparent", color: status === "present" ? "var(--admin)" : "var(--text-muted)" }}>✅ Present</button>
                              <button onClick={() => setStatus(v.id, "absent")} style={{ padding: "5px 14px", fontFamily: "'Nunito',sans-serif", fontSize: ".76rem", fontWeight: 700, border: "none", cursor: "pointer", background: status === "absent" ? "#fde8e8" : "transparent", color: status === "absent" ? "#c0392b" : "var(--text-muted)" }}>❌ Absent</button>
                            </div>
                          </td>
                          <td><input value={notes[`${selectedEvent}-${v.id}`] || ""} onChange={e => setNotes(n => ({ ...n, [`${selectedEvent}-${v.id}`]: e.target.value }))} placeholder="Add note…" style={{ padding: "5px 10px", border: "1.5px solid var(--border)", borderRadius: 8, fontFamily: "'Nunito',sans-serif", fontSize: ".78rem", outline: "none", width: 130, background: "var(--bg)" }} /></td>
                          <td style={{ textAlign: "center" }}><button onClick={() => showToast("Note saved", "success")} style={{ padding: "4px 10px", borderRadius: 7, border: "none", background: "var(--primary-pale)", color: "var(--primary)", fontFamily: "'Nunito',sans-serif", fontSize: ".74rem", fontWeight: 700, cursor: "pointer" }}>Save</button></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
      {toast && (
        <div style={{ position: "fixed", bottom: 28, right: 28, background: toast.type === "success" ? "var(--admin)" : "#c0392b", color: "#fff", padding: "12px 20px", borderRadius: 12, fontSize: ".85rem", fontWeight: 600, boxShadow: "0 8px 24px rgba(0,0,0,.2)", zIndex: 999, display: "flex", alignItems: "center", gap: 10 }}>✓ {toast.msg}</div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE: BROWSE EVENTS (VOLUNTEER)
───────────────────────────────────────────── */
function BrowseEvents({ navigate, volunteer }) {
  const avail = [
    { icon: "🏥", color: "#f3e8fd", name: "Community Health Camp", date: "Apr 22, 2026", time: "9:00 AM", location: "Koramangala", slots: "3 left" },
    { icon: "💡", color: "#e8f0fe", name: "Skill Development Workshop", date: "Apr 28, 2026", time: "2:00 PM", location: "Indiranagar", slots: "6 left" },
    { icon: "🎨", color: "#FBE8DF", name: "Art Therapy for Seniors", date: "May 5, 2026", time: "11:00 AM", location: "HSR Layout", slots: "10 left" },
    { icon: "🌳", color: "#e4f2eb", name: "Tree Plantation Drive", date: "May 12, 2026", time: "7:00 AM", location: "JP Nagar", slots: "Full" },
  ];

  return (
    <div style={{ display: "flex" }}>
      <VolSidebar current="browse-events" navigate={navigate} volunteer={volunteer} />
      <div className="main-wrap">
        <div className="topbar"><span className="topbar-title">Browse Events</span></div>
        <div className="content">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 20 }}>
            {avail.map((e, i) => (
              <div key={i} className="panel" style={{ cursor: "pointer", transition: "all .2s", marginBottom: 0 }}>
                <div style={{ padding: "24px 24px 16px", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                  <div style={{ width: 50, height: 50, borderRadius: 12, background: e.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem" }}>{e.icon}</div>
                  <span className={`badge ${e.slots === 'Full' ? 'badge-red' : 'badge-green'}`}>{e.slots}</span>
                </div>
                <div style={{ padding: "0 24px 20px" }}>
                  <div style={{ fontFamily: "'Fraunces',serif", fontSize: "1.1rem", fontWeight: 700, marginBottom: 12, height: 46 }}>{e.name}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 18 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: ".8rem", color: "var(--text-muted)" }}><svg viewBox="0 0 24 24" style={{ width: 14, height: 14, fill: "currentColor" }}><path d={ICONS.calendar} /></svg>{e.date} · {e.time}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: ".8rem", color: "var(--text-muted)" }}><svg viewBox="0 0 24 24" style={{ width: 14, height: 14, fill: "currentColor" }}><path d={ICONS.pin} /></svg>{e.location}</div>
                  </div>
                  <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }} disabled={e.slots === "Full"}>{e.slots === "Full" ? "Waitlist" : "Register Now"}</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE: MY SCHEDULE (VOLUNTEER)
───────────────────────────────────────────── */
function MySchedule({ navigate, volunteer }) {
  const myEvents = [
    { icon: "🌿", color: "#e4f2eb", name: "Community Park Clean-Up Drive", date: "Apr 3, 2026", time: "8:00 AM", location: "Cubbon Park", status: "Upcoming", host: "Environment Dept." },
    { icon: "📚", color: "#FBE8DF", name: "Children's Reading Workshop", date: "Apr 8, 2026", time: "10:00 AM", location: "City Library", status: "Upcoming", host: "Education Org" },
    { icon: "🍱", color: "#FDF3D8", name: "Food Distribution Drive", date: "Apr 15, 2026", time: "6:00 AM", location: "Whitefield", status: "Active", host: "NGO Hub" },
  ];

  return (
    <div style={{ display: "flex" }}>
      <VolSidebar current="my-schedule" navigate={navigate} volunteer={volunteer} />
      <div className="main-wrap">
        <div className="topbar">
          <span className="topbar-title">My Schedule</span>
        </div>
        <div className="content">
          <div className="panel">
            <div className="panel-header"><span className="panel-title">Registered Events</span></div>
            <div className="panel-body" style={{ padding: 0 }}>
              {myEvents.map((e, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 20, padding: "20px 24px", borderBottom: i < myEvents.length - 1 ? "1px solid var(--border)" : "none", transition: "background .15s" }} onMouseEnter={ev => ev.currentTarget.style.background = "var(--surface-2)"} onMouseLeave={ev => ev.currentTarget.style.background = "var(--surface)"}>
                  <div style={{ width: 56, height: 56, borderRadius: 14, background: e.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.6rem" }}>{e.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                      <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "var(--text)" }}>{e.name}</span>
                      <span className={`badge ${e.status === 'Active' ? 'badge-orange' : 'badge-amber'}`}>{e.status}</span>
                    </div>
                    <div style={{ display: "flex", gap: 16, fontSize: ".85rem", color: "var(--text-muted)" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 5 }}><svg viewBox="0 0 24 24" style={{ width: 14, height: 14, fill: "currentColor" }}><path d={ICONS.calendar} /></svg>{e.date} · {e.time}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 5 }}><svg viewBox="0 0 24 24" style={{ width: 14, height: 14, fill: "currentColor" }}><path d={ICONS.pin} /></svg>{e.location}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: 5 }}><svg viewBox="0 0 24 24" style={{ width: 14, height: 14, fill: "currentColor" }}><path d={ICONS.people} /></svg>{e.host}</span>
                    </div>
                  </div>
                  <div>
                    <button className="btn btn-ghost" style={{ padding: "8px 16px" }}>View Details</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE: PARTICIPATION HISTORY (VOLUNTEER)
───────────────────────────────────────────── */
function ParticipationHistory({ navigate, volunteer }) {
  const history = [
    { name: "Tree Plantation Drive", date: "Mar 20, 2026", hours: 4, role: "Planter", category: "Environment" },
    { name: "Art Therapy for Seniors", date: "Mar 15, 2026", hours: 3, role: "Coordinator", category: "Education" },
    { name: "Free Medical Check-Up Camp", date: "Mar 10, 2026", hours: 6, role: "Logistics Support", category: "Healthcare" },
  ];

  const categories = {
    Environment: { color: "#5E9E7A", total: 0 },
    Healthcare: { color: "#C8522A", total: 0 },
    Education: { color: "#EDB84A", total: 0 }
  };
  
  let totalHours = 0;
  history.forEach(h => {
    if (categories[h.category]) {
      categories[h.category].total += h.hours;
    }
    totalHours += h.hours;
  });

  let offset = 0;
  const arcs = Object.entries(categories).map(([label, { color, total }]) => {
    const dash = totalHours ? (total / totalHours) * 251.3 : 0;
    const gap = 251.3 - dash;
    const arc = { color, dash, gap, offset: -offset, label, total };
    offset += dash;
    return arc;
  }).filter(a => a.total > 0);

  return (
    <div style={{ display: "flex" }}>
      <VolSidebar current="participation-history" navigate={navigate} volunteer={volunteer} />
      <div className="main-wrap">
        <div className="topbar">
          <span className="topbar-title">Participation History</span>
        </div>
        <div className="content">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
            <div className="panel">
              <div className="panel-header"><span className="panel-title">Previous Events</span></div>
              <div className="panel-body">
                <table style={{ minWidth: "100%" }}>
                  <thead>
                    <tr>
                      <th>Event Name</th>
                      <th>Date</th>
                      <th>Role</th>
                      <th style={{ textAlign: "right" }}>Hours Logged</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((h, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 700 }}>{h.name}</td>
                        <td style={{ color: "var(--text-muted)" }}>{h.date}</td>
                        <td>{h.role}</td>
                        <td style={{ textAlign: "right", fontWeight: 700, color: "var(--primary)" }}>{h.hours}h</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div>
              <div className="panel">
                <div className="panel-header"><span className="panel-title">Impact Summary</span></div>
                <div className="panel-body">
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
                    <svg width="120" height="120" viewBox="0 0 110 110" style={{ flexShrink: 0 }}>
                      <circle cx="55" cy="55" r="40" fill="none" stroke="var(--border)" strokeWidth="18" />
                      {arcs.map((arc, i) => (
                        <circle key={i} cx="55" cy="55" r="40" fill="none" stroke={arc.color} strokeWidth="18" strokeDasharray={`${arc.dash} ${arc.gap}`} strokeDashoffset={arc.offset} transform="rotate(-90 55 55)" />
                      ))}
                      <text x="55" y="58" textAnchor="middle" fontFamily="Fraunces,serif" fontSize="16" fontWeight="700" fill="var(--text)">{totalHours}h</text>
                    </svg>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10, width: "100%" }}>
                      {arcs.map(arc => (
                        <div key={arc.label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: ".9rem" }}>
                          <div style={{ width: 12, height: 12, borderRadius: "50%", background: arc.color, flexShrink: 0 }}></div>
                          <span style={{ color: "var(--text-muted)", flex: 1 }}>{arc.label}</span>
                          <span style={{ fontWeight: 700 }}>{arc.total}h</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAGE: ATTENDANCE (VOLUNTEER)
───────────────────────────────────────────── */
function VolunteerAttendance({ navigate, volunteer }) {
  const attendance = [
    { name: "Tree Plantation Drive", date: "Mar 20, 2026", status: "Present" },
    { name: "Art Therapy for Seniors", date: "Mar 15, 2026", status: "Present" },
    { name: "Free Medical Check-Up Camp", date: "Mar 10, 2026", status: "Absent" },
    { name: "Beach Clean-up", date: "Mar 1, 2026", status: "Present" },
  ];

  return (
    <div style={{ display: "flex" }}>
      <VolSidebar current="volunteer-attendance" navigate={navigate} volunteer={volunteer} />
      <div className="main-wrap">
        <div className="topbar">
          <span className="topbar-title">My Attendance</span>
        </div>
        <div className="content">
          <div className="panel" style={{ maxWidth: 800 }}>
            <div className="panel-header"><span className="panel-title">Attendance Record</span></div>
            <div className="panel-body">
              <table style={{ minWidth: "100%" }}>
                <thead>
                  <tr>
                    <th>Event</th>
                    <th>Date</th>
                    <th style={{ textAlign: "right" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.map((a, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 700 }}>{a.name}</td>
                      <td style={{ color: "var(--text-muted)" }}>{a.date}</td>
                      <td style={{ textAlign: "right" }}>
                        <span className={`badge ${a.status === "Present" ? "badge-green" : "badge-red"}`}>{a.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   APP ROUTER
───────────────────────────────────────────── */
export default function App() {
  const [page, setPage] = useState("volunteer-login");
  const [volunteer, setVolunteer] = useState(null);

  function navigate(p) {
    if (p === "volunteer-dashboard" || p === "browse-events" || p === "my-schedule") {
      const v = JSON.parse(localStorage.getItem("vh_current_volunteer") || "null");
      setVolunteer(v);
    }
    setPage(p);
    window.scrollTo(0, 0);
  }

  const pages = {
    "volunteer-login": <VolunteerLogin navigate={navigate} />,
    "volunteer-register": <VolunteerRegister navigate={navigate} />,
    "volunteer-dashboard": <VolunteerDashboard navigate={navigate} volunteer={volunteer} />,
    "browse-events": <BrowseEvents navigate={navigate} volunteer={volunteer} />,
    "my-schedule": <MySchedule navigate={navigate} volunteer={volunteer} />,
    "participation-history": <ParticipationHistory navigate={navigate} volunteer={volunteer} />,
    "volunteer-attendance": <VolunteerAttendance navigate={navigate} volunteer={volunteer} />,
    "admin-login": <AdminLogin navigate={navigate} />,
    "admin-dashboard": <AdminDashboard navigate={navigate} />,
    "volunteer-management": <VolunteerManagement navigate={navigate} />,
    "event-management": <EventManagement navigate={navigate} />,
    "event-details": <EventDetails navigate={navigate} />,
    "form-management": <FormManagement navigate={navigate} />,
    "reports": <Reports navigate={navigate} />,
    "attendance-tracking": <AttendanceTracking navigate={navigate} />,
  };

  return (
    <>
      <GlobalCSS />
      {pages[page] || pages["volunteer-login"]}
    </>
  );
}
