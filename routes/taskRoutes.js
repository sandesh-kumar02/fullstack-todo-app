import express from "express";
import {
  addTask,
  createPage,
  dashboard,
  updateTaskController,
  editTaskController,
  deleteTask,
  // deleteTaskController
} from "../controllers/taskcontroller.js";
import { isAuthenticated } from "../middleware/authmiddleware.js";
import { isLoggedin } from "../middleware/authmiddleware.js";
const router = express.Router();

router.get("/task", createPage);
router.post("/task", isAuthenticated, addTask);
router.get("/dashboard", isLoggedin, dashboard);
router.get("/task/:id/edit", isAuthenticated, editTaskController);
router.put("/tasks/:id", isAuthenticated, updateTaskController);
// router.get("/tasks/:id/delete", isAuthenticated, deleteTaskController);
router.delete("/tasks/:id/delete", deleteTask);
export default router;
