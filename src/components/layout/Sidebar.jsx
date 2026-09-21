import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

// Item tunggal (link langsung)
const linkItem = (label, icon, path) => ({ type: "link", label, icon, path });

// Item akordion — kategori klasifikasi dengan sub-kategori
const accordionItem = (label, icon, sub) => ({
  type: "accordion",
  label,
  icon,
  sub,
});

// Urutan menu sesuai spesifikasi:
// Dashboard → kategori klasifikasi (akordion) → Retensi Arsip → Manajemen Akun
// (Keluar tetap terpisah di footer, paling bawah)
const menuItems = [
  linkItem("Dashboard", "ti-layout-dashboard", "/dashboard"),
  accordionItem("Kebijakan & Perencanaan", "ti-gavel", [
    {
      label: "Kebijakan, Renstra, Renja LPPM",
      path: "/klasifikasi/kebijakan",
    },
    {
      label: "Peraturan, SK Ka.LPPM",
      path: "/klasifikasi/peraturan",
    },
  ]),
  accordionItem("Keuangan", "ti-cash", [
    { label: "Anggaran, DIPA LPPM", path: "/klasifikasi/anggaran" },
    { label: "Laporan Keuangan, SPJ", path: "/klasifikasi/laporan-keuangan" },
  ]),
  accordionItem("Penelitian", "ti-microscope", [
    {
      label: "Hibah Penelitian Internal_PNBP",
      path: "/klasifikasi/hibah-penelitian-internal",
    },
    {
      label: "Hibah Penelitian External/DPPM/BRIN",
      path: "/klasifikasi/hibah-penelitian-eksternal",
    },
    {
      label: "Kerja Sama Penelitian",
      path: "/klasifikasi/kerja-sama-penelitian",
    },
  ]),
  accordionItem("PKM", "ti-bulb", [
    {
      label: "Hibah Pengabdian Internal",
      path: "/klasifikasi/pengabdian-internal",
    },
    {
      label: "Hibah Pengabdian Eksternal/DPPM",
      path: "/klasifikasi/pengabdian-eksternal",
    },
  ]),
  accordionItem("Publikasi & HKI", "ti-certificate-2", [
    { label: "Jurnal, HKI, Paten", path: "/klasifikasi/publikasi-hki" },
  ]),
  accordionItem("Administrasi Umum", "ti-building", [
    { label: "Kepegawaian LPPM", path: "/klasifikasi/kepegawaian" },
    { label: "Persuratan LPPM", path: "/klasifikasi/persuratan" },
    { label: "Sarana Prasarana LPPM", path: "/klasifikasi/sarana-prasarana" },
  ]),
  accordionItem("Lain-lain", "ti-dots", [
    {
      label: "Kegiatan, Sosialisasi, Workshop, FGD",
      path: "/klasifikasi/lainnya/kegiatan-sosialisasi-workshop-fgd",
    },
  ]),
  linkItem("Retensi Arsip", "ti-calendar-time", "/retensi"),
  linkItem("Manajemen Akun", "ti-users", "/users"),
];

