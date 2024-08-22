import { FlashcardData } from "../interfaces";

export const validateVoacb = async (
  flashcard: FlashcardData,
  input: string
): boolean => {
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

    const result = await res.json();

    return true;
  } catch (error) {
    return false;
  }
};
