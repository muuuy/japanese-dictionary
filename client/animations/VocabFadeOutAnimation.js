export const vocabFadeOutAnimation = {
  keyframes: {
    fadeOut: {
      "0%": {
        opacity: 1,
      },
      "100%": {
        opacity: 0,
      },
    },

    fadeIn: {
      "0%": {
        opacity: 0,
      },
      "100%": {
        opacity: 1,
      },
    },
  },

  animation: {
    "vocab--fade-out": "fadeOut 0.4s linear",
    "vocab--fade-in": "fadeIn 0.4s linear",
  },
};
