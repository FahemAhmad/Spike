import React, { useState } from "react";
import Peer from "simple-peer";
import styled from "styled-components";
import { IoMdCall } from "react-icons/io";
import { useRef } from "react";

const Video = styled.video`
  border: 1px solid blue;
  width: 50%;
  height: 50%;
`;

const AudioCall = ({
  socket,
  id,
  userId,
  receivingCall,
  callAccepted,
  setCallAccepted,
  callerSignal,
}) => {
  const [stream, setStream] = useState();
  const userVideo = useRef();
  const partnerVideo = useRef();

  const StartCall = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      });
  };

  function callPeer() {
    StartCall();
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", (data) => {
      socket.current.emit("callUser", {
        userToCall: id,
        signalData: data,
        from: userId,
      });
    });

    peer.on("stream", (stream) => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    if (callAccepted) peer.signal(callerSignal);
  }

  function acceptCall() {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", (data) => {
      socket.current.emit("acceptCall", { signal: data, to: id });
    });

    peer.on("stream", (stream) => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  let UserVideo;
  if (stream) {
    // eslint-disable-next-line no-unused-vars
    UserVideo = <Video playsInline muted ref={userVideo} autoPlay />;
  }

  let PartnerVideo;
  if (callAccepted) {
    // eslint-disable-next-line no-unused-vars
    PartnerVideo = <Video playsInline ref={partnerVideo} autoPlay />;
  }

  let incomingCall;
  if (receivingCall) {
    // eslint-disable-next-line no-unused-vars
    incomingCall = (
      <div>
        <h1> is calling you</h1>
        <button onClick={acceptCall}>Accept</button>
      </div>
    );
  }

  return (
    <div>
      <IoMdCall className="icon" onClick={() => callPeer()} />
    </div>
  );
};

export default AudioCall;
