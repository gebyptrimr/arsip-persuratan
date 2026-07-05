import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { supabase } from "../../lib/supabase";
import { useSearch } from "../../Contextt/SearchContext";
import { globalFilter } from "../../utils/filterData";
import SuratTugasEdit from "../EditSurat/SuratTugasEdit";

function formatTanggal(dateStr) {
  if (!dateStr) return "-";
  const bulan = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul","Ags","Sep","Okt","Nov","Des"];
  const [y, m, d] = dateStr.split("-");
  return `${parseInt(d)} ${bulan[parseInt(m) - 1]} ${y}`;
}

function SuratTugas() {
  const { searchTerm } = useSearch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => { fetchData(); }, []);

  async function fetchData() {
    setLoading(true);
    const { data, error } = await supabase
      .from("surat_tugas")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error(error.message);
    else setData(data || []);
    setLoading(false);
  }

  async function handleDelete(id, fileUrl) {
    const confirm = await Swal.fire({
      title: "Hapus Surat Tugas?",
      text: "Data dan file PDF akan dihapus permanen.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus",
      cancelButtonText: "Batal",
    });
    if (!confirm.isConfirmed) return;

    if (fileUrl) {
      const path = fileUrl.split("/surat-tugas/")[1];
      if (path) await supabase.storage.from("surat-tugas").remove([path]);
    }

    const { error } = await supabase.from("surat_tugas").delete().eq("id", id);
    if (error) {
      Swal.fire({ icon: "error", title: "Gagal!", text: error.message, confirmButtonColor: "#1A3A5C" });
    } else {
      setData((prev) => prev.filter((s) => s.id !== id));
      Swal.fire({ icon: "success", title: "Dihapus!", text: "Surat tugas berhasil dihapus.", confirmButtonColor: "#1A3A5C", timer: 1500, showConfirmButton: false });
    }
  }

  const filteredData = globalFilter(data, searchTerm);

  return (
    <div style={s.wrap}>
      <style>{`
        .btn-pdf { background: #4A9FD5 !important; color: #fff !important; border: none; border-radius: 5px; padding: 4px 10px; font-size: 11.5px; font-weight: 600; cursor: pointer; white-space: nowrap; }
        .btn-pdf:hover { background: #2280BE !important; }
        .btn-edit { background: #FFF3CD !important; color: #633806 !important; border: none; border-radius: 5px; padding: 4px 9px; font-size: 11.5px; font-weight: 600; cursor: pointer; margin-right: 5px; }
        .btn-edit:hover { background: #FAC775 !important; }
        .btn-delete { background: #FCEBEB !important; color: #791F1F !important; border: none; border-radius: 5px; padding: 4px 9px; font-size: 11.5px; font-weight: 600; cursor: pointer; }
        .btn-delete:hover { background: #F7C1C1 !important; }
        .tbl-row:hover { background: #F5F8FC; }
      `}</style>

      {/* Modal Edit */}
      {editItem && (
        <SuratTugasEdit
          suratTugas={editItem}
          onClose={() => setEditItem(null)}
          onSaved={() => {
            setEditItem(null);
            fetchData();
          }}
        />
      )}

      <div style={s.card}>
        <div style={s.cardHead}>
          <span style={s.cardTitle}>Surat Tugas</span>
          <span style={s.cntBadge}>{filteredData.length} Surat Tugas</span>
        </div>

        <div style={s.cardBody}>
          {loading ? (
            <p style={{ color: "#94a3b8", textAlign: "center", padding: "40px 0" }}>Memuat data...</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={s.table}>
                <thead>
                  <tr>
                    <th style={{ ...s.th, width: 36 }}>No</th>
                    <th style={{ ...s.th, width: 130 }}>Nomor ST</th>
                    <th style={{ ...s.th, width: 105 }}>Tgl. Surat</th>
                    <th style={{ ...s.th, width: 140 }}>Penerima Tugas</th>
                    <th style={s.th}>Tujuan Tugas</th>
                    <th style={{ ...s.th, width: 105 }}>Tgl. Mulai</th>
                    <th style={{ ...s.th, width: 105 }}>Tgl. Selesai</th>
                    <th style={{ ...s.th, width: 95 }}>File PDF</th>
                    <th style={{ ...s.th, width: 140 }}>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr><td colSpan={9} style={s.empty}>Tidak ada data ditemukan</td></tr>
                  ) : (
                    filteredData.map((item, index) => (
                      <tr key={item.id} className="tbl-row">
                        <td style={{ ...s.td, color: "#888", fontSize: 12 }}>{index + 1}</td>
                        <td style={s.td}><span style={s.nomorBadge}>{item.nomor_st}</span></td>
                        <td style={{ ...s.td, color: "#888", fontSize: 12 }}>{formatTanggal(item.tanggal_surat)}</td>
                        <td style={{ ...s.td, fontWeight: 600, fontSize: 12.5 }}>{item.penerima_tugas}</td>
                        <td style={{ ...s.td, fontSize: 12.5 }}>{item.tujuan_tugas}</td>
                        <td style={{ ...s.td, color: "#888", fontSize: 12 }}>{formatTanggal(item.tanggal_mulai)}</td>
                        <td style={{ ...s.td, color: "#888", fontSize: 12 }}>{formatTanggal(item.tanggal_selesai)}</td>
                        <td style={s.td}>
                          {item.file_url
                            ? <button className="btn-pdf" onClick={() => window.open(item.file_url, "_blank")}>Lihat PDF</button>
                            : <span style={{ color: "#ccc", fontSize: 12 }}>-</span>}
                        </td>
                        <td style={s.td}>
                          <button className="btn-edit" onClick={() => setEditItem(item)}>Edit</button>
                          <button className="btn-delete" onClick={() => handleDelete(item.id, item.file_url)}>Hapus</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
          <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
            <span style={{ fontSize: 11.5, color: "#888" }}>Menampilkan {filteredData.length} dari {data.length} surat tugas</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const s = {
  wrap: { padding: "24px", fontFamily: "'DM Sans', sans-serif" },
  card: { backgroundColor: "#fff", borderRadius: 14, border: "0.5px solid #e0e0e0", overflow: "hidden" },
  cardHead: { backgroundColor: "#1A3A5C", padding: "16px 22px", display: "flex", alignItems: "center", gap: 10 },
  cardTitle: { color: "#fff", fontSize: 15, fontWeight: 600 },
  cntBadge: { background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 20 },
  cardBody: { padding: "18px 22px" },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 12.5 },
  th: { padding: "9px 12px", fontSize: 10.5, fontWeight: 600, color: "#1A3A5C", textTransform: "uppercase", letterSpacing: 0.5, borderBottom: "1.5px solid rgba(26,58,92,0.1)", textAlign: "left", whiteSpace: "nowrap" },
  td: { padding: "12px 12px", borderBottom: "0.5px solid #f0f0f0", verticalAlign: "middle", color: "#1A1A1A" },
  nomorBadge: { background: "#E6F1FB", color: "#0C447C", fontSize: 11.5, fontWeight: 600, padding: "2px 9px", borderRadius: 20, display: "inline-block", whiteSpace: "nowrap" },
  empty: { textAlign: "center", padding: 36, color: "#888", fontSize: 13 },
};

export default SuratTugas;