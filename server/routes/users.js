const express = require("express");
const router = express.Router();
const db = require("../db");

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
    const result = await db.query(
      "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
      [username, email, password]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
});

router.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  // check if username is present
  try {
    const result = await db.query("SELECT * FROM users where email = $1", [
      email,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ msg: "User Not Found" });
    }

    if (result.rows[0].password_hash !== password) {
      return res.status(404).json({ msg: "Password Incorrect" });
    }

    res.status(200).json({ msg: "Successful Login" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json(err.message);
  }
});

module.exports = router;
