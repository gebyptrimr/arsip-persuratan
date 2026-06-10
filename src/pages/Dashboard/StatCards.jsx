function StatCards() {
  const stats = [
    {
      title: "Total Arsip",
      value: "12.458",
      icon: "ti-archive",
      color: "#1B3F6E",
    },
    {
      title: "Arsip Aktif",
      value: "8.124",
      icon: "ti-folder",
      color: "#2E7D32",
    },
    {
      title: "Arsip Inaktif",
      value: "4.334",
      icon: "ti-folder-off",
      color: "#EF6C00",
    },
    {
      title: "Retensi Segera",
      value: "126",
      icon: "ti-alert-circle",
      color: "#D32F2F",
    },
  ];

  return (
    <div className="stats-grid">
      {stats.map((item) => (
        <div className="stat-card" key={item.title}>
          <i
            className={`ti ${item.icon}`}
            style={{
              color: item.color,
              fontSize: "28px",
            }}
          />

          <h2>{item.value}</h2>

          <p>{item.title}</p>
        </div>
      ))}
    </div>
  );
}

export default StatCards;