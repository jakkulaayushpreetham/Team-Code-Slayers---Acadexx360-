import { useEffect, useState } from "react";
import { api } from "../api/api";

export default function Leaderboard() {
    const [leaders, setLeaders] = useState([]);

    useEffect(() => {
        api.get("/leaderboard").then((res) => setLeaders(res.data));
    }, []);

    return (
        <div className="card">
            <h2>🏆 Leaderboard</h2>
            {leaders.map((l, i) => (
                <p key={i}>
                    {i + 1}. {l._id} — {l.count} uploads
                </p>
            ))}
        </div>
    );
}
