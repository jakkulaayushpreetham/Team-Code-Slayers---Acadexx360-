import { useEffect, useState } from "react";
import NoteCard from "../components/NoteCard";
import Filters from "../components/Filters";

export default function Notes() {
    const [notes, setNotes] = useState([]);
    const [filters, setFilters] = useState({});

    const fetchNotes = async () => {
        const res = await api.get("/notes/search", { params: filters });
        setNotes(res.data);
    };

    useEffect(() => {
        fetchNotes();
    }, [filters]);

    const onFilter = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    return (
        <div>
            <h2>📚 All Notes</h2>
            <Filters onFilter={onFilter} />

            <div className="notes-grid">
                {notes.map((n) => (
                    <NoteCard key={n._id} note={n} />
                ))}
            </div>
        </div>
    );

}
