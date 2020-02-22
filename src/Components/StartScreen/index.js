import React, { useContext } from "react";
import styled from "styled-components";

import types from "../../globalState/types";
import { store } from "../../globalState";

const StartScreenModalBackground = styled.div`
	width: 100%;
	height: 100%;

	background: black;
	opacity: 80%;

	position: absolute;

	display: flex;
	align-items: center;
	justify-content: center;
`;

const StartScreenModal = styled.div`
	width: 50%;
	height: 50%;

	background: grey;

	opacity: 1;

	display: flex;
	align-items: center;
	justify-content: center;
`;

function StartScreen() {
	const globalState = useContext(store);
	const { dispatch } = globalState;

	let {
		gameOptions: { gridSize, bombs },
	} = globalState.state;

	return (
		<StartScreenModalBackground>
			<StartScreenModal>
				<form onSubmit={e => console.log(e)}>
					<label>
						Grid size:
						<input
							type="number"
							min="1"
							max="25"
							value={gridSize}
							onChange={e => {
								dispatch({ type: types.UPDATE_GRID_SIZE, payload: { gridSize: e.target.value } });
								console.log(globalState.state);
							}}
						></input>
					</label>

					<label>
						Number of bombs:
						<input
							type="number"
							min="1"
							max="25"
							value={bombs}
							onChange={e => {
								dispatch({ type: types.UPDATE_BOMBS, payload: { bombs: e.target.value } });
								console.log(globalState.state);
							}}
						></input>
					</label>
					<input type="submit" value="Submit" />
				</form>
			</StartScreenModal>
		</StartScreenModalBackground>
	);
}

export default StartScreen;
