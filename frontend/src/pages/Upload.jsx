import React, { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import LeaderboardWidget from "../components/LeaderboardWidget";
import api from "../api/api";

const CONCEPT_TAGS = [
  "DBMS", "OS", "CN", "AI", "ML", "Data Structures", "Algorithms",
  "OOP", "Computer Architecture", "Software Engineering", "Python",
  "Java", "C++", "Web Development", "Cloud Computing", "Cybersecurity",
];

export default function Upload() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [uploadedBy, setUploadedBy] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState("");

  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    try {
      const res = await api.get("/leaderboard");
      setLeaderboard(res.data);
    } catch (err) {
      console.log("Leaderboard fetch error:", err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    setUploading(true);
    setStatus("Uploading...");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subject", subject);
      formData.append("department", department);
      formData.append("semester", semester);
      formData.append("uploadedBy", uploadedBy);
      formData.append("tags", JSON.stringify(selectedTags));
      formData.append("file", file);

      const res = await api.post("/notes/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus("✅ " + res.data.message);

      // Reset form
      setTitle("");
      setSubject("");
      setDepartment("");
      setSemester("");
      setUploadedBy("");
      setSelectedTags([]);
      setFile(null);
      fetchLeaderboard();
    } catch (err) {
      console.log("Upload failed:", err);
      setStatus("❌ Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <PageWrapper
      title="📤 Upload Notes"
      subtitle="Share your academic resources. Images will be auto-processed with OCR & AI summarization."
    >
      <div style={styles.layout}>
        {/* Submission Form */}
        <div style={styles.formCard}>
          <div style={styles.cardHeader}>
            <h2 style={styles.heading}>📝 Submission Form</h2>
            <span style={styles.aiBadge}>🤖 AI-Powered</span>
          </div>
          <p style={styles.helper}>
            Upload images or PDFs. Image files will automatically go through OCR → AI Summary → Concept Tagging pipeline.
          </p>

          <form onSubmit={handleSubmit} style={styles.form}>
            <Field label="Title of Notes">
              <input
                style={styles.input}
                placeholder="e.g., Unit-3 Operating Systems Notes"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Field>

            <Field label="Subject">
              <input
                style={styles.input}
                placeholder="e.g., Operating Systems"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </Field>

            <div style={styles.row}>
              <Field label="Department">
                <select
                  style={styles.input}
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                >
                  <option value="">Select Department</option>
                  <option value="CSE">CSE</option>
                  <option value="ECE">ECE</option>
                  <option value="ME">ME</option>
                  <option value="EEE">EEE</option>
                  <option value="CE">CE</option>
                  <option value="IT">IT</option>
                  <option value="AI&DS">AI&DS</option>
                </select>
              </Field>

              <Field label="Semester">
                <select
                  style={styles.input}
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  required
                >
                  <option value="">Select Semester</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                    <option key={s} value={String(s)}>Semester {s}</option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Contributor Name">
              <input
                style={styles.input}
                placeholder="Your full name"
                value={uploadedBy}
                onChange={(e) => setUploadedBy(e.target.value)}
                required
              />
            </Field>

            {/* Concept Tags */}
            <Field label="Concept Tags (select relevant topics)">
              <div style={styles.tagsGrid}>
                {CONCEPT_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    style={{
                      ...styles.tagBtn,
                      ...(selectedTags.includes(tag) ? styles.tagActive : {}),
                    }}
                  >
                    {selectedTags.includes(tag) ? "✓ " : ""}{tag}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="Upload File (Images / PDF)">
              <input
                style={styles.input}
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </Field>

            <button style={styles.submitBtn} type="submit" disabled={uploading}>
              {uploading ? "⏳ Uploading..." : "🚀 Upload & Process"}
            </button>

            {status && (
              <p style={{ marginTop: "8px", fontSize: "0.9rem", opacity: 0.9 }}>
                {status}
              </p>
            )}
          </form>

          {/* AI Pipeline Info */}
          <div style={styles.pipeline}>
            <p style={styles.pipelineTitle}>⚡ AI Processing Pipeline</p>
            <div style={styles.pipelineFlow}>
              <span style={styles.pipelineStep}>📤 Upload</span>
              <span style={styles.arrow}>→</span>
              <span style={styles.pipelineStep}>🔍 OCR</span>
              <span style={styles.arrow}>→</span>
              <span style={styles.pipelineStep}>🧠 AI Summary</span>
              <span style={styles.arrow}>→</span>
              <span style={styles.pipelineStep}>🏷️ Tags</span>
              <span style={styles.arrow}>→</span>
              <span style={styles.pipelineStep}>🔎 Searchable</span>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={styles.sidePanel}>
          <h3 style={styles.sideHeading}>🏆 Top Contributors</h3>
          <p style={styles.sideHelper}>
            Upload quality notes to climb the leaderboard!
          </p>
          <LeaderboardWidget data={leaderboard} />
        </div>
      </div>
    </PageWrapper>
  );
}

function Field({ label, children }) {
  return (
    <div style={styles.field}>
      <label style={styles.label}>{label}</label>
      {children}
    </div>
  );
}

const styles = {
  layout: {
    display: "grid",
    gridTemplateColumns: "2.2fr 1fr",
    gap: "20px",
  },
  formCard: {
    padding: "28px",
    borderRadius: "20px",
    background: "linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "6px",
  },
  heading: {
    fontSize: "1.4rem",
  },
  aiBadge: {
    padding: "4px 10px",
    borderRadius: "999px",
    background: "linear-gradient(135deg, #22d3ee, #38bdf8)",
    color: "#002b36",
    fontSize: "0.72rem",
    fontWeight: 800,
  },
  helper: {
    fontSize: "0.88rem",
    opacity: 0.7,
    marginBottom: "18px",
    lineHeight: 1.5,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "0.78rem",
    letterSpacing: "0.5px",
    opacity: 0.8,
    textTransform: "uppercase",
    fontWeight: 600,
  },
  input: {
    padding: "11px 12px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(0,0,0,0.35)",
    color: "white",
    outline: "none",
    fontSize: "0.92rem",
    transition: "border-color 0.2s",
  },
  tagsGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  tagBtn: {
    padding: "6px 12px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "rgba(255,255,255,0.06)",
    color: "white",
    cursor: "pointer",
    fontSize: "0.78rem",
    transition: "all 0.15s ease",
  },
  tagActive: {
    background: "linear-gradient(135deg, rgba(56,189,248,0.9), rgba(34,211,238,0.9))",
    color: "#002b36",
    border: "1px solid transparent",
    fontWeight: 700,
    boxShadow: "0 6px 18px rgba(56,189,248,0.4)",
  },
  submitBtn: {
    marginTop: "6px",
    padding: "13px",
    borderRadius: "12px",
    border: "none",
    background: "linear-gradient(135deg, rgba(56,189,248,.95), rgba(34,211,238,.95))",
    color: "#002b36",
    fontWeight: 800,
    fontSize: "1rem",
    cursor: "pointer",
    boxShadow: "0 10px 28px rgba(56,189,248,0.35)",
    transition: "all 0.2s ease",
  },
  pipeline: {
    marginTop: "20px",
    padding: "14px 16px",
    borderRadius: "14px",
    background: "rgba(56,189,248,0.08)",
    border: "1px solid rgba(56,189,248,0.2)",
  },
  pipelineTitle: {
    fontSize: "0.82rem",
    fontWeight: 700,
    marginBottom: "10px",
    color: "#7dd3fc",
  },
  pipelineFlow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    flexWrap: "wrap",
    fontSize: "0.75rem",
  },
  pipelineStep: {
    padding: "4px 10px",
    borderRadius: "8px",
    background: "rgba(0,0,0,0.3)",
    border: "1px solid rgba(255,255,255,0.12)",
    whiteSpace: "nowrap",
  },
  arrow: {
    color: "#38bdf8",
    fontWeight: 700,
  },
  sidePanel: {
    padding: "22px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
    alignSelf: "start",
    position: "sticky",
    top: "80px",
  },
  sideHeading: {
    marginBottom: "6px",
    fontSize: "1.15rem",
  },
  sideHelper: {
    fontSize: "0.85rem",
    opacity: 0.7,
    marginBottom: "14px",
  },
};
