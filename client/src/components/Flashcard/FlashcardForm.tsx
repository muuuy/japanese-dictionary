import { FormControl, FormLabel } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { FlashcardFormData } from "./FlashcardInterface";

interface FormData {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  popupData?: FlashcardFormData;
}

const FlashcardForm: React.FC<FormData> = ({ handleSubmit, popupData }) => {
  const [formData, setFormData] = useState<FlashcardFormData>(
    popupData
      ? { ...popupData }
      : {
          character: "",
          definition: "",
        }
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired className="mb-4">
        <FormLabel>
          <span className="font-black text-xl">CHARACTER (漢字)</span>
        </FormLabel>
        <Input
          name="character"
          onChange={handleChange}
          value={formData.character}
          borderColor={"black"}
          className="text-xs"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>
          <span className="font-black text-xl">DEFINITION (定義)</span>
        </FormLabel>
        <Input
          name="definition"
          onChange={handleChange}
          value={formData.definition}
          borderColor={"black"}
          className="text-xs"
        />
      </FormControl>
      <Button className="mt-8 w-96" type="submit" colorScheme="red">
        SUBMIT
      </Button>
    </form>
  );
};

export { FlashcardForm };
