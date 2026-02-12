export default function NoteCard({ note }) {
    return (
        <div className="card">
            <p className="note-title">{note.title}</p>
            <p className="note-meta">
                {note.department} | Sem {note.semester} | {note.subject}
            </p>

            <img className="note-img" src={note.fileUrl} alt="note" />

            <a href={note.fileUrl} target="_blank" rel="noreferrer">
                <button style={{ marginTop: "10px" }}>Download</button>
            </a>
        </div>
    );
}
