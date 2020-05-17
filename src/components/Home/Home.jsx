import React from "react";
import PodDetails from "../PodDetails/PodDetails";
import MemberListRightBar from "../MemberListRightBar/MemberListRightBar";
import PodListLeftBar from "../PodListLeftBar";
import "./Home.scss";

function Home() {
  return (
    <div className="Home">
      <PodListLeftBar></PodListLeftBar>
      <PodDetails></PodDetails>
      <MemberListRightBar></MemberListRightBar>
    </div>
  );
}

export default Home;
