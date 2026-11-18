import React from 'react';
import { 
  LayoutDashboard, 
  FileSearch, 
  FileText, 
  Compass, 
  MessageSquareCode, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  TrendingUp,
  UserCheck
} from 'lucide-react';

export default function DashboardInfo({ onOpenAuth }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 animate-fadeIn">
      
      {/* 1. Header & Hero Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-3xl sm:text-5xl font-black text-canvas-primary dark:text-darkCanvas-primary tracking-tight">
          My Dashboard
        </h1>
        
        <p className="text-base sm:text-lg text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
          Access your personalized career history, saved resumes, ATS audit records, custom learning roadmaps, and interview practice transcripts all in one secure space.
        </p>

        {/* Primary Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            type="button"
            onClick={() => onOpenAuth('register')}
            className="btn-primary !px-8 !py-3.5 !text-sm flex items-center gap-2 shadow-soft hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 text-white" />
            <span>Sign Up to Access Your Dashboard</span>
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
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-canvas-primary dark:text-darkCanvas-primary">
            What is the Personal Dashboard?
          </h2>
          <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
            The Personal Dashboard is your central hub on RESUMIFY. Whenever you analyze a resume, craft a new CV, generate a career roadmap, or practice an interview, your session data is automatically synchronized to your authenticated account.
          </p>
          <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
            Instead of losing your previous recommendations or having to re-upload documents repeatedly, your dashboard maintains an organized timeline of your career advancement.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blush/60 dark:bg-plum-border/50 flex items-center justify-center text-plum-dusty dark:text-lilac">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-canvas-primary dark:text-darkCanvas-primary">
            Strict User Privacy & Data Isolation
          </h2>
          <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
            Every account has isolated storage. Your resumes, personal details, contact numbers, and mock interview transcripts are private to your individual session.
          </p>
          <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
            No other user can view or access your documents. You can revisit previous audit scores to verify if your revised resume improved compared to your initial draft.
          </p>
        </div>
      </div>

      {/* 3. Illustrative Dashboard Preview (Demonstration Data Only) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-canvas-border dark:border-plum-border pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800">
              <span>Illustrative Demonstration — Fictional Sample Data Only</span>
            </div>
            <h2 className="text-2xl font-black text-canvas-primary dark:text-darkCanvas-primary mt-1">
              Sample Dashboard View: Active Student Workspace
            </h2>
            <p className="text-xs text-canvas-secondary dark:text-darkCanvas-secondary">
              Here is what your authenticated control center looks like with saved activities.
            </p>
          </div>
          
          <button
            type="button"
            onClick={() => onOpenAuth('register')}
            className="btn-primary !py-2 !px-4 !text-xs self-start sm:self-auto"
          >
            Unlock Your Dashboard →
          </button>
        </div>

        {/* Demo Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Resumes Analyzed', count: 3, desc: 'Highest Score: 88/100', icon: FileSearch },
            { title: 'Saved Resumes', count: 1, desc: 'Modern Tech Template', icon: FileText },
            { title: 'Career Roadmaps', count: 1, desc: 'Full-Stack Web Dev', icon: Compass },
            { title: 'Interview Practice', count: 2, desc: 'Avg Score: 85/100', icon: MessageSquareCode },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div 
                key={i}
                className="p-5 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-canvas-secondary dark:text-darkCanvas-secondary">
                    {stat.title}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-blush/60 dark:bg-plum-border/50 flex items-center justify-center text-plum-dusty dark:text-lilac">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl font-extrabold text-canvas-primary dark:text-darkCanvas-primary">
                  {stat.count}
                </div>
                <div className="text-xs text-canvas-secondary/70 dark:text-darkCanvas-muted/70 pt-1 border-t border-canvas-border dark:border-plum-border">
                  {stat.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Demo Recent Activity Records */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-4">
          <h3 className="text-base font-bold text-canvas-primary dark:text-darkCanvas-primary flex items-center gap-2">
            <Clock className="w-4 h-4 text-plum-dusty dark:text-lilac" />
            <span>Demonstration: Saved Activity History</span>
          </h3>

          <div className="space-y-2.5">
            <div className="p-3.5 rounded-xl bg-blush/20 dark:bg-plum-darker/40 border border-canvas-border dark:border-plum-border flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <FileSearch className="w-4 h-4 text-plum-dusty dark:text-lilac" />
                <div>
                  <p className="font-bold text-canvas-primary dark:text-darkCanvas-primary">Alex_Morgan_Internship_Resume.pdf</p>
                  <p className="text-canvas-secondary dark:text-darkCanvas-secondary">Advisory Score: 84/100 · ATS Assessment: High Readiness (85%)</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-white dark:bg-plum-card text-plum-dusty dark:text-lilac font-bold border border-canvas-border dark:border-plum-border">
                Saved Audit
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-blush/20 dark:bg-plum-darker/40 border border-canvas-border dark:border-plum-border flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-plum-dusty dark:text-lilac" />
                <div>
                  <p className="font-bold text-canvas-primary dark:text-darkCanvas-primary">Alex Morgan's Modern Resume</p>
                  <p className="text-canvas-secondary dark:text-darkCanvas-secondary">Template: Modern Tech · Export Ready A4</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-white dark:bg-plum-card text-plum-dusty dark:text-lilac font-bold border border-canvas-border dark:border-plum-border">
                PDF Ready
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-blush/20 dark:bg-plum-darker/40 border border-canvas-border dark:border-plum-border flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <Compass className="w-4 h-4 text-plum-dusty dark:text-lilac" />
                <div>
                  <p className="font-bold text-canvas-primary dark:text-darkCanvas-primary">Full-Stack Web Developer Career Plan</p>
                  <p className="text-canvas-secondary dark:text-darkCanvas-secondary">92% Role Match · 3 Learning Phases & Project Benchmarks</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-white dark:bg-plum-card text-plum-dusty dark:text-lilac font-bold border border-canvas-border dark:border-plum-border">
                Active Roadmap
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-blush/20 dark:bg-plum-darker/40 border border-canvas-border dark:border-plum-border flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <MessageSquareCode className="w-4 h-4 text-plum-dusty dark:text-lilac" />
                <div>
                  <p className="font-bold text-canvas-primary dark:text-darkCanvas-primary">Frontend Developer Mock Session (React & DOM)</p>
                  <p className="text-canvas-secondary dark:text-darkCanvas-secondary">Technical Question Score: 85/100 · Solid Understanding</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-md bg-white dark:bg-plum-card text-plum-dusty dark:text-lilac font-bold border border-canvas-border dark:border-plum-border">
                Reviewed
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Key Benefits & CTA */}
      <div className="p-8 rounded-3xl bg-blush/20 dark:bg-plum-dark/40 border border-canvas-border dark:border-plum-border text-center space-y-6">
        <h2 className="text-xl font-bold text-canvas-primary dark:text-darkCanvas-primary">
          All Your Career Assets in One Secure Place
        </h2>
        <p className="text-xs sm:text-sm text-canvas-secondary dark:text-darkCanvas-secondary max-w-xl mx-auto leading-relaxed">
          Create your free Resumify account today to track your resume improvements and unlock full access to all career development tools.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => onOpenAuth('register')}
            className="btn-primary !px-8 !py-3.5 !text-xs font-bold shadow-soft"
          >
            Sign Up to Access Your Dashboard
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
