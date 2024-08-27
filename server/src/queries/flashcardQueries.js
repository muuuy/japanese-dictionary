const pool = require("../config/postgresDB");

const insertFlashcardQuery = async (character, definition, userId) => {
  try {
    const insertFlashcard = await pool.query(
      "INSERT INTO flashcards (character, definition) VALUES ($1, $2) RETURNING *",
      [character, definition]
    );

    if (insertFlashcard.rowCount > 0) {
      const newFlashcard = insertFlashcard.rows[0];

      await pool.query(
        "INSERT INTO user_flashcards (user_id, flashcard_id) VALUES ($1, $2)",
        [userId, newFlashcard.flashcard_id]
      );

      return newFlashcard;
    }

    return null;
  } catch (error) {
    throw error;
  }
};

module.exports = { insertFlashcardQuery };
