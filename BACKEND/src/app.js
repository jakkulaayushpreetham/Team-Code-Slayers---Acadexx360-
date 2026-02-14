const express = require("express");
const cors = require("cors");
const path = require("path");

const notesRoutes = require("./routes/notes.routes");
const ratingRoutes = require("./routes/rating.routes");
const leaderboardRoutes = require("./routes/leaderboard");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically at /uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// API Routes
app.use("/api/notes", notesRoutes);
app.use("/api/rate", ratingRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

// Health check
app.get("/", (_req, res) => {
  res.json({
    name: "Acadex API",
    version: "1.0.0",
    status: "running",
    endpoints: {
      upload: "POST /api/notes/upload",
      notes: "GET /api/notes",
      search: "GET /api/notes/search?q=keyword",
      process: "POST /api/notes/:id/process",
      rate: "POST /api/rate/:id",
      leaderboard: "GET /api/leaderboard",
    },
  });
});

module.exports = app;
