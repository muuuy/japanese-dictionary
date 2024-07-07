const bcrypt = require("bcryptjs");
const User = require("../src/models/User");
const {
  validateEmail,
  validatePassword,
  validateVerifyPassword,
  handleErrors,
} = require("../src/middleware/validate");
const asyncHandler = require("express-async-handler");
