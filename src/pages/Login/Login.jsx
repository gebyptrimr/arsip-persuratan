import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import logo from "../../assets/logo.jpeg";

function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        // Dummy login
        if (username && password) {
            navigate("/dashboard");
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
                        <label>Username</label>

                        <input
                            type="text"
                            placeholder="Masukkan username"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>

                        <input
                            type="password"
                            placeholder="Masukkan password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                    >
                        Masuk ke SIPAS
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;