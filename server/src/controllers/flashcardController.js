const asyncHandler = require("express-async-handler");
const { validationResult, body } = require("express-validator");

const {
  validateCharacter,
  validateDefinition,
  handleErrors,
} = require("../middleware/validate");
const Flashcard = require("../models/Flashcard");
const User = require("../models/User");

exports.create = [
  validateCharacter,
  validateDefinition,
  handleErrors,
  body("character").trim(),
  body("definition").trim(),
  asyncHandler(async (req, res, next) => {
    if (!req.session.authenticated) {
      return res.status(401).json({ errors: "Not logged in." });
    }

    const flashcard = new Flashcard({
      character: req.body.character,
      definition: req.body.definition,
    });
    await flashcard.save();

    const user = await User.findById(req.session.userID).exec();
    user.flashcards.push(flashcard._id);
    await user.save();

    console.log(user);

    return res.status(200).json({
      flashcard: {
        id: flashcard._id,
        character: flashcard.character,
        definition: flashcard.definition,
      },
    });
  }),
];

exports.delete = [
  asyncHandler(async (req, res, next) => {
    console.log("yo");
    return res.status(200).json({});
  }),
];

exports.edit = [
  asyncHandler(async (req, res, next) => {
    return res.status(200).json({});
  }),
];
