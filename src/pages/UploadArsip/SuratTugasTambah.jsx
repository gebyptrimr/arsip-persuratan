import { useState } from "react";
import Swal from "sweetalert2";

// ─── Field Component ──────────────────────────────────────────
function Field({ label, children, half, required }) {
  return (
    <div style={{ ...s.fieldWrap, width: half ? "calc(50% - 8px)" : "100%" }}>
      <label style={s.label}>
        {label}
        {required && <span style={s.requiredDot}>*</span>}
      </label>
      {children}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────
function SuratTugasTambah() {
  const [fileName, setFileName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Berhasil!",
      text: "Data Surat Tugas berhasil disimpan.",
      confirmButtonColor: "#1A3A5C",
      confirmButtonText: "Oke",
    });
  };

  return (
    <div style={s.wrap}>
      <div style={s.card}>
        {/* ── Card Header ── */}
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
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={s.cardTitle}>Tambah Arsip Surat Tugas</div>
            <div style={s.cardSub}>
              Surat Tugas · LP2M Universitas Negeri Makassar
            </div>
          </div>
          <div style={{ flex: 1, position: "relative", zIndex: 1 }} />
          <div style={s.stepBadge}>
            <div style={s.stepNum}>1</div>
            <span style={s.stepText}>Isi Formulir</span>
          </div>
        </div>

        {/* ── Card Body ── */}
        <div style={s.cardBody}>
          <form onSubmit={handleSubmit}>
            {/* ── Section: Identitas Surat ── */}
            <div style={s.sectionBlock}>
              <div style={s.sectionHead}>
                <div style={s.sectionDot} />
                <span style={s.sectionLabel}>Identitas Surat Tugas</span>
              </div>
              <div style={s.row}>
                <Field label="Nomor Surat Tugas" half required>
                  <div style={s.inputWrap}>
                    <svg
                      style={s.inputIcon}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#aaa"
                      strokeWidth="2"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <path d="M3 9h18M9 21V9" />
                    </svg>
                    <input
                      type="text"
                      style={s.input}
                      placeholder="Contoh: ST-001/2025"
                      required
                    />
                  </div>
                </Field>
                <Field label="Tanggal Surat" half required>
                  <div style={s.inputWrap}>
                    <svg
                      style={s.inputIcon}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#aaa"
                      strokeWidth="2"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <input type="date" style={s.input} required />
                  </div>
                </Field>
              </div>
            </div>

            {/* ── Section: Penugasan ── */}
            <div style={s.sectionBlock}>
              <div style={s.sectionHead}>
                <div style={s.sectionDot} />
                <span style={s.sectionLabel}>Detail Penugasan</span>
              </div>
              <div style={s.row}>
                <Field label="Penerima Tugas" half required>
                  <div style={s.inputWrap}>
                    <svg
                      style={s.inputIcon}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#aaa"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="8" r="4" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                    </svg>
                    <input
                      type="text"
                      style={s.input}
                      placeholder="Nama penerima tugas"
                      required
                    />
                  </div>
                </Field>
                <Field label="Tujuan Tugas" half required>
                  <div style={s.inputWrap}>
                    <svg
                      style={s.inputIcon}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#aaa"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    <input
                      type="text"
                      style={s.input}
                      placeholder="Tujuan / keperluan tugas"
                      required
                    />
                  </div>
                </Field>
              </div>
            </div>

            {/* ── Section: Periode ── */}
            <div style={s.sectionBlock}>
              <div style={s.sectionHead}>
                <div style={s.sectionDot} />
                <span style={s.sectionLabel}>Periode Pelaksanaan</span>
              </div>
              <div style={s.row}>
                <Field label="Tanggal Mulai" half required>
                  <div style={s.inputWrap}>
                    <svg
                      style={s.inputIcon}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#aaa"
                      strokeWidth="2"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <input type="date" style={s.input} required />
                  </div>
                </Field>
                <Field label="Tanggal Selesai" half required>
                  <div style={s.inputWrap}>
                    <svg
                      style={s.inputIcon}
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#aaa"
                      strokeWidth="2"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                    <input type="date" style={s.input} required />
                  </div>
                </Field>
              </div>
            </div>

            {/* ── Section: Dokumen ── */}
            <div style={s.sectionBlock}>
              <div style={s.sectionHead}>
                <div style={s.sectionDot} />
                <span style={s.sectionLabel}>Dokumen</span>
              </div>
              <Field label="Upload File PDF" required>
                <label style={s.uploadBox}>
                  <input
                    type="file"
                    accept=".pdf"
                    required
                    style={{ display: "none" }}
                    onChange={(e) => setFileName(e.target.files[0]?.name || "")}
                  />
                  {fileName ? (
                    <div style={s.filePreview}>
                      <div style={s.filePill}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#A32D2D"
                          strokeWidth="2"
                        >
                          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                        <span
                          style={{
                            fontSize: 12.5,
                            color: "#1A3A5C",
                            fontWeight: 600,
                            maxWidth: 320,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {fileName}
                        </span>
                      </div>
                      <span style={{ fontSize: 11, color: "#888" }}>
                        Klik untuk ganti file
                      </span>
                    </div>
                  ) : (
                    <div style={s.uploadInner}>
                      <div style={s.uploadIconWrap}>
                        <svg
                          width="26"
                          height="26"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#4A9FD5"
                          strokeWidth="1.6"
                        >
                          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: "#1A3A5C",
                          }}
                        >
                          Klik untuk memilih file PDF
                        </div>
                        <div
                          style={{
                            fontSize: 11.5,
                            color: "#aaa",
                            marginTop: 3,
                          }}
                        >
                          Format yang diterima: .pdf · Maks. 10 MB
                        </div>
                      </div>
                    </div>
                  )}
                </label>
              </Field>
            </div>

            {/* ── Actions ── */}
            <div style={s.actionBar}>
              <button type="button" style={s.btnBatal}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ marginRight: 6 }}
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
                Batal
              </button>
              <button type="submit" style={s.btnSimpan}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  style={{ marginRight: 6 }}
                >
                  <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                  <polyline points="17 21 17 13 7 13 7 21" />
                  <polyline points="7 3 7 8 15 8" />
                </svg>
                Simpan Surat Tugas
              </button>
            </div>
          </form>
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
  stepBadge: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 20,
    padding: "5px 12px",
    position: "relative",
    zIndex: 1,
  },
  stepNum: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    backgroundColor: "#4A9FD5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 10,
    fontWeight: 700,
    color: "#fff",
  },
  stepText: { fontSize: 11, color: "rgba(255,255,255,0.8)", fontWeight: 500 },
  cardBody: { padding: "28px 28px 24px" },

  sectionBlock: { marginBottom: 24 },
  sectionHead: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
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

  row: { display: "flex", gap: 16, flexWrap: "wrap" },
  fieldWrap: { display: "flex", flexDirection: "column", marginBottom: 14 },
  label: {
    fontSize: 12,
    fontWeight: 600,
    color: "#374151",
    marginBottom: 6,
    letterSpacing: 0.1,
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  requiredDot: { color: "#E24B4A", fontSize: 13, lineHeight: 1 },
  inputWrap: { position: "relative", display: "flex", alignItems: "center" },
  inputIcon: {
    position: "absolute",
    left: 10,
    pointerEvents: "none",
    flexShrink: 0,
  },
  input: {
    width: "100%",
    padding: "9px 12px 9px 32px",
    border: "0.5px solid #D1D5DB",
    borderRadius: 8,
    fontSize: 13,
    outline: "none",
    backgroundColor: "#FAFAFA",
    color: "#1A1A1A",
    boxSizing: "border-box",
    transition: "border .15s, box-shadow .15s",
  },

  uploadBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "22px 24px",
    border: "1.5px dashed #B8D4EE",
    borderRadius: 10,
    backgroundColor: "#F4F9FD",
    cursor: "pointer",
    transition: "background .15s",
  },
  uploadInner: { display: "flex", alignItems: "center", gap: 16 },
  uploadIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: "#E6F1FB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  filePreview: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
  },
  filePill: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FEF2F2",
    border: "1px solid #FECACA",
    borderRadius: 8,
    padding: "7px 14px",
  },

  actionBar: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
    paddingTop: 20,
    borderTop: "1px solid #F0F0F0",
    marginTop: 8,
  },
  btnBatal: {
    display: "flex",
    alignItems: "center",
    background: "#F3F4F6",
    color: "#374151",
    border: "none",
    borderRadius: 8,
    padding: "9px 18px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  btnSimpan: {
    display: "flex",
    alignItems: "center",
    background: "#1A3A5C",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "9px 22px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
};

export default SuratTugasTambah;
