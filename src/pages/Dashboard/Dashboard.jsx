import "./Dashboard.css";
import StatCards from "./StatCards";
import DashboardCharts from "./DashboardCharts";
import RetentionChart from "./RetentionChart";

function Dashboard() {
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
              Periode: Juni   2026
            </button>

            <button className="btn-primary">
              <i className="ti ti-plus"></i>
              Tambah Arsip
            </button>
          </div>
        </div>

        <StatCards />
        <div className="dashboard-overview">
            <DashboardCharts />
          <RetentionChart />
        </div>
      
      </div>
    </div>
  );
}

export default Dashboard;