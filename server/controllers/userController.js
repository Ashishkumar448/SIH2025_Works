import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) {
      return res.json({ success: false, message: "Unauthorized" });
    }
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({
      success: true,
      userData: {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
