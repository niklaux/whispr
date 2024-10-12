require("dotenv").config();

const express = require("express");
const users = require("./routes/users");
const posts = require("./routes/posts");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT;
const cors = require("cors");

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true, // Allow credentials (cookies) to be sent
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api", users);
app.use("/api", posts);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
