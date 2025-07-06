// app.js
// On importe express (le framework) et dotenv (les variables d'environnement)
import express from "express";
import dotenv from "dotenv";
import taskRoutes from './routes/taskRoutes.js';

// On configure dotenv pour lire les variables du fichier .env
dotenv.config();

// On initialise l'application Express
const app = express();

// Middleware pour parser automatiquement les requêtes JSON
app.use(express.json());

// Brancher les routes avec préfixe /api
app.use('/api', taskRoutes);

// Création d'une route GET sur la racine (http://localhost:3001/)
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API de gestion de tâches");
});

// On récupère le port défini dans .env ou 3000 par défaut
const PORT = process.env.PORT || 3000;

// On lance le serveur et on affiche un message en console
app.listen(PORT, () =>
  console.log(`Serveur lancé sur http://localhost:${PORT}`)
);
