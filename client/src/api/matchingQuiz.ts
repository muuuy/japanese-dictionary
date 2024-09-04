import { FlashcardData } from "../interfaces";

const validateMatching = async (
  flashcard_id: number,
  character: string,
  definition: string
) => {
  try {
    const res = await fetch(`http://localhost:3000/vocab/${flashcard_id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ character: character, definition: definition }),
    });

    const repsonse = await res.json();
  } catch (error) {
    throw error;
  }
};
