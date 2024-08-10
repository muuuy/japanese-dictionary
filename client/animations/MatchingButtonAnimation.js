export const matchingButtonAnimation = {
  keyframes: {
    expandStartButton: {
      "0%": {
        width: "50%",
        position: "absolute",
        right: 0,
      },
      "100%": {
        width: "100%",
        position: "absolute",
        right: 0,
      },
    },
    shrinkStartButton: {
      "0%": {
        width: "100%",
        position: "absolute",
        right: 0,
        backgroundColor: "#fff0db",
      },
      "100%": {
        width: "50%",
        position: "absolute",
        right: 0,
        backgroundColor: "#fff0db",
      },
    },
    expandEndButton: {
      "0%": {
        width: "50%",
        position: "absolute",
        left: 0,
        zIndex: "20",
      },
      "100%": {
        width: "100%",
        position: "absolute",
        left: 0,
        zIndex: "20",
      },
    },
    shrinkEndButton: {
      "0%": {
        width: "100%",
        position: "absolute",
        left: 0,
        zIndex: "20",
      },
      "100%": {
        width: "50%",
        position: "absolute",
        left: 0,
        zIndex: "20",
      },
    },
  },
  animation: {
    "expand--start-button": "expandStartButton 0.5s linear forwards",
    "shrink--start-button": "shrinkStartButton 0.5s linear",
    "expand--end-button": "expandEndButton 0.5s linear forwards",
    "shrink--end-button": "shrinkEndButton 0.5s linear",
  },
};
