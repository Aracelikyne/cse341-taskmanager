const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks');
const validate = require('../middleware/validate');

router.get('/', tasksController.getAll);
router.get('/:id', tasksController.getSingle);
// Validation added before the controller function
router.post('/', validate.saveTask, tasksController.createTask);
router.put('/:id', validate.saveTask, tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

module.exports = router;