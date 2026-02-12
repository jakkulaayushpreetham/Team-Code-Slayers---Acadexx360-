const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema(
    {
        title: String,
        department: String,
        semester: String,
        subject: String,
        tags: [String],
        summary: String,
        fileUrl: String,
        uploadedBy: String,
        rating: { type: Number, default: 0 },
        ratingCount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Note", NoteSchema);
