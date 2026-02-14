import api from "../api/api";

export default function RatingStars({ noteId, onRated }) {
  const rate = async (value) => {
    try {
      await api.post(`/rate/${noteId}`, { rating: value });
      if (onRated) onRated();
    } catch {
      alert("Could not submit rating.");
    }
  };

  return (
    <div style={styles.wrap}>
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          onClick={() => rate(value)}
          type="button"
          style={styles.btn}
          title={`Rate ${value} star${value > 1 ? "s" : ""}`}
        >
          {"★".repeat(value)}
        </button>
      ))}
    </div>
  );
}

const styles = {
  wrap: {
    display: "flex",
    gap: "4px",
    flexWrap: "wrap",
  },
  btn: {
    padding: "4px 8px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.15)",
    background: "rgba(0,0,0,0.2)",
    color: "#fbbf24",
    cursor: "pointer",
    fontSize: "0.72rem",
    transition: "all 0.15s",
  },
};
