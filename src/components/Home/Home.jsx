import React from "react";
import PodDetails from "../PodDetails/PodDetails";
import MemberListRightBar from "../MemberListRightBar/MemberListRightBar";
import PodListLeftBar from "../PodListLeftBar";
import "./Home.scss";
import { getUserPods, getPodQuery } from "../../services";


function Home() {
  const [userPods, setUserPods] = React.useState([])
  const [currentPod, setCurrentPod] = React.useState({address: '',members:[]})

  React.useEffect(function () {
    let userPods = [{
      address: '0x395fcb67ff8fdf5b9e2aeecc02ef7a8de87a6677',
      name: 'Family',
      members: ['0x72016020d7F79882c0Fe06BDA0e61A3CE308c4eE', '0x2A01812d4e8306cF61B29324082205a3D7BDa2A0'],
      underlyingAddress: '0x395fcB67ff8fdf5b9e2AeeCc02Ef7A8DE87a6677'
    },{
      address: '0x395fcb67ff8fdf5b9e2aeecc02ef7a8de87a6677',
      name: 'Friends',
      members: ['0x2A01812d4e8306cF61B29324082205a3D7BDa2A0', '0x72016020d7F79882c0Fe06BDA0e61A3CE308c4eE'],
      underlyingAddress: '0x395fcB67ff8fdf5b9e2AeeCc02Ef7A8DE87a6677'
    }]
    setUserPods(userPods);
  },[]);

  async function setCurrentPodwithDetails(selectedPod) {
    const currentPodDetails = await getPodQuery(selectedPod.address)
    console.log('currentPodDetails', currentPodDetails)
    selectedPod['podDetails'] = currentPodDetails

    console.log('selectedPod', selectedPod)
    setCurrentPod(selectedPod)
  }

  return (
    <div className="Home">
      <PodListLeftBar userPods={userPods} setCurrentPod={setCurrentPodwithDetails}></PodListLeftBar>
      <PodDetails currentPod={currentPod}></PodDetails>
      <MemberListRightBar membersList={currentPod.members}></MemberListRightBar>
    </div>
  );
}

export default Home;
