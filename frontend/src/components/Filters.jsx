import React from "react";

export default function Filters({
  department,
  semester,
  subject,
  setDepartment,
  setSemester,
  setSubject,
}) {
  return (
    <div style={styles.container}>
      <select
        style={styles.select}
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="All">All Departments</option>
        <option value="CSE">CSE</option>
        <option value="ECE">ECE</option>
        <option value="AI&DS">AI&DS</option>
      </select>

      <select
        style={styles.select}
        value={semester}
        onChange={(e) => setSemester(e.target.value)}
      >
        <option value="All">All Semesters</option>
        <option value="1">Sem 1</option>
        <option value="2">Sem 2</option>
        <option value="3">Sem 3</option>
        <option value="4">Sem 4</option>
        <option value="5">Sem 5</option>
        <option value="6">Sem 6</option>
      </select>

      <select
        style={styles.select}
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      >
        <option value="All">All Subjects</option>
        <option value="DBMS">DBMS</option>
        <option value="OS">OS</option>
        <option value="Computer Networks">Computer Networks</option>
        <option value="Machine Learning">Machine Learning</option>
      </select>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "15px",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  select: {
    padding: "10px 12px",
    borderRadius: "10px",
    background: "rgba(0,0,0,0.3)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.2)",
    outline: "none",
    fontSize: "0.95rem",
  },
};
