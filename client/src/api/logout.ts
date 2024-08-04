export const logout = async (): Promise<Response> => {
  return await fetch("http://localhost:3000/users/logout", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
