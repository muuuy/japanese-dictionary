import { useState, useEffect } from "react";
import { FormControl, FormLabel } from "@chakra-ui/react";
import { Input, Button } from "@chakra-ui/react";
import {
  FlashcardFormData,
  EditFlashcardMutationData,
} from "./FlashcardInterface";
import { useMutation } from "@tanstack/react-query";
import { editFlashcard } from "../../api/flashcard";
import useUserStore from "../../stores/store";

interface AddFlashcardProps {
  isEdit: boolean;
  id: number;
  character: string;
  definition: string;
}

const FlashcardForm: React.FC<AddFlashcardProps> = ({
  isEdit,
  id,
  character,
  definition,
}) => {
  const addFlashcard = useUserStore((state) => state.addFlashcard);
  const editFlashcardStore = useUserStore((state) => state.editFlashcard);
  const [formData, setFormData] = useState<FlashcardFormData>({
    character: character,
    definition: definition,
  });

  const editFlashcardMutation = useMutation({
    mutationKey: ["edit-flashcard"],
    mutationFn: async ({
      flashcard_id,
      formData,
    }: EditFlashcardMutationData) => {
      return await editFlashcard(flashcard_id, formData);
    },

    onSuccess: () => {},

    onError: () => {},
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

    if (formData.character === "" || formData.definition === "") {
      throw new Error("Missing info for the flashcard form");
    }

    isEdit ? await handleEdit() : await handleAdd();
  };

  const handleEdit = async () => {
    try {
      const res = await fetch(`http://localhost:3000/flashcards/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        editFlashcardStore(id, formData.character, formData.definition);
        setFormData({ character: "", definition: "" });
        return;
      } else console.log("failure");
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    try {
      const res = await fetch("http://localhost:3000/flashcards/", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        addFlashcard(data.flashcard);
        setFormData({ character: "", definition: "" });
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-white border-2 border-red-600 shadow-custom-red p-8 rounded-xl">
      <h1 className="text-4xl font-black text-center mb-8 tracking-widest">
        {isEdit ? "EDIT" : "ADD"} FLASHCARD
      </h1>
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
          {isEdit ? "EDIT" : "CREATE"}
        </Button>
      </form>
    </div>
  );
};

export { FlashcardForm };
