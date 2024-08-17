export const fetchAuthenticate = async () => {
  return await fetch("http://localhost:3000/users/authenticate", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
