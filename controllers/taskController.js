// controllers/taskController.js

// ===============================
// 📝 Simuler une base de données
// ===============================
let tasks = [
  { id: 1, title: 'Apprendre Node.js', done: false },
  { id: 2, title: 'Créer une API REST', done: true },
];

// ========================================
// 📋 Lire TOUTES les tâches (GET /tasks)
// ========================================
export const getAllTasks = (req, res) => {
  res.json(tasks); // On renvoie simplement le tableau entier
};

// ==================================================
// 🔍 Lire UNE tâche par ID (GET /tasks/:id)
// ==================================================
export const getTaskById = (req, res) => {
  // On récupère l'id dans l'URL et on le convertit en nombre
  const taskId = parseInt(req.params.id);

  // On cherche la tâche dont l'id correspond
  const task = tasks.find(function (t) {
    return t.id === taskId;
  });

  // Si la tâche n'existe pas → erreur 404
  if (!task) {
    return res.status(404).json({ message: 'Tâche non trouvée' });
  }

  // Sinon, on retourne la tâche trouvée
  res.json(task);
};

// ================================================
// ➕ Créer une nouvelle tâche (POST /tasks)
// ================================================
export const createTask = (req, res) => {
  // On récupère les données envoyées par l'utilisateur
  const { title, done } = req.body;

  // Sécurité : vérifier que le titre est présent
  if (!title) {
    return res.status(400).json({ message: 'Le titre est obligatoire' });
  }

  // On crée un nouvel objet tâche
  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1, // Id auto-incrémenté
    title: title,
    done: done ?? false // Si "done" n'est pas envoyé → false par défaut
  };

  // On ajoute la nouvelle tâche dans le tableau
  tasks.push(newTask);

  // On répond avec la tâche créée
  res.status(201).json(newTask);
};


// ======================================================
// ✏️ Modifier une tâche existante (PUT /tasks/:id)
// ======================================================
export const updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);

  // On cherche l'index de la tâche
  const taskIndex = tasks.findIndex(function (t) {
    return t.id === taskId;
  });

  // Si pas trouvée → erreur
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Tâche non trouvée' });
  }

  // Récupérer les nouvelles données
  const { title, done } = req.body;

  // Modifier la tâche en gardant les anciennes valeurs si non précisées
  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title ?? tasks[taskIndex].title,
    done: done ?? tasks[taskIndex].done
  };

  res.json(tasks[taskIndex]);
};

// =======================================================
// 🗑 Supprimer une tâche (DELETE /tasks/:id)
// =======================================================
export const deleteTask = (req, res) => {
  const taskId = parseInt(req.params.id);

  // Trouver l'index
  const taskIndex = tasks.findIndex(function (t) {
    return t.id === taskId;
  });

  // Si pas trouvée
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Tâche non trouvée' });
  }

  // Supprimer la tâche avec splice
  const deletedTask = tasks.splice(taskIndex, 1);

  res.json({ message: 'Tâche supprimée', deletedTask });
};