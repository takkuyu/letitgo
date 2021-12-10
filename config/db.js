const knex = require('knex');

require('dotenv').config();

// Connect to Postgres db using knex.
module.exports = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  }
});