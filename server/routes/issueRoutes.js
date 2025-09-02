import express from "express";
import userAuth from "../middleware/userAuth.js";
import multer from "multer";
import { createIssue, getIssues, updateIssue, deleteIssue } from "../controllers/issueController.js";

const issueRouter = express.Router();

// Multer config for image upload (max 3 images, only images)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Make sure this folder exists or handle error
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};
const upload = multer({
    storage,
    fileFilter,
    limits: { files: 3, fileSize: 5 * 1024 * 1024 } // 5MB per file
});

// Create Issue

issueRouter.post("/", userAuth, upload.array('images', 3), createIssue);
// Get Issues
issueRouter.get("/", userAuth, getIssues);

// Update Issue
issueRouter.put("/:id", userAuth, upload.array('images', 3), updateIssue);
// Delete Issue
issueRouter.delete("/:id", userAuth, deleteIssue);

// Admin: Get all issues with analysis (protected)
import { adminIssueAnalysis } from "../controllers/issueController.js";
import adminAuth from "../middleware/adminAuth.js";
issueRouter.get("/admin/analysis", userAuth, adminAuth, adminIssueAnalysis);

export default issueRouter;
