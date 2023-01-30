import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import FriendsSidePanelComponent from "../components/FriendsSidePanelComponent";
import { BsFillCameraVideoFill } from "react-icons/bs";
import AudioCall from "../components/AudioCall";
import { ChatContext } from "../Context/ChatContext";
import useLocalStorage from "../Hooks/useLocalStorage";

function Profile({
  socket,
  receivingCall,
  callAccepted,
  setCallAccepted,
  callerSignal,
}) {
  const [user, _] = useLocalStorage("user");
  const { currentChat } = useContext(ChatContext);
  return (
    <section className="chat">
      <div className="chat-section">
        <FriendsSidePanelComponent />
        <div className="user-current-chat">
          {currentChat && (
            <div className="current-chat-header">
              <img
                src={currentChat?.profilePicture}
                className="icon"
                alt="ProfileImage"
              />
              <h3>{currentChat.name}</h3>
              <div style={{ flex: 1 }} />
              <AudioCall
                id={currentChat._id}
                socket={socket}
                userId={user?.id}
                receivingCall={receivingCall}
                callAccepted={callAccepted}
                setCallAccepted={setCallAccepted}
                callerSignal={callerSignal}
              />
              <BsFillCameraVideoFill className="icon" />
            </div>
          )}

          {currentChat && (
            <div className="content">
              <Outlet />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Profile;
