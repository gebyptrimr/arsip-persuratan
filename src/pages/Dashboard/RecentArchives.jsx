function RecentArchives() {
  const archives = [
    {
      id: 1,
      jenis: "Surat Masuk",
      nomor: "SM-025/2026",
      perihal: "Undangan Rapat Evaluasi Program",
      tanggal: "10 Jun 2026",
      status: "Baru",
    },
    {
      id: 2,
      jenis: "Surat Keluar",
      nomor: "SK-018/2026",
      perihal: "Permohonan Data Penelitian",
      tanggal: "09 Jun 2026",
      status: "Baru",
    },
    {
      id: 3,
      jenis: "Surat Keputusan",
      nomor: "SKP-012/2026",
      perihal: "Penetapan Tim Reviewer",
      tanggal: "08 Jun 2026",
      status: "Baru",
    },
    {
      id: 4,
      jenis: "Kontrak",
      nomor: "KTR-003/2026",
      perihal: "Kerja Sama Penelitian",
      tanggal: "07 Jun 2026",
      status: "Baru",
    },
    {
      id: 5,
      jenis: "Surat Tugas",
      nomor: "ST-009/2026",
      perihal: "Monitoring Kegiatan",
      tanggal: "06 Jun 2026",
      status: "Baru",
    },
  ];

  return (
    <div className="recent-card">
      <div className="recent-header">
        <h3>Arsip Terbaru</h3>

        <button className="recent-link">
          Lihat Semua
          <i className="ti ti-arrow-right"></i>
        </button>
      </div>

      <div className="table-responsive">
        <table className="recent-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Jenis Arsip</th>
              <th>Nomor</th>
              <th>Perihal</th>
              <th>Tanggal</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {archives.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>

                <td>{item.jenis}</td>

                <td className="archive-number">
                  {item.nomor}
                </td>

                <td>{item.perihal}</td>

                <td>{item.tanggal}</td>

                <td>
                  <span className="status-badge">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentArchives;