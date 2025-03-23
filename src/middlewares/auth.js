const jwt = require('jsonwebtoken');
const User = require('../models/User');
const config = require('../config');

//Middleware to authenticate users using JWT
const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided'
      });
    }

    // Formato esperado: "Bearer TOKEN"
    const token = authHeader.split(' ')[1];

    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Find user
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token. User not found'
      });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Server error during authentication'
    });
  }
};

module.exports = { authenticate }; 