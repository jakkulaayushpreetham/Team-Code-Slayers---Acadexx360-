import React from "react";

export default function LeaderboardWidget({ data }) {
  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>🏆 Top Contributors</h2>

      {(!data || data.length === 0) ? (
        <p style={styles.empty}>No contributors yet.</p>
      ) : (
        data.map((c, index) => (
          <div key={index} style={styles.row}>
            <span style={styles.rank}>#{index + 1}</span>

            <span style={styles.name}>
              {c._id || c.name || "Unknown"}
            </span>

            <span style={styles.uploads}>
              {c.uploads ?? c.count ?? 0} uploads
            </span>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  card: {
    background: "rgba(255,255,255,0.05)",
    borderRadius: "16px",
    padding: "20px",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 6px 18px rgba(0,0,0,0.35)",
  },

  heading: {
    marginBottom: "18px",
    fontSize: "1.2rem",
    fontWeight: "800",
    color: "white",
  },

  empty: {
    opacity: 0.7,
    fontSize: "0.9rem",
  },

  row: {
    display: "grid",
    gridTemplateColumns: "0.6fr 2fr 1fr",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },

  rank: {
    fontWeight: "bold",
    color: "#38bdf8",
  },

  name: {
    fontWeight: "700",
    color: "white",
  },

  uploads: {
    fontWeight: "700",
    opacity: 0.85,
    textAlign: "right",
    color: "#f1f5f9",
  },
};
