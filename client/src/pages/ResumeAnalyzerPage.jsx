import React, { useState } from 'react';
import axios from 'axios';
import { 
  FileSearch, 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Sparkles, 
  ShieldAlert, 
  BarChart3, 
  FileCheck, 
  Layers, 
  Info,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Tag,
  Key,
  Database,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ResumeAnalyzerInfo from '../components/info/ResumeAnalyzerInfo';
import AuthModal from '../components/AuthModal';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function ResumeAnalyzerPage() {
  const { isAuthenticated, geminiStatus, user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('register');

  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [error, setError] = useState(null);
  const [missingConfig, setMissingConfig] = useState(null);

  if (!isAuthenticated) {
    return (
      <>
        <ResumeAnalyzerInfo
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

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setError(null);
      setMissingConfig(null);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setError(null);
    setMissingConfig(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);
    setMissingConfig(null);

    const formData = new FormData();
    formData.append('resume', selectedFile);

    try {
      const res = await axios.post(`${API_BASE}/analyzer/analyze`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data && res.data.success) {
        setAnalysisResult(res.data.analysis);
        try {
          const currentAnalyses = JSON.parse(localStorage.getItem('resumify_analyses') || '[]');
          const newEntry = {
            id: 'ana_' + Date.now(),
            fileName: selectedFile.name,
            overallScore: res.data.analysis.overallScore,
            atsAssessment: res.data.analysis.atsAssessment,
            createdAt: new Date().toISOString(),
            userEmail: user?.email ? user.email.toLowerCase() : 'guest@local'
          };
          localStorage.setItem('resumify_analyses', JSON.stringify([newEntry, ...currentAnalyses]));
        } catch (storageErr) {}
      } else {
        setError(res.data?.message || 'Failed to complete analysis.');
      }
    } catch (err) {
      console.error('Analyze error:', err);
      if (err.response?.status === 503) {
        setMissingConfig(err.response.data.message || 'Gemini API key is not configured.');
      } else {
        setError(err.response?.data?.message || err.message || 'An error occurred while analyzing the document.');
      }
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800';
    if (score >= 60) return 'text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800';
    return 'text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Page Header */}
      <div className="space-y-3">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-canvas-primary dark:text-darkCanvas-primary tracking-tight">
          Resume Analyzer
        </h1>
        <p className="text-sm sm:text-base text-canvas-secondary dark:text-darkCanvas-secondary max-w-3xl leading-relaxed">
          Upload your resume in PDF or DOCX format for an authentic evaluation powered by Google Gemini AI. Analyze ATS compatibility, keyword density, strengths, and actionable improvements.
        </p>
      </div>

      {/* Advisory Notice Banner */}
      <div className="p-4 rounded-2xl bg-blush/30 dark:bg-plum-card/60 border border-canvas-border dark:border-plum-border flex items-start gap-3 shadow-soft">
        <Info className="w-5 h-5 text-plum-dusty dark:text-lilac shrink-0 mt-0.5" />
        <div className="text-xs sm:text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
          <strong className="font-semibold text-canvas-primary dark:text-darkCanvas-primary">Advisory Assessment Note:</strong> The overall quality score and feedback provided by RESUMIFY are advisory recommendations to strengthen your resume and improve ATS readability. It does not guarantee employment or predict arbitrary rejection.
        </div>
      </div>

      {/* Upload & Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: File Upload Area (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-6">
            <h2 className="text-lg font-bold text-canvas-primary dark:text-darkCanvas-primary flex items-center gap-2">
              <Upload className="w-5 h-5 text-plum-dusty dark:text-lilac" />
              <span>Upload Document</span>
            </h2>

            {/* Dropzone Container */}
            <div className="border-2 border-dashed border-canvas-border dark:border-plum-border hover:border-plum-dusty dark:hover:border-orchid rounded-2xl p-8 text-center bg-blush/10 dark:bg-plum-darker/40 transition-colors">
              <input
                type="file"
                id="resume-upload-input"
                className="hidden"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
              />
              <label 
                htmlFor="resume-upload-input"
                className="cursor-pointer flex flex-col items-center justify-center space-y-3"
              >
                <div className="w-14 h-14 rounded-2xl bg-blush/60 dark:bg-plum-border/50 flex items-center justify-center text-plum-dusty dark:text-blush shadow-inner transition-transform hover:scale-105">
                  <Upload className="w-7 h-7" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-canvas-primary dark:text-darkCanvas-primary">
                    Click to browse or drag file here
                  </p>
                  <p className="text-xs text-canvas-secondary dark:text-darkCanvas-muted">
                    Supports PDF, DOCX up to 5MB
                  </p>
                </div>
              </label>
            </div>

            {/* Selected File Card */}
            {selectedFile ? (
              <div className="p-4 rounded-xl bg-blush/30 dark:bg-plum-darker/60 border border-canvas-border dark:border-plum-border flex items-center justify-between">
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileText className="w-6 h-6 text-plum-dusty dark:text-lilac shrink-0" />
                  <div className="overflow-hidden">
                    <p className="text-sm font-semibold text-canvas-primary dark:text-darkCanvas-primary truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-canvas-secondary dark:text-darkCanvas-muted">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveFile}
                  className="btn-secondary text-xs font-semibold px-3 py-1.5 rounded-lg"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="text-xs text-canvas-secondary/70 dark:text-darkCanvas-muted/70 text-center italic">
                No file currently selected.
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 text-rose-800 dark:text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Missing Configuration Card */}
            {missingConfig && (
              <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold">
                  <Key className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span>Gemini API Key Setup Needed</span>
                </div>
                <p className="leading-relaxed">
                  {missingConfig}
                </p>
                <div className="p-2.5 rounded-lg bg-white/70 dark:bg-plum-darker text-[11px] font-mono border border-amber-200 dark:border-amber-900">
                  server/.env &rarr; GEMINI_API_KEY=your_key_here
                </div>
                <p className="text-[11px] opacity-80">
                  You can get a free key instantly from Google AI Studio (aistudio.google.com).
                </p>
              </div>
            )}

            {/* Analysis Action Button */}
            <button
              type="button"
              disabled={!selectedFile || loading}
              onClick={handleAnalyze}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                selectedFile && !loading
                  ? 'btn-primary cursor-pointer hover:scale-[1.01] active:scale-[0.99]'
                  : 'bg-blush/40 dark:bg-plum-border/30 text-canvas-secondary/40 dark:text-darkCanvas-muted/40 cursor-not-allowed'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Parsing & Analyzing with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white" />
                  <span>Analyze with Gemini AI</span>
                </>
              )}
            </button>

            {/* Privacy note */}
            <p className="text-[11px] text-canvas-secondary/70 dark:text-darkCanvas-muted/70 text-center leading-relaxed">
              Your resume file is processed temporarily in memory to extract text and is deleted immediately from disk upon extraction.
            </p>
          </div>
        </div>

        {/* Right Column: Analysis Results or Empty State (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {analysisResult ? (
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-8 animate-fadeIn">
              
              {/* Header Score Overview */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-blush/20 dark:bg-plum-darker/60 border border-canvas-border dark:border-plum-border">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-plum-dusty dark:text-lilac">
                    Advisory Quality Score
                  </span>
                  <h3 className="text-3xl font-extrabold text-canvas-primary dark:text-darkCanvas-primary">
                    {analysisResult.overallScore} / 100
                  </h3>
                  <p className="text-xs text-canvas-secondary dark:text-darkCanvas-secondary max-w-xs">
                    Comprehensive score evaluating readability, structure, and technical depth.
                  </p>
                </div>

                {/* Score Gauge Badge */}
                <div className={`px-5 py-4 rounded-2xl border text-center font-bold ${getScoreColor(analysisResult.overallScore)}`}>
                  <span className="text-xs uppercase tracking-wider block opacity-80">ATS Readiness</span>
                  <span className="text-lg font-black">{analysisResult.atsAssessment?.level || 'Evaluated'}</span>
                  <span className="text-[10px] block opacity-80 mt-0.5">Score: {analysisResult.atsAssessment?.score || analysisResult.overallScore}%</span>
                </div>
              </div>

              {/* ATS Assessment Summary */}
              {analysisResult.atsAssessment?.summary && (
                <div className="p-4 rounded-xl bg-blush/30 dark:bg-plum-darker/60 border border-canvas-border dark:border-plum-border text-xs sm:text-sm text-canvas-primary dark:text-darkCanvas-primary leading-relaxed">
                  <strong className="font-semibold text-plum-dusty dark:text-lilac block mb-1">ATS Compatibility Summary:</strong>
                  {analysisResult.atsAssessment.summary}
                </div>
              )}

              {/* Identified Skills */}
              {analysisResult.identifiedSkills && analysisResult.identifiedSkills.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-plum-dusty dark:text-lilac flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Identified Skills ({analysisResult.identifiedSkills.length})</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.identifiedSkills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blush/60 dark:bg-plum-darker/80 text-plum-dusty dark:text-lilac border border-canvas-border dark:border-plum-border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Strengths & Weaknesses 2-Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Strengths */}
                <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Key Strengths</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-emerald-900 dark:text-emerald-200">
                    {analysisResult.strengths?.map((str, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="font-bold shrink-0">•</span>
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    <span>Areas Needing Attention</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-amber-900 dark:text-amber-200">
                    {analysisResult.weaknesses?.map((wk, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="font-bold shrink-0">•</span>
                        <span>{wk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>

              {/* Missing Skills / Keyword Recommendations */}
              {analysisResult.missingSkills && analysisResult.missingSkills.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-plum-dusty dark:text-lilac flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Recommended Skills to Add</span>
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {analysisResult.missingSkills.map((sk, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-900"
                      >
                        + {sk}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actionable Improvement Suggestions */}
              {analysisResult.improvementSuggestions && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-plum-dusty dark:text-lilac">
                    Actionable Improvement Suggestions
                  </h4>
                  <div className="space-y-2">
                    {analysisResult.improvementSuggestions.map((sug, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-blush/20 dark:bg-plum-darker/40 border border-canvas-border dark:border-plum-border text-xs text-canvas-primary dark:text-darkCanvas-primary flex items-start gap-2.5"
                      >
                        <span className="w-5 h-5 rounded-full bg-blush dark:bg-plum-border text-plum-dusty dark:text-blush flex items-center justify-center font-bold text-[10px] shrink-0">
                          {i + 1}
                        </span>
                        <p className="leading-relaxed">{sug}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Save status badge */}
              <div className="pt-4 border-t border-canvas-border dark:border-plum-border flex items-center justify-between text-xs text-canvas-secondary dark:text-darkCanvas-secondary">
                <span>Authentic Gemini AI Evaluation</span>
                {isAuthenticated ? (
                  <span className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Saved to your Dashboard</span>
                  </span>
                ) : (
                  <span className="text-canvas-secondary/70 dark:text-darkCanvas-muted/70">
                    Sign in to save records to your history
                  </span>
                )}
              </div>

            </div>
          ) : (
            /* Empty State */
            <div className="p-8 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft min-h-[460px] flex flex-col justify-center items-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blush/60 dark:bg-plum-border/50 flex items-center justify-center text-plum-dusty dark:text-lilac shadow-soft">
                <BarChart3 className="w-8 h-8 opacity-85" />
              </div>
              <div className="max-w-md space-y-2">
                <h3 className="text-xl font-bold text-canvas-primary dark:text-darkCanvas-primary">
                  No Resume Analyzed Yet
                </h3>
                <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary leading-relaxed">
                  Select your resume on the left to review your overall advisory quality score, ATS-readiness report, detected skill tags, strengths, weaknesses, and missing keyword suggestions.
                </p>
              </div>

              {/* Preview of Metrics that will appear */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-lg pt-4 text-left">
                <div className="p-3.5 rounded-xl bg-blush/20 dark:bg-plum-darker/40 border border-canvas-border dark:border-plum-border">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-canvas-secondary dark:text-darkCanvas-muted">Score Range</span>
                  <p className="text-sm font-bold text-canvas-primary dark:text-darkCanvas-primary">0 – 100 Advisory</p>
                </div>
                <div className="p-3.5 rounded-xl bg-blush/20 dark:bg-plum-darker/40 border border-canvas-border dark:border-plum-border">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-canvas-secondary dark:text-darkCanvas-muted">ATS Assessment</span>
                  <p className="text-sm font-bold text-canvas-primary dark:text-darkCanvas-primary">Format & Structure</p>
                </div>
                <div className="p-3.5 rounded-xl bg-blush/20 dark:bg-plum-darker/40 border border-canvas-border dark:border-plum-border col-span-2 sm:col-span-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-canvas-secondary dark:text-darkCanvas-muted">Skill Matrix</span>
                  <p className="text-sm font-bold text-canvas-primary dark:text-darkCanvas-primary">Identified & Missing</p>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
