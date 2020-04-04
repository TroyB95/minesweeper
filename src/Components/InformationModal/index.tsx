import React from "react";

import { ModalBackground, ModalBody } from "./InformationModal.styled";

type ModalProps = {
  resetGame: Function;
  type: string;
  playTime: number;
};

const InformationModal = ({ resetGame, type, playTime }: ModalProps) => {
  return (
    <ModalBackground>
      <ModalBody>
        {type === "win" && (
          <>
            <h1>CONGRATS YOU HAVE WON</h1>
            <h3>Total time played: {playTime}</h3>
            <button onClick={() => resetGame()}>Play Again?</button>
          </>
        )}
        {type === "loss" && (
          <>
            <h1>YOU HAVE LOST!</h1>
            <h3>Total time played: {playTime}</h3>
            <button onClick={() => resetGame()}>Play Again?</button>
          </>
        )}
      </ModalBody>
    </ModalBackground>
  );
};

export default InformationModal;
