import IssueService from '../services/issueService.js';
import multer from 'multer';
import path from 'path';
import fs from "fs";

const uploadDir = 'uploads/issues';
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for photo uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/issues/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

export const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export const createIssue = async (req, res) => {
  try {
    console.log('Received body:', req.body);
    console.log('Received files:', req.files);
    console.log('req.user:', req.user);
    if (!req.user || !req.user.userId) {
      return res.status(401).json({ 
        success: false, 
        message: 'Authentication required' 
      });
    }
    const userId = req.user.userId;
    const {
      title,
      description,
      category,
      priority,
      address,
      latitude,
      longitude,
      contactName,
      contactPhone,
      contactEmail
    } = req.body;

    console.log('Title:', title);
console.log('Description:', description);
console.log('Category:', category);
console.log('Priority:', priority);
console.log('Address:', address);
console.log('Coordinates:', { latitude, longitude });
console.log('Contact Info:', { contactName, contactPhone, contactEmail });


// Validate required fields
    if (!title || !description || !category || !address || !contactName || !contactPhone) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }


    // Handle uploaded photos
    const photos = req.files ? req.files.map(file => file.path) : [];

    const data = {
      title,
      description,
      category,
      priority: priority || 'medium',
      location: {
        address,
        coordinates: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        }
      },
      contactInfo: {
        name: contactName,
        phone: contactPhone,
        email: contactEmail || ' '
      },
      photos,
      createdBy: userId
    };

    console.log('Issue data to save:', data);
    const issue = await IssueService.createIssue(data);
    res.status(201).json({ 
      success: true, 
      message: 'Issue reported successfully', 
      issue 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' ,
        error: process.env.NODE_ENV === 'development' ? error.message : 'Server error'
    });
  }
};

export const getUserIssues = async (req, res) => {
  try {
    const userId = req.user.userId;
    const filters = {
      status: req.query.status,
      category: req.query.category,
      priority: req.query.priority
    };

    const issues = await IssueService.getIssuesByUser(userId, filters);
    res.json({ success: true, issues });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

export const getAllIssues = async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      category: req.query.category,
      priority: req.query.priority
    };

    const issues = await IssueService.getAllIssues(filters);
    res.json({ success: true, issues });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

export const getIssue = async (req, res) => {
  try {
    const userId = req.user.userId;
    const issueId = req.params.id;
    
    const issue = await IssueService.getIssueById(issueId, userId);
    if (!issue) {
      return res.status(404).json({ 
        success: false, 
        message: 'Issue not found' 
      });
    }
    
    res.json({ success: true, issue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

export const updateIssueStatus = async (req, res) => {
  try {
    const userId = req.user.userId;
    const issueId = req.params.id;
    const { status } = req.body;

    if (!['pending', 'in-progress', 'resolved', 'rejected'].includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid status value' 
      });
    }

    const issue = await IssueService.updateIssueStatus(issueId, status, userId);
    if (!issue) {
      return res.status(404).json({ 
        success: false, 
        message: 'Issue not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Issue status updated', 
      issue 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

export const deleteIssue = async (req, res) => {
  try {
    const userId = req.user.userId;
    const issueId = req.params.id;
    
    const issue = await IssueService.deleteIssue(issueId, userId);
    if (!issue) {
      return res.status(404).json({ 
        success: false, 
        message: 'Issue not found' 
      });
    }
    
    res.json({ 
      success: true, 
      message: 'Issue deleted successfully' 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

export const getUserStats = async (req, res) => {
  try {
    const userId = req.user.userId;
    const stats = await IssueService.getUserStats(userId);
    res.json({ success: true, stats });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};

export const getNearbyIssues = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance } = req.query;
    
    if (!longitude || !latitude) {
      return res.status(400).json({ 
        success: false, 
        message: 'Longitude and latitude are required' 
      });
    }

    const issues = await IssueService.getNearbyIssues(
      parseFloat(longitude), 
      parseFloat(latitude), 
      parseInt(maxDistance) || 5000
    );
    
    res.json({ success: true, issues });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Internal server error' 
    });
  }
};
