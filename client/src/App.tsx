import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import WhiteboardForm from "./pages/WhiteboardForm";
import Whiteboard from "./pages/Whiteboard";
import Flashcards from "./pages/Flashcards";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  return (
    <Router>
      <div className="flex flex-1 min-h-screen">
        <Navbar />
        <div className="flex flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-whiteboard/" element={<WhiteboardForm />} />
            <Route path="/whiteboard/" element={<Whiteboard />} />
            <Route path="/flashcards/" element={<Flashcards />} />

            <Route path="/login/" element={<Login />} />
            <Route path="/signup/" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
