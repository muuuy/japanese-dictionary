import { useState } from "react";
import "./index.css";

import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";

import Home from "./components/Home";

function App() {
  interface User {
    name: string;
    id: number;
  }

  const user: User = {
    name: "matt",
    id: 0,
  };

  return (
    <>
      <Home />
      <p>{user.name}</p>

      <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
    </>
  );
}

export default App;
