const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const leaderboard = await Note.aggregate([
      { $match: { uploadedBy: { $ne: null, $ne: "" } } },
      {
        $group: {
          _id: "$uploadedBy",
          uploads: { $sum: 1 },
        },
      },
      { $sort: { uploads: -1 } },
      { $limit: 10 },
    ]);

    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
