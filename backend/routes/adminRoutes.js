const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  updateUserStatus,
  getAllTasks,
  deleteAnyTask,
  getAnalytics,
} = require("../controllers/adminController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");

router.use(protect, adminOnly);

router.get("/analytics", getAnalytics);

router.route("/users").get(getAllUsers);
router.route("/users/:id").delete(deleteUser);
router.patch("/users/:id/status", updateUserStatus);

router.route("/tasks").get(getAllTasks);
router.route("/tasks/:id").delete(deleteAnyTask);

module.exports = router;