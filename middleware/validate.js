const { body, validationResult } = require('express-validator');

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};

const saveUser = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  validator
];

const saveProject = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  validator
];

const saveTask = [
  body('title').notEmpty().withMessage('Title is required'),
  body('status').isIn(['pending', 'in-progress', 'completed']).withMessage('Status must be pending, in-progress, or completed'),
  validator
];

const saveCategory = [
  body('name').notEmpty().withMessage('Category name is required'),
  validator
];

module.exports = { saveUser, saveProject, saveTask, saveCategory };