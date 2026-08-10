import { useState, useEffect } from "react";
import logo from "../../assets/logo.jpeg";
import { useSearch } from "../../Contextt/SearchContext";
import { supabase } from "../../lib/supabase";

export default function Navbar() {
  const [search, setSearch] = useState("");
  const [userProfile, setUserProfile] = useState(null);
  const { setSearchTerm } = useSearch();

  useEffect(() => {
    setSearchTerm(search);
  }, [search, setSearchTerm]);

  useEffect(() => {
    async function fetchProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

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
    return nama
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 1)
      .toUpperCase();
  }



  const avatarColor =
    userProfile?.role === "admin"
      ? "#163B67"
      : "#16A34A";

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        left: 0,
        right: 0,
        height: "70px",
        background: "#fff",
        borderBottom: "1px solid #E5EAF2",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",

        boxSizing: "border-box",

        zIndex: 99,
      }}
    >
      {/* ================= LEFT ================= */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexShrink: 0,
        }}
      >
        <img
          src={logo}
          alt=""
          style={{
            width: 42,
            height: 42,
            borderRadius: 10,
          }}
        />

        <div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 24,
              color: "#163B67",
            }}
          >
            SIPAS
          </div>

          <div
            style={{
              color: "#5F6B7A",
              fontSize: 14,
            }}
          >
            Sistem Pengelolaan Arsip Surat
          </div>
        </div>
      </div>

      {/* ================= RIGHT ================= */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 20,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            position: "relative",
          }}
        >
          <i
            className="ti ti-search"
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#8DA4BF",
            }}
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nomor surat, perihal..."
            style={{
              width: 320,
              height: 42,
              paddingLeft: 38,
              borderRadius: 10,
              border: "1px solid #DCE4EF",
              background: "#F7F9FC",
              outline: "none",
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: "50%",
              background: avatarColor,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
            }}
          >
            {userProfile ? getInitials(userProfile.nama) : ".."}
          </div>

          <div>
            <div
              style={{
                fontWeight: 600,
                color: "#163B67",
              }}
            >
              {userProfile?.nama}
            </div>

            <div
              style={{
                fontSize: 13,
                color: "#7C8797",
              }}
            >
              {userProfile?.jabatan}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}