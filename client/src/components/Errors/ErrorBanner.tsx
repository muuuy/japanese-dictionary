import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import clsx from "clsx";
import { ErrorBannerData } from "../../interfaces";

const ErrorBanner: React.FC<ErrorBannerData> = ({
  title,
  description,
  link,
}) => {
  return (
    <div className={clsx("animate-fade-out")}>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>
          {!link ? (
            description
          ) : (
            <>
              {description}
              <a href={link} className="font-semibold italic text-blue-500">
                HERE!
              </a>
            </>
          )}
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default ErrorBanner;
