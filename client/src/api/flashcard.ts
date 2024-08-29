export const deleteFlashcard = async (flashcardId: string): Promise<string> => {
  try {
    const res = await fetch(`http://localhost:3000/flashcards/${flashcardId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();

    if (!res.ok) {
      if (Array.isArray(response.errors)) {
        throw new Error(response.errors[0].msg);
      } else {
        throw new Error(response.errors);
      }
    }

    if (typeof response.flashcardId === "string")
      console.log("response", response);

    if (typeof flashcardId === "string") console.log("yes");
    else console.log(typeof flashcardId);

    // if (parseInt(response.flashcardId) === flashcardId) {
    //   console.log("equal");
    // }

    const responseFlashcardId = response.flashcardId;

    return flashcardId;
  } catch (error) {
    throw error;
  }
};
