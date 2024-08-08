const jwt = require("jsonwebtoken");

const decodeToken = (token) => {
  return jwt.verify(token, process.env.RESET_TOKEN_SECRET);
};

module.exports = { decodeToken };
