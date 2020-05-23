import React from "react";
import "./PodDetails.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkSquareAlt,
  faCircle,
  faLongArrowAltUp,
} from "@fortawesome/free-solid-svg-icons";
import { shortenAddress } from "../../utils";
import ChatButton from "../ChatButton";
import { StateContext, ActionContext } from "../../hooks";

import { depositToPod, defaultAddress, redeemFromPod } from "../../services";

function PodDetails(props) {
  const [depositAmount, setDepositAmount] = React.useState("");
  const [withdrawAmount, setWithdrawAmount] = React.useState("");

  let address = "0xa7B5B93BF8B322023BDa57e2C86B57f4DDb4F4a1";
  const { walletAddress } = React.useContext(StateContext);

  const actionDepositPod = async () => {
    console.log("addressunderlying", props.currentPod.underlyingAddress);
    await depositToPod(props.currentPod.underlyingAddress, depositAmount);
  };

  const actionWithdrawPod = async () => {
    console.log("addressunderlying", props.currentPod.underlyingAddress);
    await redeemFromPod(withdrawAmount);
  };

  return (
    <div className="pod-details">
      {props.currentPod.address !== "" ? (
        <div>
          <div className="pool-together-details-container">
            <div className="pool-together-details-header">
              <span>Pool Together</span>
              <span className="pool-together-details-header-divider">
                <FontAwesomeIcon icon={faCircle} />
              </span>
              <span>Stats</span>
            </div>
            <div className="pool-together-details-subtitle">
              <span className="pool-together-details-subtitle-title">
                Address:
              </span>
              <span className="pool-together-details-subtitle-value">
                <span>{shortenAddress(address)}</span>
                <span>
                  <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
                </span>
              </span>
            </div>
            <div className="pool-together-estimate-prize">
              <div className="pool-together-estimate-prize-title">
                Estimated prize:
              </div>
              <div className="pool-together-estimate-prize-value">
                $152{" "}
                <span className="pool-together-estimate-prize-icon">
                  <FontAwesomeIcon icon={faLongArrowAltUp} />
                </span>
              </div>
            </div>
          </div>
          <div className="pod-details-container">
            <div className="pod-details-header">
              <span>{props.currentPod.name}</span>
              <span className="pod-details-header-divider">
                <FontAwesomeIcon icon={faCircle} />
              </span>
              <span>Stats</span>
            </div>
            <div className="pod-details-subtitle">
              <span className="pool-together-details-subtitle-title">
                Address:
              </span>
              <span className="pool-together-details-subtitle-value">
                {<span>{shortenAddress(props.currentPod.address)}</span>}
                <span>
                  <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
                </span>
              </span>
            </div>
            <div className="pod-details-stats-container">
              <div className="pod-details-stats-item">
                <div className="pod-details-stats-title">Pod Balance</div>
                <div className="pod-details-stats-value">
                  ${" "}
                  {(parseInt(
                    props.currentPod.podDetails.pod.balanceUnderlying
                  ) -
                    parseInt(
                      props.currentPod.podDetails.pod.totalPendingDeposits
                    )) /
                    10 ** 18}
                </div>
              </div>
              <div className="pod-details-stats-item">
                <div className="pod-details-stats-title">Pod Players</div>
                <div className="pod-details-stats-value">
                  {props.currentPod.podDetails.pod.podPlayersCount}
                </div>
              </div>
            </div>
          </div>
          <div className="pod-actions-container">
            <div className="pod-actions-item">
              <div className="pod-actions-item-title">Deposit</div>
              <div className="pod-actions-item-input-container">
                <input
                  type="number"
                  className="pod-actions-item-input"
                  placeholder="0 Dai"
                  onChange={(e) => setDepositAmount(e.target.value)}
                />
              </div>
              <div className="pod-actions-item-button-container">
                <button
                  className="pod-actions-item-button"
                  onClick={actionDepositPod}
                >
                  Deposit
                </button>
              </div>
            </div>
            <div className="pod-actions-item">
              <div className="pod-actions-item-title">Withdraw</div>
              <div className="pod-actions-item-input-container">
                <input
                  type="number"
                  className="pod-actions-item-input"
                  placeholder="0 Dai"
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </div>
              <div className="pod-actions-item-button-container">
                <button
                  className="pod-actions-item-button"
                  onClick={actionWithdrawPod}
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
          <div className="pools-stats-container">
            <div className="pool-together-details-header">
              <span>Stats</span>
            </div>
            <div className="pool-together-details-stats-container">
              <div className="pool-together-details-stats-item">
                <div className="pool-together-details-stats-title">
                  Total contract balance (Dai)
                </div>
                <div className="pool-together-details-stats-value">
                  $1,035,448
                </div>
              </div>
              <div className="pool-together-details-stats-item">
                <div className="pool-together-details-stats-title">
                  # of current players
                </div>
                <div className="pool-together-details-stats-value">8,086</div>
              </div>
            </div>
          </div>
          <ChatButton
            threadName={props.currentPod.address}
            walletAddress={walletAddress}
          />
        </div>
      ) : (
        <div className="pool-together-details-container">
          <div className="pool-together-details-header">
            <span>Select a Pod From the left OR Add a New Pod</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default PodDetails;
