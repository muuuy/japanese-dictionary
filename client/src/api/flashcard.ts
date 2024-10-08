import { FlashcardData } from "../interfaces";
import { FlashcardFormData } from "../components/Flashcard/FlashcardInterface";

//API call to delete flashcard (DELETE)
export const deleteFlashcard = async (flashcardId: number): Promise<number> => {
  try {
    const res = await fetch(`http://localhost:3000/flashcards/${flashcardId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();

    if (!res.ok) {
      if (Array.isArray(response.errors)) {
        throw new Error(response.errors[0].msg);
      } else {
        throw new Error(response.errors);
      }
    }

    const responseFlashcardId = response.flashcardId;

    return parseInt(responseFlashcardId);
  } catch (error) {
    throw error;
  }
};

//API call to edit flashcard (PUT)
export const editFlashcard = async (
  flashcardId: number,
  formData: FlashcardFormData
): Promise<FlashcardData> => {
  try {
    const res = await fetch(`http://localhost:3000/flashcards/${flashcardId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const response = await res.json();

    if (!res.ok) {
      if (Array.isArray(response.errors)) {
        throw new Error(response.errors[0].msg);
      } else {
        throw new Error(response.errors);
      }
    }

    const flashcard_id = parseInt(response.flashcard_id);
    const character = response.character;
    const definition = response.definition;

    return {
      flashcard_id: flashcard_id,
      character: character,
      definition: definition,
    };
  } catch (error) {
    throw error;
  }
};

//API call to add flashcard (POST)
export const addFlashcard = async (formData: FlashcardFormData) => {
  try {
    const res = await fetch(`http://localhost:3000/flashcards`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const response = await res.json();

    if (!res.ok) {
      if (Array.isArray(response.errors)) {
        throw new Error(response.errors[0].msg);
      } else {
        throw new Error(response.errors);
      }
    }

    return response.flashcard;
  } catch (error) {
    throw error;
  }
};
