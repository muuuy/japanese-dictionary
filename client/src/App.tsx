import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

import useUserStore from "./stores/store";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import WhiteboardForm from "./pages/WhiteboardForm";
import Whiteboard from "./pages/Whiteboard";
import Flashcards from "./pages/Flashcards";
import Quiz from "./pages/Quiz";
import MatchingQuiz from "./pages/MatchingQuiz";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const authUser = useUserStore((state) => state.authUser);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/users/authenticate",
          null,
          {
            withCredentials: true,
          }
        );

        if (res.status === 200) {
          authUser(res.data.flashcards);
        }
      } catch (err) {
        console.log(err);
      }
    };

    authenticateUser();
  }, [authUser]);

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
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/quiz/matching-quiz" element={<MatchingQuiz />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
