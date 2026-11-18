import React from 'react';
import { 
  FileText, 
  Download, 
  Sparkles, 
  Eye, 
  CheckCircle2, 
  GraduationCap, 
  Code, 
  FolderGit2, 
  Award, 
  ShieldCheck, 
  ArrowRight,
  Layers
} from 'lucide-react';

export default function CreateResumeInfo({ onOpenAuth }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fadeIn">
      
      {/* 1. Header & Hero Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-canvas-primary dark:text-darkCanvas-primary tracking-tight">
          Create Resume
        </h1>
        
        <p className="text-base sm:text-lg text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
          Craft an elegant, ATS-compliant single-page resume tailored specifically for students and freshers. Zero previous work experience required.
        </p>

        {/* Primary Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            type="button"
            onClick={() => onOpenAuth('register')}
            className="btn-primary !px-8 !py-3.5 !text-sm flex items-center gap-2 shadow-soft hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Sign Up to Create Your Resume</span>
          </button>
          
          <button
            type="button"
            onClick={() => onOpenAuth('login')}
            className="btn-secondary !px-6 !py-3.5 !text-sm"
          >
            <span>Login to Access</span>
          </button>
        </div>
      </div>

      {/* 2. What It Is & Why It Is Useful */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blush/60 dark:bg-plum-border/50 flex items-center justify-center text-plum-dusty dark:text-lilac">
            <GraduationCap className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-canvas-primary dark:text-darkCanvas-primary">
            Engineered for Students With No Work Experience
          </h2>
          <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
            Most commercial resume builders are designed for experienced professionals. They force you to fill out extensive "Work Experience" fields that leave awkward blank gaps for college students applying for their first internship.
          </p>
          <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
            Resumify's builder structure highlights what matters most in your college years: coursework, foundational programming languages, personal web projects, hackathon achievements, and certifications.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blush/60 dark:bg-plum-border/50 flex items-center justify-center text-plum-dusty dark:text-lilac">
            <Download className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-canvas-primary dark:text-darkCanvas-primary">
            Instant Client-Side PDF Export & AI Rewrites
          </h2>
          <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
            Generate clean, pixel-perfect A4 PDFs directly in your browser using high-resolution vector rendering. Never pay a subscription fee to download your own resume.
          </p>
          <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
            Unsure how to write an impactful professional summary? Click the integrated <strong>Gemini AI Enhance</strong> button to transform casual notes into a compelling, recruiter-ready pitch.
          </p>
        </div>
      </div>

      {/* 3. How It Works Step-by-Step */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-plum-dusty dark:text-lilac">
            Structured 6-Step Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-canvas-primary dark:text-darkCanvas-primary">
            How to Build Your Resume in Minutes
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {[
            { step: '1', title: 'Personal Info', desc: 'Contact, location, GitHub & LinkedIn links.' },
            { step: '2', title: 'Education', desc: 'University, degree, CGPA, graduation years.' },
            { step: '3', title: 'Skills & Stack', desc: 'Core languages, libraries, tools & databases.' },
            { step: '4', title: 'Projects', desc: 'Academic & personal software projects with tech tags.' },
            { step: '5', title: 'Live Preview', desc: 'Watch your A4 resume sheet update in real-time.' },
            { step: '6', title: 'Download PDF', desc: 'Instant clean export ready for job portal applications.' },
          ].map((item, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-1.5"
            >
              <span className="text-xs font-black text-plum-dusty dark:text-lilac">
                STEP {item.step}
              </span>
              <h3 className="font-bold text-xs sm:text-sm text-canvas-primary dark:text-darkCanvas-primary">
                {item.title}
              </h3>
              <p className="text-[11px] text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Practical Demonstration: Sample Resume Preview */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-canvas-border dark:border-plum-border pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
              <span>Illustrative Demonstration — Sample Output Preview</span>
            </div>
            <h2 className="text-2xl font-black text-canvas-primary dark:text-darkCanvas-primary mt-1">
              Sample Output: College Student Internship Resume
            </h2>
            <p className="text-xs text-canvas-secondary dark:text-darkCanvas-secondary">
              See how a fresher's academic projects and technical skills are formatted into an ATS-friendly A4 document.
            </p>
          </div>
          
          <button
            type="button"
            onClick={() => onOpenAuth('register')}
            className="btn-primary !py-2 !px-4 !text-xs self-start sm:self-auto"
          >
            Start Building Your Resume →
          </button>
        </div>

        {/* Illustrative Resume Canvas Preview */}
        <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-white text-gray-900 shadow-soft border border-canvas-border space-y-5">
          {/* Header */}
          <div className="border-b border-gray-200 pb-4 space-y-1">
            <h3 className="text-2xl font-bold tracking-tight text-[#8A5F8A]">
              Alex Morgan
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
              <span>alex.morgan@university.edu</span>
              <span>· +91 98765 43210</span>
              <span>· Bangalore, India</span>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#8A5F8A] font-medium pt-0.5">
              <span>linkedin.com/in/alexmorgan</span>
              <span>· github.com/alexmorgan</span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A5F8A] border-b border-gray-100 pb-0.5">
              Professional Summary
            </h4>
            <p className="text-xs text-gray-700 leading-relaxed">
              Motivated first-year Computer Science undergraduate with hands-on foundational skills in full-stack web development and algorithms. Passionate about solving real-world challenges through clean code and modern web frameworks.
            </p>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A5F8A] border-b border-gray-100 pb-0.5">
              Education
            </h4>
            <div className="text-xs flex justify-between items-start">
              <div>
                <p className="font-bold text-gray-800">National Institute of Technology</p>
                <p className="text-gray-600">B.Tech in Computer Science & Engineering</p>
              </div>
              <div className="text-right text-gray-500">
                <p>2025 – 2029</p>
                <p className="font-semibold text-gray-700">CGPA: 8.8 / 10</p>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A5F8A] border-b border-gray-100 pb-0.5">
              Technical Skills
            </h4>
            <p className="text-xs text-gray-700 leading-relaxed">
              C++ · JavaScript (ES6+) · React.js · Tailwind CSS · Node.js · Git & GitHub · Data Structures & Algorithms
            </p>
          </div>

          {/* Academic Projects */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A5F8A] border-b border-gray-100 pb-0.5">
              Academic & Personal Projects
            </h4>
            <div className="text-xs space-y-0.5">
              <div className="flex justify-between font-bold text-gray-800">
                <span>TaskMaster – Real-time Task Manager</span>
                <span className="font-normal text-gray-500">React, Node.js, MongoDB</span>
              </div>
              <p className="text-gray-600 leading-relaxed">
                Developed an interactive productivity platform with authentication, state persistence, and responsive UI components.
              </p>
            </div>
          </div>

          {/* Honors & Certifications */}
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A5F8A] border-b border-gray-100 pb-0.5">
              Honors & Certifications
            </h4>
            <ul className="list-disc list-inside text-xs text-gray-700 space-y-0.5">
              <li>CS50: Introduction to Computer Science – HarvardX (2025)</li>
              <li>Top 10 Finalist in University Hackathon 2025</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 5. Key Benefits & CTA */}
      <div className="p-8 rounded-3xl bg-blush/20 dark:bg-plum-dark/40 border border-canvas-border dark:border-plum-border text-center space-y-6">
        <h2 className="text-xl font-bold text-canvas-primary dark:text-darkCanvas-primary">
          Ready to Build Your Internship-Ready Resume?
        </h2>
        <p className="text-xs sm:text-sm text-canvas-secondary dark:text-darkCanvas-secondary max-w-xl mx-auto leading-relaxed">
          Sign up today to create, customize, and download your clean PDF resume completely free.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onOpenAuth('register')}
            className="btn-primary !px-8 !py-3.5 !text-xs font-bold shadow-soft"
          >
            Sign Up to Create Your Resume
          </button>
          <button
            type="button"
            onClick={() => onOpenAuth('login')}
            className="btn-secondary !px-6 !py-3.5 !text-xs font-bold"
          >
            Login to Access
          </button>
        </div>
      </div>

    </div>
  );
}
