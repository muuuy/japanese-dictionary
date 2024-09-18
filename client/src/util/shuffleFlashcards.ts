import { FlashcardData } from "../interfaces";

/**
 * Shuffles the cards for the quizzes / tests
 * 
 * @param {FlashcardData[]} flashcards - Array that represents the user's flashcards.
 * @returns {FlashcardData[]} - Returns a shuffled flashcard based onthe input
 */
export function shuffleFlashcards(
  flashcards: FlashcardData[]
): FlashcardData[] {
  let currentIndex = flashcards.length;

  while (currentIndex != 0) {
    let randomIndex: number = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    const tempFlashcard: FlashcardData = flashcards[currentIndex];

    //Swap indexes
    flashcards[currentIndex] = flashcards[randomIndex];
    flashcards[randomIndex] = tempFlashcard;
  }

  return flashcards;
}
