import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

function RecentArchives() {
  const [archives, setArchives] = useState([]);

  useEffect(() => {
    let isMounted = true;

    async function loadArchives() {
      try {
        const [
          suratMasuk,
          suratKeluar,
          suratKeputusan,
          suratTugas,
          kontrak,
        ] = await Promise.all([
          supabase
            .from("surat_masuk")
            .select("id, nomor_surat, perihal, created_at"),

          supabase
            .from("surat_keluar")
            .select("id, nomor_surat, perihal, created_at"),

          supabase
            .from("surat_keputusan")
            .select("id, nomor_sk, judul_sk, created_at"),

          supabase
            .from("surat_tugas")
            .select("id, nomor_st, tujuan_tugas, created_at"),

          supabase
            .from("kontrak")
            .select("id, nomor_kontrak, pihak_kedua, created_at"),
        ]);

        const semuaArsip = [
          ...(suratMasuk.data || []).map((item) => ({
            id: item.id,
            jenis: "Surat Masuk",
            nomor: item.nomor_surat,
            perihal: item.perihal,
            tanggal: item.created_at,
            status: "Baru",
          })),

          ...(suratKeluar.data || []).map((item) => ({
            id: item.id,
            jenis: "Surat Keluar",
            nomor: item.nomor_surat,
            perihal: item.perihal,
            tanggal: item.created_at,
            status: "Baru",
          })),

          ...(suratKeputusan.data || []).map((item) => ({
            id: item.id,
            jenis: "Surat Keputusan",
            nomor: item.nomor_sk,
            perihal: item.judul_sk,
            tanggal: item.created_at,
            status: "Baru",
          })),

          ...(suratTugas.data || []).map((item) => ({
            id: item.id,
            jenis: "Surat Tugas",
            nomor: item.nomor_st,
            perihal: item.tujuan_tugas,
            tanggal: item.created_at,
            status: "Baru",
          })),

          ...(kontrak.data || []).map((item) => ({
            id: item.id,
            jenis: "Kontrak",
            nomor: item.nomor_kontrak,
            perihal: item.pihak_kedua,
            tanggal: item.created_at,
            status: "Baru",
          })),
        ];

        semuaArsip.sort(
          (a, b) => new Date(b.tanggal) - new Date(a.tanggal)
        );

        if (isMounted) {
          setArchives(semuaArsip.slice(0, 5));
        }
      } catch (error) {
        console.error(error);
      }
    }

    loadArchives();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="recent-card">
      <div className="recent-header">
        <h3>Arsip Terbaru</h3>

        <button className="recent-link">
          Lihat Semua
          <i className="ti ti-arrow-right"></i>
        </button>
      </div>

      <div className="table-responsive">
        <table className="recent-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Jenis Arsip</th>
              <th>Nomor</th>
              <th>Perihal</th>
              <th>Tanggal</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {archives.map((item, index) => (
              <tr key={`${item.jenis}-${item.id}`}>
                <td>{index + 1}</td>

                <td>{item.jenis}</td>

                <td className="archive-number">
                  {item.nomor}
                </td>

                <td>{item.perihal}</td>

                <td>
                  {new Date(item.tanggal).toLocaleDateString("id-ID")}
                </td>

                <td>
                  <span className="status-badge">
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}

            {archives.length === 0 && (
              <tr>
                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  Belum ada arsip.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentArchives;