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

module.exports = {
  createUser,
  getUserByEmail,
};
