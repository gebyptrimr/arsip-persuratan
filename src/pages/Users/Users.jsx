import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Users.css";

function Users() {
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  const users = [
    {
      id: 1,
      initials: "AD",
      initialsColor: "#163b67",
      name: "Admin LP2M",
      email: "admin@lp2m.unm.ac.id",
      nip: "1987654321",
      jabatan: "Administrator",
      username: "adminlp2m",
      status: "Aktif",
      loginTerakhir: "Hari ini\n08:20",
      hak: ["Dashboard", "Surat Masuk", "Surat Keluar", "Surat Keputusan", "Surat Tugas", "Kontrak", "Retensi Arsip", "Manajemen Akun", "Pengaturan"],
    },
    {
      id: 2,
      initials: "SA",
      initialsColor: "#16a34a",
      name: "Staff Arsip 1",
      email: "arsip1@lp2m.unm.ac.id",
      nip: "1990123456",
      jabatan: "Staff Arsip",
      username: "staffarsip1",
      status: "Aktif",
      loginTerakhir: "2 jam lalu\n10:15",
      hak: ["Dashboard", "Surat Masuk", "Surat Keluar", "Retensi Arsip"],
    },
    {
      id: 3,
      initials: "SD",
      initialsColor: "#7c3aed",
      name: "Staff Dokumentasi",
      email: "dokumen@lp2m.unm.ac.id",
      nip: "1992045678",
      jabatan: "Dokumentasi",
      username: "staffdok",
      status: "Nonaktif",
      loginTerakhir: "-",
      hak: ["Dashboard", "Surat Masuk"],
    },
    {
      id: 4,
      initials: "SP",
      initialsColor: "#ea580c",
      name: "Staff Persuratan",
      email: "persuratan@lp2m.unm.ac.id",
      nip: "1993056789",
      jabatan: "Persuratan",
      username: "staffsurat",
      status: "Aktif",
      loginTerakhir: "Kemarin\n16:40",
      hak: ["Dashboard", "Surat Masuk", "Surat Keluar", "Surat Keputusan"],
    },
    {
      id: 5,
      initials: "ST",
      initialsColor: "#0891b2",
      name: "Staff Tugas",
      email: "tugas@lp2m.unm.ac.id",
      nip: "1994089101",
      jabatan: "Staff Tugas",
      username: "stafftugas",
      status: "Nonaktif",
      loginTerakhir: "3 hari lalu\n09:30",
      hak: ["Dashboard", "Surat Tugas"],
    },
  ];

  const stats = [
    {
      label: "Total Akun",
      value: 12,
      sub: "Semua akun staf SIPAS",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#163b67" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="9" cy="7" r="4" stroke="#163b67" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="#163b67" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      iconBg: "#dbeafe",
      color: "#163b67",
    },
    {
      label: "Administrator",
      value: 2,
      sub: "Akun administrator sistem",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      iconBg: "#dcfce7",
      color: "#16a34a",
    },
    {
      label: "Staf Aktif",
      value: 8,
      sub: "Akun staf aktif",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="9" cy="7" r="4" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <polyline points="16 11 18 13 22 9" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      iconBg: "#ede9fe",
      color: "#7c3aed",
    },
    {
      label: "Nonaktif",
      value: 2,
      sub: "Akun tidak aktif",
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="9" cy="7" r="4" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <line x1="17" y1="11" x2="23" y2="17" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
          <line x1="23" y1="11" x2="17" y2="17" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      ),
      iconBg: "#fee2e2",
      color: "#dc2626",
    },
  ];

  // semua user ditampilkan tanpa filter

  return (
    <div className="users-page">
      {/* HEADER */}
      <div className="users-header">
        <div>
          <h1>Manajemen Akun Staf</h1>
          <p>Kelola akun administrator dan staf SIPAS</p>
        </div>
        <button className="btn-add-user" onClick={() => navigate("/users/tambah")}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          Tambah Akun
        </button>
      </div>

      {/* STATS */}
      <div className="user-stats">
        {stats.map((s, i) => (
          <div className="user-stat-card" key={i}>
            <div className="stat-icon" style={{ background: s.iconBg }}>
              {s.icon}
            </div>
            <div className="stat-info">
              <p className="stat-label">{s.label}</p>
              <h2 className="stat-value" style={{ color: s.color }}>{s.value}</h2>
              <p className="stat-sub">{s.sub}</p>
            </div>
          </div>
        ))}
      </div>


      {/* MAIN CONTENT */}
      <div className="users-main-layout">
        {/* TABLE */}
        <div className={`users-table-container ${selectedUser ? "with-detail" : ""}`}>
          <div className="users-table-header">
            <div className="users-table-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="7" r="4" stroke="white" strokeWidth="2"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Daftar Akun Staf
              <span className="users-count">{users.length} Akun</span>
            </div>
          </div>

          <table className="users-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Staf</th>
                <th>NIP</th>
                <th>Jabatan</th>
                <th>Status</th>
                <th>Login Terakhir</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={selectedUser?.id === user.id ? "row-selected" : ""}
                  onClick={() => setSelectedUser(user)}
                >
                  <td>{index + 1}</td>
                  <td>
                    <div className="user-cell">
                      <div
                        className="user-avatar"
                        style={{ background: user.initialsColor }}
                      >
                        {user.initials}
                      </div>
                      <div>
                        <div className="user-name">{user.name}</div>
                        <div className="user-email">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.nip}</td>
                  <td>
                    <span className={`jabatan-badge jabatan-${user.jabatan.toLowerCase().replace(/\s/g, "-")}`}>
                      {user.jabatan}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${user.status === "Aktif" ? "status-active" : "status-inactive"}`}>
                      ● {user.status}
                    </span>
                  </td>
                  <td className="login-cell">
                    {user.loginTerakhir.split("\n").map((line, i) => (
                      <span key={i} className={i === 0 ? "login-date" : "login-time"}>{line}</span>
                    ))}
                  </td>
                  <td>
                    <button
                      className="btn-more"
                      onClick={(e) => { e.stopPropagation(); setSelectedUser(user); }}
                      title="Detail"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="5" r="1.5" fill="#475569"/>
                        <circle cx="12" cy="12" r="1.5" fill="#475569"/>
                        <circle cx="12" cy="19" r="1.5" fill="#475569"/>
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="users-footer">
            <span>Menampilkan 1 - {users.length} dari {users.length} akun</span>
            <div className="pagination">
              <button className="page-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><polyline points="15 18 9 12 15 6" stroke="#475569" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
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
              <div className="detail-avatar" style={{ background: selectedUser.initialsColor }}>
                {selectedUser.initials}
              </div>
              <div>
                <div className="detail-user-name">{selectedUser.name}</div>
                <div className="detail-user-role">{selectedUser.jabatan}</div>
              </div>
              <span className={`status-badge ml-auto ${selectedUser.status === "Aktif" ? "status-active" : "status-inactive"}`}>
                ● {selectedUser.status}
              </span>
            </div>

            <div className="detail-fields">
              {[
                ["NIP", selectedUser.nip],
                ["Username", selectedUser.username || selectedUser.name.toLowerCase().replace(/\s/g, "")],
                ["Email", selectedUser.email],
                ["Jabatan", selectedUser.jabatan],
                ["Status", selectedUser.status],
                ["Login Terakhir", "Hari ini, 13 Juni 2026 08:20"],
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
              {selectedUser.hak.map((h) => (
                <div className="hak-item" key={h}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="#16a34a"/>
                    <polyline points="9 12 11 14 15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {h}
                </div>
              ))}
            </div>

            <div className="detail-actions">
              <button className="btn-detail-action btn-reset">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M21 2v6h-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M3 22v-6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Reset Password
              </button>
              <button className="btn-detail-action btn-edit">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Edit Akun
              </button>
              <button className="btn-detail-action btn-nonaktif">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Nonaktifkan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
