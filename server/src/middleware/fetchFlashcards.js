const Flashcard = require("../models/Flashcard");

const fetchFlashcards = async (flashcards) => {
  const flashcardItems = await Promise.all(
    flashcards.map(
      async (flashcardID) => await Flashcard.findById(flashcardID).exec()
    )
  );

  return flashcardItems;
};

module.exports = fetchFlashcards;
