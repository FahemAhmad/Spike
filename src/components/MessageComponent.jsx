import "./MessageComponent.scss";
import ProfilePic from "../assets/profile.png";

function MessageComponent({ own = false }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div
        className="messageTop"
        style={own ? { flexDirection: "row-reverse" } : {}}
      >
        <img src={ProfilePic} alt="" className="messageImg" />
        <p className="messageText">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          voluptatibus magnam nulla, doloremque inventore provident molestias
          adipisci quidem soluta? Vitae?
        </p>
      </div>
      <div
        className="messageBottom"
        style={own ? { textAlign: "end" } : { textAlign: "start" }}
      >
        2 Days ago
      </div>
    </div>
  );
}

export default MessageComponent;
