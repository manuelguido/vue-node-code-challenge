/**
 * Database User model.
*/

const db = require('../knex');

const createTodoItem = (todoItem) => {
  return db('todo_items').insert(todoItem);
};

const getTodoItemById = (id) => {
  return db('todo_items').where('id', id).first();
};

const getByUser = (id) => {
  return db('todo_items').where('user_id', id);
};

module.exports = {
  createTodoItem,
  getTodoItemById,
  getByUser,
};
