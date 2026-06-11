const express = require("express");
const router = express.Router();
const {
  getAllActivityLogs,
  getUserActivityLogs,
} = require("../controllers/activityController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

router.use(protect, adminOnly);

router.get("/", getAllActivityLogs);
router.get("/user/:userId", getUserActivityLogs);

module.exports = router;