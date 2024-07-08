const asyncHandler = require("express-async-handler");
const { validationResult, body } = require("express-validator");

const {
  validateCharacter,
  validateDefinition,
  handleErrors,
} = require("../middleware/validate");

exports.create = [
  validateCharacter,
  validateDefinition,
  handleErrors,
  body("character").trim(),
  body("definition").trim(),
  asyncHandler(async (req, res, next) => {
    if (req.session.authenticated === true) {
      console.log("true");
    }

    console.log(req.body);

    return res.status(200).json({});
  }),
];
