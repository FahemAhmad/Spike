import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import FriendsSidePanelComponent from "../components/FriendsSidePanelComponent";
import AudioCall from "../components/AudioCall";
import { ChatContext } from "../Context/ChatContext";
import useLocalStorage from "../Hooks/useLocalStorage";
import ProfilePicture from "../assets/profile.png";
import VideoCall from "../components/VideoCall";

function Profile() {
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
                src={
                  currentChat?.profilePicture
                    ? currentChat?.profilePicture
                    : ProfilePicture
                }
                className="icon"
                alt="ProfileImage"
              />
              <h3>{currentChat.name ? currentChat.name : currentChat.title}</h3>
              <div style={{ flex: 1 }} />
              <AudioCall
                recieverId={currentChat._id}
                userId={user?.id}
                userName={user?.name}
                reciverName={currentChat.name}
              />
              <VideoCall
                recieverId={currentChat._id}
                userId={user?.id}
                userName={user?.name}
                reciverName={currentChat.name}
              />
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
