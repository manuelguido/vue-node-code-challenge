/**
 * IMPORTANT:
 * 
 * All the data from the database connection are specified here for facilitating testing.
 * In a real production app, this sensitive values would be stored in a .env file
 * and they would be accessed with process.env.“_varName_“
*/

// MySQL connection
module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'vue-node-challenge',
    },
    migrations: {
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    },
  },
};
