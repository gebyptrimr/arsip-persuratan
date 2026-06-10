import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const isAdmin = true;

const adminUser = {
  nama: "Hendra Arifin",
  inisial: "HA",
  email: "hendra@lp2m.unm.ac.id",
};

// ─── Topbar ───────────────────────────────────────────────────
function Topbar({ isAdmin, adminUser }) {
  const [ddOpen, setDdOpen] = useState(false);
  const ddRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ddRef.current && !ddRef.current.contains(e.target)) setDdOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div style={s.topbar}>
      <div style={s.logo}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke="#4A9FD5"
            strokeWidth="1.8"
          />
          <path
            d="M3 9l9 6 9-6"
            stroke="#4A9FD5"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <div style={s.brandName}>SIPAS</div>
        <div style={s.brandSub}>LP2M Universitas Negeri Makassar</div>
      </div>

      <div style={{ flex: 1 }} />

      {isAdmin && (
        <>
          <div style={s.notifBtn} title="Notifikasi">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V4a1 1 0 10-2 0v1.083A6 6 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span style={s.notifDot} />
          </div>

          <div style={s.divider} />

          <div style={{ position: "relative" }} ref={ddRef}>
            <div style={s.userInfo} onClick={() => setDdOpen(!ddOpen)}>
              <div style={s.avatar}>{adminUser.inisial}</div>
              <div>
                <div style={s.uname}>{adminUser.nama}</div>
                <div style={s.urole}>Administrator</div>
              </div>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#aaa"
                strokeWidth="2"
                style={{
                  transition: "transform .2s",
                  transform: ddOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </div>

            {ddOpen && (
              <div style={s.dropdown}>
                <div style={s.ddHeader}>
                  <div
                    style={{ ...s.avatar, width: 38, height: 38, fontSize: 14 }}
                  >
                    {adminUser.inisial}
                  </div>
                  <div>
                    <div style={s.ddName}>{adminUser.nama}</div>
                    <div style={s.ddEmail}>{adminUser.email}</div>
                  </div>
                </div>
                <div
                  style={s.ddItem}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f5f5f5")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#888"
                    strokeWidth="1.8"
                  >
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                  </svg>
                  Profil Saya
                </div>
                <div
                  style={s.ddItem}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f5f5f5")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#888"
                    strokeWidth="1.8"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
                  </svg>
                  Pengaturan
                </div>
                <div style={s.ddSep} />
                <div
                  style={{ ...s.ddItem, color: "#A32D2D" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#fff5f5")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#A32D2D"
                    strokeWidth="1.8"
                  >
                    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                  </svg>
                  Keluar
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────
function UploadArsip() {
  const [jenis, setJenis] = useState("");
  const navigate = useNavigate();

  const handleLanjut = () => {
    if (jenis === "kontrak") navigate("/upload-arsip/kontrak-tambah");
    else if (jenis === "sk") navigate("/upload-arsip/sk-tambah");
    else if (jenis === "surat-tugas")
      navigate("/upload-arsip/surat-tugas-tambah");
  };

  return (
    <div style={s.wrap}>
      <Topbar isAdmin={isAdmin} adminUser={adminUser} />

      <div style={s.card}>
        <div style={s.cardHead}>
          <span style={s.cardTitle}>Upload Arsip</span>
        </div>

        <div style={s.cardBody}>
          <div style={s.fieldGroup}>
            <label style={s.label}>Pilih Jenis Arsip</label>
            <select
              value={jenis}
              onChange={(e) => setJenis(e.target.value)}
              style={s.select}
            >
              <option value="">-- Pilih Arsip --</option>
              <option value="kontrak">Kontrak</option>
              <option value="sk">SK</option>
              <option value="surat-tugas">Surat Tugas</option>
            </select>
          </div>

          <button
            style={{
              ...s.btnLanjut,
              opacity: !jenis ? 0.5 : 1,
              cursor: !jenis ? "not-allowed" : "pointer",
            }}
            onClick={handleLanjut}
            disabled={!jenis}
          >
            Lanjut
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────
const s = {
  wrap: {
    backgroundColor: "#F5F7FA",
    minHeight: "100vh",
    padding: "24px",
    fontFamily: "'Inter', sans-serif",
  },
  topbar: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    marginBottom: 20,
    backgroundColor: "#fff",
    border: "0.5px solid #e0e0e0",
    borderRadius: 12,
    padding: "10px 18px",
  },
  logo: {
    width: 34,
    height: 34,
    backgroundColor: "#1A3A5C",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  brandName: {
    fontSize: 17,
    fontWeight: 600,
    color: "#1A3A5C",
    lineHeight: 1.2,
  },
  brandSub: { fontSize: 11.5, color: "#888" },
  notifBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    border: "0.5px solid #ddd",
    backgroundColor: "#F5F7FA",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    position: "relative",
    color: "#666",
  },
  notifDot: {
    width: 8,
    height: 8,
    backgroundColor: "#E24B4A",
    borderRadius: "50%",
    position: "absolute",
    top: 6,
    right: 6,
    border: "1.5px solid #fff",
  },
  divider: { width: 1, height: 28, backgroundColor: "#e0e0e0" },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    cursor: "pointer",
    padding: "4px 10px",
    borderRadius: 8,
    transition: "background .15s",
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: "50%",
    backgroundColor: "#1A3A5C",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 13,
    fontWeight: 600,
    color: "#B5D4F4",
    flexShrink: 0,
  },
  uname: { fontSize: 13, fontWeight: 600, color: "#1A1A1A", lineHeight: 1.2 },
  urole: { fontSize: 11, color: "#888" },
  dropdown: {
    position: "absolute",
    top: "calc(100% + 8px)",
    right: 0,
    backgroundColor: "#fff",
    border: "0.5px solid #ddd",
    borderRadius: 10,
    overflow: "hidden",
    width: 210,
    zIndex: 100,
  },
  ddHeader: {
    padding: "12px 14px",
    borderBottom: "0.5px solid #eee",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  ddName: { fontSize: 13, fontWeight: 600, color: "#1A1A1A" },
  ddEmail: { fontSize: 11, color: "#888" },
  ddItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 14px",
    fontSize: 13,
    color: "#1A1A1A",
    cursor: "pointer",
    transition: "background .12s",
    background: "transparent",
  },
  ddSep: { height: 0.5, backgroundColor: "#eee" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    border: "0.5px solid #e0e0e0",
    overflow: "hidden",
  },
  cardHead: {
    backgroundColor: "#1A3A5C",
    padding: "16px 22px",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  cardTitle: { color: "#fff", fontSize: 15, fontWeight: 600 },
  cardBody: { padding: "24px 22px" },
  fieldGroup: { marginBottom: 20 },
  label: {
    display: "block",
    fontSize: 12.5,
    fontWeight: 600,
    color: "#1A3A5C",
    marginBottom: 7,
    letterSpacing: 0.2,
  },
  select: {
    width: "100%",
    padding: "9px 12px",
    border: "0.5px solid #ccc",
    borderRadius: 8,
    fontSize: 13,
    outline: "none",
    backgroundColor: "#F5F7FA",
    color: "#1A1A1A",
    boxSizing: "border-box",
    appearance: "auto",
  },
  btnLanjut: {
    background: "#1A3A5C",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "9px 24px",
    fontSize: 13,
    fontWeight: 600,
    transition: "opacity .15s",
  },
};

export default UploadArsip;
