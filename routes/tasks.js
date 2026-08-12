const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks');
const validate = require('../middleware/validate');
const { requiresAuth } = require('express-openid-connect');

router.get('/', tasksController.getAll);
router.get('/:id', tasksController.getSingle);

// Validation and OAuth added before the controller function
router.post('/', requiresAuth(), validate.saveTask, tasksController.createTask);
router.put('/:id', requiresAuth(), validate.saveTask, tasksController.updateTask);
router.delete('/:id', requiresAuth(), tasksController.deleteTask);

module.exports = router;