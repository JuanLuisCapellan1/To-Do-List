const { body, validationResult } = require('express-validator');

//Middleware to handle validation errors
const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(error => ({
        field: error.param,
        message: error.msg
      }))
    });
  }
  next();
};

// Validation rules for user registration
const registerValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address'),

  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  validateRequest
];

//Validation rules for user login
const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email address'),

  body('password')
    .trim()
    .notEmpty().withMessage('Password is required'),

  validateRequest
];

// Validation rules for creating a new todo
const createTodoValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title cannot be more than 100 characters'),

  body('description')
    .notEmpty().withMessage('Description is required')
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot be more than 500 characters'),

  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed']).withMessage('Status must be pending, in-progress, or completed'),

  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high'),

  body('dueDate')
    .optional()
    .isISO8601().withMessage('Due date must be a valid date')
    .custom(value => {
      if (value && new Date(value) < new Date()) {
        throw new Error('Due date cannot be in the past');
      }
      return true;
    }),

  validateRequest
];

// Validation rules for updating a todo
const updateTodoValidation = [
  body('title')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Title cannot be more than 100 characters'),

  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot be more than 500 characters'),

  body('status')
    .optional()
    .isIn(['pending', 'in-progress', 'completed']).withMessage('Status must be pending, in-progress, or completed'),

  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high'),

  body('dueDate')
    .optional()
    .isISO8601().withMessage('Due date must be a valid date')
    .custom(value => {
      if (value && new Date(value) < new Date()) {
        throw new Error('Due date cannot be in the past');
      }
      return true;
    }),

  body('isDeleted')
    .optional()
    .isBoolean().withMessage('isDeleted must be a boolean value'),

  validateRequest
];

// Validation for refresh token
const refreshTokenValidation = [
  body('refreshToken')
    .notEmpty().withMessage('Refresh token is required'),

  validateRequest
];

module.exports = {
  validateRequest,
  registerValidation,
  loginValidation,
  createTodoValidation,
  updateTodoValidation,
  refreshTokenValidation
}; 