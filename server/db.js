const { Pool } = require("pg");
require("dotenv").config();

// Check if POSTGRES_URL exists, and throw an error if not
if (!process.env.POSTGRES_URL) {
  throw new Error(
    "POSTGRES_URL is not set. Make sure the environment variable is defined."
  );
}

// Create a new pool using the environment variable for the PostgreSQL connection string
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
  ssl: {
    rejectUnauthorized: false, // For SSL connections (e.g., with Vercel)
  },
  connectionTimeoutMillis: 10000, // Wait up to 10 seconds for a connection
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  max: 20, // Limit the number of clients in the pool
});

// Keep the connection alive to avoid suspension due to inactivity
setInterval(() => {
  pool
    .query("SELECT 1")
    .catch((err) => console.error("Keep-alive query failed:", err));
}, 4 * 60 * 1000); // Run every 4 minutes to prevent suspension (Vercel's timeout is 5 minutes)

// Export the query function for use in other parts of the app
module.exports = {
  query: (text, params) => pool.query(text, params),
};
