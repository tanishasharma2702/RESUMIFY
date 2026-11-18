import React from 'react';
import { 
  MessageSquareCode, 
  Send, 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  Briefcase, 
  Sliders, 
  BookOpen, 
  TrendingUp, 
  ShieldCheck,
  Award
} from 'lucide-react';

export default function InterviewPrepInfo({ onOpenAuth }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fadeIn">
      
      {/* 1. Header & Hero Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-canvas-primary dark:text-darkCanvas-primary tracking-tight">
          AI Interview Preparation
        </h1>
        
        <p className="text-base sm:text-lg text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
          Master placement and internship interviews with realistic role-tailored technical and HR questions, automated scoring, and comprehensive model critiques.
        </p>

        {/* Primary Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            type="button"
            onClick={() => onOpenAuth('register')}
            className="btn-primary !px-8 !py-3.5 !text-sm flex items-center gap-2 shadow-soft hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Sign Up to Practice Interviews</span>
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
            <MessageSquareCode className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-canvas-primary dark:text-darkCanvas-primary">
            What is the AI Interview Mock Engine?
          </h2>
          <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
            The Interview Preparation module simulates real-world campus recruitment and technical screening interviews. It leverages Google Gemini AI to generate customized question sets tailored to your target job role, level, and focus topics.
          </p>
          <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
            Rather than reading static question banks with answers you immediately forget, you practice articulating your thoughts in writing. Gemini AI evaluates your accuracy, detects missing concepts, and provides an ideal model answer.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blush/60 dark:bg-plum-border/50 flex items-center justify-center text-plum-dusty dark:text-lilac">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-canvas-primary dark:text-darkCanvas-primary">
            Why is Practice Essential Before Actual Interviews?
          </h2>
          <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
            Many talented student coders fail interviews not because they lack coding skills, but because they struggle to structure verbal and conceptual explanations under interview pressure.
          </p>
          <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
            Practicing with objective AI critiques helps you identify gaps in your conceptual depth, learn how to structure responses with technical terminology, and gain confidence before campus placement drives.
          </p>
        </div>
      </div>

      {/* 3. How It Works Step-by-Step */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-plum-dusty dark:text-lilac">
            Interactive Practice Cycle
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-canvas-primary dark:text-darkCanvas-primary">
            How Mock Practice Works in 6 Steps
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
          {[
            { step: '1', title: 'Target Role', desc: 'Specify job role (Frontend, Backend, SDE, AI).' },
            { step: '2', title: 'Choose Format', desc: 'Select Technical coding or HR Behavioral.' },
            { step: '3', title: 'Difficulty', desc: 'Set Junior, Mid, or Senior tier.' },
            { step: '4', title: 'Answer & Type', desc: 'Formulate and type your answer clearly.' },
            { step: '5', title: 'AI Evaluation', desc: 'Receive accuracy score, strengths & weaknesses.' },
            { step: '6', title: 'Model Answer', desc: 'Study the benchmark answer to improve.' },
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

      {/* 4. Practical Demonstration: Sample Output */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-canvas-border dark:border-plum-border pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
              <span>Illustrative Demonstration — Sample Data Only</span>
            </div>
            <h2 className="text-2xl font-black text-canvas-primary dark:text-darkCanvas-primary mt-1">
              Sample Mock Session: Frontend Developer Interview
            </h2>
            <p className="text-xs text-canvas-secondary dark:text-darkCanvas-secondary">
              Role: Frontend Developer · Category: Technical · Difficulty: Junior
            </p>
          </div>
          
          <button
            type="button"
            onClick={() => onOpenAuth('register')}
            className="btn-primary !py-2 !px-4 !text-xs self-start sm:self-auto"
          >
            Start Your Mock Session →
          </button>
        </div>

        {/* Demo Interview Critique Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-6">
          
          {/* Question Display */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-plum-dusty dark:text-lilac">
              Interview Question 1 of 5
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-canvas-primary dark:text-darkCanvas-primary leading-snug">
              "Can you explain the Virtual DOM in React and why it improves rendering performance compared to traditional DOM manipulation?"
            </h3>
            <div className="p-3.5 rounded-xl bg-blush/30 dark:bg-plum-darker/50 border border-canvas-border dark:border-plum-border flex items-start gap-2.5">
              <Lightbulb className="w-4 h-4 text-plum-dusty dark:text-lilac shrink-0 mt-0.5" />
              <p className="text-xs text-canvas-secondary dark:text-darkCanvas-secondary">
                <strong>Interviewer Guidance Tip:</strong> Focus on reconciliation, diffing algorithms, and how batching minimal updates avoids expensive browser layout recalculations.
              </p>
            </div>
          </div>

          {/* User Submitted Answer */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-canvas-secondary dark:text-darkCanvas-secondary">
              User Submitted Response
            </span>
            <div className="p-4 rounded-xl bg-blush/10 dark:bg-plum-darker/60 border border-canvas-border dark:border-plum-border text-xs sm:text-sm text-canvas-primary dark:text-darkCanvas-primary font-mono leading-relaxed">
              "Virtual DOM is a copy of real DOM in memory. When state changes, React updates the virtual DOM first and compares it with the old one to only update changed parts instead of re-rendering everything."
            </div>
          </div>

          {/* Evaluation Results */}
          <div className="p-6 rounded-2xl bg-blush/20 dark:bg-plum-darker/60 border border-canvas-border dark:border-plum-border space-y-5">
            <div className="flex items-center justify-between border-b border-canvas-border dark:border-plum-border pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-plum-dusty dark:text-lilac block">
                  AI Answer Evaluation
                </span>
                <h4 className="text-2xl font-black text-canvas-primary dark:text-darkCanvas-primary">
                  Score: 85 / 100
                </h4>
              </div>
              <span className="px-3.5 py-1.5 rounded-xl bg-blush/60 dark:bg-plum-border/50 border border-canvas-border dark:border-plum-border text-xs font-bold text-plum-dusty dark:text-lilac">
                Solid Understanding
              </span>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 space-y-1">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>What You Did Well</span>
                </span>
                <p className="text-xs text-emerald-900 dark:text-emerald-200">
                  Accurately explains the in-memory representation; correctly highlights the reconciliation and diffing mechanism.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 space-y-1">
                <span className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>Areas to Refine</span>
                </span>
                <p className="text-xs text-amber-900 dark:text-amber-200">
                  Could mention batching and fiber tree updates, as well as cost comparison of browser layout reflows and repaints.
                </p>
              </div>
            </div>

            {/* Model Answer Box */}
            <div className="p-4 rounded-xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-wider text-plum-dusty dark:text-lilac flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ideal Model Answer</span>
              </span>
              <p className="text-xs text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed italic">
                "The Virtual DOM is a lightweight JavaScript abstraction of the actual DOM stored in memory. When component state changes, React creates a new VDOM tree and performs reconciliation (diffing algorithm) to compute minimal batch mutations, preventing costly browser layout recalculations and repaints."
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* 5. Key Benefits & CTA */}
      <div className="p-8 rounded-3xl bg-blush/20 dark:bg-plum-dark/40 border border-canvas-border dark:border-plum-border text-center space-y-6">
        <h2 className="text-xl font-bold text-canvas-primary dark:text-darkCanvas-primary">
          Turn Interview Anxiety into Career Confidence
        </h2>
        <p className="text-xs sm:text-sm text-canvas-secondary dark:text-darkCanvas-secondary max-w-xl mx-auto leading-relaxed">
          Sign up today to test your knowledge against real Gemini AI questions and gain actionable insights before your next interview.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onOpenAuth('register')}
            className="btn-primary !px-8 !py-3.5 !text-xs font-bold shadow-soft"
          >
            Sign Up to Practice Interviews
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
