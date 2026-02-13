import React from "react";
import PageWrapper from "../components/PageWrapper";
import { leaderboardData } from "../data/dummyData";

export default function Leaderboard() {
  return (
    <PageWrapper
      title="🏆 Leaderboard"
      subtitle="Top contributors who helped the community by uploading high-quality notes."
    >
      <div style={styles.table}>
        {leaderboardData.map((c, index) => (
          <div key={index} style={styles.row}>
            <span style={styles.rank}>#{index + 1}</span>
            <span style={styles.name}>{c.name}</span>
            <span style={styles.uploads}>{c.uploads} uploads</span>
            <span style={styles.points}>{c.points} pts</span>
          </div>
        ))}
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
    gridTemplateColumns: "0.5fr 2fr 1fr 1fr",
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
  },
  points: {
    fontWeight: "bold",
    textAlign: "right",
  },
};
