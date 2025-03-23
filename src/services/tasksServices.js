const Task = require('../models/Tasks');
const User = require('../models/User');

// Create a new task
const createTask = async (taskData) => {
  // Verify valid UserID provided
  const existingUser = await User.findById(taskData.user);
  if (!existingUser) {
    const error = new Error('User provided not found');
    error.statusCode = 404;
    throw error;
  }

  // Create the task
  const task = await Task.create(taskData);
  return task;
};

// Get all tasks for a specific user
const listTasks = async (userId) => {
  const query = { user: userId };

  // Sort options
  const sortOptions = {
    createdAt: -1
  };

  // Verify user logged have list created previously
  const tasks = await Task.find(query).sort(sortOptions);
  if (tasks.length < 1) {
    const error = new Error('The User provided have not already a task');
    error.statusCode = 404;
    throw error;
  }

  return tasks;
};


// Update a task
const updateTask = async (taskId, updateData, userId) => {
  if (!updateData) {
    const error = new Error('Please provide a data for update task');
    error.statusCode = 400;
    throw error;
  }
  // Find the task first to verify ownership
  const task = await Task.findById(taskId);
  if (!task) {
    const error = new Error('Task provided not found');
    error.statusCode = 404;
    throw error;
  }

  // Verify ownership - only the task owner can update it
  if (task.user.toString() !== userId.toString()) {
    const error = new Error('You do not have permission to update this task');
    error.statusCode = 403;
    throw error;
  }

  // Update the task
  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    updateData,
    { new: true, runValidators: true }
  );

  return updatedTask;
};

// Delete a task (soft delete)
const deleteTask = async (taskId, userId) => {
  // Find the task first to verify ownership
  const task = await Task.findById(taskId);

  if (!task) {
    const error = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }

  // Verify ownership - only the task owner can delete it
  if (task.user.toString() !== userId.toString()) {
    const error = new Error('You do not have permission to delete this task');
    error.statusCode = 403;
    throw error;
  }

  // Soft delete by setting isDeleted to true
  const deletedTask = await Task.findByIdAndUpdate(
    taskId,
    { isDeleted: true },
    { new: true }
  );

  return deletedTask;
};

module.exports = {
  createTask,
  listTasks,
  updateTask,
  deleteTask,
};