import express from 'express';
import { enhanceResumeText, saveResume, getSavedResume } from '../controllers/resumeController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/enhance', enhanceResumeText);
router.post('/save', requireAuth, saveResume);
router.get('/my-resume', requireAuth, getSavedResume);

export default router;
