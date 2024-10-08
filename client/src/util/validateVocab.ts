import { ValidateBodyData } from "../interfaces";

/**
 * Checks with the server to see if the user's input for a quiz is valid.
 * 
 * @param {int} flashcard_id
 * @param {string} character 
 * @param {string} definition 
 * @param {string} input - The user's input 
 * @returns {Promise<boolean>} - Returns result of whether it matches or not
 */
export const validateVocab = async (
  flashcard_id: number,
  character: string,
  definition: string,
  input?: string
): Promise<boolean> => {
  const bodyInfo: ValidateBodyData = {
    flashcard_id: flashcard_id,
    character: character,
    definition: definition,
  };

  if (input) {
    bodyInfo.input = input;
  }

  try {
    const res = await fetch(`http://localhost:3000/vocab/${flashcard_id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyInfo),
    });

    const response = await res.json();

    if (!res.ok) {
      if (Array.isArray(response.errors)) {
        throw new Error(response.errors[0].msg);
      } else {
        throw new Error(response.errors);
      }
    }

    const isCorrect = response.isCorrect;

    return isCorrect;
  } catch (error) {
    console.error("Error validating vocabulary:", error);
    throw error;
  }
};
