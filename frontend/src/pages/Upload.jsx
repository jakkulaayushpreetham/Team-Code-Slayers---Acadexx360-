import { useState } from "react";
import { api } from "../api/api";

export default function Upload() {
    const [file, setFile] = useState(null);

    const uploadNote = async () => {
        if (!file) return alert("Select a file");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", "Sample Note");
        formData.append("department", "CSE");
        formData.append("semester", "6");
        formData.append("subject", "AI");
        formData.append("uploadedBy", "Student");

        await api.post("/notes/upload", formData);
        alert("Uploaded!");
    };

    return (
        <div className="card">
            <h2>📤 Upload</h2>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={uploadNote}>Upload</button>
        </div>
    );
}
