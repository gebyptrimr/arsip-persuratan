import { useState } from "react";

// Sambung dari context/session auth
// true  = sudah login sebagai admin
// false = publik, tidak perlu login
const isAdmin = false;

const dataSurat = [
  {
    id: 1,
    nomorSurat: "001/SM/2025",
    tanggalSurat: "2025-06-01",
    tanggalTerima: "2025-06-02",
    pengirim: "Bupati",
    perihal: "Undangan Rapat Koordinasi",
    file: "surat_001.pdf",
  },
  {
    id: 2,
    nomorSurat: "002/SM/2025",
    tanggalSurat: "2025-06-05",
    tanggalTerima: "2025-06-06",
    pengirim: "Rektor UNM",
    perihal: "Pemberitahuan Jadwal Akademik",
    file: "surat_002.pdf",
  },
  {
    id: 3,
    nomorSurat: "003/SM/2025",
    tanggalSurat: "2025-06-07",
    tanggalTerima: "2025-06-08",
    pengirim: "Kemendikbud",
    perihal: "Laporan Penelitian Semester Ganjil",
    file: "surat_003.pdf",
  },
];

function formatTanggal(dateStr) {
  const bulan = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"];
  const [y, m, d] = dateStr.split("-");
  return `${parseInt(d)} ${bulan[parseInt(m) - 1]} ${y}`;
}

function SuratMasuk() {
  const [query, setQuery] = useState("");

  const filtered = dataSurat.filter(
    (r) =>
      r.nomorSurat.toLowerCase().includes(query.toLowerCase()) ||
      r.pengirim.toLowerCase().includes(query.toLowerCase()) ||
      r.perihal.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={s.wrap}>
      <div style={s.card}>
        <div style={s.cardHead}>
          <span style={s.cardTitle}>Surat Masuk</span>
          <span style={s.cntBadge}>{filtered.length} surat</span>
        </div>

        <div style={s.cardBody}>
          <div style={{ marginBottom: 16 }}>
            <input
              type="text"
              placeholder="Cari nomor surat, pengirim, perihal..."
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
                  <th style={{ ...s.th, width: 120 }}>Nomor Surat</th>
                  <th style={{ ...s.th, width: 100 }}>Tgl. Surat</th>
                  <th style={{ ...s.th, width: 100 }}>Tgl. Terima</th>
                  <th style={{ ...s.th, width: 100 }}>Pengirim</th>
                  <th style={s.th}>Perihal</th>
                  <th style={{ ...s.th, width: 95 }}>File PDF</th>
                  {isAdmin && <th style={{ ...s.th, width: 140 }}>Aksi</th>}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={isAdmin ? 8 : 7} style={s.empty}>
                      Tidak ada data ditemukan
                    </td>
                  </tr>
                ) : (
                  filtered.map((item, index) => (
                    <tr key={item.id}>
                      <td style={{ ...s.td, color: "#888", fontSize: 12 }}>{index + 1}</td>
                      <td style={s.td}>
                        <span style={s.nomorBadge}>{item.nomorSurat}</span>
                      </td>
                      <td style={{ ...s.td, color: "#888", fontSize: 12 }}>{formatTanggal(item.tanggalSurat)}</td>
                      <td style={{ ...s.td, color: "#888", fontSize: 12 }}>{formatTanggal(item.tanggalTerima)}</td>
                      <td style={{ ...s.td, fontWeight: 600, fontSize: 12.5 }}>{item.pengirim}</td>
                      <td style={{ ...s.td, fontSize: 12.5 }}>{item.perihal}</td>
                      <td style={s.td}>
                        <button style={s.btnPdf} onClick={() => window.open(item.file, "_blank")}>
                          Lihat PDF
                        </button>
                      </td>
                      {isAdmin && (
                        <td style={s.td}>
                          <button style={s.btnEdit} onClick={() => console.log("Edit:", item.id)}>
                            Edit
                          </button>
                          <button style={s.btnDelete} onClick={() => console.log("Delete:", item.id)}>
                            Hapus
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
            <span style={{ fontSize: 11.5, color: "#888" }}>
              Menampilkan {filtered.length} dari {dataSurat.length} surat
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  wrap: {
    padding: "24px",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    border: "0.5px solid #e0e0e0",
    overflow: "hidden",
  },
  cardHead: {
    backgroundColor: "#1A3A5C",
    padding: "16px 22px",
    display: "flex", alignItems: "center", gap: 10,
  },
  cardTitle: { color: "#fff", fontSize: 15, fontWeight: 600 },
  cntBadge: {
    background: "rgba(255,255,255,0.15)", color: "#fff",
    fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 20,
  },
  cardBody: { padding: "18px 22px" },
  searchInput: {
    width: "100%", padding: "8px 12px",
    border: "0.5px solid #ccc", borderRadius: 8,
    fontSize: 13, outline: "none",
    backgroundColor: "#F5F7FA", color: "#1A1A1A", boxSizing: "border-box",
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 12.5 },
  th: {
    padding: "9px 12px", fontSize: 10.5, fontWeight: 600,
    color: "#1A3A5C", textTransform: "uppercase", letterSpacing: 0.5,
    borderBottom: "1.5px solid rgba(26,58,92,0.1)",
    textAlign: "left", whiteSpace: "nowrap",
  },
  td: {
    padding: "12px 12px", borderBottom: "0.5px solid #f0f0f0",
    verticalAlign: "middle", color: "#1A1A1A",
  },
  nomorBadge: {
    background: "#E6F1FB", color: "#0C447C",
    fontSize: 11.5, fontWeight: 600,
    padding: "2px 9px", borderRadius: 20,
    display: "inline-block", whiteSpace: "nowrap",
  },
  btnPdf: {
    background: "#4A9FD5", color: "#fff", border: "none",
    borderRadius: 5, padding: "4px 10px",
    fontSize: 11.5, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
  },
  btnEdit: {
    background: "#FFF3CD", color: "#633806", border: "none",
    borderRadius: 5, padding: "4px 9px",
    fontSize: 11.5, fontWeight: 600, cursor: "pointer", marginRight: 5,
  },
  btnDelete: {
    background: "#FCEBEB", color: "#791F1F", border: "none",
    borderRadius: 5, padding: "4px 9px",
    fontSize: 11.5, fontWeight: 600, cursor: "pointer",
  },
  empty: { textAlign: "center", padding: 36, color: "#888", fontSize: 13 },
};

export default SuratMasuk;