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

//import SuratMasuk from "../pages/SuratMasuk/SuratMasuk";
//import SuratKeluar from "../pages/SuratKeluar/SuratKeluar";
import SuratTugas from "../pages/SuratTugas/SuratTugas";
import SuratKeputusan from "../pages/SuratKeputusan/SuratKeputusan";
import Kontrak from "../pages/Kontrak/Kontrak";

// Upload Arsip
import UploadArsip from "../pages/UploadArsip/UploadArsip";
import KontrakTambah from "../pages/UploadArsip/KontrakTambah";
import SKTambah from "../pages/UploadArsip/SKTambah";
import SuratTugasTambah from "../pages/UploadArsip/SuratTugasTambah";
//import SuratKeluarTambah from "../pages/UploadArsip/SuratKeluarTambah";
//import SuratMasukTambah from "../pages/UploadArsip/SuratMasukTambah";

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
import DipaTambah from "../pages/UploadArsip/DipaTambah.jsx";
import RkaTambah from "../pages/UploadArsip/RkaTambah";
import RkaklTambah from "../pages/UploadArsip/RkaklTambah";
import SpjHibahTambah from "../pages/UploadArsip/SpjHibahTambah";
import KwitansiTambah from "../pages/UploadArsip/KwitansiTambah";

//Penelitian
import HibahPenelitianInternal from "../pages/Penelitian/HibahPenelitianInternal";
import HibahPenelitianEksternal from "../pages/Penelitian/HibahPenelitianEksternal";
import KerjaSamaPenelitian from "../pages/Penelitian/KerjaSamaPenelitian";
import PropsalPenelitianInternal from "../pages/Penelitian/proposal-penelitian-internal";
import SkPenelitian from "../pages/Penelitian/sk-penelitian";
import KontrakPenelitian from "../pages/Penelitian/kontrak-penelitian";
import LaporanPenelitian from "../pages/Penelitian/laporan-penelitian";
import UploadPenelitianInternal from "../pages/UploadArsip/UploadPenelitianInternal";
import ProposalPenelitianInternalTambah from "../pages/UploadArsip/ProposalPenelitianInternalTambah";
import SkPenelitianInternalTambah from "../pages/UploadArsip/SkPenelitianInternalTambah";
import KontrakPenelitianTambah from "../pages/UploadArsip/KontrakPenelitianTambah";
import LaporanPenelitianTambah from "../pages/UploadArsip/LaporanPenelitianTambah";
import ProposalPenelitianEksternal from "../pages/Penelitian/proposal-penelitian-eksternal";
import KontrakInduk from "../pages/Penelitian/kontrak-induk";
import KontrakTurunan from "../pages/Penelitian/kontrak-turunan";
import LaporanKemajuan from "../pages/Penelitian/laporan-kemajuan";
import LaporanAkhir from "../pages/Penelitian/laporan-akhir";
import UploadPenelitianEksternal from "../pages/UploadArsip/UploadPenelitianEksternla";
import ProposalPenelitianEksternalTambah from "../pages/UploadArsip/ProposalPenelitianEksternalTambah";
import KontrakIndukPenelitianTambah from "../pages/UploadArsip/KontrakIndukPenelitianTambah";
import KontrakTurunanPenelitianTambah from "../pages/UploadArsip/KontrakTurunanPenelitianTambah";
import LaporanKemajuanPenelitianTambah from "../pages/UploadArsip/LaporanKemajuanPenelitianTambah";
import LaporanAkhirPenelitianTambah from "../pages/UploadArsip/LaporanAkhirPenelitianTambah";
import MoU from "../pages/Penelitian/mou";
import MoA from "../pages/Penelitian/moa";
import KontrakKerjasama from "../pages/Penelitian/kontrak-kerjasama";
import UploadKerjaSama from "../pages/UploadArsip/UploadKerjaSama";
import MouTambah from "../pages/UploadArsip/MouTambah";
import MoaTambah from "../pages/UploadArsip/MoaTambah";
import KontrakKerjaSamaTambah from "../pages/UploadArsip/KontrakKerjaSamaTambah";

