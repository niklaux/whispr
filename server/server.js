const express = require("express");
const users = require("./routes/users");
const posts = require("./routes/posts");
const app = express();
const PORT = 8001;

app.use(express.json());

app.use("/api", users);
app.use("/api", posts);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
