import jwt from 'jsonwebtoken';

// 🔐 Clé secrète pour vérifier le token (à sécuriser dans .env)
const JWT_SECRET = process.env.JWT_SECRET || 'vraiment-tres-secret';

// ✅ Middleware pour vérifier le token JWT
export const verifyToken = (req, res, next) => {
  // On récupère le header Authorization
  const authHeader = req.headers.authorization;

  // Si le header est manquant ou mal formé → refus
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Accès refusé : token manquant' });
  }

  // On récupère le token (après le mot 'Bearer ')
  const token = authHeader.split(' ')[1];

  try {
    // Vérifie et décode le token
    const decoded = jwt.verify(token, JWT_SECRET);

    // On stocke les infos utilisateur dans la requête pour les prochaines étapes
    req.user = decoded;

    // On continue vers la route demandée
    next();
  } catch (error) {
    console.error('Erreur token :', error);
    return res.status(403).json({ message: 'Token invalide ou expiré' });
  }
};
