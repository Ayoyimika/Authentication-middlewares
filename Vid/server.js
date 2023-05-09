const express = require('express');
const mongoose = require('mongoose');
const genreRoutes = require('./genre');
const app = express();

const bodyParser = require('body-parser');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { body, validationResult } = require('express-validator');



app.use(express.json());

// Routes
app.use('/api/genres', genreRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});


const MONGODB_URI = 'mongodb://localhost:27017/vid';
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


  app.use(bodyParser.json());

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Data validation middleware
const validateData = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

app.use('/api/genres', authenticateToken, genreRoutes);


// Authentication middleware
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: 'Unauthorized' });
  
    jwt.verify(token, 'your-secret-key', (error, user) => {
      if (error) return res.status(403).json({ error: 'Forbidden' });
      req.user = user;
      next();
    });
  };

  // Validation error middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Routes
app.use('/api/genres', authenticateToken, genreRoutes);
