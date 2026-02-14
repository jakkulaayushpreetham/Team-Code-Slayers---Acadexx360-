import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import api from "../api/api";
import api from "../api/api";

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get("/leaderboard");
        setLeaderboard(res.data);
      } catch (err) {
        console.log("Error fetching leaderboard:", err);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <PageWrapper
      title="🏆 Leaderboard"
      subtitle="Top contributors who helped the community by uploading high-quality notes."
    >
      <div style={styles.table}>
        {leaderboard.length === 0 ? (
          <p style={{ opacity: 0.7 }}>No contributors yet.</p>
        ) : (
          leaderboard.map((c, index) => (
            <div key={index} style={styles.row}>
              <span style={styles.rank}>#{index + 1}</span>
              <span style={styles.name}>{c.name || c._id}</span>
              <span style={styles.uploads}>
                {c.uploads || c.count} uploads
              </span>
            </div>
          ))
        )}
      </div>
    </PageWrapper>
  );
}

const styles = {
  wrapper: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  podium: {
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr 1fr",
    gap: "14px",
    marginBottom: "28px",
    alignItems: "end",
  },
  podiumCard: {
    textAlign: "center",
    padding: "22px 16px",
    borderRadius: "20px",
    background: "linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.04))",
    border: "1px solid rgba(255,255,255,0.15)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.4)",
  },
  podiumFirst: {
    background: "linear-gradient(145deg, rgba(56,189,248,0.2), rgba(34,211,238,0.08))",
    border: "1px solid rgba(56,189,248,0.4)",
    boxShadow: "0 16px 40px rgba(56,189,248,0.3)",
    paddingTop: "30px",
    paddingBottom: "30px",
  },
  podiumEmoji: {
    fontSize: "2.4rem",
    display: "block",
    marginBottom: "8px",
  },
  podiumName: {
    fontWeight: 800,
    fontSize: "1.1rem",
    marginBottom: "4px",
  },
  podiumUploads: {
    fontSize: "0.88rem",
    opacity: 0.8,
  },
  podiumRating: {
    fontSize: "0.85rem",
    opacity: 0.7,
    marginTop: "2px",
  },
  table: {
    background: "rgba(255,255,255,0.05)",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,0.1)",
    overflow: "hidden",
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "0.6fr 2fr 1fr 1fr",
    padding: "14px 20px",
    background: "rgba(255,255,255,0.06)",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    fontSize: "0.78rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.8px",
    opacity: 0.7,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "0.5fr 2fr 1fr",
    padding: "14px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    alignItems: "center",
    transition: "background 0.15s",
  },
  topRow: {
    background: "rgba(56,189,248,0.05)",
  },
  rank: {
    fontWeight: "bold",
    fontSize: "1.1rem",
  },
  name: {
    fontWeight: 600,
  },
  uploads: {
    opacity: 0.8,
    textAlign: "right",
  },
};
