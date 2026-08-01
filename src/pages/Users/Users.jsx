import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Users.css";
import { useSearch } from "../../Contextt/SearchContext";
import { globalFilter } from "../../utils/filterData";
import { supabase } from "../../lib/supabase";

function getInitials(nama = "") {
  return nama.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

const jabatanColor = {
  Administrator: "#163b67",
  Staff: "#16a34a",
};

function formatLogin(ts) {
  if (!ts) return ["-", ""];
  const diff = Date.now() - new Date(ts).getTime();
  const menit = Math.floor(diff / 60000);
  const jam = Math.floor(diff / 3600000);
  const hari = Math.floor(diff / 86400000);
  const time = new Date(ts).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
  if (menit < 1)  return ["Baru saja", time];
  if (menit < 60) return [`${menit} menit lalu`, time];
  if (jam < 24)   return [`${jam} jam lalu`, time];
  if (hari === 1) return ["Kemarin", time];
  if (hari < 30)  return [`${hari} hari lalu`, time];
  const tanggal = new Date(ts).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
  return [tanggal, time];
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const { searchTerm } = useSearch();

  async function fetchCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();
    if (data) setCurrentUser(data);
  }

  async function fetchUsers() {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("id, nama, email, username, jabatan, role, status, hak_akses, last_login")
      .order("created_at", { ascending: true });
    if (error) console.error("Gagal fetch:", error.message);
    else setUsers(data || []);
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      await fetchUsers();
      await fetchCurrentUser();
    })();
  }, []);

  async function toggleStatus(user) {
    const newStatus = user.status === "Aktif" ? "Nonaktif" : "Aktif";
    const { error } = await supabase.from("profiles").update({ status: newStatus }).eq("id", user.id);
    if (!error) {
      setUsers((prev) => prev.map((u) => u.id === user.id ? { ...u, status: newStatus } : u));
      setSelectedUser((prev) => ({ ...prev, status: newStatus }));
    }
  }

  const totalAdmin    = users.filter((u) => u.role === "admin").length;
  const totalAktif    = users.filter((u) => u.status?.toLowerCase() === "aktif" && u.role !== "admin").length;
  const totalNonaktif = users.filter((u) => u.status === "Nonaktif").length;

  const stats = [
    {
      label: "Total Akun", value: users.length, sub: "Semua akun staf SIPAS",
      iconBg: "#dbeafe", color: "#163b67",
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#163b67" strokeWidth="2" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="#163b67" strokeWidth="2"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#163b67" strokeWidth="2" strokeLinecap="round"/></svg>,
    },
    {
      label: "Administrator", value: totalAdmin, sub: "Akun administrator sistem",
      iconBg: "#dcfce7", color: "#16a34a",
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/></svg>,
    },
    {
      label: "Staf Aktif", value: totalAktif, sub: "Akun staf aktif",
      iconBg: "#ede9fe", color: "#7c3aed",
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="#7c3aed" strokeWidth="2"/><polyline points="16 11 18 13 22 9" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round"/></svg>,
    },
    {
      label: "Nonaktif", value: totalNonaktif, sub: "Akun tidak aktif",
      iconBg: "#fee2e2", color: "#dc2626",
      icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="#dc2626" strokeWidth="2"/><line x1="17" y1="11" x2="23" y2="17" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/><line x1="23" y1="11" x2="17" y2="17" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/></svg>,
    },
  ];

  const filteredUsers = globalFilter(users, searchTerm);

  if (loading) return (
    <div className="users-page" style={{ display: "flex", justifyContent: "center", paddingTop: 80 }}>
      <p style={{ color: "#94a3b8" }}>Memuat data...</p>
    </div>
  );

  return (
    <div className="users-page">
      {/* HEADER */}
      <div className="users-header">
        <div>
          <h1>Manajemen Akun Staf</h1>
          <p>Kelola akun administrator dan staf SIPAS</p>
        </div>
        {currentUser?.role === "admin" && (
          <button className="btn-add-user" onClick={() => navigate("/users/tambah")}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
            Tambah Akun
          </button>
        )}
      </div>

      {/* STATS */}
      <div className="user-stats">
        {stats.map((s, i) => (
          <div className="user-stat-card" key={i}>
            <div className="stat-icon" style={{ background: s.iconBg }}>{s.icon}</div>
            <div className="stat-info">
              <p className="stat-label">{s.label}</p>
              <h2 className="stat-value" style={{ color: s.color }}>{s.value}</h2>
              <p className="stat-sub">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* MAIN */}
      <div className="users-main-layout">
        <div className={`users-table-container ${selectedUser ? "with-detail" : ""}`}>
          <div className="users-table-header">
            <div className="users-table-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Daftar Akun Staf
              <span className="users-count">{filteredUsers.length} Akun</span>
            </div>
          </div>

          <table className="users-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Staf</th>
                <th>Jabatan</th>
                <th>Status</th>
                <th>Login Terakhir</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", color: "#94a3b8", padding: "40px 0" }}>
                    Tidak ada akun ditemukan
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user, index) => {
                  const [loginDate, loginTime] = formatLogin(user.last_login);
                  const color = jabatanColor[user.jabatan] || "#163b67";
                  return (
                    <tr
                      key={user.id}
                      className={selectedUser?.id === user.id ? "row-selected" : ""}
                      onClick={() => setSelectedUser(user)}
                    >
                      <td>{index + 1}</td>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar" style={{ background: color }}>
                            {getInitials(user.nama)}
                          </div>
                          <div>
                            <div className="user-name">{user.nama}</div>
                            <div className="user-email">{user.email || "-"}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`jabatan-badge jabatan-${user.jabatan?.toLowerCase().replace(/\s/g, "-")}`}>
                          {user.jabatan}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${user.status?.toLowerCase() === "aktif" ? "status-active" : "status-inactive"}`}>
                          ● {user.status}
                        </span>
                      </td>
                      <td className="login-cell">
                        <span className="login-date">{loginDate}</span>
                        {loginTime && <span className="login-time">{loginTime}</span>}
                      </td>
                      <td>
                        <button
                          className="btn-more"
                          onClick={(e) => { e.stopPropagation(); setSelectedUser(user); }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="5" r="1.5" fill="#475569"/>
                            <circle cx="12" cy="12" r="1.5" fill="#475569"/>
                            <circle cx="12" cy="19" r="1.5" fill="#475569"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>

          <div className="users-footer">
            <span>Menampilkan {filteredUsers.length} dari {users.length} akun</span>
            <div className="pagination">
              <button className="page-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><polyline points="15 18 9 12 15 6" stroke="#475569" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
              <button className="page-btn active">1</button>
              <button className="page-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><polyline points="9 18 15 12 9 6" stroke="#475569" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* DETAIL PANEL */}
        {selectedUser && (
          <div className="user-detail-panel">
            <div className="detail-panel-header">
              <span className="detail-title">Detail Akun Staf</span>
              <button className="btn-close-detail" onClick={() => setSelectedUser(null)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18" stroke="#475569" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="6" y1="6" x2="18" y2="18" stroke="#475569" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            <div className="detail-user-info">
              <div className="detail-avatar" style={{ background: jabatanColor[selectedUser.jabatan] || "#163b67" }}>
                {getInitials(selectedUser.nama)}
              </div>
              <div>
                <div className="detail-user-name">{selectedUser.nama}</div>
                <div className="detail-user-role">{selectedUser.jabatan}</div>
              </div>
              <span className={`status-badge ml-auto ${selectedUser.status?.toLowerCase() === "aktif" ? "status-active" : "status-inactive"}`}>
                ● {selectedUser.status}
              </span>
            </div>

            <div className="detail-fields">
              {[
                ["Username", selectedUser.username || "-"],
                ["Email",    selectedUser.email    || "-"],
                ["Jabatan",  selectedUser.jabatan  || "-"],
                ["Role",     selectedUser.role     || "-"],
                ["Status",   selectedUser.status],
                ["Login Terakhir", selectedUser.last_login
                  ? new Date(selectedUser.last_login).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })
                  : "-"],
              ].map(([k, v]) => (
                <div className="detail-field-row" key={k}>
                  <span className="detail-field-key">{k}</span>
                  <span className="detail-field-sep">:</span>
                  <span className="detail-field-val">{v}</span>
                </div>
              ))}
            </div>

            <div className="detail-section-title">Hak Akses</div>
            <div className="hak-akses-grid">
              {(selectedUser.hak_akses || []).length === 0
                ? <p style={{ color: "#94a3b8", fontSize: 13, padding: "0 0 8px" }}>Belum ada hak akses</p>
                : (selectedUser.hak_akses || []).map((h) => (
                  <div className="hak-item" key={h}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" fill="#16a34a"/>
                      <polyline points="9 12 11 14 15 10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    {h}
                  </div>
                ))
              }
            </div>

            {currentUser?.role === "admin" && (
              <div className="detail-actions">
                <button
                  className="btn-detail-action btn-edit"
                  onClick={() => navigate(`/users/edit/${selectedUser.id}`)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  Edit Akun
                </button>
                {selectedUser.role !== "admin" && (
                  <button
                    className={`btn-detail-action ${selectedUser.status === "Aktif" ? "btn-nonaktif" : "btn-aktifkan"}`}
                    onClick={() => toggleStatus(selectedUser)}
                  >
                    {selectedUser.status === "Aktif" ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    ) : (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <polyline points="20 6 9 17 4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                    {selectedUser.status === "Aktif" ? "Nonaktifkan" : "Aktifkan"}
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}