import { body, validationResult } from 'express-validator';

// ✅ Règles de validation pour créer une tâche
export const validateTask = [
  body('title')
    .trim()
    .notEmpty().withMessage('Le titre est obligatoire')
    .isLength({ min: 3 }).withMessage('Le titre doit contenir au moins 3 caractères'),
  body('done')
    .optional()
    .isBoolean().withMessage('La valeur de done doit être true ou false'),
];

// ✅ Middleware pour gérer les erreurs
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
