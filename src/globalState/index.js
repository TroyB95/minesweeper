import React, { createContext, useReducer } from "react";

import types from "./types";

const initialState = { tilesTurntCounter: 0, flaggedLocations: new Set() };

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
	const [state, dispatch] = useReducer((state, action) => {
		switch (action.type) {
			case types.INCREMENT_COUNT:
				return {
					tilesTurntCounter: state.tilesTurntCounter + 1,
				};
			case types.RESET_COUNT:
				return {
					tilesTurntCounter: 0,
				};
			case types.UPDATE_FLAGGED_LOCATIONS:
				return {
					flaggedLocations: action.payload,
				};
			case types.RESET_FLAGGED_LOCATIONS:
				return {
					flaggedLocations: new Set(),
				};
			//   case 'action description':
			//     const newState = // do something with the action
			//     return newState;
			default:
				throw new Error();
		}
	}, initialState);

	return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
