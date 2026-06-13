import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

// Users
import Users from "../pages/Users/Users";
// Auth
import Login from "../pages/Login/Login";

// Dashboard
import Dashboard from "../pages/Dashboard/Dashboard";

// Master Arsip
import SuratMasuk from "../pages/SuratMasuk/SuratMasuk";
import SuratKeluar from "../pages/SuratKeluar/SuratKeluar";
import SuratTugas from "../pages/SuratTugas/SuratTugas";
import SuratKeputusan from "../pages/SuratKeputusan/SuratKeputusan";
import Kontrak from "../pages/Kontrak/Kontrak";

// Upload Arsip
import UploadArsip from "../pages/UploadArsip/UploadArsip";
import KontrakTambah from "../pages/UploadArsip/KontrakTambah";
import SKTambah from "../pages/UploadArsip/SKTambah";
import SuratTugasTambah from "../pages/UploadArsip/SuratTugasTambah";

// Retensi
import RetensiArsip from "../pages/RetensiArsip/RetensiArsip";

function AppRoutes() {
  return (
    <Routes>
      {/* LOGIN (tanpa sidebar) */}
      <Route path="/" element={<Login />} />

      {/* HALAMAN DENGAN SIDEBAR */}
      <Route element={<MainLayout />}>
        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        {/* Arsip */}
        <Route path="/surat-masuk" element={<SuratMasuk />} />
        <Route path="/surat-keluar" element={<SuratKeluar />} />
        <Route path="/surat-tugas" element={<SuratTugas />} />
        <Route path="/sk" element={<SuratKeputusan />} />
        <Route path="/kontrak" element={<Kontrak />} />

        {/* Upload Arsip */}
        <Route path="/upload-arsip" element={<UploadArsip />} />

        <Route
          path="/upload-arsip/kontrak-tambah"
          element={<KontrakTambah />}
        />

        <Route
          path="/upload-arsip/sk-tambah"
          element={<SKTambah />}
        />

        <Route
          path="/upload-arsip/surat-tugas-tambah"
          element={<SuratTugasTambah />}
        />

        <Route path="/retensi" element={<RetensiArsip />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;