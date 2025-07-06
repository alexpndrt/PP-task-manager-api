import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

// ✅ Définition du modèle Task
export const Task = sequelize.define(
  "Task",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    done: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "tasks", // (optionnel) force le nom de la table au pluriel
    timestamps: true, // (optionnel) ajoute createdAt / updatedAt
  }
);

// ❌ Ne PAS faire de .sync() directement dans le modèle
// Le .sync() sera appelé UNE SEULE FOIS dans app.js après testConnection()
