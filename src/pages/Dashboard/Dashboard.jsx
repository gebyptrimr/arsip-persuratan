import MainLayout from "../../components/layout/MainLayout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun"],
    datasets: [
      {
        label: "Jumlah Arsip",
        data: [12, 19, 10, 25, 18, 30],
        borderColor: "#0d6efd",
        backgroundColor: "rgba(13,110,253,0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <MainLayout>
      <div className="container-fluid">

        <h2 className="mb-4 fw-bold">Dashboard</h2>

        <div className="row g-4">

          <div className="col-md-3">
            <div className="card border-0 shadow bg-primary text-white">
              <div className="card-body">
                <i className="bi bi-envelope fs-2"></i>
                <h5 className="mt-2">Surat Masuk</h5>
                <h2>120</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow bg-success text-white">
              <div className="card-body">
                <i className="bi bi-send fs-2"></i>
                <h5 className="mt-2">Surat Keluar</h5>
                <h2>85</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow bg-warning text-dark">
              <div className="card-body">
                <i className="bi bi-file-earmark-text fs-2"></i>
                <h5 className="mt-2">Kontrak</h5>
                <h2>20</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card border-0 shadow bg-danger text-white">
              <div className="card-body">
                <i className="bi bi-journal-check fs-2"></i>
                <h5 className="mt-2">SK</h5>
                <h2>35</h2>
              </div>
            </div>
          </div>

        </div>

        <div className="row mt-4">

          <div className="col-lg-8">
            <div className="card shadow border-0">
              <div className="card-header bg-white">
                <strong>Grafik Arsip Bulanan</strong>
              </div>

              <div className="card-body">
                <Line data={data} />
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="card shadow border-0">
              <div className="card-header bg-white">
                <strong>Aktivitas Terbaru</strong>
              </div>

              <div className="card-body">

                <div className="mb-3">
                  <strong>001/SM/2026</strong>
                  <br />
                  Surat Masuk ditambahkan
                </div>

                <div className="mb-3">
                  <strong>002/SK/2026</strong>
                  <br />
                  SK ditambahkan
                </div>

                <div className="mb-3">
                  <strong>003/KTR/2026</strong>
                  <br />
                  Kontrak diperbarui
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default Dashboard;
