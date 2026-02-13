import React from "react";

export default function LeaderboardWidget({ data }) {
  return (
    <div style={styles.card}>
      <h2 style={styles.heading}>🏆 Top Contributors</h2>

      {data.length === 0 ? (
        <p style={{ opacity: 0.7 }}>No contributors yet.</p>
      ) : (
        data.map((c, index) => (
          <div key={index} style={styles.row}>
            <span style={styles.rank}>#{index + 1}</span>

            <span style={styles.name}>
              {c.name || c._id || "Unknown"}
            </span>

            <span style={styles.points}>
              {c.uploads || c.count || 0} uploads
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
    borderRadius: "14px",
    padding: "20px",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  },
  heading: {
    marginBottom: "18px",
    fontSize: "1.3rem",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  rank: {
    fontWeight: "bold",
    color: "#38bdf8",
  },
  name: {
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
  },
  points: {
    fontWeight: "bold",
  },
};
