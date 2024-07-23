import { BrowserRouter as Routes, Route, Link } from "react-router-dom";

import { IconButton } from "@chakra-ui/react";

import { SectionData } from "../../interfaces";

const FunctionalitySection: React.FC<SectionData> = ({
  sectionName,
  japaneseName,
  description,
  linkTo,
  variant,
  isRound,
  iconType,
}) => {
  return (
    <div className="flex flex-col w-1/3 justify-center items-center text-center p-4 relative">
      <h3 className="text-3xl font-black">{sectionName}</h3>
      <h4 className="text-xl font-black text-red-600 mb-4">{japaneseName}</h4>
      <p className="font-semibold text-xl">{description}</p>
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
