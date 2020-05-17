import React from "react";
import "./PodDetails.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkSquareAlt,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { shortenAddress } from "../../utils";
import ChatButton from "../ChatButton";
import { StateContext, ActionContext } from "../../hooks";

function PodDetails() {
  let address = "0xa7B5B93BF8B322023BDa57e2C86B57f4DDb4F4a1";
  const { walletAddress } = React.useContext(StateContext);

  return (
    <div className="pod-details">
      <div className="pool-together-details-container">
        <div className="pool-together-details-header">
          <span>Pool Together</span>
          <span className="pool-together-details-header-divider">
            <FontAwesomeIcon icon={faCircle} />
          </span>
          <span>Stats</span>
        </div>
        <div className="pool-together-details-subtitle">
          <span className="pool-together-details-subtitle-title">Address:</span>
          <span className="pool-together-details-subtitle-value">
            <span>{shortenAddress(address)}</span>
            <span>
              <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
            </span>
          </span>
        </div>
        <div className="pool-together-details-stats-container">
          <div className="pool-together-details-stats-item">
            <div className="pool-together-details-stats-title">
              Total contract balance (Dai)
            </div>
            <div className="pool-together-details-stats-value">$844,200</div>
          </div>
          <div className="pool-together-details-stats-item">
            <div className="pool-together-details-stats-title">
              # of current players
            </div>
            <div className="pool-together-details-stats-value">6,702</div>
          </div>
          <div className="pool-together-details-stats-item">
            <div className="pool-together-details-stats-title">
              Estimated prize:
            </div>
            <div className="pool-together-details-stats-value">$152</div>
          </div>
        </div>
      </div>
      <div className="pod-details-container">
        <div className="pod-details-header">
          <span>Pod Name</span>
          <span className="pod-details-header-divider">
            <FontAwesomeIcon icon={faCircle} />
          </span>
          <span>Stats</span>
        </div>
        <div className="pod-details-subtitle">
          <span className="pool-together-details-subtitle-title">Address:</span>
          <span className="pool-together-details-subtitle-value">
            <span>{shortenAddress(address)}</span>
            <span>
              <FontAwesomeIcon icon={faExternalLinkSquareAlt} />
            </span>
          </span>
        </div>
        <div className="pod-details-stats-container">
          <div className="pod-details-stats-item">
            <div className="pod-details-stats-title">Pod Balance</div>
            <div className="pod-details-stats-value">$12,000</div>
          </div>
          <div className="pod-details-stats-item">
            <div className="pod-details-stats-title">Pod Players</div>
            <div className="pod-details-stats-value">12</div>
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
            />
          </div>
          <div className="pod-actions-item-button-container">
            <button
              className="pod-actions-item-button"
              // onClick={(e) => this.setNodeProperties(true)}
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
            />
          </div>
          <div className="pod-actions-item-button-container">
            <button
              className="pod-actions-item-button"
              // onClick={(e) => this.setNodeProperties(true)}
            >
              Withdraw
            </button>
          </div>
        </div>
      </div>
      <ChatButton walletAddress={walletAddress} />
    </div>
  );
}

export default PodDetails;
