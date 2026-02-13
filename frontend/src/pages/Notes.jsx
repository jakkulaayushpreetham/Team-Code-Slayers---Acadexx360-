const styles = {
  panel: {
    marginTop: "18px",
    padding: "20px 20px 16px",
    borderRadius: "20px",
    background:
      "radial-gradient(800px 400px at 10% 0%, rgba(56,189,248,.12), transparent), linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.03))",
    backdropFilter: "blur(16px)",
    border: "1px solid rgba(255,255,255,0.22)",
    boxShadow: "0 24px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "14px",
  },

  reset: {
    background: "linear-gradient(135deg, rgba(56,189,248,.12), rgba(56,189,248,.05))",
    color: "#7dd3fc",
    border: "1px solid rgba(56,189,248,.5)",
    padding: "6px 12px",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "0.75rem",
    letterSpacing: "0.3px",
    transition: "all .15s ease",
  },

  group: {
    marginBottom: "16px",
  },

  groupTitle: {
    fontSize: "0.7rem",
    letterSpacing: "1.2px",
    opacity: 0.7,
    marginBottom: "8px",
    textTransform: "uppercase",
  },

  segment: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(70px, max-content))",
    gap: "8px",
  },

  segmentBtn: {
    padding: "9px 16px",
    borderRadius: "12px",
    background:
      "linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.25))",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "white",
    cursor: "pointer",
    fontSize: "0.8rem",
    letterSpacing: "0.2px",
    transition: "all .18s ease",
    boxShadow: "inset 0 1px 1px rgba(0,0,0,0.6)",
  },

  segmentBtnActive: {
    background:
      "linear-gradient(135deg, rgba(56,189,248,.95), rgba(34,211,238,.95))",
    color: "#002b36",
    border: "none",
    boxShadow: "0 10px 26px rgba(56,189,248,.5)",
    fontWeight: 700,
  },

  activeBar: {
    marginTop: "14px",
    padding: "10px 12px",
    borderRadius: "14px",
    background:
      "linear-gradient(135deg, rgba(0,0,0,.55), rgba(0,0,0,.35))",
    border: "1px solid rgba(255,255,255,0.14)",
    display: "flex",
    gap: "8px",
    alignItems: "center",
    flexWrap: "wrap",
    fontSize: "0.75rem",
    letterSpacing: "0.2px",
    boxShadow: "inset 0 1px 1px rgba(0,0,0,0.7)",
  },

  activePill: {
    padding: "4px 10px",
    borderRadius: "999px",
    background:
      "linear-gradient(135deg, rgba(56,189,248,.25), rgba(34,211,238,.15))",
    color: "#7dd3fc",
    border: "1px solid rgba(56,189,248,.45)",
    fontWeight: 600,
    fontSize: "0.7rem",
  },
};
