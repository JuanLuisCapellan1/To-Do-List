const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { authenticate } = require('../middlewares/auth');
const { createTodoValidation, updateTodoValidation } = require('../middlewares/validator');

// Create and get all tasks
router.route('/tasks')
  .post(authenticate, createTodoValidation, taskController.createTask)
  .get(authenticate, taskController.getTasks);

// Get, update and delete specific task
router.route('/tasks/:id')
  .put(authenticate, updateTodoValidation, taskController.updateTask)
  .delete(authenticate, taskController.deleteTask);

module.exports = router;
