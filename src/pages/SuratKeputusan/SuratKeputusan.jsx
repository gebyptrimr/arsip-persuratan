import { useSearch } from "../../Contextt/SearchContext";
import { globalFilter } from "../../utils/filterData";

const currentRole = "admin"; // "admin" | "user"

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

function SuratKeputusan() {
  const { searchTerm } = useSearch();

  const isAdmin = currentRole === "admin";

  const filteredSurat = globalFilter(dataSK, searchTerm);

  return (
    <div style={s.wrap}>
      <style>{`
        .btn-pdf { background: #4A9FD5 !important; color: #fff !important; border: none; border-radius: 5px; padding: 4px 10px; font-size: 11.5px; font-weight: 600; cursor: pointer; white-space: nowrap; }
        .btn-pdf:hover { background: #2280BE !important; }
        .btn-pdf:active, .btn-pdf:focus { background: #4A9FD5 !important; outline: none; }

        .btn-edit { background: #FFF3CD !important; color: #633806 !important; border: none; border-radius: 5px; padding: 4px 9px; font-size: 11.5px; font-weight: 600; cursor: pointer; margin-right: 5px; }
        .btn-edit:hover { background: #FAC775 !important; }
        .btn-edit:active, .btn-edit:focus { background: #FFF3CD !important; outline: none; }

        .btn-delete { background: #FCEBEB !important; color: #791F1F !important; border: none; border-radius: 5px; padding: 4px 9px; font-size: 11.5px; font-weight: 600; cursor: pointer; }
        .btn-delete:hover { background: #F7C1C1 !important; }
        .btn-delete:active, .btn-delete:focus { background: #FCEBEB !important; outline: none; }

        .tbl-row:hover { background: #F5F8FC; }
      `}</style>

      <div style={s.card}>
        <div style={s.cardHead}>
          <span style={s.cardTitle}>Surat Keputusan</span>
          <span style={s.cntBadge}>{filteredSurat.length} SK</span>
        </div>

        <div style={s.cardBody}>
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
                {filteredSurat.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={s.empty}>
                      Tidak ada data ditemukan
                    </td>
                  </tr>
                ) : (
                  filteredSurat.map((item, index) => (
                    <tr key={item.id} className="tbl-row">
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
                          className="btn-pdf"
                          onClick={() => window.open(item.file, "_blank")}
                        >
                          Lihat PDF
                        </button>
                      </td>
                      <td style={s.td}>
                        <button
                          className="btn-edit"
                          onClick={() => console.log("Edit:", item.id)}
                        >
                          Edit
                        </button>
                        {isAdmin && (
                          <button
                            className="btn-delete"
                            onClick={() => console.log("Delete:", item.id)}
                          >
                            Hapus
                          </button>
                        )}
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
              Menampilkan {filteredSurat.length} dari {dataSK.length} SK
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  wrap: { padding: "24px", fontFamily: "'DM Sans', sans-serif" },
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
  cardBody: { padding: "18px 22px" },
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
  empty: { textAlign: "center", padding: 36, color: "#888", fontSize: 13 },
};

export default SuratKeputusan;