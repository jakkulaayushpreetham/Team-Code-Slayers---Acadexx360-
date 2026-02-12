import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Notes() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    api.get("/notes").then((res) => setNotes(res.data));
  }, []);

  return (
    <div>
      <h2>All Notes</h2>
      {notes.map((n) => (
        <div key={n._id}>
          <p>{n.title}</p>
          <img src={n.fileUrl} width="200" />
        </div>
      ))}
    </div>
  );
}
