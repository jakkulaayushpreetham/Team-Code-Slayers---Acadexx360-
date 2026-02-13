import React from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={styles.navbar}>
      <div style={styles.logo}>
        <span style={styles.logoIcon}>📚</span>
        <span style={styles.logoText}>Acadexx360</span>
      </div>

      <div style={styles.links}>
        <NavLink to="/" style={navStyle}>
          Home
        </NavLink>
        <NavLink to="/dashboard" style={navStyle}>
          Dashboard
        </NavLink>
        <NavLink to="/notes" style={navStyle}>
          Notes
        </NavLink>
        <NavLink to="/upload" style={navStyle}>
          Upload
        </NavLink>
        <NavLink to="/leaderboard" style={navStyle}>
          Leaderboard
        </NavLink>
      </div>
    </div>
  );
}

const navStyle = ({ isActive }) => ({
  textDecoration: "none",
  color: isActive ? "#38bdf8" : "white",
  fontWeight: isActive ? "bold" : "500",
  padding: "8px 14px",
  borderRadius: "8px",
  transition: "0.3s",
  background: isActive ? "rgba(56,189,248,0.15)" : "transparent",
});

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    background: "rgba(15,23,42,0.95)",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "1.3rem",
    fontWeight: "bold",
    color: "white",
  },
  logoIcon: {
    fontSize: "1.6rem",
  },
  logoText: {
    letterSpacing: "0.5px",
  },
  links: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
};
