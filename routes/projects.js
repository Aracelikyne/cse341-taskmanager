const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projects');
const validate = require('../middleware/validate');

router.get('/', projectsController.getAll);
router.get('/:id', projectsController.getSingle);

// Validation added to POST and PUT
router.post('/', validate.saveProject, projectsController.createProject);
router.put('/:id', validate.saveProject, projectsController.updateProject);
router.delete('/:id', projectsController.deleteProject);

module.exports = router;