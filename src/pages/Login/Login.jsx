import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./Login.css";
import logo from "../../assets/logo.jpeg";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      // 1. Login lewat Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage("Email atau password salah");
        return;
      }

      // 2. Cek status akun di tabel profiles
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("status, last_login")
        .eq("id", data.user.id)
        .single();

      if (profileError || !profile) {
        await supabase.auth.signOut();
        setErrorMessage("Gagal memverifikasi akun. Silakan coba lagi.");
        return;
      }

      if (profile.status?.toLowerCase() !== "aktif") {
        await supabase.auth.signOut();
        setErrorMessage("Akun Anda telah dinonaktifkan. Hubungi administrator.");
        return;
      }

      // 3. Update last_login HANYA kalau akun aktif dan lolos semua cek
      await supabase
        .from("profiles")
        .update({ last_login: new Date().toISOString() })
        .eq("id", data.user.id);

      // 4. Masuk ke dashboard
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Terjadi kesalahan saat login");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <img src={logo} alt="Logo SIPAS" className="login-logo" />
          <h1>SIPAS</h1>
          <p>Sistem Informasi Pengelolaan Arsip Surat</p>
          <small>LP2M Universitas Negeri Makassar</small>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Masukkan email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMessage && (
            <div style={{ color: "#dc2626", fontSize: "14px", marginBottom: "12px" }}>
              {errorMessage}
            </div>
          )}

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Memproses..." : "Masuk ke SIPAS"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;