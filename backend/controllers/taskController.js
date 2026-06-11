const Task = require("../models/Task");
const ActivityLog = require("../models/ActivityLog");

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Protected
const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Task title is required" });
    }

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate: dueDate || null,
      createdBy: req.user._id,
    });

    await ActivityLog.create({
      user: req.user._id,
      action: "TASK_CREATED",
      description: `${req.user.name} created task "${task.title}"`,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all tasks of logged in user
// @route   GET /api/tasks
// @access  Protected
const getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
// @access  Protected
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update own task
// @route   PUT /api/tasks/:id
// @access  Protected
const updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const { title, description, status, priority, dueDate } = req.body;

    task.title = title || task.title;
    task.description = description ?? task.description;
    task.status = status || task.status;
    task.priority = priority || task.priority;
    task.dueDate = dueDate !== undefined ? dueDate : task.dueDate;

    const updatedTask = await task.save();

    await ActivityLog.create({
      user: req.user._id,
      action: "TASK_UPDATED",
      description: `${req.user.name} updated task "${updatedTask.title}"`,
    });

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete own task
// @route   DELETE /api/tasks/:id
// @access  Protected
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      createdBy: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    const taskTitle = task.title;

    await task.deleteOne();

    await ActivityLog.create({
      user: req.user._id,
      action: "TASK_DELETED",
      description: `${req.user.name} deleted task "${taskTitle}"`,
    });

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTask, getMyTasks, getTaskById, updateTask, deleteTask };