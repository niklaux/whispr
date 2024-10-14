const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY;

const verifyToken = (req, res, next) => {
  // Retrieve the token from the Authorization header
  const token = req.headers.authorization?.split(" ")[1]; // Get the token part from the "Bearer token" format
  console.log("Received token:", token); // Log the received token for debugging

  // Check if the token is provided
  if (!token) {
    return res.status(401).json({ msg: "No Token Provided" });
  }

  // Verify the token
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error("Token verification error:", err); // Log error for debugging
      return res.status(403).json({ msg: "Failed to authenticate token" });
    }

    // Assign the decoded user information to the request object
    req.user = { id: decoded.user_id }; // Ensure you have user_id in the token payload
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = verifyToken;
