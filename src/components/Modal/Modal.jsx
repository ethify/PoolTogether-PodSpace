import React from "react";
import "./Modal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import copy from "clipboard-copy";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { StateContext, ActionContext } from "../../hooks";

function Modal() {
  const { modalConfig, openModal } = React.useContext(StateContext);
  const { toggleModal } = React.useContext(ActionContext);
  const copyToClipboard = () => {
    copy(modalConfig.inviteLink);
  };
  return (
    <div>
      <div
        className={`modal-overlay ${!openModal ? "closed" : null}`}
        id="modal-overlay"
        onClick={(e) => toggleModal({ openModal: false, modalConfig: {} })}
      ></div>

      <div className={`modal ${!openModal ? "closed" : null}`} id="modal">
        <button
          className="close-button"
          id="close-button"
          onClick={(e) => toggleModal({ openModal: false, modalConfig: {} })}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="modal-guts">
          <div className="modal-show-invite-link">
            <div className="modal-title">Your Pod Invite Link</div>
            <div className="form-elements">
              <div className="invite-link-container" onClick={copyToClipboard}>
                <span className="invite-link">{modalConfig.inviteLink}</span>
                <span>
                  <FontAwesomeIcon icon={faCopy} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
