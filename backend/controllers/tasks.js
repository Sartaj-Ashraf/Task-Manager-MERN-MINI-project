const TaskManagerTasks = require("../models/tasks");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../middleware/custom-errors");

const createTask = asyncWrapper(async (req, res) => {
  const task = await TaskManagerTasks.create(req.body);
  res.status(201).json(task);
});
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await TaskManagerTasks.find({});
  res.status(200).json(tasks);
});

const getSingleTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await TaskManagerTasks.findOne({ _id: taskID });
  if (!task) {
    return createCustomError("Task not found",404);
  }
  res.status(200).json(task);
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
    const task = await TaskManagerTasks.findOneAndUpdate(
      { _id: taskID },
      req.body,
      { new: true, runValidators: true }
    );
    if (!task) {
      return createCustomError("Task not found",404);
    }
    res.status(200).json(task);
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
    const task = await TaskManagerTasks.findOneAndDelete({ _id: taskID });
    if (!task) {
      return createCustomError("Task not found",404);
    }
    res.status(200).json(task);
});

module.exports = {
  getAllTasks,
  createTask,
  getSingleTask,
  updateTask,
  deleteTask,
};
