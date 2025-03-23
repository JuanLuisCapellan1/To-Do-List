const { Todo } = require('../models');

//Middleware to verify if the logged-in user owns the todo
const verifyTodoOwnership = async (req, res, next) => {
  try {
    const todoId = req.query.id;
    const userId = req.user._id;

    const todo = await Todo.findById(todoId);

    // Check if todo exists
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }

    // Check ownership
    if (todo.user.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to access this todo'
      });
    }

    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while verifying ownership'
    });
  }
};

module.exports = {
  verifyTodoOwnership,
}; 