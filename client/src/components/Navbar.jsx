import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  FileSearch, 
  Compass, 
  FileText, 
  MessageSquareCode, 
  LayoutDashboard, 
  Menu, 
  X,
  Sparkles,
  Sun,
  Moon,
  User,
  LogOut,
  LogIn
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const { theme, toggleTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Resume Analyzer', path: '/analyzer', icon: FileSearch },
    { name: 'Career Guidance', path: '/career', icon: Compass },
    { name: 'Create Resume', path: '/builder', icon: FileText },
    { name: 'Interview Prep', path: '/interview', icon: MessageSquareCode },
    { name: 'My Dashboard', path: '/dashboard', icon: LayoutDashboard },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
    closeMobileMenu();
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-plum-darker/95 backdrop-blur-md border-b border-canvas-border dark:border-plum-border transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 py-2">
            
            {/* Brand Logo */}
            <Link 
              to="/" 
              className="flex items-center gap-3 group"
              onClick={closeMobileMenu}
            >
              <div className="w-11 h-11 rounded-xl bg-plum-dusty dark:bg-orchid text-white flex items-center justify-center shadow-soft group-hover:scale-105 transition-transform duration-200">
                <Sparkles className="w-5 h-5 text-blush" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-canvas-primary dark:text-darkCanvas-primary">
                  RESUMIFY
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-orchid dark:text-lilac -mt-0.5">
                  AI Career Suite
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1.5">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    end={link.path === '/'}
                    className={({ isActive }) =>
                      `flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                        isActive
                          ? 'bg-plum-dusty text-white dark:bg-orchid dark:text-white shadow-soft'
                          : 'text-canvas-secondary dark:text-darkCanvas-muted hover:bg-blush/50 dark:hover:bg-plum-card hover:text-canvas-primary dark:hover:text-white'
                      }`
                    }
                  >
                    {Icon && <Icon className="w-4 h-4 opacity-85" />}
                    <span>{link.name}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Right Actions: Theme Toggle + Auth Status + CTA */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle Theme"
                className="p-2.5 rounded-xl border border-canvas-border dark:border-plum-border bg-blush/40 dark:bg-plum-card text-plum-dusty dark:text-lilac hover:bg-blush dark:hover:bg-orchid/20 transition-colors"
                title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
              >
                {theme === 'dark' ? (
                  <Sun className="w-4.5 h-4.5 text-lilac animate-spin-slow" />
                ) : (
                  <Moon className="w-4.5 h-4.5 text-plum-dusty" />
                )}
              </button>

              {/* Authentication Button or User Menu */}
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-blush/50 dark:bg-plum-card border border-canvas-border dark:border-plum-border text-sm font-bold text-plum-dusty dark:text-lilac hover:bg-blush"
                  >
                    <User className="w-4 h-4 text-orchid dark:text-lilac" />
                    <span className="max-w-[120px] truncate">{user?.name || 'Account'}</span>
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    title="Logout"
                    className="p-2 rounded-xl text-canvas-secondary dark:text-darkCanvas-muted hover:bg-blush/60 dark:hover:bg-plum-card transition-colors"
                  >
                    <LogOut className="w-4 h-4 opacity-70 hover:opacity-100" />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuth('login')}
                  className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-sm font-bold text-plum-dusty dark:text-lilac bg-blush/50 dark:bg-plum-card border border-canvas-border dark:border-plum-border hover:bg-blush transition-colors shadow-soft"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Mobile Actions: Theme + Hamburger */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-plum-dusty dark:text-lilac hover:bg-blush/50 dark:hover:bg-plum-card"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5 text-lilac" /> : <Moon className="w-5 h-5" />}
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2.5 rounded-xl text-canvas-primary dark:text-darkCanvas-primary hover:bg-blush/50 dark:hover:bg-plum-card focus:outline-none transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-canvas-border dark:border-plum-border bg-canvas-bg dark:bg-plum-darker px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={closeMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                      isActive
                        ? 'bg-plum-dusty text-white dark:bg-orchid dark:text-white'
                        : 'text-canvas-secondary dark:text-darkCanvas-muted hover:bg-blush/50 dark:hover:bg-plum-card'
                    }`
                  }
                >
                  {Icon && <Icon className="w-5 h-5 opacity-80" />}
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
            <div className="pt-2 border-t border-canvas-border dark:border-plum-border flex flex-col gap-2">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={() => { logout(); closeMobileMenu(); }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-plum-dusty dark:text-lilac bg-blush/60 dark:bg-plum-card"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out ({user?.name})</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => openAuth('login')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-plum-dusty dark:text-lilac bg-blush/60 dark:bg-plum-card"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Sign In / Create Account</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />
    </>
  );
}
