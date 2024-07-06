import axios from "axios";

export const logout = async (): Promise<boolean> => {
  try {
    const res = await axios.post("http://localhost:3000/users/logout", null, {
      withCredentials: true,
    });

    if (res.status === 200) {
      return true;
    }
  } catch (err) {
    console.log(err);
  }

  return false;
};
