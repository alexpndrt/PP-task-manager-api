import { User } from "../models/userModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

// 🔐 Clé secrète pour le JWT (à mettre dans .env plus tard)
const JWT_SECRET = process.env.JWT_SECRET || 'vraiment-tres-secret';

// ✅ Route : Inscription
export const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    // Hasher le mot de passe avec argon2
    const hashedPassword = await argon2.hash(password);

    // Créer l'utilisateur
    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Utilisateur créé avec succès !" });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// ✅ Route : Connexion
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Chercher l'utilisateur par email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect." });
    }

    // Vérifier le mot de passe avec argon2
    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect." });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
