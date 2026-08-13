const { body, validationResult } = require('express-validator');

// This handles throwing the 400 error if any rules fail
const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ 
    success: false, 
    message: 'Validation failed', 
    errors: errors.array() 
  });
};

const saveTask = [
  body('title').notEmpty().isString().withMessage('Title is required'),
  body('description').notEmpty().isString().withMessage('Description is required'),
  body('dueDate').notEmpty().isString().withMessage('Due date is required'),
  body('status').notEmpty().isString().withMessage('Status is required'),
  body('priority').notEmpty().isString().withMessage('Priority is required'),
  body('projectId').notEmpty().isString().withMessage('Project ID is required'),
  body('assignedUserId').notEmpty().isString().withMessage('Assigned User ID is required'),
  validator
];

const saveCategory = [
  body('name').notEmpty().isString().withMessage('Name is required'),
  body('color').notEmpty().isString().withMessage('Color is required'),
  validator
];

const saveUser = [
  body('username').notEmpty().isString().withMessage('Username is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('firstName').notEmpty().isString().withMessage('First name is required'),
  body('lastName').notEmpty().isString().withMessage('Last name is required'),
  validator
];

const saveProject = [
  body('title').notEmpty().isString().withMessage('Title is required'),
  body('description').notEmpty().isString().withMessage('Description is required'),
  body('ownerId').notEmpty().isString().withMessage('Owner ID is required'),
  body('startDate').notEmpty().isString().withMessage('Start date is required'),
  validator
];

module.exports = {
  saveTask,
  saveCategory,
  saveUser,
  saveProject
};