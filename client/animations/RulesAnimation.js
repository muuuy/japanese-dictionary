export const rulesAnimation = {
  keyframes: {
    fadeIn: {
      "0%": {
        opacity: 0,
      },
      "100%": {
        opacity: 1,
      },
    },
    fadeOut: {
      "0%": {
        opacity: 1,
      },
      "100%": {
        opacity: 0,
      },
    },
  },
  animation: {
    "rules--fade-in": "fadeIn 0.5s linear",
  },
};
