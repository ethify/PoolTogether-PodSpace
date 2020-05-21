import React from "react";
import "./PodListLeftBar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function PodListLeftBar(props) {
  return (
    <div className="pod-list-left-bar">
      <div className="pod-list-header-container">
        <div className="pod-list-header-title">Pod List</div>

        <button
          className="add-pod-button"
          // onClick={(e) => this.setNodeProperties(true)}
        >
          <span>
            <FontAwesomeIcon icon={faPlus} />
          </span>
          <span className="add-pod-button-title">Add</span>
        </button>
      </div>
      <div className="pod-list-container">
        {props.userPods.map((pod, key) => (
          <div
            key={key}
            onClick={(e) => props.setCurrentPod(pod)}
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
