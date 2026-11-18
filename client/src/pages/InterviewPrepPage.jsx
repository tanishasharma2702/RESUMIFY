import React, { useState } from 'react';
import axios from 'axios';
import { 
  MessageSquareCode, 
  Send, 
  Sparkles, 
  HelpCircle, 
  Award, 
  BookOpen, 
  Briefcase, 
  Sliders, 
  CheckCircle, 
  Lightbulb,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Key,
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import InterviewPrepInfo from '../components/info/InterviewPrepInfo';
import AuthModal from '../components/AuthModal';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function InterviewPrepPage() {
  const { isAuthenticated, user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('register');

  const [role, setRole] = useState('Frontend Developer');
  const [category, setCategory] = useState('Technical');
  const [difficulty, setDifficulty] = useState('Junior');
  const [topics, setTopics] = useState('React, JavaScript, CSS, REST APIs');

  const [questions, setQuestions] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [loadingEvaluation, setLoadingEvaluation] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [error, setError] = useState('');
  const [missingConfig, setMissingConfig] = useState(null);

  if (!isAuthenticated) {
    return (
      <>
        <InterviewPrepInfo
          onOpenAuth={(mode = 'register') => {
            setAuthMode(mode);
            setAuthModalOpen(true);
          }}
        />
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          initialMode={authMode}
        />
      </>
    );
  }

  const handleGenerateQuestions = async () => {
    if (!role.trim()) return setError('Please enter a target job role.');

    setLoadingQuestions(true);
    setError('');
    setMissingConfig(null);
    setEvaluation(null);

    try {
      const res = await axios.post(`${API_BASE}/interview/generate`, {
        role,
        category,
        difficulty,
        topics,
      });

      if (res.data && res.data.success && res.data.questions?.length > 0) {
        setQuestions(res.data.questions);
        setCurrentQIndex(0);
        setUserAnswer('');
      } else {
        setError('No questions returned. Please retry.');
      }
    } catch (err) {
      if (err.response?.status === 503) {
        setMissingConfig(err.response.data.message || 'Gemini API key is not configured.');
      } else {
        setError(err.response?.data?.message || err.message || 'Failed to generate questions.');
      }
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleSubmitAnswer = async () => {
    const activeQuestion = questions[currentQIndex]?.questionText;
    if (!activeQuestion) return setError('No question selected.');
    if (!userAnswer || userAnswer.trim().length < 10) {
      return setError('Please type an answer of at least 10 characters.');
    }

    setLoadingEvaluation(true);
    setError('');
    setMissingConfig(null);

    try {
      const res = await axios.post(`${API_BASE}/interview/evaluate`, {
        role,
        questionText: activeQuestion,
        userAnswer,
        category,
        difficulty,
      });

      if (res.data && res.data.success) {
        setEvaluation(res.data.evaluation);
        try {
          const currentInterviews = JSON.parse(localStorage.getItem('resumify_interviews') || '[]');
          const newInterview = {
            id: 'int_' + Date.now(),
            role,
            category,
            difficulty,
            questionText: activeQuestion,
            userAnswer,
            evaluation: res.data.evaluation,
            createdAt: new Date().toISOString(),
            userEmail: user?.email ? user.email.toLowerCase() : 'guest@local'
          };
          localStorage.setItem('resumify_interviews', JSON.stringify([newInterview, ...currentInterviews]));
        } catch (storageErr) {}
      } else {
        setError(res.data?.message || 'Failed to evaluate answer.');
      }
    } catch (err) {
      if (err.response?.status === 503) {
        setMissingConfig(err.response.data.message || 'Gemini API key is not configured.');
      } else {
        setError(err.response?.data?.message || err.message || 'Failed to evaluate answer.');
      }
    } finally {
      setLoadingEvaluation(false);
    }
  };

  const activeQuestion = questions.length > 0 ? questions[currentQIndex] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-canvas-primary dark:text-darkCanvas-primary tracking-tight">
          Interview Preparation
        </h1>
        <p className="text-sm sm:text-base text-canvas-secondary dark:text-darkCanvas-secondary max-w-3xl leading-relaxed">
          Select your target role and difficulty level to generate genuine, role-specific technical and behavioral questions. Practice typing your answers and receive AI critiques with actionable improvements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interview Configuration Wizard (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-5">
            <h2 className="text-lg font-bold text-canvas-primary dark:text-darkCanvas-primary flex items-center gap-2">
              <Sliders className="w-5 h-5 text-plum-dusty dark:text-lilac" />
              <span>Interview Setup</span>
            </h2>

            {/* Target Job Role */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-canvas-secondary dark:text-darkCanvas-secondary flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-plum-dusty dark:text-lilac" />
                <span>Target Job Role</span>
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="e.g. Frontend Developer, Junior SDE"
                className="w-full px-3.5 py-2.5 rounded-xl border border-canvas-border dark:border-plum-border bg-blush/10 dark:bg-plum-darker/50 text-canvas-primary dark:text-darkCanvas-primary text-sm focus:outline-none focus:ring-2 focus:ring-lavender/40 focus:border-plum-dusty transition-colors"
              />
            </div>

            {/* Category: Technical vs HR */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-canvas-secondary dark:text-darkCanvas-secondary">
                Question Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Technical', 'HR'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      category === cat
                        ? 'bg-plum-dusty text-white dark:bg-orchid dark:text-white border-plum-dusty dark:border-orchid shadow-soft'
                        : 'bg-blush/20 dark:bg-plum-darker/40 text-canvas-secondary dark:text-darkCanvas-secondary border-canvas-border dark:border-plum-border hover:bg-blush/40'
                    }`}
                  >
                    {cat} Interview
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Level */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-canvas-secondary dark:text-darkCanvas-secondary">
                Experience Level
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Junior', 'Mid', 'Senior'].map((diff) => (
                  <button
                    key={diff}
                    type="button"
                    onClick={() => setDifficulty(diff)}
                    className={`py-2 px-2 rounded-xl text-xs font-bold border transition-all ${
                      difficulty === diff
                        ? 'bg-plum-dusty text-white dark:bg-orchid dark:text-white border-plum-dusty dark:border-orchid shadow-soft'
                        : 'bg-blush/20 dark:bg-plum-darker/40 text-canvas-secondary dark:text-darkCanvas-secondary border-canvas-border dark:border-plum-border hover:bg-blush/40'
                    }`}
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>

            {/* Relevant Skills or Topics */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-canvas-secondary dark:text-darkCanvas-secondary flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-plum-dusty dark:text-lilac" />
                <span>Focus Topics / Skills</span>
              </label>
              <textarea
                rows={2}
                value={topics}
                onChange={(e) => setTopics(e.target.value)}
                placeholder="e.g. React hooks, Virtual DOM, CSS grid"
                className="w-full px-3.5 py-2 rounded-xl border border-canvas-border dark:border-plum-border bg-blush/10 dark:bg-plum-darker/50 text-canvas-primary dark:text-darkCanvas-primary text-sm focus:outline-none focus:ring-2 focus:ring-lavender/40 focus:border-plum-dusty transition-colors resize-none"
              />
            </div>

            {/* Missing Config Alert */}
            {missingConfig && (
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs space-y-2">
                <div className="flex items-center gap-1.5 font-bold">
                  <Key className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Gemini API Setup Required</span>
                </div>
                <p className="leading-relaxed">{missingConfig}</p>
                <div className="p-2 rounded-lg bg-white/70 dark:bg-plum-darker font-mono text-[10px] border border-amber-200 dark:border-amber-900">
                  server/.env &rarr; GEMINI_API_KEY=...
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-900 text-rose-800 dark:text-rose-200 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Generate Questions Button */}
            <button
              type="button"
              disabled={loadingQuestions}
              onClick={handleGenerateQuestions}
              className="btn-primary w-full py-3.5 px-4 rounded-xl font-bold text-sm shadow-soft flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {loadingQuestions ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generating Questions with AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Generate Questions with AI</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column: Question & Answer Workspace (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-6">
            
            {questions.length > 0 ? (
              <>
                {/* Stepper Tabs */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-canvas-border dark:border-plum-border pb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-plum-dusty dark:text-lilac">
                    Questions ({currentQIndex + 1} of {questions.length})
                  </span>
                  <div className="flex items-center gap-1.5">
                    {questions.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setCurrentQIndex(idx);
                          setUserAnswer('');
                          setEvaluation(null);
                        }}
                        className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                          currentQIndex === idx
                            ? 'bg-plum-dusty text-white dark:bg-orchid dark:text-white shadow-soft'
                            : 'bg-blush/40 dark:bg-plum-darker/60 text-canvas-secondary dark:text-darkCanvas-secondary hover:bg-blush/70 border border-canvas-border dark:border-plum-border'
                        }`}
                      >
                        {idx + 1}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Question Display */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-canvas-secondary dark:text-darkCanvas-secondary">
                    <span className="px-2.5 py-0.5 rounded-lg bg-blush/60 dark:bg-plum-border/40 text-plum-dusty dark:text-lilac font-bold border border-canvas-border dark:border-plum-border">
                      {activeQuestion.topic || category}
                    </span>
                    <span>Role: {role}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-canvas-primary dark:text-darkCanvas-primary leading-snug">
                    "{activeQuestion.questionText}"
                  </h3>

                  {/* Guidance Tip Box */}
                  {activeQuestion.guidance && (
                    <div className="p-4 rounded-xl bg-blush/30 dark:bg-plum-darker/50 border border-canvas-border dark:border-plum-border flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-plum-dusty dark:text-lilac shrink-0 mt-0.5" />
                      <div className="text-xs text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed space-y-1">
                        <p className="font-bold text-canvas-primary dark:text-darkCanvas-primary">Interviewer Guidance Tip:</p>
                        <p>{activeQuestion.guidance}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* User Answer Textarea */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-canvas-secondary dark:text-darkCanvas-secondary">
                      Your Answer
                    </label>
                    <span className="text-xs text-canvas-secondary/70 dark:text-darkCanvas-muted/70">
                      {userAnswer.length} characters
                    </span>
                  </div>
                  <textarea
                    rows={6}
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                    placeholder="Type your explanation here. Be clear and structure your response with technical examples..."
                    className="w-full p-4 rounded-xl border border-canvas-border dark:border-plum-border bg-blush/10 dark:bg-plum-darker/50 text-sm text-canvas-primary dark:text-darkCanvas-primary focus:outline-none focus:ring-2 focus:ring-lavender/40 focus:border-plum-dusty transition-colors"
                  />
                </div>

                {/* Submit Action */}
                <div className="flex items-center justify-between gap-4 pt-2">
                  <p className="text-xs text-canvas-secondary/70 dark:text-darkCanvas-muted/70 italic">
                    Gemini AI will score your accuracy, strengths, and identify missing concepts.
                  </p>
                  <button
                    type="button"
                    disabled={loadingEvaluation}
                    onClick={handleSubmitAnswer}
                    className="btn-primary px-6 py-2.5 rounded-xl font-bold text-sm shadow-soft flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
                  >
                    {loadingEvaluation ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Evaluating...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Answer for Critique</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Evaluation Results Card */}
                {evaluation && (
                  <div className="mt-6 p-6 rounded-2xl bg-blush/20 dark:bg-plum-darker/60 border border-canvas-border dark:border-plum-border space-y-6 animate-fadeIn">
                    <div className="flex items-center justify-between border-b border-canvas-border dark:border-plum-border pb-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-plum-dusty dark:text-lilac block">
                          AI Answer Evaluation
                        </span>
                        <h4 className="text-2xl font-black text-canvas-primary dark:text-darkCanvas-primary">
                          Score: {evaluation.score} / 100
                        </h4>
                      </div>
                      <span className="px-3.5 py-1.5 rounded-xl bg-blush/60 dark:bg-plum-border/50 border border-canvas-border dark:border-plum-border text-xs font-bold text-plum-dusty dark:text-lilac">
                        {evaluation.verdict}
                      </span>
                    </div>

                    {/* Strengths & Weaknesses Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 space-y-1.5">
                        <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>What You Did Well</span>
                        </span>
                        <ul className="text-xs text-emerald-900 dark:text-emerald-200 space-y-1">
                          {evaluation.strengths?.map((s, i) => (
                            <li key={i}>• {s}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 space-y-1.5">
                        <span className="text-xs font-bold text-amber-800 dark:text-amber-300 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Areas to Refine</span>
                        </span>
                        <ul className="text-xs text-amber-900 dark:text-amber-200 space-y-1">
                          {evaluation.weaknesses?.map((w, i) => (
                            <li key={i}>• {w}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Missing Technical Concepts */}
                    {evaluation.missingConcepts?.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-xs font-bold text-plum-dusty dark:text-lilac">
                          Missing Technical Concepts:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {evaluation.missingConcepts.map((c, i) => (
                            <span key={i} className="text-xs px-2.5 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900 font-medium">
                              + {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Model Answer */}
                    {evaluation.modelAnswer && (
                      <div className="p-4 rounded-xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-plum-dusty dark:text-lilac flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-plum-dusty dark:text-lilac" />
                          <span>Ideal Model Answer</span>
                        </span>
                        <p className="text-xs text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed italic">
                          "{evaluation.modelAnswer}"
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </>
            ) : (
              /* Initial Workspace Empty State */
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-blush/60 dark:bg-plum-border/50 mx-auto flex items-center justify-center text-plum-dusty dark:text-lilac shadow-soft">
                  <MessageSquareCode className="w-8 h-8 opacity-85" />
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <h3 className="text-xl font-bold text-canvas-primary dark:text-darkCanvas-primary">
                    Ready to Practice Real Interview Questions
                  </h3>
                  <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
                    Configure your target job role and experience level on the left, then click <strong>"Generate Questions with AI"</strong> to start your tailored practice session.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
