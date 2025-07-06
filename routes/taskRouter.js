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

import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/tasks", verifyToken, getAllTasks);
router.get("/tasks/:id", verifyToken, getTaskById);
router.post(
  "/tasks",
  verifyToken,
  validateTask,
  handleValidationErrors,
  createTask
);
router.put(
  "/tasks/:id",
  verifyToken,
  validateTask,
  handleValidationErrors,
  updateTask
);
router.delete("/tasks/:id", verifyToken, deleteTask);

export default router;
