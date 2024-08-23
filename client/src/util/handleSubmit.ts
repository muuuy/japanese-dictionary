import { FetchData, FetchInfoResponse } from "./UtilInterfaces";

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
