import React from "react";

export default function PageWrapper({ title, subtitle, children }) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>{title}</h1>
        {subtitle && <p style={styles.subtitle}>{subtitle}</p>}
      </div>

      <div style={styles.content}>{children}</div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "40px 30px",
    background: "linear-gradient(to right, #0f172a, #111827)",
    color: "white",
    fontFamily: "Arial",
  },
  header: {
    textAlign: "center",
    marginBottom: "35px",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "8px",
  },
  subtitle: {
    opacity: 0.8,
    maxWidth: "700px",
    margin: "0 auto",
    fontSize: "1.05rem",
  },
  content: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
};
