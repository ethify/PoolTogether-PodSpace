import React from "react";
import "./PodListLeftBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ActionContext, StateContext } from "../../hooks";

function PodListLeftBar(props) {
  const { toggleModal, setCurrentPod } = React.useContext(ActionContext);
  const { userPods } = React.useContext(StateContext);

  const openModal = () => {
    toggleModal({
      openModal: true,
      modalConfig: { addPodAddress: true },
    });
  };

  return (
    <div className="pod-list-left-bar">
      <div className="pod-list-header-container">
        <div className="pod-list-header-title">Pod List</div>

        <button className="add-pod-button" onClick={(e) => openModal()}>
          <span>
            <FontAwesomeIcon icon={faPlus} />
          </span>
          <span className="add-pod-button-title">Add</span>
        </button>
      </div>
      <div className="pod-list-container">
        {userPods.map((pod, key) => (
          <div
            key={key}
            onClick={(e) => setCurrentPod(pod)}
            className="pod-list-item"
          >
            {pod.name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PodListLeftBar;
