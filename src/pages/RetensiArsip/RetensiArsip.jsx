import { useState } from "react";

const dataRetensi = [
  {
    id: 1,
    jenis: "Surat Keputusan",
    nomor: "SK-001/2025",
    tanggal: "2025-06-10",
    simpan: "2 Tahun",
    berakhir: "2027-06-10",
    status: "Aktif",
    perihal: "Keputusan Pengangkatan Jabatan Struktural",
    pengirim: "Rektor UNM",
    penerima: "LP2M UNM",
    keterangan: "Arsip aktif, masa simpan masih berlaku hingga 2027.",
  },
  {
    id: 2,
    jenis: "Surat Tugas",
    nomor: "ST-004/2024",
    tanggal: "2024-05-15",
    simpan: "2 Tahun",
    berakhir: "2026-05-15",
    status: "Akan Habis",
    perihal: "Penugasan Tim Penelitian Hibah Internal",
    pengirim: "Ketua LP2M",
    penerima: "Dosen Peneliti",
    keterangan: "Masa simpan akan berakhir dalam waktu dekat. Segera tinjau.",
  },
  {
    id: 3,
    jenis: "Surat Masuk",
    nomor: "SM-012/2020",
    tanggal: "2020-04-20",
    simpan: "5 Tahun",
    berakhir: "2025-04-20",
    status: "Musnahkan",
    perihal: "Permohonan Data Penelitian Tahun 2020",
    pengirim: "Kementerian Pendidikan",
    penerima: "LP2M UNM",
    keterangan: "Masa simpan telah habis. Arsip siap untuk dimusnahkan sesuai prosedur.",
  },
];

function formatTanggal(dateStr) {
  const bulan = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"];
  const [y, m, d] = dateStr.split("-");
  return `${parseInt(d)} ${bulan[parseInt(m) - 1]} ${y}`;
}

const statusConfig = {
  "Aktif":      { bg: "#DCFCE7", color: "#166534", dot: "#22C55E", icon: "✓", borderTop: "#22C55E" },
  "Akan Habis": { bg: "#FEF9C3", color: "#854D0E", dot: "#EAB308", icon: "!", borderTop: "#EAB308" },
  "Retensi":    { bg: "#FFEDD5", color: "#9A3412", dot: "#F97316", icon: "↻", borderTop: "#F97316" },
  "Musnahkan":  { bg: "#FEE2E2", color: "#991B1B", dot: "#EF4444", icon: "✕", borderTop: "#EF4444" },
};

const statCards = [
  { label: "Aktif",      value: 78,  ...statusConfig["Aktif"] },
  { label: "Akan Habis", value: 12,  ...statusConfig["Akan Habis"] },
  { label: "Retensi",    value: 25,  ...statusConfig["Retensi"] },
  { label: "Musnahkan",  value: 10,  ...statusConfig["Musnahkan"] },
];

