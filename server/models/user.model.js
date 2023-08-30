/**
 * Database User model.
*/

const db = require('../knex');

const createUser = (user) => {
  return db('users').insert(user);
};

const getUserByEmail = (email) => {
  return db('users').where('email', email).first();
};

const findById = (id) => {
  return db('users').where('id', id).first();
};

/**
 * Return all the Todo Items from the user.
 */
const todoItems = (user_id) => {
  return db('todo_items').where('user_id', user_id).select();
};

module.exports = {
  createUser,
  getUserByEmail,
  findById,
  todoItems,
};
