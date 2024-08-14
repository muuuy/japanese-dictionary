import { Link } from "react-router-dom";
import { IconButton } from "@chakra-ui/react";
import { SectionData } from "../../interfaces";
import clsx from "clsx";

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
      <div
        className={clsx(
          "absolute",
          "2xl:top-40",
          "xl:top-36",
          "lg:top-36",
          "md:top-36",
          "sm:top-40"
        )}
      >
        <h3
          className={clsx(
            "text-3xl font-black",
            "lg:text-3xl",
            "md:text-2xl",
            "sm:text-2xl"
          )}
        >
          {sectionName}
        </h3>
        <h4
          className={clsx(
            "font-black text-red-600 mb-4",
            "lg:text-xl",
            "md:text-base",
            "sm:text-base"
          )}
        >
          {japaneseName}
        </h4>
      </div>

      <p
        className={clsx(
          "font-semibold text-xl",
          "lg:text-xl",
          "md:text-base",
          "sm:text-sm"
        )}
      >
        {description}
      </p>
      <div className="absolute bottom-8">
        <Link to={`/${linkTo}`}>
          <IconButton
            aria-label={`${sectionName} Button`}
            icon={iconType}
            colorScheme="red"
            variant={variant}
            background={variant === "outline" ? "white" : undefined}
            isRound={isRound}
          />
        </Link>
      </div>
    </div>
  );
};

export default FunctionalitySection;
