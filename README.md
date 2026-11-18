# RESUMIFY – AI-Powered Resume Analyzer & Career Development Platform

> A comprehensive, modern SaaS web application designed for students, freshers, and job seekers to evaluate resumes, receive personalized career guidance, craft professional resumes, and practice interviews with Google's Gemini AI.

---

## 🎨 Brand Color Palette

RESUMIFY is built with a cohesive 5-color aesthetic:

| Color | Hex | Light Mode Role | Dark Mode Role |
| :--- | :--- | :--- | :--- |
| **Deep Plum** | `#764248` | Primary Headings, Text, Accents | Base dark backgrounds (`#1C0E11` / `#2A171A`) |
| **Muted Mauve** | `#DDA3B2` | Secondary text, borders, tags | Secondary borders, muted badges |
| **Soft Pink** | `#FFADC6` | Key highlights, CTA accents | Vibrant highlights, focus rings, badges |
| **Warm Sand** | `#E3C5BB` | Card fills, secondary surfaces | Elevated dark card surfaces |
| **Pale Sage** | `#DFE2CF` | Page background, light surfaces | Readable text, soft contrast surfaces |

---

## 🚀 Key Sections & Modules

1. **Landing Page (`/`)**: Value proposition, 4 module spotlights, workflow breakdown, and benefits.
2. **Resume Analyzer (`/analyzer`)**: Real PDF and DOCX document parser, server-side text extraction, and Gemini-powered ATS & quality score assessment.
3. **Career Guidance (`/career`)**: Personalized questionnaire mapping skills and interests to career roles with learning roadmaps.
4. **Create Resume (`/builder`)**: Freshers-friendly resume builder, multi-template live preview, AI bullet-point enhancer, and PDF export.
5. **Interview Preparation (`/interview`)**: Role and difficulty-tailored interview practice with real-time AI critique and scoring.
6. **My Dashboard (`/dashboard`)**: Authenticated hub displaying past analyses, saved resumes, career plans, and interview practice logs.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, React Router DOM, Tailwind CSS v3, Lucide React, Axios, html2canvas, jsPDF.
- **Backend**: Node.js, Express.js, MongoDB Atlas (Mongoose), bcryptjs, jsonwebtoken, Multer, pdf-parse, mammoth, `@google/genai`.
- **AI**: Google Gemini API via server-side `@google/genai` SDK.

---

## ⚙️ Setup & Local Development

### 1. Backend Configuration
Create a `.env` file in the `server/` directory:
```env
PORT=5000
CLIENT_URL=http://localhost:5173
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

### 2. Frontend Configuration
Create a `.env` file in the `client/` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Running Locally
```bash
# Start backend server
cd server
npm run dev

# Start frontend development server
cd ../client
npm run dev
```
Open `http://localhost:5173` in your browser.
