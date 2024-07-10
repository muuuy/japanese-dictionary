import React, { useEffect, useState, useCallback, useRef } from "react";
import useUserStore from "../stores/store";

import { Input, Button } from "@chakra-ui/react";

import FlashcardComponent from "../components/Flashcard/FlashcardComponent";
import FlashcardForm from "../components/Flashcard/FlashcardForm";

const Flashcards = () => {
  const flashcards = useUserStore((state) => state.flashcards);

  const [input, setInput] = useState<string>("");
  const [displayCards, setDisplayCards] = useState<JSX.Element[]>([]);

  const [displayPopup, setDisplayPopup] = useState<boolean>(false);
  const addFlashcardPopup = useRef<HTMLDivElement>(null);

  const [popupIsEdit, setPopupIsEdit] = useState<boolean>(false);
  const [popupCharacter, setPopupCharacter] = useState<string>("");
  const [popupDefinition, setPopupDefinition] = useState<string>("");

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
      return flashcards.map((flashcard, index) => (
        <FlashcardComponent
          flashcardData={{
            id: flashcard.id,
            character: flashcard.character,
            definition: flashcard.definition,
          }}
          handlePopup={handlePopup}
          key={`flashcard-${index}`}
        />
      ));
    } else {
      return flashcards
        .filter((flashcard) => flashcard.character.includes(input))
        .map((flashcard) => (
          <FlashcardComponent
            flashcardData={{
              id: flashcard.id,
              character: flashcard.character,
              definition: flashcard.definition,
            }}
            handlePopup={handlePopup}
            key={`flashcard-${flashcard.id}`}
          />
        ));
    }
  }, [flashcards, input]);

  const handlePopup = (
    isEdit: boolean,
    character: string,
    definition: string
  ) => {
    setDisplayPopup(true);

    if (popupIsEdit !== isEdit) setPopupIsEdit(isEdit);

    setPopupCharacter(character);
    setPopupDefinition(definition);
  };

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
          onClick={() => handlePopup(false, "test", "test")}
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
        <FlashcardForm
          isEdit={popupIsEdit}
          character={popupCharacter}
          definition={popupDefinition}
        />
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
