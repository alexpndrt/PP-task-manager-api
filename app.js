// app.js

// ✅ Importation des modules nécessaires
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import taskRouter from "./routes/taskRouter.js";
import { logger } from "./middlewares/logger.js";
import { testConnection, sequelize } from "./models/index.js";

// ✅ Chargement des variables d'environnement
dotenv.config();

// ✅ Initialisation de l'application Express
const app = express();

// ✅ Active CORS pour toutes les origines (dev uniquement)
app.use(cors());

// ✅ Middleware pour lire le JSON dans les requêtes
app.use(express.json());

// ✅ Middleware Logger perso (affiche les requêtes dans la console)
app.use(logger);

// ✅ Définition des routes principales avec préfixe
app.use("/api", taskRouter);

// ✅ Route racine
app.get("/", (req, res) => {
  res.send("Bienvenue sur l'API de gestion de tâches");
});

// ✅ Récupération du port dans .env ou utilisation de 3000 par défaut
const PORT = process.env.PORT || 3000;

// ✅ Démarrage du serveur
app.listen(PORT, async () => {
  console.log(`✅ Serveur lancé sur http://localhost:${PORT}`);

  // 🔗 Test de connexion à la base au démarrage du serveur
  await testConnection();

  // 🛑 Synchronisation des modèles (à faire temporairement ici si pas encore fait)
  try {
    await sequelize.sync();
    console.log("✅ Modèles synchronisés avec la base de données");
  } catch (error) {
    console.error("❌ Erreur de synchronisation :", error);
  }
});
