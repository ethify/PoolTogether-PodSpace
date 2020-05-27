import React from "react";
import "./Modal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import copy from "clipboard-copy";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { StateContext, ActionContext } from "../../hooks";
import { createPod ,addPodtoUser } from "../../services";

function Modal() {
  const { modalConfig, openModal } = React.useContext(StateContext);
  const { toggleModal } = React.useContext(ActionContext);

  const [existingPodAddress, setExistingPodAddress] = React.useState("");
  const [newPodAddress, setNewPodAddress] = React.useState("");
  const [newPodName, setNewPodName] = React.useState("")

  const copyToClipboard = () => {
    copy(modalConfig.inviteLink);
  };

  const addExistingPod = async () => {
    await addPodtoUser(existingPodAddress);
  };

  const addNewPod = async () => {};

  return (
    <div>
      {modalConfig.inviteLink ? (
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
              onClick={(e) =>
                toggleModal({ openModal: false, modalConfig: {} })
              }
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="modal-guts">
              <div className="modal-show-invite-link">
                <div className="modal-title">Your Pod Invite Link</div>
                <div className="form-elements">
                  <div
                    className="invite-link-container"
                    onClick={copyToClipboard}
                  >
                    <span className="invite-link">
                      {modalConfig.inviteLink}
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faCopy} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {modalConfig.addPodAddress ? (
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
              onClick={(e) =>
                toggleModal({ openModal: false, modalConfig: {} })
              }
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <div className="modal-guts">
              <div className="modal-show-invite-link">
                <div className="modal-title">
                  Enter Your Pod Invite Link or Address
                </div>
                <div className="form-elements">
                  <input
                    onChange={(e) => setExistingPodAddress(e.target.value)}
                    type="text"
                    placeholder="Add Pod Address"
                  />
                  <br />
                  <button onClick={addExistingPod}>Add Pod</button>
                </div>
                <h3>OR</h3>
                <div className="form-elements">
                  <input onChange={(e) => setNewPodName(e.target.value)} placeholder="Enter Pod Name" />
                  <button onClick={(e) => createPod(newPodName)}>Create a New Pod</button>
                  <div
                    className="invite-link-container"
                    onClick={copyToClipboard}
                  >
                    <span className="invite-link">
                      {modalConfig.inviteLink}
                    </span>
                    <span>
                      <FontAwesomeIcon icon={faCopy} />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default Modal;
