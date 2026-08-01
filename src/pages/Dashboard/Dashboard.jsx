import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

import "./Dashboard.css";
import StatCards from "./StatCards";
import DashboardCharts from "./DashboardCharts";
import RecentArchives from "./RecentArchives";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    suratMasuk: 0,
    suratKeluar: 0,
    suratKeputusan: 0,
    suratTugas: 0,
    kontrak: 0,
    totalArsip: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchDashboard() {
      try {
        const [
          suratMasuk,
          suratKeluar,
          suratKeputusan,
          suratTugas,
          kontrak,
        ] = await Promise.all([
          supabase.from("surat_masuk").select("*", { count: "exact", head: true }),
          supabase.from("surat_keluar").select("*", { count: "exact", head: true }),
          supabase.from("surat_keputusan").select("*", { count: "exact", head: true }),
          supabase.from("surat_tugas").select("*", { count: "exact", head: true }),
          supabase.from("kontrak").select("*", { count: "exact", head: true }),
        ]);

        const data = {
          suratMasuk: suratMasuk.count || 0,
          suratKeluar: suratKeluar.count || 0,
          suratKeputusan: suratKeputusan.count || 0,
          suratTugas: suratTugas.count || 0,
          kontrak: kontrak.count || 0,
        };

        data.totalArsip =
          data.suratMasuk +
          data.suratKeluar +
          data.suratKeputusan +
          data.suratTugas +
          data.kontrak;

        if (isMounted) {
          setStats(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard">
          <h3>Memuat Dashboard...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard">

        <div className="dashboard-header">

          <div className="dashboard-title">
            <h1>Dashboard</h1>

            <p>
              LP2M Universitas Negeri Makassar
              <span> • </span>
              Tahun Arsip {new Date().getFullYear()}
            </p>
          </div>

          <div className="dashboard-actions">

        

            <button
              className="btn-primary"
              onClick={() => navigate("/upload-arsip")}
            >
              <i className="ti ti-plus"></i>
              Tambah Arsip
            </button>

          </div>

        </div>

        <StatCards stats={stats} />

        <div className="dashboard-overview">

          <DashboardCharts stats={stats} />

          <RecentArchives />


        </div>

      </div>
    </div>
  );
}

export default Dashboard;