import React, { useEffect } from "react";

// ── Simulasi role aktif: ganti "admin" <-> "user" untuk test
const currentRole = "admin"; // "admin" | "user"

const globalStyle = `
  button:active { outline: none !important; }
  button:focus  { outline: none !important; }
`;

function InjectStyle() {
  useEffect(() => {
    const tag = document.createElement("style");
    tag.innerHTML = globalStyle;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);
  return null;
}

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

function Btn({ style, onClick, children }) {
  return (
    <span
      role="button"
      tabIndex={0}
      style={{ ...style, display: "inline-block" }}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
    >
      {children}
    </span>
  );
}

function SK() {
  const isAdmin = currentRole === "admin"; // ganti jadi admin/user

  return (
    <div style={s.wrap}>
      <InjectStyle />
      <div style={s.card}>
        <div style={s.cardHead}>
          <span style={s.cardTitle}>Surat Keputusan</span>
          <span style={s.cntBadge}>{dataSK.length} SK</span>
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
                {dataSK.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={s.empty}>
                      Tidak ada data ditemukan
                    </td>
                  </tr>
                ) : (
                  dataSK.map((item, index) => (
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
                        <Btn
                          style={s.btnPdf}
                          onClick={() => window.open(item.file, "_blank")}
                        >
                          Lihat PDF
                        </Btn>
                      </td>
                      <td style={s.td}>
                        <Btn
                          style={s.btnEdit}
                          onClick={() => console.log("Edit:", item.id)}
                        >
                          Edit
                        </Btn>
                        {isAdmin && (
                          <Btn
                            style={s.btnDelete}
                            onClick={() => console.log("Delete:", item.id)}
                          >
                            Hapus
                          </Btn>
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
              Menampilkan {dataSK.length} dari {dataSK.length} SK
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  wrap: {
    backgroundColor: "#F5F7FA",
    minHeight: "100vh",
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
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
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
  btnPdf: {
    background: "#1A3A5C",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    padding: "4px 10px",
    fontSize: 11.5,
    fontWeight: 600,
    cursor: "pointer",
    whiteSpace: "nowrap",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
  },
  btnEdit: {
    background: "#1A3A5C",
    color: "#fff",
    border: "none",
    borderRadius: 5,
    padding: "4px 9px",
    fontSize: 11.5,
    fontWeight: 600,
    cursor: "pointer",
    marginRight: 5,
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
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
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
  },
  empty: { textAlign: "center", padding: 36, color: "#888", fontSize: 13 },
};

export default SK;
