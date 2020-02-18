import React, { useEffect, useState } from "react";
import styled from "styled-components";
import uniqid from "uniqid";

import "./App.css";

import { generateGrid, create2DArray, setBasicGrid } from "./gameFunctions/gridGeneration";
import { checkForBomb, mutateTrackingArray } from "./gameFunctions/gridHelpers";

const PageContainer = styled.div`
	width: 100vw;
	height: 100vh;

	display: flex;
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
`;
const GridSection = styled.div`
	border: 1px solid black;

	flex-grow: 1;

	display: flex;
	align-items: center;
	justify-content: center;

	width: ${props => 100 / props.width + "%"};
	height: 100%;
`;

function App() {
	const [generatedGrid, setGrid] = useState(generateGrid(20, 20, 15));
	const [tileTrackingArray, setTileTrackingArray] = useState(setBasicGrid(20, 20, create2DArray(20), false));
	const [flaggedLocations, setFlaggedLocations] = useState(new Set());
	const [tilesTurnt, setTilesTurnt] = useState(0);
	const [maxTilesTurnt, setMaxTilesTurnt] = useState(20 * 20 - 15);

	function checkLocations(y, x) {
		if (flaggedLocations.has(`${y}${x}`)) {
			let deleteUpdatedSet = new Set(flaggedLocations);
			deleteUpdatedSet.delete(`${y}${x}`);
			return deleteUpdatedSet;
		}
		let addUpdateSet = new Set(flaggedLocations);
		addUpdateSet.add(`${y}${x}`);
		return addUpdateSet;
	}

	return (
		<PageContainer>
			<GridContainer>
				{generatedGrid.map((row, y) => {
					return (
						<GridRow key={uniqid("grid-row-")} height="20">
							{row.map((gridSquare, x) => {
								return (
									<GridSection
										onClick={e => {
											checkForBomb(gridSquare, e);
											setTilesTurnt(tilesTurnt + 1);
											setTileTrackingArray(mutateTrackingArray(y, x, tileTrackingArray));
										}}
										onContextMenu={e => {
											e.preventDefault();
											e.target.innerHTML = "&#9760";
											setFlaggedLocations(checkLocations(y, x));
										}}
										key={uniqid("grid-square-")}
										width="20"
									>
										{tileTrackingArray[y][x] === true ? gridSquare : null}
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
