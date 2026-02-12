import Upload from "./pages/Upload";
import Notes from "./pages/Notes";

import Leaderboard from "./pages/Leaderboard";
import Dashboard from "./pages/Dashboard";
import "./App.css";

export default function App() {
  return (
    <div className="container">
      <div className="navbar">
        📚 Acadexx360 - Smart Notes Hub
      </div>

      <div className="section">
        <Upload />
      </div>

      <div className="section">
        <Notes />
      </div>

      <div className="section">
        <Leaderboard />
      </div>

      <div className="section">
        <Dashboard />
      </div>
    </div>
  );
}

