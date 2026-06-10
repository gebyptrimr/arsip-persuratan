
  function SuratKeluar() {
  const user = JSON.parse(localStorage.getItem("user")) || {
    role: "admin",
  };

  const data = [
    {
      id: 1,
      nomorSurat: "001/SK/2025",
      tanggalSurat: "2025-06-01",
      tujuan: "BKD",
      perihal: "Undangan Rapat",
      file: "surat.pdf",
    },
  ];

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h4 className="mb-0">Surat Keluar</h4>

        </div>

        <div className="card-body">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Cari surat..."
          />

          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>No</th>
                  <th>Nomor Surat</th>
                  <th>Tanggal Surat</th>
                  <th>Tujuan</th>
                  <th>Perihal</th>
                  <th>File PDF</th>
                  {user.role === "admin" && <th>Aksi</th>}
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item.nomorSurat}</td>
                    <td>{item.tanggalSurat}</td>
                    <td>{item.tujuan}</td>
                    <td>{item.perihal}</td>

                    <td>
                      <button className="btn btn-info btn-sm text-white">
                        Lihat PDF
                      </button>
                    </td>

                    {user.role === "admin" && (
                      <td>
                        <button className="btn btn-warning btn-sm me-2">
                          Edit
                        </button>

                        <button className="btn btn-danger btn-sm">
                          Delete
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuratKeluar;