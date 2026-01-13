const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  if (!user || !user._id || !user.role) {
    throw new Error("Invalid user data for token generation");
  }

  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

module.exports = generateToken;
