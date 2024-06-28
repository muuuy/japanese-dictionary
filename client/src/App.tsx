import "./index.css";

import Navbar from "./components/Navbar";

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
      <Navbar />
    </>
  );
}

export default App;
