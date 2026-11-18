import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// The Six Required Main Section Pages
import LandingPage from './pages/LandingPage';
import ResumeAnalyzerPage from './pages/ResumeAnalyzerPage';
import CareerGuidancePage from './pages/CareerGuidancePage';
import CreateResumePage from './pages/CreateResumePage';
import InterviewPrepPage from './pages/InterviewPrepPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col bg-canvas-bg dark:bg-plum-darker text-canvas-primary dark:text-darkCanvas-primary transition-colors duration-200">
            {/* Responsive Navigation Bar with Theme & Auth */}
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/analyzer" element={<ResumeAnalyzerPage />} />
                <Route path="/career" element={<CareerGuidancePage />} />
                <Route path="/builder" element={<CreateResumePage />} />
                <Route path="/interview" element={<InterviewPrepPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                {/* Catch-all redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
