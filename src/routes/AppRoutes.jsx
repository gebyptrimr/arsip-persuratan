import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import SuratMasuk from "../pages/SuratMasuk/SuratMasuk";
import SuratKeluar from "../pages/SuratKeluar/SuratKeluar";
import SuratTugas from "../pages/SuratTugas/SuratTugas";
import SuratKeputusan from "../pages/SuratKeputusan/SuratKeputusan";
import Kontrak from "../pages/Kontrak/Kontrak";

import UploadArsip from "../pages/UploadArsip/UploadArsip";
import KontrakTambah from "../pages/UploadArsip/KontrakTambah";
import SKTambah from "../pages/UploadArsip/SKTambah";
import SuratTugasTambah from "../pages/UploadArsip/SuratTugasTambah";
import RetensiArsip from "../pages/RetensiArsip/RetensiArsip";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/surat-masuk" element={<SuratMasuk />} />
        <Route path="/surat-keluar" element={<SuratKeluar />} />
        <Route path="/surat-tugas" element={<SuratTugas />} />
        <Route path="/sk" element={<SuratKeputusan />} />
        <Route path="/kontrak" element={<Kontrak />} />

        <Route path="/upload-arsip" element={<UploadArsip />} />
        <Route
          path="/upload-arsip/kontrak-tambah"
          element={<KontrakTambah />}
        />
        <Route path="/upload-arsip/sk-tambah" element={<SKTambah />} />
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