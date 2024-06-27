import { useState } from "react";
import "./App.css";

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
    </>
  );
}

export default App;
