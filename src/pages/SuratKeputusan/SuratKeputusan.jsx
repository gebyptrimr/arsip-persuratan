import React, { useState, useRef, useEffect } from "react";

const isAdmin = true;

const adminUser = {
  nama: "Hendra Arifin",
  inisial: "HA",
  email: "hendra@lp2m.unm.ac.id",
};

const dataSK = [
  {
    id: 1,
    nomorSK: "SK-001/2025",
    judulSK: "Pengangkatan Tim Arsip",
    tanggalSK: "2026-06-07",
    pejabatPenetap: "Kepala Dinas",
    file: "sk_001.pdf",
  },
  {
    id: 2,
    nomorSK: "SK-002/2025",
    judulSK: "Penetapan Struktur Organisasi LP2M",
    tanggalSK: "2026-03-15",
    pejabatPenetap: "Rektor UNM",
    file: "sk_002.pdf",
  },
  {
    id: 3,
    nomorSK: "SK-003/2025",
    judulSK: "Penunjukan Koordinator Penelitian",
    tanggalSK: "2026-01-20",
    pejabatPenetap: "Dekan Fakultas",
    file: "sk_003.pdf",
  },
];

function formatTanggal(dateStr) {
  const bulan = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Ags",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];
  const [y, m, d] = dateStr.split("-");
  return `${parseInt(d)} ${bulan[parseInt(m) - 1]} ${y}`;
}

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
function SK() {
  const [query, setQuery] = useState("");

  const filtered = dataSK.filter(
    (r) =>
      r.nomorSK.toLowerCase().includes(query.toLowerCase()) ||
      r.judulSK.toLowerCase().includes(query.toLowerCase()) ||
      r.pejabatPenetap.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div style={s.wrap}>
      <Topbar isAdmin={isAdmin} adminUser={adminUser} />

      <div style={s.card}>
        <div style={s.cardHead}>
          <span style={s.cardTitle}>Arsip SK</span>
          <span style={s.cntBadge}>{filtered.length} SK</span>
          <div style={{ flex: 1 }} />
        </div>

        <div style={s.cardBody}>
          <div style={{ marginBottom: 16 }}>
            <input
              type="text"
              placeholder="Cari nomor atau judul SK..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={s.searchInput}
            />
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={{ ...s.th, width: 36 }}>No</th>
                  <th style={{ ...s.th, width: 130 }}>Nomor SK</th>
                  <th style={s.th}>Judul SK</th>
                  <th style={{ ...s.th, width: 110 }}>Tgl. SK</th>
                  <th style={{ ...s.th, width: 150 }}>Pejabat Penetap</th>
                  <th style={{ ...s.th, width: 95 }}>File PDF</th>
                  <th style={{ ...s.th, width: 140 }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={s.empty}>
                      Tidak ada data ditemukan
                    </td>
                  </tr>
                ) : (
                  filtered.map((item, index) => (
                    <tr key={item.id}>
                      <td style={{ ...s.td, color: "#888", fontSize: 12 }}>
                        {index + 1}
                      </td>
                      <td style={s.td}>
                        <span style={s.nomorBadge}>{item.nomorSK}</span>
                      </td>
                      <td style={{ ...s.td, fontSize: 12.5 }}>
                        {item.judulSK}
                      </td>
                      <td style={{ ...s.td, color: "#888", fontSize: 12 }}>
                        {formatTanggal(item.tanggalSK)}
                      </td>
                      <td style={{ ...s.td, fontWeight: 600, fontSize: 12.5 }}>
                        {item.pejabatPenetap}
                      </td>
                      <td style={s.td}>
                        <button
                          style={s.btnPdf}
                          onClick={() => window.open(item.file, "_blank")}
                        >
                          Lihat PDF
                        </button>
                      </td>
                      <td style={s.td}>
                        <button
                          style={s.btnEdit}
                          onClick={() => console.log("Edit:", item.id)}
                        >
                          Edit
                        </button>
                        <button
                          style={s.btnDelete}
                          onClick={() => console.log("Delete:", item.id)}
                        >
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div
            style={{
              marginTop: 16,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <span style={{ fontSize: 11.5, color: "#888" }}>
              Menampilkan {filtered.length} dari {dataSK.length} SK
            </span>
          </div>
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
  cntBadge: {
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    fontSize: 11,
    fontWeight: 600,
    padding: "2px 10px",
    borderRadius: 20,
  },
  btnTambah: {
    background: "#4A9FD5",
    color: "#fff",
    border: "none",
    borderRadius: 7,
    padding: "6px 14px",
    fontSize: 12.5,
    fontWeight: 600,
    cursor: "pointer",
  },
  cardBody: { padding: "18px 22px" },
  searchInput: {
    width: "100%",
    padding: "8px 12px",
    border: "0.5px solid #ccc",
    borderRadius: 8,
    fontSize: 13,
    outline: "none",
    backgroundColor: "#F5F7FA",
    color: "#1A1A1A",
    boxSizing: "border-box",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 12.5 },
  th: {
    padding: "9px 12px",
    fontSize: 10.5,
    fontWeight: 600,
    color: "#1A3A5C",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    borderBottom: "1.5px solid rgba(26,58,92,0.1)",
    textAlign: "left",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "12px 12px",
    borderBottom: "0.5px solid #f0f0f0",
    verticalAlign: "middle",
    color: "#1A1A1A",
  },
  nomorBadge: {
    background: "#E6F1FB",
    color: "#0C447C",
    fontSize: 11.5,
    fontWeight: 600,
    padding: "2px 9px",
    borderRadius: 20,
    display: "inline-block",
    whiteSpace: "nowrap",
  },
  btnPdf: {
    background: "#4A9FD5",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    padding: "4px 10px",
    fontSize: 11.5,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
  },
  btnEdit: {
    background: "#FFF3CD",
    color: "#633806",
    border: "none",
    borderRadius: 5,
    padding: "4px 9px",
    fontSize: 11.5,
    fontWeight: 600,
    cursor: "pointer",
    marginRight: 5,
  },
  btnDelete: {
    background: "#FCEBEB",
    color: "#791F1F",
    border: "none",
    borderRadius: 5,
    padding: "4px 9px",
    fontSize: 11.5,
    fontWeight: 600,
    cursor: "pointer",
  },
  empty: { textAlign: "center", padding: 36, color: "#888", fontSize: 13 },
};

export default SK;
