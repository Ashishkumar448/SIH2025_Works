import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        default: ''
    },
    category: {
        type: String,
        required: true,
        enum: [
            'slums',
            'potholes',
            'garbage',
            'open drains',
            'broken streetlights',
            'stray animals',
            'polluted water bodies',
            'air pollution'
        ]
    },
    images: [{
        type: String
    }],
    location: {
        type: {
            lat: { type: Number },
            lng: { type: Number },
            address: { type: String }
        },
        default: null
    },
}, { timestamps: true });

const Issue = mongoose.model('Issue', issueSchema);
export default Issue;
