/**
 * Makes sure that the user is authenticated
 * Sends a fetch request to server to check if the user's session is authenticated
 * 
 * @returns {Promise<Response>} - Returns the result of the promise (Auth or not auth)
 */
export const fetchAuthenticate = async () => {
  return await fetch("http://localhost:3000/users/authenticate", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
