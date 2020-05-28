import Onboard from "bnc-onboard";
import * as Web3 from "web3";
import * as Box from "3box";
import * as contract from "@truffle/contract";
import { request } from "graphql-request";
import * as IdentityWallet from "identity-wallet";
import * as BigNumber from "bignumber.js";

import Pod from "../pods/build/contracts/Pod.json";
import ERC20 from "../pods/build/contracts/ERC20.json";
import FixedPoint from "../pods/build/contracts/FixedPoint.json";
import ExchangeRateTracker from "../pods/build/contracts/ExchangeRateTracker.json";
import ScheduledBalance from "../pods/build/contracts/ScheduledBalance.json";

import BasePool from "../contracts/pooltogether-contracts/build/contracts/BasePool.json";
import cDAI from "../contracts/pooltogether-contracts/build/contracts/CErc20Mock.json";

import * as pt from "pooltogetherjs";

import { ethers } from "ethers";

import { poolTogetherDrawDates } from "../utils";
const { utils } = ethers;

let web3;
let boxInstance;
let userBoxInstance;
let globalSpace;
let userSpace;

const seed =
  "0x7accb0ba544b6bb4f6ad3cfddd375b76a2c1587250f0036f00d1d476bbb679b3";
const daiAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

const userPodListName = "userPodList";
const globalPodsListName = "globalPodList";

const onboard = Onboard({
  dappId: "052b3fe9-87d5-4614-b2e9-6dd81115979a",
  networkId: 1,
  subscriptions: {
    wallet: (wallet) => {
      web3 = new Web3(wallet.provider);
    },
  },
  darkMode: true,
});

const getPoolTogetherDaiDrawDate = () => {
  const now = Date.now();
  for (let i = 0; i < poolTogetherDrawDates.length; i += 1) {
    const drawDate = new Date(poolTogetherDrawDates[i]);
    // const diff = getDateDiff(drawDate, now);
    var diff = parseInt((drawDate - now) / (1000 * 60 * 60 * 24), 10);
    if (diff > 0) {
      return poolTogetherDrawDates[i];
    }
  }
  return undefined;
};

export const getEstimatedPrize = async (contractAddress) => {
  let provider = ethers.getDefaultProvider();

  const abi = BasePool;

  const contract = new ethers.Contract(contractAddress, abi["abi"], provider);

  console.log("contract", contract);

  const accountedBalance = await contract.accountedBalance();

  const balanceCallData = contract.interface.functions.balance.encode([]);
  const result = await provider.call({
    to: contract.address,
    data: balanceCallData,
  });
  const balance = contract.interface.functions.balance.decode(result);

  const currentOpenDrawId = await contract.currentOpenDrawId();
  const currentDraw = await contract.getDraw(currentOpenDrawId);

  let prize = ethers.utils.bigNumberify(0);
  if (balance) {
    prize = pt.utils.calculatePrize(
      balance,
      accountedBalance,
      currentDraw.feeFraction
    );

    console.log("prize", prize.toString());

    const cDAIContract = new ethers.Contract(
      "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643",
      cDAI["abi"],
      provider
    );

    const supplyRatePerBlock = await cDAIContract.supplyRatePerBlock();
    console.log("suppluRateperBlock", supplyRatePerBlock);

    const prizeSupplyRate = pt.utils.calculatePrizeSupplyRate(
      supplyRatePerBlock,
      currentDraw.feeFraction
    );

    const awardAtMs = Date.parse(getPoolTogetherDaiDrawDate());
    const remainingTimeS = (awardAtMs - new Date().getTime()) / 1000;
    const remainingBlocks = remainingTimeS / 15; // about 15 second block periods
    const blocksFixedPoint18 = utils.parseEther(String(remainingBlocks));
    const prizeEstimate = pt.utils.calculatePrizeEstimate(
      balance,
      prize,
      blocksFixedPoint18,
      prizeSupplyRate
    );

    const newPrizeEstimate = prizeEstimate / new BigNumber(10 ** 18);

    console.log("prizeEstimate", prizeEstimate);
    console.log("prizeEstimate", newPrizeEstimate.toString());

    return Math.round(newPrizeEstimate.toString());
  }
};

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

  globalSpace = await boxInstance.openSpace("PodChatSpace");
};

export const getUser3BoxInstance = async () => {
  if (!web3) {
    await getAccount();
  }
  const currentUser = await defaultAddress();
  const provider = await Box.get3idConnectProvider(); // recomended provider
  console.log("currentUser", currentUser);

  userBoxInstance = await Box.openBox(currentUser, web3.currentProvider);
  console.log("userBoxInstance", userBoxInstance);

  userSpace = await userBoxInstance.openSpace("PodChatSpace");
  await userSpace.syncDone;
  console.log("userspace", userSpace);
};

export const getAllPods = async () => {
  if (!boxInstance) {
    await getGlobal3BoxInstance();
  }

  const allPodsList = await globalSpace.public.get(globalPodsListName);
  if (!allPodsList) {
    return [];
  }
  return allPodsList;
};

export const addPodtoGlobal = async (podDetail) => {
  console.log("podDetail", podDetail);
  let allPods = await getAllPods();
  console.log("allPods", allPods);
  allPods.push(podDetail);

  await globalSpace.public.set(globalPodsListName, allPods);

  console.log("allpods", await getAllPods());
  return await getAllPods();
};

