const Note = require("../models/Note");

// Upload note
exports.uploadNote = async (req, res) => {
  try {
    const { title, dept, sem, subject, tags } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    const note = await Note.create({
      title,
      dept,
      sem,
      subject,
      tags: tags ? tags.split(",") : [],
      filePath: req.file.path,
      extractedText: "", // fill later if OCR runs
    });

    res.status(201).json(note);
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
};

// Get all notes
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error("Get notes error:", err);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

// 🔥 Search + Filters
exports.searchNotes = async (req, res) => {
  try {
    const { q, dept, sem, subject, tags } = req.query;

    let filter = {};

    if (dept) filter.dept = dept;
    if (sem) filter.sem = sem;
    if (subject) filter.subject = subject;

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { extractedText: { $regex: q, $options: "i" } },
        { subject: { $regex: q, $options: "i" } },
      ];
    }

    if (tags) {
      const tagArray = tags.split(","); // tags=ai,ml
      filter.tags = { $in: tagArray };
    }

    const notes = await Note.find(filter).sort({ createdAt: -1 });

    res.json(notes);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
};

// Optional: AI / OCR processing trigger
exports.processNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    // TODO: OCR / summary / tagging logic here
    // note.extractedText = "some text";
    // await note.save();

    res.json({ message: "Processing started", note });
  } catch (err) {
    console.error("Process error:", err);
    res.status(500).json({ error: "Processing failed" });
  }
};
