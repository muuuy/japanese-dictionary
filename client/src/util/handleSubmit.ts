// Fetch requests for FORMS (Login, Signup, Forgot Password, Reset Password, etc.)
// Typically used with React Query

import { FetchData, FetchInfoResponse } from "./UtilInterfaces";

/**
 * Fetches the info from the server based on user input from the form
 * 
 * @param param0 - User input from form
 * @returns {Promise<Response>} - Returns the results of the fetch
 */
export const fetchInfo = async ({
  urlPath,
  formData,
}: FetchData): Promise<Response> => {
  return await fetch(`http://localhost:3000${urlPath}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};

/**
 * Fetches the actual information that the server returns after a fetch request to it
 * Used for user forms
 * Utilized fetchInfo()
 * Can throw an error if something breaks during the fetch request
 * 
 * @param param0 
 * @returns 
 */
export const fetchQueryInfo = async ({
  urlPath,
  formData,
}: FetchData): Promise<FetchInfoResponse> => {
  let response;

  try {
    const res = await fetchInfo({ urlPath: urlPath, formData: formData });

    response = await res.json();

    console.log("response", response);

    if (!res.ok) {
      console.log(response.errors);

      if (Array.isArray(response.errors)) {
        throw new Error(response.errors[0].msg);
      } else {
        throw new Error(response.errors);
      }
    }
  } catch (error) {
    console.log(error);
    throw error;
  }

  return response;
};
