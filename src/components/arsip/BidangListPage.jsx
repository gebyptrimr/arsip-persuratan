import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { ARSIP_CONFIG, BIDANG_CONFIG } from "../../config/arsipConfig";

function CategoryCard({ item }) {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(item.listRoute)}
      style={{
        background: "#fff", borderRadius: "12px", padding: "20px 18px",
        boxShadow: "0 1px 2px rgba(22,35,63,0.06)", cursor: "pointer",
        transition: "box-shadow .15s ease, transform .1s ease",
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", textAlign: "center",
      }}
      className="category-card"
    >
      <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: item.bg, color: item.fg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px" }}>
        <i className={`ti ${item.icon}`} style={{ fontSize: "18px" }} />
      </div>
      <div style={{ fontSize: "18px", fontWeight: "700", color: "#163B67", marginTop: "8px", marginBottom: "10px" }}>
        {item.jenisLabel}
      </div>
      <div style={{ fontSize: "22px", fontWeight: 500, color: item.fg }}>
        {item.count === null ? "-" : item.count.toLocaleString("id-ID")}
      </div>
      <div style={{ fontSize: "11px", color: "#8B93A8", marginTop: "4px" }}>Arsip</div>
      <div style={{ fontSize: "11.5px", color: item.trendPositive ? "#1E8E4F" : "#8B93A8", marginTop: "8px" }}>
        {item.count === null ? "Memuat..." : item.trend}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: item.fg, marginTop: "8px", fontWeight: 500 }}>
        Lihat data <i className="ti ti-arrow-right" style={{ fontSize: "12px" }} />
      </div>
    </div>
  );
}

export default function BidangListPage({ bidangKey }) {
  const navigate = useNavigate();
  const bidang = BIDANG_CONFIG[bidangKey];

  if (!bidang) {
    return <div style={{ padding: 24, color: "#DC2626" }}>Config bidang "{bidangKey}" tidak ditemukan.</div>;
  }

  const categoryConfig = bidang.jenisKeys.map((key) => ARSIP_CONFIG[key]);
  const [cards, setCards] = useState(
    categoryConfig.map((c) => ({ ...c, count: null, trend: "", trendPositive: true }))
  );

  useEffect(() => { loadCounts(); }, [bidangKey]);

  async function loadCounts() {
    const { data: klasifikasi } = await supabase
      .from("klasifikasi_arsip").select("id").eq("kode", bidang.kode).single();
    if (!klasifikasi) return;

    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const results = await Promise.all(
      categoryConfig.map(async (item) => {
        const totalRes = await supabase
          .from("arsip")
          .select("*", { count: "exact", head: true })
          .eq("klasifikasi_id", klasifikasi.id)
          .eq("metadata->>jenis", item.jenis);

        const monthRes = await supabase
          .from("arsip")
          .select("*", { count: "exact", head: true })
          .eq("klasifikasi_id", klasifikasi.id)
          .eq("metadata->>jenis", item.jenis)
          .gte("created_at", firstDayOfMonth);

        const total = totalRes.error ? 0 : totalRes.count || 0;
        const monthCount = monthRes.error ? 0 : monthRes.count || 0;

        return {
          ...item,
          count: total,
          trend: monthCount > 0 ? `+${monthCount} bulan ini` : "Belum ada bulan ini",
          trendPositive: monthCount > 0,
        };
      })
    );
    setCards(results);
  }

  return (
    <div style={{ fontFamily: "DM Sans", padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "16px" }}>
        <div>
          <p style={{ fontSize: "11px", color: "#8B93A8", margin: 0 }}>{bidang.kode}</p>
          <h2 style={{ margin: "2px 0 0", color: "#16233F", fontSize: "18px", fontWeight: 600 }}>
            {bidang.title}
          </h2>
        </div>
        <button
          onClick={() => navigate(bidang.tambahRoute)}
          style={{ display: "flex", alignItems: "center", gap: "8px", background: "#163b67", color: "#fff", border: "none", borderRadius: "10px", padding: "10px 18px", fontSize: "14px", fontWeight: 500, cursor: "pointer" }}
        >
          <i className="ti ti-plus"></i> Tambah Arsip
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "14px" }}>
        {cards.map((item) => <CategoryCard key={item.jenis} item={item} />)}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');
        .category-card:hover { box-shadow: 0 4px 12px rgba(22,35,63,0.12) !important; transform: translateY(-2px); }
      `}</style>
    </div>
  );
}