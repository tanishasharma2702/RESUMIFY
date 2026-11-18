import express from 'express';
import { generateQuestions, evaluateAnswer } from '../controllers/interviewController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/generate', generateQuestions);
router.post('/evaluate', optionalAuth, evaluateAnswer);

export default router;
