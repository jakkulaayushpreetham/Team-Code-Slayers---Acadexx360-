import React from "react";
import api from "../api/api";

export default function NoteCard({ note }) {
  const handleDownload = () => {
    // backend is serving uploads folder publicly
    window.open("http://localhost:5000/" + note.fileUrl, "_blank");
  };

  const handleRate = async (value) => {
    try {
      await api.post(`/rate/${note._id}`, { rating: value });
      alert("Rating submitted successfully!");
      window.location.reload(); // simple refresh for hackathon
    } catch (err) {
      console.log(err);
      alert("Rating failed!");
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{note.title}</h3>

      <div style={styles.tags}>
        <span style={styles.tag}>{note.department}</span>
        <span style={styles.tag}>Sem {note.semester}</span>
        <span style={styles.tag}>{note.subject}</span>
      </div>

      <p style={styles.meta}>
        Uploaded by <b>{note.uploadedBy}</b>
      </p>

      <p style={styles.meta}>
        ⭐ Rating: <b>{note.rating?.toFixed(1)}</b> ({note.ratingCount} votes)
      </p>

      <div style={styles.ratingBox}>
        <button onClick={() => handleRate(5)} style={styles.rateBtn}>
          ⭐⭐⭐⭐⭐
        </button>
        <button onClick={() => handleRate(4)} style={styles.rateBtn}>
          ⭐⭐⭐⭐
        </button>
        <button onClick={() => handleRate(3)} style={styles.rateBtn}>
          ⭐⭐⭐
        </button>
      </div>

      <button style={styles.downloadBtn} onClick={handleDownload}>
        Download
      </button>
    </div>
  );
}

const styles = {
  card: {
    padding: "18px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.35)",
  },
  title: {
    fontSize: "1.2rem",
    marginBottom: "10px",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "10px",
  },
  tag: {
    padding: "6px 10px",
    borderRadius: "10px",
    fontSize: "0.8rem",
    background: "rgba(56,189,248,0.2)",
    border: "1px solid rgba(56,189,248,0.3)",
    color: "white",
  },
  meta: {
    opacity: 0.85,
    marginBottom: "6px",
    fontSize: "0.95rem",
    color: "white",
  },
  ratingBox: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
    marginTop: "12px",
  },
  rateBtn: {
    background: "rgba(0,0,0,0.25)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "10px",
    padding: "6px 10px",
    color: "white",
    cursor: "pointer",
    fontSize: "0.8rem",
  },
  downloadBtn: {
    marginTop: "14px",
    width: "100%",
    padding: "10px",
    borderRadius: "12px",
    border: "none",
    background: "#38bdf8",
    color: "black",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
