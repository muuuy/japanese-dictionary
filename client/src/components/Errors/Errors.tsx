import ErrorBanner from "./ErrorBanner";
import { ErrorBannerData } from "../../interfaces";

interface ErrorsData {
  errorBanners: ErrorBannerData[];
}

const Errors: React.FC<ErrorsData> = ({ errorBanners }) => {
  return (
    <div className="absolute bottom-8 right-8 flex flex-col gap-2">
      {errorBanners.map((banner, index) => (
        <ErrorBanner
          key={`error-banner-${index}`}
          title={banner.title}
          description={banner.description}
        />
      ))}
    </div>
  );
};

export default Errors;
