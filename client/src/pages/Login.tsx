import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useUserStore from "../stores/store";
import { FormControl } from "@chakra-ui/react";
import { ErrorBannerData } from "../interfaces";
import LoginImage from "../assets/login_image.jpg";
import Errors from "../components/Errors/Errors";
import { Skeleton } from "@chakra-ui/react";
import UserFormButton from "../components/UserFormComponents/UserFormButton";
import { LoginFormData } from "../interfaces";
import EmailInput from "../components/UserFormComponents/EmailInput";
import PasswordInput from "../components/UserFormComponents/PasswordInput";

const Login = () => {
  const authUser = useUserStore((state) => state.authUser);
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const [errorBanners, setErrorBanners] = useState<ErrorBannerData[]>([]);

  useEffect(() => {
    if (errorBanners.length > 0) {
      const timer = setTimeout(
        () => setErrorBanners((prev) => prev.slice(1)),
        5000
      );

      return () => clearTimeout(timer);
    }
  }, [errorBanners]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    if (loading) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        authUser(data.flashcards);
        navigate("/");
      } else {
        setLoading(false);

        const response = await res.json();

        console.log(response);
        addErrorBanner("Error logging in!", response.errors[0].msg);
      }
    } catch (err) {
      console.log(err, "test");
      setLoading(false);
    }
  };

  const addErrorBanner = (title: string, description: string) => {
    setErrorBanners((prev) => [
      ...prev,
      { title: title, description: description },
    ]);
  };

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  return (
    <Skeleton
      className="page--container"
      isLoaded={imageLoaded}
      fadeDuration={1}
    >
      <div className="user-form--container">
        <div className="user-form--form-container">
          <h1 className="user-form--header">LOGIN</h1>
          <p className="mb-4 italic">
            Welcome back! Sign in to start studying!
          </p>
          <form onSubmit={handleSubmit}>
            <FormControl className="text-center" isRequired>
              <EmailInput
                handleInput={handleInput}
                email={formData.email}
                id="login--email"
              />
              <PasswordInput
                handleInput={handleInput}
                password={formData.password}
                id="login--password"
              />
              <p className="text-right">
                <Link
                  to={"/forgot-password/"}
                  className="text-red-500 font-black italic font-bold text-xs hover:text-red-700"
                >
                  Forgot password?
                </Link>
              </p>
              <UserFormButton handleSubmit={handleSubmit} loading={loading} />
              <p className="italic font-semibold text-sm">
                Don't have an account?{" "}
                <Link
                  to={"/signup/"}
                  className="text-red-500 font-black hover:text-red-700"
                >
                  SIGN UP
                </Link>
              </p>
            </FormControl>
          </form>
        </div>
        <img
          src={LoginImage}
          className="user-form--image"
          onLoad={handleImageLoaded}
          alt="Osaka's Dotonbori"
          loading="lazy"
        />
      </div>
      <Errors errorBanners={errorBanners} />
    </Skeleton>
  );
};

export default Login;
