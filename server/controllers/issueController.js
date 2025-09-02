// Admin: Get all issues, categorize, and analyze
export const adminIssueAnalysis = async (req, res) => {
    try {
        // Only admins can access (middleware enforced)
        const categories = [
            "slums",
            "potholes",
            "garbage",
            "open drains",
            "broken streetlights",
            "stray animals",
            "polluted water bodies",
            "air pollution"
        ];

    // Fetch all issues (user field will be MongoDB ID)
    const issues = await Issue.find({});

        // Categorize issues
        const categorized = {};
        categories.forEach(cat => {
            categorized[cat] = [];
        });
        const uncategorized = [];

        issues.forEach(issue => {
            if (issue.category && categories.includes(issue.category)) {
                categorized[issue.category].push(issue);
            } else {
                uncategorized.push(issue);
            }
        });

        // Analysis: count per category
        const analysis = {};
        categories.forEach(cat => {
            analysis[cat] = categorized[cat].length;
        });
        analysis["uncategorized"] = uncategorized.length;

        res.status(200).json({
            totalIssues: issues.length,
            analysis,
            categorized,
            uncategorized
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

import path from 'path';
import fs from 'fs';
import Issue from '../models/issueModel.js';

// Controller to handle issue creation
export const createIssue = async (req, res) => {
    try {
        // Only authenticated users can access (assume middleware already applied)
        const userId = req.user && req.user.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

    const { title, description, category, location } = req.body;
        const allowedCategories = [
            'slums',
            'potholes',
            'garbage',
            'open drains',
            'broken streetlights',
            'stray animals',
            'polluted water bodies',
            'air pollution'
        ];
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }
        if (!category || !allowedCategories.includes(category)) {
            return res.status(400).json({ message: 'Valid category is required' });
        }

        // Handle images (max 3)
        let images = [];
        if (req.files && req.files.length > 0) {
            if (req.files.length > 3) {
                return res.status(400).json({ message: 'Maximum 3 images allowed' });
            }
            images = req.files.map(file => file.filename);
        }

        let parsedLocation = null;
        if (location) {
            try {
                if (typeof location === 'string') {
                    parsedLocation = JSON.parse(location);
                } else {
                    parsedLocation = location;
                }
                if (
                    typeof parsedLocation.lat !== 'number' ||
                    typeof parsedLocation.lng !== 'number' ||
                    !parsedLocation.address
                ) {
                    return res.status(400).json({ message: 'Invalid location format' });
                }
            } catch (e) {
                return res.status(400).json({ message: 'Invalid location data' });
            }
        }

        const newIssue = new Issue({
            user: userId,
            title,
            description: description || '',
            category,
            images,
            location: parsedLocation
        });
        await newIssue.save();
        res.status(201).json({ message: 'Issue created successfully', issue: newIssue });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get all issues for authenticated user
export const getIssues = async (req, res) => {
    try {
        const userId = req.user && req.user.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const issues = await Issue.find({ user: userId });
        res.status(200).json({ issues });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update an issue (title, description, images)
export const updateIssue = async (req, res) => {
    try {
        const userId = req.user && req.user.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { id } = req.params;
        const { title, description } = req.body;
        let updateData = {};
        if (title) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        if (req.files && req.files.length > 0) {
            if (req.files.length > 3) {
                return res.status(400).json({ message: 'Maximum 3 images allowed' });
            }
            updateData.images = req.files.map(file => file.filename);
        }
        const updatedIssue = await Issue.findOneAndUpdate(
            { _id: id, user: userId },
            updateData,
            { new: true }
        );
        if (!updatedIssue) {
            return res.status(404).json({ message: 'Issue not found' });
        }
        res.status(200).json({ message: 'Issue updated', issue: updatedIssue });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete an issue
export const deleteIssue = async (req, res) => {
    try {
        const userId = req.user && req.user.id;
        if (!userId) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { id } = req.params;
        const deleted = await Issue.findOneAndDelete({ _id: id, user: userId });
        if (!deleted) {
            return res.status(404).json({ message: 'Issue not found' });
        }
        res.status(200).json({ message: 'Issue deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
