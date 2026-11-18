import React from 'react';
import { 
  Compass, 
  GraduationCap, 
  Code2, 
  Target, 
  Briefcase, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp, 
  BookOpen, 
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  MapPin
} from 'lucide-react';

export default function CareerGuidanceInfo({ onOpenAuth }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fadeIn">
      
      {/* 1. Header & Hero Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-canvas-primary dark:text-darkCanvas-primary tracking-tight">
          AI Career Guidance & Roadmap Planner
        </h1>
        
        <p className="text-base sm:text-lg text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
          Discover high-fit engineering roles, identify critical skill gaps, and formulate concrete learning milestones tailored to your academic year and technical interests.
        </p>

        {/* Primary Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            type="button"
            onClick={() => onOpenAuth('register')}
            className="btn-primary !px-8 !py-3.5 !text-sm flex items-center gap-2 shadow-soft hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Sign Up for Career Guidance</span>
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
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-canvas-primary dark:text-darkCanvas-primary">
            What is AI Career Guidance?
          </h2>
          <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
            Many first-year and sophomore engineering students feel overwhelmed by the sheer volume of technologies: Web, AI/ML, Cloud, Cyber, DevOps. It is difficult to know what to learn first or how to prepare for internships.
          </p>
          <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
            The Resumify Career Guidance engine uses Google Gemini AI to analyze your current academic standing, languages you already know, and your personal interests to generate a structured, semester-by-semester career plan.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blush/60 dark:bg-plum-border/50 flex items-center justify-center text-plum-dusty dark:text-lilac">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-canvas-primary dark:text-darkCanvas-primary">
            Why is Personalized Roadmapping Important?
          </h2>
          <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
            Generic online tutorials often lack sequence. You learn a bit of syntax without knowing how to assemble full-stack applications or pass placement coding rounds.
          </p>
          <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
            Resumify bridges the gap between college curricula and high-demand industry engineering stacks. It highlights the exact skill gaps between where you are today and where hiring standards expect you to be.
          </p>
        </div>
      </div>

      {/* 3. How It Works Step-by-Step */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-plum-dusty dark:text-lilac">
            Systematic Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-canvas-primary dark:text-darkCanvas-primary">
            How Your Career Path Is Formulated
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              step: '01',
              title: 'Provide Academic Profile',
              desc: 'Share your college year, degree branch, and foundational languages (C++, Python, etc.).'
            },
            {
              step: '02',
              title: 'Specify Aspirations',
              desc: 'Indicate your areas of interest (Web Dev, Cloud, AI) and your target internship goals.'
            },
            {
              step: '03',
              title: 'AI Gap Synthesis',
              desc: 'Gemini AI evaluates what you already know against current industry job expectations.'
            },
            {
              step: '04',
              title: 'Structured Roadmap',
              desc: 'Get role match percentages, step-by-step learning milestones, and starter project ideas.'
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-2"
            >
              <span className="text-xs font-black text-plum-dusty dark:text-lilac">
                PHASE {item.step}
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
              Sample Case: 1st Year B.Tech CSE Student &rarr; Web Developer
            </h2>
            <p className="text-xs text-canvas-secondary dark:text-darkCanvas-secondary">
              Input: 1st Year B.Tech CSE · Skills: C++, HTML/CSS, Git · Goal: Summer Software Internship
            </p>
          </div>
          
          <button
            type="button"
            onClick={() => onOpenAuth('register')}
            className="btn-primary !py-2 !px-4 !text-xs self-start sm:self-auto"
          >
            Create Your Custom Roadmap →
          </button>
        </div>

        {/* Demo Roadmap Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-6">
          
          {/* Role Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-canvas-border dark:border-plum-border pb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-canvas-primary dark:text-darkCanvas-primary">
                Full-Stack Web Developer
              </h3>
              <p className="text-xs text-canvas-secondary dark:text-darkCanvas-secondary mt-0.5">
                Build end-to-end modern web applications with component-driven frontends and RESTful API backends.
              </p>
            </div>

            <div className="px-4 py-2 rounded-xl bg-blush/60 dark:bg-plum-border/40 border border-canvas-border dark:border-plum-border text-center shrink-0">
              <span className="text-[10px] uppercase font-bold tracking-wider text-plum-dusty dark:text-lilac block">Match Fit</span>
              <span className="text-lg font-black text-canvas-primary dark:text-darkCanvas-primary">92%</span>
            </div>
          </div>

          {/* Existing Skills vs Skill Gaps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 space-y-1.5">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Matching Existing Foundations</span>
              </span>
              <div className="flex flex-wrap gap-1">
                {['C++ Logic & Algorithms', 'HTML5 & CSS3', 'Git Version Control'].map((s, i) => (
                  <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-white dark:bg-emerald-900/50 text-emerald-900 dark:text-emerald-200 font-medium border border-emerald-200 dark:border-emerald-800">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 space-y-1.5">
              <span className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Skill Gaps to Master</span>
              </span>
              <div className="flex flex-wrap gap-1">
                {['JavaScript ES6+', 'React.js', 'Node.js & Express', 'MongoDB / SQL', 'RESTful APIs'].map((s, i) => (
                  <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-white dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 font-medium border border-amber-200 dark:border-amber-800">
                    + {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Structured Learning Roadmap */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-plum-dusty dark:text-lilac flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>Recommended Milestone Roadmap</span>
            </h4>
            
            <div className="space-y-2.5">
              <div className="p-3.5 rounded-xl bg-blush/20 dark:bg-plum-darker/50 border border-canvas-border dark:border-plum-border space-y-1.5">
                <span className="text-xs font-bold text-plum-dusty dark:text-lilac">
                  Phase 1: Advanced JavaScript & React Component Engineering (Months 1–2)
                </span>
                <ul className="list-disc list-inside text-xs text-canvas-secondary dark:text-darkCanvas-secondary space-y-0.5">
                  <li>Master ES6+ syntax: arrow functions, promises, async/await, closures.</li>
                  <li>Build reactive web interfaces using React functional components, hooks (useState, useEffect), and Tailwind CSS.</li>
                  <li><strong>Project to build:</strong> Interactive Personal Portfolio with dynamic theme switching and contact form.</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-blush/20 dark:bg-plum-darker/50 border border-canvas-border dark:border-plum-border space-y-1.5">
                <span className="text-xs font-bold text-plum-dusty dark:text-lilac">
                  Phase 2: Backend REST APIs & Database Persistence (Months 3–4)
                </span>
                <ul className="list-disc list-inside text-xs text-canvas-secondary dark:text-darkCanvas-secondary space-y-0.5">
                  <li>Develop Node.js & Express HTTP web servers and routing architecture.</li>
                  <li>Implement secure JWT user authentication and password hashing with bcrypt.</li>
                  <li>Connect to MongoDB / PostgreSQL and model relational or document collections.</li>
                  <li><strong>Project to build:</strong> Full-Stack Task & Note Management portal with CRUD API and user authentication.</li>
                </ul>
              </div>

              <div className="p-3.5 rounded-xl bg-blush/20 dark:bg-plum-darker/50 border border-canvas-border dark:border-plum-border space-y-1.5">
                <span className="text-xs font-bold text-plum-dusty dark:text-lilac">
                  Phase 3: Production Deployment & Placement Readiness (Months 5–6)
                </span>
                <ul className="list-disc list-inside text-xs text-canvas-secondary dark:text-darkCanvas-secondary space-y-0.5">
                  <li>Containerize applications with Docker; deploy backend to Render/Railway and frontend to Vercel/Netlify.</li>
                  <li>Practice LeetCode Data Structures (Arrays, Linked Lists, Trees) using your strong C++ background.</li>
                  <li>Publish code repositories on GitHub with clean READMEs, documentation, and live demo links.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Actionable Next Steps */}
          <div className="space-y-2 pt-2 border-t border-canvas-border dark:border-plum-border">
            <h4 className="text-xs font-bold uppercase tracking-wider text-plum-dusty dark:text-lilac">
              Immediate Actionable Next Steps
            </h4>
            <ul className="space-y-1 text-xs text-canvas-secondary dark:text-darkCanvas-secondary">
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-plum-dusty dark:text-lilac">→</span>
                <span>Complete the free Harvard CS50 Web Programming track or freeCodeCamp JavaScript certification.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="font-bold text-plum-dusty dark:text-lilac">→</span>
                <span>Build and deploy your first full-stack CRUD application to showcase on your internship resume.</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* 5. Key Benefits & CTA */}
      <div className="p-8 rounded-3xl bg-blush/20 dark:bg-plum-dark/40 border border-canvas-border dark:border-plum-border text-center space-y-6">
        <h2 className="text-xl font-bold text-canvas-primary dark:text-darkCanvas-primary">
          Turn Career Uncertainty into a Concrete Strategy
        </h2>
        <p className="text-xs sm:text-sm text-canvas-secondary dark:text-darkCanvas-secondary max-w-xl mx-auto leading-relaxed">
          Stop wondering what language to learn next. Get a tailored engineering roadmap based on your current year and interests today.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onOpenAuth('register')}
            className="btn-primary !px-8 !py-3.5 !text-xs font-bold shadow-soft"
          >
            Sign Up for Career Guidance
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
