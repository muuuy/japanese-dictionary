const asyncHandler = require("express-async-handler");
const { validationResult, body } = require("express-validator");

const { userQueryID } = require("../queries/userQueries");
const { insertFlashcardQuery } = require("../queries/flashcardQueries");

const {
  validateCharacter,
  validateDefinition,
  handleErrors,
} = require("../middleware/validate");
const Flashcard = require("../models/Flashcard");
const User = require("../models/User");

//Create flashcard --> '/'
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

    try {
      const user = await userQueryID(req.session.userID);

      const character = req.body.character;
      const definition = req.body.definition;

      const flashcard = await insertFlashcardQuery(
        character,
        definition,
        user.user_id
      );
    } catch (error) {
      console.log("Database error", error);
      return res
        .status(500)
        .json({ error: "An error occurred. Please try again later." });
    }

    // const flashcard = new Flashcard({
    //   character: req.body.character,
    //   definition: req.body.definition,
    // });
    // await flashcard.save();

    // const user = await User.findById(req.session.userID).exec();
    // user.flashcards.push(flashcard._id);
    // await user.save();

    // console.log(user);

    return res.status(200).json({
      // flashcard: {
      //   id: flashcard._id,
      //   character: flashcard.character,
      //   definition: flashcard.definition,
      // },
    });
  }),
];

exports.delete = [
  asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.session.userID);
    user.flashcards = user.flashcards.filter(
      (flashcardID) => flashcardID.toString() !== req.params.id
    );
    await user.save();

    await Flashcard.findByIdAndDelete(req.params.id);

    return res.status(200).json({});
  }),
];

exports.edit = [
  asyncHandler(async (req, res, next) => {
    if (!req.session.authenticated)
      return res.status(401).json({ errors: "Not logged in." });

    const searchID = req.params.id;
    const character = req.body.character;
    const definition = req.body.definition;

    const flashcard = await Flashcard.findById(searchID).exec();

    if (flashcard.character !== character) flashcard.character = character;
    if (flashcard.definition !== definition) flashcard.definition = definition;

    await flashcard.save();

    return res.status(200).json({});
  }),
];