export default function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState(null);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <aside
      style={{
        width: collapsed ? "72px" : "290px",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #0F2A4A 0%, #1B3F6E 60%, #1E4D8C 100%)",
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
      <div
        style={{
          height: "68px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          paddingLeft: "16px",
          borderBottom: "1px solid rgba(255,255,255,.08)",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <button
          onClick={onToggle}
          style={{
            width: "40px",
            height: "40px",
            flexShrink: 0,
            border: "none",
            borderRadius: "10px",
            background: "rgba(255,255,255,.08)",
            color: "#FFFFFF",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: ".2s ease",
          }}
        >
          <i className="ti ti-menu-2" style={{ fontSize: "22px" }} />
        </button>
        {!collapsed && (
          <div style={{ overflow: "hidden", whiteSpace: "nowrap" }}>
            <div
              style={{
                fontSize: "16px",
                fontWeight: 700,
                color: "#fff",
                fontFamily: "DM Sans",
              }}
            >
              SIPAS
            </div>
            <div
              style={{
                fontSize: "10px",
                color: "rgba(255,255,255,.5)",
                fontFamily: "DM Sans",
              }}
            >
              Sistem Pengelolaan Arsip Surat
            </div>
          </div>
        )}
      </div>

      {/* SCROLLABLE MENU AREA */}
      <div style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        {!collapsed && (
          <div
            style={{
              padding: "18px 20px 8px",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,.35)",
              fontFamily: "DM Sans",
            }}
          >
            Menu Utama
          </div>
        )}

        <nav style={{ paddingTop: "4px", paddingBottom: "8px" }}>
          {menuItems.map((item, index) => {
            // ITEM LINK BIASA (Dashboard, Retensi Arsip, Manajemen Akun)
            if (item.type === "link") {
              const isActive =
                location.pathname === item.path ||
                (item.path !== "/dashboard" &&
                  location.pathname.startsWith(item.path));
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  title={collapsed ? item.label : ""}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: collapsed ? "12px 0" : "12px 16px",
                    margin: "4px 10px",
                    borderRadius: "10px",
                    textDecoration: "none",
                    color: isActive ? "#FFFFFF" : "rgba(255,255,255,.65)",
                    background: isActive
                      ? "rgba(77,182,245,.18)"
                      : "transparent",
                    borderLeft: isActive
                      ? "3px solid #4DB6F5"
                      : "3px solid transparent",
                    justifyContent: collapsed ? "center" : "flex-start",
                    transition: ".2s ease",
                    position: "relative",
                  }}
                >
                  <i
                    className={`ti ${item.icon}`}
                    style={{ fontSize: "20px", flexShrink: 0 }}
                  />
                  {!collapsed && (
                    <span
                      style={{
                        fontFamily: "DM Sans",
                        fontSize: "14px",
                        fontWeight: 700,
                        letterSpacing: ".01em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                  {collapsed && (
                    <span
                      className="sidebar-tooltip"
                      style={{
                        position: "absolute",
                        left: "calc(100% + 12px)",
                        background: "#0F2A4A",
                        color: "#FFFFFF",
                        fontSize: "12px",
                        padding: "6px 10px",
                        borderRadius: "6px",
                        whiteSpace: "nowrap",
                        opacity: 0,
                        pointerEvents: "none",
                        transition: ".2s",
                        zIndex: 999,
                      }}
                    >
                      {item.label}
                    </span>
                  )}
                </NavLink>
              );
            }

            // ITEM AKORDION (kategori klasifikasi)
            const isOpen = openIndex === index;
            const hasActiveChild = item.sub.some(
              (s) => location.pathname === s.path,
            );

            return (
              <div key={item.label} style={{ margin: "2px 10px" }}>
                <button
                  onClick={() => toggleAccordion(index)}
                  title={collapsed ? item.label : ""}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: collapsed ? "12px 0" : "12px 16px",
                    borderRadius: "10px",
                    border: "none",
                    cursor: "pointer",
                    color:
                      isOpen || hasActiveChild
                        ? "#FFFFFF"
                        : "rgba(255,255,255,.65)",
                    background:
                      isOpen || hasActiveChild
                        ? "rgba(77,182,245,.18)"
                        : "transparent",
                    borderLeft:
                      isOpen || hasActiveChild
                        ? "3px solid #4DB6F5"
                        : "3px solid transparent",
                    justifyContent: collapsed ? "center" : "flex-start",
                    transition: ".2s ease",
                  }}
                >
                  <i
                    className={`ti ${item.icon}`}
                    style={{ fontSize: "20px", flexShrink: 0 }}
                  />
                  {!collapsed && (
                    <>
                      <span
                        style={{
                          fontFamily: "DM Sans",
                          fontSize: "14px",
                          fontWeight: 700,
                          letterSpacing: ".01em",
                          whiteSpace: "nowrap",
                          flex: 1,
                          textAlign: "left",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        {item.label}
                        {hasActiveChild && (
                          <span
                            style={{
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: "#4DB6F5",
                              flexShrink: 0,
                            }}
                          />
                        )}
                      </span>
                      <i
                        className="ti ti-chevron-down"
                        style={{
                          fontSize: "15px",
                          flexShrink: 0,
                          transform: isOpen ? "rotate(0deg)" : "rotate(-90deg)",
                          transition: "transform .2s ease",
                          color: "rgba(255,255,255,.5)",
                        }}
                      />
                    </>
                  )}
                </button>

                {!collapsed && (
                  <div
                    style={{
                      maxHeight: isOpen
                        ? `${item.sub.length * 40 + 8}px`
                        : "0px",
                      overflow: "hidden",
                      transition: "max-height .25s ease",
                    }}
                  >
                    <div style={{ padding: "4px 0 4px 30px" }}>
                      {item.sub.map((sub) => {
                        const isSubActive = location.pathname === sub.path;
                        return (
                          <NavLink
                            key={sub.path}
                            to={sub.path}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "8px",
                              padding: "9px 10px",
                              margin: "1px 0",
                              borderRadius: "8px",
                              textDecoration: "none",
                              color: isSubActive
                                ? "#FFFFFF"
                                : "rgba(255,255,255,.55)",
                              background: isSubActive
                                ? "rgba(77,182,245,.14)"
                                : "transparent",
                              transition: ".2s ease",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "DM Sans",
                                fontSize: "12.5px",
                                fontWeight: isSubActive ? 700 : 600,
                                letterSpacing: ".005em",
                                whiteSpace: "nowrap",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                flex: 1,
                              }}
                            >
                              {sub.label}
                            </span>
                            <i
                              className="ti ti-chevron-right"
                              style={{
                                fontSize: "13px",
                                flexShrink: 0,
                                color: "rgba(255,255,255,.35)",
                              }}
                            />
                          </NavLink>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* FOOTER */}
      <div
        style={{
          padding: "12px 10px",
          borderTop: "1px solid rgba(255,255,255,.08)",
          flexShrink: 0,
        }}
      >
        <button
          className="logout-btn"
          onClick={handleLogout}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 12px",
            borderRadius: "10px",
            border: "none",
            background: "transparent",
            color: "rgba(255,255,255,.65)",
            justifyContent: collapsed ? "center" : "flex-start",
            cursor: "pointer",
            transition: ".2s ease",
            fontFamily: "DM Sans",
          }}
        >
          <i className="ti ti-logout" style={{ fontSize: "20px" }} />
          {!collapsed && (
            <span
              style={{
                fontSize: "14px",
                fontFamily: "DM Sans",
                fontWeight: 700,
                whiteSpace: "nowrap",
              }}
            >
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
        nav button:hover { background: rgba(77,182,245,.10) !important; color: #FFFFFF !important; }
        .logout-btn:hover { background: rgba(255,255,255,.10) !important; color: #FFFFFF !important; }
      `}</style>
    </aside>
  );
}
