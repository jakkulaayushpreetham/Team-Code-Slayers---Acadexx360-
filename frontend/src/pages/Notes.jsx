import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import RatingStars from "../components/RatingStars";
import api from "../api/api";

const API_BASE = "http://localhost:5000";

export default function Notes() {
  const [searchParams] = useSearchParams();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    department: "",
    semester: "",
    subject: "",
    search: searchParams.get("search") || "",
  });

  const fetchNotes = async () => {
    setLoading(true);
    try {
      // Build query params, omitting empty values
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => {
        if (v) params.set(k, v);
      });
      const res = await api.get(`/notes/search?${params}`);
      setNotes(res.data);
    } catch (err) {
      console.log("Error fetching notes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleProcessNote = async (id) => {
    try {
      await api.post(`/notes/${id}/process`);
      fetchNotes();
      alert("Note processed with OCR & AI ✅");
    } catch (err) {
      console.log("Error processing note:", err);
      alert("Error processing note");
    }
  };

  const handleDownload = (filePath) => {
    window.open(`${API_BASE}/${filePath}`, "_blank");
  };

  const handleShare = (filePath) => {
    const url = `${API_BASE}/${filePath}`;
    navigator.clipboard.writeText(url);
    alert("📋 Link copied to clipboard!");
  };

  const isImage = (filePath) => {
    if (!filePath) return false;
    const ext = filePath.split(".").pop().toLowerCase();
    return ["jpg", "jpeg", "png", "gif", "webp"].includes(ext);
  };

  return (
    <PageWrapper
      title="📚 Notes Library"
      subtitle="Explore AI-processed academic resources with OCR text extraction and smart summaries."
    >
      <div style={styles.container}>
        {/* Search & Filters */}
        <div style={styles.filterPanel}>
          <div style={styles.searchRow}>
            <span style={styles.searchIcon}>🔍</span>
            <input
              type="text"
              name="search"
              placeholder="Smart search across titles, content, summaries & tags..."
              value={filters.search}
              onChange={handleFilterChange}
              style={styles.searchInput}
            />
          </div>

          <div style={styles.filterRow}>
            <select name="department" value={filters.department} onChange={handleFilterChange} style={styles.select}>
              <option value="">All Departments</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="ME">ME</option>
              <option value="EEE">EEE</option>
              <option value="CE">CE</option>
              <option value="IT">IT</option>
              <option value="AI&DS">AI&DS</option>
            </select>

            <select name="semester" value={filters.semester} onChange={handleFilterChange} style={styles.select}>
              <option value="">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <option key={s} value={String(s)}>Semester {s}</option>
              ))}
            </select>

            <input
              type="text"
              name="subject"
              placeholder="Filter by subject..."
              value={filters.subject}
              onChange={handleFilterChange}
              style={styles.select}
            />

            {(filters.department || filters.semester || filters.subject || filters.search) && (
              <button
                onClick={() => setFilters({ department: "", semester: "", subject: "", search: "" })}
                style={styles.clearBtn}
              >
                ✕ Clear
              </button>
            )}
          </div>
        </div>

        {/* Results count */}
        <p style={styles.resultsText}>
          {loading ? "Loading..." : `${notes.length} note${notes.length !== 1 ? "s" : ""} found`}
        </p>

        {/* Notes Grid */}
        <div style={styles.grid}>
          {notes.map((note) => (
            <div key={note._id} style={styles.noteCard}>
              {/* File Preview */}
              {note.filePath && isImage(note.filePath) ? (
                <img
                  src={`${API_BASE}/${note.filePath}`}
                  alt={note.title}
                  style={styles.preview}
                  onError={(e) => { e.target.style.display = "none"; }}
                />
              ) : (
                <div style={styles.pdfPreview}>
                  <span style={{ fontSize: "2rem" }}>📄</span>
                  <span>{note.originalName || "PDF Document"}</span>
                </div>
              )}

              {/* Title & Meta */}
              <h3 style={styles.noteTitle}>{note.title}</h3>
              <div style={styles.metaRow}>
                <span style={styles.metaTag}>{note.department}</span>
                <span style={styles.metaTag}>Sem {note.semester}</span>
                <span style={styles.metaTag}>{note.subject}</span>
              </div>
              <p style={styles.uploader}>
                Uploaded by <b>{note.uploadedBy || "Anonymous"}</b>
              </p>

              {/* AI Summary */}
              {note.summary && (
                <div style={styles.summaryBox}>
                  <p style={styles.summaryLabel}>🧠 AI Summary</p>
                  <p style={styles.summaryText}>{note.summary}</p>
                </div>
              )}

              {/* Concept Tags */}
              {note.tags && note.tags.length > 0 && (
                <div style={styles.conceptTags}>
                  {note.tags.map((tag, i) => (
                    <span key={i} style={styles.conceptTag}>🏷️ {tag}</span>
                  ))}
                </div>
              )}

              {/* Extracted Text Preview */}
              {note.extractedText && (
                <details style={styles.ocrDetails}>
                  <summary style={styles.ocrSummary}>📄 OCR Extracted Text</summary>
                  <p style={styles.ocrText}>{note.extractedText.substring(0, 300)}...</p>
                </details>
              )}

              {/* Rating */}
              <div style={styles.ratingRow}>
                <span style={{ fontSize: "0.88rem" }}>
                  ⭐ {note.rating?.toFixed(1) || "0.0"} ({note.ratingCount || 0} votes)
                </span>
                <RatingStars noteId={note._id} onRated={fetchNotes} />
              </div>

              {/* Actions */}
              <div style={styles.actions}>
                {!note.summary && !note.extractedText && (
                  <button onClick={() => handleProcessNote(note._id)} style={styles.processBtn}>
                    🤖 OCR & Process
                  </button>
                )}
                <button onClick={() => handleDownload(note.filePath)} style={styles.downloadBtn}>
                  ⬇️ Download
                </button>
                <button onClick={() => handleShare(note.filePath)} style={styles.shareBtn}>
                  🔗 Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {!loading && notes.length === 0 && (
          <div style={styles.empty}>
            <p style={{ fontSize: "2rem" }}>📭</p>
            <p>No notes found. Try adjusting your filters or upload some notes!</p>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}

const styles = {
  container: {
    padding: "0",
  },
  filterPanel: {
    padding: "18px 20px",
    borderRadius: "18px",
    background: "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 12px 30px rgba(0,0,0,0.3)",
    marginBottom: "18px",
  },
  searchRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "12px",
  },
  searchIcon: {
    fontSize: "1.2rem",
  },
  searchInput: {
    flex: 1,
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(0,0,0,0.35)",
    color: "white",
    outline: "none",
    fontSize: "0.95rem",
  },
  filterRow: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    alignItems: "center",
  },
  select: {
    padding: "10px 12px",
    borderRadius: "10px",
    background: "rgba(0,0,0,0.3)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.18)",
    outline: "none",
    fontSize: "0.9rem",
    flex: "1",
    minWidth: "140px",
  },
  clearBtn: {
    padding: "10px 14px",
    borderRadius: "10px",
    border: "1px solid rgba(239,68,68,0.5)",
    background: "rgba(239,68,68,0.15)",
    color: "#fca5a5",
    cursor: "pointer",
    fontSize: "0.82rem",
    fontWeight: 600,
  },
  resultsText: {
    fontSize: "0.88rem",
    opacity: 0.7,
    marginBottom: "14px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
    gap: "18px",
  },
  noteCard: {
    padding: "20px",
    borderRadius: "18px",
    background: "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.35)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  preview: {
    width: "100%",
    height: "200px",
    borderRadius: "12px",
    objectFit: "cover",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  pdfPreview: {
    width: "100%",
    height: "120px",
    borderRadius: "12px",
    background: "rgba(0,0,0,0.25)",
    border: "1px dashed rgba(255,255,255,0.15)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    fontSize: "0.85rem",
    opacity: 0.8,
  },
  noteTitle: {
    fontSize: "1.15rem",
    fontWeight: 700,
    color: "#f1f5f9",
  },
  metaRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },
  metaTag: {
    padding: "4px 10px",
    borderRadius: "8px",
    fontSize: "0.75rem",
    background: "rgba(56,189,248,0.15)",
    border: "1px solid rgba(56,189,248,0.3)",
    color: "#7dd3fc",
    fontWeight: 600,
  },
  uploader: {
    fontSize: "0.85rem",
    opacity: 0.75,
  },
  summaryBox: {
    padding: "12px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, rgba(34,211,238,0.1), rgba(56,189,248,0.06))",
    border: "1px solid rgba(56,189,248,0.2)",
  },
  summaryLabel: {
    fontSize: "0.75rem",
    fontWeight: 700,
    color: "#22d3ee",
    marginBottom: "6px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  summaryText: {
    fontSize: "0.88rem",
    lineHeight: 1.6,
    opacity: 0.9,
  },
  conceptTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "5px",
  },
  conceptTag: {
    padding: "3px 8px",
    background: "rgba(168,85,247,0.15)",
    border: "1px solid rgba(168,85,247,0.3)",
    borderRadius: "8px",
    fontSize: "0.72rem",
    color: "#c4b5fd",
  },
  ocrDetails: {
    fontSize: "0.85rem",
  },
  ocrSummary: {
    cursor: "pointer",
    opacity: 0.8,
    fontSize: "0.82rem",
    fontWeight: 600,
  },
  ocrText: {
    marginTop: "6px",
    padding: "10px",
    borderRadius: "10px",
    background: "rgba(0,0,0,0.25)",
    fontSize: "0.82rem",
    lineHeight: 1.5,
    opacity: 0.8,
    whiteSpace: "pre-wrap",
  },
  ratingRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "6px",
  },
  actions: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginTop: "4px",
  },
  processBtn: {
    flex: 1,
    padding: "9px 12px",
    borderRadius: "10px",
    border: "1px solid rgba(168,85,247,0.5)",
    background: "rgba(168,85,247,0.15)",
    color: "#c4b5fd",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.82rem",
  },
  downloadBtn: {
    flex: 1,
    padding: "9px 12px",
    borderRadius: "10px",
    border: "none",
    background: "linear-gradient(135deg, #38bdf8, #22d3ee)",
    color: "#002b36",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "0.82rem",
  },
  shareBtn: {
    padding: "9px 12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.82rem",
  },
  empty: {
    textAlign: "center",
    padding: "40px",
    opacity: 0.7,
  },
};
