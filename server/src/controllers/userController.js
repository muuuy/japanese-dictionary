const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Joi = require("joi");

const { User } = require("../models/User");

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

    if (!user) return res.status(401).json({ errors: "Invalid username." });

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(401).json({ errors: "Invalid password." });
    }

    if (req.session.authenticated) return res.status(200).json({});

    req.session.userID = user._id;
    req.session.authenticated = true;

    const flashcardItems = await fetchFlashcards(user.flashcards);

    return res.status(200).json({ flashcards: flashcardItems });
  }),
];

exports.forgot_password = [
  asyncHandler(async (req, res, next) => {
    const email = req.body.email;

    const user = await User.findOne({ email: email });

    if (!user) {
      console.log("User not found.");
      return res.status(404).json({ message: "Invalid email." });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: "Password Reset Request - YUKANA",
      html: `<p>test</p>`,
    };

    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(500).send({ message: err.message });
      }

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });

    console.log(user);

    return res.status(200).json({});
  }),
];

exports.reset_password = [asyncHandler((req, res, next) => {})];

exports.logout = [
  validateEmail,
  handleErrors,
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
      const user = await User.findById(req.session.userID).exec();
      const flashcardItems = await fetchFlashcards(user.flashcards);

      return res.status(200).json({ flashcards: flashcardItems });
    }
    return res.status(204).json({});
  }),
];
