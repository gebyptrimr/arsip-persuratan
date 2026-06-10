import Swal from "sweetalert2";

function SuratTugasTambah() {
  const handleSubmit = (e) => {
    e.preventDefault();

    Swal.fire({
      icon: "success",
      title: "Berhasil",
      text: "Data Surat Tugas berhasil disimpan!",
      confirmButtonColor: "#04007b",
    });
  };

  return (
    <div className="container py-4">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow border-0">
            <div className="card-header bg-warning py-3">
              <h3 className="mb-0">📑 Tambah Arsip Surat Tugas</h3>
            </div>

            <div className="card-body p-4">
              {/* Tambahkan onSubmit */}
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nomor Surat Tugas</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Masukkan nomor surat tugas"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Tanggal Surat</label>
                    <input type="date" className="form-control" required />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Penerima Tugas</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Masukkan penerima tugas"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Tujuan Tugas</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Masukkan tujuan tugas"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Tanggal Mulai</label>
                    <input type="date" className="form-control" required />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label">Tanggal Selesai</label>
                    <input type="date" className="form-control" required />
                  </div>

                  <div className="col-12 mb-4">
                    <label className="form-label">Upload PDF</label>
                    <input
                      type="file"
                      className="form-control"
                      accept=".pdf"
                      required
                    />
                  </div>
                </div>

                <hr />

                <div className="d-flex justify-content-end gap-2">
                  <button type="button" className="btn btn-secondary">
                    Batal
                  </button>

                  <button type="submit" className="btn btn-warning">
                    💾 Simpan Surat Tugas
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuratTugasTambah;
