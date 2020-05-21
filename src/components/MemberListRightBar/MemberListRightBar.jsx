import React from "react";
import "./MemberListRightBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import makeBlockie from "ethereum-blockies-base64";
import { shortenAddress } from "../../utils";

function MemberListRightBar(props) {
  let address = "0xa7B5B93BF8B322023BDa57e2C86B57f4DDb4F4a1";
  console.log('props',props.membersList)
  return (
    <div className="member-list-right-bar">
      <div className="member-list-header">Pod Member List</div>
      <div className="member-list-container">
        {props.membersList.length > 0
          ? props.membersList.map((member) => (
              <div>
                <div className="member-list-item">
                  <img
                    src={makeBlockie(member)}
                    alt="address blockie"
                    className="member-address-blockie"
                  />
                  <span className="member-address">
                    {shortenAddress(member)}
                  </span>
                </div>
              </div>
            ))
          : (
            <div>
              <h4>
              No Members Selected
              </h4>
            </div>
          )}
      </div>
      <div className="member-invite-link">
        <span className="member-invite-title">Invite Members</span>
        <button
          className="member-invite-button"
          // onClick={(e) => this.setNodeProperties(true)}
        >
          <span>
            <FontAwesomeIcon icon={faShareAlt} />
          </span>
          <span className="member-invite-button-title">Share</span>
        </button>
      </div>
    </div>
  );
}

export default MemberListRightBar;
