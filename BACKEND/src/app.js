const express = require("express");
const cors = require("cors");

const notesRoutes = require("./routes/notes.routes");
const ratingRoutes = require("./routes/rating.routes");
const leaderboardRoutes = require("./routes/leaderboard");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/notes", notesRoutes);
app.use("/api/rate", ratingRoutes);
app.use("/api/leaderboard", leaderboardRoutes);


module.exports = app;
