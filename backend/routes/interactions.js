import express from 'express';
import { recordInteraction, getAnalytics, healthCheck } from '../controllers/interactionController.js';

const router = express.Router();

router.get('/health', healthCheck);
router.post('/apology/interaction', recordInteraction);
router.get('/apology/analytics', getAnalytics);

export default router;