function RetensiArsip() {
  const [selectedArsip, setSelectedArsip] = useState(null);

  return (
    <div style={s.wrap}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        .tbl-row { transition: background 0.15s; cursor: pointer; }
        .tbl-row:hover { background: #F5F8FC; }
        .tbl-row-selected { background: #EFF6FF !important; }

        .btn-detail {
          background: #E6F1FB;
          color: #0C447C;
          border: none;
          border-radius: 6px;
          padding: 5px 14px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.15s;
        }
        .btn-detail:hover { background: #cde3f7; }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(12px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {/* HEADER */}
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.pageTitle}>Retensi Arsip</h1>
          <p style={s.pageSubtitle}>Kelola masa simpan dan jadwal pemusnahan arsip</p>
        </div>
      </div>

      {/* STAT CARDS */}
      <div style={s.statsGrid}>
        {statCards.map((sc) => (
          <div key={sc.label} style={{ ...s.statCard, borderTop: `3px solid ${sc.dot}` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#64748B" }}>{sc.label}</span>
              <span style={{
                background: sc.bg, color: sc.color,
                borderRadius: "50%", width: 28, height: 28,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700,
              }}>{sc.icon}</span>
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, color: "#163B67", lineHeight: 1 }}>{sc.value}</div>
            <div style={{ marginTop: 6, fontSize: 11, color: "#94A3B8" }}>arsip terdaftar</div>
          </div>
        ))}
      </div>

      {/* MAIN LAYOUT — tabel + panel detail */}
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>

        {/* TABLE CARD */}
        <div style={{ ...s.card, flex: 1, minWidth: 0 }}>
          <div style={s.cardHead}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={s.cardTitle}>Daftar Arsip</span>
              <span style={s.cntBadge}>{dataRetensi.length} arsip</span>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={s.table}>
              <thead>
                <tr style={{ background: "#F8FAFC" }}>
                  <th style={{ ...s.th, width: 40 }}>No</th>
                  <th style={s.th}>Jenis Arsip</th>
                  <th style={s.th}>Nomor Surat</th>
                  <th style={s.th}>Tanggal Surat</th>
                  <th style={s.th}>Jangka Simpan</th>
                  <th style={s.th}>Tanggal Berakhir</th>
                  <th style={s.th}>Status</th>
                  <th style={{ ...s.th, textAlign: "center" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataRetensi.map((item, index) => {
                  const cfg = statusConfig[item.status] || statusConfig["Aktif"];
                  const isSelected = selectedArsip?.id === item.id;
                  return (
                    <tr
                      key={item.id}
                      className={`tbl-row ${isSelected ? "tbl-row-selected" : ""}`}
                      onClick={() => setSelectedArsip(item)}
                    >
                      <td style={{ ...s.td, color: "#94A3B8", fontSize: 12 }}>{index + 1}</td>
                      <td style={{ ...s.td, fontWeight: 500, color: "#1E293B" }}>{item.jenis}</td>
                      <td style={s.td}>
                        <span style={s.nomorBadge}>{item.nomor}</span>
                      </td>
                      <td style={{ ...s.td, color: "#64748B", fontSize: 13 }}>{formatTanggal(item.tanggal)}</td>
                      <td style={{ ...s.td, color: "#64748B", fontSize: 13 }}>{item.simpan}</td>
                      <td style={{ ...s.td, color: "#64748B", fontSize: 13 }}>{formatTanggal(item.berakhir)}</td>
                      <td style={s.td}>
                        <span style={{
                          background: cfg.bg, color: cfg.color,
                          padding: "4px 10px", borderRadius: 20,
                          fontSize: 11.5, fontWeight: 600,
                          display: "inline-flex", alignItems: "center", gap: 5,
                          whiteSpace: "nowrap",
                        }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.dot, flexShrink: 0 }} />
                          {item.status}
                        </span>
                      </td>
                      <td style={{ ...s.td, textAlign: "center" }}>
                        <button
                          className="btn-detail"
                          onClick={(e) => { e.stopPropagation(); setSelectedArsip(item); }}
                        >
                          Detail
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div style={s.footer}>
            Menampilkan {dataRetensi.length} dari {dataRetensi.length} arsip
          </div>
        </div>

        {/* DETAIL PANEL */}
        {selectedArsip && (() => {
          const cfg = statusConfig[selectedArsip.status] || statusConfig["Aktif"];
          return (
            <div style={{ ...s.detailPanel, animation: "slideIn 0.2s ease" }}>
              {/* Panel Header */}
              <div style={s.detailHeader}>
                <span style={s.detailHeaderTitle}>Detail Arsip</span>
                <button style={s.btnClose} onClick={() => setSelectedArsip(null)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <line x1="18" y1="6" x2="6" y2="18" stroke="#475569" strokeWidth="2" strokeLinecap="round"/>
                    <line x1="6" y1="6" x2="18" y2="18" stroke="#475569" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Nomor & Jenis */}
              <div style={s.detailTop}>
                <div style={{ ...s.detailIconBox, background: cfg.bg }}>
                  <span style={{ fontSize: 22, color: cfg.color, fontWeight: 700 }}>{cfg.icon}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={s.detailNomor}>{selectedArsip.nomor}</div>
                  <div style={s.detailJenis}>{selectedArsip.jenis}</div>
                </div>
                <span style={{
                  background: cfg.bg, color: cfg.color,
                  padding: "4px 10px", borderRadius: 20,
                  fontSize: 11.5, fontWeight: 600,
                  display: "inline-flex", alignItems: "center", gap: 5,
                  whiteSpace: "nowrap", flexShrink: 0,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: cfg.dot }} />
                  {selectedArsip.status}
                </span>
              </div>

              {/* Fields */}
              <div style={s.detailFields}>
                {[
                  ["Perihal",          selectedArsip.perihal],
                  ["Pengirim",         selectedArsip.pengirim],
                  ["Penerima",         selectedArsip.penerima],
                  ["Tanggal Surat",    formatTanggal(selectedArsip.tanggal)],
                  ["Jangka Simpan",    selectedArsip.simpan],
                  ["Tanggal Berakhir", formatTanggal(selectedArsip.berakhir)],
                ].map(([k, v]) => (
                  <div key={k} style={s.detailRow}>
                    <span style={s.detailKey}>{k}</span>
                    <span style={s.detailSep}>:</span>
                    <span style={s.detailVal}>{v}</span>
                  </div>
                ))}
              </div>

              {/* Keterangan */}
              <div style={s.detailSectionTitle}>Keterangan</div>
              <div style={{ ...s.keteranganBox, background: cfg.bg, color: cfg.color }}>
                {selectedArsip.keterangan}
              </div>

              {/* Actions */}
              <div style={s.detailActions}>
                <button style={{ ...s.btnAction, ...s.btnEdit }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Edit
                </button>
                <button style={{ ...s.btnAction, ...s.btnMusnah }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                    <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M19 6l-1 14H6L5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M9 6V4h6v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Musnahkan
                </button>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

const s = {
  wrap: {
    padding: "24px 30px",
    fontFamily: "'DM Sans', sans-serif",
    background: "#F1F5F9",
    minHeight: "100vh",
  },
  pageHeader: { marginBottom: 24 },
  pageTitle: { margin: 0, fontSize: 26, fontWeight: 700, color: "#163B67" },
  pageSubtitle: { margin: "4px 0 0", fontSize: 14, color: "#7B8794" },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: 16,
    marginBottom: 24,
  },
  statCard: {
    background: "#fff",
    borderRadius: 14,
    padding: "18px 20px",
    border: "1px solid #EDF2F7",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.04)",
  },
  card: {
    background: "#fff",
    borderRadius: 14,
    border: "1px solid #EDF2F7",
    overflow: "hidden",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.04)",
  },
  cardHead: {
    background: "#1A3A5C",
    padding: "14px 22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
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
  table: { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  th: {
    padding: "10px 14px",
    fontSize: 11,
    fontWeight: 700,
    color: "#1A3A5C",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    borderBottom: "1.5px solid rgba(26,58,92,0.1)",
    textAlign: "left",
    whiteSpace: "nowrap",
  },
  td: {
    padding: "13px 14px",
    borderBottom: "0.5px solid #F1F5F9",
    verticalAlign: "middle",
    color: "#1E293B",
  },
  nomorBadge: {
    background: "#E6F1FB",
    color: "#0C447C",
    fontSize: 11.5,
    fontWeight: 600,
    padding: "3px 10px",
    borderRadius: 20,
    display: "inline-block",
    whiteSpace: "nowrap",
  },
  footer: {
    padding: "12px 22px",
    textAlign: "right",
    color: "#94A3B8",
    fontSize: 12,
    borderTop: "0.5px solid #F1F5F9",
  },

  /* DETAIL PANEL */
  detailPanel: {
    width: 300,
    flexShrink: 0,
    background: "white",
    borderRadius: 14,
    border: "1px solid #EDF2F7",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.04)",
    overflow: "hidden",
  },
  detailHeader: {
    padding: "14px 18px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid #f1f5f9",
  },
  detailHeaderTitle: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1e293b",
  },
  btnClose: {
    width: 28,
    height: 28,
    border: "none",
    borderRadius: 8,
    background: "#f1f5f9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  detailTop: {
    padding: "16px 18px 14px",
    display: "flex",
    alignItems: "center",
    gap: 12,
    borderBottom: "1px solid #f1f5f9",
  },
  detailIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  detailNomor: {
    fontSize: 14,
    fontWeight: 700,
    color: "#1e293b",
  },
  detailJenis: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 2,
  },
  detailFields: {
    padding: "14px 18px",
    display: "flex",
    flexDirection: "column",
    gap: 8,
    borderBottom: "1px solid #f1f5f9",
  },
  detailRow: {
    display: "flex",
    gap: 6,
    fontSize: 12,
    alignItems: "flex-start",
  },
  detailKey: {
    color: "#64748b",
    fontWeight: 500,
    width: 110,
    flexShrink: 0,
  },
  detailSep: { color: "#94a3b8" },
  detailVal: {
    color: "#1e293b",
    fontWeight: 500,
    flex: 1,
  },
  detailSectionTitle: {
    padding: "10px 18px 4px",
    fontSize: 11,
    fontWeight: 700,
    color: "#475569",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
  },
  keteranganBox: {
    margin: "0 18px 14px",
    padding: "10px 14px",
    borderRadius: 10,
    fontSize: 12,
    lineHeight: 1.6,
    fontWeight: 500,
  },
  detailActions: {
    padding: "12px 18px 16px",
    display: "flex",
    gap: 8,
    borderTop: "1px solid #f1f5f9",
  },
  btnAction: {
    flex: 1,
    height: 36,
    border: "none",
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 600,
    fontFamily: "'DM Sans', sans-serif",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    transition: "all 0.15s",
  },
  btnEdit: {
    background: "#163b67",
    color: "white",
  },
  btnMusnah: {
    background: "#fee2e2",
    color: "#dc2626",
  },
};

export default RetensiArsip;
