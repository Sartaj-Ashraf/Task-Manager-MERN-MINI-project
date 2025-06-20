const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title"],
      trim: true,
      lowercase: true,
      maxlength: [400, "Title cannot be more than 400 characters"],
      minlength: [3, "Title must be at least 3 characters long"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("TaskManagerTasks", taskSchema);
