import React, { useEffect, useState, useContext } from "react";
import uniqid from "uniqid";
import { store } from "./globalState";
import types from "./globalState/types";

import { ThemeContext } from "styled-components";

import {
  generateGrid,
  create2DArray,
  setBasicGrid,
} from "./gameFunctions/gridGeneration";
import {
  checkForBomb,
  mutateTrackingArray,
  checkIfWon,
  flipBlankTiles,
} from "./gameFunctions/gridHelpers";

import { GridContainer, PageContainer } from "./App.styled";

import HeaderBar from "./Components/HeaderBar";
import StartScreen from "./Components/StartScreen";
import InformationModal from "./Components/InformationModal";
import GridSquare from "./Components/GridSquare";
import GridRow from "./Components/GridRow";

function App() {
  const themeContext = useContext(ThemeContext);
  const globalState = useContext(store);
  const { dispatch } = globalState;
  const {
    tilesTurntCounter,
    flaggedLocations,
    gameOptions: { gridSize, bombCount },
    roundLevel,
  } = globalState.state;

  const [generatedGrid, setGrid] = useState(
    [] as Array<Array<number | string | boolean>>
  );
  const [optionsSubmitted, setOptionsSubmitted] = useState(false as boolean);
  const [tileTrackingArray, setTileTrackingArray] = useState([] as Array<any>);
  const [maxTilesTurnt, setMaxTilesTurnt] = useState(0);
  const [gameReset, setGameReset] = useState(false);
  const [gameState, setGameState] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [playTime, setPlayTime] = useState(0);
  useEffect(() => {
    setGrid(generateGrid(gridSize, bombCount));
    setTileTrackingArray(
      setBasicGrid(gridSize, create2DArray(gridSize), false)
    );
    setMaxTilesTurnt(gridSize * gridSize - bombCount);

    if (gameState === "win") {
      setGameState("");
    }
  }, [bombCount, gridSize, optionsSubmitted]);

  useEffect(() => {
    if (
      optionsSubmitted &&
      checkIfWon(tilesTurntCounter, maxTilesTurnt, flaggedLocations, bombCount)
    ) {
      const playTime = Math.round((Date.now() - startTime) / 1000);
      setPlayTime(playTime);
      setGameState("win");
    }
  }, [
    bombCount,
    flaggedLocations,
    maxTilesTurnt,
    optionsSubmitted,
    tilesTurntCounter,
    startTime,
  ]);

  function checkLocations(y: number, x: number, click: string) {
    if (flaggedLocations && flaggedLocations.has(`${y},${x}`)) {
      let deleteUpdatedSet = new Set(flaggedLocations);
      deleteUpdatedSet.delete(`${y},${x}`);
      return dispatch({
        type: types.UPDATE_FLAGGED_LOCATIONS,
        payload: deleteUpdatedSet,
      });
    }
    if (click === "right") {
      let addUpdateSet = new Set(flaggedLocations);
      addUpdateSet.add(`${y},${x}`);
      return dispatch({
        type: types.UPDATE_FLAGGED_LOCATIONS,
        payload: addUpdateSet,
      });
    }
  }

  function handleClick(
    e: React.MouseEvent<HTMLElement>,
    y: number,
    x: number,
    gridSquare: boolean | string | number
  ) {
    checkLocations(y, x, "left");
    let flippedTilesData = flipBlankTiles(
      y,
      x,
      tileTrackingArray,
      generatedGrid,
      gridSize
    );
    if (checkForBomb(gridSquare)) {
      const playTime = Math.round((Date.now() - startTime) / 1000);
      setPlayTime(playTime);
      setTimeout(() => {
        setGameState("loss");
      }, 500);
    }
    setTileTrackingArray(flippedTilesData.modifiedTrackingArr);
    dispatch({
      type: types.INCREMENT_COUNT,
      payload: flippedTilesData.numberOfTilesTurnt,
    });
  }

  function handleRightClick(
    e: React.MouseEvent<HTMLElement>,
    y: number,
    x: number
  ) {
    e.preventDefault();
    if (tileTrackingArray[y][x] === "flag") {
      setTileTrackingArray(mutateTrackingArray(y, x, tileTrackingArray, false));
      checkLocations(y, x, "right");
      return;
    }

    if (tileTrackingArray[y][x] !== true) {
      setTileTrackingArray(
        mutateTrackingArray(y, x, tileTrackingArray, "flag")
      );
      checkLocations(y, x, "right");
      return;
    }
  }

  function resetGame() {
    dispatch({ type: types.RESET_COUNT });
    dispatch({ type: types.RESET_FLAGGED_LOCATIONS });
    dispatch({ type: types.RESET_GRID_OPTIONS });
    dispatch({ type: types.RESET_ROUND_LEVEL });
    setGrid([]);
    setOptionsSubmitted(false);
    setTileTrackingArray([]);
    setMaxTilesTurnt(0);
    setGameState("");
    setGameReset(false);
  }

  function resetForNextLevel() {
    dispatch({ type: types.RESET_COUNT });
    dispatch({ type: types.RESET_FLAGGED_LOCATIONS });
    dispatch({ type: types.INCREMENT_ROUND_LEVEL });
    setGrid([]);
    setTileTrackingArray([]);
    setMaxTilesTurnt(0);
    setGameReset(false);
  }

  function renderSquare(
    tileTrackingArray: Array<any>,
    gridSquare: string | boolean | number,
    y: number,
    x: number
  ) {
    if (tileTrackingArray[y][x] === true) {
      if (gridSquare === true) return "bomb";
      return gridSquare;
    }
    if (tileTrackingArray[y][x] === "flag") return "flag";
  }
  return (
    <PageContainer>
      {!optionsSubmitted && (
        <StartScreen
          setOptionsSubmitted={setOptionsSubmitted}
          setStartTime={setStartTime}
        />
      )}
      {optionsSubmitted && (
        <>
          <HeaderBar resetGame={resetGame} />
          <GridContainer>
            {generatedGrid.map(
              (row: Array<string | number | boolean>, y: number) => {
                return (
                  <GridRow key={uniqid("grid-row-")} height={gridSize}>
                    {row.map((gridSquare, x) => {
                      return (
                        <GridSquare
                          onClick={(e: React.MouseEvent<HTMLElement>) =>
                            handleClick(e, y, x, gridSquare)
                          }
                          onContextMenu={(e: React.MouseEvent<HTMLElement>) =>
                            handleRightClick(e, y, x)
                          }
                          key={uniqid("grid-square-")}
                          width={gridSize}
                          backgroundColour={
                            tileTrackingArray[y][x] === true
                              ? themeContext.colour.tileTurnt
                              : themeContext.colour.tileUnturnt
                          }
                          renderType={renderSquare(
                            tileTrackingArray,
                            gridSquare,
                            y,
                            x
                          )}
                        ></GridSquare>
                      );
                    })}
                  </GridRow>
                );
              }
            )}
          </GridContainer>
        </>
      )}
      {gameState === "win" && (
        <InformationModal
          resetGame={resetGame}
          resetForNextLevel={resetForNextLevel}
          type="win"
          playTime={playTime}
        />
      )}
      {gameState === "loss" && (
        <InformationModal
          resetGame={resetGame}
          resetForNextLevel={resetForNextLevel}
          type="loss"
          playTime={playTime}
        />
      )}
    </PageContainer>
  );
}

export default App;
