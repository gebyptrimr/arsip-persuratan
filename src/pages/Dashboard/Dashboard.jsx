import "./Dashboard.css";
import StatCards from "./StatCards";

function Dashboard() {
  return (
    <div className="dashboard-page">
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
            2026
          </button>

          <button className="btn-outline">
            <i className="ti ti-file-export"></i>
            Ekspor
          </button>

          <button className="btn-primary">
            <i className="ti ti-plus"></i>
            Tambah Arsip
          </button>
        </div>
      </div>
      <StatCards />
    </div>
  );
}


export default Dashboard;