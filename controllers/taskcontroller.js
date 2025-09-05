import Task from "../models/Task.models.js";
import express from "express";
const router = express();

export const createPage = (req, res) => {
  res.render("createTask");
};

export const addTask = async (req, res) => {
  try {
    const { title, status, description } = req.body;
    const newTask = await new Task({
      title: title,
      status: status,
      description: description,
      user: req.user._id,
    });
    let result = await newTask.save();
    res.redirect("/dashboard");
  } catch (error) {
    console.log(error);
  }
};

export const dashboard = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.render("dashboard", { tasks });
  } catch (error) {
    console.log(error);
    res.redirect("/login");
  }
};

export const updateTaskController = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, status, description } = req.body;
    const task = await Task.findById(taskId);

    if (!task) {
      console.log("Task not found");
      return res.redirect("/dashboard");
    }

    // Step 2: Ownership check
    if (task.user.toString() !== req.user._id.toString()) {
      console.log("Unauthorized access");
      return res.redirect("/dashboard");
    }
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { title, status, description },
      { new: true } // return the updated task
    );
    // Step 4: Redirect to dashboard
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.redirect("/dashboard");
  }
};

export const editTaskController = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.redirect("/dashboard");
  if (task.user.toString() !== req.user._id.toString())
    return res.redirect("/dashboard");

  res.render("editTask", { task });
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send("Task not found");

    if (task.user.toString() !== req.user._id.toString())
      return res.status(403).send("Unauthorized");

    await Task.findByIdAndDelete(req.params.id);
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.redirect("/dashboard");
  }
};

export default router;
