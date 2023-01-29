import "./MessageComponent.scss";
import ProfilePic from "../assets/profile.png";
import { format } from "timeago.js";

function MessageComponent({
  message,
  sendDate,
  own = false,
  messageType,
  attachment = null,
}) {
  return (
    <div className={own ? "message own" : "message"}>
      <div
        className="messageTop"
        style={own ? { flexDirection: "row-reverse" } : {}}
      >
        <img src={ProfilePic} alt="" className="messageImg" />
        {messageType === "text" ? (
          <p className="messageText">{message}</p>
        ) : (
          <img
            src={attachment}
            width={250}
            alt={sendDate}
            style={{ borderRadius: 10 }}
          />
        )}
      </div>
      <div
        className="messageBottom"
        style={own ? { textAlign: "end" } : { textAlign: "start" }}
      >
        {format(sendDate)}
      </div>
    </div>
  );
}

export default MessageComponent;
