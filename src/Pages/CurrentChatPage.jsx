import "./CurrentChat.scss";

import { GrAttachment } from "react-icons/gr";
import MessageComponent from "../components/MessageComponent";
import { useContext, useEffect, useRef, useState } from "react";

import { ChatContext } from "../Context/ChatContext";
import {
  getCompleteChatEndpoint,
  getCompleteGroupChatMessageEndpoint,
  sendGroupMessageEndpoint,
  sendOneToOneMessageEndpoint,
} from "../backend/apiCalls";
import * as Toastify from "../components/Toastify";
import useLocalStorage from "../Hooks/useLocalStorage";
import { SocketContext } from "../Context/SocketContext";

function CurrentChatPage() {
  const { socket } = useContext(SocketContext);
  const [user, _] = useLocalStorage("user");

  const messagesEndRef = useRef(null);
  const [newMessageText, setNewMessageText] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const { currentChat } = useContext(ChatContext);
  const [file, setFile] = useState();
  const [messages, setMessages] = useState([]);

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      handleSubmitMessage();
    }
  };

  function handleFileSelect(e) {
    setFile(e.target.files[0]);
  }

  async function GetCompleteChat() {
    if (currentChat.name) {
      await getCompleteChatEndpoint(currentChat._id)
        .then((res) => {
          setMessages(res.data);
        })
        .catch(() => {
          setMessages([]);
        });
    } else {
      await getCompleteGroupChatMessageEndpoint(currentChat._id)
        .then((res) => {
          console.log("res", res);
          setMessages(res.data.messages);
        })
        .catch(() => {
          setMessages([]);
        });
    }
  }

  async function sendGroupMessage() {
    let content;
    if (file) content = file;
    else content = newMessageText;

    const formData = new FormData();
    formData.append("id", currentChat?._id);
    formData.append("content", content);
    formData.append("type", file ? "file" : "text");

    await sendGroupMessageEndpoint(currentChat?._id, formData)
      .then((res) => {
        setNewMessageText("");
        setFile();
        setMessages([...messages, res.data]);
        socket?.emit("sendMessage", {
          ...res.data,
          recieverId: [currentChat?.members],
        });
      })
      .catch((err) => {
        setNewMessageText("");
        Toastify.showFailure(err.response?.data?.message);
      });
  }

  async function handleSubmitMessage() {
    if (currentChat.title) {
      sendGroupMessage();
    } else {
      let content;
      if (file) content = file;
      else content = newMessageText;

      const formData = new FormData();
      formData.append("id", currentChat?._id);
      formData.append("content", content);
      formData.append("type", file ? "file" : "text");

      await sendOneToOneMessageEndpoint(currentChat?._id, formData)
        .then((res) => {
          setNewMessageText("");
          setFile();
          setMessages([...messages, res.data]);
          socket?.emit("sendMessage", {
            ...res.data,
            recieverId: [currentChat?._id],
          });
        })
        .catch((err) => {
          setNewMessageText("");
          Toastify.showFailure(err.response?.data?.message);
        });
    }
  }

  useEffect(() => {
    if (currentChat) {
      GetCompleteChat();
    }
  }, [currentChat]);

  useEffect(() => {
    console.log("Updated complete message", newMessage);
    setMessages([...messages, newMessage]);
  }, [newMessage]);

  useEffect(() => {
    if (messages.length > 0) {
      if (messagesEndRef.current)
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (user && user?.id) {
      socket?.emit("addUser", user.id);

      socket?.on("getMessage", (data) => {
        console.log("new Message recieved", data);
        setNewMessage(data);
      });
    }
  }, [user]);

  return (
    <>
      {currentChat ? (
        <>
          <div className="current-messages">
            {messages?.map((val, index) => (
              <div ref={messagesEndRef} key={index}>
                <MessageComponent
                  own={
                    currentChat.title
                      ? val.sender === user.id
                      : val.sender !== currentChat._id
                  }
                  message={val?.text}
                  sendDate={val.date}
                  messageType={val.messageType}
                  attachment={val?.attachment}
                />
              </div>
            ))}
          </div>
          <div className="send-message">
            <>
              <GrAttachment
                className="icon"
                style={{ cursor: "pointer" }}
                onClick={() => document.getElementById("file-input").click()}
              />

              <input
                type="file"
                id="file-input"
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />
            </>
            {file ? (
              <div
                style={{
                  width: "100%",
                  backgroundColor: "#dedef1",
                  height: "72%",
                  margin: "0px 20px",
                  display: "flex",
                  alignItems: "center",
                  padding: 20,
                  color: "#6f6f6e",
                }}
              >
                {file.name}
              </div>
            ) : (
              <input
                type={"text"}
                placeholder="Type a Message"
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            )}

            <button onClick={handleSubmitMessage}>Send</button>
          </div>
        </>
      ) : (
        <div className="not-found">Please Select a chat.</div>
      )}
    </>
  );
}

export default CurrentChatPage;
