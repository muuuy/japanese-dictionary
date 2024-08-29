const pool = require("../config/postgresDB");
const { DatabaseError } = require("../models/DatabaseError");

/**
 * Insert a new flashcard and user-flashcard into the db.
 *
 * @param {string} character
 * @param {string} definition
 * @param {string} userId
 * @returns
 */
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

/**
 * Deletes a flashcard and user-flashcard from the db.
 *
 * @param {string} userId
 * @param {string} flashcardId
 */
const deleteFlashcardQuery = async (userId, flashcardId) => {
  try {
    const deleteUserFlashcard = await pool.query(
      "DELETE FROM user_flashcards WHERE user_id = $1 AND flashcard_id = $2",
      [userId, flashcardId]
    );

    if (deleteUserFlashcard.rowCount === 0) {
      throw new DatabaseError("User Flashcard not found, deletion failed.");
    }

    const deleteFlashcard = await pool.query(
      "DELETE FROM flashcards WHERE flashcard_id = $1",
      [flashcardId]
    );

    if (deleteFlashcard.rowCount === 0) {
      throw new DatabaseError("Flashcard not found, deletion failed.");
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Updates the user's flashcard
 *
 * @param {string} flashcardId
 * @param {string} character
 * @param {string} definition
 */
const editFlashcardQuery = async (flashcardId, character, definition) => {
  try {
    const flashcard = await pool.query(
      "UPDATE flashcards SET character = $1, definition = $2 WHERE flashcard_id = $3",
      [character, definition, flashcardId]
    );

    if (flashcard.rowCount === 0) {
      throw new DatabaseError("Flashcard not found, edit failed.");
    }

    console.log(flashcard);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  insertFlashcardQuery,
  deleteFlashcardQuery,
  editFlashcardQuery,
};
