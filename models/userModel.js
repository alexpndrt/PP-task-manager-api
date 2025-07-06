import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";

export const User = sequelize.define(
  "User",
  {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "users", // nom réel de la table
    timestamps: true, // createdAt + updatedAt
  }
);
