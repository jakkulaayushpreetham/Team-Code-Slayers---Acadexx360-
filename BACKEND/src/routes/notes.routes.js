const express = require("express");
const multer = require("multer");
const { uploadNote, getNotes, searchNotes } = require("../controllers/notes.controller");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadNote);
router.get("/", getNotes);
router.get("/search", searchNotes);

module.exports = router;
