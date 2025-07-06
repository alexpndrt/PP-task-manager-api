// controllers/taskController.js

// On simule pour l'instant une liste de tâches
const tasks = [
  { id: 1, title: 'Apprendre Node.js', done: false },
  { id: 2, title: 'Créer une API REST', done: true },
];

// Fonction contrôleur pour obtenir toutes les tâches
export const getAllTasks = (req, res) => {
  res.json(tasks);
};
