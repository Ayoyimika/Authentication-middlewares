const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Genre = mongoose.model('Genre', genreSchema);

module.exports = Genre;


const express = require('express');
const router = express.Router();
const Genre = require('./genre');
const { body, validationResult } = require('express-validator');


// Get all genres
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create a new genre
router.post('/', async (req, res) => {
  try {
    const genre = await Genre.create(req.body);
    res.status(201).json(genre);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// Update an existing genre
router.put('/:id', async (req, res)) => {
  try {
    const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(genre);
  }
   catch (error) {
    res.status(400).json({ error: 'Bad request' });
 
   }
// Get all genres
router.get('/', async (req, res) => {
    try {
      const genres = await Genre.find();
      res.json(genres);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  // Create a new genre
  router.post(
    '/',
    body('name').trim().notEmpty().withMessage('Name is required'),
    handleValidationErrors,
    async (req, res) => {
      try {
        const genre = await Genre.create(req.body);
        res.status(201).json(genre);
      } catch (error) {
        res.status(400).json({ error: 'Bad request' });
      }
    }
  );
  
  // Update an existing genre
  router.put(
    '/:id',
    body('name').trim().notEmpty().withMessage('Name is required'),
    handleValidationErrors,
    async (req, res) => {
      try {
        const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
        });
        res.json(genre);
      } catch (error) {
        res.status(400).json({ error: 'Bad request' });
      }
    }
  );


