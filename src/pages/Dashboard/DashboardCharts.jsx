import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function DashboardCharts({ stats }) {

  const data = [
    {
      jenis: "Surat Masuk",
      jumlah: stats.suratMasuk,
    },
    {
      jenis: "Surat Keluar",
      jumlah: stats.suratKeluar,
    },
    {
      jenis: "SK",
      jumlah: stats.suratKeputusan,
    },
    {
      jenis: "Surat Tugas",
      jumlah: stats.suratTugas,
    },
    {
      jenis: "Kontrak",
      jumlah: stats.kontrak,
    },
  ];

  return (
    <div className="chart-card">

      <div className="chart-header">
        <div>
          <h3>Distribusi Arsip</h3>
          <p>Jumlah arsip berdasarkan kategori</p>
        </div>
      </div>

      <ResponsiveContainer
        width="100%"
        height={320}
      >
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
          />

          <XAxis dataKey="jenis" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="jumlah"
            fill="#163b67"
            radius={[8,8,0,0]}
          />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default DashboardCharts;