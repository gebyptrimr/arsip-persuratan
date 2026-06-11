import React, { useState } from "react";

const isAdmin = true;

const dataRetensi = [
  {
    id: 1,
    jenis: "Surat Keputusan",
    nomor: "SK-001/2025",
    tanggal: "2025-06-10",
    simpan: "2 Tahun",
    berakhir: "2027-06-10",
    status: "Aktif",
  },
  {
    id: 2,
    jenis: "Surat Tugas",
    nomor: "ST-004/2024",
    tanggal: "2024-05-15",
    simpan: "2 Tahun",
    berakhir: "2026-05-15",
    status: "Akan Habis",
  },
  {
    id: 3,
    jenis: "Surat Masuk",
    nomor: "SM-012/2020",
    tanggal: "2020-04-20",
    simpan: "5 Tahun",
    berakhir: "2025-04-20",
    status: "Musnahkan",
  },
];

function formatTanggal(dateStr) {
  const bulan = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"];
  const [y, m, d] = dateStr.split("-");
  return `${parseInt(d)} ${bulan[parseInt(m) - 1]} ${y}`;
}

const statusConfig = {
  "Aktif":      { bg: "#DCFCE7", color: "#166534", dot: "#22C55E", icon: "✓" },
  "Akan Habis": { bg: "#FEF9C3", color: "#854D0E", dot: "#EAB308", icon: "!" },
  "Retensi":    { bg: "#FFEDD5", color: "#9A3412", dot: "#F97316", icon: "↻" },
  "Musnahkan":  { bg: "#FEE2E2", color: "#991B1B", dot: "#EF4444", icon: "✕" },
};

const statCards = [
  { label: "Aktif",      value: 78,  ...statusConfig["Aktif"] },
  { label: "Akan Habis", value: 12,  ...statusConfig["Akan Habis"] },
  { label: "Retensi",    value: 25,  ...statusConfig["Retensi"] },
  { label: "Musnahkan",  value: 10,  ...statusConfig["Musnahkan"] },
];

function RetensiArsip() {
  const [query, setQuery] = useState("");

  const filtered = dataRetensi.filter(
    (r) =>
      r.nomor.toLowerCase().includes(query.toLowerCase()) ||
      r.jenis.toLowerCase().includes(query.toLowerCase()) ||
      r.status.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={s.wrap}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

        .tbl-row { transition: background 0.15s; }
        .tbl-row:hover { background: #F5F8FC; }

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

        .search-input:focus {
          outline: none;
          border-color: #1A3A5C;
          box-shadow: 0 0 0 3px rgba(26,58,92,0.08);
        }
      `}</style>

      {/* Header */}
      <div style={s.pageHeader}>
        <div>
          <h1 style={s.pageTitle}>Retensi Arsip</h1>
          <p style={s.pageSubtitle}>Kelola masa simpan dan jadwal pemusnahan arsip</p>
        </div>
      </div>

      {/* Stat Cards */}
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

      {/* Table Card */}
      <div style={s.card}>
        <div style={s.cardHead}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={s.cardTitle}>Daftar Arsip</span>
            <span style={s.cntBadge}>{filtered.length} arsip</span>
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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={s.empty}>Tidak ada data ditemukan</td>
                </tr>
              ) : (
                filtered.map((item, index) => {
                  const cfg = statusConfig[item.status] || statusConfig["Aktif"];
                  return (
                    <tr key={item.id} className="tbl-row">
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
                          background: cfg.bg,
                          color: cfg.color,
                          padding: "4px 10px",
                          borderRadius: 20,
                          fontSize: 11.5,
                          fontWeight: 600,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          whiteSpace: "nowrap",
                        }}>
                          <span style={{
                            width: 6, height: 6, borderRadius: "50%",
                            background: cfg.dot, flexShrink: 0,
                          }} />
                          {item.status}
                        </span>
                      </td>
                      <td style={{ ...s.td, textAlign: "center" }}>
                        <button className="btn-detail">Detail</button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div style={s.footer}>
          Menampilkan {filtered.length} dari {dataRetensi.length} arsip
        </div>
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
  pageHeader: {
    marginBottom: 24,
  },
  pageTitle: {
    margin: 0,
    fontSize: 26,
    fontWeight: 700,
    color: "#163B67",
  },
  pageSubtitle: {
    margin: "4px 0 0",
    fontSize: 14,
    color: "#7B8794",
  },
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
    flexWrap: "wrap",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: 600,
  },
  cntBadge: {
    background: "rgba(255,255,255,0.15)",
    color: "#fff",
    fontSize: 11,
    fontWeight: 600,
    padding: "2px 10px",
    borderRadius: 20,
  },
  searchInput: {
    padding: "7px 14px",
    border: "1px solid rgba(255,255,255,0.25)",
    borderRadius: 8,
    fontSize: 13,
    background: "rgba(255,255,255,0.1)",
    color: "#fff",
    width: 260,
    fontFamily: "'DM Sans', sans-serif",
    transition: "border 0.2s, box-shadow 0.2s",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 13,
  },
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
  empty: {
    textAlign: "center",
    padding: 40,
    color: "#94A3B8",
    fontSize: 13,
  },
};

export default RetensiArsip;
