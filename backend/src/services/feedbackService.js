import Feedback from '../models/Feedback.js';

class FeedbackService {

  static async createFeedback(data) {
    const feedback = new Feedback(data);
    return await feedback.save();
  }

  static async getFeedbackByUser(userId) {
    return await Feedback.find({ createdBy: userId })
      .populate('relatedIssue', 'title status')
      .sort({ createdAt: -1 });
  }

  static async getAllFeedback(filters = {}) {
    const query = {};

    if (filters.type) {
      query.type = filters.type;
    }

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.status) {
      query.status = filters.status;
    }

    return await Feedback.find(query)
      .populate('createdBy', 'firstName lastName email')
      .populate('relatedIssue', 'title status')
      .sort({ createdAt: -1 });
  }

  static async getFeedbackById(feedbackId, userId = null) {
    const query = { _id: feedbackId };
    
    if (userId) {
      query.createdBy = userId;
    }

    return await Feedback.findOne(query)
      .populate('createdBy', 'firstName lastName email')
      .populate('relatedIssue', 'title status');
  }

  static async updateFeedbackStatus(feedbackId, status, adminResponse = null) {
    const updateData = { status, updatedAt: Date.now() };
    
    if (adminResponse) {
      updateData.adminResponse = adminResponse;
    }

    return await Feedback.findByIdAndUpdate(feedbackId, updateData, { new: true });
  }

  static async deleteFeedback(feedbackId, userId) {
    return await Feedback.findOneAndDelete({ _id: feedbackId, createdBy: userId });
  }

  static async getFeedbackStats() {
    const totalFeedback = await Feedback.countDocuments();
    const pendingFeedback = await Feedback.countDocuments({ status: 'pending' });
    const reviewedFeedback = await Feedback.countDocuments({ status: 'reviewed' });
    const implementedFeedback = await Feedback.countDocuments({ status: 'implemented' });

    const averageRating = await Feedback.aggregate([
      { $match: { rating: { $exists: true } } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);

    return {
      totalFeedback,
      pendingFeedback,
      reviewedFeedback,
      implementedFeedback,
      averageRating: averageRating.length > 0 ? averageRating[0].avgRating : 0
    };
  }

}

export default FeedbackService;
