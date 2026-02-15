const PDFDocument = require("pdfkit");
const Note = require("../models/Note");

exports.downloadEnhancedPDF = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${note.title.replace(/\s+/g, "_")}_Enhanced.pdf"`
    );

    const doc = new PDFDocument({ margin: 50 });

    doc.fontSize(20).text("Acadex - Enhanced Notes", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Title: ${note.title}`);
    doc.text(`Department: ${note.department}`);
    doc.text(`Semester: ${note.semester}`);
    doc.text(`Subject: ${note.subject}`);
    doc.text(`Uploaded By: ${note.uploadedBy}`);
    doc.moveDown();

    if (note.tags && note.tags.length > 0) {
      doc.fontSize(12).text("Tags: " + note.tags.join(", "));
      doc.moveDown();
    }

    if (note.summary) {
      doc.fontSize(14).text("AI Summary:", { underline: true });
      doc.moveDown(0.5);
      doc.fontSize(12).text(note.summary);
      doc.moveDown();
    }

    doc.fontSize(14).text("Extracted & Enhanced Content:", { underline: true });
    doc.moveDown(0.5);

    doc.fontSize(12).text(note.extractedText || "No extracted text available.");

    doc.end();
    doc.pipe(res);
  } catch (err) {
    console.log("PDF Error:", err.message);
    res.status(500).json({ error: "PDF generation failed" });
  }
};


// ==========================
// Upload Note
// ==========================
exports.uploadNote = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    // Convert tags properly
    let tagsArray = [];

    if (req.body.tags) {
      try {
        tagsArray = JSON.parse(req.body.tags);
      } catch (err) {
        tagsArray = [];
      }
    }

    const note = await Note.create({
      title: req.body.title,
      department: req.body.department,
      semester: req.body.semester,
      subject: req.body.subject,
      uploadedBy: req.body.uploadedBy || "Anonymous",
      tags: tagsArray,
      fileUrl: req.file.path,
    });

    res.status(201).json({
      message: "Note uploaded successfully",
      note,
    });
  } catch (err) {
    console.log("Upload error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ==========================
// Get All Notes
// ==========================
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error("Get notes error:", err);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

// ==========================
// Search + Filters
// ==========================
exports.searchNotes = async (req, res) => {
  try {
    const { q, department, semester, subject, tags } = req.query;

    let filter = {};

    // IMPORTANT: Correct field names
    if (department) filter.department = department;
    if (semester) filter.semester = semester;
    if (subject) filter.subject = subject;

    // Search keyword
    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { subject: { $regex: q, $options: "i" } },
        { uploadedBy: { $regex: q, $options: "i" } },
      ];
    }

    // Tag filtering
    if (tags) {
      const tagArray = tags.split(",").map((t) => t.trim());
      filter.tags = { $in: tagArray };
    }

    const notes = await Note.find(filter).sort({ createdAt: -1 });

    res.json(notes);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
};

// ==========================
// Optional Processing Route
// ==========================
exports.processNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ error: "Note not found" });

    res.json({ message: "Processing started", note });
  } catch (err) {
    console.error("Process error:", err);
    res.status(500).json({ error: "Processing failed" });
  }
};
