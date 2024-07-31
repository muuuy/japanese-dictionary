const jwt = require("jsonwebtoken");

const generateResetToken = (password) => {
  const token = jwt.sign({}, password, {
    expiresIn: process.env.RESET_TOKEN_EXPIRES,
  });
};

module.exports = generateResetToken;
