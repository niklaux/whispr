const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../db");
const verifyToken = require("../middleware/auth");

const SECRET_KEY = process.env.SECRET_KEY;

router.get("/users", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM users");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

router.post("/users", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const result = await db.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
      [username, email, hashedPassword]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
});

router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const result = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "User Not Found" });
    }

    const user = result.rows[0];

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Password Incorrect" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email },
      SECRET_KEY,
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    // Return the token and user_id
    res.status(200).json({
      msg: "Successful Login",
      token,
      user: { user_id: user.user_id, email: user.email },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});

router.get("/users/me", verifyToken, async (req, res) => {
  try {
    const user_id = req.user.id; // This should now be the correct user_id
    const result = await db.query("SELECT * FROM users WHERE user_id = $1", [
      user_id,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: user_id, text: "User not found." });
    }

    res.status(200).json({ msg: result.rows[0] });
  } catch (err) {
    console.error(err.message); // Log error for debugging
    res.status(500).send(err.message);
  }
});

module.exports = router;
