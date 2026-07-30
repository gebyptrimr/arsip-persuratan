function StatCards({ stats }) {
  const data = [
    {
      title: "Surat Masuk",
      value: stats.suratMasuk,
      icon: "ti ti-mail-down",
      color: "#16a34a",
      bg: "#ecfdf5",
    },
    {
      title: "Surat Keluar",
      value: stats.suratKeluar,
      icon: "ti ti-mail-up",
      color: "#2563eb",
      bg: "#eff6ff",
    },
    {
      title: "Surat Keputusan",
      value: stats.suratKeputusan,
      icon: "ti ti-certificate",
      color: "#d97706",
      bg: "#fff7ed",
    },
    {
      title: "Surat Tugas",
      value: stats.suratTugas,
      icon: "ti ti-clipboard-list",
      color: "#7c3aed",
      bg: "#f5f3ff",
    },
    {
      title: "Kontrak",
      value: stats.kontrak,
      icon: "ti ti-file-text",
      color: "#ea580c",
      bg: "#fff7ed",
    },
    {
      title: "Total Arsip",
      value: stats.totalArsip,
      icon: "ti ti-archive",
      color: "#0891b2",
      bg: "#ecfeff",
    },
  ];

  return (
    <div className="stat-cards">
      {data.map((item) => (
        <div className="stat-card" key={item.title}>
          <div className="stat-header">
            <div
              className="stat-icon"
              style={{
                backgroundColor: item.bg,
                color: item.color,
              }}
            >
              <i className={item.icon}></i>
            </div>

            <div className="stat-content">
              <div className="stat-title">
                {item.title}
              </div>

              <div
                className="stat-value"
                style={{ color: item.color }}
              >
                {item.value.toLocaleString("id-ID")}
              </div>

              <div className="stat-label">
                Arsip
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatCards;