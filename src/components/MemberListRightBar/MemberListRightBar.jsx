import React from "react";
import "./MemberListRightBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import makeBlockie from "ethereum-blockies-base64";
import { shortenAddress } from "../../utils";
import { ActionContext, StateContext } from "../../hooks";

function MemberListRightBar(props) {
  const { toggleModal } = React.useContext(ActionContext);
  const { currentPod } = React.useContext(StateContext);
  const openModal = () => {
    toggleModal({
      openModal: true,
      modalConfig: {
        inviteLink: `https://nifty-sinoussi-7fa2d4.netlify.app/${currentPod.address}/join`,
      },
    });
  };
  return (
    <>
      {currentPod.address && (
        <div className="member-list-right-bar">
          <div className="member-list-header">Pod Member List</div>
          <div className="member-list-container">
            {currentPod.members.length > 0 ? (
              currentPod.members.map((member, i) => {
                if (member) {
                  return (
                    <div key={i}>
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
                  );
                }
              })
            ) : (
              <div>
                <h4>No Members Selected</h4>
              </div>
            )}
          </div>
          <div className="member-invite-link">
            <span className="member-invite-title">Invite Members</span>
            <button
              className="member-invite-button"
              onClick={(e) => openModal()}
            >
              <span>
                <FontAwesomeIcon icon={faShareAlt} />
              </span>
              <span className="member-invite-button-title">Share</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default MemberListRightBar;