//Pengabdian
import HibahPengabdianInternal from "../pages/Pengabdian/HibahPengabdianInternal";
import HibahPengabdianEksternal from "../pages/Pengabdian/HibahPengabdianEksternal";
import ProposalPengabdianInternal from "../pages/Pengabdian/proposal-pengabdian-internal";
import SkPengabdian from "../pages/Pengabdian/sk-pengabdian";
import KontrakPengabdian from "../pages/Pengabdian/kontrak-pengabdian";
import LaporanPengabdian from "../pages/Pengabdian/laporan-pengabdian";
import ProposalPenelitianInternal from "../pages/Penelitian/proposal-penelitian-internal";
import UploadPengabdianInternal from "../pages/UploadArsip/UploadPengabdianInternal";
import ProposalPengabdianInternalTambah from "../pages/UploadArsip/ProposalPengabdianInternalTambah";
import SKPengabdianTambah from "../pages/UploadArsip/SKPengabdianTambah";
import KontrakPengabdianTambah from "../pages/UploadArsip/KontrakPengabdianTambah";
import LaporanPengabdianTambah from "../pages/UploadArsip/LaporanPengabdianTambah";
import proposalPengabdianeksternal from "../pages/Pengabdian/proposal-pengabdian-eksternal";
import KontrakIndukPengabdian from "../pages/Pengabdian/kontrak-induk-pengabdian";
import KontrakTurunanPengabdian from "../pages/Pengabdian/kontrak-turunan-pengabdian";
import LaporanKemajuanPengabdian from "../pages/Pengabdian/laporan-kemajuan-pengabdian";
import LaporanAkhirPengabdian from "../pages/Pengabdian/laporan-akhir-pengabdian";
import UploadPengabdianEksternal from "../pages/UploadArsip/UploadPengabdianEKsternal";
import ProposalPengabdianEksternalTambah from "../pages/UploadArsip/ProposalPengabdianEksternalTambah";
import KontrakTurunanPengabdianTambah from "../pages/UploadArsip/KontrakTurunanPengabdianTambah";
import KontrakIndukPengabdianTambah from "../pages/UploadArsip/KontrakIndukPengabdianTambah";
import LaporanKemajuanPengabdianTambah from "../pages/UploadArsip/LaporanKemajuanPengabdianTambah";
import LaporanAkhirPengabdianTambah from "../pages/UploadArsip/LaporanAkhirPengabdianTambah";

//Publikasi
import JurnalHkiPaten from "../pages/Publikasi/JurnalHkiPaten";
import SkHki from "../pages/Publikasi/sk-hki";
import BuktiPublikasi from "../pages/Publikasi/bukti-publikasi";
import SertifikatPaten from "../pages/Publikasi/sertifikat-paten";
import UploadPublikasi from "../pages/UploadArsip/UploadPublikasi.jsx";
import BuktiPublikasiTambah from "../pages/UploadArsip/BuktiPublikasiTambah.jsx";
import SertifikatPatenTambah from "../pages/UploadArsip/SertifikatPatenTambah.jsx";
import SkHkiTambah from "../pages/UploadArsip/SkHkiTambah.jsx";

