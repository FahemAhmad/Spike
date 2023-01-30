import React, { useContext } from "react";
import styled from "styled-components";

const Button = styled.button`
  padding: 7px 20px;
  background-color: white;
  border: 1px solid lightgray;

  &:disabled {
    background-color: darkgray;
  }
`;

const ButtonPair = ({ activeButton, setActiveButton }) => {
  return (
    <div>
      <Button
        style={
          activeButton
            ? { backgroundColor: "white" }
            : { backgroundColor: "darkgray" }
        }
        onClick={() => setActiveButton(true)}
      >
        Personal
      </Button>
      <Button
        style={
          !activeButton
            ? { backgroundColor: "white" }
            : { backgroundColor: "darkgray" }
        }
        onClick={() => setActiveButton(false)}
      >
        Shared
      </Button>
    </div>
  );
};

export default ButtonPair;
