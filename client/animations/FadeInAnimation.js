export const fadeInAnimation = {
  keyframes: {
    fadeInLeft: {
      "0%": {
        opacity: "0",
        transform: "translateX(50%)",
      },
      "100%": {
        opacity: "1",
        transform: "translateX(0)",
      },
    },
    fadeInRight: {
      "0%": {
        opacity: "0",
        transform: "translateX(-50%)",
      },
      "100%": {
        opacity: "1",
        transform: "translateX(0)",
      },
    },
  },
  animation: {
    "fade-in--left": "fadeInLeft 0.5s linear",
    "fade-in--right": "fadeInRight 0.5s linear",
  },
};
