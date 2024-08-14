/**
 * Context for whether drop-down is open or not
 * Mainly used to make it so that the app is unscrolalble once the drop-down is open
 * Done via overflow: hidden
 */

import { createContext, useReducer } from "react";

interface DropdownProviderData {
  children: React.ReactNode;
}

interface DropdownState {
  dropdownOpen: boolean;
}

interface ActionData {
  type: "OPEN" | "CLOSE";
}

export const DropdownContext = createContext<DropdownState>({
  dropdownOpen: false,
});
export const DropdownDispatchContext = createContext<
  React.Dispatch<ActionData> | undefined
>(undefined);

export const DropdownProvider: React.FC<DropdownProviderData> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(dropdownReducer, {
    dropdownOpen: false,
  });

  return (
    <DropdownContext.Provider value={state}>
      <DropdownDispatchContext.Provider value={dispatch}>
        {children}
      </DropdownDispatchContext.Provider>
    </DropdownContext.Provider>
  );
};

function dropdownReducer(
  state: DropdownState,
  action: ActionData
): DropdownState {
  switch (action.type) {
    case "OPEN": {
      console.log("test");
      return {
        ...state,
        dropdownOpen: true,
      };
    }
    case "CLOSE": {
      return {
        ...state,
        dropdownOpen: false,
      };
    }
    default: {
      return state;
    }
  }
}
