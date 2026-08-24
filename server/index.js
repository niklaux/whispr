require("dotenv").config();

const express = require("express");
const users = require("./routes/users");
const posts = require("./routes/posts");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT;
const cors = require("cors");

const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    // Allow non-browser requests and any explicitly whitelisted frontend origin.
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: false,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Welcome to the Express API!"); // You can customize this message
});

app.use(express.json());
app.use(cookieParser());


app.use("/api", users);
app.use("/api", posts);

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
}

module.exports = app;
