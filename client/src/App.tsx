import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useContext } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import useUserStore from "./stores/store";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import WhiteboardForm from "./pages/WhiteboardForm";
import Whiteboard from "./pages/Whiteboard";
import Flashcards from "./pages/Flashcards";
import { Vocabulary } from "./pages/Vocabulary";
import MatchingQuiz from "./pages/MatchingQuiz";
import Quiz from "./pages/Quiz";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { MatchingQuizStart } from "./pages/MatchingQuizStart";
import { DropdownContext } from "./contexts/DropdownContext";
import { fetchAuthenticate } from "./util/fetchAuthenticate";
import { VocabularyQuizStart } from "./pages/VocabularyQuizStart";

const queryClient = new QueryClient();

function App() {
  const authUser = useUserStore((state) => state.authUser);
  const dropdownStatus = useContext(DropdownContext);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const res = await fetchAuthenticate();

        if (res.ok) {
          const response = await res.json();

          authUser(response.flashcards);
        }
      } catch (err) {
        console.log(err);
      }
    };

    authenticateUser();
  }, [authUser]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div
          className={`flex flex-1 min-h-screen bg-beige ${
            dropdownStatus.dropdownOpen ? "overflow-hidden max-h-full" : ""
          }`}
        >
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
              <Route
                path="/reset-password/:token"
                element={<ResetPassword />}
              />

              <Route path="/quiz" element={<Quiz />} />
              <Route path="/quiz/vocabulary-quiz" element={<Vocabulary />} />
              <Route
                path="/quiz/vocabulary-quiz/start"
                element={<VocabularyQuizStart />}
              />
              <Route path="/quiz/matching-quiz=" element={<MatchingQuiz />} />
              <Route
                path="/quiz/matching-quiz/start"
                element={<MatchingQuizStart />}
              />
            </Routes>
          </div>
        </div>
      </Router>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;
