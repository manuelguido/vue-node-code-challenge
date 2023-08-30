const userModel = require('../models/user.model');
const todoItemModel = require('../models/todo-item.model');
const db = require('../knex');

/** 
 * Index 
 */
exports.index = async (req, res) => {
  try {
    // Assuming you have a User model and a TodoItem model
    const user = req.user; // Get the authenticated user from your middleware

    // Fetch todo items associated with the authenticated user
    const todoItems = await userModel.todoItems(user.id);

    // Return the fetched todo items as JSON response
    res.status(200).json(todoItems);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

/** 
 * Store 
 */
exports.store = async (req, res) => {
  try {
    // Assuming you have a User model and a TodoItem model
    const user = req.user; // Get the authenticated user from your middleware
    const { name } = req.body;

    // Store todo item
    const result = await todoItemModel.createTodoItem({
      'user_id': user.id,
      'name': name,
    });

    // Get the ID of the newly inserted todo item
    const insertedId = result[0];

    // Fetch the inserted todo item from the database
    const todoItem = await db('todo_items').where('id', insertedId).first();


    // Return the fetched todo items as JSON response
    res.status(200).json(todoItem);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
};

// Controller function to handle the show route
exports.show = (req, res) => {
  // Your logic to fetch and return a specific todo item
};

// Controller function to handle the update route
exports.update = (req, res) => {
  // Your logic to update a specific todo item
};

// Controller function to handle the destroy route
exports.destroy = (req, res) => {
  // Your logic to delete a specific todo item
};

// Controller function to handle the updateStatus route
exports.updateStatus = (req, res) => {
  // Your logic to update the status of a specific todo item
};
