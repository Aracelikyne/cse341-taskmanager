const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// GET ALL
const getAll = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection('categories').find();
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
      return res.status(400).json('Must use a valid category id.');
    }
    const categoryId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('categories').find({ _id: categoryId });
    result.toArray().then((lists) => {
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST (Create)
const createCategory = async (req, res) => {
  try {
    const category = {
      name: req.body.name,
      color: req.body.color
    };
    const response = await mongodb.getDb().db().collection('categories').insertOne(category);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Error occurred creating category.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT (Update)
const updateCategory = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid category id.');
    }
    const categoryId = new ObjectId(req.params.id);
    const category = {
      name: req.body.name,
      color: req.body.color
    };
    const response = await mongodb.getDb().db().collection('categories').replaceOne({ _id: categoryId }, category);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Error occurred updating category.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteCategory = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json('Must use a valid category id.');
    }
    const categoryId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('categories').deleteOne({ _id: categoryId });
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Error occurred deleting category.');
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, createCategory, updateCategory, deleteCategory };