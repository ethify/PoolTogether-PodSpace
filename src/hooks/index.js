import React, { createContext, useMemo } from "react";
import {
  getAccount,
  getUserPods,
  getPodQuery,
  getEstimatedPrize,
} from "../services";

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
        case "SET_USER_PODS":
          return {
            ...prevState,
            userPods: action.userPods,
          };
        case "SET_CURRENT_POD":
          return {
            ...prevState,
            currentPod: action.currentPod,
          };
        case "SET_ESTIMATE_PRIZE":
          return {
            ...prevState,
            estimatedPrize: action.estimatedPrize,
          };
        default:
      }
    },
    {
      walletAddress: "",
      openModal: false,
      modalConfig: {},
      userPods: [],
      currentPod: {
        address: "",
        members: [],
      },
      estimatedPrize: "",
    }
  );

  const actionContext = useMemo(
    () => ({
      signIn: async () => {
        const walletAddress = await getAccount();
        console.log("signin", walletAddress);
        dispatch({ type: "SIGN_IN", walletAddress });
        return walletAddress;
      },
      signOut: () => {
        dispatch({ type: "SIGN_OUT" });
      },
      toggleModal: (modal) => {
        dispatch({ type: "OPEN_MODAL", modal });
      },
      fetchUserPodsList: async (walletAddress) => {
        console.log("fetch all pods", walletAddress);
        if (!walletAddress) {
          const walletAddress = await getAccount();
          dispatch({ type: "SIGN_IN", walletAddress });
        }
        const modalOpen = {
          openModal: true,
          modalConfig: { loading: true, loadingMsg: "Loading Pods..." },
        };
        dispatch({ type: "OPEN_MODAL", modal: modalOpen });
        const userPodsList = await getUserPods();
        //await getEstimatedPrize()
        console.log("userPodsList", userPodsList);
        dispatch({ type: "SET_USER_PODS", userPods: userPodsList });
        const modalClose = {
          openModal: false,
          modalConfig: {},
        };
        dispatch({ type: "OPEN_MODAL", modal: modalClose });
      },
      setCurrentPod: async (selectedPod) => {
        const modalOpen = {
          openModal: true,
          modalConfig: { loading: true, loadingMsg: "Loading Pod Details..." },
        };
        dispatch({ type: "OPEN_MODAL", modal: modalOpen });
        const currentPodDetails = await getPodQuery(selectedPod.address);
        console.log("currentPodDetails", currentPodDetails);
        selectedPod["podDetails"] = currentPodDetails;
        const estimatedPrize = await getEstimatedPrize(
          selectedPod.podDetails.pod.poolContract.id
        );
        dispatch({ type: "SET_ESTIMATE_PRIZE", estimatedPrize });
        console.log("selectedPod", selectedPod);
        dispatch({ type: "SET_CURRENT_POD", currentPod: selectedPod });
        const modalClose = {
          openModal: false,
          modalConfig: {},
        };
        dispatch({ type: "OPEN_MODAL", modal: modalClose });
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
