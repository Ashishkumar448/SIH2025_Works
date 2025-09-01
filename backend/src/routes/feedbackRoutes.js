import express from 'express';
import {
  createFeedback,
  getUserFeedback,
  getAllFeedback,
  getFeedback,
  updateFeedbackStatus,
  deleteFeedback,
  getFeedbackStats
} from '../controllers/feedbackController.js';

const router = express.Router();

// Feedback routes
router.post('/feedback', createFeedback);
router.get('/user-feedback', getUserFeedback);
router.get('/all-feedback', getAllFeedback);
router.get('/feedback-stats', getFeedbackStats);
router.get('/feedback/:id', getFeedback);
router.patch('/feedback/:id/status', updateFeedbackStatus);
router.delete('/feedback/:id', deleteFeedback);

export default router;
