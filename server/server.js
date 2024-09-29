const express = require("express");
const users = require("./routes/users");
const app = express();
const db = require("./db");
const PORT = 8001;

app.use(express.json());

app.use("/api", users);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
