const asyncHandler = require("express-async-handler");
const { validationResult, body } = require("express-validator");
const { DatabaseError } = require("../models/DatabaseError.js");
const { userQueryID } = require("../queries/userQueries");
const {
  insertFlashcardQuery,
  deleteFlashcardQuery,
  editFlashcardQuery,
} = require("../queries/flashcardQueries");
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

      return res.status(200).json({ flashcard });
    } catch (error) {
      console.log("Database error", error);
      return res
        .status(500)
        .json({ error: "An error occurred. Please try again later." });
    }
  }),
];

//Delete flashcard -> POST '/:id'
exports.delete = [
  asyncHandler(async (req, res, next) => {
    if (!req.session.authenticated) {
      return res.status(401).json({ errors: "Not logged in." });
    }

    try {
      const userId = req.session.userID;
      const flashcardId = req.params.id;

      await deleteFlashcardQuery(userId, flashcardId);

      return res.status(200).json({});
    } catch (error) {
      if (error instanceof DatabaseError) {
        console.log("Database error", error);
      } else {
        console.log("Error", error);
      }
      return res
        .status(500)
        .json({ error: "An error occurred. Please try again later." });
    }
  }),
];

//Edit flashcard -> Put '/:id'
exports.edit = [
  asyncHandler(async (req, res, next) => {
    if (!req.session.authenticated) {
      return res.status(401).json({ errors: "Not logged in." });
    }

    const searchID = req.params.id;
    const character = req.body.character;
    const definition = req.body.definition;

    try {
      await editFlashcardQuery(searchID, character, definition);

      return res.status(200).json({});
    } catch (error) {
      console.log("Database error", error);
      return res
        .status(500)
        .json({ error: "An error occurred. Please try again later." });
    }
  }),
];
