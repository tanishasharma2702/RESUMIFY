import { getGeminiClient, getGeminiStatus } from '../config/gemini.js';
import { getDBStatus } from '../config/db.js';
import { InterviewSession } from '../models/InterviewSession.js';

export const generateQuestions = async (req, res) => {
  const { role = 'Software Engineer', category = 'Technical', difficulty = 'Junior', topics = '' } = req.body;

  const gemini = getGeminiClient();
  if (!gemini) {
    return res.status(503).json({
      success: false,
      message: 'Google Gemini API key is not configured in server/.env. Please configure GEMINI_API_KEY to generate live AI interview questions.',
    });
  }

  try {
    const prompt = `You are a technical interviewer at a top technology company.
Generate 4 realistic, high-quality interview questions for the following candidate parameters:
- Target Job Role: ${role}
- Category: ${category}
- Difficulty Level: ${difficulty}
- Key Topics/Skills to focus on: ${topics || 'Core concepts and problem solving'}

CRITICAL INSTRUCTIONS:
Return STRICTLY valid JSON with no markdown wrapping outside the JSON.
Schema:
{
  "role": "${role}",
  "questions": [
    {
      "id": 1,
      "questionText": "<the interview question>",
      "topic": "<specific sub-topic or skill>",
      "guidance": "<concise advice on what key concepts the interviewer looks for in a winning answer>"
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

    let data;
    try {
      data = JSON.parse(rawText);
    } catch (parseErr) {
      console.error('Failed to parse interview questions JSON:', rawText);
      return res.status(502).json({
        success: false,
        message: 'AI generated an invalid question format. Please retry.',
      });
    }

    res.json({
      success: true,
      questions: data.questions || [],
    });
  } catch (error) {
    console.error('Generate interview questions error:', error);
    res.status(500).json({
      success: false,
      message: `Failed to generate interview questions: ${error.message}`,
    });
  }
};

export const evaluateAnswer = async (req, res) => {
  const { role, questionText, userAnswer, category = 'Technical', difficulty = 'Junior' } = req.body;

  if (!questionText || !userAnswer || userAnswer.trim().length < 10) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both the question and a substantive answer (at least 10 characters).',
    });
  }

  const gemini = getGeminiClient();
  if (!gemini) {
    return res.status(503).json({
      success: false,
      message: 'Google Gemini API key is not configured in server/.env. Please configure GEMINI_API_KEY to evaluate interview answers.',
    });
  }

  try {
    const prompt = `You are an expert interviewer evaluating a candidate's answer.
QUESTION:
"${questionText}"

CANDIDATE ROLE: ${role}
CATEGORY: ${category}
DIFFICULTY: ${difficulty}

CANDIDATE'S SUBMITTED ANSWER:
"""
${userAnswer}
"""

CRITICAL INSTRUCTIONS:
Evaluate this answer honestly and constructively. Do not fabricate scores.
Return STRICTLY valid JSON with no markdown wrapping outside the JSON.
Schema:
{
  "score": <integer 0 to 100 representing answer accuracy and depth>,
  "verdict": <one of "Needs Major Work", "Fair Effort", "Good Answer", "Exceptional">,
  "strengths": [<array of 2 to 3 things the candidate explained well>],
  "weaknesses": [<array of 2 to 3 inaccuracies, vagueness, or gaps>],
  "missingConcepts": [<array of 2 to 4 technical terms or points the candidate missed>],
  "suggestions": [<array of 2 to 3 actionable ways to refine this answer>],
  "modelAnswer": <an exemplary, concise, well-structured response demonstrating high competence>
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

    let evaluationData;
    try {
      evaluationData = JSON.parse(rawText);
    } catch (parseErr) {
      console.error('Failed to parse answer evaluation JSON:', rawText);
      return res.status(502).json({
        success: false,
        message: 'AI generated an invalid evaluation response. Please retry.',
      });
    }

    // Save to MongoDB if authenticated
    let savedRecordId = null;
    const dbStatus = getDBStatus();
    if (dbStatus.connected && req.user && req.user.id) {
      try {
        const saved = await InterviewSession.create({
          userId: req.user.id,
          role,
          category,
          difficulty,
          questions: [
            {
              questionText,
              userAnswer,
              evaluation: evaluationData,
              answeredAt: new Date(),
            },
          ],
        });
        savedRecordId = saved._id;
      } catch (dbErr) {
        console.warn('Could not persist interview session:', dbErr.message);
      }
    }

    res.json({
      success: true,
      evaluation: evaluationData,
      savedRecordId,
    });
  } catch (error) {
    console.error('Evaluate interview answer error:', error);
    res.status(500).json({
      success: false,
      message: `Failed to evaluate answer: ${error.message}`,
    });
  }
};
