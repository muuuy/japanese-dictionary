import { createContext, useReducer } from "react";

interface DropdownProviderData {
  children: React.ReactNode;
}

interface DropdownState {
  dropdownOpen: boolean;
}

interface ActionData {
  type: "OPEN_SIDEBAR" | "CLOSE_SIDEBAR";
}

/**
 * Context-reducer for sidebar management.
 * Handles state changes for a sidebar in relation to its opened or closed state.
 *
 * The state determines whether the user can scroll.
 * Used to handle issues with visibility and behavior for smaller screen sizes.
 */
export const DropdownContext = createContext<DropdownState>({
  dropdownOpen: false,
});
export const DropdownDispatchContext = createContext<
  React.Dispatch<ActionData>
>(() => {});

/**
 * Creates wrapper that wraps around the App. Allows the context and reducer
 * to be used anywhere within the project.
 */
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

/**
 * Reducer function - Handles the state changes
 * Processes the following actions:
 * - 'OPEN_SIDEBAR' = User can't scroll down
 * - 'CLOSE_SIDEBAR' = User can scroll down
 *
 * @param {DropdownState} state - Contains boolean dropdownOpen
 * @param {ActionData} action - State depends on the action.type
 * @returns
 */
function dropdownReducer(
  state: DropdownState,
  action: ActionData
): DropdownState {
  switch (action.type) {
    case "OPEN_SIDEBAR": {
      return {
        ...state,
        dropdownOpen: true,
      };
    }
    case "CLOSE_SIDEBAR": {
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
