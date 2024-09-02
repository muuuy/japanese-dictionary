import { useEffect, useState, useMemo, useRef } from "react";
import { Input, Button } from "@chakra-ui/react";
import { FlashcardComponent } from "../components/Flashcard/FlashcardComponent";
import { EditFlashcardForm } from "../components/Flashcard/EditFlashcardForm";
import { FlashcardFormData } from "../components/Flashcard/FlashcardInterface";
import { AddFlashcardForm } from "../components/Flashcard/AddFlashcardForm";
import { FlashcardFormType } from "../components/Flashcard/FlashcardInterface";
import { DeletePopup } from "../components/Flashcard/DeletePopup";
import useUserStore from "../stores/store";

const Flashcards = () => {
  const flashcards = useUserStore((state) => state.flashcards);
  const [input, setInput] = useState<string>("");
  const [displayPopup, setDisplayPopup] = useState<boolean>(false);
  const addFlashcardPopup = useRef<HTMLDivElement>(null);
  const [popupType, setPopupType] = useState<FlashcardFormType>(
    FlashcardFormType.ADD
  );
  const [formData, setFormData] = useState<FlashcardFormData>({
    character: "",
    definition: "'",
  });
  const [popupID, setPopupID] = useState<number>(-1);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  //Click outside of popup -> Close popup
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

  //For DELETE and EDIT popup
  const handlePopup = (
    formType: FlashcardFormType,
    id: number,
    character?: string,
    definition?: string
  ) => {
    setDisplayPopup(true);

    if (popupType !== formType) {
      setPopupType(formType);
    }

    if (character && definition) {
      setFormData({ character: character, definition: definition });
    }

    setPopupID(id);
  };

  const handleAdd = () => {
    setDisplayPopup(true);
    setPopupType(FlashcardFormType.ADD);
  };

  const closePopup = () => {
    setDisplayPopup(false);
  };

  const populateDisplayCards = useMemo(() => {
    if (input === "") {
      return flashcards.map((flashcard, index) => (
        <FlashcardComponent
          flashcardData={{
            flashcard_id: flashcard.flashcard_id,
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
              flashcard_id: flashcard.flashcard_id,
              character: flashcard.character,
              definition: flashcard.definition,
            }}
            handlePopup={handlePopup}
            key={`flashcard-${flashcard.flashcard_id}`}
          />
        ));
    }
  }, [flashcards, input]);

  return (
    <div className="flex flex-col flex-1 justify-center items-center">
      <h1 className="page--header">FLASHCARDS</h1>
      <h2 className="page--header-description">
        Create, study, update, and delete flashcards.
      </h2>
      <div className="flex flex-col gap-2 mt-4 w-96 items-center">
        <Input
          onChange={handleChange}
          value={input}
          borderColor={"black"}
          backgroundColor={"white"}
          name="add_flashcard"
        />
        <Button onClick={handleAdd} colorScheme="red" width={"200px"}>
          <span className="font-black text-2xl">ADD</span>
        </Button>
      </div>
      <div className="flex flex-row flex-wrap justify-center items-center gap-8 mx-1 mt-8">
        {populateDisplayCards}
      </div>
      <div
        className={`absolute z-50 ${displayPopup ? "block" : "hidden"}`}
        ref={addFlashcardPopup}
      >
        {popupType === FlashcardFormType.EDIT ? (
          <EditFlashcardForm
            flashcard_id={popupID}
            editFormData={formData}
            closePopup={closePopup}
          />
        ) : popupType === FlashcardFormType.ADD ? (
          <AddFlashcardForm closePopup={closePopup} />
        ) : (
          <DeletePopup flashcard_id={popupID} closePopup={closePopup} />
        )}
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