export const getUserPods = async () => {
  if (!userBoxInstance) {
    await getUser3BoxInstance();
  }
  let pods = await userSpace.public.get(userPodListName);
  console.log("userPODS", pods);
  if (!pods) {
    return [];
  }
  const allPodsList = await getAllPods();
  console.log("allpods", allPodsList);
  const userPods = allPodsList.filter((pod) => pods.includes(pod.address));
  console.log("userPods", userPods);

  return userPods;
};

export const getUserPodsList = async () => {
  if (!userBoxInstance) {
    await getUser3BoxInstance();
  }

  let pods = await userSpace.public.get(userPodListName);
  console.log("userPODS", pods);
  if (!pods) {
    return [];
  }

  return pods;
};

export const updateUserList = async (newList) => {
  await userPodListName.public.set(userPodListName, newList);
};

export const updateGlobalList = async (newList) => {
  console.log("newList", newList);
  await globalSpace.public.set(globalPodsListName, newList);
};

export const addPodtoUser = async (podAddress) => {
  console.log("podAddress", podAddress);

  const userAddress = await defaultAddress();
  // Add Pod to his space
  let globalPods = await getAllPods();
  let userPods = await getUserPodsList();
  console.log("userPods", userPods, "globalPods", globalPods);
  const isPodExist = globalPods.find((pod) => pod.address === podAddress);
  console.log(isPodExist, "isExist");
  if (isPodExist) {
    userPods.push(podAddress);
    userSpace.public.set(userPodListName, userPods);

    // Add user to pod members list
    const selectedPodIndex = globalPods.findIndex(
      (pod) => pod.address === podAddress
    );
    if (
      !globalPods[selectedPodIndex].members.find(
        (member) => member === userAddress
      )
    ) {
      globalPods[selectedPodIndex].members.push(userAddress);
    }

    await updateGlobalList(globalPods);
    console.log("getUserPods", await getUserPods());
    return await getUserPods();
  } else {
    const newPod = {
      address: podAddress,
      name: "My Pod#" + Math.floor(Math.random() * 9999 + 1000),
      members: [userAddress],
    };

    console.log("NewPod", newPod);

    await addPodtoGlobal(newPod);
    userPods.push(podAddress);
    userSpace.public.set(userPodListName, userPods);

    console.log("getUserPods", await getUserPods());
    return await getUserPods();
  }
};

export const getUserPodBalance = (podAddress, userAddress) => {
  const query = `
  {
    podPlayer(id: "player-${userAddress.toLowerCase()}_pod-${podAddress.toLowerCase()}"){
      balance
    }
  }
  `;
  console.log("query", query);

  return request(
    "https://api.thegraph.com/subgraphs/name/pooltogether/pooltogether",
    query
  ).then((resp) => {
    console.log(resp, "resp");
    if (!resp.podPlayer) {
      return "0";
    }
    const balance =
      new BigNumber(resp.podPlayer.balance) / new BigNumber(10 ** 24);

    return balance.toString();
  });
};

export const createPod = async (podName) => {
  const userAddress = await defaultAddress();
  const poolAddress = "0xc3a62c8af55c59642071bc171ebd05eb2479b663";

  // let fixedPoint, exchangeRateTracker, scheduledBalance

  // const fixedPointC = contract(FixedPoint);
  // fixedPointC.setProvider(web3.currentProvider);

  // const exchangeRateTrackerC = contract(ExchangeRateTracker);
  // exchangeRateTrackerC.setProvider(web3.currentProvider);

  // const scheduledBalanceC = contract(ScheduledBalance);
  // scheduledBalanceC.setProvider(web3.currentProvider);

  // fixedPoint = await fixedPointC.new({from: userAddress})
  // exchangeRateTracker = await exchangeRateTrackerC.new({from: userAddress})
  // scheduledBalance = await scheduledBalanceC.new({from: userAddress})

  // console.log(fixedPoint.address, exchangeRateTracker.address, scheduledBalance.address)

  // Pod.link('FixedPoint', fixedPoint.address)
  // Pod.link('ExchangeRateTracker', exchangeRateTracker.address)
  // Pod.link('ScheduledBalance', scheduledBalance.address)

  // Transaction 1
  const pod = contract(Pod);
  pod.setProvider(web3.currentProvider);
  let podInstance = await pod.new({ from: userAddress });

  // Transaction 2
  await podInstance.initialize(poolAddress, { from: userAddress });

  const newPod = {
    address: podInstance.address,
    name: podName,
    members: [userAddress],
  };

  await addPodtoUser(newPod);
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
  const currentUser = await defaultAddress();
  const pod = contract(Pod);
  pod.setProvider(web3.currentProvider);
  let podInstance = await pod.at(podAddress);

  const daiContract = contract(ERC20);
  daiContract.setProvider(web3.currentProvider);
  const daiInstance = await daiContract.at(daiAddress);

  const depositAmount = new BigNumber(amount * new BigNumber(10 ** 18));

  //Transaction 1
  await daiInstance.approve(podAddress, depositAmount, { from: currentUser });
  //Transaction 2
  await podInstance.deposit(depositAmount, [], { from: currentUser });
};

export const redeemFromPod = async (podAddress, amount) => {
  const pod = contract(Pod);
  pod.setProvider(web3.currentProvider);
  let podInstance = await pod.at(podAddress);
  await podInstance.withdrawPendingDeposit(amount, []);
};

export const getPodQuery = async (podAddress) => {
  const query = `
  {
    pod(id: "${podAddress.toLowerCase()}"){
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
        sponsorshipAndFeeBalance
      }
      version
    }
  }
  `;

  return request(
    "https://api.thegraph.com/subgraphs/name/pooltogether/pooltogether",
    query
  );
};
