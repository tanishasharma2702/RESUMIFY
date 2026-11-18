import React, { useState } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { 
  FileText, 
  Sparkles, 
  Download, 
  Eye, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  GraduationCap, 
  Briefcase, 
  Code, 
  Award, 
  FolderGit2, 
  Plus, 
  Trash2,
  CheckCircle2,
  Layers,
  Save,
  AlertCircle,
  Key
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import CreateResumeInfo from '../components/info/CreateResumeInfo';
import AuthModal from '../components/AuthModal';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export default function CreateResumePage() {
  const { isAuthenticated, user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('register');

  const [activeTab, setActiveTab] = useState('personal');
  const [template, setTemplate] = useState('modern');
  const [isExporting, setIsExporting] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [error, setError] = useState('');

  if (!isAuthenticated) {
    return (
      <>
        <CreateResumeInfo
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

  // Freshers-ready interactive resume state
  const [resumeData, setResumeData] = useState({
    fullName: 'Alex Morgan',
    email: 'alex.morgan@university.edu',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    linkedin: 'linkedin.com/in/alexmorgan',
    github: 'github.com/alexmorgan',
    summary: 'Motivated first-year Computer Science undergraduate with hands-on foundational skills in full-stack web development and algorithms. Passionate about solving real-world challenges through clean code and modern web frameworks.',
    education: [
      {
        institution: 'National Institute of Technology',
        degree: 'B.Tech in Computer Science & Engineering',
        year: '2025 – 2029',
        score: 'CGPA: 8.8 / 10'
      }
    ],
    skills: ['C++', 'JavaScript', 'React.js', 'Tailwind CSS', 'Node.js', 'Git', 'Data Structures'],
    experience: [],
    projects: [
      {
        title: 'TaskMaster – Real-time Task Manager',
        tech: 'React, Node.js, MongoDB',
        description: 'Developed an interactive productivity platform with authentication and real-time status updates.'
      }
    ],
    certifications: [
      {
        name: 'CS50: Introduction to Computer Science',
        issuer: 'HarvardX',
        year: '2025'
      }
    ],
    achievements: [
      'Top 10 Finalist in University Hackathon 2025',
      'Active contributor to open-source student tech community'
    ]
  });

  const handleInputChange = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Real PDF Export using html2canvas & jsPDF
  const handleDownloadPDF = async () => {
    const element = document.getElementById('resume-preview-canvas');
    if (!element) return;

    setIsExporting(true);
    setError('');

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      const safeName = (resumeData.fullName || 'RESUMIFY').replace(/[^a-zA-Z0-9]/g, '_');
      pdf.save(`${safeName}_Resume.pdf`);
    } catch (err) {
      console.error('PDF export error:', err);
      setError('Failed to generate PDF. Please ensure your browser allows downloads.');
    } finally {
      setIsExporting(false);
    }
  };

  // Enhance Professional Summary with real Gemini API
  const handleEnhanceSummary = async () => {
    if (!resumeData.summary || resumeData.summary.trim() === '') {
      return setError('Please enter a summary first before requesting AI enhancement.');
    }

    setIsEnhancing(true);
    setError('');

    try {
      const res = await axios.post(`${API_BASE}/resume/enhance`, {
        text: resumeData.summary,
        type: 'professional summary'
      });

      if (res.data && res.data.success) {
        handleInputChange('summary', res.data.enhancedText);
        setSaveStatus('Summary enhanced with Gemini AI!');
        setTimeout(() => setSaveStatus(''), 4000);
      } else {
        setError(res.data?.message || 'Enhancement failed.');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'AI service error.');
    } finally {
      setIsEnhancing(false);
    }
  };

  // Save Resume to LocalStorage and Dashboard
  const handleSaveToDashboard = async () => {
    if (!isAuthenticated) {
      return setError('Please sign in first to save your resume to your dashboard.');
    }

    try {
      const allResumes = JSON.parse(localStorage.getItem('resumify_saved_resumes') || '[]');
      const userEmail = user?.email ? user.email.toLowerCase() : 'guest@local';
      
      const newResumeEntry = {
        id: 'res_' + Date.now(),
        userEmail,
        title: `${resumeData.fullName}'s Resume`,
        fullName: resumeData.fullName,
        templateId: template,
        resumeData: { ...resumeData, templateId: template },
        updatedAt: new Date().toISOString()
      };

      // Filter out existing and prepend new
      const filtered = allResumes.filter(r => r.userEmail !== userEmail);
      localStorage.setItem('resumify_saved_resumes', JSON.stringify([newResumeEntry, ...filtered]));

      setSaveStatus('Resume saved successfully to your dashboard!');
      setTimeout(() => setSaveStatus(''), 4000);
    } catch (err) {
      setError('Failed to save resume.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Page Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-canvas-border dark:border-plum-border pb-6">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-canvas-primary dark:text-darkCanvas-primary tracking-tight">
            Create Resume
          </h1>
          <p className="text-sm text-canvas-secondary dark:text-darkCanvas-secondary max-w-2xl">
            Build a clean, structured resume with real-time preview and instant PDF export. Zero prior work experience required.
          </p>
        </div>

        {/* Template Selector, Save & Export Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex rounded-xl border border-canvas-border dark:border-plum-border p-1 bg-white dark:bg-plum-card text-xs font-semibold shadow-soft">
            <button
              type="button"
              onClick={() => setTemplate('modern')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                template === 'modern'
                  ? 'bg-plum-dusty text-white dark:bg-orchid dark:text-white shadow-soft'
                  : 'text-canvas-secondary dark:text-darkCanvas-secondary hover:text-plum-dusty'
              }`}
            >
              Modern Tech
            </button>
            <button
              type="button"
              onClick={() => setTemplate('classic')}
              className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                template === 'classic'
                  ? 'bg-plum-dusty text-white dark:bg-orchid dark:text-white shadow-soft'
                  : 'text-canvas-secondary dark:text-darkCanvas-secondary hover:text-plum-dusty'
              }`}
            >
              Classic Clean
            </button>
          </div>

          {isAuthenticated && (
            <button
              type="button"
              onClick={handleSaveToDashboard}
              className="btn-secondary inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save</span>
            </button>
          )}

          <button
            type="button"
            disabled={isExporting}
            onClick={handleDownloadPDF}
            className="btn-primary inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-soft transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
          >
            {isExporting ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Rendering PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Notifications */}
      {saveStatus && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{saveStatus}</span>
        </div>
      )}

      {error && (
        <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Dual-Panel Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Panel: Form Sections (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Navigation Tabs for Form Sections */}
          <div className="flex flex-wrap gap-2 pb-2">
            {[
              { id: 'personal', label: 'Personal Details', icon: User },
              { id: 'education', label: 'Education', icon: GraduationCap },
              { id: 'skills', label: 'Skills', icon: Code },
              { id: 'projects', label: 'Projects', icon: FolderGit2 },
              { id: 'experience', label: 'Experience (Optional)', icon: Briefcase },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-plum-dusty text-white dark:bg-orchid dark:text-white shadow-soft'
                      : 'bg-white dark:bg-plum-card text-canvas-secondary dark:text-darkCanvas-secondary border border-canvas-border dark:border-plum-border hover:bg-blush/30'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content Cards */}
          <div className="p-6 rounded-2xl bg-white dark:bg-plum-card border border-canvas-border dark:border-plum-border shadow-soft space-y-4">
            
            {/* Personal Details Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-canvas-primary dark:text-darkCanvas-primary">Contact & Summary</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-canvas-secondary dark:text-darkCanvas-secondary">Full Name</label>
                    <input
                      type="text"
                      value={resumeData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl border border-canvas-border dark:border-plum-border bg-blush/10 dark:bg-plum-darker/50 text-sm text-canvas-primary dark:text-darkCanvas-primary focus:outline-none focus:ring-2 focus:ring-lavender/40 focus:border-plum-dusty transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-canvas-secondary dark:text-darkCanvas-secondary">Email</label>
                    <input
                      type="email"
                      value={resumeData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl border border-canvas-border dark:border-plum-border bg-blush/10 dark:bg-plum-darker/50 text-sm text-canvas-primary dark:text-darkCanvas-primary focus:outline-none focus:ring-2 focus:ring-lavender/40 focus:border-plum-dusty transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-canvas-secondary dark:text-darkCanvas-secondary">Phone</label>
                    <input
                      type="text"
                      value={resumeData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl border border-canvas-border dark:border-plum-border bg-blush/10 dark:bg-plum-darker/50 text-sm text-canvas-primary dark:text-darkCanvas-primary focus:outline-none focus:ring-2 focus:ring-lavender/40 focus:border-plum-dusty transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-canvas-secondary dark:text-darkCanvas-secondary">Location</label>
                    <input
                      type="text"
                      value={resumeData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl border border-canvas-border dark:border-plum-border bg-blush/10 dark:bg-plum-darker/50 text-sm text-canvas-primary dark:text-darkCanvas-primary focus:outline-none focus:ring-2 focus:ring-lavender/40 focus:border-plum-dusty transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-canvas-secondary dark:text-darkCanvas-secondary">LinkedIn</label>
                    <input
                      type="text"
                      value={resumeData.linkedin}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl border border-canvas-border dark:border-plum-border bg-blush/10 dark:bg-plum-darker/50 text-sm text-canvas-primary dark:text-darkCanvas-primary focus:outline-none focus:ring-2 focus:ring-lavender/40 focus:border-plum-dusty transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-canvas-secondary dark:text-darkCanvas-secondary">GitHub</label>
                    <input
                      type="text"
                      value={resumeData.github}
                      onChange={(e) => handleInputChange('github', e.target.value)}
                      className="w-full mt-1 px-3 py-2 rounded-xl border border-canvas-border dark:border-plum-border bg-blush/10 dark:bg-plum-darker/50 text-sm text-canvas-primary dark:text-darkCanvas-primary focus:outline-none focus:ring-2 focus:ring-lavender/40 focus:border-plum-dusty transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-canvas-secondary dark:text-darkCanvas-secondary">
                      Professional Summary
                    </label>
                    <button
                      type="button"
                      disabled={isEnhancing}
                      onClick={handleEnhanceSummary}
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-plum-dusty dark:text-lilac hover:underline disabled:opacity-50"
                    >
                      <Sparkles className="w-3 h-3 text-plum-dusty dark:text-lilac" />
                      <span>{isEnhancing ? 'Enhancing with AI...' : 'Enhance with Gemini AI'}</span>
                    </button>
                  </div>
                  <textarea
                    rows={4}
                    value={resumeData.summary}
                    onChange={(e) => handleInputChange('summary', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-canvas-border dark:border-plum-border bg-blush/10 dark:bg-plum-darker/50 text-sm text-canvas-primary dark:text-darkCanvas-primary focus:outline-none focus:ring-2 focus:ring-lavender/40 focus:border-plum-dusty transition-colors resize-none"
                  />
                </div>
              </div>
            )}

            {/* Education Tab */}
            {activeTab === 'education' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-canvas-primary dark:text-darkCanvas-primary">Academic Background</h3>
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-canvas-border dark:border-plum-border bg-blush/15 dark:bg-plum-darker/40 space-y-2">
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => {
                        const copy = [...resumeData.education];
                        copy[idx].institution = e.target.value;
                        setResumeData({ ...resumeData, education: copy });
                      }}
                      placeholder="University / College Name"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-canvas-border dark:border-plum-border text-xs bg-white dark:bg-plum-darker text-canvas-primary dark:text-darkCanvas-primary focus:outline-none focus:ring-1 focus:ring-lavender"
                    />
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => {
                        const copy = [...resumeData.education];
                        copy[idx].degree = e.target.value;
                        setResumeData({ ...resumeData, education: copy });
                      }}
                      placeholder="Degree & Major (e.g. B.Tech Computer Science)"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-canvas-border dark:border-plum-border text-xs bg-white dark:bg-plum-darker text-canvas-primary dark:text-darkCanvas-primary focus:outline-none focus:ring-1 focus:ring-lavender"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={edu.year}
                        onChange={(e) => {
                          const copy = [...resumeData.education];
                          copy[idx].year = e.target.value;
                          setResumeData({ ...resumeData, education: copy });
                        }}
                        placeholder="Years (e.g. 2025 – 2029)"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-canvas-border dark:border-plum-border text-xs bg-white dark:bg-plum-darker text-canvas-primary dark:text-darkCanvas-primary focus:outline-none focus:ring-1 focus:ring-lavender"
                      />
                      <input
                        type="text"
                        value={edu.score}
                        onChange={(e) => {
                          const copy = [...resumeData.education];
                          copy[idx].score = e.target.value;
                          setResumeData({ ...resumeData, education: copy });
                        }}
                        placeholder="CGPA / Score"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-canvas-border dark:border-plum-border text-xs bg-white dark:bg-plum-darker text-canvas-primary dark:text-darkCanvas-primary focus:outline-none focus:ring-1 focus:ring-lavender"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-canvas-primary dark:text-darkCanvas-primary">Technical & Core Skills</h3>
                <p className="text-xs text-canvas-secondary dark:text-darkCanvas-secondary">
                  Separate each skill with a comma.
                </p>
                <textarea
                  rows={3}
                  value={resumeData.skills.join(', ')}
                  onChange={(e) => {
                    const skillsArray = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    setResumeData({ ...resumeData, skills: skillsArray });
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-canvas-border dark:border-plum-border bg-blush/10 dark:bg-plum-darker/50 text-sm text-canvas-primary dark:text-darkCanvas-primary focus:outline-none focus:ring-2 focus:ring-lavender/40 focus:border-plum-dusty transition-colors"
                />
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <h3 className="text-base font-bold text-canvas-primary dark:text-darkCanvas-primary">Key Projects</h3>
                {resumeData.projects.map((proj, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl border border-canvas-border dark:border-plum-border bg-blush/15 dark:bg-plum-darker/40 space-y-2">
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => {
                        const copy = [...resumeData.projects];
                        copy[idx].title = e.target.value;
                        setResumeData({ ...resumeData, projects: copy });
                      }}
                      placeholder="Project Title"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-canvas-border dark:border-plum-border text-xs bg-white dark:bg-plum-darker text-canvas-primary dark:text-darkCanvas-primary focus:outline-none focus:ring-1 focus:ring-lavender"
                    />
                    <input
                      type="text"
                      value={proj.tech}
                      onChange={(e) => {
                        const copy = [...resumeData.projects];
                        copy[idx].tech = e.target.value;
                        setResumeData({ ...resumeData, projects: copy });
                      }}
                      placeholder="Technologies Used"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-canvas-border dark:border-plum-border text-xs bg-white dark:bg-plum-darker text-canvas-primary dark:text-darkCanvas-primary focus:outline-none focus:ring-1 focus:ring-lavender"
                    />
                    <textarea
                      rows={2}
                      value={proj.description}
                      onChange={(e) => {
                        const copy = [...resumeData.projects];
                        copy[idx].description = e.target.value;
                        setResumeData({ ...resumeData, projects: copy });
                      }}
                      placeholder="Project Description & Achievements"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-canvas-border dark:border-plum-border text-xs bg-white dark:bg-plum-darker text-canvas-primary dark:text-darkCanvas-primary focus:outline-none focus:ring-1 focus:ring-lavender resize-none"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Experience Tab */}
            {activeTab === 'experience' && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-canvas-primary dark:text-darkCanvas-primary">Work Experience & Internships</h3>
                <p className="text-xs text-canvas-secondary dark:text-darkCanvas-secondary">
                  Optional: If you are a first-year student or fresher with no previous work experience, you can leave this blank. Your projects and education will highlight your qualifications.
                </p>
                <div className="p-4 rounded-xl bg-blush/15 dark:bg-plum-darker/30 border border-dashed border-canvas-border dark:border-plum-border text-center text-xs text-canvas-secondary/70 dark:text-darkCanvas-muted/70">
                  No experience entries added. Freshers can safely skip this section.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel: Live Resume Preview & Canvas for PDF Render (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between text-xs font-bold text-canvas-primary dark:text-darkCanvas-primary">
            <span className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-plum-dusty dark:text-lilac" />
              <span>Live Interactive Preview ({template.toUpperCase()} Template)</span>
            </span>
            <span className="text-plum-dusty dark:text-lilac">A4 Export Target</span>
          </div>

          {/* Printable Sheet Canvas */}
          <div 
            id="resume-preview-canvas"
            className={`p-8 rounded-2xl bg-white text-gray-900 shadow-soft border border-canvas-border min-h-[640px] text-left transition-all ${
              template === 'classic' ? 'font-serif' : 'font-sans'
            }`}
          >
            {/* Header */}
            <div className={`border-b pb-4 space-y-1 ${template === 'classic' ? 'border-gray-800 text-center' : 'border-gray-200'}`}>
              <h2 className="text-2xl font-bold tracking-tight text-[#8A5F8A]">
                {resumeData.fullName || 'Your Full Name'}
              </h2>
              <div className={`flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 ${template === 'classic' ? 'justify-center' : ''}`}>
                {resumeData.email && <span>{resumeData.email}</span>}
                {resumeData.phone && <span>· {resumeData.phone}</span>}
                {resumeData.location && <span>· {resumeData.location}</span>}
              </div>
              <div className={`flex flex-wrap gap-x-4 gap-y-1 text-xs text-[#8A5F8A] font-medium pt-0.5 ${template === 'classic' ? 'justify-center' : ''}`}>
                {resumeData.linkedin && <span>{resumeData.linkedin}</span>}
                {resumeData.github && <span>· {resumeData.github}</span>}
              </div>
            </div>

            {/* Summary */}
            {resumeData.summary && (
              <div className="space-y-1 mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A5F8A] border-b border-gray-100 pb-0.5">
                  Professional Summary
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {resumeData.summary}
                </p>
              </div>
            )}

            {/* Education */}
            {resumeData.education && resumeData.education.length > 0 && (
              <div className="space-y-2 mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A5F8A] border-b border-gray-100 pb-0.5">
                  Education
                </h4>
                {resumeData.education.map((edu, i) => (
                  <div key={i} className="text-xs flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-800">{edu.institution}</p>
                      <p className="text-gray-600">{edu.degree}</p>
                    </div>
                    <div className="text-right text-gray-500">
                      <p>{edu.year}</p>
                      {edu.score && <p className="font-semibold text-gray-700">{edu.score}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Technical Skills */}
            {resumeData.skills && resumeData.skills.length > 0 && (
              <div className="space-y-1 mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A5F8A] border-b border-gray-100 pb-0.5">
                  Technical Skills
                </h4>
                <p className="text-xs text-gray-700 leading-relaxed">
                  {resumeData.skills.join(' · ')}
                </p>
              </div>
            )}

            {/* Projects */}
            {resumeData.projects && resumeData.projects.length > 0 && (
              <div className="space-y-2 mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A5F8A] border-b border-gray-100 pb-0.5">
                  Academic & Personal Projects
                </h4>
                {resumeData.projects.map((proj, i) => (
                  <div key={i} className="text-xs space-y-0.5">
                    <div className="flex justify-between font-bold text-gray-800">
                      <span>{proj.title}</span>
                      <span className="font-normal text-gray-500">{proj.tech}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{proj.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Achievements */}
            {resumeData.achievements && resumeData.achievements.length > 0 && (
              <div className="space-y-1 mt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A5F8A] border-b border-gray-100 pb-0.5">
                  Honors & Achievements
                </h4>
                <ul className="list-disc list-inside text-xs text-gray-700 space-y-0.5">
                  {resumeData.achievements.map((ach, i) => (
                    <li key={i}>{ach}</li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
