const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateTokens, generateAccessToken, verifyRefreshToken } = require('./jwtService');

//Register a new user
const register = async (userData) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    const error = new Error('Email already in use');
    error.statusCode = 400;
    throw error;
  }

  // Create new user
  const user = await User.create(userData);

  // Generate tokens
  const tokens = generateTokens(user);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    },
    ...tokens
  };
};

//Login a user
const login = async (email, password) => {
  // Find user by email
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  // Check password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error('Invalid credentials');
    error.statusCode = 401;
    throw error;
  }

  // Generate tokens
  const tokens = generateTokens(user);

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    },
    ...tokens
  };
};

// Refresh access token using refresh token
const refreshToken = async (refreshToken) => {
  try {
    // Verify refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Find user
    const user = await User.findById(decoded.id);

    if (!user) {
      const error = new Error('Invalid token');
      error.statusCode = 401;
      throw error;
    }

    // Generate new tokens
    const tokens = {
      accessToken: generateAccessToken(user),
      refreshToken: refreshToken
    }

    return tokens;
  } catch (error) {
    const err = new Error('Invalid refresh token');
    err.statusCode = 401;
    throw err;
  }
};

module.exports = {
  register,
  login,
  refreshToken
}; 