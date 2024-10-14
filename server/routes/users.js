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
    res.status(201).json({msg: "Account successfully created."});
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
      { user_id: user.user_id, email: user.email, password_hash: user.password_hash },
      SECRET_KEY,
      {
        expiresIn: "1h", // Token expires in 1 hour
      }
    );

    // Set the token in a cookie
    res.cookie("whisprToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // This should be true in production
      sameSite: "Lax",
      path: "/",
      maxAge: 3600000,  // 1 hour
    });

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
    const result = await db.query("SELECT user_id, username, email FROM users WHERE user_id = $1", [
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

router.put("/users", verifyToken, async (req, res) => {
  const { email, username } = req.body;
  const { id } = req.user;  // Extract user ID from the verified token

  try {
    // Validate the input
    if (!email || !username) {
      return res.status(400).json({ message: "Email and Username are required" });
    }

    // Check if the email or username already exists for another user
    const checkUser = await db.query(
      "SELECT * FROM users WHERE (email = $1 OR username = $2) AND user_id != $3",
      [email, username, id]
    );

    if (checkUser.rows.length > 0) {
      return res.status(409).json({ message: "Email or Username already in use" });
    }

    // Update the user's email and username
    const result = await db.query(
      "UPDATE users SET email = $1, username = $2 WHERE user_id = $3 RETURNING *",
      [email, username, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User updated successfully", user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

router.put("/users/password", verifyToken, async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const { id } = req.user;  // Extract user ID from the verified token

  try {
    // Validate the input
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current password and new password are required" });
    }

    // Check if the user exists
    const result = await db.query("SELECT * FROM users WHERE user_id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = result.rows[0];

    // Verify the current password
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }

    // Hash the new password
    const saltRounds = 10;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update the password in the database
    await db.query("UPDATE users SET password_hash = $1 WHERE user_id = $2", [hashedNewPassword, id]);

    res.status(200).json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message);
  }
});

module.exports = router;
