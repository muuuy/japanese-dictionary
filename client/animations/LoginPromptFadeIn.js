export const LoginPromptFadeIn = {
  keyframes: {
    loginPromptFadeIn: {
      "0%": {
        opacity: 0,
        transform: "translateY(20%)",
      },
      "100%": {
        opacity: 1,
        transform: "translateY(0%)",
      },
    },
  },
  animation: {
    "login-prompt--fade-in": "loginPromptFadeIn 0.5s linear",
  },
};
