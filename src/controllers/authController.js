const authService = require('../services/authService');

// Register a new user
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const result = await authService.register({ name, email, password });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error?.message || 'Error trying to register user'
    });
  }
};

//Login a user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await authService.login(email, password);

    return res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data: result
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error?.message || 'Error trying to login user'
    });
  }
};

// Get current user profile
const getCurrentUser = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        createdAt: req.user.createdAt
      }
    }
  });
};

// Refresh access token using refresh token
const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required'
      });
    }

    const tokens = await authService.refreshToken(refreshToken);

    res.status(200).json({
      success: true,
      message: 'Token refreshed successfully',
      data: tokens
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error?.message || 'Error trying to refresh access token'
    });
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  refreshAccessToken
}; 