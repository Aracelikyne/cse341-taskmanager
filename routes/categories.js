const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');
const validate = require('../middleware/validate');

router.get('/', categoriesController.getAll);
router.get('/:id', categoriesController.getSingle);

// Validation middleware added before the controller function
router.post('/', validate.saveCategory, categoriesController.createCategory);
router.put('/:id', validate.saveCategory, categoriesController.updateCategory);

router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;