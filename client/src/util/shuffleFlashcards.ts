import { FlashcardData } from "../interfaces";

//Shuffle flashcards to randomize it  for quizzes
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
