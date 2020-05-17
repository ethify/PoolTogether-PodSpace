import React from "react";
import "./ChatButton.scss";
import ChatBox from "3box-chatbox-react";
import Box from "3box";

class ChatButton extends React.Component {
  SPACE_NAME = "PodConnect";
  THREAD_NAME = "globalChat";
  constructor(props) {
    super(props);
    this.state = {
      // box: {},
      myProfile: {},
      myAddress: this.props.walletAddress,
      isReady: false,
    };
  }
  async componentDidMount() {
    let { box } = this.state;
    box = await Box.create(window.ethereum);
    this.setState({ box });
  }
  async componentDidUpdate() {
    if (this.props.walletAddress !== this.state.myAddress) {
      // console.log("Entering", this.props.walletAddress, this.state.myAddress);
      this.handleLogin();
    }
  }
  handleLogin = async () => {
    let { box } = this.state;
    const myAddress = this.props.walletAddress;
    await box.auth([], { address: myAddress });
    const myProfile = await Box.getProfile(myAddress);

    box.onSyncDone(() => {
      this.setState({ box });
    });
    this.setState({ box, myProfile, myAddress, isReady: true });
  };
  render() {
    const { box, myAddress, myProfile } = this.state;
    return (
      <div className="chat-bar">
        {box && (
          <ChatBox
            // required
            // spaceName='3boxtestcomments'
            // threadName='ghostChatTest5'
            spaceName={this.SPACE_NAME}
            threadName={this.THREAD_NAME}
            // case A & B
            box={box}
            currentUserAddr={myAddress}
            // case B
            //@ts-ignore
            loginFunction={this.handleLogin}
            // case C
            // ethereum={window.ethereum}

            // optional
            // mute
            openOnMount
            popupChat
            colorTheme="#190532"
            // threadOpts={{}}
            // spaceOpts={{}}
            // useHovers={true}
            currentUser3BoxProfile={myProfile}
            userProfileURL={(address) =>
              `https://userprofiles.co/user/${address}`
            }
          />
        )}
      </div>
    );
  }
}

export default ChatButton;
