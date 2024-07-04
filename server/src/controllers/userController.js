const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("../models/User");

exports.user_signup = [
  asyncHandler(async (req, res, next) => {
    console.log(req.body);
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    await user.save();

    return res.status(200).send("ok");
  }),
];
