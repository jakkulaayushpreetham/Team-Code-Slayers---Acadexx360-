const express = require("express");
const Note = require("../models/Note");

const router = express.Router();

router.post("/:id", async (req, res) => {
    const { rating } = req.body;
    const note = await Note.findById(req.params.id);

    note.rating = (note.rating * note.ratingCount + rating) / (note.ratingCount + 1);
    note.ratingCount++;
    await note.save();

    res.json(note);
});

module.exports = router;
