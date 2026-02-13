const express = require("express");
const cors = require("cors");


const notesRoutes = require("./routes/notes.routes");
const ratingRoutes = require("./routes/rating.routes");
const leaderboardRoutes = require("./routes/leaderboard");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api/notes", notesRoutes);
app.use("/api/rate", ratingRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

app.get("/", (req, res) => {
  res.send("Acadexx360 Backend Running");
});
module.exports = app;
