import React from "react";
import PageWrapper from "../components/PageWrapper";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <PageWrapper
      title="🎓 Student Command Center"
      subtitle="Your academic performance, contributions & AI-powered insights in one place."
    >
      {/* Stats */}
      <div style={styles.grid}>
        <StatCard title="📤 Uploads" value="12" subtitle="Total notes uploaded" glow />
        <StatCard title="⭐ Avg Rating" value="4.5" subtitle="Quality of your notes" />
        <StatCard title="🏆 Rank" value="#2" subtitle="Leaderboard position" glow />
        <StatCard title="⬇️ Downloads" value="326" subtitle="Total downloads" />
      </div>

      {/* AI Insights */}
      <div style={styles.aiPanel}>
        <h2>🤖 AI Insights</h2>
        <div style={styles.aiGrid}>
          <AIStat label="OCR Used" value="28 files" />
          <AIStat label="Summaries Generated" value="41" />
          <AIStat label="Concept Tags" value="112" />
        </div>
        <p style={{ opacity: 0.75, marginTop: "6px" }}>
          You’re actively using AI features. Keep going to boost productivity 🚀
        </p>
      </div>

      {/* Quick Actions */}
      <div style={styles.quickWrap}>
        <h2 style={{ marginBottom: "12px" }}>⚡ Quick Student Actions</h2>
        <div style={styles.quickGrid}>
          <QuickAction to="/notes" title="📚 PYQs" desc="Previous year question papers" />
          <QuickAction to="/notes" title="📅 Exam Timetable" desc="Check upcoming exams" />
          <QuickAction to="/notes" title="📢 Exam Updates" desc="Important announcements" />
          <QuickAction to="/notes" title="🎯 Top Notes" desc="Best rated notes" />
        </div>
      </div>

      {/* Achievements */}
      <div style={styles.achievements}>
        <h2>🏅 Achievements</h2>
        <div style={styles.badges}>
          <Badge text="🔥 Top Contributor" />
          <Badge text="🤖 AI Power User" />
          <Badge text="⭐ High Rated" />
          <Badge text="📤 Consistent Uploader" />
        </div>
      </div>
    </PageWrapper>
  );
}

function StatCard({ title, value, subtitle, glow }) {
  return (
    <div style={{ ...styles.card, ...(glow ? styles.glow : {}) }}>
      <h3>{title}</h3>
      <p style={styles.big}>{value}</p>
      <p style={styles.small}>{subtitle}</p>
    </div>
  );
}

function AIStat({ label, value }) {
  return (
    <div style={styles.aiStat}>
      <p style={{ fontWeight: 700 }}>{value}</p>
      <p style={{ opacity: 0.7 }}>{label}</p>
    </div>
  );
}

function QuickAction({ to, title, desc }) {
  return (
    <Link to={to} style={styles.quickCard}>
      <h3>{title}</h3>
      <p style={{ opacity: 0.8 }}>{desc}</p>
      <span style={styles.quickHint}>Open →</span>
    </Link>
  );
}

function Badge({ text }) {
  return <span style={styles.badge}>{text}</span>;
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "18px",
    marginBottom: "22px",
  },
  card: {
    background: "linear-gradient(135deg, rgba(255,255,255,.12), rgba(255,255,255,.04))",
    borderRadius: "18px",
    padding: "22px",
    border: "1px solid rgba(255,255,255,.18)",
    textAlign: "center",
    boxShadow: "0 12px 30px rgba(0,0,0,.45)",
    transition: "transform .2s ease, box-shadow .2s ease",
  },
  glow: {
    boxShadow: "0 16px 40px rgba(56,189,248,.45)",
  },
  big: {
    fontSize: "2.4rem",
    fontWeight: "900",
    margin: "10px 0",
    color: "#38bdf8",
  },
  small: {
    opacity: 0.8,
  },
  aiPanel: {
    marginTop: "10px",
    padding: "20px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, rgba(34,211,238,.18), rgba(56,189,248,.08))",
    border: "1px solid rgba(255,255,255,.18)",
    boxShadow: "0 16px 36px rgba(0,0,0,.45)",
  },
  aiGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "12px",
    marginTop: "10px",
  },
  aiStat: {
    padding: "14px",
    borderRadius: "14px",
    background: "rgba(0,0,0,.35)",
    textAlign: "center",
    border: "1px solid rgba(255,255,255,.15)",
  },
  quickWrap: {
    marginTop: "26px",
  },
  quickGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },
  quickCard: {
    position: "relative",
    textDecoration: "none",
    color: "white",
    padding: "22px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, rgba(255,255,255,.14), rgba(255,255,255,.05))",
    border: "1px solid rgba(255,255,255,.18)",
    boxShadow: "0 12px 28px rgba(0,0,0,.45)",
    transition: "transform .2s ease, box-shadow .2s ease",
  },
  quickHint: {
    position: "absolute",
    bottom: "12px",
    right: "14px",
    opacity: 0.7,
    fontSize: "0.8rem",
  },
  achievements: {
    marginTop: "26px",
    padding: "18px",
    borderRadius: "18px",
    background: "linear-gradient(135deg, rgba(255,255,255,.12), rgba(255,255,255,.04))",
    border: "1px solid rgba(255,255,255,.18)",
  },
  badges: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "10px",
  },
  badge: {
    padding: "6px 12px",
    borderRadius: "999px",
    background: "linear-gradient(135deg, #38bdf8, #22d3ee)",
    color: "#002b36",
    fontWeight: 800,
    fontSize: "0.75rem",
  },
};
