import { useState, useEffect } from "react";
import axios from "axios";

import useUserStore from "../../stores/store";

import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { Input, Button } from "@chakra-ui/react";

interface AddFlashcardProps {
  isEdit: boolean;
  character: string;
  definition: string;
}

type FormData = {
  character: string;
  definition: string;
};

const FlashcardForm: React.FC<AddFlashcardProps> = ({
  isEdit,
  character,
  definition,
}) => {
  const addFlashcard = useUserStore((state) => state.addFlashcard);

  const [formData, setFormData] = useState<FormData>({
    character: character,
    definition: definition,
  });

  useEffect(() => {
    setFormData({ character: character, definition: definition });
  }, [character, definition]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isEdit) {
      console.log("edit");
    } else {
      if (formData.character === "" && formData.definition === "") {
        console.log("empty");
      } else {
        const res = await axios.post(
          "http://localhost:3000/flashcards/",
          formData,
          { withCredentials: true }
        );

        if (res.status === 200) {
          addFlashcard(res.data.flashcard);
          setFormData({ character: "", definition: "" });
          return;
        }
      }
    }
  };

  return (
    <div className="bg-white border-2 border-red-600 p-8 rounded-xl">
      <h1 className="text-4xl font-black text-center mb-8 tracking-widest">
        {isEdit ? "EDIT" : "ADD"} FLASHCARD
      </h1>
      <form onSubmit={handleSubmit}>
        <FormControl isRequired className="mb-4">
          <FormLabel>character (漢字)</FormLabel>
          <Input
            name="character"
            onChange={handleChange}
            value={formData.character}
            className="text-xs"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>definition (定義)</FormLabel>
          <Input
            name="definition"
            onChange={handleChange}
            value={formData.definition}
            className="text-xs"
          />
        </FormControl>
        <Button className="mt-8 w-96" type="submit" colorScheme="red">
          CREATE
        </Button>
      </form>
    </div>
  );
};

export default FlashcardForm;
