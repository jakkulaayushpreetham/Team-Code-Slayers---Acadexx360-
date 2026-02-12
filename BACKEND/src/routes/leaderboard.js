const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

router.get("/", async (req, res) => {
    const leaderboard = await Note.aggregate([
        { $group: { _id: "$uploadedBy", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
    ]);

    res.json(leaderboard);
});

module.exports = router;
