import express from 'express';
import { analyzeResume } from '../controllers/analyzerController.js';
import { uploadResume } from '../middleware/upload.js';
import { optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/analyze', optionalAuth, uploadResume.single('resume'), analyzeResume);

export default router;
