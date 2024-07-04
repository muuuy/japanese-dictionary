const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("../models/User");

const {
  handleErrors,
  validateEmail,
  validatePassword,
  validateVerifyPassword,
} = require("../middleware/validate");

exports.user_signup = [
  validateEmail,
  validatePassword,
  validateVerifyPassword,
  handleErrors,
  asyncHandler(async (req, res, next) => {
    const password = await bcrypt.hash(req.body.password, 13);

    const user = new User({
      email: req.body.email,
      password: password,
    });

    await user.save();
    return res.status(200).json({});
  }),
];
