import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.container}>
      {/* Hero */}
      <div style={styles.hero}>
        <span style={styles.badge}>✨ AI-Powered Campus Hub</span>
        <h1 style={styles.title}>Acadexx360 📚</h1>
        <p style={styles.subtitle}>
          One Platform. All Your Academic Resources.
        </p>
        <p style={styles.desc}>
          Upload, explore, summarize, tag concepts and compete in the contributor leaderboard.
        </p>

        <div style={styles.ctaRow}>
          <Link to="/upload" style={styles.primaryBtn}>🚀 Get Started</Link>
          <Link to="/notes" style={styles.secondaryBtn}>📚 Explore Notes</Link>
        </div>

        {/* Subject Chips */}
        <div style={styles.chipsWrap}>
          {["C++", "Java", "Python", "Computer Vision", "Generative AI", "Computer Architecture"].map((s) => (
            <span key={s} style={styles.chip}>{s}</span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsBar}>
        <div style={styles.stat}>📄 1,200+ Notes</div>
        <div style={styles.stat}>🎓 10+ Departments</div>
        <div style={styles.stat}>🏆 Top Contributors</div>
        <div style={styles.stat}>🤖 OCR • Summary • Tags</div>
      </div>

      {/* Feature Highlights */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🚀 Why Students Love Acadexx360</h2>

        <div style={styles.grid}>
          <FeatureCard title="📄 OCR Text Extraction" desc="Extract text from PDFs and images automatically." />
          <FeatureCard title="🧠 AI Text Summary" desc="Get concise summaries of long notes instantly." />
          <FeatureCard title="🏷️ Concept Tagging" desc="Auto-tag topics for quick discovery." />
          <FeatureCard title="🔎 Smart Search" desc="Find notes by skills, subjects & keywords." />
          <FeatureCard title="🏆 Leaderboard" desc="Earn points and climb the ranks." />
          <FeatureCard title="🎓 Dept / Sem Wise" desc="Well-structured academic resources." />
        </div>
      </div>

      {/* Navigation Cards */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📌 Jump Right In</h2>

        <div style={styles.grid}>
          <Link to="/dashboard" style={styles.card}>
            <h2>🎓 Dashboard</h2>
            <p>Track uploads, activity & achievements.</p>
          </Link>

          <Link to="/upload" style={styles.card}>
            <h2>📤 Upload Notes</h2>
            <p>Share notes & earn points.</p>
          </Link>

          <Link to="/notes" style={styles.card}>
            <h2>📚 Notes Library</h2>
            <p>Explore department-wise resources.</p>
          </Link>

          <Link to="/leaderboard" style={styles.card}>
            <h2>🏆 Leaderboard</h2>
            <p>See top contributors.</p>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>🚀 Built by Team Code Slayers | Hackathon Project</p>
        <p style={{ opacity: 0.6 }}>AI-powered academic collaboration platform</p>
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div style={styles.featureCard}>
      <span style={styles.aiBadge}>AI</span>
      <h3>{title}</h3>
      <p style={{ opacity: 0.85 }}>{desc}</p>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "radial-gradient(1200px 600px at 10% 10%, rgba(56,189,248,.15), transparent), linear-gradient(135deg, #0b1220, #0f2027, #203a43)",
    color: "white",
    padding: "60px 24px",
    fontFamily: "Inter, system-ui, Arial, sans-serif",
  },
  hero: {
    textAlign: "center",
    marginBottom: "60px",
    maxWidth: "960px",
    marginInline: "auto",
  },
  badge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "999px",
    background: "linear-gradient(135deg, #38bdf8, #22d3ee)",
    color: "#002b36",
    fontWeight: 700,
    fontSize: "0.75rem",
    marginBottom: "10px",
  },
  title: {
    fontSize: "3.6rem",
    marginBottom: "8px",
    letterSpacing: "1px",
    textShadow: "0 10px 30px rgba(56,189,248,.25)",
  },
  subtitle: {
    fontSize: "1.5rem",
    fontWeight: 700,
    marginBottom: "8px",
    color: "#93c5fd",
  },
  desc: {
    fontSize: "1.05rem",
    opacity: 0.9,
  },
  ctaRow: {
    marginTop: "26px",
    display: "flex",
    gap: "14px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryBtn: {
    background: "linear-gradient(135deg, #38bdf8, #22d3ee)",
    color: "#002b36",
    padding: "12px 22px",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: 800,
    boxShadow: "0 12px 28px rgba(56,189,248,.35)",
  },
  secondaryBtn: {
    border: "1px solid rgba(56,189,248,.6)",
    color: "#38bdf8",
    padding: "12px 22px",
    borderRadius: "12px",
    textDecoration: "none",
    backdropFilter: "blur(6px)",
  },
  chipsWrap: {
    marginTop: "18px",
    display: "flex",
    gap: "8px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  chip: {
    padding: "6px 12px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,.2)",
    background: "rgba(255,255,255,.06)",
    fontSize: "0.8rem",
    opacity: 0.9,
  },
  statsBar: {
    maxWidth: "1100px",
    margin: "0 auto 60px auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "12px",
  },
  stat: {
    padding: "14px",
    borderRadius: "14px",
    textAlign: "center",
    background: "linear-gradient(135deg, rgba(255,255,255,.12), rgba(255,255,255,.04))",
    border: "1px solid rgba(255,255,255,.18)",
    boxShadow: "0 10px 24px rgba(0,0,0,.35)",
  },
  section: {
    maxWidth: "1100px",
    margin: "0 auto 70px auto",
  },
  sectionTitle: {
    fontSize: "1.9rem",
    marginBottom: "24px",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
  },
  featureCard: {
    position: "relative",
    background: "linear-gradient(135deg, rgba(255,255,255,.12), rgba(255,255,255,.04))",
    padding: "22px",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,.18)",
    boxShadow: "0 12px 30px rgba(0,0,0,.45)",
    transition: "transform .2s ease, box-shadow .2s ease",
  },
  aiBadge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    fontSize: "0.7rem",
    fontWeight: 800,
    padding: "4px 8px",
    borderRadius: "999px",
    background: "linear-gradient(135deg, #22d3ee, #38bdf8)",
    color: "#002b36",
  },
  card: {
    background: "linear-gradient(135deg, rgba(255,255,255,.14), rgba(255,255,255,.05))",
    padding: "26px",
    borderRadius: "18px",
    textDecoration: "none",
    color: "white",
    border: "1px solid rgba(255,255,255,.18)",
    boxShadow: "0 14px 34px rgba(0,0,0,.45)",
    transition: "transform .2s ease, box-shadow .2s ease",
  },
  footer: {
    marginTop: "80px",
    textAlign: "center",
    opacity: 0.8,
  },
};
