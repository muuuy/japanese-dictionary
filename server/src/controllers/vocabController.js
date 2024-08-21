const asyncHandler = require("express-async-handler");
const { userFlashcardQuery } = require("../middleware/vocabQueries");

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

      if (result.length === 0 || result[0].user_id === null) {
        console.log("Not verified");
        return res
          .status(500)
          .json({ error: "An error occurred. Please try again later." });
      }

      console.log(result);
    } catch (error) {
      console.log("Database error:", error);
      return res
        .status(500)
        .json({ error: "An error occurred. Please try again later." });
    }

    return res.status(200).json({});
  }),
];
