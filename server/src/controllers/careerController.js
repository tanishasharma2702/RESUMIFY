import { getGeminiClient, getGeminiStatus } from '../config/gemini.js';
import { getDBStatus } from '../config/db.js';
import { CareerRecommendation } from '../models/CareerRecommendation.js';

export const getCareerRecommendations = async (req, res) => {
  const { education, currentSkills, interests, careerGoals, preferredRoles } = req.body;

  if (!education || !currentSkills) {
    return res.status(400).json({
      success: false,
      message: 'Please provide at least your educational background and current skills.',
    });
  }

  const gemini = getGeminiClient();
  if (!gemini) {
    return res.status(503).json({
      success: false,
      configured: false,
      message: 'Google Gemini API key is not configured in server/.env. Please add GEMINI_API_KEY to enable AI career path mapping.',
    });
  }

  try {
    const prompt = `You are an expert tech career coach and academic advisor for computer science students and job seekers.
Analyze the following student profile and generate genuine, high-value career recommendations, skill gap analysis, and phased learning roadmaps.

STUDENT PROFILE:
- Educational Background: ${education}
- Current Skills: ${Array.isArray(currentSkills) ? currentSkills.join(', ') : currentSkills}
- Areas of Interest: ${interests || 'General Computer Science'}
- Career Goals: ${careerGoals || 'Industry placement and internship'}
- Preferred Roles: ${preferredRoles || 'Open to recommendations'}

CRITICAL INSTRUCTIONS:
Return STRICTLY valid JSON with no markdown wrapping outside the JSON.
The JSON must adhere to the following schema:
{
  "summary": <concise overview of candidate potential and recommended direction>,
  "recommendedPaths": [
    {
      "roleTitle": <name of recommended job role, e.g. "Full-Stack Developer", "Data Engineer", etc.>,
      "matchPercentage": <integer 0 to 100 based strictly on current skills alignment>,
      "description": <why this role fits the candidate>,
      "requiredSkills": [<array of key industry technologies for this role>],
      "existingSkillsMatched": [<array of candidate's skills that apply here>],
      "skillGaps": [<array of missing technologies candidate needs to learn>],
      "roadmap": [
        {
          "phase": "Phase 1: Core Fundamentals",
          "topics": [<3 to 5 specific topics/tools to learn first>]
        },
        {
          "phase": "Phase 2: Advanced Concepts & Frameworks",
          "topics": [<3 to 5 deeper tools/frameworks>]
        },
        {
          "phase": "Phase 3: Production Projects & Portfolio",
          "topics": [<3 specific project ideas with technologies>]
        }
      ],
      "nextSteps": [<array of 3 to 4 immediate actionable steps candidate should take this month>]
    }
  ]
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

    let careerData;
    try {
      careerData = JSON.parse(rawText);
    } catch (parseErr) {
      console.error('Failed to parse Gemini Career output:', rawText);
      return res.status(502).json({
        success: false,
        message: 'AI generated an invalid response format. Please retry.',
      });
    }

    // Persist to MongoDB if authenticated
    let savedRecordId = null;
    const dbStatus = getDBStatus();
    if (dbStatus.connected && req.user && req.user.id) {
      try {
        const skillsArray = Array.isArray(currentSkills)
          ? currentSkills
          : currentSkills.split(',').map(s => s.trim()).filter(Boolean);

        const saved = await CareerRecommendation.create({
          userId: req.user.id,
          profileInput: {
            education,
            currentSkills: skillsArray,
            interests,
            careerGoals,
            preferredRoles,
          },
          recommendedPaths: careerData.recommendedPaths,
        });
        savedRecordId = saved._id;
      } catch (dbErr) {
        console.warn('Could not persist career recommendation:', dbErr.message);
      }
    }

    res.json({
      success: true,
      careerGuidance: careerData,
      savedRecordId,
    });
  } catch (error) {
    console.error('Career guidance error:', error);
    res.status(500).json({
      success: false,
      message: `Failed to generate career recommendations: ${error.message}`,
    });
  }
};
