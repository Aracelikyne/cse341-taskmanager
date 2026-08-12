const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');
const validate = require('../middleware/validate');
const { requiresAuth } = require('express-openid-connect');

router.get('/', categoriesController.getAll);
router.get('/:id', categoriesController.getSingle);

// Validation and OAuth added before the controller function
router.post('/', requiresAuth(), validate.saveCategory, categoriesController.createCategory);
router.put('/:id', requiresAuth(), validate.saveCategory, categoriesController.updateCategory);
router.delete('/:id', requiresAuth(), categoriesController.deleteCategory);

module.exports = router;