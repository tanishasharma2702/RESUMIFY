import { getDBStatus } from '../config/db.js';
import { ResumeAnalysis } from '../models/ResumeAnalysis.js';
import { Resume } from '../models/Resume.js';
import { CareerRecommendation } from '../models/CareerRecommendation.js';
import { InterviewSession } from '../models/InterviewSession.js';

export const getDashboardData = async (req, res) => {
  const dbStatus = getDBStatus();

  if (!dbStatus.connected) {
    return res.json({
      success: true,
      database: dbStatus,
      user: req.user,
      analyses: [],
      resumes: [],
      careerRecommendations: [],
      interviewSessions: [],
      message: 'MongoDB is not currently connected. To persist and retrieve historical records across sessions, configure MONGODB_URI in server/.env.',
    });
  }

  try {
    const userId = req.user.id;

    // Concurrently fetch user-isolated records from all 4 modules
    const [analyses, resumes, careerRecommendations, interviewSessions] = await Promise.all([
      ResumeAnalysis.find({ userId }).sort({ createdAt: -1 }).limit(20),
      Resume.find({ userId }).sort({ updatedAt: -1 }).limit(10),
      CareerRecommendation.find({ userId }).sort({ createdAt: -1 }).limit(10),
      InterviewSession.find({ userId }).sort({ createdAt: -1 }).limit(20),
    ]);

    res.json({
      success: true,
      database: dbStatus,
      user: req.user,
      analyses,
      resumes,
      careerRecommendations,
      interviewSessions,
    });
  } catch (error) {
    console.error('Dashboard data retrieval error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve dashboard records.',
    });
  }
};
