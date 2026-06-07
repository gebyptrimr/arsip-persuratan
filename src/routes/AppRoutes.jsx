import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import SuratMasuk from "../pages/SuratMasuk/SuratMasuk";
import SuratKeluar from "../pages/SuratKeluar/SuratKeluar";
import Kontrak from "../pages/Kontrak/Kontrak";
import SK from "../pages/SK/SK";
import SuratTugas from "../pages/SuratTugas/SuratTugas";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/surat-masuk" element={<SuratMasuk />} />
        <Route path="/surat-keluar" element={<SuratKeluar />} />
        <Route path="/kontrak" element={<Kontrak />} />
        <Route path="/sk" element={<SK />} />
        <Route path="/surat-tugas" element={<SuratTugas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;