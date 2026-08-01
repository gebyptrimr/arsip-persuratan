import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

// Konfigurasi tampilan kartu kategori dokumen di halaman Kebijakan & Perencanaan
// jenis → dipakai untuk query ke tabel arsip_kebijakan (kolom "jenis")
// path → tujuan saat kartu diklik / tombol "Lihat data" ditekan
const categoryConfig = [
  {
    jenis: "renstra",
    label: "Renstra LPPM",
    icon: "ti-file-analytics",
    bg: "#E7F3EA",
    fg: "#1E8E4F",
    path: "/klasifikasi/kebijakan/renstra-lppm",
  },
  {
    jenis: "roadmap",
    label: "Roadmap",
    icon: "ti-building-bank",
    bg: "#E9EEFB",
    fg: "#2E5AAC",
    path: "/klasifikasi/kebijakan/roadmap",
  },
];

function CategoryCard({ item }) {
  const navigate = useNavigate();
  const clickable = Boolean(item.path);

  return (
    <div
      onClick={() => clickable && navigate(item.path)}
      role={clickable ? "button" : undefined}
      tabIndex={clickable ? 0 : undefined}
      onKeyDown={(e) => {
        if (clickable && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          navigate(item.path);
        }
      }}
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px 18px",
        boxShadow: "0 1px 2px rgba(22,35,63,0.06)",
        cursor: clickable ? "pointer" : "default",
        transition: "box-shadow .15s ease, transform .1s ease",
        outline: "none",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
      className="category-card"
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "10px",
          background: item.bg,
          color: item.fg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <i className={`ti ${item.icon}`} style={{ fontSize: "18px" }} />
      </div>

      <div
        style={{
          fontSize: "18px",
          fontWeight: "700",
          color: "#163B67",
          marginTop: "8px",
          marginBottom: "10px",
          textAlign: "center",
        }}
      >
        {item.label}
      </div>

      <div style={{ fontSize: "22px", fontWeight: 500, color: item.fg }}>
        {item.count === null ? "-" : item.count.toLocaleString("id-ID")}
      </div>

      <div style={{ fontSize: "11px", color: "#8B93A8", marginTop: "4px" }}>
        Arsip
      </div>

      <div
        style={{
          fontSize: "11.5px",
          color: item.trendPositive ? "#1E8E4F" : "#8B93A8",
          marginTop: "8px",
        }}
      >
        {item.count === null ? "Memuat..." : item.trend}
      </div>

      {clickable && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            fontSize: "11px",
            color: item.fg,
            marginTop: "8px",
            fontWeight: 500,
          }}
        >
          Lihat data
          <i className="ti ti-arrow-right" style={{ fontSize: "12px" }} />
        </div>
      )}
    </div>
  );
}

export default function KebijakanPage() {
  const navigate = useNavigate();
  const [cards, setCards] = useState(
    categoryConfig.map((c) => ({ ...c, count: null, trend: "", trendPositive: true }))
  );

  useEffect(() => {
    loadCounts();
  }, []);

  async function loadCounts() {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    const results = await Promise.all(
      categoryConfig.map(async (item) => {
        const totalRes = await supabase
          .from("arsip_kebijakan")
          .select("*", { count: "exact", head: true })
          .eq("jenis", item.jenis);

        const monthRes = await supabase
          .from("arsip_kebijakan")
          .select("*", { count: "exact", head: true })
          .eq("jenis", item.jenis)
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
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <p style={{ fontSize: "11px", color: "#8B93A8", margin: 0 }}>
            03.02.01
          </p>

          <h2
            style={{
              margin: "2px 0 0",
              color: "#16233F",
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            KEBIJAKAN, RENSTRA, RENJA LPPM
          </h2>
        </div>

        <button
          onClick={() => navigate("/kebijakan")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "#163b67",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            padding: "10px 18px",
            fontSize: "14px",
            fontWeight: 500,
            cursor: "pointer",
            transition: "0.2s",
          }}
        >
          <i className="ti ti-plus"></i>
          Tambah Arsip
        </button>
      </div>

      {/* Card */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "14px",
        }}
      >
        {cards.map((item) => (
          <CategoryCard key={item.label} item={item} />
        ))}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

        .category-card:hover {
          box-shadow: 0 4px 12px rgba(22,35,63,0.12) !important;
          transform: translateY(-2px);
        }

        .category-card:focus-visible {
          box-shadow: 0 0 0 2px #4DB6F5 !important;
        }

        button:hover {
          opacity: .92;
        }
      `}</style>
    </div>
  );
}