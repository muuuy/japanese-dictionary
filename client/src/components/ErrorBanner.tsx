import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import clsx from "clsx";
import { ErrorBannerData } from "../interfaces";

const ErrorBanner: React.FC<ErrorBannerData> = ({ title, description }) => {
  return (
    <div className={clsx("absolute bottom-8 right-8", "animate-fade-out")}>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  );
};

export default ErrorBanner;
//LOGGING IN ERROR TITLE: Error logging in!
