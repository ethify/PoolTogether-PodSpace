import Onboard from "bnc-onboard";
import * as Web3 from "web3";

import * as contract from "@truffle/contract";

let web3;

const onboard = Onboard({
  dappId: "052b3fe9-87d5-4614-b2e9-6dd81115979a", // [String] The API key created by step one above
  networkId: 4, // [Integer] The Ethereum network ID your Dapp uses.
  subscriptions: {
    wallet: (wallet) => {
      web3 = new Web3(wallet.provider);
    },
  },
});

export const getAccount = async (setWalletAddress) => {
  await onboard.walletSelect();
  await onboard.walletCheck();
  const currentState = onboard.getState();

  setWalletAddress(currentState.address);
};

export const defaultAddress = async () => {
  const currentState = onboard.getState();
  return currentState.address;
};

export const getBalance = (address) => {
  return web3.eth.getBalance(address);
};

export const getDAIBalance = () => {

}

export const depositToPod = () => {

}

export const redeemFromPod = () => {

}

export const joinPod = () => {

}

export const leavePod = () => {

}

export const get3Box = () => {

}