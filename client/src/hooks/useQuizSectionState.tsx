import { useState } from "react";
import { SectionManagerData } from "../components/Quiz/QuizInterface";

// Custom hook that manages the Quiz page's state for which section is active
const useQuizSectionState = (): SectionManagerData => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleActiveSession = (e: React.MouseEvent<HTMLDivElement>) => {
    const id: string | null = e.currentTarget.getAttribute("id");

    if (id === activeSection) {
      setActiveSection(null);
    } else {
      setActiveSection(id);
    }
  };

  return { active: activeSection, setActive: handleActiveSession };
};

export { useQuizSectionState };
