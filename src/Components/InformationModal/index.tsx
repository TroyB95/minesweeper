import React, { useContext } from "react";
import { store } from "../../globalState";
import types from "../../globalState/types";

import { ModalBackground, ModalBody } from "./InformationModal.styled";

type ModalProps = {
  resetGame: Function;
  resetForNextLevel: Function;
  type: string;
  playTime: number;
  bombCount?: number;
  gridSize?: number;
};

const InformationModal = ({
  resetGame,
  resetForNextLevel,
  type,
  playTime,
}: ModalProps) => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const {
    state: {
      gameOptions: { bombCount, gridSize, difficulty },
    },
  } = globalState;

  const goNextLevel = (
    bombCount: number,
    gridSize: number,
    difficulty: string
  ) => {
    let newBombCount;
    let newGridSize;

    resetForNextLevel();
    switch (difficulty) {
      case "easy":
        newBombCount = bombCount + 5;
        newGridSize = gridSize + 2;
        break;
      case "medium":
        newBombCount = bombCount + 10;
        newGridSize = gridSize + 4;
        break;
      case "hard":
        newBombCount = bombCount + 15;
        newGridSize = gridSize + 6;
        break;
      default:
        break;
    }

    dispatch({
      type: types.UPDATE_GRID_OPTIONS,
      payload: { gridSize: newGridSize, bombCount: newBombCount },
    });
  };
  return (
    <ModalBackground>
      <ModalBody>
        {type === "win" && (
          <>
            <h1>CONGRATS YOU HAVE WON</h1>
            <h3>Total time played: {playTime} Seconds</h3>
            <button onClick={() => resetGame()}>Play Again?</button>
            <button
              onClick={() => goNextLevel(bombCount, gridSize, difficulty)}
            >
              Next Level?
            </button>
          </>
        )}
        {type === "loss" && (
          <>
            <h1>YOU HAVE LOST!</h1>
            <h3>Total time played: {playTime} Seconds</h3>
            <button onClick={() => resetGame()}>Play Again?</button>
          </>
        )}
      </ModalBody>
    </ModalBackground>
  );
};

export default InformationModal;
