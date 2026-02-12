const express = require("express");
const cors = require("cors");

const notesRoutes = require("./routes/notes.routes");
const ratingRoutes = require("./routes/rating.routes");
const leaderboardRoutes = require("./routes/leaderboard");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/notes", notesRoutes);
app.use("/rate", ratingRoutes);
app.use("/leaderboard", leaderboardRoutes);

module.exports = app;
