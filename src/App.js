import React, { useEffect, useState } from "react";
import styled from "styled-components";

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

	return (
		<PageContainer>
			<GridContainer>
				{generatedGrid.map(row => {
					return (
						<GridRow height="20">
							{row.map(gridSquare => {
								return <GridSection width="20">{gridSquare === true ? "BOMB" : gridSquare}</GridSection>;
							})}
						</GridRow>
					);
				})}
			</GridContainer>
		</PageContainer>
	);
}

export default App;
