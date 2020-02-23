import React, { useContext } from "react";
import styled from "styled-components";

import types from "../../globalState/types";
import { store } from "../../globalState";

const StartScreenModalBackground = styled.div`
	width: 100%;
	height: 100%;

	background-color: rgba(0, 0, 0, 0.8);

	position: absolute;

	display: flex;
	align-items: center;
	justify-content: center;
`;

const StartScreenModal = styled.div`
	width: 50%;
	height: 50%;

	background: grey;

	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const OptionsForm = styled.form`
	width: 80%;
	height: 80%;

	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
`;

const OptionsInputDiv = styled.div`
	width: 80%;
	height: 15%;

	display: flex;
	justify-content: space-between;
	align-items: center;
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
				<OptionsForm onSubmit={e => console.log(e)}>
					<OptionsInputDiv>
						<label>Grid size: </label>
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
					</OptionsInputDiv>
					<OptionsInputDiv>
						<label>Number of bombs: </label>
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
					</OptionsInputDiv>
					<input type="submit" value="Submit" />
				</OptionsForm>
			</StartScreenModal>
		</StartScreenModalBackground>
	);
}

export default StartScreen;