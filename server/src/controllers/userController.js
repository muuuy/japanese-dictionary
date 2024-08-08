const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const Joi = require("joi");
const fetchFlashcards = require("../middleware/fetchFlashcards");
const { User } = require("../models/User");
const generateResetToken = require("../middleware/generateResetToken");
const { decodeToken } = require("../middleware/decodeToken");
const { fileWriter } = require("../middleware/fileWriter");

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
    const email = req.body.email;

    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(409).json({ errors: "Email already in use." });
    }

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

    if (!user) {
      return res.status(401).json({ errors: "Invalid username." });
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if (!match) {
      return res.status(401).json({ errors: "Invalid password." });
    }

    if (req.session.authenticated) return res.status(200).json({});

    req.session.userID = user._id;
    req.session.authenticated = true;

    const flashcardItems = await fetchFlashcards(user.flashcards);

    fileWriter();

    return res.status(200).json({ flashcards: flashcardItems });
  }),
];

exports.forgot_password = [
  asyncHandler(async (req, res, next) => {
    const email = req.body.email;

    const user = await User.findOne({ email: email });

    if (!user) {
      console.log("User not found.");
      return res.status(404).json({ errors: "Invalid email." });
    }

    const token = generateResetToken(user._id, process.env.RESET_TOKEN_SECRET);

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
      html: `<p>test</p>
             <a href="http://${process.env.VIEW_ADDRESS}/reset-password/${token}">RESET PASSWORD</a>
             <p>If you didn't request a password reset, please ignore this email.</p>
             <p>This link will expire in 10 minutes or after it is used.</p>`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        res.status(500).send({ message: err.message });
      }

      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });

    return res.status(200).json({});
  }),
];

exports.reset_password = [
  validatePassword,
  validateVerifyPassword,
  handleErrors,
  asyncHandler(async (req, res, next) => {
    const token = req.body.token;
    const password = req.body.password;

    const decodedToken = decodeToken(token);

    if (!decodedToken) {
      return res.status(401).json({ errors: "Invalid link." });
    }

    const user = await User.findById(decodedToken.id).exec();

    const matching = await bcrypt.compare(password, user.password);

    if (matching) {
      return res.status(400).json({
        errors:
          "Your new password cannot be the same as your current password. Please choose a different password",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 13);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({});
  }),
];

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

exports.user_logout = [
  asyncHandler((req, res, next) => {
    if (req.session.authenticated) {
      req.session.destroy();
    }

    return res.status(200).json({});
  }),
];
