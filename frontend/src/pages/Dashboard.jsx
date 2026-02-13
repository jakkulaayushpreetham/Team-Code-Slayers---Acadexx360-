import React from "react";
import PageWrapper from "../components/PageWrapper";

export default function Dashboard() {
  return (
    <PageWrapper
      title="🎓 Student Dashboard"
      subtitle="Track your contributions, downloads, and academic resources."
    >
      <div style={styles.grid}>
        <div style={styles.card}>
          <h2>📤 Uploads</h2>
          <p style={styles.big}>12</p>
          <p style={styles.small}>Total notes uploaded</p>
        </div>

        <div style={styles.card}>
          <h2>⭐ Avg Rating</h2>
          <p style={styles.big}>4.5</p>
          <p style={styles.small}>Your average note rating</p>
        </div>

        <div style={styles.card}>
          <h2>🏆 Rank</h2>
          <p style={styles.big}>#2</p>
          <p style={styles.small}>Leaderboard position</p>
        </div>

        <div style={styles.cardWide}>
          <h2>📌 Quick Student Resources</h2>
          <ul style={styles.list}>
            <li>📅 Exam Timetable</li>
            <li>📄 Previous Year Question Papers</li>
            <li>📢 Important Exam Updates</li>
            <li>🎯 Top Recommended Notes</li>
          </ul>
        </div>
      </div>
    </PageWrapper>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "18px",
  },
  card: {
    background: "rgba(255,255,255,0.05)",
    borderRadius: "16px",
    padding: "20px",
    border: "1px solid rgba(255,255,255,0.08)",
    textAlign: "center",
  },
  cardWide: {
    gridColumn: "1 / -1",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "16px",
    padding: "22px",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  big: {
    fontSize: "2.2rem",
    fontWeight: "bold",
    margin: "10px 0",
    color: "#38bdf8",
  },
  small: {
    opacity: 0.8,
  },
  list: {
    marginTop: "12px",
    lineHeight: "1.8",
    opacity: 0.9,
  },
};
