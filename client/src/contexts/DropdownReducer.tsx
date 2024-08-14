export const dropdownReducer = (state, action) => {
  switch (action.type) {
    case "OPEN": {
      return { dropdownOpen: true };
    }
    case "CLOSE": {
      return { dropdownOpen: false };
    }
    default: {
      return state;
    }
  }
};
