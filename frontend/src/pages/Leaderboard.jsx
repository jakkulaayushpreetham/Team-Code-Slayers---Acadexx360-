import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
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
  table: {
    background: "rgba(255,255,255,0.05)",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "18px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "0.5fr 2fr 1fr",
    padding: "14px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    alignItems: "center",
  },
  rank: {
    fontWeight: "bold",
    color: "#38bdf8",
  },
  name: {
    fontWeight: "bold",
  },
  uploads: {
    opacity: 0.8,
    textAlign: "right",
  },
};
