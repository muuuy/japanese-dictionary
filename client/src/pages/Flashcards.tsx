import React, { useEffect, useState, useCallback } from "react";

import { Input, Button } from "@chakra-ui/react";

import FlashcardComponent from "../components/FlashcardComponent";
import Flashcard from "../interfaces";

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    { id: 1, character: "あ", definition: "a" },
    { id: 2, character: "い", definition: "i" },
    { id: 3, character: "え", definition: "e" },
    { id: 4, character: "お", definition: "o" },
    { id: 5, character: "う", definition: "u" },
    { id: 6, character: "ありがとう", definition: "thank you" },
    { id: 7, character: "あまり", definition: "not much" },
    { id: 8, character: "あなた", definition: "you" },
    { id: 9, character: "いや", definition: "no" },
    { id: 10, character: "お手洗い", definition: "toilet" },
  ]);

  const currentID = useState<number>(6);
  const [input, setInput] = useState<string>("");
  const [displayCards, setDisplayCards] = useState<JSX.Element[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  const populateDisplayCards = useCallback(() => {
    if (input === "") {
      return flashcards.map((flashcard) => (
        <FlashcardComponent
          id={flashcard.id}
          character={flashcard.character}
          definition={flashcard.definition}
        />
      ));
    } else {
      return flashcards
        .filter((flashcard) => flashcard.character.includes(input))
        .map((flashcard) => (
          <FlashcardComponent
            id={flashcard.id}
            character={flashcard.character}
            definition={flashcard.definition}
          />
        ));
    }
  }, [flashcards, input]);

  useEffect(() => {
    setDisplayCards(populateDisplayCards());
  }, [populateDisplayCards]);

  const createFlashcard = () => {};

  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <h1 className="page--header">FLASHCARDS</h1>
      <h2 className="page--header-description">
        Create, study, update, and delete flashcards.
      </h2>
      <div className="flex flex-row">
        <Input onChange={handleChange} name="add_flashcard" />
        <Button onClick={createFlashcard} colorScheme="teal">
          ADD
        </Button>
      </div>
      <div className="flex flex-row flex-wrap justify-center items-center gap-8 mx-1 mt-8">
        {displayCards}
      </div>
    </div>
  );
};

export default Flashcards;
