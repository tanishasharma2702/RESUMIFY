import { getGeminiClient, getGeminiStatus } from '../config/gemini.js';
import { getDBStatus } from '../config/db.js';
import { Resume } from '../models/Resume.js';

export const enhanceResumeText = async (req, res) => {
  const { text, type = 'summary' } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({
      success: false,
      message: 'Please provide text to enhance.',
    });
  }

  const gemini = getGeminiClient();
  if (!gemini) {
    return res.status(503).json({
      success: false,
      message: 'Google Gemini API key is not configured in server/.env. Please configure GEMINI_API_KEY to use AI wording enhancement.',
    });
  }

  try {
    const prompt = `You are a professional resume writer for engineering and computer science students.
Rephrase and elevate the following ${type} text. 
CRITICAL RULES:
1. Do NOT invent new skills, universities, companies, or metrics.
2. Use strong industry action verbs (e.g., Engineered, Architected, Spearheaded, Implemented).
3. Ensure crisp, ATS-friendly phrasing.
4. Return ONLY the enhanced text, with no introductory banter or quotes.

ORIGINAL TEXT:
"""
${text}
"""`;

    const geminiStatus = getGeminiStatus();
    const response = await gemini.models.generateContent({
      model: geminiStatus.model,
      contents: prompt,
    });

    const enhanced = (response.text || '').trim().replace(/^["']|["']$/g, '');

    res.json({
      success: true,
      enhancedText: enhanced,
    });
  } catch (error) {
    console.error('Enhance resume text error:', error);
    res.status(500).json({
      success: false,
      message: `AI enhancement failed: ${error.message}`,
    });
  }
};

export const saveResume = async (req, res) => {
  const dbStatus = getDBStatus();
  if (!dbStatus.connected) {
    return res.status(503).json({
      success: false,
      message: 'MongoDB is not connected. Configure MONGODB_URI in server/.env to save resumes.',
    });
  }

  try {
    const { resumeData, title = 'My Resume' } = req.body;

    const resume = await Resume.findOneAndUpdate(
      { userId: req.user.id },
      {
        userId: req.user.id,
        title,
        templateId: resumeData.templateId || 'modern',
        personalInfo: resumeData.personalInfo,
        summary: resumeData.summary,
        skills: resumeData.skills,
        education: resumeData.education,
        experience: resumeData.experience,
        projects: resumeData.projects,
        certifications: resumeData.certifications,
        achievements: resumeData.achievements,
        updatedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      message: 'Resume successfully saved to your dashboard.',
      resume,
    });
  } catch (error) {
    console.error('Save resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save resume.',
    });
  }
};

export const getSavedResume = async (req, res) => {
  const dbStatus = getDBStatus();
  if (!dbStatus.connected) {
    return res.json({
      success: true,
      resume: null,
    });
  }

  try {
    const resume = await Resume.findOne({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve saved resume.',
    });
  }
};
