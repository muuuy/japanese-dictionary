import React, { useEffect, useState, useCallback } from "react";

import { Input, Button } from "@chakra-ui/react";

interface Flashcard {
  id: number;
  character: string;
  definition: string;
}

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    { id: 1, character: "あ", definition: "a" },
    { id: 2, character: "い", definition: "i" },
    { id: 3, character: "え", definition: "e" },
    { id: 4, character: "お", definition: "o" },
    { id: 5, character: "う", definition: "u" },
    { id: 1, character: "ありがとう", definition: "thank you" },
    { id: 1, character: "あまり", definition: "not much" },
    { id: 1, character: "あなた", definition: "you" },
    { id: 1, character: "いや", definition: "no" },
    { id: 1, character: "お手洗い", definition: "toilet" },
  ]);

  const currentID = useState<number>(6);
  const [input, setInput] = useState<string>("");
  const [displayCards, setDisplayCards] = useState<Element[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInput(event.target.value);
    setDisplayCards(populateDisplayCards(input));
  };

  const populateDisplayCards = useCallback(
    (inputVal: string) => {
      if (input === "") {
        return flashcards.map((flashcard) => (
          <div
            className="flex flex-row gap-4"
            key={`flashcard-${flashcard.id}`}
          >
            <p>ID: {flashcard.id}</p>
            <p>CHARACTER: {flashcard.character}</p>
            <p>DEFINITION: {flashcard.definition}</p>
          </div>
        ));
      } else {
        return flashcards
          .filter((flashcard) => flashcard.character.includes(input))
          .map((flashcard) => (
            <div
              className="flex flex-row gap-4"
              key={`flashcard-${flashcard.id}`}
            >
              <p>ID: {flashcard.id}</p>
              <p>CHARACTER: {flashcard.character}</p>
              <p>DEFINITION: {flashcard.definition}</p>
            </div>
          ));
      }
    },
    [flashcards, input]
  );

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
      <div>
        {input === ""
          ? flashcards.map((flashcard) => (
              <div
                className="flex flex-row gap-4"
                key={`flashcard-${flashcard.id}`}
              >
                <p>ID: {flashcard.id}</p>
                <p>CHARACTER: {flashcard.character}</p>
                <p>DEFINITION: {flashcard.definition}</p>
              </div>
            ))
          : flashcards
              .filter((flashcard) => flashcard.character.includes(input))
              .map((filteredCard) => (
                <div
                  className="flex flex-row gap-4"
                  key={`flashcard-${filteredCard.id}`}
                >
                  <p>ID: {filteredCard.id}</p>
                  <p>CHARACTER: {filteredCard.character}</p>
                  <p>DEFINITION: {filteredCard.definition}</p>
                </div>
              ))}
      </div>
    </div>
  );
};

export default Flashcards;
