const validator = require('../helpers/validate');

const saveTask = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    description: 'required|string',
    dueDate: 'required|string',
    status: 'required|string',
    priority: 'required|string',
    projectId: 'required|string',
    assignedUserId: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveCategory = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    color: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

// NEW: Validation for Users
const saveUser = (req, res, next) => {
  const validationRule = {
    username: 'required|string',
    email: 'required|email',
    firstName: 'required|string',
    lastName: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

// NEW: Validation for Projects
const saveProject = (req, res, next) => {
  const validationRule = {
    title: 'required|string',
    description: 'required|string',
    ownerId: 'required|string',
    startDate: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveTask,
  saveCategory,
  saveUser,
  saveProject
};