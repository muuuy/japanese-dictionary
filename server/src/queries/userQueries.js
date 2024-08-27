const pool = require("../config/postgresDB");

/**
 * Query to get the user from the database via the USERS EMAIL.
 *
 * @param {string} email
 * @returns user, include the user_id and the hashed password
 */
const userQueryEmail = async (email) => {
  try {
    const results = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    return results.rows[0] || null;
  } catch (error) {
    throw error;
  }
};

/**
 * Query to get the user from the database via the USERS ID.
 *
 * @param {string} email
 * @returns user, include the user_id and the hashed password
 */
const userQueryID = async (user_id) => {
  try {
    const results = await pool.query("SELECT * FROM users WHERE user_id = $1", [
      user_id,
    ]);

    return results.rows[0] || null;
  } catch (error) {
    throw error;
  }
};

/**
 * Query to get flashcards from the database.
 *
 * @param {string} user_id
 * @returns Array of flashcards, including their flashcard_id, character, and definition
 */
const flashcardQuery = async (user_id) => {
  try {
    const results = await pool.query(
      "SELECT f.* FROM flashcards f JOIN user_flashcards uf ON f.flashcard_id = uf.flashcard_id WHERE uf.user_id = $1",
      [user_id]
    );

    if (results.rows.length <= 0) {
      return [];
    }

    return results.rows;
  } catch (error) {
    throw error;
  }
};

module.exports = { userQueryEmail, userQueryID, flashcardQuery };
