import React from "react";
import ProfilePic from "../assets/profile.png";

function ChatComponent({ img, name, messageCount }) {
  return (
    <div className="chat-user">
      <img className="chat-user-image" src={ProfilePic} alt={{ img }} />
      <h5 className="chat-user-name">{name}</h5>
      <div style={{ flex: 1 }} />
      <div className="chat-user-message-badge">{messageCount}</div>
    </div>
  );
}

export default ChatComponent;
