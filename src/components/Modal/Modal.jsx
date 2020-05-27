import React from "react";
import "./Modal.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import copy from "clipboard-copy";
import { faCopy } from "@fortawesome/free-regular-svg-icons";
import { StateContext, ActionContext } from "../../hooks";
import { createPod, addPodtoUser } from "../../services";

function Modal() {
  const { modalConfig, openModal, walletAddress } = React.useContext(
    StateContext
  );
  const { toggleModal, fetchUserPodsList, signIn } = React.useContext(
    ActionContext
  );

  console.log("Refferal", modalConfig.referralLink);
  const [existingPodAddress, setExistingPodAddress] = React.useState(
    modalConfig.referralLink ? modalConfig.referralLink : ""
  );
  const [newPodName, setNewPodName] = React.useState("");

  const copyToClipboard = () => {
    copy(modalConfig.inviteLink);
  };

  const addExistingPod = async () => {
    if (existingPodAddress) {
      let wallet = null;
      if (!walletAddress) {
        wallet = await signIn();
      }
      setTimeout(async () => {
        toggleModal({
          openModal: true,
          modalConfig: { loading: true, loadingMsg: "Joining Pod..." },
        });
        // const wallet = walletAddress;
        console.log("wallet", wallet);
        await addPodtoUser(existingPodAddress);

        fetchUserPodsList(wallet);
      }, 20);
    }
  };
  console.log("Wallet address", walletAddress);

  React.useEffect(() => {
    setExistingPodAddress(modalConfig.referralLink);
  }, [modalConfig.referralLink]);

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
              <div className="modal-add-pod">
                <div className="modal-title">
                  Enter Your Pod Invite Link or Address
                </div>
                <div className="input-elements-container">
                  <input
                    onChange={(e) => setExistingPodAddress(e.target.value)}
                    value={existingPodAddress}
                    type="text"
                    placeholder="Add Pod Address"
                    className="input-elements"
                  />
                  <button
                    onClick={addExistingPod}
                    type="button"
                    className="input-elements-button"
                    disabled={existingPodAddress === ""}
                  >
                    Join Pod
                  </button>
                </div>
                <h3 className="pod-add-divider">OR</h3>
                <div className="input-elements-container">
                  <input
                    onChange={(e) => setNewPodName(e.target.value)}
                    value={newPodName}
                    placeholder="Enter Pod Name"
                    type="text"
                    className="input-elements"
                  />
                  <button
                    onClick={(e) => createPod(newPodName)}
                    type="button"
                    className="input-elements-button"
                    disabled={newPodName === ""}
                  >
                    Create a New Pod
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      {modalConfig.loading && (
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
              <div className="modal-loading">
                <div className="loader-container">
                  <div className="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
                <div className="modal-title">{modalConfig.loadingMsg}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
