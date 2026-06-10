import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";

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

// ─── Field Components ─────────────────────────────────────────
function Field({ label, children, half }) {
  return (
    <div style={{ ...s.fieldWrap, width: half ? "calc(50% - 8px)" : "100%" }}>
      <label style={s.label}>{label}</label>
      {children}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────
function KontrakTambah() {
  const [fileName, setFileName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Data Kontrak berhasil disimpan!",
      confirmButtonColor: "#1A3A5C",
    });
  };

  return (
    <div style={s.wrap}>
      <Topbar isAdmin={isAdmin} adminUser={adminUser} />

      <div style={s.card}>
        {/* Header */}
        <div style={s.cardHead}>
          <div style={s.headIcon}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4A9FD5"
              strokeWidth="1.8"
            >
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
          </div>
          <div>
            <div style={s.cardTitle}>Tambah Arsip Kontrak</div>
            <div style={s.cardSub}>
              Lengkapi semua informasi kontrak di bawah ini
            </div>
          </div>
        </div>

        {/* Body */}
        <div style={s.cardBody}>
          <form onSubmit={handleSubmit}>
            {/* Section: Identitas Kontrak */}
            <div style={s.sectionLabel}>Identitas Kontrak</div>
            <div style={s.row}>
              <Field label="Nomor Kontrak *" half>
                <input
                  type="text"
                  style={s.input}
                  placeholder="Contoh: KTR-001/2025"
                  required
                />
              </Field>
              <Field label="Judul Kontrak *" half>
                <input
                  type="text"
                  style={s.input}
                  placeholder="Masukkan judul kontrak"
                  required
                />
              </Field>
            </div>

            {/* Section: Para Pihak */}
            <div style={s.sectionLabel}>Para Pihak</div>
            <div style={s.row}>
              <Field label="Pihak Pertama" half>
                <input
                  type="text"
                  style={s.input}
                  placeholder="Nama instansi / lembaga pihak pertama"
                />
              </Field>
              <Field label="Pihak Kedua" half>
                <input
                  type="text"
                  style={s.input}
                  placeholder="Nama instansi / lembaga pihak kedua"
                />
              </Field>
            </div>

            {/* Section: Periode */}
            <div style={s.sectionLabel}>Periode Kontrak</div>
            <div style={s.row}>
              <Field label="Tanggal Kontrak" half>
                <input type="date" style={s.input} />
              </Field>
              <Field label="Tanggal Berakhir" half>
                <input type="date" style={s.input} />
              </Field>
            </div>

            {/* Section: Upload */}
            <div style={s.sectionLabel}>Dokumen</div>
            <Field label="Upload File PDF *">
              <label style={s.uploadBox}>
                <input
                  type="file"
                  accept=".pdf"
                  required
                  style={{ display: "none" }}
                  onChange={(e) => setFileName(e.target.files[0]?.name || "")}
                />
                <div style={s.uploadIcon}>
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#4A9FD5"
                    strokeWidth="1.6"
                  >
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                {fileName ? (
                  <span
                    style={{ fontSize: 13, color: "#1A3A5C", fontWeight: 600 }}
                  >
                    {fileName}
                  </span>
                ) : (
                  <>
                    <span style={{ fontSize: 13, color: "#555" }}>
                      Klik untuk memilih file PDF
                    </span>
                    <span
                      style={{ fontSize: 11.5, color: "#aaa", marginTop: 2 }}
                    >
                      Hanya file .pdf yang diterima
                    </span>
                  </>
                )}
              </label>
            </Field>

            <div style={s.sep} />

            {/* Actions */}
            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}
            >
              <button type="button" style={s.btnBatal}>
                Batal
              </button>
              <button type="submit" style={s.btnSimpan}>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ marginRight: 6 }}
                >
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Simpan Arsip
              </button>
            </div>
          </form>
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

  // Card
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    border: "0.5px solid #e0e0e0",
    overflow: "hidden",
  },
  cardHead: {
    backgroundColor: "#1A3A5C",
    padding: "18px 24px",
    display: "flex",
    alignItems: "center",
    gap: 14,
  },
  headIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  cardTitle: { color: "#fff", fontSize: 15, fontWeight: 600, lineHeight: 1.3 },
  cardSub: { color: "rgba(255,255,255,0.55)", fontSize: 11.5, marginTop: 2 },
  cardBody: { padding: "26px 28px" },

  // Section label
  sectionLabel: {
    fontSize: 11,
    fontWeight: 700,
    color: "#4A9FD5",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 12,
    marginTop: 6,
    paddingBottom: 6,
    borderBottom: "1px solid #EAF3FB",
  },

  // Form
  row: { display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 18 },
  fieldWrap: { display: "flex", flexDirection: "column" },
  label: {
    fontSize: 12,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 6,
    letterSpacing: 0.2,
  },
  input: {
    padding: "9px 12px",
    border: "0.5px solid #D1D5DB",
    borderRadius: 8,
    fontSize: 13,
    outline: "none",
    backgroundColor: "#FAFAFA",
    color: "#1A1A1A",
    width: "100%",
    boxSizing: "border-box",
    transition: "border .15s",
  },

  // Upload
  uploadBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "28px 20px",
    border: "1.5px dashed #B8D4EE",
    borderRadius: 10,
    backgroundColor: "#F0F7FD",
    cursor: "pointer",
    transition: "background .15s",
  },
  uploadIcon: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#E6F1FB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },

  sep: { height: 1, backgroundColor: "#F0F0F0", margin: "22px 0" },

  // Buttons
  btnBatal: {
    background: "#F3F4F6",
    color: "#374151",
    border: "none",
    borderRadius: 8,
    padding: "9px 20px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  btnSimpan: {
    background: "#1A3A5C",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "9px 22px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
  },
};

export default KontrakTambah;
