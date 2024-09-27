const { Pool } = require('pg');
require('dotenv').config();

// Check if POSTGRES_URL exists, and throw an error if not
if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL is not set. Make sure the environment variable is defined.');
}

// Create a new pool using the environment variable for the PostgreSQL connection string
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false, // For SSL connections (e.g., with Vercel)
  }
});

// Export the query function for use in other parts of the app
module.exports = {
  query: (text, params) => pool.query(text, params),
};
