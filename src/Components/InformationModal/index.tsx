import React, { useContext } from "react";
import { store } from "../../globalState";
import types from "../../globalState/types";

import { ModalBackground, ModalBody } from "./InformationModal.styled";
import { StyledButton } from "../Button/Button.styled";
import { playSound } from "../../gameFunctions/utils/sound";
import buttonSelectSound from "../../Assets/sounds/button-select.mp3";

type ModalProps = {
  resetGame: Function;
  resetForNextLevel: Function;
  type: string;
  playTime: number;
  bombCount?: number;
  gridSize?: number;
};

const InformationModal: React.FunctionComponent<ModalProps> = ({
  resetGame,
  resetForNextLevel,
  type,
  playTime,
}: ModalProps) => {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const {
    state: {
      gameOptions: { bombCount, gridSize, difficulty, custom },
      roundLevel,
      sound,
    },
  } = globalState;

  const goNextLevel = (
    bombCount: number,
    gridSize: number,
    difficulty: string
  ): void => {
    let newBombCount;
    let newGridSize;
    playSound(buttonSelectSound, sound * 0.7);
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
            {!custom ? (
              <h1>CONGRATS YOU HAVE BEAT LEVEL {roundLevel}</h1>
            ) : (
              <h1>CONGRATS YOU HAVE WON!</h1>
            )}

            <h3>Total time played: {playTime} Seconds</h3>
            {!custom && (
              <StyledButton
                fontSize="18px"
                width="144px"
                height="42px"
                onClick={() => goNextLevel(bombCount, gridSize, difficulty)}
              >
                Next Level
              </StyledButton>
            )}
            <br />
            <br />
            <StyledButton
              fontSize="18px"
              width="144px"
              height="42px"
              onClick={() => {
                playSound(buttonSelectSound, sound * 0.7);
                resetGame();
              }}
            >
              Restart
            </StyledButton>
          </>
        )}
        {type === "loss" && (
          <>
            <h1>
              YOU HAVE LOST AT <br />
              ROUND LEVEL {roundLevel}!
            </h1>
            <h3>Total time played: {playTime} Seconds</h3>
            <StyledButton
              fontSize="18px"
              width="144px"
              height="42px"
              onClick={() => {
                playSound(buttonSelectSound, sound * 0.7);
                resetGame();
              }}
            >
              Play Again
            </StyledButton>
          </>
        )}
      </ModalBody>
    </ModalBackground>
  );
};

export default InformationModal;
