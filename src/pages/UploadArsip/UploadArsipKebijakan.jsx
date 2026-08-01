import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function InjectStyle() {
  useEffect(() => {
    const tag = document.createElement("style");
    tag.innerHTML = `
      span[role="button"] { -webkit-tap-highlight-color: transparent !important; }
      span[role="button"]:active { opacity: 1 !important; background: inherit !important; }
    `;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);
  return null;
}

const jenisArsip = [
  {
    value: "renstra",
    label: "Renstra LPPM",
    desc: "Arsip Rencana Strategis LPPM",
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
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>
    ),
  },
  {
    value: "roadmap",
    label: "Roadmap",
    desc: "Arsip Roadmap LPPM",
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M3 21V9a2 2 0 012-2h4V5a2 2 0 012-2h2a2 2 0 012 2v2h4a2 2 0 012 2v12" />
        <line x1="3" y1="21" x2="21" y2="21" />
        <line x1="9" y1="9" x2="9" y2="9.01" />
        <line x1="9" y1="13" x2="9" y2="13.01" />
        <line x1="9" y1="17" x2="9" y2="17.01" />
        <line x1="15" y1="9" x2="15" y2="9.01" />
        <line x1="15" y1="13" x2="15" y2="13.01" />
        <line x1="15" y1="17" x2="15" y2="17.01" />
      </svg>
    ),
  },
];

function UploadArsipKebijakan() {
  const [jenis, setJenis] = useState("");
  const navigate = useNavigate();

  const handleLanjut = () => {
    if (jenis === "renstra") navigate("/kebijakan/renstra-tambah");
    else if (jenis === "roadmap") navigate("/kebijakan/roadmap-tambah");
  };

  return (
    <div style={s.wrap}>
      <InjectStyle />
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
              Pilih jenis arsip Kebijakan, Renstra, Renja LPPM
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
            <span
              role="button"
              tabIndex={0}
              onClick={jenis ? handleLanjut : undefined}
              onKeyDown={(e) => e.key === "Enter" && jenis && handleLanjut()}
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
            </span>
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
    display: "inline-flex",
    alignItems: "center",
    background: "#1A3A5C",
    color: "#fff",
    border: "none",
    borderRadius: 9,
    padding: "10px 24px",
    fontSize: 13,
    fontWeight: 700,
    transition: "opacity .15s",
    userSelect: "none",
    WebkitTapHighlightColor: "transparent",
    WebkitUserSelect: "none",
    textDecoration: "none",
  },
};

export default UploadArsipKebijakan;