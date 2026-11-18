# RESUMIFY — 5-7 Minute Academic Viva & Demo Script

**Project:** RESUMIFY — AI-Powered Resume Analyzer & Career Development Platform  
**Target Time:** 5 to 7 Minutes  
**Audience:** Academic Evaluators, Professors, and Viva Examiners  
**Presenter:** 1st Year B.Tech CSE Student  

---

## ⏱️ Timeline & Step-by-Step Walkthrough

### 0:00 – 1:00 | Introduction & Motivation (What is RESUMIFY?)
* **What to do:**
  * Open browser to `http://localhost:5173`.
  * Show the **Landing Page** in Light Mode.
* **What to say:**
  > *"Good morning respected evaluators. I am presenting **RESUMIFY**, an AI-powered career development platform engineered specifically for students, freshers, and job seekers. As a first-year Computer Science student, I observed that many undergraduates struggle to format ATS-friendly resumes, don't know the exact skills industry requires, and lack accessible interview practice. RESUMIFY unifies four core pillars into a single SaaS platform: Resume Analysis, Career Guidance, Resume Creation, and Interview Preparation."*
* **Interactive action:**
  * Click the **Theme Toggle** in the top navigation bar (Sun/Moon icon).
  * Show how the entire application smoothly transitions from Light Mode (Pale Sage & Warm Sand) to Dark Mode (Deep Plum).
  * Refresh the browser to prove that the selected theme persists via `localStorage` without any screen flash.

---

### 1:00 – 2:30 | Module 1: Resume Analyzer (ATS & Quality Audit)
* **What to do:**
  * Click **"Resume Analyzer"** in the navigation bar.
  * Show the drag-and-drop upload zone supporting `.pdf` and `.docx` (5MB limit).
* **What to say:**
  > *"The first pillar is our Resume Analyzer. Unlike simple keyword counters, our backend uses `pdf-parse` and `mammoth` to extract document text server-side. For privacy and security, uploaded files are parsed in memory and immediately deleted from disk. We then send the text to Google's Gemini AI using structured prompt engineering to receive an advisory quality score, ATS readiness level, identified skills, and missing keywords."*
* **What to highlight:**
  > *"Notice the advisory disclaimer banner: we explicitly inform users that our 0–100 score is an educational advisory assessment, ensuring academic and professional honesty."*

---

### 2:30 – 3:30 | Module 2: Career Guidance & Roadmaps
* **What to do:**
  * Click **"Career Guidance"** in the navbar.
  * Point out the questionnaire fields: *Education*, *Current Skills*, *Interests*, *Goals*, *Preferred Roles*.
* **What to say:**
  > *"The second pillar is Career Guidance. When students enter their current abilities—such as C++, Python, or basic HTML—the AI performs a skill gap analysis against real-world roles like Full-Stack Developer or AI Engineer. It then generates a phased learning roadmap: Phase 1 for fundamentals, Phase 2 for advanced frameworks, and Phase 3 for production projects."*

---

### 3:45 – 4:45 | Module 3: Create Resume & Instant PDF Download
* **What to do:**
  * Click **"Create Resume"** in the navbar.
  * Type a new name (e.g. your own name) in the Personal Details field.
  * Point out how the **Live Resume Preview** updates instantaneously on the right side.
  * Click the **"Download PDF"** button.
* **What to say:**
  > *"Our third pillar is the interactive Resume Builder. It is specifically designed to be freshers-friendly: work experience is optional, allowing students to highlight academic coursework and projects. We also feature an 'Enhance with Gemini AI' button to polish bullet points with strong action verbs. When ready, the student clicks 'Download PDF', which renders the canvas using `html2canvas` and `jsPDF` into a clean, printable A4 document."*
* **What to show:**
  * Show the downloaded PDF opening in your browser or Adobe Reader.

---

### 4:45 – 5:45 | Module 4: Interview Preparation (AI Mock Interviewer)
* **What to do:**
  * Click **"Interview Prep"** in the navbar.
  * Show the configuration controls: Target Role, Category (Technical vs HR), Difficulty (Junior/Intern, Mid, Senior).
  * Show the Question workspace, Guidance Tip box, and Answer textarea.
* **What to say:**
  > *"The fourth pillar is Interview Preparation. Students can generate realistic, role-specific questions for their target position. Each question includes an interviewer guidance hint explaining what key concepts to cover (such as the STAR method for HR questions). When the student submits an answer, the Gemini AI evaluates technical accuracy, lists strengths and weaknesses, identifies missing technical terms, and provides an exemplary model answer."*

---

### 5:45 – 6:30 | Module 5: My Dashboard & Database Architecture
* **What to do:**
  * Click **"My Dashboard"** in the navbar.
  * Click **"Sign In / Create Account"** to demonstrate the modal.
* **What to say:**
  > *"Finally, My Dashboard aggregates all user history. We implement secure user authentication with `bcryptjs` password hashing and JSON Web Tokens (JWT). When connected to MongoDB Atlas, records from all four modules are saved and isolated strictly by `userId`. We uphold strict academic integrity: if no records have been saved, we display clean empty states rather than fake mock data."*

---

### 6:30 – 7:00 | Conclusion & Q&A Readiness
* **What to say:**
  > *"To conclude, RESUMIFY demonstrates a complete, secure full-stack architecture adhering to professional SaaS design standards and genuine AI integration. Thank you, and I am now ready for any questions."*

---

## 💡 Potential Evaluator Questions & Winning Answers

1. **Q: Why did you use client-server architecture instead of calling Gemini directly from React?**
   * **Answer:** *"Calling Gemini directly from the frontend would expose our `GEMINI_API_KEY` in the browser's network inspect tab. By routing all AI requests through our secure Express backend, the key remains protected in server-side environment variables (`.env`)."*

2. **Q: How do you handle document security for uploaded resumes?**
   * **Answer:** *"Resumes contain sensitive Personal Identifiable Information (PII). We use an ephemeral processing pipeline: Multer saves the document temporarily, `pdf-parse` extracts the plain text into memory, and the physical file is deleted immediately using `fs.promises.unlink`."*

3. **Q: What is the purpose of bcryptjs?**
   * **Answer:** *"Bcrypt is a one-way cryptographic hashing function. We use a salt round factor of 10. Even if database access is compromised, passwords cannot be reversed into plain text."*

4. **Q: What happens if Gemini API or MongoDB credentials are not configured?**
   * **Answer:** *"The platform implements graceful degradation with honest configuration alerts. Rather than crashing or displaying fake numbers, it provides explicit setup instructions for the administrator."*
