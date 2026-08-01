import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

const KODE_KLASIFIKASI = "03.02.01";
const JENIS = "renstra";
const JENIS_LABEL = "Renstra LPPM";

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

function SuccessModal({ message, onClose }) {
  return (
    <div style={s.modalOverlay}>
      <div style={s.modalCard}>
        <div style={s.modalIconWrap}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 6L9 17l-5-5"
              stroke="#22C55E"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div style={s.modalTitle}>Berhasil!</div>
        <div style={s.modalDesc}>{message}</div>
        <button style={s.modalBtn} onClick={onClose}>
          Oke
        </button>
      </div>
    </div>
  );
}

function RenstraTambah() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nomorBerkas: "",
    tahun: "",
    uraianInformasi: "",
    kurunWaktu: "",
    kondisiFisik: "Baik",
  });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

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
    if (!file) {
      setError("Silakan pilih file PDF terlebih dahulu.");
      return;
    }

    setLoading(true);
    try {
      const path = JENIS + "/" + form.tahun + "/" + Date.now() + "_" + file.name;
      const uploadRes = await supabase.storage.from("arsip-kebijakan").upload(path, file);
      if (uploadRes.error) throw uploadRes.error;

      const urlRes = supabase.storage.from("arsip-kebijakan").getPublicUrl(path);
      const fileUrl = urlRes.data.publicUrl;
      const qrValue = fileUrl;

      const insertRes = await supabase.from("arsip_kebijakan").insert({
        jenis: JENIS,
        kode_klasifikasi: KODE_KLASIFIKASI,
        nomor_berkas: form.nomorBerkas,
        tahun: form.tahun,
        jenis_arsip: JENIS_LABEL,
        uraian_informasi: form.uraianInformasi,
        kurun_waktu: form.kurunWaktu,
        kondisi_fisik: form.kondisiFisik,
        file_url: fileUrl,
        file_name: file.name,
        qr_value: qrValue,
      });
      if (insertRes.error) throw insertRes.error;

      setShowSuccess(true);
    } catch (err) {
      setError(err.message || "Gagal mengunggah arsip.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate("/klasifikasi/kebijakan");
  };

  return (
    <div style={s.wrap}>
      <div style={s.card}>
        <div style={s.cardHead}>
          <div style={s.cardTitle}>Tambah Arsip — {JENIS_LABEL}</div>
          <div style={s.cardSub}>Lengkapi data arsip di bawah ini</div>
        </div>

        <div style={s.cardBody}>
          <form onSubmit={handleSubmit}>
            <Field label="Kode Klasifikasi">
              <input value={KODE_KLASIFIKASI} disabled style={{ ...s.input, background: "#F3F4F6", color: "#6B7280" }} />
            </Field>

            <Field label="Jenis Arsip">
              <input value={JENIS_LABEL} disabled style={{ ...s.input, background: "#F3F4F6", color: "#6B7280" }} />
            </Field>

            <Field label="Nomor Berkas">
              <input name="nomorBerkas" value={form.nomorBerkas} onChange={handleChange} style={s.input} placeholder="Contoh: 001/RENSTRA/2026" />
            </Field>

            <Field label="Tahun">
              <input name="tahun" value={form.tahun} onChange={handleChange} style={s.input} placeholder="Contoh: 2026" />
            </Field>

            <Field label="Uraian Informasi">
              <textarea name="uraianInformasi" value={form.uraianInformasi} onChange={handleChange} style={{ ...s.input, minHeight: 80, resize: "vertical" }} />
            </Field>

            <Field label="Kurun Waktu">
              <input name="kurunWaktu" value={form.kurunWaktu} onChange={handleChange} style={s.input} placeholder="Contoh: 2023–2028" />
            </Field>

            <Field label="Kondisi Fisik">
              <select name="kondisiFisik" value={form.kondisiFisik} onChange={handleChange} style={s.input}>
                <option value="Baik">Baik</option>
                <option value="Rusak Ringan">Rusak Ringan</option>
                <option value="Rusak Berat">Rusak Berat</option>
              </select>
            </Field>

            <Field label="File Arsip (PDF)">
              <input type="file" accept="application/pdf" onChange={handleFileChange} style={s.input} />
            </Field>

            {error && <div style={s.errorText}>{error}</div>}

            <div style={s.actionBar}>
              <button type="button" onClick={() => navigate("/klasifikasi/kebijakan")} style={s.btnSecondary}>
                Batal
              </button>
              <button type="submit" disabled={loading} style={s.btnPrimary}>
                {loading ? "Mengunggah..." : "Unggah Arsip"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {showSuccess && (
        <SuccessModal message="Arsip berhasil disimpan." onClose={handleSuccessClose} />
      )}
    </div>
  );
}

const s = {
  wrap: { backgroundColor: "#F5F7FA", minHeight: "100vh", padding: 24, fontFamily: "'DM Sans', sans-serif" },
  card: { backgroundColor: "#fff", borderRadius: 14, border: "0.5px solid #e0e0e0", overflow: "hidden", maxWidth: 700, margin: "0 auto" },
  cardHead: { backgroundColor: "#1A3A5C", padding: "20px 26px" },
  cardTitle: { color: "#fff", fontSize: 16, fontWeight: 700 },
  cardSub: { color: "rgba(255,255,255,0.5)", fontSize: 12, marginTop: 3 },
  cardBody: { padding: "28px" },
  label: { fontSize: 12.5, fontWeight: 600, color: "#374151", display: "block", marginBottom: 8 },
  input: {
    width: "100%",
    padding: "9px 12px",
    borderRadius: 8,
    border: "1px solid #D1D5DB",
    fontSize: 13,
    fontFamily: "inherit",
    boxSizing: "border-box",
  },
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
  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(15, 23, 42, 0.45)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  modalCard: {
    background: "#fff",
    borderRadius: 16,
    padding: "40px 48px",
    width: 420,
    maxWidth: "90%",
    textAlign: "center",
    boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
  },
  modalIconWrap: {
    width: 72,
    height: 72,
    borderRadius: "50%",
    border: "2px solid #22C55E",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 20px",
  },
  modalTitle: { fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 8 },
  modalDesc: { fontSize: 14, color: "#6B7280", marginBottom: 24 },
  modalBtn: {
    padding: "10px 32px",
    borderRadius: 9,
    border: "none",
    background: "#1A3A5C",
    color: "#fff",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
  },
};

export default RenstraTambah;