import { CloseIcon } from "@chakra-ui/icons";
import { useRef, useEffect } from "react";
import { VocabularyRules } from "../Rules/VocabularyRules";
import { MatchingRules } from "../Rules/MatchingRules";
import { RuleTypes } from "./StartInterface";

interface RulesData {
  handleClose: () => void;
  ruleType: string;
}

const Rules: React.FC<RulesData> = ({ handleClose, ruleType }) => {
  const rulesRef = useRef<HTMLDivElement | null>(null);

  const renderRules = (): React.ReactNode | null => {
    switch (ruleType) {
      case RuleTypes.VOCAB:
        return <VocabularyRules />;
      case RuleTypes.MATCHING:
        return <MatchingRules />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rulesRef.current && !rulesRef.current.contains(event.target as Node))
        handleClose();
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => window.removeEventListener("mousedown", handleClickOutside);
  });

  return (
    <div
      className="absolute left-1/2 -translate-x-1/2 z-6 bg-beige text-center flex flex-col gap-4 border-2 border-black p-8 rounded-3xl z-20 animate-rules--fade-in"
      ref={rulesRef}
    >
      <CloseIcon
        className="absolute top-4 right-4 cursor-pointer hover:text-red-500"
        onClick={handleClose}
      />
      <h3 className="font-black text-4xl text-red-500 italic">RULES</h3>
      {renderRules()}
    </div>
  );
};

export { Rules };
