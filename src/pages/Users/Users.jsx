import "./Users.css";

function Users() {
  const users = [
    {
      id: 1,
      name: "Admin LP2M",
      email: "admin@lp2m.unm.ac.id",
      role: "Admin",
      status: "Aktif",
    },
    {
      id: 2,
      name: "Staff Arsip 1",
      email: "staff1@lp2m.unm.ac.id",
      role: "Staff",
      status: "Aktif",
    },
    {
      id: 3,
      name: "Staff Arsip 2",
      email: "staff2@lp2m.unm.ac.id",
      role: "Staff",
      status: "Aktif",
    },
    {
      id: 4,
      name: "Staff Dokumentasi",
      email: "dokumen@lp2m.unm.ac.id",
      role: "Staff",
      status: "Nonaktif",
    },
  ];

  return (
    <div className="users-page">
      <div className="users-header">
        <div>
          <h1>Manajemen User</h1>
          <p>Kelola akun administrator dan staff SIPAS</p>
        </div>

        <button className="btn-add-user">
          <i className="ti ti-plus"></i>
          Tambah User
        </button>
      </div>

      <div className="users-table-container">
        <div className="users-table-header">
          <div className="users-table-title">
            Daftar User
            <span className="users-count">
              {users.length} User
            </span>
          </div>
        </div>

        <table className="users-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>

                <td>{user.name}</td>

                <td>{user.email}</td>

                <td>
                  <span
                    className={`role-badge ${
                      user.role === "Admin"
                        ? "role-admin"
                        : "role-staff"
                    }`}
                  >
                    {user.role}
                  </span>
                </td>

                <td>
                  <span
                    className={`status-badge ${
                      user.status === "Aktif"
                        ? "status-active"
                        : "status-inactive"
                    }`}
                  >
                    ● {user.status}
                  </span>
                </td>

                <td>
                  <div className="action-buttons">
                    <button title="Edit">
                      <i className="ti ti-edit"></i>
                    </button>

                    <button title="Hapus">
                      <i className="ti ti-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="users-footer">
          Menampilkan {users.length} dari {users.length} user
        </div>
      </div>
    </div>
  );
}

export default Users;