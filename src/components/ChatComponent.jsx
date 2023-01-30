import React, { useContext } from "react";
import { ChatContext } from "../Context/ChatContext";

function ChatComponent({ value, messageCount }) {
  const { currentChat, setCurrentChat } = useContext(ChatContext);

  function handleChatComponent() {
    setCurrentChat(value);
  }

  return (
    <div
      className="chat-user"
      role={"button"}
      tabIndex={0}
      onClick={handleChatComponent}
      onKeyDown={() => void 0}
    >
      <img
        className="chat-user-image"
        src={value.profilePicture}
        alt={{ name }}
      />
      <h5 className="chat-user-name">{value.name}</h5>
      <div style={{ flex: 1 }} />
      {messageCount != 0 && (
        <div className="chat-user-message-badge">{messageCount}</div>
      )}
    </div>
  );
}

export default ChatComponent;
