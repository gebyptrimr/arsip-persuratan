import { useSearch } from "../../Contextt/SearchContext";
import { globalFilter } from "../../utils/filterData";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import KontrakEdit from "../EditSurat/KontrakEdit";
import Swal from "sweetalert2";

function Kontrak() {
  const { searchTerm } = useSearch();
  const currentRole = "admin"; // "admin" | "user"
  const isAdmin = currentRole === "admin";

  const [dataKontrak, setDataKontrak] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null); // null = modal tertutup

  useEffect(() => {
    getKontrak();
  }, []);

  async function getKontrak() {
    try {
      const { data, error } = await supabase
        .from("kontrak")
        .select("*")
        .order("id", { ascending: false });
      if (error) throw error;
      setDataKontrak(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id, fileUrl) => {
    const result = await Swal.fire({
      title: "Hapus kontrak?",
      text: "Data yang dihapus tidak dapat dikembalikan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    });

    if (!result.isConfirmed) return;

    try {
      // Hapus file dari Storage
      if (fileUrl) {
        const filePath = fileUrl.split("/storage/v1/object/public/kontrak/")[1];

        if (filePath) {
          await supabase.storage.from("kontrak").remove([filePath]);
        }
      }

      // Hapus data dari tabel
      const { error } = await supabase.from("kontrak").delete().eq("id", id);

      if (error) throw error;

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data kontrak berhasil dihapus",
      });

      getKontrak(); // sesuaikan dengan fungsi refresh data Anda
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err.message,
      });
    }
  };

  const filteredKontrak = globalFilter(dataKontrak, searchTerm);
  const colSpanEmpty = 9;

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
    return `${parseInt(d, 10)} ${bulan[parseInt(m, 10) - 1]} ${y}`;
  }

  const skemaBadgeStyle = (skema) => ({
    display: "inline-block",
    padding: "2px 9px",
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 600,
    whiteSpace: "nowrap",
    background: skema === "Penelitian" ? "#EAF4FF" : "#F0FFF4",
    color: skema === "Penelitian" ? "#1A5FA8" : "#166534",
  });

  if (loading) {
    return (
      <div style={{ padding: "24px", color: "#888", fontSize: 13 }}>
        Memuat data kontrak...
      </div>
    );
  }

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

      {/* ── Modal Edit (muncul saat editItem tidak null) ── */}
      {editItem && (
        <KontrakEdit
          kontrak={editItem}
          onClose={() => setEditItem(null)}
          onSaved={() => {
            setEditItem(null);
            getKontrak();
          }}
        />
      )}

      <div style={s.card}>
        <div style={s.cardHead}>
          <span style={s.cardTitle}>Kontrak</span>
          <span style={s.cntBadge}>{filteredKontrak.length} kontrak</span>
        </div>

        <div style={s.cardBody}>
          <div style={{ overflowX: "auto" }}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={{ ...s.th, width: 36 }}>No</th>
                  <th style={{ ...s.th, width: 130 }}>Nomor Kontrak</th>
                  <th style={{ ...s.th, width: 110 }}>Skema</th>
                  <th style={s.th}>Judul Skema</th>
                  <th style={{ ...s.th, width: 150 }}>Pihak Kedua</th>
                  <th style={{ ...s.th, width: 110 }}>Tgl. Kontrak</th>
                  <th style={{ ...s.th, width: 110 }}>Tgl. Berakhir</th>
                  <th style={{ ...s.th, width: 95 }}>File PDF</th>
                  <th style={{ ...s.th, width: 140 }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredKontrak.length === 0 ? (
                  <tr>
                    <td colSpan={colSpanEmpty} style={s.empty}>
                      Tidak ada data ditemukan
                    </td>
                  </tr>
                ) : (
                  filteredKontrak.map((item, index) => (
                    <tr key={item.id} className="tbl-row">
                      <td style={{ ...s.td, color: "#888", fontSize: 12 }}>
                        {index + 1}
                      </td>
                      <td style={s.td}>
                        <span style={s.nomorBadge}>{item.nomor_kontrak}</span>
                      </td>
                      <td style={s.td}>
                        <span style={skemaBadgeStyle(item.skema)}>
                          {item.skema}
                        </span>
                      </td>
                      <td style={{ ...s.td, fontSize: 12.5 }}>
                        {item.judul_skema}
                      </td>
                      <td style={{ ...s.td, fontWeight: 600, fontSize: 12.5 }}>
                        {item.pihak_kedua}
                      </td>
                      <td style={{ ...s.td, color: "#888", fontSize: 12 }}>
                        {formatTanggal(item.tanggal_kontrak)}
                      </td>
                      <td style={{ ...s.td, color: "#888", fontSize: 12 }}>
                        {formatTanggal(item.tanggal_berakhir)}
                      </td>
                      <td style={s.td}>
                        <button
                          className="btn-pdf"
                          onClick={() => window.open(item.file_url, "_blank")}
                        >
                          Lihat PDF
                        </button>
                      </td>
                      <td style={s.td}>
                        {/* Edit: tampil untuk semua role */}
                        <button
                          className="btn-edit"
                          onClick={() => setEditItem(item)}
                        >
                          Edit
                        </button>
                        {/* Hapus: hanya admin */}
                        {isAdmin && (
                          <button
                            className="btn-delete"
                            onClick={() => handleDelete(item.id, item.file_url)}
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
              Menampilkan {filteredKontrak.length} dari {dataKontrak.length}{" "}
              kontrak
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

export default Kontrak;
