const jwt = require('jsonwebtoken');
const config = require('../config');

// Generate access token (short-lived)
const generateAccessToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name
  };

  return jwt.sign(
    payload,
    config.JWT_SECRET,
    { expiresIn: config.ACCESS_TOKEN_EXPIRES_IN }
  );
};

// Generate refresh token (long-lived)
const generateRefreshToken = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    name: user.name
  };

  return jwt.sign(
    payload,
    config.REFRESH_TOKEN_SECRET || config.JWT_SECRET,
    { expiresIn: config.REFRESH_TOKEN_EXPIRES_IN }
  );
};

// Generate both tokens
const generateTokens = (user) => {
  console.log(user);
  return {
    accessToken: generateAccessToken(user),
    refreshToken: generateRefreshToken(user)
  };
};

// Verify refresh token
const verifyRefreshToken = (refreshToken) => {
  return jwt.verify(
    refreshToken,
    config.REFRESH_TOKEN_SECRET || config.JWT_SECRET
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
  verifyRefreshToken
};