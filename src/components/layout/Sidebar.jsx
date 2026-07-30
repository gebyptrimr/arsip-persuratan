import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { supabase } from "../../lib/supabase";

const navItems = [
  { label: "Dashboard", icon: "ti-layout-dashboard", path: "/dashboard" },
  { label: "Surat Masuk", icon: "ti-mail-down", path: "/surat-masuk" },
  { label: "Surat Keluar", icon: "ti-mail-up", path: "/surat-keluar" },
  { label: "Surat Keputusan", icon: "ti-certificate", path: "/sk" },
  { label: "Surat Tugas", icon: "ti-clipboard-list", path: "/surat-tugas" },
  { label: "Kontrak", icon: "ti-writing", path: "/kontrak" },
  { label: "Manajemen Akun", icon: "ti-users", path: "/users" },
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();
  const navigate = useNavigate();

  async function handleLogout() {
    const result = await Swal.fire({
      title: "Keluar dari SIPAS?",
      text: "Apakah Anda yakin ingin mengakhiri sesi login?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Keluar",
      cancelButtonText: "Batal",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    await supabase.auth.signOut();

    navigate("/");
  }

  return (
    <aside
      style={{
        width: collapsed ? "72px" : "240px",
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0F2A4A 0%, #1B3F6E 60%, #1E4D8C 100%)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
        overflow: "hidden",
        transition: "width .25s ease",
        boxShadow: "2px 0 16px rgba(15,42,74,.18)",
      }}
    >
      {/* HEADER */}
      <div style={{ height: "68px", display: "flex", alignItems: "center", gap: "10px", paddingLeft: "16px", borderBottom: "1px solid rgba(255,255,255,.08)", overflow: "hidden" }}>
        <button
          onClick={onToggle}
          style={{ width: "40px", height: "40px", flexShrink: 0, border: "none", borderRadius: "10px", background: "rgba(255,255,255,.08)", color: "#FFFFFF", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: ".2s ease" }}
        >
          <i className="ti ti-menu-2" style={{ fontSize: "22px" }} />
        </button>
        {!collapsed && (
          <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
            <div style={{ fontSize: "16px", fontWeight: 700, color: "#fff", fontFamily: "DM Sans" }}>SIPAS</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,.5)", fontFamily: "DM Sans" }}>Sistem Pengelolaan Arsip Surat</div>
          </div>
        )}
      </div>

      {/* LABEL */}
      {!collapsed && (
        <div style={{ padding: "18px 20px 8px", fontSize: "10px", fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.35)", fontFamily: "DM Sans" }}>
          Menu Utama
        </div>
      )}

      {/* MENU */}
      <nav style={{ flex: 1, paddingTop: "4px" }}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== "/dashboard" && location.pathname.startsWith(item.path));
          return (
            <NavLink
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : ""}
              style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: collapsed ? "12px 0" : "12px 16px",
                margin: "4px 10px", borderRadius: "10px", textDecoration: "none",
                color: isActive ? "#FFFFFF" : "rgba(255,255,255,.65)",
                background: isActive ? "rgba(77,182,245,.18)" : "transparent",
                borderLeft: isActive ? "3px solid #4DB6F5" : "3px solid transparent",
                justifyContent: collapsed ? "center" : "flex-start",
                transition: ".2s ease", position: "relative",
              }}
            >
              <i className={`ti ${item.icon}`} style={{ fontSize: "20px", flexShrink: 0 }} />
              {!collapsed && (
                <span style={{ fontFamily: "DM Sans", fontSize: "14px", fontWeight: isActive ? 600 : 500, whiteSpace: "nowrap" }}>
                  {item.label}
                </span>
              )}
              {collapsed && (
                <span className="sidebar-tooltip" style={{ position: "absolute", left: "calc(100% + 12px)", background: "#0F2A4A", color: "#FFFFFF", fontSize: "12px", padding: "6px 10px", borderRadius: "6px", whiteSpace: "nowrap", opacity: 0, pointerEvents: "none", transition: ".2s", zIndex: 999 }}>
                  {item.label}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* FOOTER */}
      <div style={{ padding: "12px 10px", borderTop: "1px solid rgba(255,255,255,.08)" }}>
        <button
          className="logout-btn"
          onClick={handleLogout}
          style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "10px 12px", borderRadius: "10px", border: "none", background: "transparent", color: "rgba(255,255,255,.65)", justifyContent: collapsed ? "center" : "flex-start", cursor: "pointer", transition: ".2s ease", fontFamily: "DM Sans" }}
        >
          <i className="ti ti-logout" style={{ fontSize: "20px" }} />
          {!collapsed && (
            <span style={{ fontSize: "14px", fontFamily: "DM Sans", whiteSpace: "nowrap" }}>
              Keluar
            </span>
          )}
        </button>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');
        nav a:hover { background: rgba(77,182,245,.10) !important; color: #FFFFFF !important; }
        nav a:hover .sidebar-tooltip { opacity: 1 !important; }
        .logout-btn:hover { background: rgba(255,255,255,.10) !important; color: #FFFFFF !important; }
      `}</style>
    </aside>
  );
}