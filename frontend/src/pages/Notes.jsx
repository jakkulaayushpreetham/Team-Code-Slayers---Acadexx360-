import React, { useMemo, useState } from "react";
import PageWrapper from "../components/PageWrapper";
import NoteCard from "../components/NoteCard";
import Filters from "../components/Filters";
import { notesData } from "../data/dummyData";

export default function Notes() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [semester, setSemester] = useState("All");
  const [subject, setSubject] = useState("All");

  const filteredNotes = useMemo(() => {
    return notesData.filter((note) => {
      const matchesSearch =
        note.title.toLowerCase().includes(search.toLowerCase()) ||
        note.subject.toLowerCase().includes(search.toLowerCase());

      const matchesDept = department === "All" || note.department === department;
      const matchesSem = semester === "All" || note.semester === semester;
      const matchesSub = subject === "All" || note.subject === subject;

      return matchesSearch && matchesDept && matchesSem && matchesSub;
    });
  }, [search, department, semester, subject]);

  return (
    <PageWrapper
      title="📚 Notes Library"
      subtitle="Browse notes uploaded by students. Search, filter, and download the best resources."
    >
      <div style={styles.searchBox}>
        <input
          style={styles.searchInput}
          placeholder="Search by title or subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Filters
        department={department}
        semester={semester}
        subject={subject}
        setDepartment={setDepartment}
        setSemester={setSemester}
        setSubject={setSubject}
      />

      <div style={styles.grid}>
        {filteredNotes.length === 0 ? (
          <p style={{ opacity: 0.7 }}>No notes found.</p>
        ) : (
          filteredNotes.map((note) => <NoteCard key={note.id} note={note} />)
        )}
      </div>
    </PageWrapper>
  );
}

const styles = {
  searchBox: {
    marginBottom: "18px",
    display: "flex",
    justifyContent: "center",
  },
  searchInput: {
    width: "100%",
    maxWidth: "600px",
    padding: "12px 14px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.2)",
    outline: "none",
    background: "rgba(0,0,0,0.25)",
    color: "white",
    fontSize: "1rem",
  },
  grid: {
    marginTop: "25px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "16px",
  },
};
