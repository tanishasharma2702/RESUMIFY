import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { 
  LayoutDashboard, 
  User, 
  FileSearch, 
  FileText, 
  Compass, 
  MessageSquareCode, 
  Clock, 
  Plus, 
  LogIn, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';
import DashboardInfo from '../components/info/DashboardInfo';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState({
    analyses: [],
    resumes: [],
    careerRecommendations: [],
    interviewSessions: []
  });
  const [loading, setLoading] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('register');

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      loadUserData();
    } else {
      setDashboardData({
        analyses: [],
        resumes: [],
        careerRecommendations: [],
        interviewSessions: []
      });
    }
  }, [isAuthenticated, user?.email]);

  if (!isAuthenticated) {
    return (
      <>
        <DashboardInfo
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

  const loadUserData = async () => {
    setLoading(true);
    const userEmail = user.email.toLowerCase();

    // 1. Load from LocalStorage
    try {
      const allAnalyses = JSON.parse(localStorage.getItem('resumify_analyses') || '[]');
      const allResumes = JSON.parse(localStorage.getItem('resumify_saved_resumes') || '[]');
      const allCareer = JSON.parse(localStorage.getItem('resumify_career_plans') || '[]');
      const allInterviews = JSON.parse(localStorage.getItem('resumify_interviews') || '[]');

      const userAnalyses = allAnalyses.filter(item => item.userEmail === userEmail);
      const userResumes = allResumes.filter(item => item.userEmail === userEmail);
      const userCareer = allCareer.filter(item => item.userEmail === userEmail);
      const userInterviews = allInterviews.filter(item => item.userEmail === userEmail);

      setDashboardData({
        analyses: userAnalyses,
        resumes: userResumes,
        careerRecommendations: userCareer,
        interviewSessions: userInterviews
      });
    } catch (e) {
      console.warn('LocalStorage dashboard read error:', e);
    }

    // 2. Also probe backend dashboard if available
    try {
      const res = await axios.get(`${API_BASE}/dashboard`);
      if (res.data && res.data.success) {
        setDashboardData(prev => ({
          analyses: res.data.analyses?.length ? res.data.analyses : prev.analyses,
          resumes: res.data.resumes?.length ? res.data.resumes : prev.resumes,
          careerRecommendations: res.data.careerRecommendations?.length ? res.data.careerRecommendations : prev.careerRecommendations,
          interviewSessions: res.data.interviewSessions?.length ? res.data.interviewSessions : prev.interviewSessions,
        }));
      }
    } catch (err) {
      // Backend probe fallback
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'analyses', label: `Resume Analyses (${dashboardData.analyses.length})`, icon: FileSearch },
    { id: 'resumes', label: `Saved Resumes (${dashboardData.resumes.length})`, icon: FileText },
    { id: 'career', label: `Career Roadmaps (${dashboardData.careerRecommendations.length})`, icon: Compass },
    { id: 'interviews', label: `Interview Practice (${dashboardData.interviewSessions.length})`, icon: MessageSquareCode },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-canvas-border dark:border-plum-border pb-6">
        <div className="space-y-1">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-canvas-primary dark:text-darkCanvas-primary tracking-tight">
            My Dashboard
          </h1>
          <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary">
            View and manage your genuine resume analyses, saved templates, career roadmaps, and interview transcripts.
          </p>
        </div>

        {/* User Profile Badge */}
        {isAuthenticated ? (
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft">
            <div className="w-10 h-10 rounded-xl bg-plum-dusty dark:bg-orchid text-white flex items-center justify-center font-bold text-sm shadow-soft">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="text-xs">
              <p className="font-bold text-canvas-primary dark:text-darkCanvas-primary">{user?.name}</p>
              <p className="text-canvas-secondary dark:text-darkCanvas-secondary">{user?.email}</p>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setAuthModalOpen(true)}
            className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-soft transition-transform hover:scale-105"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In to Sync History</span>
          </button>
        )}
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-canvas-border dark:border-plum-border pb-3">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-plum-dusty text-white dark:bg-orchid dark:text-white shadow-soft'
                  : 'bg-white dark:bg-plum-card text-canvas-secondary dark:text-darkCanvas-secondary border border-canvas-border dark:border-plum-border hover:bg-blush/30'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="space-y-6">

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            
            {/* Quick Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { 
                  title: 'Resumes Analyzed', 
                  count: dashboardData.analyses.length, 
                  desc: dashboardData.analyses.length ? 'Saved in your records' : 'No uploads yet', 
                  icon: FileSearch, 
                  link: '/analyzer' 
                },
                { 
                  title: 'Saved Resumes', 
                  count: dashboardData.resumes.length, 
                  desc: dashboardData.resumes.length ? 'Saved in your records' : 'No draft resumes saved', 
                  icon: FileText, 
                  link: '/builder' 
                },
                { 
                  title: 'Career Roadmaps', 
                  count: dashboardData.careerRecommendations.length, 
                  desc: dashboardData.careerRecommendations.length ? 'Saved in your records' : 'No guidance reports yet', 
                  icon: Compass, 
                  link: '/career' 
                },
                { 
                  title: 'Interview Sessions', 
                  count: dashboardData.interviewSessions.length, 
                  desc: dashboardData.interviewSessions.length ? 'Saved in your records' : 'No mock sessions logged', 
                  icon: MessageSquareCode, 
                  link: '/interview' 
                },
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
                    <div className="flex items-center justify-between text-xs text-canvas-secondary/70 dark:text-darkCanvas-muted/70 pt-1 border-t border-canvas-border dark:border-plum-border">
                      <span>{stat.desc}</span>
                      <Link to={stat.link} className="font-bold text-plum-dusty dark:text-lilac hover:underline">
                        Open
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Activity Card */}
            {dashboardData.analyses.length > 0 || dashboardData.careerRecommendations.length > 0 ? (
              <div className="p-6 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-4">
                <h3 className="text-base font-bold text-canvas-primary dark:text-darkCanvas-primary flex items-center gap-2">
                  <Clock className="w-4 h-4 text-plum-dusty dark:text-lilac" />
                  <span>Recent Activity Records</span>
                </h3>
                <div className="space-y-2">
                  {dashboardData.analyses.slice(0, 3).map((a, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-blush/20 dark:bg-plum-darker/40 border border-canvas-border dark:border-plum-border flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <FileSearch className="w-4 h-4 text-plum-dusty dark:text-lilac" />
                        <div>
                          <p className="font-bold text-canvas-primary dark:text-darkCanvas-primary">{a.fileName}</p>
                          <p className="text-canvas-secondary dark:text-darkCanvas-secondary">Score: {a.overallScore}/100 · ATS: {a.atsAssessment?.level}</p>
                        </div>
                      </div>
                      <span className="text-canvas-secondary/60 dark:text-darkCanvas-muted/60">{new Date(a.createdAt).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Empty State */
              <div className="p-8 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft text-center space-y-4">
                <div className="w-12 h-12 rounded-xl bg-blush/60 dark:bg-plum-border/50 mx-auto flex items-center justify-center text-plum-dusty dark:text-lilac shadow-soft">
                  <Clock className="w-6 h-6 opacity-85" />
                </div>
                <h3 className="text-lg font-bold text-canvas-primary dark:text-darkCanvas-primary">
                  No Activity Records Found
                </h3>
                <p className="text-xs sm:text-sm text-canvas-secondary dark:text-darkCanvas-secondary max-w-md mx-auto leading-relaxed">
                  As you analyze resumes, build new CVs, or complete mock interview sessions, your individual activity logs will automatically appear here.
                </p>
                <div className="pt-2">
                  <Link
                    to="/analyzer"
                    className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold shadow-soft transition-all"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Analyze Your First Resume</span>
                  </Link>
                </div>
              </div>
            )}

          </div>
        )}

        {/* Analyses Tab */}
        {activeTab === 'analyses' && (
          <div className="space-y-4">
            {dashboardData.analyses.length > 0 ? (
              <div className="space-y-3">
                {dashboardData.analyses.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FileSearch className="w-4 h-4 text-plum-dusty dark:text-lilac" />
                        <h4 className="font-bold text-base text-canvas-primary dark:text-darkCanvas-primary">{item.fileName}</h4>
                      </div>
                      <p className="text-xs text-canvas-secondary dark:text-darkCanvas-secondary">
                        ATS Level: <span className="font-semibold">{item.atsAssessment?.level}</span> · Analyzed on {new Date(item.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="px-3.5 py-1.5 rounded-xl bg-blush/60 dark:bg-plum-border/50 border border-canvas-border dark:border-plum-border text-xs font-bold text-plum-dusty dark:text-lilac">
                        Score: {item.overallScore} / 100
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft text-center space-y-4">
                <FileSearch className="w-10 h-10 text-plum-dusty dark:text-lilac mx-auto opacity-75" />
                <h3 className="text-lg font-bold text-canvas-primary dark:text-darkCanvas-primary">No Saved Resume Analyses</h3>
                <p className="text-xs sm:text-sm text-canvas-secondary dark:text-darkCanvas-secondary max-w-md mx-auto">
                  You haven't uploaded any resumes for analysis yet.
                </p>
                <Link to="/analyzer" className="btn-primary inline-block px-5 py-2.5 rounded-xl text-xs font-bold shadow-soft">
                  Go to Resume Analyzer
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Resumes Tab */}
        {activeTab === 'resumes' && (
          <div className="space-y-4">
            {dashboardData.resumes.length > 0 ? (
              <div className="space-y-3">
                {dashboardData.resumes.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft flex items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-plum-dusty dark:text-lilac" />
                        <h4 className="font-bold text-base text-canvas-primary dark:text-darkCanvas-primary">{item.title || item.fullName || 'My Resume'}</h4>
                      </div>
                      <p className="text-xs text-canvas-secondary dark:text-darkCanvas-secondary">
                        Template: {item.templateId || 'Modern'} · Saved on {new Date(item.updatedAt || item.createdAt).toLocaleDateString()}
                      </p>
                    </div>

                    <Link to="/builder" className="btn-secondary px-4 py-2 rounded-xl text-xs font-bold">
                      Open Builder
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft text-center space-y-4">
                <FileText className="w-10 h-10 text-plum-dusty dark:text-lilac mx-auto opacity-75" />
                <h3 className="text-lg font-bold text-canvas-primary dark:text-darkCanvas-primary">No Saved Resumes</h3>
                <p className="text-xs sm:text-sm text-canvas-secondary dark:text-darkCanvas-secondary max-w-md mx-auto">
                  Create and save your personalized resumes with our interactive builder.
                </p>
                <Link to="/builder" className="btn-primary inline-block px-5 py-2.5 rounded-xl text-xs font-bold shadow-soft">
                  Create a Resume
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Career Guidance Tab */}
        {activeTab === 'career' && (
          <div className="space-y-4">
            {dashboardData.careerRecommendations.length > 0 ? (
              <div className="space-y-3">
                {dashboardData.careerRecommendations.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-plum-dusty dark:text-lilac">Career Roadmap Report</span>
                      <span className="text-xs text-canvas-secondary/70 dark:text-darkCanvas-muted/70">{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm font-bold text-canvas-primary dark:text-darkCanvas-primary">
                      Background: {item.education || item.profileInput?.education}
                    </p>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.recommendedPaths?.map((p, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-blush/60 dark:bg-plum-border/40 text-plum-dusty dark:text-lilac font-medium border border-canvas-border dark:border-plum-border">
                          {p.roleTitle} ({p.matchPercentage}%)
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft text-center space-y-4">
                <Compass className="w-10 h-10 text-plum-dusty dark:text-lilac mx-auto opacity-75" />
                <h3 className="text-lg font-bold text-canvas-primary dark:text-darkCanvas-primary">No Career Roadmaps Saved</h3>
                <p className="text-xs sm:text-sm text-canvas-secondary dark:text-darkCanvas-secondary max-w-md mx-auto">
                  Discover suitable tech roles and generate your customized learning roadmap.
                </p>
                <Link to="/career" className="btn-primary inline-block px-5 py-2.5 rounded-xl text-xs font-bold shadow-soft">
                  Explore Career Guidance
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Interviews Tab */}
        {activeTab === 'interviews' && (
          <div className="space-y-4">
            {dashboardData.interviewSessions.length > 0 ? (
              <div className="space-y-3">
                {dashboardData.interviewSessions.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-plum-dusty dark:text-lilac">{item.role} · {item.category}</span>
                      <span className="text-xs text-canvas-secondary/70 dark:text-darkCanvas-muted/70">{new Date(item.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-xs text-canvas-secondary dark:text-darkCanvas-secondary font-semibold">
                      Difficulty: {item.difficulty} · Score: {item.evaluation?.score || 'Reviewed'}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-10 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft text-center space-y-4">
                <MessageSquareCode className="w-10 h-10 text-plum-dusty dark:text-lilac mx-auto opacity-75" />
                <h3 className="text-lg font-bold text-canvas-primary dark:text-darkCanvas-primary">No Interview Sessions Logged</h3>
                <p className="text-xs sm:text-sm text-canvas-secondary dark:text-darkCanvas-secondary max-w-md mx-auto">
                  Practice role-specific interview questions and get AI critiques to prepare for placements.
                </p>
                <Link to="/interview" className="btn-primary inline-block px-5 py-2.5 rounded-xl text-xs font-bold shadow-soft">
                  Start Interview Practice
                </Link>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="login"
      />

    </div>
  );
}
