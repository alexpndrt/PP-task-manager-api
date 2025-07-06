// routes/taskRoutes.js

import express from "express";
import { getAllTasks } from "../controllers/taskController.js";

const router = express.Router();

// Route GET /api/tasks → affiche toutes les tâches
router.get("/tasks", getAllTasks);

export default router;
