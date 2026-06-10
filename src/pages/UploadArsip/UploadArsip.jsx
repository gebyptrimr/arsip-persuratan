import { useState } from "react";
import { useNavigate } from "react-router-dom";

const jenisArsip = [
  {
    value: "kontrak",
    label: "Kontrak",
    desc: "Arsip perjanjian kerja sama antar pihak",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
  },
  {
    value: "sk",
    label: "SK",
    desc: "Surat Keputusan dari pejabat berwenang",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
      </svg>
    ),
  },
  {
    value: "surat-tugas",
    label: "Surat Tugas",
    desc: "Penugasan resmi kepada staf atau pegawai",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <line x1="8" y1="14" x2="16" y2="14" />
      </svg>
    ),
  },
];

function UploadArsip() {
  const [jenis, setJenis] = useState("");
  const navigate = useNavigate();

  const handleLanjut = () => {
    if (jenis === "kontrak") navigate("/upload-arsip/kontrak-tambah");
    else if (jenis === "sk") navigate("/upload-arsip/sk-tambah");
    else if (jenis === "surat-tugas")
      navigate("/upload-arsip/surat-tugas-tambah");
  };

  return (
    <div style={s.wrap}>
      <div style={s.card}>
        {/* ── Header ── */}
        <div style={s.cardHead}>
          <div style={s.decCircle1} />
          <div style={s.decCircle2} />
          <div style={s.headIcon}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#4A9FD5"
              strokeWidth="1.8"
            >
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={s.cardTitle}>Upload Arsip</div>
            <div style={s.cardSub}>
              Pilih jenis arsip yang ingin ditambahkan
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={s.cardBody}>
          {/* Section label */}
          <div style={s.sectionHead}>
            <div style={s.sectionDot} />
            <span style={s.sectionLabel}>Pilih Jenis Arsip</span>
          </div>

          {/* Card picker */}
          <div style={s.pickerGrid}>
            {jenisArsip.map((item) => {
              const selected = jenis === item.value;
              return (
                <div
                  key={item.value}
                  onClick={() => setJenis(item.value)}
                  style={{
                    ...s.pickerCard,
                    border: selected
                      ? "1.5px solid #1A3A5C"
                      : "1.5px solid #E5E7EB",
                    backgroundColor: selected ? "#F0F6FC" : "#FAFAFA",
                    boxShadow: selected
                      ? "0 0 0 3px rgba(26,58,92,0.08)"
                      : "none",
                  }}
                >
                  <div
                    style={{
                      ...s.pickerIcon,
                      backgroundColor: selected ? "#1A3A5C" : "#F0F4F8",
                      color: selected ? "#fff" : "#6B7280",
                    }}
                  >
                    {item.icon}
                  </div>
                  <div style={s.pickerInfo}>
                    <div
                      style={{
                        ...s.pickerLabel,
                        color: selected ? "#1A3A5C" : "#111827",
                      }}
                    >
                      {item.label}
                    </div>
                    <div style={s.pickerDesc}>{item.desc}</div>
                  </div>
                  {/* Radio dot */}
                  <div
                    style={{
                      ...s.radioDot,
                      border: selected
                        ? "5px solid #1A3A5C"
                        : "1.5px solid #D1D5DB",
                      backgroundColor: selected ? "#fff" : "transparent",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Action */}
          <div style={s.actionBar}>
            <button
              onClick={handleLanjut}
              disabled={!jenis}
              style={{
                ...s.btnLanjut,
                opacity: !jenis ? 0.45 : 1,
                cursor: !jenis ? "not-allowed" : "pointer",
              }}
            >
              <span>Lanjut</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                style={{ marginLeft: 8 }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────
const s = {
  wrap: {
    backgroundColor: "#F5F7FA",
    minHeight: "100vh",
    padding: "24px",
    fontFamily: "'Inter', sans-serif",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    border: "0.5px solid #e0e0e0",
    overflow: "hidden",
  },
  cardHead: {
    backgroundColor: "#1A3A5C",
    padding: "20px 26px",
    display: "flex",
    alignItems: "center",
    gap: 14,
    position: "relative",
    overflow: "hidden",
  },
  decCircle1: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: "50%",
    border: "1px solid rgba(255,255,255,0.06)",
    top: -60,
    right: 120,
    pointerEvents: "none",
  },
  decCircle2: {
    position: "absolute",
    width: 100,
    height: 100,
    borderRadius: "50%",
    backgroundColor: "rgba(74,159,213,0.08)",
    bottom: -30,
    right: 60,
    pointerEvents: "none",
  },
  headIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.12)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    position: "relative",
    zIndex: 1,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: 700,
    lineHeight: 1.3,
    position: "relative",
    zIndex: 1,
  },
  cardSub: {
    color: "rgba(255,255,255,0.45)",
    fontSize: 11,
    marginTop: 3,
    position: "relative",
    zIndex: 1,
  },
  cardBody: { padding: "28px 28px 26px" },

  sectionHead: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  sectionDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
    backgroundColor: "#4A9FD5",
    flexShrink: 0,
  },
  sectionLabel: {
    fontSize: 10.5,
    fontWeight: 700,
    color: "#4A9FD5",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    paddingBottom: 6,
    borderBottom: "1.5px solid #EAF3FB",
    flex: 1,
  },

  pickerGrid: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginBottom: 28,
  },
  pickerCard: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "16px 18px",
    borderRadius: 10,
    cursor: "pointer",
    transition: "all .15s",
    position: "relative",
  },
  pickerIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    transition: "all .15s",
  },
  pickerInfo: { flex: 1 },
  pickerLabel: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 3,
    transition: "color .15s",
  },
  pickerDesc: { fontSize: 12, color: "#9CA3AF" },
  radioDot: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    flexShrink: 0,
    transition: "all .15s",
  },

  actionBar: { display: "flex", justifyContent: "flex-end" },
  btnLanjut: {
    display: "flex",
    alignItems: "center",
    background: "#1A3A5C",
    color: "#fff",
    border: "none",
    borderRadius: 9,
    padding: "10px 24px",
    fontSize: 13,
    fontWeight: 700,
    transition: "opacity .15s",
  },
};

export default UploadArsip;
