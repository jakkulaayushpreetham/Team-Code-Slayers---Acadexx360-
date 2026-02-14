import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={styles.container}>
      {/* Hero */}
      <div style={styles.hero}>
        <span style={styles.badge}>✨ AI-Powered Campus Hub</span>
        <h1 style={styles.title}>Acadex 📚</h1>
        <p style={styles.subtitle}>
          One Platform. All Your Academic Resources.
        </p>
        <p style={styles.desc}>
          Upload notes → Auto OCR extracts text → AI generates summaries → Smart concept tagging → Search everything instantly.
        </p>

        <div style={styles.ctaRow}>
          <Link to="/upload" style={styles.primaryBtn}>🚀 Upload Notes</Link>
          <Link to="/notes" style={styles.secondaryBtn}>📚 Explore Notes</Link>
        </div>

        {/* Subject Chips */}
        <div style={styles.chipsWrap}>
          {["DBMS", "OS", "Computer Networks", "AI", "Machine Learning", "Data Structures"].map((s) => (
            <Link key={s} to={`/notes?search=${encodeURIComponent(s)}`} style={styles.chip}>{s}</Link>
          ))}
        </div>
      </div>

      {/* AI Pipeline */}
      <div style={styles.pipelineSection}>
        <h2 style={styles.sectionTitle}>⚡ AI Processing Pipeline</h2>
        <div style={styles.pipelineFlow}>
          <PipelineStep emoji="📤" label="Upload" desc="Images & PDFs" />
          <span style={styles.arrow}>→</span>
          <PipelineStep emoji="🔍" label="OCR" desc="Tesseract.js" link="/upload" />
          <span style={styles.arrow}>→</span>
          <PipelineStep emoji="🧠" label="AI Summary" desc="Gemini API" link="/notes" />
          <span style={styles.arrow}>→</span>
          <PipelineStep emoji="🏷️" label="Tagging" desc="Auto Concepts" link="/notes" />
          <span style={styles.arrow}>→</span>
          <PipelineStep emoji="🔎" label="Search" desc="Smart Search" link="/notes" />
          <span style={styles.arrow}>→</span>
          <PipelineStep emoji="🏆" label="Rank" desc="Leaderboard" link="/leaderboard" />
        </div>
      </div>

      {/* Stats */}
      <div style={styles.statsBar}>
        <Link to="/notes" style={styles.stat}>📄 Browse All Notes</Link>
        <Link to="/upload" style={styles.stat}>📤 Upload & OCR</Link>
        <Link to="/leaderboard" style={styles.stat}>🏆 Top Contributors</Link>
        <Link to="/dashboard" style={styles.stat}>🤖 AI Dashboard</Link>
      </div>

      {/* Feature Highlights */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🚀 Why Students Love Acadex</h2>

        <div style={styles.grid}>
          <Link to="/upload" style={styles.featureCardLink}>
            <FeatureCard title="📄 OCR Text Extraction" desc="Upload an image → Tesseract.js extracts all text automatically. Try it now!" />
          </Link>
          <Link to="/notes" style={styles.featureCardLink}>
            <FeatureCard title="🧠 AI Text Summary" desc="Get concise, exam-friendly summaries of your notes powered by AI." />
          </Link>
          <Link to="/upload" style={styles.featureCardLink}>
            <FeatureCard title="🏷️ Concept Tagging" desc="Select or auto-detect tags like DBMS, OS, ML for instant categorization." />
          </Link>
          <Link to="/notes" style={styles.featureCardLink}>
            <FeatureCard title="🔎 Smart Search" desc="Search across titles, OCR text, AI summaries & tags simultaneously." />
          </Link>
          <Link to="/leaderboard" style={styles.featureCardLink}>
            <FeatureCard title="🏆 Leaderboard" desc="Upload quality notes, earn ratings, and climb the contributor rankings." />
          </Link>
          <Link to="/notes" style={styles.featureCardLink}>
            <FeatureCard title="🎓 Dept / Sem Wise" desc="Filter by department, semester, and subject for structured access." />
          </Link>
        </div>
      </div>

      {/* Navigation Cards */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>📌 Jump Right In</h2>

        <div style={styles.grid}>
          <Link to="/dashboard" style={styles.card}>
            <h2>🎓 Dashboard</h2>
            <p>Track uploads, AI insights & achievements.</p>
            <span style={styles.cardHint}>Open →</span>
          </Link>

          <Link to="/upload" style={styles.card}>
            <h2>📤 Upload Notes</h2>
            <p>Upload images for OCR + AI processing.</p>
            <span style={styles.cardHint}>Open →</span>
          </Link>

          <Link to="/notes" style={styles.card}>
            <h2>📚 Notes Library</h2>
            <p>Search, filter & download notes.</p>
            <span style={styles.cardHint}>Open →</span>
          </Link>

          <Link to="/leaderboard" style={styles.card}>
            <h2>🏆 Leaderboard</h2>
            <p>See top contributors & rankings.</p>
            <span style={styles.cardHint}>Open →</span>
          </Link>
        </div>
      </div>

      {/* How It Works */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🛠️ How It Works</h2>
        <div style={styles.stepsGrid}>
          <Step num="1" title="Upload" desc="Go to Upload page, fill the form, select concept tags, and upload your image/PDF." link="/upload" />
          <Step num="2" title="Auto-OCR" desc="Tesseract.js extracts text from your image automatically in the background." />
          <Step num="3" title="AI Summary" desc="Our AI generates a concise, exam-friendly summary from the extracted text." />
          <Step num="4" title="Browse & Search" desc="Go to Notes Library to search, filter, rate, download, and share AI-processed notes." link="/notes" />
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>🚀 Built by Team Code Slayers | Hackathon Project</p>
        <p style={{ opacity: 0.6, marginTop: "4px" }}>Acadex – AI-powered academic collaboration platform</p>
      </footer>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div style={styles.featureCard}>
      <span style={styles.aiBadge}>AI</span>
      <h3>{title}</h3>
      <p style={{ opacity: 0.85, marginTop: "6px" }}>{desc}</p>
    </div>
  );
}

function PipelineStep({ emoji, label, desc, link }) {
  const content = (
    <div style={styles.pipelineStep}>
      <span style={{ fontSize: "1.5rem" }}>{emoji}</span>
      <p style={{ fontWeight: 700, fontSize: "0.85rem" }}>{label}</p>
      <p style={{ opacity: 0.6, fontSize: "0.72rem" }}>{desc}</p>
    </div>
  );
  if (link) return <Link to={link} style={{ textDecoration: "none", color: "inherit" }}>{content}</Link>;
  return content;
}

function Step({ num, title, desc, link }) {
  const content = (
    <div style={styles.stepCard}>
      <span style={styles.stepNum}>{num}</span>
      <h3 style={{ marginBottom: "6px" }}>{title}</h3>
      <p style={{ opacity: 0.8, fontSize: "0.9rem", lineHeight: 1.5 }}>{desc}</p>
      {link && <span style={styles.stepLink}>Try it →</span>}
    </div>
  );
  if (link) return <Link to={link} style={{ textDecoration: "none", color: "inherit" }}>{content}</Link>;
  return content;
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
    marginBottom: "50px",
    maxWidth: "960px",
    marginInline: "auto",
  },
  badge: {
    display: "inline-block",
    padding: "6px 14px",
    borderRadius: "999px",
    background: "linear-gradient(135deg, #38bdf8, #22d3ee)",
    color: "#002b36",
    fontWeight: 700,
    fontSize: "0.78rem",
    marginBottom: "12px",
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
    maxWidth: "600px",
    margin: "0 auto",
    lineHeight: 1.6,
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
    padding: "14px 26px",
    borderRadius: "14px",
    textDecoration: "none",
    fontWeight: 800,
    fontSize: "1.05rem",
    boxShadow: "0 12px 28px rgba(56,189,248,.35)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  secondaryBtn: {
    border: "1px solid rgba(56,189,248,.6)",
    color: "#38bdf8",
    padding: "14px 26px",
    borderRadius: "14px",
    textDecoration: "none",
    fontWeight: 700,
    fontSize: "1.05rem",
    backdropFilter: "blur(6px)",
    transition: "all 0.2s ease",
  },
  chipsWrap: {
    marginTop: "20px",
    display: "flex",
    gap: "8px",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  chip: {
    padding: "7px 14px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,.2)",
    background: "rgba(255,255,255,.06)",
    fontSize: "0.82rem",
    opacity: 0.9,
    textDecoration: "none",
    color: "white",
    transition: "all 0.15s ease",
    cursor: "pointer",
  },
  // Pipeline
  pipelineSection: {
    maxWidth: "1000px",
    margin: "0 auto 50px auto",
    padding: "28px 24px",
    borderRadius: "22px",
    background: "linear-gradient(145deg, rgba(56,189,248,0.12), rgba(34,211,238,0.05))",
    border: "1px solid rgba(56,189,248,0.25)",
    boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
  },
  pipelineFlow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "16px",
  },
  pipelineStep: {
    textAlign: "center",
    padding: "14px 16px",
    borderRadius: "14px",
    background: "rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.12)",
    minWidth: "90px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  arrow: {
    color: "#38bdf8",
    fontWeight: 800,
    fontSize: "1.2rem",
  },
  // Stats
  statsBar: {
    maxWidth: "1100px",
    margin: "0 auto 50px auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
  },
  stat: {
    padding: "16px",
    borderRadius: "16px",
    textAlign: "center",
    background: "linear-gradient(135deg, rgba(255,255,255,.12), rgba(255,255,255,.04))",
    border: "1px solid rgba(255,255,255,.18)",
    boxShadow: "0 10px 24px rgba(0,0,0,.35)",
    textDecoration: "none",
    color: "white",
    fontWeight: 600,
    fontSize: "0.95rem",
    transition: "all 0.2s ease",
    cursor: "pointer",
  },
  // Sections
  section: {
    maxWidth: "1100px",
    margin: "0 auto 60px auto",
  },
  sectionTitle: {
    fontSize: "1.9rem",
    marginBottom: "24px",
    textAlign: "center",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "18px",
  },
  featureCardLink: {
    textDecoration: "none",
    color: "white",
  },
  featureCard: {
    position: "relative",
    background: "linear-gradient(135deg, rgba(255,255,255,.12), rgba(255,255,255,.04))",
    padding: "24px",
    borderRadius: "18px",
    border: "1px solid rgba(255,255,255,.18)",
    boxShadow: "0 12px 30px rgba(0,0,0,.45)",
    transition: "transform .2s ease, box-shadow .2s ease",
    cursor: "pointer",
    height: "100%",
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
    position: "relative",
    background: "linear-gradient(135deg, rgba(255,255,255,.14), rgba(255,255,255,.05))",
    padding: "26px",
    borderRadius: "18px",
    textDecoration: "none",
    color: "white",
    border: "1px solid rgba(255,255,255,.18)",
    boxShadow: "0 14px 34px rgba(0,0,0,.45)",
    transition: "transform .2s ease, box-shadow .2s ease",
  },
  cardHint: {
    position: "absolute",
    bottom: "14px",
    right: "16px",
    opacity: 0.6,
    fontSize: "0.82rem",
  },
  // Steps
  stepsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
  },
  stepCard: {
    position: "relative",
    padding: "24px",
    borderRadius: "18px",
    background: "linear-gradient(145deg, rgba(255,255,255,.1), rgba(255,255,255,.03))",
    border: "1px solid rgba(255,255,255,.15)",
    boxShadow: "0 12px 28px rgba(0,0,0,.4)",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  stepNum: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    borderRadius: "999px",
    background: "linear-gradient(135deg, #38bdf8, #22d3ee)",
    color: "#002b36",
    fontWeight: 800,
    fontSize: "0.85rem",
    marginBottom: "10px",
  },
  stepLink: {
    display: "inline-block",
    marginTop: "8px",
    color: "#7dd3fc",
    fontSize: "0.85rem",
    fontWeight: 600,
  },
  footer: {
    marginTop: "60px",
    textAlign: "center",
    opacity: 0.8,
  },
};
