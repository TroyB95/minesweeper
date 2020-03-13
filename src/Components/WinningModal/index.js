import React from "react";
import styled from "styled-components";

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.8);

  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalBody = styled.div`
  width: 50%;
  height: 50%;

  background: grey;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function WinningModal() {
  return (
    <ModalBackground>
      <ModalBody>
        <h1>CONGRATS YOU HAVE WON</h1>
        <button>Play Again</button>
      </ModalBody>
    </ModalBackground>
  );
}

export default WinningModal;
