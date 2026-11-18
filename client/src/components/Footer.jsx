import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="border-t border-canvas-border dark:border-plum-border bg-blush/25 dark:bg-plum-dark/50 text-canvas-primary dark:text-darkCanvas-primary transition-colors mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Simplified Main Footer Section: Branding + Features */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 pb-12 border-b border-canvas-border dark:border-plum-border">
          
          {/* Resumify Branding Section */}
          <div className="space-y-4 max-w-md">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-plum-dusty dark:bg-orchid text-white flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-4 h-4 text-blush" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-canvas-primary dark:text-darkCanvas-primary">
                RESUMIFY
              </span>
            </Link>
            <p className="text-sm text-canvas-secondary dark:text-darkCanvas-muted leading-relaxed">
              An elegant, AI-powered career suite engineered to help students, freshers, and professionals accelerate their career trajectory.
            </p>
          </div>

          {/* Features Navigation Links */}
          <div className="min-w-[180px]">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-plum-dusty dark:text-lilac mb-3.5">
              FEATURES
            </h3>
            <ul className="space-y-2 text-sm text-canvas-secondary dark:text-darkCanvas-muted">
              <li>
                <Link to="/" className="hover:text-plum-dusty dark:hover:text-white transition-colors">
                  Home / Overview
                </Link>
              </li>
              <li>
                <Link to="/analyzer" className="hover:text-plum-dusty dark:hover:text-white transition-colors">
                  Resume Analyzer
                </Link>
              </li>
              <li>
                <Link to="/career" className="hover:text-plum-dusty dark:hover:text-white transition-colors">
                  Career Guidance
                </Link>
              </li>
              <li>
                <Link to="/builder" className="hover:text-plum-dusty dark:hover:text-white transition-colors">
                  Create Resume
                </Link>
              </li>
              <li>
                <Link to="/interview" className="hover:text-plum-dusty dark:hover:text-white transition-colors">
                  Interview Preparation
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-plum-dusty dark:hover:text-white transition-colors">
                  My Dashboard
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Clean, Centered Bottom Section with Back to Top */}
        <div className="pt-10 flex flex-col items-center justify-center text-center space-y-6">
          
          {/* Back to Top Button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-plum-dusty dark:text-lilac bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft hover:bg-blush/60 dark:hover:bg-plum-border transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

          {/* Prominent Branding */}
          <div className="flex flex-col items-center space-y-1">
            <Link to="/" onClick={scrollToTop} className="inline-flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-plum-dusty dark:bg-orchid text-white flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-4 h-4 text-blush" />
              </div>
              <span className="font-black text-2xl tracking-wider text-canvas-primary dark:text-darkCanvas-primary">
                RESUMIFY
              </span>
            </Link>
            <p className="text-xs text-canvas-secondary dark:text-darkCanvas-muted">
              AI-Powered Resume Analyzer & Career Development Platform
            </p>
          </div>

          {/* Bottom Centered Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-semibold text-canvas-secondary dark:text-darkCanvas-muted">
            <Link to="/" onClick={scrollToTop} className="hover:text-plum-dusty dark:hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/analyzer" className="hover:text-plum-dusty dark:hover:text-white transition-colors">
              Resume Analyzer
            </Link>
            <Link to="/career" className="hover:text-plum-dusty dark:hover:text-white transition-colors">
              Career Guidance
            </Link>
            <Link to="/builder" className="hover:text-plum-dusty dark:hover:text-white transition-colors">
              Create Resume
            </Link>
            <Link to="/interview" className="hover:text-plum-dusty dark:hover:text-white transition-colors">
              Interview Preparation
            </Link>
          </nav>

          {/* Copyright Information */}
          <p className="text-sm sm:text-base font-bold text-black dark:text-white pt-2 text-center tracking-wide">
            © 2026 Tanisha Sharma • JECRC University
          </p>

        </div>

      </div>
    </footer>
  );
}
