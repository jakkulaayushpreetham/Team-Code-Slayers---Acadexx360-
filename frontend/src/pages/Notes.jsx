import React, { useEffect, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import NoteCard from "../components/NoteCard";
import Filters from "../components/Filters";
import api from "../api/api";

export default function Notes() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const [department, setDepartment] = useState("All");
  const [semester, setSemester] = useState("All");
  const [subject, setSubject] = useState("All");

  const fetchNotes = async () => {
    try {
      let url = "/notes/search?";

      if (department !== "All") url += `department=${department}&`;
      if (semester !== "All") url += `semester=${semester}&`;
      if (subject !== "All") url += `subject=${subject}&`;
      if (search.trim() !== "") url += `search=${search}&`;

      const res = await api.get(url);
      setNotes(res.data);
    } catch (err) {
      console.log("Error fetching notes:", err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [department, semester, subject]);

  return (
    <PageWrapper
      title="📚 Notes Library"
      subtitle="Browse notes uploaded by students. Search, filter, and download the best resources."
    >
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "15px" }}>
        <input
          style={{
            width: "100%",
            maxWidth: "600px",
            padding: "12px 14px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.2)",
            outline: "none",
            background: "rgba(0,0,0,0.25)",
            color: "white",
            fontSize: "1rem",
          }}
          placeholder="Search by title or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          onClick={fetchNotes}
          style={{
            marginLeft: "10px",
            padding: "12px 16px",
            borderRadius: "12px",
            border: "none",
            background: "#38bdf8",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      <Filters
        department={department}
        semester={semester}
        subject={subject}
        setDepartment={setDepartment}
        setSemester={setSemester}
        setSubject={setSubject}
      />

      <div
        style={{
          marginTop: "25px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "16px",
        }}
      >
        {notes.length === 0 ? (
          <p style={{ opacity: 0.7 }}>No notes found.</p>
        ) : (
          notes.map((note) => <NoteCard key={note._id} note={note} />)
        )}
      </div>
    </PageWrapper>
  );
}