//Administrasi Umum
import KepegawaianLPPM from "../pages/AdministrasiUmum/KepegawaianLppm";
import PersuratanLPPM from "../pages/AdministrasiUmum/PersuratanLPPM";
import SaranPrasaranaLPPM from "../pages/AdministrasiUmum/SaranaPrasaranaLPPM";
import SkTim from "../pages/AdministrasiUmum/sk-tim";
import Absensi from "../pages/AdministrasiUmum/absensi";
import SKP from "../pages/AdministrasiUmum/skp.jsx";
import SuratMasuk from "../pages/AdministrasiUmum/surat-masuk"
import SuratKeluar from "../pages/AdministrasiUmum/surat-keluar";
import BA from "../pages/AdministrasiUmum/ba";
import BaSerahTerimaBarang from "../pages/AdministrasiUmum/ba-serah-terima-barang";
import UploadKepegawaian from "../pages/UploadArsip/UploadKepegawaian";
import UploadPersuratan from "../pages/UploadArsip/UploadPersuratan";
import UploadSaranaPrasarana from "../pages/UploadArsip/UploadSaranaPrasarana";
import SkTimTambah from "../pages/UploadArsip/SkTimTambah";
import AbsensiTambah from "../pages/UploadArsip/AbsensiTambah";
import SKPTambah from "../pages/UploadArsip/SKPTambah";
import SuratMasukPersuratanTambah from "../pages/UploadArsip/SuratMasukPersuratanTambah";
import SuratKeluarPersuratanTambah from "../pages/UploadArsip/SuratKeluarPersuratan";
import BaTambah from "../pages/UploadArsip/BATambah";
import SerahTerimaBarangTambah from "../pages/UploadArsip/SerahTerimaTambah";

