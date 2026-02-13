import React from "react";

const SEMS = ["All", "1", "2", "3", "4", "5", "6", "7", "8"];
const SUBJECTS = [
  "All",
  "DSA",
  "Cryptography",
  "Data Mining",
  "Deep Learning",
  "Theory of Computation",
  "Compiler Design",
  "Web Development",
];

const DEPTS = ["All", "IT", "CSE", "AI", "DS"];

export default function Filters({
  department,
  semester,
  subject,
  setDepartment,
  setSemester,
  setSubject,
}) {
  return (
    <div style={styles.wrap}>
      <FilterRow
        label="Department"
        options={DEPTS}
        active={department}
        onChange={setDepartment}
      />
      <FilterRow
        label="Semester"
        options={SEMS}
        active={semester}
        onChange={setSemester}
      />
      <FilterRow
        label="Subject"
        options={SUBJECTS}
        active={subject}
        onChange={setSubject}
      />
    </div>
  );
}

function FilterRow({ label, options, active, onChange }) {
  return (
    <div style={styles.row}>
      <span style={styles.label}>{label}</span>
      <div style={styles.pills}>
        {options.map((opt) => {
          const isActive = active === opt || (active === "All" && opt === "All");
          return (
            <button
              key={opt}
              onClick={() => onChange(opt)}
              style={{
                ...styles.pill,
                ...(isActive ? styles.pillActive : {}),
              }}
            >
              {opt === "All" ? "All" : opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

const styles = {
  wrap: {
    marginTop: "18px",
    padding: "16px",
    borderRadius: "16px",
    background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.15)",
  },
  row: {
    marginBottom: "12px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontSize: "0.9rem",
    opacity: 0.8,
  },
  pills: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },
  pill: {
    padding: "8px 14px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.25)",
    background: "rgba(0,0,0,0.25)",
    color: "white",
    cursor: "pointer",
    transition: "all .2s ease",
    fontSize: "0.85rem",
  },
  pillActive: {
    background: "linear-gradient(135deg, #38bdf8, #22d3ee)",
    color: "#002b36",
    border: "none",
    boxShadow: "0 6px 16px rgba(56,189,248,.45)",
    fontWeight: "bold",
  },
};
