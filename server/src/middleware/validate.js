const { body, validationResult } = require("express-validator");
const User = require("../models/User");

const handleErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() });
  }

  next();
};

const validateEmail = [
  body("email")
    .trim()
    .normalizeEmail()
    .escape()
    .isEmail()
    .withMessage("Invalid email.")
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

const validateCharacter = [
  body("character")
    .trim()
    .escape()
    .isLength({ min: 1, max: 20 })
    .withMessage("Invalid character."),
];

const validateDefinition = [
  body("definition")
    .trim()
    .escape()
    .isLength({ min: 1, max: 200 })
    .withMessage("Invalid definition."),
];

module.exports = {
  handleErrors,
  validateEmail,
  validatePassword,
  validateVerifyPassword,
  validateCharacter,
  validateDefinition,
};
