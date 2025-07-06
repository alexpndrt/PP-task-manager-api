import { Task } from "../models/taskModel.js";

// ✅ Lire toutes les tâches (GET /tasks)
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ✅ Lire une tâche par ID (GET /tasks/:id)
export const getTaskById = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ✅ Créer une nouvelle tâche (POST /tasks)
export const createTask = async (req, res) => {
  try {
    const { title, done } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Le titre est obligatoire" });
    }

    const newTask = await Task.create({
      title,
      done: done ?? false
    });

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ✅ Mettre à jour une tâche (PUT /tasks/:id)
export const updateTask = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const { title, done } = req.body;

    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    task.title = title ?? task.title;
    task.done = done ?? task.done;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// ✅ Supprimer une tâche (DELETE /tasks/:id)
export const deleteTask = async (req, res) => {
  try {
    const taskId = parseInt(req.params.id);
    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({ message: "Tâche non trouvée" });
    }

    await task.destroy();

    res.json({ message: "Tâche supprimée", deletedTask: task });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};
