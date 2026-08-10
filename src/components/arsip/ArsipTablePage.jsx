import { useSearch } from "../../Contextt/SearchContext";
import { globalFilter } from "../../utils/filterData";
import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";
import Swal from "sweetalert2";
import QRCode from "qrcode";
import { ARSIP_CONFIG } from "../../config/arsipConfig";

function EditModal({ item, config, onClose, onSaved }) {
  const [form, setForm] = useState({
    tahun: item.tahun?.toString() || "",
    uraianInformasi: item.uraian_informasi || "",
    kurunWaktu: item.kurun_waktu || "",
    kondisiFisik: item.kondisi_fisik || "Baik",
  });
  const [metadataValues, setMetadataValues] = useState(
    Object.fromEntries((config.metadataFields || []).map((f) => [f.key, item.metadata?.[f.key] || ""]))
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMetadataChange = (key, value) => {
    setMetadataValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setError("");
    if (!form.tahun) { setError("Tahun wajib diisi."); return; }
    for (const f of config.metadataFields || []) {
      if (f.required && !metadataValues[f.key]) {
        setError(`${f.label} wajib diisi.`);
        return;
      }
    }

    setSaving(true);
    try {
      const { error: updateError } = await supabase
        .from("arsip")
        .update({
          tahun: parseInt(form.tahun, 10),
          uraian_informasi: form.uraianInformasi,
          kurun_waktu: form.kurunWaktu,
          kondisi_fisik: form.kondisiFisik,
          metadata: { ...item.metadata, ...metadataValues },
        })
        .eq("id", item.id);

      if (updateError) throw updateError;
      await Swal.fire({ icon: "success", title: "Berhasil", text: "Data arsip berhasil diperbarui" });
      onSaved();
    } catch (err) {
      setError(err.message || "Gagal menyimpan perubahan.");
    } finally {
      setSaving(false);
    }
  };

  const renderMetadataInput = (f) => {
    const value = metadataValues[f.key] || "";
    const onChange = (e) => handleMetadataChange(f.key, e.target.value);
    if (f.type === "textarea") {
      return <textarea value={value} onChange={onChange} style={{ ...m.input, minHeight: 70, resize: "vertical" }} placeholder={f.placeholder} />;
    }
    if (f.type === "select") {
      return (
        <select value={value} onChange={onChange} style={m.input}>
          <option value="">Pilih...</option>
          {(f.options || []).map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      );
    }
    return <input type={f.type === "number" ? "number" : "text"} value={value} onChange={onChange} style={m.input} placeholder={f.placeholder} />;
  };

  return (
    <div style={m.overlay}>
      <div style={m.card}>
        <div style={m.head}>
          <span style={m.headTitle}>Edit Arsip</span>
          <span style={m.nomorBadge}>{item.nomor_berkas}</span>
        </div>
        <div style={m.body}>
          <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: -4, marginBottom: 16 }}>
            Nomor berkas tidak dapat diubah di sini. Jika nomor salah, hapus data ini lalu unggah ulang.
          </div>

          <div style={m.field}>
            <label style={m.label}>Tahun *</label>
            <input name="tahun" value={form.tahun} onChange={handleChange} style={m.input} />
          </div>
          <div style={m.field}>
            <label style={m.label}>Uraian Informasi</label>
            <textarea name="uraianInformasi" value={form.uraianInformasi} onChange={handleChange} style={{ ...m.input, minHeight: 80, resize: "vertical" }} />
          </div>
          <div style={m.field}>
            <label style={m.label}>Kurun Waktu</label>
            <input name="kurunWaktu" value={form.kurunWaktu} onChange={handleChange} style={m.input} placeholder="Contoh: 2023–2028" />
          </div>
          <div style={m.field}>
            <label style={m.label}>Kondisi Fisik</label>
            <select name="kondisiFisik" value={form.kondisiFisik} onChange={handleChange} style={m.input}>
              <option value="Baik">Baik</option>
              <option value="Rusak Ringan">Rusak Ringan</option>
              <option value="Rusak Berat">Rusak Berat</option>
            </select>
          </div>

          {(config.metadataFields || []).map((f) => (
            <div key={f.key} style={m.field}>
              <label style={m.label}>{f.required ? `${f.label} *` : f.label}</label>
              {renderMetadataInput(f)}
            </div>
          ))}

          {error && <div style={m.error}>{error}</div>}

          <div style={m.actions}>
            <button type="button" onClick={onClose} style={m.btnSecondary} disabled={saving}>Batal</button>
            <button type="button" onClick={handleSave} style={m.btnPrimary} disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ArsipTablePage({ configKey }) {
  const config = ARSIP_CONFIG[configKey];
  const { searchTerm } = useSearch();
  const [dataArsip, setDataArsip] = useState([]);
  const [loading, setLoading] = useState(true);
  const [klasifikasiId, setKlasifikasiId] = useState(null);
  const [editItem, setEditItem] = useState(null);

  useEffect(() => {
    fetchKlasifikasiAndArsip();
  }, [configKey]);

  async function fetchKlasifikasiAndArsip() {
    const { data: klas } = await supabase
      .from("klasifikasi_arsip").select("id").eq("kode", config.kode).single();
    if (!klas) { setLoading(false); return; }
    setKlasifikasiId(klas.id);
    await getArsip(klas.id);
  }

  async function getArsip(kid) {
    try {
      const { data, error } = await supabase
        .from("arsip")
        .select("*")
        .eq("klasifikasi_id", kid)
        .eq("metadata->>jenis", config.jenis)
        .order("created_at", { ascending: false });
      if (error) throw error;
      setDataArsip(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id, fileUrl) => {
    const result = await Swal.fire({
      title: "Hapus arsip?", text: "Data yang dihapus tidak dapat dikembalikan.",
      icon: "warning", showCancelButton: true,
      confirmButtonColor: "#d33", cancelButtonColor: "#6b7280",
      confirmButtonText: "Ya, Hapus", cancelButtonText: "Batal",
    });
    if (!result.isConfirmed) return;

    try {
      if (fileUrl) {
        const path = fileUrl.split("/arsip/")[1];
        if (path) await supabase.storage.from("arsip").remove([path]);
      }
      const { error } = await supabase.from("arsip").delete().eq("id", id);
      if (error) throw error;
      await Swal.fire({ icon: "success", title: "Berhasil", text: "Data arsip berhasil dihapus" });
      getArsip(klasifikasiId);
    } catch (err) {
      Swal.fire({ icon: "error", title: "Gagal", text: err.message });
    }
  };

  const downloadQR = async (item) => {
    try {
      const qrData = await QRCode.toDataURL(item.qr_value || item.file_url, { width: 300, margin: 2, errorCorrectionLevel: "H" });
      const link = document.createElement("a");
      link.href = qrData;
      link.download = `QR-${(item.nomor_berkas || "arsip").replace(/[\/\\:*?"<>|]/g, "-")}.png`;
      link.click();
    } catch (err) {
      Swal.fire({ icon: "error", title: "Gagal", text: "QR Code gagal dibuat." });
    }
  };

  const kondisiBadgeStyle = (kondisi) => {
    const map = { "Baik": ["#F0FFF4", "#166534"], "Rusak Ringan": ["#FFF7E6", "#8A5A00"], "Rusak Berat": ["#FCEBEB", "#791F1F"] };
    const [bg, color] = map[kondisi] || map["Baik"];
    return { display: "inline-block", padding: "2px 9px", borderRadius: 20, fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", background: bg, color };
  };

  if (!config) {
    return <div style={{ padding: 24, color: "#DC2626" }}>Config "{configKey}" tidak ditemukan di arsipConfig.js</div>;
  }

  const filteredArsip = globalFilter(dataArsip, searchTerm);

  if (loading) return <div style={{ padding: "24px", color: "#888", fontSize: 13 }}>Memuat data arsip...</div>;

  return (
    <div style={s.wrap}>
      <style>{`
        .btn-pdf { background: #4A9FD5 !important; color: #fff !important; border: none; border-radius: 5px; padding: 4px 10px; font-size: 11.5px; font-weight: 600; cursor: pointer; }
        .btn-pdf:hover { background: #2280BE !important; }
        .btn-qr { background: #22C55E !important; color: #fff !important; border: none; border-radius: 5px; padding: 4px 10px; font-size: 11.5px; font-weight: 600; cursor: pointer; }
        .btn-qr:hover { background: #16A34A !important; }
        .btn-edit { background: #FFF3CD !important; color: #633806 !important; border: none; border-radius: 5px; padding: 4px 9px; font-size: 11.5px; font-weight: 600; cursor: pointer; margin-right: 5px; }
        .btn-edit:hover { background: #FAC775 !important; }
        .btn-delete { background: #FCEBEB !important; color: #791F1F !important; border: none; border-radius: 5px; padding: 4px 9px; font-size: 11.5px; font-weight: 600; cursor: pointer; }
        .btn-delete:hover { background: #F7C1C1 !important; }
        .tbl-row:hover { background: #F5F8FC; }
      `}</style>

      <div style={s.card}>
        <div style={s.cardHead}>
          <span style={s.cardTitle}>{config.jenisLabel}</span>
          <span style={s.cntBadge}>{filteredArsip.length} arsip</span>
        </div>
        <div style={s.cardBody}>
          <div style={{ overflowX: "auto" }}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={{ ...s.th, width: 36 }}>No</th>
                  <th style={{ ...s.th, width: 160 }}>Nomor Berkas</th>
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
                  <tr><td colSpan={9} style={s.empty}>Tidak ada data ditemukan</td></tr>
                ) : (
                  filteredArsip.map((item, index) => (
                    <tr key={item.id} className="tbl-row">
                      <td style={{ ...s.td, color: "#888", fontSize: 12 }}>{index + 1}</td>
                      <td style={s.td}><span style={s.nomorBadge}>{item.nomor_berkas}</span></td>
                      <td style={{ ...s.td, color: "#888", fontSize: 12 }}>{item.tahun}</td>
                      <td style={{ ...s.td, fontSize: 12.5 }}>{item.uraian_informasi || "-"}</td>
                      <td style={{ ...s.td, fontSize: 12.5 }}>{item.kurun_waktu || "-"}</td>
                      <td style={s.td}>
                        {item.kondisi_fisik
                          ? <span style={kondisiBadgeStyle(item.kondisi_fisik)}>{item.kondisi_fisik}</span>
                          : "-"}
                      </td>
                      <td style={s.td}>
                        {item.file_url
                          ? <button className="btn-pdf" onClick={() => window.open(item.file_url, "_blank")}>Lihat PDF</button>
                          : "-"}
                      </td>
                      <td style={s.td}>
                        <button className="btn-qr" onClick={() => downloadQR(item)}>Unduh QR</button>
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
          <div style={{ marginTop: 16, display: "flex", justifyContent: "flex-end" }}>
            <span style={{ fontSize: 11.5, color: "#888" }}>Menampilkan {filteredArsip.length} dari {dataArsip.length} arsip</span>
          </div>
        </div>
      </div>

      {editItem && (
        <EditModal
          item={editItem}
          config={config}
          onClose={() => setEditItem(null)}
          onSaved={() => { setEditItem(null); getArsip(klasifikasiId); }}
        />
      )}
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

const m = {
  overlay: { position: "fixed", inset: 0, background: "rgba(15,23,42,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 },
  card: { background: "#fff", borderRadius: 14, width: 480, maxWidth: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 50px rgba(0,0,0,0.2)" },
  head: { backgroundColor: "#1A3A5C", padding: "16px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, position: "sticky", top: 0 },
  headTitle: { color: "#fff", fontSize: 15, fontWeight: 600 },
  nomorBadge: { background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 11, fontWeight: 600, padding: "2px 10px", borderRadius: 20, whiteSpace: "nowrap" },
  body: { padding: "22px" },
  field: { marginBottom: 16 },
  label: { fontSize: 12.5, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 },
  input: { width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box" },
  error: { color: "#DC2626", fontSize: 13, marginTop: 4, marginBottom: 8 },
  actions: { display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 8 },
  btnSecondary: { padding: "10px 20px", borderRadius: 9, border: "1px solid #D1D5DB", background: "#fff", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer" },
  btnPrimary: { padding: "10px 24px", borderRadius: 9, border: "none", background: "#1A3A5C", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" },
};