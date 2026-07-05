import { useState, useEffect } from "react";
import logo from "../../assets/logo.jpeg";
import { useSearch } from "../../Contextt/SearchContext";
import { supabase } from "../../lib/supabase";

export default function Navbar({ sidebarCollapsed }) {
  const [search, setSearch] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const { setSearchTerm } = useSearch();

  useEffect(() => {
    setSearchTerm(search);
  }, [search, setSearchTerm]);

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { data } = await supabase
        .from("profiles")
        .select("nama, jabatan, role")
        .eq("id", user.id)
        .single();
      if (data) setUserProfile(data);
    }
    fetchProfile();
  }, []);

  function getInitials(nama = "") {
    return nama.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  }

  const avatarColor = userProfile?.role === "admin" ? "#163b67" : "#16a34a";

  return (
    <header style={{ position: "fixed", top: 0, left: sidebarCollapsed ? "72px" : "240px", right: 0, height: "68px", background: "#FFFFFF", borderBottom: "1px solid #E8EDF3", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", zIndex: 90, transition: "left 0.25s cubic-bezier(.4,0,.2,1)" }}>

      {/* LEFT */}
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <img src={logo} alt="Logo SIPAS" style={{ width: "42px", height: "42px", objectFit: "cover", borderRadius: "10px" }} />
        <div>
          <div style={{ fontSize: "20px", fontWeight: 700, color: "#0F2A4A", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.2 }}>SIPAS</div>
          <div style={{ fontSize: "15px", color: "#3d4349", fontFamily: "'DM Sans', sans-serif" }}>Sistem Pengelolaan Arsip Surat</div>
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
        {/* SEARCH */}
        <div style={{ position: "relative" }}>
          <i className="ti ti-search" style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#8DA4BF", fontSize: "16px" }} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nomor surat, perihal..."
            style={{ width: "320px", height: "40px", paddingLeft: "38px", paddingRight: "12px", border: "1px solid #E0E8F0", borderRadius: "10px", background: "#F5F8FC", outline: "none", fontSize: "13px" }}
          />
        </div>

        {/* PROFILE */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: avatarColor, color: "#FFF", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}>
            {userProfile ? getInitials(userProfile.nama) : "..."}
          </div>
          <div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "#0F2A4A" }}>
              {userProfile?.nama || "Memuat..."}
            </div>
            <div style={{ fontSize: "11px", color: "#8DA4BF" }}>
              {userProfile?.jabatan || ""}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');
      `}</style>
    </header>
  );
}