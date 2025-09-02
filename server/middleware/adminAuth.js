import userModel from "../models/userModel.js";

const adminAuth = async (req, res, next) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await userModel.findById(userId);
    if (!user || !user.isAdmin) {
      return res.status(403).json({ message: "Forbidden: Admins only" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export default adminAuth;