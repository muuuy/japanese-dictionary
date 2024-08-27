const asyncHandler = require("express-async-handler");
const { userFlashcardQuery } = require("../queries/vocabQueries");

const pool = require("../config/postgresDB");

exports.validate_answer = [
  asyncHandler(async (req, res, next) => {
    if (!req.session.authenticated) {
      return res.status(401).json({ errors: "You must be logged in." });
    }

    const flashcardID = req.params.id;
    const userID = req.session.userID;

    try {
      const result = await userFlashcardQuery(userID, flashcardID);

      // Invalid query (Either user ID is wrong or flashcard ID is)
      if (result.length !== 1 || result[0].user_id === null) {
        console.log("Not verified");
        return res
          .status(500)
          .json({ error: "An error occurred. Please try again later." });
      }

      const flashcardCharacter = result[0].character;
      const flashcardDefinition = result[0].definition;

      const clientCharacter = req.body.flashcard.character;
      const clientDefinition = req.body.flashcard.definition;

      if (
        flashcardCharacter !== clientCharacter ||
        flashcardDefinition !== clientDefinition
      ) {
        console.log("Invalid flashcard");
        return res
          .status(500)
          .json({ error: "An error occurred. Please try again later." });
      }

      const userInput = req.body.input;

      if (flashcardDefinition === userInput) {
        return res.status(200).json({ isCorrect: true });
      } else {
        return res.status(200).json({ isCorrect: false });
      }
    } catch (error) {
      console.log("Database error:", error);
      return res
        .status(500)
        .json({ error: "An error occurred. Please try again later." });
    }
  }),
];
