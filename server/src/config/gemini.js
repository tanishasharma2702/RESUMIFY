import 'dotenv/config';
import { GoogleGenAI } from '@google/genai';

let geminiClient = null;

// Primary high-speed flash-lite model verified for current API access
export const GEMINI_MODEL = 'gemini-3.1-flash-lite';

export const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === '') {
    return null;
  }

  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey: apiKey.trim() });
  }

  return geminiClient;
};

export const getGeminiStatus = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  return {
    configured: Boolean(apiKey && apiKey.trim() !== ''),
    model: GEMINI_MODEL,
  };
};
