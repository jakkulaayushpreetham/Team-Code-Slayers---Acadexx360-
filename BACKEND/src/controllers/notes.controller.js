const Note = require("../models/Note");
const uploadToCloudinary = require("../services/upload.service");

exports.uploadNote = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    const fileUrl = await uploadToCloudinary(req.file.path);

    const note = await Note.create({
      ...req.body,
      fileUrl,
    });

    res.status(201).json({
      message: "Note uploaded successfully",
      note,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.searchNotes = async (req, res) => {
  try {
    const { department, semester, subject, tag, search } = req.query;

    const query = {};

    if (department) query.department = department;
    if (semester) query.semester = semester;
    if (subject) query.subject = subject;
    if (tag) query.tags = tag;

    // Search by title / subject keywords
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
      ];
    }

    const notes = await Note.find(query).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
