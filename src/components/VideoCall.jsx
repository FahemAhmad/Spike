/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useState } from "react";
import Peer from "simple-peer";
import { useRef } from "react";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { useContext } from "react";
import { SocketContext } from "../Context/SocketContext";
import IncomingCallCard from "./IncomingCallCard";
import "./Call.scss";
import Draggable from "react-draggable";
const VideoCall = ({ recieverId, userName, userId, reciverName }) => {
  const { socket } = useContext(SocketContext);

  const [localStream, setStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [showCall, setShowCall] = useState(false);
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  const callUser = async () => {
    // console.log("stream 1", stream);
    await navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);

        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: stream,
        });
        // console.log("stream", stream);

        peer.on("signal", (data) => {
          socket.emit("callUser", {
            usersToCall: [recieverId],
            signalData: data,
            from: userId,
            name: userName,
          });
        });
        peer.on("stream", (stream) => {
          console.log("userVideo", userVideo);
          if (userVideo.current) {
            userVideo.current.srcObject = stream;
          }
        });
        socket.on("callAccepted", (signal) => {
          setCallAccepted(true);
          peer.signal(signal);
        });

        // console.log("peer", peer);
        if (connectionRef.current) connectionRef.current = peer;

        peer.on("close", () => {
          console.log("connection closed");
        });
      })
      .catch((err) => console.log("err", err));
    setShowCall(true);
    // console.log("stream 3", stream);
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: localStream,
    });

    peer.on("signal", (data) => {
      socket.emit("answerCall", { signal: data, to: caller });
    });
    peer.on("stream", (stream) => {
      console.group("stream in answer", stream);
      setRemoteStream(stream);
    });

    if (peer) {
      peer.signal(callerSignal);
      if (connectionRef.current) connectionRef.current = peer;
    }
  };

  const leaveCall = () => {
    setCallEnded(true);
    console.log("loalStream", localStream);
    socket.emit("endCall", { to: recieverId });
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        track.stop();
      });
    }

    if (remoteStream) {
      remoteStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    setShowCall(false);
    setReceivingCall(false);
    setCaller("");
    setName("");
    setCallerSignal();
    if (connectionRef.current) {
      connectionRef.current.destroy();
      connectionRef.current = null;
    }
  };

  useEffect(() => {
    socket.on("callUser", (data) => {
      setShowCall(true);
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);

      const getLocalStream = async () => {
        if (!localStream) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              audio: true,
              video: true,
            });

            setStream(stream);
          } catch (error) {
            console.error(error);
          }
        }
      };

      getLocalStream();
    });

    socket.on("endCall", () => {
      leaveCall();
    });
  }, []);

  useEffect(() => {
    if (myVideo.current && localStream) {
      myVideo.current.srcObject = localStream;
    }
  }, [myVideo.current, localStream]);

  useEffect(() => {
    if (userVideo.current && remoteStream) {
      userVideo.current.srcObject = remoteStream;
    }
  }, [userVideo.current, remoteStream]);

  // useEffect(() => {
  //   console.log("stream", stream);
  // }, [stream]);

  return (
    <>
      <BsFillCameraVideoFill className="icon" onClick={() => callUser()} />
      {receivingCall && !callAccepted ? (
        <IncomingCallCard name={userName} onAccept={answerCall} />
      ) : null}

      <Draggable handle=".video-start">
        <div className="video-start">
          {showCall && (
            <div className="video-container">
              <div className="video-wrapper">
                <div className="video">
                  <>
                    <div>You</div>

                    <video ref={myVideo} playsInline muted autoPlay />
                    {!callAccepted && (
                      <div
                        className="decline-button-container"
                        style={{ backgroundColor: "none" }}
                      >
                        <button className="decline-button" onClick={leaveCall}>
                          Cancel Call
                        </button>
                      </div>
                    )}
                  </>
                </div>
                <div className="video">
                  {callAccepted && !callEnded ? (
                    <>
                      <div>{reciverName.toUpperCase()}</div>
                      <video playsInline ref={userVideo} autoPlay />
                    </>
                  ) : null}
                </div>
              </div>
              {callAccepted && !callEnded && (
                <div className="decline-button-container">
                  <button className="decline-button" onClick={leaveCall}>
                    Decline Call
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </Draggable>
    </>
  );
};

export default VideoCall;
