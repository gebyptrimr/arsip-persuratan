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
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        return;
      }

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
          <img
            src={logo}
            alt="Logo SIPAS"
            className="login-logo"
          />

          <h1>SIPAS</h1>

          <p>
            Sistem Informasi Pengelolaan Arsip Surat
          </p>

          <small>
            LP2M Universitas Negeri Makassar
          </small>
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
            <div
              style={{
                color: "#dc2626",
                fontSize: "14px",
                marginBottom: "12px",
              }}
            >
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Masuk ke SIPAS"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;