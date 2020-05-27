import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { AppProvider } from "./hooks";
import { BrowserRouter } from "react-router-dom";

// import { request } from "graphql-request";
// import * as pt from "pooltogetherjs";

// const query = `
//   {
//     pod(id: "0x6f5587e191c8b222f634c78111f97c4851663ba4"){
//       id
//       address
//       podPlayers{
//         id
//         address
//         balance
//         balanceUnderlying
//         version
//       }
//       podPlayersCount
//       currentExchangeRateMantissa
//       balanceUnderlying
//       totalPendingDeposits
//       poolContract{
//         id
//         playersCount
//         openBalance
//         committedBalance
//         openDrawId
//       }
//       version
//     }
//   }
//   `;

// request(
//   "https://api.thegraph.com/subgraphs/name/pooltogether/pooltogether",
//   query
// ).then((resp) => {
//   console.log("resp, resp", resp);
//   const balance = resp.pod.poolContract.openBalance;
//   const accountedBalance = resp.pod.poolContract.committedBalance;
//   const drawId = resp.pod.poolContract.openDrawId;

//   let draw;

//   const drawQuery = `
// {
//   draws(where: {drawId: "${drawId}"}){
//     id
//     drawId
//     feeBeneficiary
//     secretHash
//     feeFraction
//   }
// }
// `;
//   request(
//     "https://api.thegraph.com/subgraphs/name/pooltogether/pooltogether",
//     drawQuery
//   ).then((draws) => {
//     console.log(draws, "draw");

//     const prize = pt.utils.calculatePrize(
//       balance,
//       accountedBalance,
//       draws.draws[0].feeFraction
//     );

//     console.log('prixe', prize.toString())
//   });
// });

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
