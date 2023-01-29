import React from "react";
import styled from "styled-components";
import ProfilePicture from "../assets/profile.png";

const IncomingCallCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 250px;
  background-color: #dedef1;
  padding: 20px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10000;
  margin-top: 20px;
  border-radius: 20px;
  border: 1px solid black;
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const CallerName = styled.h3`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const CallButton = styled.button`
  width: 100px;
  height: 50px;
  background-color: green;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    background-color: lightgreen;
  }
`;

const DeclineButton = styled(CallButton)`
  background-color: red;
  &:hover {
    background-color: lightcoral;
  }
`;

const IncomingCallCard = ({ name = "Unknown User", onAccept, onDecline }) => (
  <IncomingCallCardWrapper>
    <Avatar src={ProfilePicture} alt="Avatar" />
    <CallerName>{name}</CallerName>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 20,
      }}
    >
      <CallButton onClick={onAccept}>Accept</CallButton>
      <DeclineButton onClick={onDecline}>Decline</DeclineButton>
    </div>
  </IncomingCallCardWrapper>
);

export default IncomingCallCard;
