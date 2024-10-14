require("dotenv").config();

const express = require("express");
const users = require("./routes/users");
const posts = require("./routes/posts");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT;
const cors = require("cors");

const app = express();

// Use the environment variable for the origin
const clientOrigin = process.env.CLIENT_ORIGIN;

app.use(
  cors({
    origin: clientOrigin, // Use the env variable here
    credentials: true, // Allow credentials (cookies) to be sent
  })
);

app.use(express.json());
app.use(cookieParser());


app.use("/api", users);
app.use("/api", posts);

app.use("/server-status", (req, res) => {
  res.send("Server is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
