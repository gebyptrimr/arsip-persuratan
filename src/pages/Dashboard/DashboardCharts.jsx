import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function DashboardCharts() {
  const data = [
    { bulan: "Jan", arsip: 120 },
    { bulan: "Feb", arsip: 150 },
    { bulan: "Mar", arsip: 180 },
    { bulan: "Apr", arsip: 140 },
    { bulan: "Mei", arsip: 210 },
    { bulan: "Jun", arsip: 190 },
  ];

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3>Arsip per Bulan</h3>
          <p>Jumlah arsip yang tercatat tahun 2026</p>
        </div>

        <button className="btn-chart-filter">
          6 Bulan Terakhir
          <i className="ti ti-chevron-down"></i>
        </button>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis dataKey="bulan" />

          <YAxis />

          <Tooltip />

          <Bar dataKey="arsip" fill="#163b67" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DashboardCharts;
