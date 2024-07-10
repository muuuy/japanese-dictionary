const Flashcard = require("../models/Flashcard");

const fetchFlashcards = async (flashcards) => {
  const flashcardItems = await Promise.all(
    flashcards.map(async (flashcardID) => {
      const flashcard = await Flashcard.findById(flashcardID).exec();
      return {
        id: flashcard._id,
        character: flashcard.character,
        definition: flashcard.definition,
      };
    })
  );

  return flashcardItems;
};

module.exports = fetchFlashcards;
