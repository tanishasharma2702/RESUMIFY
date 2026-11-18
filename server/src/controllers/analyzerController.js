import { extractTextFromFile } from '../utils/documentParser.js';
import { getGeminiClient, getGeminiStatus } from '../config/gemini.js';
import { getDBStatus } from '../config/db.js';
import { ResumeAnalysis } from '../models/ResumeAnalysis.js';

export const analyzeResume = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: 'No resume document uploaded. Please upload a PDF or DOCX file.',
    });
  }

  let extractedText = '';

  try {
    extractedText = await extractTextFromFile(req.file.path, req.file.mimetype);
  } catch (parseErr) {
    return res.status(400).json({
      success: false,
      message: `Failed to extract text from document: ${parseErr.message}`,
    });
  }

  if (!extractedText || extractedText.length < 50) {
    return res.status(400).json({
      success: false,
      message: 'The uploaded document contains insufficient or unreadable text. Please ensure it is not a flat scanned image and contains readable text.',
    });
  }

  // Check Gemini AI Client
  const gemini = getGeminiClient();
  if (!gemini) {
    return res.status(503).json({
      success: false,
      configured: false,
      message: 'Google Gemini API key is not configured in server/.env. Please add GEMINI_API_KEY to enable genuine AI resume analysis.',
      extractedPreview: extractedText.slice(0, 300) + '...',
    });
  }

  try {
    const prompt = `You are a senior technical recruiter, hiring manager, and ATS (Applicant Tracking System) specialist.
Analyze the following resume text extracted from a student/job seeker document.
Base all observations STRICTLY on the provided text. Do not invent achievements, education, or companies.

RESUME TEXT:
"""
${extractedText.slice(0, 15000)}
"""

CRITICAL INSTRUCTIONS:
Return STRICTLY valid JSON with no extraneous text, no markdown explanation outside the JSON.
The JSON must adhere to the following schema:
{
  "overallScore": <integer 0 to 100 representing advisory resume quality>,
  "atsAssessment": {
    "score": <integer 0 to 100>,
    "level": <one of "Needs Improvement", "Moderate", "High", "Optimal">,
    "summary": <concise summary of ATS friendliness, structure, and machine readability>
  },
  "identifiedSkills": [<array of extracted technical and soft skill strings found in text>],
  "strengths": [<array of 3 to 5 clear strengths present in this resume>],
  "weaknesses": [<array of 3 to 5 constructive areas needing work>],
  "missingSkills": [<array of recommended industry skills missing for this profile>],
  "formattingFeedback": [<array of 2 to 4 feedback notes on structure, section clarity, bullet points>],
  "keywordRecommendations": [<array of 4 to 8 high-impact keywords to include>],
  "improvementSuggestions": [<array of 3 to 5 actionable suggestions to elevate this resume>]
}`;

    const geminiStatus = getGeminiStatus();
    const response = await gemini.models.generateContent({
      model: geminiStatus.model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    let rawText = response.text || '';
    rawText = rawText.trim().replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();

    let analysisData;
    try {
      analysisData = JSON.parse(rawText);
    } catch (e) {
      console.error('Failed to parse Gemini JSON output:', rawText);
      return res.status(502).json({
        success: false,
        message: 'AI generated an invalid response structure. Please try again.',
      });
    }

    // Save record to MongoDB if user is authenticated and DB is connected
    let savedRecordId = null;
    const dbStatus = getDBStatus();
    if (dbStatus.connected && req.user && req.user.id) {
      try {
        const saved = await ResumeAnalysis.create({
          userId: req.user.id,
          fileName: req.file.originalname,
          fileType: req.file.mimetype,
          overallScore: analysisData.overallScore,
          atsAssessment: analysisData.atsAssessment,
          identifiedSkills: analysisData.identifiedSkills,
          strengths: analysisData.strengths,
          weaknesses: analysisData.weaknesses,
          missingSkills: analysisData.missingSkills,
          formattingFeedback: analysisData.formattingFeedback,
          keywordRecommendations: analysisData.keywordRecommendations,
          improvementSuggestions: analysisData.improvementSuggestions,
        });
        savedRecordId = saved._id;
      } catch (dbErr) {
        console.warn('Could not persist resume analysis to DB:', dbErr.message);
      }
    }

    res.json({
      success: true,
      analysis: analysisData,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      savedRecordId,
      disclaimer: 'This score is an advisory assessment for career development, not an absolute hiring decision.',
    });
  } catch (aiErr) {
    console.error('Gemini API execution error:', aiErr);
    res.status(500).json({
      success: false,
      message: `Gemini AI analysis failed: ${aiErr.message}. Ensure your GEMINI_API_KEY is valid.`,
    });
  }
};
