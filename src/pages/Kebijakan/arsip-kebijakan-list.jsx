import { useSearch } from "../../Contextt/SearchContext";
import { globalFilter } from "../../utils/filterData";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import ArsipKebijakanEdit from "../EditSurat/ArsipKebijakanEdit";
import Swal from "sweetalert2";
import QRCode from "qrcode";

/**
 * Komponen daftar arsip kebijakan yang dipakai bersama oleh
 * Renstra LPPM, Roadmap, dan jenis arsip sejenis lainnya.
 * Mengikuti pola & gaya file Kontrak.jsx.
 *
 * Props:
 * - jenis: kode jenis arsip di DB (mis. "renstra", "roadmap")
 * - jenisLabel: label yang ditampilkan sebagai judul card
 */
function ArsipKebijakanList({ jenis, jenisLabel }) {
  const { searchTerm } = useSearch();
  const currentRole = "admin";
  const isAdmin = currentRole === "admin";

  const [dataArsip, setDataArsip] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    getArsip();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jenis]);

  async function getArsip() {
    try {
      const { data, error } = await supabase
        .from("arsip_kebijakan")
        .select("*")
        .eq("jenis", jenis)
        .order("id", { ascending: false });

      if (error) throw error;

      setDataArsip(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id, fileUrl) => {
    const result = await Swal.fire({
      title: "Hapus arsip?",
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
      if (fileUrl) {
        const filePath = fileUrl.split("/storage/v1/object/public/arsip-kebijakan/")[1];

        if (filePath) {
          await supabase.storage.from("arsip-kebijakan").remove([filePath]);
        }
      }

      const { error } = await supabase.from("arsip_kebijakan").delete().eq("id", id);

      if (error) throw error;

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data arsip berhasil dihapus",
      });

      getArsip();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: err.message,
      });
    }
  };

  // =========================
  // DOWNLOAD QR
  // =========================
  const downloadQR = async (item) => {
    try {
      const qrData = await QRCode.toDataURL(item.qr_value || item.file_url, {
        width: 300,
        margin: 2,
        errorCorrectionLevel: "H",
      });

      const link = document.createElement("a");
      link.href = qrData;

      const fileName = (item.nomor_berkas || "arsip").replace(/[\/\\:*?"<>|]/g, "-");

      link.download = `QR-${fileName}.png`;
      link.click();
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "QR Code gagal dibuat.",
      });
    }
  };

  const filteredArsip = globalFilter(dataArsip, searchTerm);

  const colSpanEmpty = 9;

  const kondisiBadgeStyle = (kondisi) => {
    let bg = "#F0FFF4";
    let color = "#166534";
    if (kondisi === "Rusak Ringan") {
      bg = "#FFF7E6";
      color = "#8A5A00";
    } else if (kondisi === "Rusak Berat") {
      bg = "#FCEBEB";
      color = "#791F1F";
    }
    return {
      display: "inline-block",
      padding: "2px 9px",
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 600,
      whiteSpace: "nowrap",
      background: bg,
      color: color,
    };
  };

  if (loading) {
    return (
      <div
        style={{
          padding: "24px",
          color: "#888",
          fontSize: 13,
        }}
      >
        Memuat data arsip...
      </div>
    );
  }

  return (
    <div style={s.wrap}>
      <style>{`
      .btn-pdf {
        background: #4A9FD5 !important;
        color: #fff !important;
        border: none;
        border-radius: 5px;
        padding: 4px 10px;
        font-size: 11.5px;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;
      }

      .btn-pdf:hover {
        background: #2280BE !important;
      }

      .btn-pdf:active,
      .btn-pdf:focus {
        background: #4A9FD5 !important;
        outline: none;
      }

      /* ======== BUTTON QR ======== */
      .btn-qr {
        background: #22C55E !important;
        color: #fff !important;
        border: none;
        border-radius: 5px;
        padding: 4px 10px;
        font-size: 11.5px;
        font-weight: 600;
        cursor: pointer;
        white-space: nowrap;
      }

      .btn-qr:hover {
        background: #16A34A !important;
      }

      .btn-qr:active,
      .btn-qr:focus {
        background: #22C55E !important;
        outline: none;
      }

      .btn-edit {
        background: #FFF3CD !important;
        color: #633806 !important;
        border: none;
        border-radius: 5px;
        padding: 4px 9px;
        font-size: 11.5px;
        font-weight: 600;
        cursor: pointer;
        margin-right: 5px;
      }

      .btn-edit:hover {
        background: #FAC775 !important;
      }

      .btn-edit:active,
      .btn-edit:focus {
        background: #FFF3CD !important;
        outline: none;
      }

      .btn-delete {
        background: #FCEBEB !important;
        color: #791F1F !important;
        border: none;
        border-radius: 5px;
        padding: 4px 9px;
        font-size: 11.5px;
        font-weight: 600;
        cursor: pointer;
      }

      .btn-delete:hover {
        background: #F7C1C1 !important;
      }

      .btn-delete:active,
      .btn-delete:focus {
        background: #FCEBEB !important;
        outline: none;
      }

      .tbl-row:hover {
        background: #F5F8FC;
      }
    `}</style>

      {editItem && (
        <ArsipKebijakanEdit
          arsip={editItem}
          onClose={() => setEditItem(null)}
          onSaved={() => {
            setEditItem(null);
            getArsip();
          }}
        />
      )}

      <div style={s.card}>
        <div style={s.cardHead}>
          <span style={s.cardTitle}>{jenisLabel}</span>
          <span style={s.cntBadge}>{filteredArsip.length} arsip</span>
        </div>

        <div style={s.cardBody}>
          <div style={{ overflowX: "auto" }}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={{ ...s.th, width: 36 }}>No</th>
                  <th style={{ ...s.th, width: 150 }}>Nomor Berkas</th>
                  <th style={{ ...s.th, width: 80 }}>Tahun</th>
                  <th style={s.th}>Uraian Informasi</th>
                  <th style={{ ...s.th, width: 120 }}>Kurun Waktu</th>
                  <th style={{ ...s.th, width: 120 }}>Kondisi Fisik</th>
                  <th style={{ ...s.th, width: 95 }}>File PDF</th>
                  <th style={{ ...s.th, width: 95 }}>QR</th>
                  <th style={{ ...s.th, width: 140 }}>Aksi</th>
                </tr>
              </thead>

              <tbody>
                {filteredArsip.length === 0 ? (
                  <tr>
                    <td colSpan={colSpanEmpty} style={s.empty}>
                      Tidak ada data ditemukan
                    </td>
                  </tr>
                ) : (
                  filteredArsip.map((item, index) => (
                    <tr key={item.id} className="tbl-row">
                      <td style={{ ...s.td, color: "#888", fontSize: 12 }}>
                        {index + 1}
                      </td>

                      <td style={s.td}>
                        <span style={s.nomorBadge}>{item.nomor_berkas}</span>
                      </td>

                      <td style={{ ...s.td, color: "#888", fontSize: 12 }}>
                        {item.tahun}
                      </td>

                      <td style={{ ...s.td, fontSize: 12.5 }}>
                        {item.uraian_informasi || "-"}
                      </td>

                      <td style={{ ...s.td, fontSize: 12.5 }}>
                        {item.kurun_waktu || "-"}
                      </td>

                      <td style={s.td}>
                        {item.kondisi_fisik ? (
                          <span style={kondisiBadgeStyle(item.kondisi_fisik)}>
                            {item.kondisi_fisik}
                          </span>
                        ) : (
                          "-"
                        )}
                      </td>

                      {/* FILE PDF */}
                      <td style={s.td}>
                        <button
                          className="btn-pdf"
                          onClick={() => window.open(item.file_url, "_blank")}
                        >
                          Lihat PDF
                        </button>
                      </td>

                      {/* QR */}
                      <td style={s.td}>
                        <button
                          className="btn-qr"
                          onClick={() => downloadQR(item)}
                        >
                          Unduh QR
                        </button>
                      </td>

                      {/* AKSI */}
                      <td style={s.td}>
                        <button
                          className="btn-edit"
                          onClick={() => setEditItem(item)}
                        >
                          Edit
                        </button>

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
            <span
              style={{
                fontSize: 11.5,
                color: "#888",
              }}
            >
              Menampilkan {filteredArsip.length} dari {dataArsip.length} arsip
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
    fontFamily: "'DM Sans', sans-serif",
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

  cardBody: {
    padding: "18px 22px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    fontSize: 12.5,
  },

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

  empty: {
    textAlign: "center",
    padding: 36,
    color: "#888",
    fontSize: 13,
  },
};

export default ArsipKebijakanList;