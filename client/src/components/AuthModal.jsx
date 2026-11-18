import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User, AlertCircle, Sparkles } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim();
    if (mode === 'register' && !name.trim()) {
      return setError('Please enter your full name.');
    }
    if (!cleanEmail || !password.trim()) {
      return setError('Please enter both email and password.');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }

    setLoading(true);
    try {
      let res;
      if (mode === 'register') {
        res = await register(name, cleanEmail, password);
      } else {
        res = await login(cleanEmail, password);
      }

      if (res.success) {
        onClose();
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setError(res.message || 'Authentication failed. Please verify your details.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-2xl overflow-hidden text-canvas-primary dark:text-darkCanvas-primary">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-canvas-border dark:border-plum-border bg-blush/25 dark:bg-plum-darker/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-plum-dusty dark:bg-orchid text-white flex items-center justify-center shadow-soft">
              <Sparkles className="w-4 h-4 text-blush" />
            </div>
            <div>
              <h2 className="font-extrabold text-lg text-canvas-primary dark:text-darkCanvas-primary">
                {mode === 'login' ? 'Sign In to RESUMIFY' : 'Create Free Account'}
              </h2>
              <p className="text-xs text-canvas-secondary dark:text-darkCanvas-muted">
                {mode === 'login' ? 'Access your saved resumes & reports' : 'Get started in seconds with LocalStorage'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-blush/50 dark:hover:bg-orchid/20 text-canvas-secondary dark:text-darkCanvas-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 text-xs font-semibold flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {mode === 'register' && (
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase tracking-wider text-canvas-primary dark:text-darkCanvas-primary flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-plum-dusty dark:text-lilac" />
                <span>Full Name</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Morgan"
                className="input-lavender"
              />
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-canvas-primary dark:text-darkCanvas-primary flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-plum-dusty dark:text-lilac" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. student@college.edu"
              className="input-lavender"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase tracking-wider text-canvas-primary dark:text-darkCanvas-primary flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-plum-dusty dark:text-lilac" />
              <span>Password</span>
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="input-lavender"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full !py-3 !mt-2"
          >
            {loading ? (
              <span>Processing...</span>
            ) : (
              <span>{mode === 'login' ? 'Sign In' : 'Create Free Account'}</span>
            )}
          </button>
        </form>

        {/* Footer Switcher */}
        <div className="p-4 border-t border-canvas-border dark:border-plum-border bg-blush/20 dark:bg-plum-darker/40 text-center text-xs text-canvas-secondary dark:text-darkCanvas-muted">
          {mode === 'login' ? (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => { setMode('register'); setError(''); }}
                className="font-bold text-plum-dusty dark:text-lilac hover:underline"
              >
                Sign up free
              </button>
            </span>
          ) : (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => { setMode('login'); setError(''); }}
                className="font-bold text-plum-dusty dark:text-lilac hover:underline"
              >
                Sign in
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
}
