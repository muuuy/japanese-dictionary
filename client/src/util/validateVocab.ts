import { FlashcardData } from "../interfaces";

export const validateVocab = async (
  flashcard: FlashcardData,
  input: string
): Promise<boolean> => {
  try {
    const res = await fetch(
      `http://localhost:3000/vocab/${flashcard.flashcard_id}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          flashcard: flashcard,
          input: input,
        }),
      }
    );

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
