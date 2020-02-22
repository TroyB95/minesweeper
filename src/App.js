import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import uniqid from "uniqid";
import { store } from "./globalState";
import types from "./globalState/types";

import "./App.css";

import { generateGrid, create2DArray, setBasicGrid } from "./gameFunctions/gridGeneration";
import { checkForBomb, mutateTrackingArray } from "./gameFunctions/gridHelpers";

import TimerBar from "./Components/TimerBar";
import StartScreen from "./Components/StartScreen";

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

	width: ${props => 100 / props.width + "%"};
	height: 100%;
`;

function App() {
	const globalState = useContext(store);
	const { dispatch } = globalState;

	const { tilesTurntCounter, flaggedLocations } = globalState.state;

	const [generatedGrid, setGrid] = useState(generateGrid(5, 5, 2));
	const [optionsSelected, setOptionsSelected] = useState(false);
	const [tileTrackingArray, setTileTrackingArray] = useState(setBasicGrid(5, 5, create2DArray(5), false));
	const [maxTilesTurnt, setMaxTilesTurnt] = useState(5 * 5 - 2);
	const [gameReset, setGameReset] = useState(false);

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

	function checkIfWon(tilesTurntCount, maxTilesTurnt, flaggedLocations, generatedGrid, bombCount) {
		if (tilesTurntCount === maxTilesTurnt - 1) {
			if (flaggedLocations.size === bombCount) {
				alert("Congratulations, you have won the game!");
			}
		}
	}

	function handleClick(e, y, x, gridSquare) {
		checkForBomb(gridSquare, e);
		if (tileTrackingArray[y][x] !== true) {
			dispatch({ type: types.INCREMENT_COUNT });
		}
		setTileTrackingArray(mutateTrackingArray(y, x, tileTrackingArray, true));
		checkLocations(y, x, "left");
		checkIfWon(tilesTurntCounter, maxTilesTurnt, flaggedLocations, generatedGrid, 2);
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
	}

	return (
		<PageContainer>
			{!optionsSelected && <StartScreen />}
			<TimerBar restart={gameReset ? true : false} />
			<GridContainer>
				{generatedGrid.map((row, y) => {
					return (
						<GridRow key={uniqid("grid-row-")} height="5">
							{row.map((gridSquare, x) => {
								return (
									<GridSection
										onClick={e => handleClick(e, y, x, gridSquare)}
										onContextMenu={e => handleRightClick(e, y, x)}
										key={uniqid("grid-square-")}
										width="5"
									>
										{tileTrackingArray[y][x] === true
											? gridSquare
											: tileTrackingArray[y][x] === "flag"
											? "F"
											: null}
									</GridSection>
								);
							})}
						</GridRow>
					);
				})}
			</GridContainer>
		</PageContainer>
	);
}

export default App;
