import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import WhiteboardForm from "./components/WhiteboardForm";

const router = createBrowserRouter([
  {
    path: "/create-whiteboard/",
    element: <WhiteboardForm />,
  },
]);

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
    <Router>
      <div className="flex">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-whiteboard/" element={<WhiteboardForm />} />
          </Routes>
        </div>
      </div>{" "}
    </Router>
  );
}

export default App;
