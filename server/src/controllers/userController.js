const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("../models/User");

const fetchFlashcards = require("../middleware/fetchFlashcards");

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
      flashcards: [],
    });

    await user.save();
    return res.status(200).json({});
  }),
];

exports.user_login = [
  validateEmail,
  validatePassword,
  handleErrors,
  asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(401).json({ errors: "Invalid password." });
    }

    if (req.session.authenticated) return res.status(200).json({});

    req.session.userID = user._id;
    req.session.authenticated = true;

    return res.status(200).json({});
  }),
];

exports.forgot_password = [asyncHandler((req, res, next) => {})];

exports.reset_password = [asyncHandler((req, res, next) => {})];

exports.logout = [
  asyncHandler((req, res, next) => {
    if (!req.session.authenticated) {
      return res.status(204).json({});
    }
    req.session.authenticated = false;
    return res.status(200).json({});
  }),
];

exports.authenticate = [
  asyncHandler(async (req, res, next) => {
    if (req.session.authenticated) {
      console.log(req.session);
      const user = await User.findById(req.session.userID).exec();
      const flashcardItems = await fetchFlashcards(user.flashcards);

      return res.status(200).json({ flashcards: flashcardItems });
    }
    return res.status(204).json({});
  }),
];
