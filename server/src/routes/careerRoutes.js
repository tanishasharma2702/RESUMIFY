import express from 'express';
import { getCareerRecommendations } from '../controllers/careerController.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/recommend', optionalAuth, getCareerRecommendations);

export default router;
