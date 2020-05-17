import React from "react";
import makeBlockie from "ethereum-blockies-base64";
import { StateContext, ActionContext } from "../../hooks";
import { shortenAddress } from "../../utils";
import "./Toolbar.scss";

function Toolbar() {
  const { walletAddress } = React.useContext(StateContext);
  const { signIn } = React.useContext(ActionContext);

  const getAddressTemplate = (address) => {
    if (address) {
      return (
        <div className="address-container">
          <span>{shortenAddress(address)}</span>
          <img
            src={makeBlockie(address)}
            alt="address blockie"
            className="address-blockie"
          />
        </div>
      );
    } else {
      return (
        <div className="address-container">
          <img
            src={require("../../assets/icons/metamask.svg")}
            alt="metamask icon"
            className="metamask-icon"
          />
          <span>Connect to Wallet</span>
        </div>
      );
    }
  };
  return (
    <div className="Toolbar">
      <div className="app-name">podconnect.</div>
      <div
        className={"wallet-container " + (walletAddress ? "connected" : null)}
        onClick={signIn}
      >
        {getAddressTemplate(walletAddress)}
      </div>
    </div>
  );
}

export default Toolbar;
