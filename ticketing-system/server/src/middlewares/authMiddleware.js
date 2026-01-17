const jwt = require("jsonwebtoken");
const User = require("../models/User");


console.log("authmiddleware loaded");
// Verify JWT token and attach user to request
const verifyAuth = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    const token = req.headers.authorization.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = {
      id: user._id,
      role: user.role,
      email: user.email,
    };

    next();
  } catch {
    return res.status(401).json({ message: "Not authorized, token invalid" });
  }
};

// Role-based authorization
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ message: "Insufficient permissions" });
    }
    next();
  };
};

module.exports = { verifyAuth, authorize };
