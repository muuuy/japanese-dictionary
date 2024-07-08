import React, { useEffect, useState, useCallback, useRef } from "react";

import { Input, Button } from "@chakra-ui/react";

import FlashcardComponent from "../components/Flashcard/FlashcardComponent";
import AddFlashcard from "../components/Flashcard/AddFlashcard";

import { Flashcard } from "../interfaces";

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

  const [currentID, setCurrentID] = useState<number>(11);
  const [input, setInput] = useState<string>("");
  const [displayCards, setDisplayCards] = useState<JSX.Element[]>([]);

  const [displayPopup, setDisplayPopup] = useState<boolean>(false);
  const addFlashcardPopup = useRef<HTMLDivElement>(null);

  //DELETE THE FUNCTION BELOW (JUST THE ONE)
  //JUST FOR TESTING PURPOSES
  //GOING TO ADD BACKEND + DB INSTEAD OF STORING IN OBJECT
  const addFlashcard = (character: string, definition: string) => {
    if (character === "" && definition === "") {
      return;
    }

    setFlashcards([
      ...flashcards,
      { id: currentID, character: character, definition: definition },
    ]);
    setCurrentID((prev) => prev + 1);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        displayPopup &&
        addFlashcardPopup.current &&
        !addFlashcardPopup.current.contains(event.target as Node)
      ) {
        setDisplayPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, [displayPopup]);

  const populateDisplayCards = useCallback(() => {
    if (input === "") {
      return flashcards.map((flashcard) => (
        <FlashcardComponent
          id={flashcard.id}
          character={flashcard.character}
          definition={flashcard.definition}
          key={`flashcard-${flashcard.id}`}
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
            key={`flashcard-${flashcard.id}`}
          />
        ));
    }
  }, [flashcards, input]);

  useEffect(() => {
    setDisplayCards(populateDisplayCards());
  }, [populateDisplayCards]);

  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <h1 className="page--header">FLASHCARDS</h1>
      <h2 className="page--header-description">
        Create, study, update, and delete flashcards.
      </h2>
      <div className="flex flex-col gap-2 mt-4 w-96 items-center">
        <Input onChange={handleChange} value={input} name="add_flashcard" />
        <Button
          onClick={() => setDisplayPopup(true)}
          colorScheme="red"
          width={"200px"}
        >
          ADD
        </Button>
      </div>
      <div className="flex flex-row flex-wrap justify-center items-center gap-8 mx-1 mt-8">
        {displayCards}
      </div>
      <div
        className={`absolute z-50 ${displayPopup ? "block" : "hidden"}`}
        ref={addFlashcardPopup}
      >
        <AddFlashcard addFlashcard={addFlashcard} />
      </div>
      <div
        className={`absolute inset-0 bg-black opacity-50 z-0 ${
          displayPopup ? "block" : "hidden"
        }`}
      ></div>
    </div>
  );
};

export default Flashcards;
