import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FileSearch, 
  Compass, 
  FileText, 
  MessageSquareCode, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  TrendingUp, 
  Zap, 
  Award,
  Layers,
  ChevronRight
} from 'lucide-react';

export default function LandingPage() {
  const services = [
    {
      title: 'Resume Analyzer',
      description: 'Upload your PDF or Word resume for instant ATS readiness scoring, keyword gap analysis, and tailored formatting recommendations.',
      icon: FileSearch,
      path: '/analyzer',
      badge: 'Real Gemini AI',
    },
    {
      title: 'Career Guidance',
      description: 'Discover the most suitable tech career paths based on your current education, existing skills, interests, and tailored learning roadmaps.',
      icon: Compass,
      path: '/career',
      badge: 'Personalized Pathing',
    },
    {
      title: 'Create Resume',
      description: 'Craft elegant, ATS-friendly resumes designed for students and freshers. Live interactive preview with instant PDF download.',
      icon: FileText,
      path: '/builder',
      badge: 'Multi-Template & PDF',
    },
    {
      title: 'Interview Preparation',
      description: 'Practice role-specific technical and HR interview questions. Submit answers for immediate AI critique and model answers.',
      icon: MessageSquareCode,
      path: '/interview',
      badge: 'Live AI Critique',
    }
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Upload or Build',
      description: 'Upload your existing resume in PDF or DOCX format, or build a fresh one tailored for academic internships using our structured builder.'
    },
    {
      step: '02',
      title: 'AI Deep Analysis',
      description: 'Google Gemini AI securely parses your technical abilities, projects, and formatting to identify strengths, ATS gaps, and keyword alignment.'
    },
    {
      step: '03',
      title: 'Accelerate Career',
      description: 'Receive step-by-step career milestones, curated skill roadmaps, and practice real mock interview questions with instant evaluation.'
    }
  ];

  const benefits = [
    {
      icon: Award,
      title: 'Advisory Quality Score',
      text: 'Objective 0–100 score evaluating structure, readability, and content impact without arbitrary automated rejection.'
    },
    {
      icon: Zap,
      title: 'Zero Work Experience Required',
      text: 'Specially engineered for first-year students and freshers highlighting academic coursework, hackathons, and personal projects.'
    },
    {
      icon: ShieldCheck,
      title: '100% Data Privacy & Security',
      text: 'Uploaded documents are extracted in memory and deleted immediately after analysis. Your personal details are never exposed.'
    },
    {
      icon: TrendingUp,
      title: 'Actionable Learning Roadmaps',
      text: 'Bridge the gap between college curricula and high-demand industry tech stacks with concrete beginner-to-advanced milestones.'
    }
  ];

  return (
    <div className="space-y-24 py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* 1. Hero Section */}
      <section className="text-center space-y-8 pt-6 pb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-blush/60 dark:bg-plum-card text-plum-dusty dark:text-lilac border border-canvas-border dark:border-plum-border shadow-soft">
          <Sparkles className="w-4 h-4 text-orchid" />
          <span>Next-Generation AI Career Suite for Students & Freshers</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-canvas-primary dark:text-darkCanvas-primary max-w-4xl mx-auto leading-tight sm:leading-none">
          Accelerate Your Career with <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-plum-dusty via-orchid to-lavender dark:from-lilac dark:via-lavender dark:to-blush">
            AI-Driven Resume Intelligence
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-canvas-secondary dark:text-darkCanvas-muted max-w-2xl mx-auto leading-relaxed">
          RESUMIFY helps students and job seekers audit resumes for ATS readiness, receive personalized career guidance, craft professional resumes, and practice interviews with real Gemini AI.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/analyzer"
            className="btn-primary !px-8 !py-3.5 !text-base"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="#services"
            className="btn-secondary !px-8 !py-3.5 !text-base"
          >
            <span>Explore Features</span>
            <Layers className="w-4 h-4 opacity-80" />
          </a>
        </div>

        {/* Feature quick badges */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-8 text-xs sm:text-sm font-medium text-canvas-secondary dark:text-darkCanvas-muted">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-plum-dusty dark:text-lilac" />
            <span>Zero Work Experience Required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-plum-dusty dark:text-lilac" />
            <span>Export Clean PDF Resumes</span>
          </div>
        </div>
      </section>

      {/* 2. Four Core Services Showcase */}
      <section id="services" className="space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-orchid dark:text-lilac">
            Comprehensive Platform
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-canvas-primary dark:text-darkCanvas-primary">
            Four Core Pillars for Your Career Success
          </h2>
          <p className="text-sm sm:text-base text-canvas-secondary dark:text-darkCanvas-muted max-w-xl mx-auto">
            Everything you need from your very first college semester to securing competitive internships and engineering roles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group relative p-8 card-lavender hover:shadow-soft-lg hover:border-lavender dark:hover:border-orchid"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-blush dark:bg-orchid/20 text-plum-dusty dark:text-lilac flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-200">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-blush/60 dark:bg-plum-darker text-plum-dusty dark:text-lilac border border-canvas-border dark:border-plum-border">
                      {service.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-canvas-primary dark:text-darkCanvas-primary group-hover:text-plum-dusty dark:group-hover:text-lilac transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-canvas-secondary dark:text-darkCanvas-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. How It Works Section */}
      <section className="space-y-12 bg-blush/30 dark:bg-plum-card/50 p-8 sm:p-12 rounded-3xl border border-canvas-border dark:border-plum-border shadow-soft">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-orchid dark:text-lilac">
            Intuitive Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-canvas-primary dark:text-darkCanvas-primary">
            How RESUMIFY Works
          </h2>
          <p className="text-sm sm:text-base text-canvas-secondary dark:text-darkCanvas-muted max-w-xl mx-auto">
            From document upload to career acceleration in three straightforward steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {workflowSteps.map((step) => (
            <div 
              key={step.step}
              className="p-6 rounded-2xl bg-white dark:bg-plum-darker border border-canvas-border dark:border-plum-border shadow-soft space-y-4"
            >
              <div className="text-3xl font-black text-lavender dark:text-orchid">
                {step.step}
              </div>
              <h3 className="text-xl font-bold text-canvas-primary dark:text-darkCanvas-primary">
                {step.title}
              </h3>
              <p className="text-sm text-canvas-secondary dark:text-darkCanvas-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Platform Benefits */}
      <section className="space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-orchid dark:text-lilac">
            Platform Advantages
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-canvas-primary dark:text-darkCanvas-primary">
            Built for Academic and Career Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <div
                key={b.title}
                className="p-6 card-lavender space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blush dark:bg-orchid/20 flex items-center justify-center text-plum-dusty dark:text-lilac shadow-soft">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-canvas-primary dark:text-darkCanvas-primary">
                  {b.title}
                </h4>
                <p className="text-xs text-canvas-secondary dark:text-darkCanvas-muted leading-relaxed">
                  {b.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Call To Action Banner */}
      <section className="text-center p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-plum-dusty via-[#784F78] to-plum-dark text-white space-y-6 shadow-soft-lg relative overflow-hidden">
        <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Perfect Your Resume?
          </h2>
          <p className="text-sm sm:text-base text-blush leading-relaxed">
            Take the guesswork out of job applications. Upload your resume today and get genuine, actionable AI feedback designed for student success.
          </p>
          <div className="pt-3">
            <p className="text-base sm:text-xl font-bold tracking-wide text-white/95">
              Your Career Journey Starts Here. Make Every Opportunity Count.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
