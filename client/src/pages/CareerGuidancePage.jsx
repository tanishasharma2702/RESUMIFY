import React, { useState } from 'react';
import axios from 'axios';
import { 
  Compass, 
  GraduationCap, 
  Code2, 
  HeartHandshake, 
  Target, 
  Briefcase, 
  Sparkles, 
  ArrowRight, 
  Lightbulb,
  CheckCircle2,
  TrendingUp,
  MapPin,
  AlertCircle,
  Key,
  Layers,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import CareerGuidanceInfo from '../components/info/CareerGuidanceInfo';
import AuthModal from '../components/AuthModal';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function CareerGuidancePage() {
  const { isAuthenticated, user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('register');

  const [formData, setFormData] = useState({
    education: '',
    currentSkills: '',
    interests: '',
    careerGoals: '',
    preferredRoles: ''
  });

  const [loading, setLoading] = useState(false);
  const [careerResult, setCareerResult] = useState(null);
  const [error, setError] = useState(null);
  const [missingConfig, setMissingConfig] = useState(null);

  if (!isAuthenticated) {
    return (
      <>
        <CareerGuidanceInfo
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(null);
    setMissingConfig(null);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    if (!formData.education.trim() || !formData.currentSkills.trim()) {
      return setError('Please provide both your educational background and current skills.');
    }

    setLoading(true);
    setError(null);
    setMissingConfig(null);

    try {
      const res = await axios.post(`${API_BASE}/career/recommend`, {
        education: formData.education,
        currentSkills: formData.currentSkills.split(',').map(s => s.trim()).filter(Boolean),
        interests: formData.interests,
        careerGoals: formData.careerGoals,
        preferredRoles: formData.preferredRoles,
      });

      if (res.data && res.data.success) {
        setCareerResult(res.data.careerGuidance);
        try {
          const currentPlans = JSON.parse(localStorage.getItem('resumify_career_plans') || '[]');
          const newPlan = {
            id: 'car_' + Date.now(),
            education: formData.education,
            recommendedPaths: res.data.careerGuidance.recommendedPaths || [],
            createdAt: new Date().toISOString(),
            userEmail: user?.email ? user.email.toLowerCase() : 'guest@local'
          };
          localStorage.setItem('resumify_career_plans', JSON.stringify([newPlan, ...currentPlans]));
        } catch (storageErr) {}
      } else {
        setError(res.data?.message || 'Failed to generate recommendations.');
      }
    } catch (err) {
      console.error('Career error:', err);
      if (err.response?.status === 503) {
        setMissingConfig(err.response.data.message || 'Gemini API key is not configured.');
      } else {
        setError(err.response?.data?.message || err.message || 'Server error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-canvas-primary dark:text-darkCanvas-primary tracking-tight">
          Career Guidance
        </h1>
        <p className="text-sm sm:text-base text-canvas-secondary dark:text-darkCanvas-secondary max-w-3xl leading-relaxed">
          Provide your academic background, current technical skill set, and personal aspirations. Our AI maps out your optimal career paths, identifies skill gaps, and formulates step-by-step learning milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Form Questionnaire (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <form onSubmit={handleGenerate} className="p-6 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-5">
            <h2 className="text-lg font-bold text-canvas-primary dark:text-darkCanvas-primary flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-plum-dusty dark:text-lilac" />
              <span>Your Profile & Goals</span>
            </h2>

            {/* 1. Education */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-canvas-secondary dark:text-darkCanvas-secondary flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-plum-dusty dark:text-lilac" />
                <span>Educational Background *</span>
              </label>
              <input
                type="text"
                name="education"
                required
                value={formData.education}
                onChange={handleChange}
                placeholder="e.g. 1st Year B.Tech Computer Science & Engg"
                className="w-full px-3.5 py-2.5 rounded-xl border border-canvas-border dark:border-plum-border bg-blush/10 dark:bg-plum-darker/50 text-canvas-primary dark:text-darkCanvas-primary text-sm focus:outline-none focus:ring-2 focus:ring-lavender/40 focus:border-plum-dusty transition-colors"
              />
            </div>

            {/* 2. Current Skills */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-canvas-secondary dark:text-darkCanvas-secondary flex items-center gap-1.5">
                <Code2 className="w-4 h-4 text-plum-dusty dark:text-lilac" />
                <span>Current Skills (comma separated) *</span>
              </label>
              <textarea
                name="currentSkills"
                required
                rows={2}
                value={formData.currentSkills}
                onChange={handleChange}
                placeholder="e.g. C++, Python basics, HTML/CSS, Git"
                className="w-full px-3.5 py-2 rounded-xl border border-canvas-border dark:border-plum-border bg-blush/10 dark:bg-plum-darker/50 text-canvas-primary dark:text-darkCanvas-primary text-sm focus:outline-none focus:ring-2 focus:ring-lavender/40 focus:border-plum-dusty transition-colors resize-none"
              />
            </div>

            {/* 3. Areas of Interest */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-canvas-secondary dark:text-darkCanvas-secondary flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-plum-dusty dark:text-lilac" />
                <span>Areas of Interest</span>
              </label>
              <input
                type="text"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="e.g. Web Development, Artificial Intelligence, Cloud"
                className="w-full px-3.5 py-2.5 rounded-xl border border-canvas-border dark:border-plum-border bg-blush/10 dark:bg-plum-darker/50 text-canvas-primary dark:text-darkCanvas-primary text-sm focus:outline-none focus:ring-2 focus:ring-lavender/40 focus:border-plum-dusty transition-colors"
              />
            </div>

            {/* 4. Career Goals */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-canvas-secondary dark:text-darkCanvas-secondary flex items-center gap-1.5">
                <Target className="w-4 h-4 text-plum-dusty dark:text-lilac" />
                <span>Career Goals</span>
              </label>
              <textarea
                name="careerGoals"
                rows={2}
                value={formData.careerGoals}
                onChange={handleChange}
                placeholder="e.g. Secure a summer software engineering internship"
                className="w-full px-3.5 py-2 rounded-xl border border-canvas-border dark:border-plum-border bg-blush/10 dark:bg-plum-darker/50 text-canvas-primary dark:text-darkCanvas-primary text-sm focus:outline-none focus:ring-2 focus:ring-lavender/40 focus:border-plum-dusty transition-colors resize-none"
              />
            </div>

            {/* 5. Preferred Job Roles */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-canvas-secondary dark:text-darkCanvas-secondary flex items-center gap-1.5">
                <Briefcase className="w-4 h-4 text-plum-dusty dark:text-lilac" />
                <span>Preferred Job Roles</span>
              </label>
              <input
                type="text"
                name="preferredRoles"
                value={formData.preferredRoles}
                onChange={handleChange}
                placeholder="e.g. Full-Stack Developer, AI Engineer, DevOps"
                className="w-full px-3.5 py-2.5 rounded-xl border border-canvas-border dark:border-plum-border bg-blush/10 dark:bg-plum-darker/50 text-canvas-primary dark:text-darkCanvas-primary text-sm focus:outline-none focus:ring-2 focus:ring-lavender/40 focus:border-plum-dusty transition-colors"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Missing Config Alert */}
            {missingConfig && (
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <Key className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Gemini API Key Required</span>
                </div>
                <p className="leading-relaxed">
                  {missingConfig}
                </p>
                <div className="p-2.5 rounded-lg bg-white/70 dark:bg-plum-darker text-[11px] font-mono border border-amber-200 dark:border-amber-900">
                  server/.env &rarr; GEMINI_API_KEY=your_key_here
                </div>
              </div>
            )}

            {/* Submit Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-3.5 px-4 rounded-xl font-bold text-sm shadow-soft flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Mapping Career Paths with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Generate AI Career Recommendations</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Roadmap & Recommendations Workspace (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {careerResult && careerResult.recommendedPaths ? (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Summary Banner */}
              {careerResult.summary && (
                <div className="p-5 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft text-xs sm:text-sm text-canvas-primary dark:text-darkCanvas-primary leading-relaxed">
                  <strong className="font-bold text-plum-dusty dark:text-lilac block mb-1">Career Assessment Overview:</strong>
                  {careerResult.summary}
                </div>
              )}

              {/* Path Cards */}
              {careerResult.recommendedPaths.map((path, idx) => (
                <div
                  key={idx}
                  className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-6"
                >
                  {/* Role Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-canvas-border dark:border-plum-border pb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-canvas-primary dark:text-darkCanvas-primary">
                        {path.roleTitle}
                      </h3>
                      <p className="text-xs text-canvas-secondary dark:text-darkCanvas-secondary mt-0.5">
                        {path.description}
                      </p>
                    </div>

                    <div className="px-4 py-2 rounded-xl bg-blush/60 dark:bg-plum-border/40 border border-canvas-border dark:border-plum-border text-center shrink-0">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-plum-dusty dark:text-lilac block">Match Fit</span>
                      <span className="text-lg font-black text-canvas-primary dark:text-darkCanvas-primary">{path.matchPercentage}%</span>
                    </div>
                  </div>

                  {/* Skills Grid: Existing vs Missing Gaps */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 space-y-1.5">
                      <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Matching Existing Skills</span>
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {path.existingSkillsMatched?.map((s, i) => (
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
                        {path.skillGaps?.map((s, i) => (
                          <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-white dark:bg-amber-900/50 text-amber-900 dark:text-amber-200 font-medium border border-amber-200 dark:border-amber-800">
                            + {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Step-by-Step Learning Roadmap */}
                  {path.roadmap && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-plum-dusty dark:text-lilac flex items-center gap-1.5">
                        <BookOpen className="w-4 h-4" />
                        <span>Structured Learning Roadmap</span>
                      </h4>
                      <div className="space-y-2.5">
                        {path.roadmap.map((phase, pIdx) => (
                          <div
                            key={pIdx}
                            className="p-3.5 rounded-xl bg-blush/20 dark:bg-plum-darker/50 border border-canvas-border dark:border-plum-border space-y-1.5"
                          >
                            <span className="text-xs font-bold text-plum-dusty dark:text-lilac">
                              {phase.phase}
                            </span>
                            <ul className="list-disc list-inside text-xs text-canvas-secondary dark:text-darkCanvas-secondary space-y-0.5">
                              {phase.topics?.map((top, tIdx) => (
                                <li key={tIdx}>{top}</li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Next Steps */}
                  {path.nextSteps && (
                    <div className="space-y-2 pt-2 border-t border-canvas-border dark:border-plum-border">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-plum-dusty dark:text-lilac">
                        Immediate Actionable Next Steps
                      </h4>
                      <ul className="space-y-1 text-xs text-canvas-secondary dark:text-darkCanvas-secondary">
                        {path.nextSteps.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-1.5">
                            <span className="font-bold text-plum-dusty dark:text-lilac">→</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="p-8 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft min-h-[520px] flex flex-col justify-center items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blush/60 dark:bg-plum-border/50 flex items-center justify-center text-plum-dusty dark:text-lilac shadow-soft">
                <Compass className="w-8 h-8 opacity-85" />
              </div>
              <div className="max-w-md space-y-2">
                <h3 className="text-xl font-bold text-canvas-primary dark:text-darkCanvas-primary">
                  Your Career Roadmap Awaits
                </h3>
                <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
                  Fill in your background details on the left to receive custom-tailored career paths, required skill sets, and a structured learning roadmap.
                </p>
              </div>

              {/* Feature preview cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg pt-4 text-left">
                <div className="p-3.5 rounded-xl bg-blush/20 dark:bg-plum-darker/40 border border-canvas-border dark:border-plum-border">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-canvas-secondary dark:text-darkCanvas-muted">Target Roles</span>
                  <p className="text-sm font-bold text-canvas-primary dark:text-darkCanvas-primary">Role Matching</p>
                </div>
                <div className="p-3.5 rounded-xl bg-blush/20 dark:bg-plum-darker/40 border border-canvas-border dark:border-plum-border">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-canvas-secondary dark:text-darkCanvas-muted">Skill Gaps</span>
                  <p className="text-sm font-bold text-canvas-primary dark:text-darkCanvas-primary">What To Learn</p>
                </div>
                <div className="p-3.5 rounded-xl bg-blush/20 dark:bg-plum-darker/40 border border-canvas-border dark:border-plum-border">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-canvas-secondary dark:text-darkCanvas-muted">Phases</span>
                  <p className="text-sm font-bold text-canvas-primary dark:text-darkCanvas-primary">Milestones</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
