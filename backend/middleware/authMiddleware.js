const jwt = require("jsonwebtoken"); // <-- THIS LINE MUST EXIST
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  console.log("Authorization header:", req.headers.authorization);

  let token = req.headers.authorization?.split(" ")[1];
  console.log("Extracted token:", token ? "Exists" : "Missing");

  if (!token) {
    console.log("No token found");
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    req.user = await User.findById(decoded.id).select("-password");
    console.log("User found:", req.user ? "Yes" : "No");

    if (!req.user) {
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
