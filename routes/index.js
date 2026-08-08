const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/projects', require('./projects'));
router.use('/tasks', require('./tasks'));
router.use('/categories', require('./categories'));

module.exports = router;