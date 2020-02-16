import React, { useEffect, useState } from "react";
import styled from "styled-components";
import uniqid from "uniqid";

import "./App.css";

import { generateGrid } from "./gameFunctions/gridGeneration";

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
	const [flaggedLocations, setFlaggedLocations] = useState(new Set());

	function checkForBomb(value, e) {
		if (value === true) {
			e.target.innerHTML = "BOMB";
			alert("YOU HAVE HIT ABOMB");
		}
	}

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
											e.target.innerHTML = gridSquare;
										}}
										onContextMenu={e => {
											e.preventDefault();
											e.target.innerHTML = "&#9760";
											setFlaggedLocations(checkLocations(y, x));
										}}
										key={uniqid("grid-square-")}
										width="20"
									></GridSection>
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
