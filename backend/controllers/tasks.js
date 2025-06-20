const TaskManagerTasks = require("../models/tasks");
const createTask = async (req, res) => {
    try {
        const task = await TaskManagerTasks.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}
const getAllTasks = async (req, res) => {
    try {
        const tasks = await TaskManagerTasks.find({});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const getSingleTask = async (req, res) => {
    try {
        const task = await TaskManagerTasks.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}


const updateTask = async (req, res) => {
    try {
        const task = await TaskManagerTasks.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

const deleteTask = async (req, res) => {
    try {
        const task = await TaskManagerTasks.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ msg: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ msg: error });
    }
}


module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask
}
