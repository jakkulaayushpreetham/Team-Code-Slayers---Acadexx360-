const Note = require("../models/Note");
const uploadToCloudinary = require("../services/upload.service");

exports.uploadNote = async (req, res) => {
    try {
        const fileUrl = await uploadToCloudinary(req.file.path);

        const note = await Note.create({
            ...req.body,
            fileUrl,
        });

        res.json(note);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getNotes = async (req, res) => {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.json(notes);
};

exports.searchNotes = async (req, res) => {
    const { department, semester, subject, tag } = req.query;

    const query = {};
    if (department) query.department = department;
    if (semester) query.semester = semester;
    if (subject) query.subject = subject;
    if (tag) query.tags = tag;

    const notes = await Note.find(query);
    res.json(notes);
};
