import { useState } from "react";
import axios from "axios";

import useUserStore from "../../stores/store";

import { FormControl, FormLabel, FormErrorMessage } from "@chakra-ui/react";
import { Input, Button } from "@chakra-ui/react";

type FormData = {
  character: string;
  definition: string;
};

const AddFlashcard = () => {
  const addFlashcard = useUserStore((state) => state.addFlashcard);

  const [formData, setFormData] = useState<FormData>({
    character: "",
    definition: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
  };

  return (
    <div className="bg-white border-2 border-red-600 p-8 rounded-xl">
      <form onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>CHARACTER / PHRASE</FormLabel>
          <Input
            name="character"
            onChange={handleChange}
            value={formData.character}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>DESCRIPTION / DEFINITION</FormLabel>
          <Input
            name="definition"
            onChange={handleChange}
            value={formData.definition}
          />
        </FormControl>
        <Button className="mt-8 w-96" type="submit" colorScheme="red">
          CREATE
        </Button>
      </form>
    </div>
  );
};

export default AddFlashcard;
