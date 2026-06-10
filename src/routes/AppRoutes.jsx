import { Routes, Route } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import SuratMasuk from "../pages/SuratMasuk/SuratMasuk";
import SuratKeluar from "../pages/SuratKeluar/SuratKeluar";
import SuratTugas from "../pages/SuratTugas/SuratTugas";
import SuratKeputusan from "../pages/SuratKeputusan/SuratKeputusan";
import Kontrak from "../pages/Kontrak/Kontrak";

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
      </Route>
    </Routes>
  );
}

export default AppRoutes;