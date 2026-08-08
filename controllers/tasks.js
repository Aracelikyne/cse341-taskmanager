const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('tasks').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid task id.');
    }
    const taskId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('tasks').find({ _id: taskId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    // 7+ fields for the rubric requirement
    const task = {
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      status: req.body.status,
      priority: req.body.priority,
      projectId: req.body.projectId,
      assignedUserId: req.body.assignedUserId
    };
    const response = await mongodb.getDb().db().collection('tasks').insertOne(task);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Error occurred creating task.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateTask = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid task id.');
    }
    const taskId = new ObjectId(req.params.id);
    const task = {
      title: req.body.title,
      description: req.body.description,
      dueDate: req.body.dueDate,
      status: req.body.status,
      priority: req.body.priority,
      projectId: req.body.projectId,
      assignedUserId: req.body.assignedUserId
    };
    const response = await mongodb.getDb().db().collection('tasks').replaceOne({ _id: taskId }, task);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Error occurred updating task.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid task id.');
    }
    const taskId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('tasks').deleteOne({ _id: taskId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Error occurred deleting task.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createTask, updateTask, deleteTask };