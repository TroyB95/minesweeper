import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import uniqid from "uniqid";
import { store } from "./globalState";
import types from "./globalState/types";

import { generateGrid, create2DArray, setBasicGrid } from "./gameFunctions/gridGeneration";
import { checkForBomb, mutateTrackingArray, checkIfWon, flipBlankTiles } from "./gameFunctions/gridHelpers";

import TimerBar from "./Components/TimerBar";
import StartScreen from "./Components/StartScreen";
import WinningModal from "./Components/WinningModal";

import BombSVG from "./Assets/bomb.svg";
import FlagSVG from "./Assets/skull.svg";

const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const GridContainer = styled.div`
  width: 80%;
  height: 80%;
`;
const GridRow = styled.div`
  display: flex;

  width: 100%;
  height: ${props => 100 / props.height + "%"};

  border-left: 1px solid black;
  border-top: 1px solid black;

  &:last-of-type {
    border-bottom: 1px solid black;
  }
`;

const GridSection = styled.div`
  border-right: 1px solid black;

  flex-grow: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${props => props.backgroundColor};

  width: ${props => 100 / props.width + "%"};
  height: 100%;
`;

const TileImage = styled.img`
  width: 90%;
  height: 90%;
`;

function App() {
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const {
    tilesTurntCounter,
    flaggedLocations,
    gameOptions: { gridSize, bombCount },
  } = globalState.state;

  const [generatedGrid, setGrid] = useState();
  const [optionsSubmitted, setOptionsSubmitted] = useState(false);
  const [tileTrackingArray, setTileTrackingArray] = useState();
  const [maxTilesTurnt, setMaxTilesTurnt] = useState();
  const [gameReset, setGameReset] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    setGrid(generateGrid(gridSize, bombCount));
    setTileTrackingArray(setBasicGrid(gridSize, create2DArray(gridSize), false));
    setMaxTilesTurnt(gridSize * gridSize - bombCount);
  }, [bombCount, gridSize, optionsSubmitted]);

  useEffect(() => {
    if (optionsSubmitted && checkIfWon(tilesTurntCounter, maxTilesTurnt, flaggedLocations, bombCount)) {
      setGameWon(true);
    }
  }, [bombCount, flaggedLocations, maxTilesTurnt, optionsSubmitted, tilesTurntCounter]);

  function checkLocations(y, x, click) {
    if (flaggedLocations && flaggedLocations.has(`${y},${x}`)) {
      let deleteUpdatedSet = new Set(flaggedLocations);
      deleteUpdatedSet.delete(`${y},${x}`);
      return dispatch({ type: types.UPDATE_FLAGGED_LOCATIONS, payload: deleteUpdatedSet });
    }
    if (click === "right") {
      let addUpdateSet = new Set(flaggedLocations);
      addUpdateSet.add(`${y},${x}`);
      return dispatch({ type: types.UPDATE_FLAGGED_LOCATIONS, payload: addUpdateSet });
    }
  }

  function handleClick(e, y, x, gridSquare) {
    checkForBomb(gridSquare, e);
    checkLocations(y, x, "left");
    let flippedTilesData = flipBlankTiles(y, x, tileTrackingArray, generatedGrid, gridSize);
    setTileTrackingArray(flippedTilesData.modifiedTrackingArr);
    dispatch({ type: types.INCREMENT_COUNT, payload: flippedTilesData.numberOfTilesTurnt });
  }

  function handleRightClick(e, y, x) {
    e.preventDefault();
    if (tileTrackingArray[y][x] === "flag") {
      setTileTrackingArray(mutateTrackingArray(y, x, tileTrackingArray, false));
      checkLocations(y, x, "right");
      return;
    }

    if (tileTrackingArray[y][x] !== true) {
      setTileTrackingArray(mutateTrackingArray(y, x, tileTrackingArray, "flag"));
      checkLocations(y, x, "right");
      return;
    }
  }

  function resetGame() {
    dispatch({ type: types.RESET_COUNT });
    dispatch({ type: types.RESET_FLAGGED_LOCATIONS });
    dispatch({ type: types.RESET_GRID_OPTIONS });
    setGrid("");
    setOptionsSubmitted(false);
    setTileTrackingArray("");
    setMaxTilesTurnt("");
    setGameWon(false);
    setGameReset(false);
  }

  function renderSquare(tileTrackingArray, gridSquare, y, x) {
    if (tileTrackingArray[y][x] === true) {
      if (gridSquare === true) return <TileImage alt="Dynamite sticks with timer" src={BombSVG} />;
      return gridSquare;
    }
    if (tileTrackingArray[y][x] === "flag")
      return <TileImage alt="Black flag with skull and crosbones on" src={FlagSVG} />;
  }

  return (
    <PageContainer>
      {!optionsSubmitted && <StartScreen setOptionsSubmitted={setOptionsSubmitted} />}
      {optionsSubmitted && (
        <>
          <TimerBar restart={gameReset ? true : false} />
          <button onClick={resetGame}>Restart</button>
          <GridContainer>
            {generatedGrid.map((row, y) => {
              return (
                <GridRow key={uniqid("grid-row-")} height={gridSize}>
                  {row.map((gridSquare, x) => {
                    return (
                      <GridSection
                        onClick={e => handleClick(e, y, x, gridSquare)}
                        onContextMenu={e => handleRightClick(e, y, x)}
                        key={uniqid("grid-square-")}
                        width={gridSize}
                        backgroundColor={
                          tileTrackingArray[y][x] === true
                            ? "#828282"
                            : tileTrackingArray[y][x] === "flag"
                            ? "#3c64a3"
                            : "#262626"
                        }
                      >
                        {renderSquare(tileTrackingArray, gridSquare, y, x)}
                      </GridSection>
                    );
                  })}
                </GridRow>
              );
            })}
          </GridContainer>
        </>
      )}
      {gameWon && <WinningModal resetGame={resetGame} />}
    </PageContainer>
  );
}

export default App;
