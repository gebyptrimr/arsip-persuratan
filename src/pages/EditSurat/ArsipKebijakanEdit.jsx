import { useState } from "react";
import { supabase } from "../../lib/supabase";
import Swal from "sweetalert2";

function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ fontSize: 12.5, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function ArsipKebijakanEdit({ arsip, onClose, onSaved }) {
  const [form, setForm] = useState({
    nomorBerkas: arsip.nomor_berkas || "",
    tahun: arsip.tahun || "",
    uraianInformasi: arsip.uraian_informasi || "",
    kurunWaktu: arsip.kurun_waktu || "",
    kondisiFisik: arsip.kondisi_fisik || "Baik",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.nomorBerkas || !form.tahun) {
      setError("Nomor Berkas dan Tahun wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      const updatePayload = {
        nomor_berkas: form.nomorBerkas,
        tahun: form.tahun,
        uraian_informasi: form.uraianInformasi,
        kurun_waktu: form.kurunWaktu,
        kondisi_fisik: form.kondisiFisik,
      };

      if (file) {
        const path = arsip.jenis + "/" + form.tahun + "/" + Date.now() + "_" + file.name;
        const uploadRes = await supabase.storage.from("arsip-kebijakan").upload(path, file);
        if (uploadRes.error) throw uploadRes.error;

        const urlRes = supabase.storage.from("arsip-kebijakan").getPublicUrl(path);
        const fileUrl = urlRes.data.publicUrl;

        updatePayload.file_url = fileUrl;
        updatePayload.file_name = file.name;
        updatePayload.qr_value = fileUrl;
      }

      const { error: updateError } = await supabase
        .from("arsip_kebijakan")
        .update(updatePayload)
        .eq("id", arsip.id);

      if (updateError) throw updateError;

      await Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data arsip berhasil diperbarui",
      });

      onSaved();
    } catch (err) {
      setError(err.message || "Gagal memperbarui arsip.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.overlay}>
      <div style={s.card}>
        <div style={s.cardHead}>
          <div style={s.cardTitle}>Edit Arsip — {arsip.jenis_arsip || arsip.nomor_berkas}</div>
          <button type="button" onClick={onClose} style={s.closeBtn}>
            ×
          </button>
        </div>

        <div style={s.cardBody}>
          <form onSubmit={handleSubmit}>
            <Field label="Nomor Berkas">
              <input name="nomorBerkas" value={form.nomorBerkas} onChange={handleChange} style={s.input} />
            </Field>

            <Field label="Tahun">
              <input name="tahun" value={form.tahun} onChange={handleChange} style={s.input} />
            </Field>

            <Field label="Uraian Informasi">
              <textarea
                name="uraianInformasi"
                value={form.uraianInformasi}
                onChange={handleChange}
                style={{ ...s.input, minHeight: 80, resize: "vertical" }}
              />
            </Field>

            <Field label="Kurun Waktu">
              <input name="kurunWaktu" value={form.kurunWaktu} onChange={handleChange} style={s.input} />
            </Field>

            <Field label="Kondisi Fisik">
              <select name="kondisiFisik" value={form.kondisiFisik} onChange={handleChange} style={s.input}>
                <option value="Baik">Baik</option>
                <option value="Rusak Ringan">Rusak Ringan</option>
                <option value="Rusak Berat">Rusak Berat</option>
              </select>
            </Field>

            <Field label="Ganti File PDF (opsional)">
              <input type="file" accept="application/pdf" onChange={handleFileChange} style={s.input} />
              {arsip.file_name && !file && (
                <div style={s.currentFile}>File saat ini: {arsip.file_name}</div>
              )}
            </Field>

            {error && <div style={s.errorText}>{error}</div>}

            <div style={s.actionBar}>
              <button type="button" onClick={onClose} style={s.btnSecondary}>
                Batal
              </button>
              <button type="submit" disabled={loading} style={s.btnPrimary}>
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const s = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    border: "0.5px solid #e0e0e0",
    overflow: "hidden",
    maxWidth: 560,
    width: "100%",
    maxHeight: "90vh",
    display: "flex",
    flexDirection: "column",
    fontFamily: "'DM Sans', sans-serif",
  },
  cardHead: {
    backgroundColor: "#1A3A5C",
    padding: "18px 26px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: { color: "#fff", fontSize: 15, fontWeight: 700 },
  closeBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: 22,
    lineHeight: 1,
    cursor: "pointer",
  },
  cardBody: { padding: "24px 26px", overflowY: "auto" },
  input: {
    width: "100%",
    padding: "9px 12px",
    borderRadius: 8,
    border: "1px solid #D1D5DB",
    fontSize: 13,
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
  currentFile: { fontSize: 11.5, color: "#6B7280", marginTop: 6 },
  errorText: { color: "#DC2626", fontSize: 13, marginTop: 10, marginBottom: 4 },
  actionBar: { display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 },
  btnSecondary: {
    padding: "10px 20px",
    borderRadius: 9,
    border: "1px solid #D1D5DB",
    background: "#fff",
    color: "#374151",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  btnPrimary: {
    padding: "10px 24px",
    borderRadius: 9,
    border: "none",
    background: "#1A3A5C",
    color: "#fff",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
  },
};

export default ArsipKebijakanEdit;