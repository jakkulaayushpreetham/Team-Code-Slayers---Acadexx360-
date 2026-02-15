const Tesseract = require("tesseract.js");
const path = require("path");

/**
 * Extract text from an image file using Tesseract.js OCR.
 * For PDFs, returns a placeholder – Tesseract only handles images.
 * @param {string} filePath - relative path like "uploads/12345.png"
 * @returns {Promise<string>} extracted text
 */
const extractText = async (filePath) => {
    try {
        const ext = path.extname(filePath).toLowerCase();

        // Tesseract.js can only process images directly
        if (ext === ".pdf") {
            return "[PDF file – OCR works on image uploads. For PDFs, text extraction is available after conversion.]";
        }

        // Resolve to absolute path from project root
        const absolutePath = path.resolve(filePath);
        console.log(`[OCR] Processing: ${absolutePath}`);

        const { data } = await Tesseract.recognize(absolutePath, "eng", {
            logger: (m) => {
                if (m.status === "recognizing text") {
                    process.stdout.write(`\r[OCR] Progress: ${(m.progress * 100).toFixed(0)}%`);
                }
            },
        });

        console.log(`\n[OCR] Extracted ${data.text.length} characters`);
        return data.text.trim();
    } catch (err) {
        console.error("[OCR] Error:", err.message);
        return "";
    }
};

module.exports = extractText;
