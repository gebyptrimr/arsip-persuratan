import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import SuratMasuk from "../pages/SuratMasuk/SuratMasuk";
import SuratKeluar from "../pages/SuratKeluar/SuratKeluar";
import Kontrak from "../pages/Kontrak/Kontrak";
import SK from "../pages/SK/SK";
import SuratTugas from "../pages/SuratTugas/SuratTugas";
import UploadArsip from "../pages/UploadArsip/UploadArsip";
import KontrakTambah from "../pages/UploadArsip/KontrakTambah";
import SKTambah from "../pages/UploadArsip/SKTambah";
import SuratTugasTambah from "../pages/UploadArsip/SuratTugasTambah";

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
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
