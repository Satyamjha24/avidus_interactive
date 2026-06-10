const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    action: {
      type: String,
      enum: [
        "LOGIN",
        "TASK_CREATED",
        "TASK_UPDATED",
        "TASK_DELETED",
      ],
      required: true,
    },
    description: { type: String, required: true },
    ipAddress: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActivityLog", activityLogSchema);