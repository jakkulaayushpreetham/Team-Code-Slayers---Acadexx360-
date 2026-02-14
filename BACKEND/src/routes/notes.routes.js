const express = require("express");
const { upload } = require("../services/upload.service");
const {
    uploadNote,
    getNotes,
    searchNotes,
    processNote,
} = require("../controllers/notes.controller");

const router = express.Router();

// POST /api/notes/upload – upload a note with file
router.post("/upload", upload.single("file"), uploadNote);

// GET /api/notes – get all notes
router.get("/", getNotes);

// GET /api/notes/search?q=&department=&semester=&subject=&tag=
router.get("/search", searchNotes);

// POST /api/notes/:id/process – manually trigger OCR + AI processing
router.post("/:id/process", processNote);

module.exports = router;
