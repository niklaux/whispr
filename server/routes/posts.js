const express = require("express");
const router = express.Router();
const db = require("../db");
const { restart } = require("nodemon");

router.get("/posts", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT 
        Posts.post_id,
        Posts.content,
        Posts.image_url,
        Posts.created_at,
        Users.username
      FROM 
        Posts
      JOIN 
        Users ON Posts.user_id = Users.user_id
      ORDER BY 
        Posts.created_at DESC
    `);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error occurred" });
  }
});

router.post("/posts", async (req, res) => {
  const { content, user_id } = req.body;

  if (!content) {
    return res.status(400).json({ msg: "Content field is required" });
  }

  try {
    const result = await db.query(
      "INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *",
      [user_id, content]
    );

    res
      .status(201)
      .json({ msg: "Post successfully created", data: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    restart.status(400).json({ msg: "Error creating the post" });
  }
});

router.put("/posts/:post_id", async (req, res) => {
  const post_id = req.params.post_id;
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ msg: "Post cannot be empty" });
  }

  try {
    const result = await db.query(
      "UPDATE posts SET content = $1 WHERE post_id = $2 RETURNING *",
      [content, post_id]
    );

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(404).send(err.message);
  }
});

router.delete("/posts/:post_id", async (req, res) => {
  const post_id = req.params.post_id;

  try {
    const result = await db.query(
      "DELETE FROM posts WHERE post_id = $1 RETURNING *",
      [post_id]
    );

    res
      .status(200)
      .json({ msg: "Successfully delete post", data: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error deleting the post" });
  }
});

module.exports = router;
