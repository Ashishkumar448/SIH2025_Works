import FeedbackService from '../services/feedbackService.js';

export const createFeedback = async (req, res) => {
  try {
    const userId = req.user.userId;
    const {
      type,
      title,
      message,
      category,
      rating,
      relatedIssue,
      anonymous
    } = req.body;

    const data = {
      type: type || 'general',
      title,
      message,
      category,
      rating: type === 'report' ? rating : undefined,
      relatedIssue: type === 'report' ? relatedIssue : undefined,
      anonymous: anonymous || false,
      createdBy: userId
    };

    const feedback = await FeedbackService.createFeedback(data);
    res.status(201).json({ 
      success: true, 
      message: 'Feedback submitted successfully', 
      feedback 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

export const getUserFeedback = async (req, res) => {
  try {
    const userId = req.user.userId;
    const feedback = await FeedbackService.getFeedbackByUser(userId);
    res.json({ success: true, feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

export const getAllFeedback = async (req, res) => {
  try {
    const filters = {
      type: req.query.type,
      category: req.query.category,
      status: req.query.status
    };

    const feedback = await FeedbackService.getAllFeedback(filters);
    res.json({ success: true, feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

export const getFeedback = async (req, res) => {
  try {
    const userId = req.user.userId;
    const feedbackId = req.params.id;
    
    const feedback = await FeedbackService.getFeedbackById(feedbackId, userId);
    if (!feedback) {
      return res.status(404).json({ 
        success: false, 
        message: 'Feedback not found' 
      });
    }
    
    res.json({ success: true, feedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

export const updateFeedbackStatus = async (req, res) => {
  try {
    const feedbackId = req.params.id;
    const { status, adminResponse } = req.body;

    if (!['pending', 'reviewed', 'implemented'].includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status value' 
      });
    }

    const feedback = await FeedbackService.updateFeedbackStatus(
      feedbackId, 
      status, 
      adminResponse
    );
    
    if (!feedback) {
      return res.status(404).json({ 
        success: false, 
        message: 'Feedback not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Feedback status updated', 
      feedback 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

export const deleteFeedback = async (req, res) => {
  try {
    const userId = req.user.userId;
    const feedbackId = req.params.id;
    
    const feedback = await FeedbackService.deleteFeedback(feedbackId, userId);
    if (!feedback) {
      return res.status(404).json({ 
        success: false, 
        message: 'Feedback not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Feedback deleted successfully' 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

export const getFeedbackStats = async (req, res) => {
  try {
    const stats = await FeedbackService.getFeedbackStats();
    res.json({ success: true, stats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};
