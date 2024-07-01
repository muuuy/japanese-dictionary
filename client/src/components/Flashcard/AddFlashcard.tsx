import { useEffect, useState } from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Input, Button } from "@chakra-ui/react";

type AddFLashcardProp = {
  addFlashcard: (character: string, definition: string) => void;
};

type FormData = {
  character: string;
  definition: string;
};

const AddFlashcard: React.FC<AddFLashcardProp> = ({ addFlashcard }) => {
  const [formData, setFormData] = useState<FormData>({
    character: "",
    definition: "",
  });

  const handleChange = (event) => {
    event.preventDefault();

    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  return (
    <div className="bg-white border-2 border-teal p-8 rounded-xl">
      <FormControl>
        <FormLabel>CHARACTER / PHRASE</FormLabel>
        <Input name="character" onChange={handleChange} />
      </FormControl>
      <FormControl>
        <FormLabel>DESCRIPTION / DEFINITION</FormLabel>
        <Input name="definition" onChange={handleChange} />
      </FormControl>
      <Button
        onClick={() => addFlashcard(formData.character, formData.definition)}
      >
        CREATE
      </Button>
    </div>
  );
};

export default AddFlashcard;
