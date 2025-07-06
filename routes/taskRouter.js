// routes/taskRoutes.js

import express from "express";
import {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";

import {
  validateTask,
  handleValidationErrors,
} from "../middlewares/taskValidator.js";

const router = express.Router();

router.get("/tasks", getAllTasks);
router.get("/tasks/:id", getTaskById);
router.post("/tasks", validateTask, handleValidationErrors, createTask);
router.put("/tasks/:id", validateTask, handleValidationErrors, updateTask);
router.delete("/tasks/:id", deleteTask);

export default router;
