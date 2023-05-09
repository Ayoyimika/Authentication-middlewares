const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./user');


const bcrypt = require('bcryptjs');

const generateToken = (user) => {
  return jwt.sign(user, 'your-secret-key');
  }


const router = express.Router();

// User login
router.post('/login', [
  check('email').isEmail().withMessage('Invalid email'),
  check('password').notEmpty().withMessage('Password is required'),
], validateData, async (req, res) => {
  // ...
});

// User registration
router.post('/register', [
  check('email').isEmail().withMessage('Invalid email'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], validateData, async (req, res) => {
  // ...
});

module.exports = router;
