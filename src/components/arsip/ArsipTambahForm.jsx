import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { ARSIP_CONFIG } from "../../config/arsipConfig";

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

function SuccessModal({ nomorBerkas, onClose }) {
  return (
    <div style={s.modalOverlay}>
      <div style={s.modalCard}>
        <div style={s.modalIconWrap}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17l-5-5" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div style={s.modalTitle}>Berhasil!</div>
        <div style={s.modalDesc}>
          Arsip berhasil disimpan.{nomorBerkas && <><br/><strong>{nomorBerkas}</strong></>}
        </div>
        <button style={s.modalBtn} onClick={onClose}>Oke</button>
      </div>
    </div>
  );
}

export default function ArsipTambahForm({ configKey }) {
  const navigate = useNavigate();
  const config = ARSIP_CONFIG[configKey];

  if (!config) {
    return <div style={{ padding: 24, color: "#DC2626" }}>Config "{configKey}" tidak ditemukan di arsipConfig.js</div>;
  }

  const { kode, jenis, jenisLabel, hasSubJenis, metadataFields, redirectRoute } = config;

  const [form, setForm] = useState({
    tahun: new Date().getFullYear().toString(),
    uraianInformasi: "",
    kurunWaktu: "",
    kondisiFisik: "Baik",
  });
  const [metadataValues, setMetadataValues] = useState(
    Object.fromEntries(metadataFields.map((f) => [f.key, ""]))
  );
  const [subJenisList, setSubJenisList] = useState([]);
  const [subJenisId, setSubJenisId] = useState("");
  const [file, setFile] = useState(null);
  const [isArsipLama, setIsArsipLama] = useState(false);
  const [nomorUrut, setNomorUrut] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingDuplicate, setCheckingDuplicate] = useState(false);
  const [error, setError] = useState("");
  const [nomorBerkas, setNomorBerkas] = useState(null);

  // Info duplikat: kalau ada, artinya nomor yang diketik user sudah dipakai arsip lain
  const [duplicateInfo, setDuplicateInfo] = useState(null); // { nomorBerkas }
  const [confirmedDuplicate, setConfirmedDuplicate] = useState(false);

  // Ambil daftar sub-jenis kalau kode ini butuh
  useEffect(() => {
    if (!hasSubJenis) return;
    (async () => {
      const { data: klas } = await supabase.from("klasifikasi_arsip").select("id").eq("kode", kode).single();
      if (!klas) return;
      const { data } = await supabase
        .from("klasifikasi_sub_jenis")
        .select("id, nama_sub_jenis")
        .eq("klasifikasi_id", klas.id)
        .order("urutan");
      setSubJenisList(data || []);
    })();
  }, [hasSubJenis, kode]);

  // Reset status konfirmasi duplikat kalau input yang relevan berubah,
  // supaya gak ke-skip tanpa sadar pas user ganti nomor/tahun/sub-jenis.
  useEffect(() => {
    setDuplicateInfo(null);
    setConfirmedDuplicate(false);
  }, [nomorUrut, form.tahun, subJenisId, isArsipLama]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleMetadataChange = (key, value) => {
    setMetadataValues((prev) => ({ ...prev, [key]: value }));
  };

  // Cek ke database apakah kombinasi klasifikasi + sub_jenis + nomor_urut + tahun
  // sudah pernah dipakai arsip lain. Return data arsip yang bentrok kalau ada, null kalau aman.
  const cekDuplikatNomor = async (klasifikasiId) => {
    let query = supabase
      .from("arsip")
      .select("id, nomor_berkas")
      .eq("klasifikasi_id", klasifikasiId)
      .eq("tahun", parseInt(form.tahun, 10))
      .eq("nomor_urut", parseInt(nomorUrut, 10));

    if (hasSubJenis) {
      query = query.eq("sub_jenis_id", subJenisId || null);
    }

    const { data, error: cekError } = await query.maybeSingle();
    if (cekError && cekError.code !== "PGRST116") throw cekError;
    return data || null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.tahun) { setError("Tahun wajib diisi."); return; }
    if (!file) { setError("Silakan pilih file PDF terlebih dahulu."); return; }
    if (hasSubJenis && !subJenisId) { setError("Silakan pilih sub-jenis dokumen."); return; }
    if (isArsipLama) {
      const n = parseInt(nomorUrut, 10);
      if (!nomorUrut || isNaN(n) || n <= 0) {
        setError("Nomor urut wajib diisi dengan angka positif untuk arsip lama.");
        return;
      }
    }
    for (const f of metadataFields) {
      if (f.required && !metadataValues[f.key]) {
        setError(`${f.label} wajib diisi.`);
        return;
      }
    }

    setLoading(true);
    try {
      const { data: klas, error: klasError } = await supabase
        .from("klasifikasi_arsip").select("id").eq("kode", kode).single();
      if (klasError) throw klasError;

      // Khusus mode Arsip Lama: cek dulu apakah nomor ini sudah dipakai,
      // sebelum lanjut upload file. Kalau user belum konfirmasi, berhenti
      // di sini dan tampilkan peringatan (tidak upload file dulu).
      if (isArsipLama && !confirmedDuplicate) {
        setCheckingDuplicate(true);
        const existing = await cekDuplikatNomor(klas.id);
        setCheckingDuplicate(false);

        if (existing) {
          setDuplicateInfo({ nomorBerkas: existing.nomor_berkas });
          setLoading(false);
          return;
        }
      }

      const path = `${jenis}/${form.tahun}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage.from("arsip").upload(path, file);
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from("arsip").getPublicUrl(path);
      const fileUrl = urlData.publicUrl;

      const { data: inserted, error: insertError } = await supabase
        .from("arsip")
        .insert({
          klasifikasi_id: klas.id,
          sub_jenis_id: hasSubJenis ? subJenisId : null,
          tahun: parseInt(form.tahun),
          uraian_informasi: form.uraianInformasi,
          kurun_waktu: form.kurunWaktu,
          kondisi_fisik: form.kondisiFisik,
          file_url: fileUrl,
          qr_value: fileUrl,
          sumber_input: isArsipLama ? "arsip_lama" : "sistem",
          nomor_urut: isArsipLama ? parseInt(nomorUrut, 10) : null,
          metadata: { jenis, jenis_label: jenisLabel, ...metadataValues },
        })
        .select("nomor_berkas")
        .single();

      if (insertError) throw insertError;
      setNomorBerkas(inserted.nomor_berkas);
    } catch (err) {
      setError(err.message || "Gagal mengunggah arsip.");
    } finally {
      setLoading(false);
      setCheckingDuplicate(false);
    }
  };

  // User klik "Tetap Simpan" di peringatan duplikat -> submit ulang dengan status confirmed
  const handleConfirmDuplicate = (e) => {
    setConfirmedDuplicate(true);
    // langsung submit ulang setelah state ke-set
    setTimeout(() => handleSubmit(e), 0);
  };

  const renderMetadataInput = (f) => {
    const value = metadataValues[f.key] || "";
    const onChange = (e) => handleMetadataChange(f.key, e.target.value);
    if (f.type === "textarea") {
      return <textarea value={value} onChange={onChange} style={{ ...s.input, minHeight: 70, resize: "vertical" }} placeholder={f.placeholder} />;
    }
    if (f.type === "select") {
      return (
        <select value={value} onChange={onChange} style={s.input}>
          <option value="">Pilih...</option>
          {(f.options || []).map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      );
    }
    return <input type={f.type === "number" ? "number" : "text"} value={value} onChange={onChange} style={s.input} placeholder={f.placeholder} />;
  };

  return (
    <div style={s.wrap}>
      <div style={s.card}>
        <div style={s.cardHead}>
          <div style={s.cardTitle}>Tambah Arsip — {jenisLabel}</div>
          <div style={s.cardSub}>Kode {kode} · Nomor berkas di-generate otomatis</div>
        </div>
        <div style={s.cardBody}>
          <form onSubmit={handleSubmit}>
            <Field label="Kode Klasifikasi">
              <input value={kode} disabled style={{ ...s.input, background: "#F3F4F6", color: "#6B7280" }} />
            </Field>
            <Field label="Jenis Arsip">
              <input value={jenisLabel} disabled style={{ ...s.input, background: "#F3F4F6", color: "#6B7280" }} />
            </Field>

            {hasSubJenis && (
              <Field label="Sub-Jenis Dokumen *">
                <select value={subJenisId} onChange={(e) => setSubJenisId(e.target.value)} style={s.input}>
                  <option value="">Pilih sub-jenis...</option>
                  {subJenisList.map((sj) => (
                    <option key={sj.id} value={sj.id}>{sj.nama_sub_jenis}</option>
                  ))}
                </select>
              </Field>
            )}

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

            {/* Field dinamis per jenis arsip (dari metadataFields config) */}
            {metadataFields.map((f) => (
              <Field key={f.key} label={f.required ? `${f.label} *` : f.label}>
                {renderMetadataInput(f)}
              </Field>
            ))}

            <div style={s.toggleRow}>
              <div>
                <div style={s.toggleLabel}>Arsip Lama</div>
                <div style={s.toggleHint}>Aktifkan jika dokumen fisik sudah ada dan nomor urutnya perlu diisi manual</div>
              </div>
              <label style={s.switchWrap}>
                <input type="checkbox" checked={isArsipLama} onChange={(e) => setIsArsipLama(e.target.checked)} style={{ display: "none" }} />
                <span style={{ ...s.switchTrack, background: isArsipLama ? "#1A3A5C" : "#D1D5DB" }}>
                  <span style={{ ...s.switchThumb, transform: isArsipLama ? "translateX(18px)" : "translateX(0)" }} />
                </span>
              </label>
            </div>

            {isArsipLama && (
              <Field label="Nomor Urut *">
                <input type="number" min="1" value={nomorUrut} onChange={(e) => setNomorUrut(e.target.value)} style={s.input} placeholder="Contoh: 1" />
              </Field>
            )}

            {/* Peringatan duplikat: muncul cuma kalau nomor yang diketik sudah dipakai arsip lain */}
            {duplicateInfo && (
              <div style={s.duplicateWarning}>
                <div style={s.duplicateWarningTitle}>⚠ Nomor berkas sudah digunakan</div>
                <div style={s.duplicateWarningText}>
                  Nomor <strong>{duplicateInfo.nomorBerkas}</strong> sudah dipakai di arsip lain.
                  Kalau ini memang disengaja (misal dokumen fisik aslinya memang bernomor sama),
                  kamu tetap bisa lanjut simpan.
                </div>
                <button type="button" onClick={handleConfirmDuplicate} style={s.btnDuplicateConfirm}>
                  Tetap Simpan
                </button>
              </div>
            )}

            <Field label="File Arsip (PDF) *">
              <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0] || null)} style={s.input} />
            </Field>

            {error && <div style={s.errorText}>{error}</div>}

            <div style={s.actionBar}>
              <button type="button" onClick={() => navigate(-1)} style={s.btnSecondary}>Batal</button>
              <button type="submit" disabled={loading || checkingDuplicate} style={s.btnPrimary}>
                {checkingDuplicate ? "Memeriksa nomor..." : loading ? "Mengunggah..." : "Unggah Arsip"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {nomorBerkas && (
        <SuccessModal nomorBerkas={nomorBerkas} onClose={() => navigate(redirectRoute)} />
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
  input: { width: "100%", padding: "9px 12px", borderRadius: 8, border: "1px solid #D1D5DB", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box" },
  errorText: { color: "#DC2626", fontSize: 13, marginTop: 10, marginBottom: 4 },
  actionBar: { display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 24 },
  btnSecondary: { padding: "10px 20px", borderRadius: 9, border: "1px solid #D1D5DB", background: "#fff", color: "#374151", fontSize: 13, fontWeight: 600, cursor: "pointer" },
  btnPrimary: { padding: "10px 24px", borderRadius: 9, border: "none", background: "#1A3A5C", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" },
  toggleRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 10, marginBottom: 16 },
  toggleLabel: { fontSize: 13, fontWeight: 600, color: "#374151" },
  toggleHint: { fontSize: 11.5, color: "#9CA3AF", marginTop: 2, maxWidth: 420 },
  switchWrap: { cursor: "pointer", flexShrink: 0, marginLeft: 12 },
  switchTrack: { display: "block", width: 40, height: 22, borderRadius: 999, position: "relative", transition: "background 0.2s" },
  switchThumb: { position: "absolute", top: 2, left: 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "transform 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" },
  duplicateWarning: { background: "#FFFBEB", border: "1px solid #FDE68A", borderRadius: 10, padding: "12px 14px", marginBottom: 16 },
  duplicateWarningTitle: { fontSize: 13, fontWeight: 700, color: "#92400E", marginBottom: 4 },
  duplicateWarningText: { fontSize: 12.5, color: "#78350F", lineHeight: 1.5, marginBottom: 10 },
  btnDuplicateConfirm: { padding: "7px 16px", borderRadius: 8, border: "1px solid #F59E0B", background: "#FEF3C7", color: "#92400E", fontSize: 12.5, fontWeight: 700, cursor: "pointer" },
  modalOverlay: { position: "fixed", inset: 0, background: "rgba(15,23,42,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modalCard: { background: "#fff", borderRadius: 16, padding: "40px 48px", width: 420, maxWidth: "90%", textAlign: "center", boxShadow: "0 20px 50px rgba(0,0,0,0.2)" },
  modalIconWrap: { width: 72, height: 72, borderRadius: "50%", border: "2px solid #22C55E", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" },
  modalTitle: { fontSize: 20, fontWeight: 700, color: "#111827", marginBottom: 8 },
  modalDesc: { fontSize: 14, color: "#6B7280", marginBottom: 24 },
  modalBtn: { padding: "10px 32px", borderRadius: 9, border: "none", background: "#1A3A5C", color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" },
};