function StatCards() {
  const stats = [
    {
      title: "Surat Masuk",
      value: "8.324",
      icon: "ti ti-mail-down",
      color: "#16a34a",
      bg: "#ecfdf5",
      trend: "+8.2%",
      trendColor: "#16a34a",
      description: "dari bulan lalu",
    },
    {
      title: "Surat Keluar",
      value: "12.458",
      icon: "ti ti-mail-up",
      color: "#2563eb",
      bg: "#eff6ff",
      trend: "+12.5%",
      trendColor: "#16a34a",
      description: "dari bulan lalu",
    },
    {
      title: "Surat Keputusan",
      value: "3.721",
      icon: "ti ti-certificate",
      color: "#d97706",
      bg: "#fff7ed",
      trend: "-2.1%",
      trendColor: "#dc2626",
      description: "dari bulan lalu",
    },
    {
      title: "Surat Tugas",
      value: "413",
      icon: "ti ti-clipboard-list",
      color: "#7c3aed",
      bg: "#f5f3ff",
      trend: "+5.7%",
      trendColor: "#16a34a",
      description: "dari bulan lalu",
    },
    {
      title: "Kontrak",
      value: "152",
      icon: "ti ti-file-text",
      color: "#ea580c",
      bg: "#fff7ed",
      trend: "+3.4%",
      trendColor: "#16a34a",
      description: "dari bulan lalu",
    },
    {
      title: "Total Arsip",
      value: "25.068",
      icon: "ti ti-archive",
      color: "#0891b2",
      bg: "#ecfeff",
      trend: "+10.2%",
      trendColor: "#16a34a",
      description: "seluruh arsip tersimpan",
    },
  ];

  return (
    <div className="stat-cards">
      {stats.map((s) => (
        <div className="stat-card" key={s.title}>
          <div className="stat-header">
            <div
              className="stat-icon"
              style={{
                backgroundColor: s.bg,
                color: s.color,
              }}
            >
              <i className={s.icon}></i>
            </div>

            <div className="stat-content">
              <div className="stat-title">{s.title}</div>

              <div
                className="stat-value"
                style={{ color: s.color }}
              >
                {s.value}
              </div>

              <div className="stat-label">
                Arsip
              </div>
            </div>
          </div>

          <div
            className="stat-trend"
            style={{ color: s.trendColor }}
          >
            {s.trend} • {s.description}
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatCards;