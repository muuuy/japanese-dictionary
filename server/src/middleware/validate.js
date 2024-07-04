const { body, validateResult } = require("express-validator");
const User = require("../models/User");

const handleErrors = (req, res, next) => {
  const errors = validateResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }
};

const validateEmail = [
  body("email")
    .trim()
    .escape()
    .isLength({ min: 2, max: 254 })
    .withMessage("Invalid email."),
];

const validatePassword = [
  body("password")
    .trim()
    .escape()
    .isLength({ min: 8, max: 32 })
    .withMessage("Invalid password."),
];

const validateVerifyPassword = [
  body("verifyPassword")
    .trim()
    .escape()
    .isLength({ min: 8, max: 32 })
    .withMessage("Incorrect password.")
    .custom((verifyPassword, { req }) => {
      if (verifyPassword !== req.body.password) {
        throw new Error("Passwords do not match.");
      }
      return true;
    }),
];

module.exports = {
  validateEmail,
  validatePassword,
  validateVerifyPassword,
};
