import React from "react";

import { ModalBackground, ModalBody } from "./InformationModal.styled";

type ModalProps = {
  resetGame: Function;
  type: string;
};

const InformationModal = ({ resetGame, type }: ModalProps) => {
  return (
    <ModalBackground>
      <ModalBody>
        {type === "win" && (
          <>
            <h1>CONGRATS YOU HAVE WON</h1>
            <button onClick={() => resetGame()}>Play Again?</button>
          </>
        )}
        {type === "loss" && (
          <>
            <h1>YOU HAVE LOST!</h1>
            <button onClick={() => resetGame()}>Play Again?</button>
          </>
        )}
      </ModalBody>
    </ModalBackground>
  );
};

export default InformationModal;
