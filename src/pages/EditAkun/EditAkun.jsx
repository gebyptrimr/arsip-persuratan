import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "../TambahAkun/TambahAkun.css";

const jabatanOptions = ["Administrator", "Staff"];

const hakAksesByJabatan = {
  Administrator: [
    "Dashboard","Surat Masuk","Surat Keluar","Surat Keputusan",
    "Surat Tugas","Kontrak","Retensi Arsip","Manajemen Akun","Pengaturan",
  ],
  Staff: [
    "Dashboard","Surat Masuk","Surat Keluar","Surat Keputusan",
    "Surat Tugas","Kontrak","Retensi Arsip",
  ],
};

export default function EditAkun() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    nama: "",
    email: "",
    jabatan: "",
    password: "",
    konfirmasiPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Fetch data user berdasarkan id
  useEffect(() => {
    async function fetchUser() {
      const { data, error } = await supabase
        .from("profiles")
        .select("nama, email, jabatan")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Gagal fetch user:", error.message);
      } else {
        setForm((prev) => ({
          ...prev,
          nama: data.nama || "",
          email: data.email || "",
          jabatan: data.jabatan || "",
        }));
      }
      setFetching(false);
    }
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.nama.trim()) newErrors.nama = "Nama wajib diisi.";
    if (!form.email.trim()) newErrors.email = "Email wajib diisi.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Format email tidak valid.";
    if (!form.jabatan) newErrors.jabatan = "Jabatan wajib dipilih.";
    // Password opsional saat edit — hanya validasi kalau diisi
    if (form.password && form.password.length < 8)
      newErrors.password = "Password minimal 8 karakter.";
    if (form.password && form.password !== form.konfirmasiPassword)
      newErrors.konfirmasiPassword = "Password tidak cocok.";
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      // Update profiles
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          nama: form.nama.trim(),
          email: form.email.trim().toLowerCase(),
          jabatan: form.jabatan,
          role: form.jabatan === "Administrator" ? "admin" : "staf",
          hak_akses: hakAksesByJabatan[form.jabatan],
        })
        .eq("id", id);

      if (profileError) {
        setErrors({ submit: profileError.message });
        return;
      }

      // Update password kalau diisi
      if (form.password) {
        const { error: pwError } = await supabase.functions.invoke("update-password", {
          body: { user_id: id, password: form.password },
        });
        if (pwError) {
          setErrors({ submit: "Profil tersimpan tapi gagal update password." });
          return;
        }
      }

      navigate("/users");
    } catch (err) {
      console.error("Gagal update akun:", err);
      setErrors({ submit: "Gagal update akun. Coba lagi." });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <p style={{ color: "#94a3b8" }}>Memuat data...</p>
    </div>
  );

  return (
    <div className="ta-wrapper">
      {/* LEFT PANEL */}
      <div className="ta-left">
        <div className="ta-brand">
          <div className="ta-brand-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M2 10h20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              <path d="M6 15h4M6 7h2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <div>
            <div className="ta-brand-name">SIPAS</div>
            <div className="ta-brand-sub">Sistem Pengelolaan Arsip Surat</div>
          </div>
        </div>

        <div className="ta-left-content">
          <h2>Edit Akun Staf</h2>
          <p>Perbarui informasi akun staf yang sudah terdaftar di SIPAS.</p>
          <div className="ta-steps">
            {["Perbarui informasi", "Ubah jabatan", "Simpan perubahan"].map((s, i) => (
              <div className="ta-step" key={i}>
                <div className={`ta-step-num ${i === 0 ? "active" : ""}`}>{i + 1}</div>
                <span>{s}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="ta-left-footer">LP2M Universitas Negeri Makassar</div>
      </div>

      {/* RIGHT PANEL */}
      <div className="ta-right">
        <div className="ta-form-box">
          <div className="ta-form-header">
            <button className="ta-btn-back" onClick={() => navigate("/users")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <polyline points="15 18 9 12 15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Kembali
            </button>
            <div className="ta-form-title">
              <h1>Edit Akun</h1>
              <p>Kosongkan password jika tidak ingin mengubahnya</p>
            </div>
          </div>

          <div className="ta-fields">
            {/* NAMA */}
            <div className={`ta-group ${errors.nama ? "has-error" : ""}`}>
              <label>Nama Lengkap <span className="req">*</span></label>
              <div className="ta-input-wrap">
                <svg className="ta-ico" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="7" r="4" stroke="#94a3b8" strokeWidth="2"/>
                </svg>
                <input type="text" name="nama" placeholder="Nama lengkap" value={form.nama} onChange={handleChange}/>
              </div>
              {errors.nama && <p className="ta-err">{errors.nama}</p>}
            </div>

            {/* EMAIL */}
            <div className={`ta-group ${errors.email ? "has-error" : ""}`}>
              <label>Email <span className="req">*</span></label>
              <div className="ta-input-wrap">
                <svg className="ta-ico" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#94a3b8" strokeWidth="2"/>
                  <polyline points="22,6 12,13 2,6" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange}/>
              </div>
              {errors.email && <p className="ta-err">{errors.email}</p>}
            </div>

            {/* JABATAN */}
            <div className={`ta-group ${errors.jabatan ? "has-error" : ""}`}>
              <label>Jabatan <span className="req">*</span></label>
              <div className="ta-input-wrap ta-select-wrap">
                <svg className="ta-ico" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="7" width="20" height="14" rx="2" stroke="#94a3b8" strokeWidth="2"/>
                  <path d="M16 3H8a2 2 0 0 0-2 2v2h12V5a2 2 0 0 0-2-2z" stroke="#94a3b8" strokeWidth="2"/>
                </svg>
                <select name="jabatan" value={form.jabatan} onChange={handleChange}>
                  <option value="">-- Pilih Jabatan --</option>
                  {jabatanOptions.map((j) => (
                    <option key={j} value={j}>{j}</option>
                  ))}
                </select>
                <svg className="ta-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <polyline points="6 9 12 15 18 9" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              {errors.jabatan && <p className="ta-err">{errors.jabatan}</p>}
            </div>

            {/* PASSWORD BARU (opsional) */}
            <div className={`ta-group ${errors.password ? "has-error" : ""}`}>
              <label>Password Baru <span style={{ color: "#94a3b8", fontWeight: 400 }}>(opsional)</span></label>
              <div className="ta-input-wrap">
                <svg className="ta-ico" width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="#94a3b8" strokeWidth="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password" placeholder="Kosongkan jika tidak diubah"
                  value={form.password} onChange={handleChange}
                />
                <button type="button" className="ta-toggle-pw" onClick={() => setShowPassword((v) => !v)}>
                  {showPassword
                    ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/></svg>
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="3" stroke="#94a3b8" strokeWidth="2"/></svg>
                  }
                </button>
              </div>
              {errors.password && <p className="ta-err">{errors.password}</p>}
            </div>

            {/* KONFIRMASI PASSWORD */}
            {form.password && (
              <div className={`ta-group ${errors.konfirmasiPassword ? "has-error" : ""}`}>
                <label>Konfirmasi Password <span className="req">*</span></label>
                <div className="ta-input-wrap">
                  <svg className="ta-ico" width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="11" width="18" height="11" rx="2" stroke="#94a3b8" strokeWidth="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <input
                    type={showKonfirmasi ? "text" : "password"}
                    name="konfirmasiPassword" placeholder="Ulangi password baru"
                    value={form.konfirmasiPassword} onChange={handleChange}
                  />
                  <button type="button" className="ta-toggle-pw" onClick={() => setShowKonfirmasi((v) => !v)}>
                    {showKonfirmasi
                      ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/><line x1="1" y1="1" x2="23" y2="23" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/></svg>
                      : <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="12" r="3" stroke="#94a3b8" strokeWidth="2"/></svg>
                    }
                  </button>
                </div>
                {errors.konfirmasiPassword && <p className="ta-err">{errors.konfirmasiPassword}</p>}
              </div>
            )}

            {errors.submit && <p className="ta-err">{errors.submit}</p>}
          </div>

          <div className="ta-actions">
            <button className="ta-btn-batal" onClick={() => navigate("/users")}>Batal</button>
            <button className="ta-btn-simpan" onClick={handleSubmit} disabled={loading}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <polyline points="20 6 9 17 4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}