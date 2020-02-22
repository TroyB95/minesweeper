import React, { createContext, useReducer } from "react";

import types from "./types";

const initialState = {
	tilesTurntCounter: 0,
	flaggedLocations: new Set(),
	gameOptions: { bombs: 0, gridSize: 0 },
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case types.INCREMENT_COUNT:
				return {
					...state,
					tilesTurntCounter: state.tilesTurntCounter + 1,
				};
			case types.RESET_COUNT:
				return {
					...state,
					tilesTurntCounter: 0,
				};
			case types.UPDATE_FLAGGED_LOCATIONS:
				return {
					...state,
					flaggedLocations: action.payload,
				};
			case types.RESET_FLAGGED_LOCATIONS:
				return {
					...state,
					flaggedLocations: new Set(),
				};
			case types.UPDATE_GRID_SIZE:
				return {
					...state,
					gameOptions: { ...state.gameOptions, ...action.payload },
				};
			case types.UPDATE_BOMBS:
				return {
					...state,
					gameOptions: { ...state.gameOptions, ...action.payload },
				};
			default:
				throw new Error();
		}
	}, initialState);

	return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
