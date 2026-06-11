import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import StatCards from "./StatCards";
import DashboardCharts from "./DashboardCharts";
import RetentionChart from "./RetentionChart";
import RecentArchives from "./RecentArchives";
import AttentionPanel from "./AttentionPanel";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-page">
      <div className="dashboard">
        <div className="dashboard-header">
          <div className="dashboard-title">
            <h1>Dashboard</h1>

            <p>
              LP2M Universitas Negeri Makassar
              <span> • </span>
              Tahun Arsip 2026
            </p>
          </div>

          <div className="dashboard-actions">
            <button className="btn-outline">
              <i className="ti ti-calendar-event"></i>
              Periode: Juni 2026
            </button>

            <button
              className="btn-primary"
              onClick={() => navigate("/upload-arsip")}
            >
              <i className="ti ti-plus"></i>
              Tambah Arsip
            </button>
          </div>
        </div>

        <StatCards />

        <div className="dashboard-overview">
          <DashboardCharts />
          <RetentionChart />
          <RecentArchives />
          <AttentionPanel />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
