import React from 'react';
import { 
  FileSearch, 
  Upload, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  Tag, 
  Lightbulb, 
  BarChart3, 
  ShieldCheck, 
  Check, 
  X, 
  ChevronRight,
  TrendingUp,
  FileCheck
} from 'lucide-react';

export default function ResumeAnalyzerInfo({ onOpenAuth }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fadeIn">
      
      {/* 1. Header & Hero Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-canvas-primary dark:text-darkCanvas-primary tracking-tight">
          AI Resume Analyzer
        </h1>
        
        <p className="text-base sm:text-lg text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
          Evaluate your resume for ATS compatibility, keyword density, technical depth, strengths, and actionable improvements powered by Google Gemini AI.
        </p>

        {/* Primary Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            type="button"
            onClick={() => onOpenAuth('register')}
            className="btn-primary !px-8 !py-3.5 !text-sm flex items-center gap-2 shadow-soft hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Sign Up to Analyze Your Resume</span>
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

      {/* 2. What It Is & Why It Is Useful (Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blush/60 dark:bg-plum-border/50 flex items-center justify-center text-plum-dusty dark:text-lilac">
            <BarChart3 className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-canvas-primary dark:text-darkCanvas-primary">
            What is the Resume Analyzer?
          </h2>
          <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
            The Resume Analyzer is an intelligent diagnostic tool that parses your PDF or DOCX resume using Google Gemini AI. It analyzes your resume text against modern Applicant Tracking System (ATS) guidelines and industry recruitment standards.
          </p>
          <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
            Unlike superficial keyword counters, it performs semantic analysis: reviewing project impact, identifying missing technical skills, verifying structure, and generating concrete bullet-point revisions.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blush/60 dark:bg-plum-border/50 flex items-center justify-center text-plum-dusty dark:text-lilac">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-canvas-primary dark:text-darkCanvas-primary">
            Why is it Essential for Students & Freshers?
          </h2>
          <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
            Over <strong>75% of resumes are screened out</strong> by automated ATS filters before a human hiring manager ever sees them. Often, rejection is caused by missing keywords, unparseable tables, or vague bullet descriptions.
          </p>
          <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
            By auditing your resume before applying, you pinpoint exactly what keywords are missing, what strengths to emphasize, and how to structure your projects to maximize callback rates for internships and placement drives.
          </p>
        </div>
      </div>

      {/* 3. How It Works Step-by-Step */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-plum-dusty dark:text-lilac">
            Workflow Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-canvas-primary dark:text-darkCanvas-primary">
            How It Works in 5 Simple Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {[
            {
              step: '01',
              title: 'Upload Document',
              desc: 'Select your resume in PDF or DOCX format. Clean text is safely extracted in memory.'
            },
            {
              step: '02',
              title: 'Target Context',
              desc: 'Select or input your target engineering domain or job role for contextual evaluation.'
            },
            {
              step: '03',
              title: 'Gemini AI Analysis',
              desc: 'Google Gemini AI evaluates syntax, clarity, keywords, formatting, and technical depth.'
            },
            {
              step: '04',
              title: 'Review Audit',
              desc: 'Inspect your 0–100 Advisory Score, ATS breakdown, strengths, and missing keywords.'
            },
            {
              step: '05',
              title: 'Refine & Apply',
              desc: 'Apply actionable sentence rewrites and update your resume with elevated confidence.'
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-2"
            >
              <span className="text-xs font-black text-plum-dusty dark:text-lilac">
                STEP {item.step}
              </span>
              <h3 className="font-bold text-sm text-canvas-primary dark:text-darkCanvas-primary">
                {item.title}
              </h3>
              <p className="text-xs text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Practical Demonstration: Sample Output */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-canvas-border dark:border-plum-border pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
              <span>Illustrative Demonstration — Sample Data Only</span>
            </div>
            <h2 className="text-2xl font-black text-canvas-primary dark:text-darkCanvas-primary mt-1">
              Sample Resume Audit: Junior Software Developer
            </h2>
            <p className="text-xs text-canvas-secondary dark:text-darkCanvas-secondary">
              Here is an exact simulation of what you see when you analyze your resume in RESUMIFY.
            </p>
          </div>
          
          <button
            type="button"
            onClick={() => onOpenAuth('register')}
            className="btn-primary !py-2 !px-4 !text-xs self-start sm:self-auto"
          >
            Try With Your Resume →
          </button>
        </div>

        {/* Demo Audit Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-6">
          
          {/* Header Score Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-blush/20 dark:bg-plum-darker/60 border border-canvas-border dark:border-plum-border">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-plum-dusty dark:text-lilac">
                Advisory Quality Score
              </span>
              <h3 className="text-3xl font-extrabold text-canvas-primary dark:text-darkCanvas-primary">
                84 / 100
              </h3>
              <p className="text-xs text-canvas-secondary dark:text-darkCanvas-secondary max-w-xs">
                Comprehensive score evaluating readability, structure, and technical depth.
              </p>
            </div>

            <div className="px-5 py-4 rounded-2xl border text-center font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800">
              <span className="text-xs uppercase tracking-wider block opacity-80">ATS Readiness</span>
              <span className="text-lg font-black">High (85%)</span>
              <span className="text-[10px] block opacity-80 mt-0.5">Compatible Format</span>
            </div>
          </div>

          {/* ATS Summary */}
          <div className="p-4 rounded-xl bg-blush/30 dark:bg-plum-darker/60 border border-canvas-border dark:border-plum-border text-xs sm:text-sm text-canvas-primary dark:text-darkCanvas-primary leading-relaxed">
            <strong className="font-semibold text-plum-dusty dark:text-lilac block mb-1">
              ATS Compatibility Summary:
            </strong>
            The document demonstrates clear single-column hierarchy with clean section headers. Fonts and layout parse reliably. Adding targeted cloud deployment and testing keywords will bring ATS score to 90%+.
          </div>

          {/* Identified Skills */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-plum-dusty dark:text-lilac flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" />
              <span>Identified Technical Skills (8)</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {['JavaScript (ES6+)', 'React.js', 'Python', 'Node.js', 'SQL', 'Git & GitHub', 'REST APIs', 'Data Structures'].map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blush/60 dark:bg-plum-darker/80 text-plum-dusty dark:text-lilac border border-canvas-border dark:border-plum-border"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Strengths & Weaknesses 2-Column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Key Strengths</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-emerald-900 dark:text-emerald-200">
                <li className="flex items-start gap-1.5">
                  <span className="font-bold shrink-0">•</span>
                  <span>Clear project descriptions detailing tech stacks and problem-solving methodology.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold shrink-0">•</span>
                  <span>Solid computer science foundational coursework in algorithms and databases.</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Areas Needing Attention</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-amber-900 dark:text-amber-200">
                <li className="flex items-start gap-1.5">
                  <span className="font-bold shrink-0">•</span>
                  <span>Quantify project impact with measurable metrics (e.g. speedup %, active users).</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold shrink-0">•</span>
                  <span>Incorporate cloud deployment keywords to demonstrate modern DevOps literacy.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Missing Keywords Recommendation */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-plum-dusty dark:text-lilac flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Recommended Skills / Keywords to Add</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {['Docker', 'TypeScript', 'CI/CD Pipelines', 'Unit Testing (Jest/Mocha)', 'Cloud (AWS/GCP basics)'].map((sk, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900"
                >
                  + {sk}
                </span>
              ))}
            </div>
          </div>

          {/* Before & After Demonstration Card */}
          <div className="p-5 rounded-2xl bg-blush/20 dark:bg-plum-darker/60 border border-canvas-border dark:border-plum-border space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-plum-dusty dark:text-lilac">
              Before & After: Bullet Point Enhancement Example
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 space-y-1">
                <div className="flex items-center gap-1.5 text-rose-700 dark:text-rose-300 font-bold text-xs">
                  <X className="w-3.5 h-3.5" />
                  <span>Before (Weak & Vague)</span>
                </div>
                <p className="text-xs text-rose-900 dark:text-rose-200 font-mono">
                  "Made a website for college tasks using React and Node."
                </p>
                <p className="text-[11px] text-rose-800/80 dark:text-rose-300/80 pt-1">
                  Issue: Lacks measurable scope, passive phrasing, missing technical specifics.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                  <Check className="w-3.5 h-3.5" />
                  <span>After (Impactful & ATS-Optimized)</span>
                </div>
                <p className="text-xs text-emerald-900 dark:text-emerald-200 font-mono">
                  "Architected and deployed a responsive full-stack task management portal using React and Node.js, improving daily student workflow efficiency by 35%."
                </p>
                <p className="text-[11px] text-emerald-800/80 dark:text-emerald-300/80 pt-1">
                  Outcome: Strong action verb, clearly identified tech stack, quantified achievement.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 5. Key Benefits Section */}
      <div className="p-8 rounded-3xl bg-blush/20 dark:bg-plum-dark/40 border border-canvas-border dark:border-plum-border space-y-6">
        <h2 className="text-xl font-bold text-canvas-primary dark:text-darkCanvas-primary text-center">
          Why Job Seekers Rely on Resumify Resume Analyzer
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-plum-dusty dark:bg-orchid text-white flex items-center justify-center mx-auto shadow-soft">
              <ShieldCheck className="w-5 h-5 text-blush" />
            </div>
            <h3 className="font-bold text-sm text-canvas-primary dark:text-darkCanvas-primary">
              100% Privacy Protected
            </h3>
            <p className="text-xs text-canvas-secondary dark:text-darkCanvas-secondary">
              Resumes are processed in volatile memory for parsing and immediately deleted from disk.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-plum-dusty dark:bg-orchid text-white flex items-center justify-center mx-auto shadow-soft">
              <Sparkles className="w-5 h-5 text-blush" />
            </div>
            <h3 className="font-bold text-sm text-canvas-primary dark:text-darkCanvas-primary">
              Real Gemini AI Models
            </h3>
            <p className="text-xs text-canvas-secondary dark:text-darkCanvas-secondary">
              Evaluations are generated by genuine Google Gemini AI, not canned or hardcoded templates.
            </p>
          </div>

          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-plum-dusty dark:bg-orchid text-white flex items-center justify-center mx-auto shadow-soft">
              <FileCheck className="w-5 h-5 text-blush" />
            </div>
            <h3 className="font-bold text-sm text-canvas-primary dark:text-darkCanvas-primary">
              Completely Free Access
            </h3>
            <p className="text-xs text-canvas-secondary dark:text-darkCanvas-secondary">
              Free for all registered students and freshers. No subscription or hidden paywalls.
            </p>
          </div>
        </div>

        {/* Final CTA Banner */}
        <div className="text-center pt-4 border-t border-canvas-border dark:border-plum-border space-y-3">
          <h3 className="text-lg font-bold text-canvas-primary dark:text-darkCanvas-primary">
            Ready to Audit Your Resume?
          </h3>
          <p className="text-xs sm:text-sm text-canvas-secondary dark:text-darkCanvas-secondary max-w-md mx-auto">
            Create your free account today and discover where your resume stands in less than 30 seconds.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              type="button"
              onClick={() => onOpenAuth('register')}
              className="btn-primary !px-7 !py-3 !text-xs font-bold"
            >
              Sign Up to Analyze Your Resume
            </button>
            <button
              type="button"
              onClick={() => onOpenAuth('login')}
              className="btn-secondary !px-5 !py-3 !text-xs font-bold"
            >
              Already Registered? Sign In
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
