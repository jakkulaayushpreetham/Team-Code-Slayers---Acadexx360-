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
      alert("Please select a file!");
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

      alert("Notes uploaded successfully!");

      setTitle("");
      setSubject("");
      setDepartment("");
      setSemester("");
      setUploadedBy("");
      setFile(null);

      fetchLeaderboard();
    } catch (err) {
      console.log("Upload failed:", err);
      alert("Upload failed!");
    }
  };

  return (
    <PageWrapper
      title="📤 Upload Notes"
      subtitle="Contribute notes to help your campus. Earn points and climb the leaderboard."
    >
      <div style={styles.grid}>
        <div style={styles.card}>
          <h2 style={styles.heading}>Upload Form</h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            <input
              style={styles.input}
              placeholder="Notes Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <input
              style={styles.input}
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />

            <input
              style={styles.input}
              placeholder="Department (CSE/ECE/AI&DS)"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            />

            <input
              style={styles.input}
              placeholder="Semester (1-8)"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              required
            />

            <input
              style={styles.input}
              placeholder="Your Name"
              value={uploadedBy}
              onChange={(e) => setUploadedBy(e.target.value)}
              required
            />

            <input
              style={styles.input}
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              required
            />

            <button style={styles.btn} type="submit">
              Upload Notes 🚀
            </button>
          </form>
        </div>

        <LeaderboardWidget data={leaderboard} />
      </div>
    </PageWrapper>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "18px",
  },
  card: {
    padding: "22px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  heading: {
    marginBottom: "15px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(0,0,0,0.25)",
    color: "white",
    outline: "none",
  },
  btn: {
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    background: "#38bdf8",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
