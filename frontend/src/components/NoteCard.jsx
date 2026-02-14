import React, { useState } from "react";
import api from "../api/api";

export default function NoteCard({ note }) {
  const [rating, setRating] = useState(note.rating || 0);
  const [ratingCount, setRatingCount] = useState(note.ratingCount || 0);

  // tags safety: if backend sends string, convert to array
  let tagsArray = [];
  if (Array.isArray(note.tags)) {
    tagsArray = note.tags;
  } else if (typeof note.tags === "string") {
    try {
      tagsArray = JSON.parse(note.tags);
    } catch {
      tagsArray = note.tags.split(",").map((t) => t.trim());
    }
  }

  const handleDownload = () => {
    if (!note.fileUrl) {
      alert("File not available!");
      return;
    }
    window.open("http://localhost:5000/" + note.fileUrl, "_blank");
  };

  const handleRate = async (value) => {
    try {
      const res = await api.post(`/rate/${note._id}`, { rating: value });

      // update UI without reload
      setRating(res.data.rating);
      setRatingCount(res.data.ratingCount);

      alert("⭐ Thanks for rating!");
    } catch (err) {
      console.log(err);
      alert("Rating failed!");
    }
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>{note.title || "Untitled Note"}</h3>

      {/* Basic Details */}
      <div style={styles.tags}>
        <span style={styles.tag}>{note.department || "Dept"}</span>
        <span style={styles.tag}>Sem {note.semester || "-"}</span>
        <span style={styles.tag}>{note.subject || "Subject"}</span>
      </div>

      {/* Concept Tags */}
      {tagsArray.length > 0 && (
        <div style={styles.conceptTags}>
          {tagsArray.map((tag, index) => (
            <span key={index} style={styles.conceptTag}>
              🏷 {tag}
            </span>
          ))}
        </div>
      )}

      <p style={styles.meta}>
        Uploaded by{" "}
        <b style={{ color: "#7dd3fc" }}>{note.uploadedBy || "Anonymous"}</b>
      </p>

      <p style={styles.meta}>
        ⭐ Rating:{" "}
        <b style={{ color: "#facc15" }}>
          {Number(rating).toFixed(1)}
        </b>{" "}
        ({ratingCount} votes)
      </p>

      {/* Rating Buttons */}
      <div style={styles.ratingBox}>
        {[1, 2, 3, 4, 5].map((val) => (
          <button
            key={val}
            onClick={() => handleRate(val)}
            style={styles.rateBtn}
          >
            {"⭐".repeat(val)}
          </button>
        ))}
      </div>

      {/* Download Button */}
      <button style={styles.downloadBtn} onClick={handleDownload}>
        Download 📥
      </button>
    </div>
  );
}

const styles = {
  card: {
    padding: "18px",
    borderRadius: "18px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
    transition: "transform 0.2s ease",
  },

  title: {
    fontSize: "1.2rem",
    marginBottom: "12px",
    color: "white",
    fontWeight: "700",
  },

  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "10px",
  },

  tag: {
    padding: "6px 12px",
    borderRadius: "12px",
    fontSize: "0.8rem",
    background: "rgba(56,189,248,0.2)",
    border: "1px solid rgba(56,189,248,0.3)",
    color: "white",
    fontWeight: "600",
  },

  conceptTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "12px",
  },

  conceptTag: {
    padding: "6px 12px",
    borderRadius: "12px",
    fontSize: "0.78rem",
    background: "rgba(168, 85, 247, 0.18)",
    border: "1px solid rgba(168, 85, 247, 0.35)",
    color: "#ddd",
    fontWeight: "600",
  },

  meta: {
    opacity: 0.85,
    marginBottom: "8px",
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
    borderRadius: "12px",
    padding: "7px 10px",
    color: "white",
    cursor: "pointer",
    fontSize: "0.8rem",
    transition: "0.2s",
  },

  downloadBtn: {
    marginTop: "14px",
    width: "100%",
    padding: "12px",
    borderRadius: "14px",
    border: "none",
    background: "linear-gradient(135deg, #38bdf8, #22d3ee)",
    color: "#002b36",
    fontWeight: "900",
    cursor: "pointer",
    fontSize: "1rem",
    boxShadow: "0 8px 22px rgba(56,189,248,0.35)",
  },
};
