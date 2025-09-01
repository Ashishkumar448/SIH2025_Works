import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true, 
    trim: true, 
    maxlength: 100 
  },
  description: { 
    type: String, 
    required: true, 
    trim: true, 
    maxlength: 1000 
  },
  category: { 
    type: String, 
    required: true, 
    trim: true,
    enum: [
      'Road and Transportation',
      'Water Supply', 
      'Waste Management',
      'Street Lighting',
      'Drainage and Sewerage',
      'Public Safety',
      'Parks and Recreation',
      'Building and Construction',
      'Noise Pollution',
      'Other'
    ]
  },
  priority: { 
    type: String, 
    required: true, 
    enum: ['low', 'medium', 'high', 'urgent'], 
    default: 'medium' 
  },
  location: {
    address: { type: String, required: true, trim: true },
    coordinates: {  
      type: { type: String, default: 'Point' },
      coordinates: { type: [Number], required: true } // [longitude, latitude]
    }
  },
  contactInfo: {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true }
  },
  photos: [{ type: String }], // store photo URLs or paths
  status: { 
    type: String, 
    enum: ['pending', 'in-progress', 'resolved', 'rejected'], 
    default: 'pending' 
  },
  createdBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  adminComments: [
    {
      comment: String,
      commentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      createdAt: { type: Date, default: Date.now }
    }
  ]
}, {
  timestamps: true
});

// Create geospatial index for location-based queries
issueSchema.index({ 'location.coordinates': '2dsphere' });

export default mongoose.model('Issue', issueSchema);
