import JoinRoom from "../components/WhiteboardFormComponents/JoinRoom";
import CreateRoom from "../components/WhiteboardFormComponents/CreateRoom";
import { useState, useEffect } from "react";
import { ErrorBannerData } from "../interfaces";
import { Errors } from "../components/Errors/Errors";

const WhiteboardForm = () => {
  const [errorBanners, setErrorBanners] = useState<ErrorBannerData[]>([]);

  useEffect(() => {
    if (errorBanners.length > 0) {
      const timer = setTimeout(
        () => setErrorBanners((prev) => prev.splice(1)),
        5000
      );

      return () => clearTimeout(timer);
    }
  }, [errorBanners]);

  const addErrorBanner = (
    title: string,
    description: string,
    link?: string
  ) => {
    setErrorBanners((prev) => [
      ...prev,
      { title: title, description: description, link: link },
    ]);
  };

  return (
    <>
      <div className="flex flex-1 flex-col justify-center">
        <div className="flex flex-col items-center mb-20 -mt-20">
          <h1 className="page--header">WHITEBOARD</h1>
          <h2 className="page--header-description">
            Practice writing characters by yourself or with others!
          </h2>
        </div>
        <div className="flex flex-row order-4">
          <CreateRoom addErrorBanner={addErrorBanner} />
          <JoinRoom addErrorBanner={addErrorBanner} />
        </div>
      </div>
      <Errors errorBanners={errorBanners} />
    </>
  );
};

export default WhiteboardForm;
