const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET ALL
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('projects').find();
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
const getSingle = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid project id to find a project.');
    }
    const projectId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('projects').find({ _id: projectId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST (Create)
const createProject = async (req, res) => {
  try {
    // Data Validation
    if (!req.body.title || !req.body.description) {
      return res.status(400).json({ message: 'Title and description are required fields.' });
    }
    
    const project = {
      title: req.body.title,
      description: req.body.description,
      ownerId: req.body.ownerId,
      startDate: req.body.startDate
    };
    
    const response = await mongodb.getDb().db().collection('projects').insertOne(project);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the project.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT (Update)
const updateProject = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid project id to update a project.');
    }
    
    // Data Validation
    if (!req.body.title || !req.body.description) {
      return res.status(400).json({ message: 'Title and description are required fields.' });
    }

    const projectId = new ObjectId(req.params.id);
    const project = {
      title: req.body.title,
      description: req.body.description,
      ownerId: req.body.ownerId,
      startDate: req.body.startDate
    };
    
    const response = await mongodb.getDb().db().collection('projects').replaceOne({ _id: projectId }, project);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the project.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteProject = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid project id to delete a project.');
    }
    const projectId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('projects').deleteOne({ _id: projectId });
    
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the project.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createProject, updateProject, deleteProject };