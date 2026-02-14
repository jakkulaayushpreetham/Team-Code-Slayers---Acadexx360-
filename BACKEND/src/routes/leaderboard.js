const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const leaderboard = await Note.aggregate([
      {
        $group: {
          _id: "$uploadedBy",
          uploads: { $sum: 1 },
          avgRating: { $avg: "$rating" },
        },
      },
      { $sort: { uploads: -1 } },
      { $limit: 10 },
      {
        $project: {
          _id: 0,
          name: "$_id",
          uploads: 1,
          avgRating: { $round: ["$avgRating", 2] },
        },
      },
    ]);

    res.json(leaderboard);
  } catch (err) {
    if (err.message.includes("buffering timed out") || err.message.includes("ECONNREFUSED")) {
      return res.status(503).json({ error: "Database not connected", data: [] });
    }
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
