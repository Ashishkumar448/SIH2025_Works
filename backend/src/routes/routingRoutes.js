import express from 'express';
import issueRoutes from './issueRoutes.js';
import feedbackRoutes from './feedbackRoutes.js';
import { identifier } from '../utils/roles.js'; // Your auth middleware

const router = express.Router();

// Apply authentication middleware to all report routes
// router.use(identifier);

// Issue routes
router.use('/report', identifier,issueRoutes);

// Feedback routes  
router.use('/', identifier,feedbackRoutes);

export default router;
