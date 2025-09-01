import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['general', 'report', 'service', 'platform'],
    default: 'general'
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  category: {
    type: String,
    required: true,
    enum: ['service', 'resolution-quality', 'response-time', 'platform', 'suggestion']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: function() {
      return this.type === 'report';
    }
  },
  relatedIssue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Issue',
    required: function() {
      return this.type === 'report';
    }
  },
  anonymous: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'implemented'],
    default: 'pending'
  },
  adminResponse: {
    message: String,
    respondedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    respondedAt: Date
  }
}, {
  timestamps: true
});

export default mongoose.model('Feedback', feedbackSchema);
