import { BrowserRouter as Routes, Route, Link } from "react-router-dom";

import { IconButton } from "@chakra-ui/react";

import { SectionData } from "../../interfaces";

const FunctionalitySection: React.FC<SectionData> = ({
  sectionName,
  description,
  linkTo,
  variant,
  isRound,
  iconType,
}) => {
  return (
    <div className="flex flex-col w-1/3 justify-center items-center text-center p-4 relative">
      <h3 className="text-3xl font-black mb-4">{sectionName}</h3>
      <p>{description}</p>
      <div className="absolute bottom-8">
        <Link to={`/${linkTo}`}>
          <IconButton
            aria-label={`${sectionName} Button`}
            icon={iconType}
            colorScheme="red"
            variant={variant}
            isRound={isRound}
          />
        </Link>
      </div>
    </div>
  );
};

export default FunctionalitySection;
