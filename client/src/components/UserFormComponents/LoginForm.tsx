import { LoginFormData, ErrorBannerData } from "../../interfaces";
import { useState, useEffect } from "react";
import { FormContainer } from "./FormContainer";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../stores/store";

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorBanners, setErrorBanners] = useState<ErrorBannerData[]>([]);

  const authUser = useUserStore((state) => state.authUser);
  const navigate = useNavigate();

  /**
   * Clear error banners after 5 seconds.
   * This creates a timeout that clears the new banner after 5s.
   */
  useEffect(() => {
    if (errorBanners.length > 0) {
      const timer = setTimeout(
        () => setErrorBanners((prev) => prev.slice(1)),
        5000
      );

      return () => clearTimeout(timer);
    }
  }, [errorBanners]);

  const handleSubmit = async () => {
    setLoading(false);

    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const response = await res.json();

      if (res.ok) {
        authUser(response.flashcards);
        navigate("/");
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(true);
  };

  return (
    <FormContainer>
      <h1 className="user-form--header">LOGIN</h1>
      <p className="mb-4 italic">Welcome back! Sign in to start studying!</p>
      <form></form>
    </FormContainer>
  );
};

export { LoginForm };
