const jwt = require("jsonwebtoken");

/**
 * Generates a JWT to send with the reset password link when requested
 * by the user.
 *
 * @param {string} userID - The user's ID to be stored in the JWT.
 * @param {string} password - The user's password to be used as the JWT signing key.
 * @returns {string} - The generated JWT.
 */
const generateResetToken = (userID, password) => {
  const token = jwt.sign({ id: userID }, password, {
    algorithm: process.env.JWT_ALGORITHM,
    expiresIn: process.env.RESET_TOKEN_EXPIRES,
  });

  return token;
};

module.exports = generateResetToken;
