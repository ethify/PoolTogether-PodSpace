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
        case "OPEN_MODAL":
          return {
            ...prevState,
            openModal: action.modal.openModal,
            modalConfig: action.modal.modalConfig,
          };
        default:
      }
    },
    {
      walletAddress: "",
      openModal: false,
      modalConfig: {},
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
      toggleModal: (modal) => {
        dispatch({ type: "OPEN_MODAL", modal });
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
