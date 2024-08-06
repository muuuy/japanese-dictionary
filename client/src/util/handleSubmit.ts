import { LoginFormData } from "../interfaces";
import { FlashcardData } from "../interfaces";

export const fetchInfo = async (
  urlPath: string,
  formData: string | LoginFormData
): Promise<Response> => {
  return await fetch(`http://localhost3000${urlPath}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  // const res = await fetch(`http://localhost:3000/${urlPath}`, {
  //   method: "POST",
  //   credentials: "include",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   // body: JSON.stringify({ email: formData }),
  //   body: JSON.stringify(formData),
  // });

  // const response = await res.json();

  // if (!res.ok) {
  //   throw new Error("Problem logging in!");
  // }

  // return response;
};
