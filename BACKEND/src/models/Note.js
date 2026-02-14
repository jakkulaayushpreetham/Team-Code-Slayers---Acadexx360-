const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
    {
        title: String,
        dept: String,
        sem: String,
        subject: String,
        tags: [String],
        filePath: String,
        extractedText: String,

        contributor: {
            name: String,
            email: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Note", noteSchema);
