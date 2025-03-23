const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate } = require('../middlewares/auth');
const { registerValidation, loginValidation } = require('../middlewares/validator');

// Register a new user
router.post('/auth/signup', registerValidation, authController.register);

// Login a user
router.post('/auth/login', loginValidation, authController.login);

// Get current user profile
router.get('/auth/account', authenticate, authController.getCurrentUser);

// Refresh access token
router.post('/refresh-token', authController.refreshAccessToken);

module.exports = router; 