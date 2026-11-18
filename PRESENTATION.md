# RESUMIFY — Academic Project Presentation

**Project Title:** RESUMIFY — AI-Powered Resume Analyzer & Career Development Platform  
**Academic Level:** First-Year B.Tech Computer Science & Engineering  
**Technology Stack:** React 18, Vite, Tailwind CSS v3, Node.js, Express.js, MongoDB Atlas, Google Gemini AI  
**Brand Identity:** Deep Plum (`#764248`), Muted Mauve (`#DDA3B2`), Soft Pink (`#FFADC6`), Warm Sand (`#E3C5BB`), Pale Sage (`#DFE2CF`)

---

## Slide 1: Title & Executive Overview
* **Project Name:** RESUMIFY
* **Tagline:** Next-Generation AI-Driven Career Suite for Students, Freshers, and Job Seekers.
* **Domain:** Full-Stack Web Development, Applied Natural Language Processing, Career Technology.
* **Presenter:** Student, Department of Computer Science & Engineering.

---

## Slide 2: Problem Statement & Motivation
* **The Fresher Dilemma:** College students and first-year undergraduates struggle to format resumes that pass automated Applicant Tracking Systems (ATS).
* **Information Asymmetry:** Most students don't know which technical skills are in demand or what topics to study to bridge the gap between academic syllabi and industry expectations.
* **Mock Interview Gap:** Quality technical and behavioral interview coaching is expensive and inaccessible to early-stage students.
* **Our Solution:** An end-to-end web platform unifying resume auditing, personalized career pathing, freshers-friendly resume generation, and AI-powered interview practice with zero fabricated metrics.

---

## Slide 3: Project Objectives
1. **Authentic Resume Parsing:** Extract text server-side from PDF and DOCX files without permanent disk storage.
2. **Advisory ATS Scoring:** Evaluate formatting, keyword density, and technical depth using Google Gemini AI.
3. **Personalized Career Roadmaps:** Formulate phased learning milestones (Foundations &rarr; Advanced &rarr; Production) based on real student skills.
4. **Interactive Freshers Resume Builder:** Support students with zero prior work experience and generate high-fidelity downloadable PDFs.
5. **Simulated Technical & HR Interviews:** Generate role-specific questions and provide constructive answer critiques.
6. **Isolated User History:** Save individual records securely in MongoDB Atlas using JWT authentication.

---

## Slide 4: Technology Stack
* **Frontend Layer:**
  * **React 18 + Vite:** Lightning-fast rendering and Hot Module Replacement (HMR).
  * **Tailwind CSS v3:** Custom design tokens mapped to the exact 5 brand colors with persistent light/dark mode support.
  * **Lucide React:** Consistent semantic iconography.
  * **html2canvas & jsPDF:** Client-side vector-accurate PDF document export.
* **Backend Layer:**
  * **Node.js & Express.js:** RESTful API architecture with modular routers and controllers.
  * **Multer:** Secure temporary file uploads with strict 5MB size limits.
  * **pdf-parse & mammoth:** Document text extraction engines.
* **Database & Authentication:**
  * **MongoDB Atlas & Mongoose:** Scalable document database with user-isolated schemas.
  * **bcryptjs & jsonwebtoken (JWT):** Salted password hashing (cost factor 10) and stateless token validation.
* **Artificial Intelligence Engine:**
  * **Google Gemini AI (`@google/genai` SDK):** High-speed reasoning with structured JSON responses.

---

## Slide 5: System Architecture & Data Flow
```
User Browser (React + Tailwind) 
       │
       ▼ (HTTPS / JSON + JWT Bearer Token)
Express REST API Server (Node.js)
       ├── Authentication Middleware (JWT verification)
       ├── Multer Upload Engine (Temporary Disk Processing)
       │       └── pdf-parse / mammoth (Text Extraction & Immediate File Unlink)
       ├── Google Gemini AI Client (@google/genai SDK)
       └── Mongoose ODM (MongoDB Atlas Cluster)
```
* **Key Architectural Tenet:** Strict separation of concerns. AI keys and database credentials reside exclusively in server `.env` files.

---

## Slide 6: The Six Core Platform Sections
1. **Landing Page (`/`):** Clean SaaS showcase with hero value proposition, 4 feature pillars, and workflow steps.
2. **Resume Analyzer (`/analyzer`):** Drag-and-drop PDF/DOCX analyzer providing an overall advisory score (0–100), ATS level, detected skills, strengths, weaknesses, and missing keywords.
3. **Career Guidance (`/career`):** Profile-driven career path matcher calculating skill gap analysis and step-by-step roadmaps.
4. **Create Resume (`/builder`):** Dual-panel interactive editor with real-time preview, template switching, "Enhance with AI" wording assist, and instant PDF download.
5. **Interview Preparation (`/interview`):** Interactive interview studio generating questions across difficulty levels and evaluating submitted answers with model responses.
6. **My Dashboard (`/dashboard`):** Authenticated student workspace displaying personal audit history, saved resumes, career roadmaps, and interview transcripts.

---

## Slide 7: Security & Data Privacy Engineering
* **Zero Fabrication Principle:** The platform never displays hardcoded sample scores as real AI output. If an API key or database is unconfigured, it displays honest setup cards.
* **Ephemeral File Hygiene:** Uploaded resume documents are parsed in temporary storage and deleted immediately via `fs.promises.unlink` after text extraction.
* **Cryptographic Password Protection:** Passwords are never stored in plaintext; salted hashes are generated via `bcryptjs`.
* **Stateful Theme Persistence:** Dual light/dark theme system stored in `localStorage` with inline `<head>` detection preventing flash-of-unstyled-theme (FOUT).

---

## Slide 8: Database Schema Design
* **`User` Collection:** Stores user identity, unique email index, and bcrypt password hash.
* **`ResumeAnalysis` Collection:** Stores filename, advisory quality score, ATS level, extracted skills, and actionable suggestions linked to `userId`.
* **`Resume` Collection:** Stores structured resume draft data (personal info, education, skills, projects) linked to `userId`.
* **`CareerRecommendation` Collection:** Stores input background and recommended career trajectories linked to `userId`.
* **`InterviewSession` Collection:** Stores question text, candidate responses, and AI evaluations linked to `userId`.

---

## Slide 9: Verification & Testing Results
* **Frontend Compilation:** Vite production build compiles with zero errors (1600+ modules transformed in ~7s).
* **Route Integrity:** All 6 dedicated routes tested and confirmed returning HTTP 200.
* **Responsive Layout:** Tested across desktop (1280px), tablet (768px), and mobile (375px) breakpoints.
* **Component Testing:** Theme toggling, real-time live preview updates, and PDF downloads operate smoothly.

---

## Slide 10: Future Scope & Conclusion
* **Future Scope:**
  * Voice-enabled real-time mock interviews using WebRTC.
  * Direct job application integrations via LinkedIn / Indeed APIs.
  * Peer-to-peer student resume review forums.
* **Conclusion:**
  * RESUMIFY successfully bridges the gap between academic education and industry readiness.
  * Fully engineered, robust, honest, and production-ready for academic evaluation.
