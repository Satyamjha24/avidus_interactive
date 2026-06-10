const ActivityLog = require("../models/ActivityLog");

// @desc    Get all activity logs
// @route   GET /api/activity
// @access  Admin
const getAllActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get activity logs of a specific user
// @route   GET /api/activity/user/:userId
// @access  Admin
const getUserActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find({ user: req.params.userId })
      .populate("user", "name email role")
      .sort({ createdAt: -1 });

    if (!logs.length) {
      return res.status(404).json({ message: "No activity found for this user" });
    }

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllActivityLogs, getUserActivityLogs };