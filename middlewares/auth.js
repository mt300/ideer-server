// middlewares/auth.js
const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");

const authenticateJWT = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});


const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "8h",
  });
};

module.exports = { authenticate:authenticateJWT,generate:generateToken };
