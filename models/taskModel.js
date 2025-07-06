// models/taskModel.js

// ✅ Notre "base de données" en mémoire pour l'instant
let tasks = [
  { id: 1, title: 'Apprendre Node.js', done: false },
  { id: 2, title: 'Créer une API REST', done: true },
];

// ✅ Lire toutes les tâches
export const getTasks = () => tasks;

// ✅ Lire une tâche par ID
export const getTaskById = (id) => {
  return tasks.find(task => task.id === id);
};

// ✅ Créer une nouvelle tâche
export const createTask = (task) => {
  tasks.push(task);
  return task;
};

// ✅ Mettre à jour une tâche (par index dans le tableau)
export const updateTask = (index, updatedTask) => {
  tasks[index] = updatedTask;
  return updatedTask;
};

// ✅ Supprimer une tâche (par index)
export const deleteTask = (index) => {
  const deleted = tasks.splice(index, 1);
  return deleted;
};
