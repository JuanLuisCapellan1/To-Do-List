const taskService = require('../services/tasksServices');

// Create a new task
const createTask = async (req, res) => {
  try {
    // Add user id from authenticated user to task data
    const taskData = {
      ...req.body,
      user: req.user._id
    };

    const task = await taskService.createTask(taskData);

    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error?.message || 'Error trying to create a new task'
    });
  }
};

// Get all tasks for the authenticated user
const getTasks = async (req, res) => {
  try {
    const tasks = await taskService.listTasks(req.user._id);

    res.status(200).json({
      success: true,
      data: tasks
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error?.message || 'Error trying to list tasks'
    });
  }
};

// Update a task
const updateTask = async (req, res) => {
  try {
    const updatedTask = await taskService.updateTask(
      req.params.id,
      req.body,
      req.user._id
    );

    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: updatedTask
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error?.message || 'Error trying to update task'
    });
  }
};

// Delete a task (soft delete)
const deleteTask = async (req, res) => {
  try {
    await taskService.deleteTask(req.params.id, req.user._id);

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully'
    });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error?.message || 'Error trying to delete task'
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
}; 