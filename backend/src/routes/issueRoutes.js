import express from 'express';
import {
  createIssue,
  getUserIssues,
  getAllIssues,
  getIssue,
  updateIssueStatus,
  deleteIssue,
  getUserStats,
  getNearbyIssues,
  upload
} from '../controllers/issueController.js';

const router = express.Router();

// Issue routes
router.post('/report-issue', upload.array('photos', 5), createIssue);
router.get('/user-issues', getUserIssues);
router.get('/all-issues', getAllIssues);
router.get('/nearby-issues', getNearbyIssues);
router.get('/user-stats', getUserStats);
router.get('/:id', getIssue);
router.patch('/:id/status', updateIssueStatus);
router.delete('/:id', deleteIssue);

export default router;
