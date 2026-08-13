const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users');
const validate = require('../middleware/validate');

router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

// Validation added to POST and PUT
router.post('/', validate.saveUser, usersController.createUser);
router.put('/:id', validate.saveUser, usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;