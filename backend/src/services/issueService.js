import Issue from '../models/Issue.js';

class IssueService {

  static async createIssue(data) {
    const issue = new Issue(data);
    return await issue.save();
  }

  static async getIssuesByUser(userId, filters = {}) {
    const query = { createdBy: userId };

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.priority) {
      query.priority = filters.priority;
    }

    return await Issue.find(query)
      .populate('createdBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
  }

  static async getAllIssues(filters = {}) {
    const query = {};

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.priority) {
      query.priority = filters.priority;
    }

    // For map view - get all issues with location
    return await Issue.find(query)
      .populate('createdBy', 'firstName lastName email')
      .sort({ createdAt: -1 });
  }

  static async getIssueById(issueId, userId = null) {
    const query = { _id: issueId };
    
    // If userId is provided, ensure user can only access their own issues
    if (userId) {
      query.createdBy = userId;
    }

    return await Issue.findOne(query)
      .populate('createdBy', 'firstName lastName email')
      .populate('assignedTo', 'firstName lastName email');
  }

  static async updateIssueStatus(issueId, status, userId) {
    return await Issue.findOneAndUpdate(
      { _id: issueId, createdBy: userId },
      { status, updatedAt: Date.now() },
      { new: true }
    );
  }

  static async deleteIssue(issueId, userId) {
    return await Issue.findOneAndDelete({ _id: issueId, createdBy: userId });
  }

  static async getUserStats(userId) {
    const totalReports = await Issue.countDocuments({ createdBy: userId });
    const pendingReports = await Issue.countDocuments({ createdBy: userId, status: 'pending' });
    const resolvedReports = await Issue.countDocuments({ createdBy: userId, status: 'resolved' });
    const inProgressReports = await Issue.countDocuments({ createdBy: userId, status: 'in-progress' });

    return {
      totalReports,
      pendingReports,
      resolvedReports,
      inProgressReports
    };
  }

  static async getNearbyIssues(longitude, latitude, maxDistance = 5000) {
    return await Issue.find({
      'location.coordinates': {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: maxDistance
        }
      }
    }).populate('createdBy', 'firstName lastName');
  }

}

export default IssueService;
