import React, { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import api from "../api/api";


export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get("/leaderboard");
        setLeaderboard(res.data);
      } catch (err) {
        console.log("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const getRankEmoji = (index) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `#${index + 1}`;
  };

  return (
    <PageWrapper
      title="🏆 Leaderboard"
      subtitle="Top contributors who helped the community by uploading high-quality academic resources."
    >
      <div style={styles.wrapper}>
        {loading ? (
          <p style={{ textAlign: "center", opacity: 0.7 }}>Loading leaderboard...</p>
        ) : leaderboard.length === 0 ? (
          <div style={styles.empty}>
            <p style={{ fontSize: "2.5rem" }}>🏆</p>
            <p>No contributors yet. Be the first to upload notes!</p>
          </div>
        ) : (
          <>
            {/* Top 3 podium */}
            {leaderboard.length >= 3 && (
              <div style={styles.podium}>
                {[1, 0, 2].map((idx) => {
                  const c = leaderboard[idx];
                  if (!c) return null;
                  return (
                    <div
                      key={idx}
                      style={{
                        ...styles.podiumCard,
                        ...(idx === 0 ? styles.podiumFirst : {}),
                      }}
                    >
                      <span style={styles.podiumEmoji}>{getRankEmoji(idx)}</span>
                      <p style={styles.podiumName}>{c.name || "Anonymous"}</p>
                      <p style={styles.podiumUploads}>{c.uploads} uploads</p>
                      <p style={styles.podiumRating}>⭐ {c.avgRating || 0}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Full Table */}
            <div style={styles.table}>
              <div style={styles.tableHeader}>
                <span>Rank</span>
                <span>Contributor</span>
                <span>Uploads</span>
                <span>Avg Rating</span>
              </div>
              {leaderboard.map((c, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.row,
                    ...(index < 3 ? styles.topRow : {}),
                  }}
                >
                  <span style={styles.rank}>{getRankEmoji(index)}</span>
                  <span style={styles.name}>{c.name || "Anonymous"}</span>
                  <span style={styles.uploads}>{c.uploads} uploads</span>
                  <span style={styles.rating}>⭐ {c.avgRating || 0}</span>
                </div>
              ))}
            </div>
          </>
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
    gridTemplateColumns: "0.6fr 2fr 1fr 1fr",
    padding: "16px 20px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
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
    opacity: 0.85,
    fontSize: "0.92rem",
  },
  rating: {
    fontWeight: 600,
    fontSize: "0.92rem",
  },
  empty: {
    textAlign: "center",
    padding: "60px 20px",
    opacity: 0.7,
  },
};
