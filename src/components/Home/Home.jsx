import React from "react";
import PodDetails from "../PodDetails/PodDetails";
import MemberListRightBar from "../MemberListRightBar/MemberListRightBar";
import PodListLeftBar from "../PodListLeftBar";
import "./Home.scss";
import { useLocation } from "react-router-dom";
import { StateContext, ActionContext } from "../../hooks";

function Home() {
  const { fetchUserPodsList, toggleModal } = React.useContext(ActionContext);
  const { walletAddress } = React.useContext(StateContext);
  let location = useLocation();

  React.useEffect(() => {
    // let userPods = [{
    //   address: '0x395fcb67ff8fdf5b9e2aeecc02ef7a8de87a6677',
    //   name: 'Family',
    //   members: ['0x72016020d7F79882c0Fe06BDA0e61A3CE308c4eE', '0x2A01812d4e8306cF61B29324082205a3D7BDa2A0'],
    // },{
    //   address: '0x395fcb67ff8fdf5b9e2aeecc02ef7a8de87a6677',
    //   name: 'Friends',
    //   members: ['0x2A01812d4e8306cF61B29324082205a3D7BDa2A0', '0x72016020d7F79882c0Fe06BDA0e61A3CE308c4eE'],
    // }]
    // setUserPods(userPods);
    console.log(location.pathname);
    const referralLink = location.pathname.split("/")[1];
    const join = location.pathname.split("/")[2];
    console.log(referralLink, join);
    if (join && join.toLowerCase() === "join") {
      toggleModal({
        openModal: true,
        modalConfig: { addPodAddress: true, referralLink },
      });
    } else {
      fetchUserPodsList(walletAddress);
    }
  }, []);

  return (
    <div className="Home">
      <PodListLeftBar></PodListLeftBar>
      <PodDetails></PodDetails>
      <MemberListRightBar></MemberListRightBar>
    </div>
  );
}

export default Home;