//Lain lain
import KegiatanSosialisasiWorkshopFGD from "../pages/LainLain/KegiatanSosialisasiWorkshopFGD";
import Undangan from "../pages/LainLain/undangan";
import Notulen from "../pages/LainLain/notulen";
import Foto from "../pages/LainLain/foto";
import Materi from "../pages/LainLain/materi";
import UploadLainnya from "../pages/UploadArsip/UploadLainnya";
import UndanganTambah from "../pages/UploadArsip/UndanganTambah";
import NotulenTambah from "../pages/UploadArsip/NotulenTambah";
import FotoTambah from "../pages/UploadArsip/FotoTambah";
import MateriTambah from "../pages/UploadArsip/MateriTambah";



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
        {/* <Route path="/surat-masuk" element={<SuratMasuk />} /> */}
        {/* <Route path="/surat-masuk" element={<SuratMasuk />} /> */}
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
        
        {/* <Route path="/upload-arsip/surat-keluar-tambah" element={<SuratKeluarTambah />}/> */}
        {/* <Route path="/upload-arsip/surat-masuk-tambah"element={<SuratMasukTambah />}/> */}
        <Route path="/retensi" element={<RetensiArsip />} />
        <Route path="/users/edit/:id" element={<EditAkun />} />

        {/* Kebijakan */}
        <Route path="/uploadkebijakan" element={<UploadArsipKebijakan />} />
        <Route path="/uploadperaturan" element={<UploadArsipPeraturan />} />
        <Route path="/kebijakan/renstra-tambah" element={<RenstraTambah />} />
        <Route path="/kebijakan/roadmap-tambah" element={<RoadmapTambah />} />
        <Route path="/peraturan/sk-reviewer-tambah" element={<SKReviewerTambah />}/>
        <Route path="/peraturan/sk-lppm-tambah" element={<SKLppmTambah />} />
        <Route path="/klasifikasi/kebijakan" element={<Kebijakan />} />
        <Route path="/klasifikasi/peraturan" element={<Peraturan />} />
        <Route path="/klasifikasi/kebijakan/renstra-lppm"element={<RenstraLppm />}/>
        <Route path="/klasifikasi/kebijakan/roadmap" element={<Roadmap />} />
        <Route path="/klasifikasi/peraturan/sk-reviewer"element={<SKReviewer />}/>
        <Route path="/klasifikasi/peraturan/sk-lppm" element={<SKLppm />} />

        {/* Keuangan */}
        <Route path="/uploadanggaran" element={<UploadArsipAnggaran />} />
        <Route path="/uploadlaporankeuangan"element={<UploadArsipLaporanKeuangan />}/>
        <Route path="/klasifikasi/anggaran" element={<Anggaran />} />
        <Route path="/klasifikasi/laporan-keuangan"element={<LaporanKeuangan />}/>
        <Route path="/klasifikasi/keuangan/dipa" element={<Dipa />} />
        <Route path="/klasifikasi/keuangan/rka" element={<Rka />} />
        <Route path="/klasifikasi/keuangan/rkakl" element={<Rkakl />} />
        <Route path="/klasifikasi/keuangan/spj-hibah" element={<SpjHibah />} />
        <Route path="/klasifikasi/keuangan/kwitansi" element={<Kwitansi />} />
        <Route path="/anggaran/dipa-tambah" element={<DipaTambah />} />
        <Route path="/anggaran/rka-tambah" element={<RkaTambah />} />
        <Route path="/anggaran/rkakl-tambah" element={<RkaklTambah />} />
        <Route path="/laporankeuangan/spjhibah-tambah" element={<SpjHibahTambah />} />
        <Route path="/laporankeuangan/kwitansi-tambah" element={<KwitansiTambah />} />

        {/* Penelitian */}
        <Route
          path="/klasifikasi/hibah-penelitian-internal"element={<HibahPenelitianInternal />}/>
        <Route
          path="/klasifikasi/hibah-penelitian-eksternal"element={<HibahPenelitianEksternal />}/>
        <Route
          path="/klasifikasi/kerja-sama-penelitian"element={<KerjaSamaPenelitian />}/>
        <Route
          path="/klasifikasi/penelitian/proposal-penelitian-internal"element={<PropsalPenelitianInternal />}/>
        <Route
          path="/klasifikasi/penelitian/sk-penelitain"element={<SkPenelitian />}/>
        <Route
          path="/klasifikasi/penelitian/kontrak-penelitain"element={<KontrakPenelitian />}/>
        <Route
          path="/klasifikasi/penelitian/laporan-penelitain"element={<LaporanPenelitian />}/>
        <Route
          path="/upload-hibah-penelitian-internal"element={<UploadPenelitianInternal />}/>
        <Route
          path="/kebijakan/proposal-penelitian-inernal-tambah"element={<ProposalPenelitianInternalTambah />}/>
        <Route
          path="/kebijakan/sk-penelitian-tambah"element={<SkPenelitianInternalTambah />}/>
        <Route
          path="/kebijakan/kontrak-penelitian-tambah"element={<KontrakPenelitianTambah />}/>
        <Route
          path="/kebijakan/laporan-penelitian-tambah" element={<LaporanPenelitianTambah />}/>
        <Route
          path="/klasifikasi/penelitian/proposal-penelitian-eksternal"element={<ProposalPenelitianEksternal />}/>
        <Route
          path="/klasifikasi/penelitian/kontrak-induk"element={<KontrakInduk />}/>
        <Route
          path="/klasifikasi/penelitian/kontrak-turunan"element={<KontrakTurunan />}/>
        <Route
          path="/klasifikasi/penelitian/laporan-kemajuan"element={<LaporanKemajuan />}/>
        <Route
          path="/klasifikasi/penelitian/laporan-akhir"element={<LaporanAkhir />}/>
        <Route
          path="/upload-hibah-penelitian-eksternal"element={<UploadPenelitianEksternal />}/>
        <Route
          path="/kebijakan/proposal-penelitian-eksternal-tambah"element={<ProposalPenelitianEksternalTambah />}/>
        <Route
          path="/kebijakan/kontrak-induk-penelitian-tambah"element={<KontrakIndukPenelitianTambah />}/>
        <Route
          path="/kebijakan/kontrak-turunan-penelitian-tambah"element={<KontrakTurunanPenelitianTambah />}/>
        <Route
          path="/kebijakan/laporan-kemajuan-penelitian-tambah"element={<LaporanKemajuanPenelitianTambah />}/>
        <Route
          path="/kebijakan/laporan-akhir-penelitian-tambah"element={<LaporanAkhirPenelitianTambah />}/>
        <Route path="/klasifikasi/penelitian/mou" element={<MoU />} />
        <Route path="/klasifikasi/penelitian/moa" element={<MoA />} />
        <Route
          path="/klasifikasi/penelitian/kontrak-kerjasamapenelitian"element={<KontrakKerjasama />}/>
        <Route path="/upload-kerja-sama" element={<UploadKerjaSama />} />
        <Route path="/kebijakan/mou-tambah" element={<MouTambah />} />
        <Route path="/kebijakan/moa-tambah" element={<MoaTambah />} />
        <Route
          path="/kebijakan/kontrak-kerjasama-tambah"element={<KontrakKerjaSamaTambah />}/>

        {/* Pengabdian */}
        <Route
          path="/klasifikasi/pengabdian-internal"element={<HibahPengabdianInternal />}/>
        <Route
          path="/klasifikasi/pengabdian-eksternal"element={<HibahPengabdianEksternal />}/>
        <Route
          path="/klasifikasi/pengabdian/proposal-pengabdian-internal"element={<ProposalPengabdianInternal />}/>
        <Route
          path="/klasifikasi/pengabdian/sk-pengabdian"element={<SkPengabdian />}/>
        <Route
          path="/klasifikasi/pengabdian/kontrak-pengabdian"element={<KontrakPengabdian />}/>
        <Route
          path="/klasifikasi/pengabdian/laporan-pengabdian"element={<LaporanPengabdian />}/>
        <Route
          path="/upload-hibah-pengabdian-internal"element={<UploadPengabdianInternal />}/>
        <Route
          path="/kebijakan/proposal-pengabdian-inernal-tambah"element={<ProposalPengabdianInternalTambah />}/>
        <Route
          path="/kebijakan/sk-pengabdian-tambah"element={<SKPengabdianTambah />}/>
        <Route
          path="/kebijakan/kontrak-pengabdian-tambah"element={<KontrakPengabdianTambah />}/>
        <Route path="/kebijakan/laporan-pengabdian-tambah"element={<LaporanPengabdianTambah />}/>
        <Route path="/klasifikasi/pengabdian/proposal-pengabdian-eksternal"element={<proposalPengabdianeksternal />}/>
        <Route path="/klasifikasi/pengabdian/kontrak-induk-pengabdian"element={<KontrakIndukPengabdian />}/>
        <Route path="/klasifikasi/pengabdian/laporan-turunan-pengabdian"element={<KontrakTurunanPengabdian />}/>
        <Route path="/klasifikasi/pengabdian/laporan-kemajuan-pengabdian"element={<LaporanKemajuanPengabdian />}/>
        <Route path="/klasifikasi/pengabdian/laporan-akhir-pengabdian"element={<LaporanAkhirPengabdian />}/>
        <Route path="/upload-hibah-pengabdian-eksternal"element={<UploadPengabdianEksternal />}/>
        <Route path="/kebijakan/proposal-pengabdian-eksternal-tambah"element={<ProposalPengabdianInternalTambah />}/>
        <Route path="/kebijakan/kontrak-induk-pengabdian-tambah"element={<KontrakIndukPengabdianTambah />}/>
        <Route path="/kebijakan/kontrak-turunan-pengabdian-tambah"element={<KontrakTurunanPengabdianTambah />}/>
        <Route path="/kebijakan/laporan-kemajuan-pengabdian-tambah"element={<LaporanKemajuanPengabdianTambah />}/>
        <Route path="/kebijakan/laporan-akhir-pengabdian-tambah"element={<LaporanAkhirPengabdianTambah />}/>

        {/* Publikasi */}
        <Route path="/klasifikasi/publikasi-hki"element={<JurnalHkiPaten />}/>
        <Route path="/klasifikasi/publikasi/sk-hki"element={<SkHki/>}/>
        <Route path="/klasifikasi/publikasi/sertifikat-paten"element={<SertifikatPaten/>}/>
        <Route path="/klasifikasi/publikasi/bukti-publikasi"element={<BuktiPublikasi/>}/>
        <Route path="/upload-jurnal-hki-paten" element={<UploadPublikasi/>}/>
        <Route path="/publikasi/sk-hki-tambah" element={<SkHkiTambah/>}/>
        <Route path="/publikasi/sertifikat-paten-tambah" element={<SertifikatPatenTambah/>}/>
        <Route path="/publikasi/bukti-publikasi-tambah" element={<BuktiPublikasiTambah/>}/>

        {/* Administrasi Umum */}
        <Route path="/klasifikasi/kepegawaian" element={<KepegawaianLPPM/>}/>
        <Route path="/klasifikasi/persuratan" element={<PersuratanLPPM/>}/>
        <Route path="/klasifikasi/sarana-prasarana" element={<SaranPrasaranaLPPM/>}/>
        <Route path="/klasifikasi/administrasi/sk-tim" element={<SkTim/>}/>
        <Route path="/klasifikasi/administrasi/absensi" element={<Absensi/>}/>
        <Route path="/klasifikasi/administrasi/skp" element={<SKP/>}/>
        <Route path="/klasifikasi/administrasi/surat-masuk" element={<SuratMasuk/>}/>
        <Route path="/klasifikasi/administrasi/surat-keluar" element={<SuratKeluar/>}/>
        <Route path="/klasifikasi/administrasi/ba" element={<BA/>}/>
        <Route path="/klasifikasi/administrasi/ba-serah-terima-barang" element={<BaSerahTerimaBarang/>}/>
        <Route path="/upload-kepegawaian-lppm" element={<UploadKepegawaian/>}/>
        <Route path="/upload-persuratan-lppm" element={<UploadPersuratan/>}/>
        <Route path="/upload-sarana-prasarana-lppm" element={<UploadSaranaPrasarana/>}/>
        <Route path="/kepegawaian/sk-tim-tambah" element={<SkTimTambah/>}/>
        <Route path="/kepegawaian/absensi-tambah" element={<AbsensiTambah/>}/>
        <Route path="/kepegawaian/skp-tambah" element={<SKPTambah/>}/>
        <Route path="/kepegawaian/surat-masuk-tambah" element={<SuratMasukPersuratanTambah/>}/>
        <Route path="/kepegawaian/surat-keluar-tambah" element={<SuratKeluarPersuratanTambah/>}/>
        <Route path="/kepegawaian/ba-tambah" element={<BaTambah/>}/>
        <Route path="/kepegawaian/serah-terima-barang-tambah" element={<SerahTerimaBarangTambah/>}/>

        {/* Lainnya */}
        <Route path="/klasifikasi/lainnya/kegiatan-sosialisasi-workshop-fgd" element={<KegiatanSosialisasiWorkshopFGD/>}/>
        <Route path="/klasifikasi/lainnya/undangan" element={<Undangan/>}/>
        <Route path="/klasifikasi/lainnya/notulen" element={<Notulen/>}/>
        <Route path="/klasifikasi/lainnya/foto" element={<Foto/>}/>
        <Route path="/klasifikasi/lainnya/materi" element={<Materi/>}/>
        <Route path="/upload-kegiatan-Sosialisasi-Workshop-fgd" element={<UploadLainnya/>}/>
        <Route path="/lainnya/undangan-tambah" element={<UndanganTambah/>}/>
        <Route path="/lainnya/notulen-tambah" element={<NotulenTambah/>}/>
        <Route path="/lainnya/foto-tambah" element={<FotoTambah/>}/>
        <Route path="/lainnya/materi-tambah" element={<MateriTambah/>}/>
        

      </Route>
    </Routes>
  );
}

export default AppRoutes;
