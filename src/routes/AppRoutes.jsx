import { Routes, Route } from "react-router-dom";

import MainLayout from "../components/layout/MainLayout";

// Users
import Users from "../pages/Users/Users";
// Auth
import Login from "../pages/Login/Login";

// Dashboard
import Dashboard from "../pages/Dashboard/Dashboard";

// Master Arsip
import TambahAkun from "../pages/TambahAkun/TambahAkun.jsx"; // sesuaikan path
import EditAkun from "../pages/EditAkun/EditAkun.jsx";

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
import SuratKeluarTambah from "../pages/UploadArsip/SuratKeluarTambah";
import SuratMasukTambah from "../pages/UploadArsip/SuratMasukTambah";

//Edit Surat
import SuratMasukEdit from "../pages/EditSurat/SuratMasukEdit";
import SuratKeluarEdit from "../pages/EditSurat/SuratKeluarEdit";
import SKEdit from "../pages/EditSurat/SKEdit.jsx";
import SuratTugasEdit from "../pages/EditSurat/SuratTugasEdit.jsx";

// Retensi
import RetensiArsip from "../pages/RetensiArsip/RetensiArsip";

//Kebijakan dan perencanaan
import Kebijakan from "../pages/Kebijakan/Kebijakan";
import Peraturan from "../pages/Kebijakan/Peraturan";
import UploadArsipKebijakan from "../pages/UploadArsip/UploadArsipKebijakan";
import UploadArsipPeraturan from "../pages/UploadArsip/UploadArsipPeraturan.jsx";
import RenstraTambah from "../pages/UploadArsip/RenstraTambah";
import RoadmapTambah from "../pages/UploadArsip/RoadmapTambah";
import RenstraLppm from "../pages/Kebijakan/renstra-lppm";
import Roadmap from "../pages/Kebijakan/roadmap";
import SKReviewerTambah from "../pages/UploadArsip/skReviewerTambah.jsx";
import SKLppmTambah from "../pages/UploadArsip/skLppmTambah.jsx";
import SKReviewer from "../pages/Kebijakan/sk-reviewer.jsx";
import SKLppm from "../pages/Kebijakan/sk-lppm.jsx";

//Kebijakan dan perencanaan
import Anggaran from "../pages/Keuangan/Anggaran";
import LaporanKeuangan from "../pages/Keuangan/LaporanKeuangan";
import Dipa from "../pages/Keuangan/dipa";
import Rka from "../pages/Keuangan/rka";
import Rkakl from "../pages/Keuangan/rkakl";
import SpjHibah from "../pages/Keuangan/spj-hibah";
import Kwitansi from "../pages/Keuangan/kwitansi";
import UploadArsipAnggaran from "../pages/UploadArsip/UploadArsipAnggaran";
import UploadArsipLaporanKeuangan from "../pages/UploadArsip/UploadArsipLaporanKeuangan";

function AppRoutes() {
  return (
    <Routes>
      {/* LOGIN (tanpa sidebar) */}
      <Route path="/" element={<Login />} />
      <Route path="/users/tambah" element={<TambahAkun />} />

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

        {/* Edit Surat */}
        <Route
          path="/upload-arsip/surat-masuk-edit/:id"
          element={<SuratMasukEdit />}
        />
        <Route
          path="/upload-arsip/surat-keluar-edit/:id"
          element={<SuratKeluarEdit />}
        />
        <Route path="/upload-arsip/sk-edit/:id" element={<SKEdit />} />
        <Route
          path="/upload-arsip/surat-tugas-edit/:id"
          element={<SuratTugasEdit />}
        />

        {/* Upload Arsip */}
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

        <Route
          path="/upload-arsip/surat-keluar-tambah"
          element={<SuratKeluarTambah />}
        />

        <Route
          path="/upload-arsip/surat-masuk-tambah"
          element={<SuratMasukTambah />}
        />

        <Route path="/retensi" element={<RetensiArsip />} />

        <Route path="/users/edit/:id" element={<EditAkun />} />

        {/* Kebijakan */}
        <Route path="/uploadkebijakan" element={<UploadArsipKebijakan />} />
        <Route path="/uploadperaturan" element={<UploadArsipPeraturan />} />
        <Route path="/kebijakan/renstra-tambah" element={<RenstraTambah />} />
        <Route path="/kebijakan/roadmap-tambah" element={<RoadmapTambah />} />
        <Route path="/peraturan/sk-reviewer-tambah" element={<SKReviewerTambah />} />
        <Route path="/peraturan/sk-lppm-tambah" element={<SKLppmTambah />} />
        <Route path="/klasifikasi/kebijakan" element={<Kebijakan />} />
        <Route path="/klasifikasi/peraturan" element={<Peraturan />} />
        <Route path="/klasifikasi/kebijakan/renstra-lppm" element={<RenstraLppm />} />
        <Route path="/klasifikasi/kebijakan/roadmap" element={<Roadmap />} />
        <Route path="/klasifikasi/peraturan/sk-reviewer" element={<SKReviewer />} />
        <Route path="/klasifikasi/peraturan/sk-lppm" element={<SKLppm />} />

        {/* Keuangan */}
        <Route path="/uploadanggaran" element={<UploadArsipAnggaran />} />
        <Route path="/uploadlaporankeuangan" element={<UploadArsipLaporanKeuangan />} />
        <Route path="/klasifikasi/anggaran" element={<Anggaran />} />
        <Route path="/klasifikasi/laporankeuangan" element={<LaporanKeuangan />} />
        <Route path="/klasifikasi/keuangan/dipa" element={<Dipa />} />
        <Route path="/klasifikasi/keuangan/rka" element={<Rka />} />
        <Route path="/klasifikasi/keuangan/rkakl" element={<Rkakl />} />
        <Route path="/klasifikasi/keuangan/spj-hibah" element={<SpjHibah />} />
        <Route path="/klasifikasi/keuangan/kwitansi" element={<Kwitansi />} />


      </Route>
    </Routes>
  );
}

export default AppRoutes;