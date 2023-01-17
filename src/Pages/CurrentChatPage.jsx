import "./CurrentChat.scss";
import ProfilePic from "../assets/profile.png";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { IoCallSharp } from "react-icons/io5";
import { GrAttachment } from "react-icons/gr";
import MessageComponent from "../components/MessageComponent";

function CurrentChatPage() {
  return (
    <>
      <div className="current-chat-header">
        <img src={ProfilePic} className="icon" alt="ProfileImage" />
        <h3>Faheem Ahmad</h3>
        <div style={{ flex: 1 }} />
        <IoCallSharp className="icon" />
        <BsFillCameraVideoFill className="icon" />
      </div>
      <div className="current-messages">
        {[...Array(10)].map((val, index) => (
          <MessageComponent key={index} own={index % 2 === 0} />
        ))}
      </div>
      <div className="send-message">
        <GrAttachment className="icon" />
        <input type={"text"} placeholder="Type a Message" className="" />
        <button>Send</button>
      </div>
    </>
  );
}

export default CurrentChatPage;
