const knex = require('knex');

require('dotenv').config();

// Connect to Postgres db using knex.
module.exports = knex({
  client: "pg",
  connection: {
    host:  process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
});