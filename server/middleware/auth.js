const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.cookies.token; // Ensure the token is being sent in the cookies

  if (!token) {
    return res.status(401).json({ msg: "No Token Provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err); // Log error for debugging
      return res.status(403).json({ msg: "Failed to authenticate token" });
    }

    // Change this line to correctly assign user_id
    req.user = { id: decoded.user_id }; // Save user_id to req.user
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = verifyToken;
