function RetensiPanel() {
  const data = [
    {
      nama: "Dokumen Kerja Sama 2021",
      sisa: "14 Hari",
    },
    {
      nama: "Kontrak Penelitian 2020",
      sisa: "28 Hari",
    },
    {
      nama: "SK Panitia 2019",
      sisa: "35 Hari",
    },
  ];

  return (
    <div className="retensi-card">
      <div className="retensi-header">
        <i className="ti ti-alert-circle" />
        <h3>Retensi Segera</h3>
      </div>

      {data.map((item) => (
        <div className="retensi-item" key={item.nama}>
          <div>
            <strong>{item.nama}</strong>
          </div>

          <span>{item.sisa}</span>
        </div>
      ))}
    </div>
  );
}

export default RetensiPanel;