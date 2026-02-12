export default function Filters({ onFilter }) {
    return (
        <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
            <select onChange={(e) => onFilter("department", e.target.value)}>
                <option value="">Dept</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
            </select>

            <select onChange={(e) => onFilter("semester", e.target.value)}>
                <option value="">Sem</option>
                <option value="4">4</option>
                <option value="6">6</option>
            </select>

            <select onChange={(e) => onFilter("subject", e.target.value)}>
                <option value="">Subject</option>
                <option value="AI">AI</option>
                <option value="DBMS">DBMS</option>
            </select>
        </div>
    );
}
