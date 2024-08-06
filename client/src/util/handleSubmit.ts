import { FetchData, FetchInfoResponse } from "../interfaces";

export const fetchInfo = async ({
  urlPath,
  formData,
}: FetchData): Promise<FetchInfoResponse> => {
  const res = await fetch(`http://localhost:3000${urlPath}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const response = await res.json();

  if (!res.ok) {
    console.log(response.errors);

    if (Array.isArray(response.errors)) {
      throw new Error(response.errors[0].msg);
    } else {
      throw new Error(response.errors);
    }
  }

  return response;
};
