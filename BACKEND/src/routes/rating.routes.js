const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

router.post("/:id", async (req, res) => {
  try {
    const { rating } = req.body;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    const note = await Note.findById(req.params.id);

    // Check if note exists
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Update average rating
    note.rating =
      (note.rating * note.ratingCount + rating) / (note.ratingCount + 1);

    note.ratingCount += 1;

    await note.save();

    res.json({
      message: "Rating updated successfully",
      note,
    });
  } catch (err) {
    if (err.message.includes("buffering timed out") || err.message.includes("ECONNREFUSED")) {
      return res.status(503).json({ error: "Database not connected" });
    }
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
