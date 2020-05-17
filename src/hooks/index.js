import React, { createContext, useMemo } from "react";
import { getAccount } from "../services";

export const ActionContext = createContext();
export const StateContext = createContext();

export const AppProvider = (props) => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "SIGN_IN":
          return {
            ...prevState,
            walletAddress: action.walletAddress,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            walletAddress: "",
          };
        default:
      }
    },
    {
      walletAddress: "",
    }
  );

  const actionContext = useMemo(
    () => ({
      signIn: async () => {
        const walletAddress = await getAccount();
        dispatch({ type: "SIGN_IN", walletAddress });
      },
      signOut: () => {
        dispatch({ type: "SIGN_OUT" });
      },
    }),
    []
  );
  return (
    <ActionContext.Provider value={actionContext}>
      <StateContext.Provider value={state}>
        {props.children}
      </StateContext.Provider>
    </ActionContext.Provider>
  );
};
