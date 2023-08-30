const userModel = require('../models/user.model');
const todoItemModel = require('../models/todo-item.model');
const db = require('../knex');

/*
|--------------------------------------------------------------------------
| Index
|--------------------------------------------------------------------------
*/
exports.index = async (req, res) => {
  try {
    // Get User
    const user = req.user;

    // Fetch todo items
    const todoItems = await userModel.todoItems(user.id);

    // Success response
    res.status(200).json(todoItems);
  } catch (error) {
    // Error response
    res.status(500).json({ message: "Server error" });
  }
};

/*
|--------------------------------------------------------------------------
| Store
|--------------------------------------------------------------------------
*/
exports.store = async (req, res) => {
  try {
    // Get user and name of the new todo item
    const user = req.user;
    const { name } = req.body;

    // Store todo item
    const result = await todoItemModel.createTodoItem({
      'user_id': user.id,
      'name': name,
    });

    // Fetch todoItem
    const todoItem = await db('todo_items').where('id', result[0]).first();

    // Success response
    res.status(200).json(todoItem);
  } catch (error) {
    // Error response
    res.status(500).json({ message: "Server error" });
  }
};

/*
|--------------------------------------------------------------------------
| Update
|--------------------------------------------------------------------------
*/
exports.update = async (req, res) => {
  try {
    // Get user, todoItem id and new name
    const user = req.user;
    const { id } = req.params;
    const { name } = req.body;

    // Get todo item from db
    const todoItem = await db('todo_items').where({ id: id, user_id: user.id }).first();

    // If does not exist
    if (!todoItem) {
      return res.status(404).json({ message: 'Todo item not found' });
      // If does not belong to the user
    } else if (todoItem.user_id !== parseInt(user.id)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Update the name of the todoItem
    await db('todo_items').where('id', id).update({ name: name });

    // Fetch the updated todo item from the database
    const updatedTodoItem = await db('todo_items').where('id', id).first();

    // Success response
    res.status(200).json(updatedTodoItem);
  } catch (error) {
    // Error response
    res.status(500).json({ message: 'Internal server error' });
  }
};

/*
|--------------------------------------------------------------------------
| Destroy
|--------------------------------------------------------------------------
*/
exports.destroy = async (req, res) => {
  try {
    const user = req.user;
    const { id } = req.params;

    // Get todo item from the database
    const todoItem = await db('todo_items').where({ id: id, user_id: user.id }).first();

    // If does not exist
    if (!todoItem) {
      return res.status(404).json({ message: 'Todo item not found' });
      // If does not belong to the user
    } else if (todoItem.user_id !== parseInt(user.id)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Delete the todo item from the database
    await db('todo_items').where('id', id).delete();

    // Success response
    res.status(204).send();
  } catch (error) {
    console.error(error);
    // Error response
    res.status(500).json({ message: 'Internal server error' });
  }
};

/*
|--------------------------------------------------------------------------
| Update status
|--------------------------------------------------------------------------
*/
exports.updateStatus = async (req, res) => {
  try {
    // Get user, todoItem id and new name
    const user = req.user;
    const { id } = req.params;
    const { is_finished } = req.body;

    // Get todo item from db
    const todoItem = await db('todo_items').where({ id: id, user_id: user.id }).first();

    // If does not exist
    if (!todoItem) {
      return res.status(404).json({ message: 'Todo item not found' });
      // If does not belong to the user
    } else if (todoItem.user_id !== parseInt(user.id)) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Update the name of the todoItem
    await db('todo_items').where('id', id).update({ is_finished: is_finished });

    // Fetch the updated todo item from the database
    const updatedTodoItem = await db('todo_items').where('id', id).first();

    // Success response
    res.status(200).json(updatedTodoItem);
  } catch (error) {
    // Error response
    res.status(500).json({ message: 'Internal server error' });
  }
};
