import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.title}>Acadexx360 📚</h1>
        <p style={styles.subtitle}>
          Welcome to Code Slayers Notes Sharing Platform.
        </p>
        <p style={styles.desc}>
          Upload, explore, rate and compete in the contributor leaderboard.
        </p>
      </div>

      <div style={styles.grid}>
        <Link to="/dashboard" style={styles.card}>
          <h2>🎓 Student Dashboard</h2>
          <p>View your profile, notes activity, and progress.</p>
        </Link>

        <Link to="/upload" style={styles.card}>
          <h2>📤 Upload Notes</h2>
          <p>Upload notes and earn points to climb the leaderboard.</p>
        </Link>

        <Link to="/notes" style={styles.card}>
          <h2>📚 Notes Library</h2>
          <p>Browse and filter notes shared by contributors.</p>
        </Link>

        <Link to="/leaderboard" style={styles.card}>
          <h2>🏆 Leaderboard</h2>
          <p>See top contributors and rankings.</p>
        </Link>
      </div>

      <footer style={styles.footer}>
        <p>🚀 Built by Team Code Slayers | Hackathon Project</p>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #141E30, #243B55)",
    color: "white",
    padding: "40px",
    fontFamily: "Arial",
  },
  hero: {
    textAlign: "center",
    marginBottom: "50px",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  desc: {
    fontSize: "1rem",
    opacity: 0.85,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "rgba(255,255,255,0.1)",
    padding: "25px",
    borderRadius: "15px",
    textDecoration: "none",
    color: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    transition: "0.3s",
  },
  footer: {
    marginTop: "60px",
    textAlign: "center",
    opacity: 0.7,
  },
};
