// app.js
//  1️⃣ On importe express (le framework) et dotenv (les variables d'environnement)
import express from "express";
import dotenv from "dotenv";

// 2️⃣ On configure dotenv pour lire les variables du fichier .env
dotenv.config();

// 3️⃣ On initialise l'application Express
const app = express();

// 4️⃣ Middleware pour parser automatiquement les requêtes JSON
app.use(express.json());

// 5️⃣ Création d'une route GET sur la racine (http://localhost:3001/)
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API de gestion de tâches");
});

// 6️⃣ On récupère le port défini dans .env ou 3000 par défaut
const PORT = process.env.PORT || 3000;

// 7️⃣ On lance le serveur et on affiche un message en console
app.listen(PORT, () =>
  console.log(`Serveur lancé sur http://localhost:${PORT}`)
);
