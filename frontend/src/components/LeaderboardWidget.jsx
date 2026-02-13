import React from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import { leaderboardData } from "../data/dummyData";
import LeaderboardWidget from "../components/LeaderboardWidget";

export default function Home() {
  return (
    <PageWrapper
      title="Acadexx360 🚀"
      subtitle="AI-powered Academic Knowledge Exchange platform to upload, search, rate and discover high quality notes."
    >
      <div style={styles.hero}>
        <div style={styles.heroLeft}>
          <h2 style={styles.heroTitle}>
            Learn Faster. Share Smarter. Compete Better.
          </h2>

          <p style={styles.heroText}>
            Acadexx360 helps students upload notes, filter by department/semester,
            rate quality content, and climb the contributor leaderboard.
          </p>

          <div style={styles.btnRow}>
            <Link to="/notes" style={styles.primaryBtn}>
              Explore Notes
            </Link>
            <Link to="/upload" style={styles.secondaryBtn}>
              Upload Notes
            </Link>
          </div>

          <div style={styles.stats}>
            <div style={styles.statCard}>
              <h3>📚 120+</h3>
              <p>Notes Available</p>
            </div>
            <div style={styles.statCard}>
              <h3>🎓 10+</h3>
              <p>Departments</p>
            </div>
            <div style={styles.statCard}>
              <h3>🏆 Gamified</h3>
              <p>Leaderboard Rewards</p>
            </div>
          </div>
        </div>

        <div style={styles.heroRight}>
          <LeaderboardWidget data={leaderboardData} />
        </div>
      </div>

      <div style={styles.features}>
        <div style={styles.featureCard}>
          <h3>📤 Upload & Share</h3>
          <p>Upload PDFs/images and share with your entire campus.</p>
        </div>

        <div style={styles.featureCard}>
          <h3>🔍 Smart Search</h3>
          <p>Find notes quickly using subject, semester and department filters.</p>
        </div>

        <div style={styles.featureCard}>
          <h3>⭐ Rate Quality</h3>
          <p>Students can rate notes and push the best notes to the top.</p>
        </div>

        <div style={styles.featureCard}>
          <h3>🏆 Contributor Rewards</h3>
          <p>Leaderboard encourages active contribution and collaboration.</p>
        </div>
      </div>

      <div style={styles.footer}>
        Built for Hackathon | Team Code Slayers ⚡
      </div>
    </PageWrapper>
  );
}

const styles = {
  hero: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "25px",
    marginBottom: "35px",
  },
  heroLeft: {
    padding: "25px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  heroRight: {
    display: "flex",
    alignItems: "stretch",
  },
  heroTitle: {
    fontSize: "2rem",
    marginBottom: "15px",
  },
  heroText: {
    opacity: 0.85,
    fontSize: "1.05rem",
    lineHeight: "1.6",
  },
  btnRow: {
    marginTop: "20px",
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  primaryBtn: {
    textDecoration: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    background: "#38bdf8",
    color: "black",
    fontWeight: "bold",
  },
  secondaryBtn: {
    textDecoration: "none",
    padding: "12px 18px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.3)",
    color: "white",
    fontWeight: "bold",
  },
  stats: {
    marginTop: "25px",
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  statCard: {
    flex: 1,
    minWidth: "160px",
    background: "rgba(0,0,0,0.25)",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
  },
  featureCard: {
    padding: "18px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  footer: {
    marginTop: "50px",
    textAlign: "center",
    opacity: 0.7,
  },
};
