export const headerAnimations = {
  keyframes: {
    fadeIn: {
      "0%": {
        opacity: "0",
        transform: "translateY(50%)",
      },
      "100%": {
        opacity: "1",
        transform: "translateY(0)",
      },
    },
  },
  animation: {
    "header--fade-in": "fadeIn 0.5s linear",
  },
};
