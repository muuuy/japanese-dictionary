const pool = require("../config/postgresDB");

/**
 * Query to validate the flashcard and return it.
 *
 * Sends in the user's id and the flashcard's id to make sure that the flashcard
 * actually belongs to the user.
 * Then, it returns the flashcard alongside the user_id for verification purposes.
 *
 * @param {string} userID
 * @param {string} flashcardID
 * @returns {boolean} TRUE = Exists | FALSE = Doesn't exist
 */
const userFlashcardQuery = async (userID, flashcardID) => {
  try {
    const result = await pool.query(
      `SELECT f.*, uf.user_id
       FROM flashcards f 
       LEFT JOIN user_flashcards uf 
       ON f.flashcard_id = uf.flashcard_id AND  uf.user_id = $1 
       WHERE f.flashcard_id = $2
      `,
      [userID, flashcardID]
    );

    return result.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = { userFlashcardQuery };
