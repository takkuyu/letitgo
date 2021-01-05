import knex from 'knex';
import dotenv from 'dotenv';

dotenv.config();

// Connect to Postgres db using knex.
const db = knex({
  client: "pg",
  connection: {
    host:  process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }
});

export default db;