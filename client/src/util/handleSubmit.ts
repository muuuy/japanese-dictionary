// import { LoginFormData } from "../interfaces";
// import { FlashcardData } from "../interfaces";

export const fetchInfo = async (
  urlPath: string,
  formData: string
): Promise<Response | boolean> => {
  try {
    return await fetch(`http://localhost:3000/${urlPath}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: formData }),
    });
  } catch (err) {
    console.error(`Error Fetching from ${urlPath}: ${err}`);
    return false;
  }
};

// export const handleSubmit = async (
//   loading: boolean,
//   setLoading: (value: boolean) => void,
//   formData: LoginFormData,
//   authUser: (flashcards: FlashcardData[]) => void,
//   navigate: (path: string) => void,
//   addErrorBanner: (title: string, message: string) => void
// ) => {
//   if (loading) {
//     return;
//   }

//   setLoading(true);

//   try {
//     const res = await fetch("http://localhost:3000/users/login", {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(formData),
//     });

//     if (res.ok) {
//       const data = await res.json();
//       authUser(data.flashcards);
//       navigate("/");
//     } else {
//       setLoading(false);

//       const response = await res.json();

//       console.log(response);
//       addErrorBanner("Error logging in!", response.errors[0].msg);
//     }
//   } catch (err) {
//     console.log(err, "test");
//     setLoading(false);
//   }
// };
