/**
 * AI Service – Summarization & Tag Extraction
 *
 * Uses Google Gemini API when GEMINI_API_KEY is set in .env.
 * Falls back to a smart mock summarizer otherwise.
 *
 * TODO: To enable real Gemini AI:
 *   1. Get an API key from https://aistudio.google.com/app/apikey
 *   2. Add GEMINI_API_KEY=your_key_here to .env
 *   3. Run: npm install @google/generative-ai
 */

let genAI = null;

try {
    if (process.env.GEMINI_API_KEY) {
        const { GoogleGenerativeAI } = require("@google/generative-ai");
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        console.log("[AI] Gemini API initialized ✅");
    } else {
        console.log("[AI] No GEMINI_API_KEY found – using mock summarizer");
    }
} catch (err) {
    console.log("[AI] @google/generative-ai not installed – using mock summarizer");
}

// ─── Predefined concept tags ───────────────────────────────────────
const CONCEPT_TAGS = [
    "DBMS", "OS", "CN", "AI", "ML", "Data Structures", "Algorithms",
    "OOP", "Computer Architecture", "Software Engineering", "Python",
    "Java", "C++", "Web Development", "Cloud Computing", "Cybersecurity",
    "IoT", "Digital Logic", "Compiler Design", "Theory of Computation",
    "Mathematics", "Discrete Math", "Linear Algebra", "Probability",
];

// ─── Mock summarizer (used when Gemini API key is not available) ───
const mockSummarize = (text) => {
    if (!text || text.length < 20) return "Summary not available for short text.";

    // Split into sentences and pick the most important ones
    const sentences = text
        .replace(/\n+/g, ". ")
        .split(/[.!?]+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 15);

    if (sentences.length === 0) return text.substring(0, 200) + "...";

    // Pick up to 5 key sentences (first, last, and middle)
    const picks = [];
    picks.push(sentences[0]);
    if (sentences.length > 2) picks.push(sentences[Math.floor(sentences.length / 3)]);
    if (sentences.length > 4) picks.push(sentences[Math.floor(sentences.length / 2)]);
    if (sentences.length > 6) picks.push(sentences[Math.floor((2 * sentences.length) / 3)]);
    if (sentences.length > 1) picks.push(sentences[sentences.length - 1]);

    const summary = [...new Set(picks)].join(". ") + ".";
    return summary.length > 500 ? summary.substring(0, 497) + "..." : summary;
};

// ─── Mock tag extractor ────────────────────────────────────────────
const mockExtractTags = (text) => {
    if (!text) return [];
    const lower = text.toLowerCase();
    return CONCEPT_TAGS.filter((tag) => lower.includes(tag.toLowerCase()));
};

// ─── Main AI functions ─────────────────────────────────────────────

/**
 * Generate an exam-friendly summary of the given text.
 */
const summarizeText = async (text) => {
    if (!text || text.trim().length < 10) return "";

    // Use Gemini if available
    if (genAI) {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            const prompt = `You are an academic assistant. Summarize the following text into a concise, exam-friendly summary (max 200 words). Focus on key concepts, definitions, and important points:\n\n${text.substring(0, 3000)}`;
            const result = await model.generateContent(prompt);
            const response = result.response.text();
            console.log("[AI] Gemini summary generated ✅");
            return response;
        } catch (err) {
            console.error("[AI] Gemini API error, falling back to mock:", err.message);
        }
    }

    // Fallback to mock
    console.log("[AI] Using mock summarizer");
    return mockSummarize(text);
};

/**
 * Extract concept tags from text.
 * Uses predefined concept matching + optional Gemini enhancement.
 */
const extractTags = async (text, userTags = []) => {
    // Start with user-provided tags
    const tags = new Set(userTags.filter(Boolean));

    // Add auto-detected concept tags
    const detected = mockExtractTags(text);
    detected.forEach((t) => tags.add(t));

    // Optionally use Gemini to find additional tags
    if (genAI && text.length > 50) {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
            const prompt = `From the following academic text, extract only the subject/concept keywords (like DBMS, OS, Machine Learning, etc). Return as comma-separated list, nothing else:\n\n${text.substring(0, 2000)}`;
            const result = await model.generateContent(prompt);
            const aiTags = result.response
                .text()
                .split(",")
                .map((t) => t.trim())
                .filter((t) => t.length > 1 && t.length < 30);
            aiTags.forEach((t) => tags.add(t));
        } catch (err) {
            console.error("[AI] Tag extraction error:", err.message);
        }
    }

    return [...tags].slice(0, 10); // max 10 tags
};

module.exports = { summarizeText, extractTags, CONCEPT_TAGS };
