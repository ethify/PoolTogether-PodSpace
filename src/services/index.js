import Onboard from "bnc-onboard";
import * as Web3 from "web3";
import * as Box from "3box";
import * as contract from "@truffle/contract";
import Pod from "../pods/build/contracts/Pod.json";
import ERC20 from "../pods/build/contracts/ERC20.json";
import { request } from "graphql-request";
import { IdentityWallet } from "identity-wallet";
import * as BigNumber from "bignumber.js"


let web3;
let boxInstance;
let space;

const seed =
  "0x7acca0ba544b6bb4f6ad3cfccd375b76a2c1587250f0036f00d1d476bbb679b3";
const daiAddress = "0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa";

const onboard = Onboard({
  dappId: "052b3fe9-87d5-4614-b2e9-6dd81115979a",
  networkId: 42,
  subscriptions: {
    wallet: (wallet) => {
      web3 = new Web3(wallet.provider);
    },
  },
  darkMode: true,
});

export const getAccount = async () => {
  await onboard.walletSelect();
  await onboard.walletCheck();
  const currentState = onboard.getState();

  return currentState.address;
};

const getConsent = async ({ type, origin, spaces }) => {
  return true;
};

export const getGlobal3BoxInstance = async () => {
  const idWallet = new IdentityWallet(getConsent, {
    seed,
  });

  const threeIdProvider = idWallet.get3idProvider();
  boxInstance = await Box.openBox(null, threeIdProvider);
  await boxInstance.syncDone;

  space = await boxInstance.openSpace("PodChatSpace");
};

export const getUser3BoxInstance = async () => {
  const currentUser = await defaultAddress();
  const spaceData = await Box.getSpace(currentUser, "PodChatSpace");

  return spaceData;
};

export const getUserPods = async () => {
  const userSpace = await getUser3BoxInstance();
  let pods = userSpace.public.get("userPodList");
  return pods;
};

export const addPodtoUser = async (podAddress) => {
  const userSpace = await getUser3BoxInstance();

  let pods = space.public.get("userPodList");

  pods.push(podAddress);

  space.public.set("userPodList", pods);
};

export const defaultAddress = async () => {
  const currentState = onboard.getState();
  return currentState.address;
};

export const getBalance = (address) => {
  return web3.eth.getBalance(address);
};

export const getDAIBalance = async () => {
  const currentUser = await defaultAddress();

  const daiContract = contract(ERC20);
  daiContract.setProvider(web3.currentProvider);
  const daiInstance = await daiContract.at(daiAddress);

  const balance = daiInstance.balanceOf(currentUser);

  return balance;
};

export const depositToPod = async (podAddress, amount) => {
  const currentUser = await defaultAddress()
  const pod = contract(Pod);
  pod.setProvider(web3.currentProvider);
  let podInstance = await pod.at(podAddress);

  const daiContract = contract(ERC20);
  daiContract.setProvider(web3.currentProvider);
  const daiInstance = await daiContract.at(daiAddress);

  const depositAmount = new BigNumber(amount * new BigNumber(10 ** 18))

  //Transaction 1
  await daiInstance.approve(podAddress, depositAmount,{from: currentUser});
  //Transaction 2
  await podInstance.deposit(depositAmount, [],{from: currentUser});
};

export const redeemFromPod = async (podAddress, amount) => {
  const pod = contract(Pod);
  pod.setProvider(web3.currentProvider);
  let podInstance = await pod.at(podAddress);
  await podInstance.withdrawPendingDeposit(amount, []);
};

export const createPod = async (podName) => {
  // Transaction 1
  let pod = await Pod.new();
  // Transaction 2
  // await pod.initialize(poolContext.pool.address);

  let pods = space.public.get("podList");

  const newPod = {
    address: pod.address,
    name: podName,
  };

  pods.push(newPod);

  space.public.set("podList", pods);
};

export const getPodQuery = async (podAddress) => {
  const query = `
  {
    pod(id: "${podAddress}"){
      id
      address
      podPlayers{
        id
        address
        balance
        balanceUnderlying
        version
      }
      podPlayersCount
      currentExchangeRateMantissa
      balanceUnderlying
      totalPendingDeposits
      poolContract{
        id
        playersCount
        openBalance
        committedBalance
      }
      version
    }
  }
  `;

  return request(
    "https://api.thegraph.com/subgraphs/name/pooltogether/pooltogether-kovan",
    query
  );
};
