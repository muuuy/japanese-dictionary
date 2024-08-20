const asyncHandler = require("express-async-handler");

const pool = require("../config/postgresDB");

exports.validate_answer = [
  asyncHandler((req, res, next) => {
    if (!req.session.authenticated) {
      return res.status(401).json({ errors: "You must be logged in." });
    }

    return res.status(200).json({});
  }),
];
