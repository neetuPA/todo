
const Task=require("../model/taskModel")

const mongoose = require("mongoose");
// Create a new task
exports.createTask = async (req, res) => {
    try {
        const { title, date, status } = req.body;
        const task = await Task.create({ title, date, status });
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update task
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, date } = req.body;
        const task = await Task.findOneAndUpdate(
            { id },
            { title, date },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
           if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
        const task = await Task.findOneAndDelete({ id });
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const allTasks = await Task.find();
    console.log("All IDs in DB:");
    allTasks.forEach(t => console.log(t._id.toString()));

    console.log("ID requested:", id);

    const task = await Task.findOne({ _id: id });

    console.log("Task found:", task);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// // Get Task by Id
// exports.getTaskById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const task = await Task.findOne({ id });
//         if (!task) {
//             return res.status(404).json({ message: "Task not found" });
//         }
//         res.status(200).json(task);
//     } catch (error) {
//         res.status(400).json({ message: error.message });
//     }
// };
