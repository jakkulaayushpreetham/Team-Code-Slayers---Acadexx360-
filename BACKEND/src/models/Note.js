const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    department: { type: String, required: true },
    semester: { type: String, required: true },
    subject: { type: String, required: true },

    tags: { type: [String], default: [] },

    fileUrl: { type: String, required: true },

    uploadedBy: { type: String, default: "Anonymous" },

    extractedText: { type: String, default: "" },
    summary: { type: String, default: "" },

    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
