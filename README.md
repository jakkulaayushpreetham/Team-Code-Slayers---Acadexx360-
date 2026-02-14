# 🎓 Acadex – AI-Powered Campus Knowledge Hub

> **Hackathon Project by Team Code Slayers**
> Domain: Intelligent Systems & AI Innovation

Acadex transforms unstructured academic resources into a structured, searchable, and ranked learning platform powered by AI.

---

## 🧠 AI Pipeline

```
📤 Upload → 🔍 OCR (Tesseract.js) → 🧠 AI Summary (Gemini/Mock) → 🏷️ Concept Tagging → 🔎 Smart Search → ⭐ Rating → 🏆 Leaderboard
```

---

## 📁 Project Structure

```
Team-Code-Slayers---Acadexx360-/
├── BACKEND/
│   ├── .env                    # Environment variables
│   ├── .env.example            # Template
│   ├── package.json
│   ├── uploads/                # Uploaded files (local storage)
│   └── src/
│       ├── server.js           # Entry point
│       ├── app.js              # Express app config
│       ├── config/
│       │   └── db.js           # MongoDB connection
│       ├── models/
│       │   └── Note.js         # Mongoose schema + text index
│       ├── controllers/
│       │   └── notes.controller.js  # Upload, search, process
│       ├── routes/
│       │   ├── notes.routes.js      # /api/notes/*
│       │   ├── rating.routes.js     # /api/rate/:id
│       │   └── leaderboard.js       # /api/leaderboard
│       └── services/
│           ├── upload.service.js    # Multer (local storage)
│           ├── ocr.service.js       # Tesseract.js OCR
│           └── ai.service.js        # Gemini API + mock fallback
│
├── frontend/
│   ├── index.html              # SEO-ready entry
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx             # Router setup
│       ├── index.css           # Global styles
│       ├── api/
│       │   └── api.js          # Axios client
│       ├── pages/
│       │   ├── home.jsx        # Landing page
│       │   ├── Upload.jsx      # Upload form + tags + pipeline viz
│       │   ├── Notes.jsx       # Notes grid + search + filters
│       │   ├── Leaderboard.jsx # API-driven leaderboard + podium
│       │   └── Dashboard.jsx   # Student dashboard (placeholder)
│       └── components/
│           ├── Navbar.jsx
│           ├── PageWrapper.jsx
│           ├── NoteCard.jsx
│           ├── RatingStars.jsx
│           ├── Filters.jsx
│           └── LeaderboardWidget.jsx
```

---

## 🚀 Setup & Run Instructions

### Prerequisites
- **Node.js** v18+
- **MongoDB** running locally (or MongoDB Atlas URI)

### 1. Clone & Install

```bash
git clone <repo-url>
cd Team-Code-Slayers---Acadexx360-
```

### 2. Backend Setup

```bash
cd BACKEND
cp .env.example .env          # Edit .env with your MongoDB URI
npm install
npm run dev                   # Starts on http://localhost:5000
```

### 3. Frontend Setup (new terminal)

```bash
cd frontend
npm install
npm run dev                   # Starts on http://localhost:5173
```

### 4. (Optional) Enable Gemini AI

```bash
# In BACKEND/.env, add:
GEMINI_API_KEY=your_google_gemini_api_key

# Get a key at: https://aistudio.google.com/app/apikey
# Without it, the app uses a smart mock summarizer
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/notes/upload` | Upload a note (multipart/form-data) |
| `GET` | `/api/notes` | Get all notes |
| `GET` | `/api/notes/search?q=keyword` | Smart search |
| `POST` | `/api/notes/:id/process` | Manually trigger OCR + AI |
| `POST` | `/api/rate/:id` | Rate a note (1-5) |
| `GET` | `/api/leaderboard` | Get top contributors |
| `GET` | `/uploads/:filename` | Download/view uploaded file |

### Sample API Requests (cURL)

```bash
# Upload a note
curl -X POST http://localhost:5000/api/notes/upload \
  -F "title=DBMS Unit 1 Notes" \
  -F "subject=DBMS" \
  -F "department=CSE" \
  -F "semester=3" \
  -F "uploadedBy=Ayush" \
  -F 'tags=["DBMS","Data Structures"]' \
  -F "file=@./my-notes.png"

# Search notes
curl "http://localhost:5000/api/notes/search?q=database&department=CSE"

# Rate a note
curl -X POST http://localhost:5000/api/rate/NOTE_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{"rating": 5}'

# Get leaderboard
curl http://localhost:5000/api/leaderboard

# Get all notes
curl http://localhost:5000/api/notes

# Manually process a note (OCR + AI)
curl -X POST http://localhost:5000/api/notes/NOTE_ID_HERE/process
```

---

## ✅ Features Checklist

| Feature | Status |
|---------|--------|
| Notes Upload (images + PDFs) | ✅ |
| Public visibility of all notes | ✅ |
| OCR Text Extraction (Tesseract.js) | ✅ |
| AI Summary (Gemini + Mock fallback) | ✅ |
| Concept Tagging (predefined tags) | ✅ |
| AI Smart Search (title + OCR + summary + tags) | ✅ |
| Department / Semester / Subject filters | ✅ |
| Rating System (1-5 stars) | ✅ |
| Leaderboard (top contributors) | ✅ |
| Student Dashboard (placeholder) | ✅ |
| Download & Share notes | ✅ |
| Local file storage (no Cloudinary) | ✅ |

---

## 🎤 60-Second Pitch Script

> **"What if every handwritten note on campus could be instantly searchable and AI-summarized?"**
>
> That's **Acadex** – an AI-powered campus knowledge hub built by Team Code Slayers.
>
> **The problem**: Students create thousands of notes – handwritten, PDFs, images – but they're scattered, unsearchable, and unstructured.
>
> **Our solution**: Acadex uses an intelligent AI pipeline:
> 1. **Upload** any image or PDF
> 2. **Tesseract.js OCR** automatically extracts text from images
> 3. **Google Gemini AI** generates exam-friendly summaries
> 4. **Concept tagging** organizes notes by topics like DBMS, OS, ML
> 5. **Smart search** finds content across titles, OCR text, summaries, and tags
> 6. **Rating system** ensures quality rises to the top
> 7. **Leaderboard** gamifies contributions
>
> **Tech stack**: React + Vite frontend, Node.js + Express backend, MongoDB for data, Tesseract.js for OCR, and Google Gemini for AI – all running locally with zero cloud dependency for file storage.
>
> **The impact**: Transform any campus into a collaborative, AI-powered learning hub where the best resources are always one search away.
>
> **Acadex – Because knowledge should be accessible to everyone.** 🚀

---

## 🔧 Replacing Mock AI with Real Gemini API

The app works out-of-the-box with a smart mock summarizer. To enable real AI:

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create an API key
3. Add to `BACKEND/.env`:
   ```
   GEMINI_API_KEY=your_key_here
   ```
4. Install the SDK (already in optionalDependencies):
   ```bash
   cd BACKEND && npm install @google/generative-ai
   ```
5. Restart the backend – AI features now use Gemini!

The code in `BACKEND/src/services/ai.service.js` auto-detects the API key and switches between mock and real AI.

---

## 👥 Team Code Slayers

Built with ❤️ for the Hackathon | Domain: Intelligent Systems & AI Innovation
