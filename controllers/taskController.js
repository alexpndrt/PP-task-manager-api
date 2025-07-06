// controllers/taskController.js

import {
  getTasks,
  getTaskById as findTaskById,
  createTask as saveTask,
  updateTask as saveUpdatedTask,
  deleteTask as removeTask,
} from "../models/taskModel.js";

// ✅ Lire toutes les tâches
export const getAllTasks = (req, res) => {
  res.json(getTasks());
};

// ✅ Lire une tâche par ID
export const getTaskById = (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = findTaskById(taskId);

  if (!task) {
    return res.status(404).json({ message: "Tâche non trouvée" });
  }

  res.json(task);
};

// ✅ Créer une nouvelle tâche
export const createTask = (req, res) => {
  const { title, done } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Le titre est obligatoire" });
  }

  const tasks = getTasks();
  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    done: done ?? false,
  };

  saveTask(newTask);
  res.status(201).json(newTask);
};

// ✅ Mettre à jour une tâche
export const updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const tasks = getTasks();

  const index = tasks.findIndex((task) => task.id === taskId);

  if (index === -1) {
    return res.status(404).json({ message: "Tâche non trouvée" });
  }

  const { title, done } = req.body;
  const updatedTask = {
    ...tasks[index],
    title: title ?? tasks[index].title,
    done: done ?? tasks[index].done,
  };

  saveUpdatedTask(index, updatedTask);
  res.json(updatedTask);
};

// ✅ Supprimer une tâche
export const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const tasks = getTasks();

  const index = tasks.findIndex((task) => task.id === taskId);

  if (index === -1) {
    return res.status(404).json({ message: "Tâche non trouvée" });
  }

  const deletedTask = removeTask(index);
  res.json({ message: "Tâche supprimée", deletedTask });
};
