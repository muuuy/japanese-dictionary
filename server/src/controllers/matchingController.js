const asyncHandler = require("express-async-handler");
const { userFlashcardQuery } = require("../queries/vocabQueries");
const {
  validateCharacter,
  validateDefinition,
  handleErrors,
} = require("../middleware/validate");

//Validate Matching Quiz Answers -> POST '/matching/id:'
exports.validate_answer = [
  validateCharacter,
  validateDefinition,
  handleErrors,
  asyncHandler(async (req, res, next) => {
    if (!req.session.authenticated) {
      return res.status(401).json({ errors: "You must be logged in." });
    }

    const flashcard_id = req.params.id;
    const user_id = req.session.userID;

    try {
      const result = await userFlashcardQuery(user_id, flashcard_id);

      // Invalid query (Either user ID is wrong or flashcard ID is)
      if (result.length !== 1 || result[0].user_id === null) {
        console.log("Not verified");
        return res
          .status(500)
          .json({ error: "An error occurred. Please try again later." });
      }
    } catch (error) {
      console.log("Database error:", error);
      return res
        .status(500)
        .json({ error: "An error occurred. Please try again later." });
    }
  }),
];
