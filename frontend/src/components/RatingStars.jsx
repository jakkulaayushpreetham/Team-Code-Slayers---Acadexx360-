import { api } from "../api/api";

export default function RatingStars({ noteId }) {
  const rate = async (value) => {
    try {
      await api.post(`/rate/${noteId}`, { rating: value });
      alert("Thanks for rating.");
    } catch {
      alert("Could not submit rating.");
    }
  };

  return (
    <div className="rating-wrap">
      <span className="rating-label">Rate:</span>
      {[1, 2, 3, 4, 5].map((value) => (
        <button className="rating-btn" key={value} onClick={() => rate(value)} type="button">
          {value}
        </button>
      ))}
    </div>
  );
}
