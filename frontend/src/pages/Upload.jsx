import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import LeaderboardWidget from "../components/LeaderboardWidget";
import api from "../api/api";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [department, setDepartment] = useState("");
  const [semester, setSemester] = useState("");
  const [uploadedBy, setUploadedBy] = useState("");
  const [file, setFile] = useState(null);

  const [leaderboard, setLeaderboard] = useState([]);

  const fetchLeaderboard = async () => {
    try {
      const res = await api.get("/leaderboard");
      setLeaderboard(res.data);
    } catch (err) {
      console.log("Error fetching leaderboard:", err);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subject", subject);
      formData.append("department", department);
      formData.append("semester", semester);
      formData.append("uploadedBy", uploadedBy);
      formData.append("file", file);

      await api.post("/notes/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Your notes have been submitted successfully.");

      setTitle("");
      setSubject("");
      setDepartment("");
      setSemester("");
      setUploadedBy("");
      setFile(null);

      fetchLeaderboard();
    } catch (err) {
      console.log("Upload failed:", err);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <PageWrapper
      title="Academic Notes Submission Portal"
      subtitle="Submit verified academic resources for your department. All submissions are reviewed."
    >
      <div style={styles.layout}>
        {/* Submission Form */}
        <div style={styles.formCard}>
          <h2 style={styles.heading}>Submission Form</h2>
          <p style={styles.helper}>
            Please ensure the information provided is accurate. Submissions may be reviewed by faculty or moderators.
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
                <input
                  style={styles.input}
                  placeholder="e.g., CSE / IT / AI & DS"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                />
              </Field>

              <Field label="Semester">
                <input
                  style={styles.input}
                  placeholder="1 to 8"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                  required
                />
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

            <Field label="Upload File (PDF / DOC / PPT)">
              <input
                style={styles.input}
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
            </Field>

            <button style={styles.submitBtn} type="submit">
              Submit for Review
            </button>
          </form>
        </div>

        {/* Leaderboard */}
        <div style={styles.sidePanel}>
          <h3 style={styles.sideHeading}>Top Contributors</h3>
          <p style={styles.sideHelper}>
            Contributors are ranked based on quality and usefulness of submissions.
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
    padding: "26px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 12px 28px rgba(0,0,0,0.4)",
  },
  heading: {
    fontSize: "1.4rem",
    marginBottom: "6px",
  },
  helper: {
    fontSize: "0.9rem",
    opacity: 0.75,
    marginBottom: "18px",
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
    fontSize: "0.8rem",
    letterSpacing: "0.4px",
    opacity: 0.8,
    textTransform: "uppercase",
  },
  input: {
    padding: "12px 12px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.18)",
    background: "rgba(0,0,0,0.35)",
    color: "white",
    outline: "none",
    fontSize: "0.95rem",
  },
  submitBtn: {
    marginTop: "6px",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid rgba(56,189,248,.7)",
    background: "linear-gradient(135deg, rgba(56,189,248,.9), rgba(34,211,238,.9))",
    color: "#002b36",
    fontWeight: 800,
    cursor: "pointer",
  },
  sidePanel: {
    padding: "20px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.1)",
  },
  sideHeading: {
    marginBottom: "6px",
  },
  sideHelper: {
    fontSize: "0.85rem",
    opacity: 0.7,
    marginBottom: "10px",
  },
};
