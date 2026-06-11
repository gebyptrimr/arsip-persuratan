import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

function RetentionChart() {
  const data = [
    { name: "Aktif", value: 78, color: "#22c55e" },
    { name: "Akan Habis", value: 12, color: "#f59e0b" },
    { name: "Retensi", value: 25, color: "#f97316" },
    { name: "Musnahkan", value: 10, color: "#ef4444" },
    { name: "Permanen", value: 0, color: "#3b82f6" },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="retention-card">
      <div className="retention-header">
        <h3>Status Retensi Arsip</h3>
      </div>

      <div className="retention-body">

        <div className="retention-chart">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={data}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={entry.color}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="retention-center">
            <span>{total}</span>
            <small>Total</small>
          </div>
        </div>

        <div className="retention-legend">
          {data.map((item) => (
            <div className="legend-item" key={item.name}>
              <div className="legend-left">
                <span
                  className="legend-dot"
                  style={{
                    backgroundColor: item.color,
                  }}
                ></span>

                <span>{item.name}</span>
              </div>

              <strong>{item.value}</strong>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default RetentionChart;