import React, { createContext, useReducer, FunctionComponent } from "react";

import types from "./types";

const initialState = {
  tilesTurntCounter: 0,
  flaggedLocations: new Set(),
  gameOptions: { bombCount: 0, gridSize: 0 }
};

const store = createContext(initialState);
const { Provider } = store;

type StateType = {
  tilesTurntCounter: number;
  flaggedLocations: Set<Array<number>>;
  gameOptions: Object;
};

const StateProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer((state: StateType, action: String) => {
    switch (action.type) {
      case types.INCREMENT_COUNT:
        return {
          ...state,
          tilesTurntCounter:
            state.tilesTurntCounter + (action.payload ? action.payload : 1)
        };
      case types.RESET_COUNT:
        return {
          ...state,
          tilesTurntCounter: 0
        };
      case types.UPDATE_FLAGGED_LOCATIONS:
        return {
          ...state,
          flaggedLocations: action.payload
        };
      case types.RESET_FLAGGED_LOCATIONS:
        return {
          ...state,
          flaggedLocations: new Set()
        };
      case types.UPDATE_GRID_OPTIONS:
        return {
          ...state,
          gameOptions: { ...state.gameOptions, ...action.payload }
        };
      case types.RESET_GRID_OPTIONS:
        return {
          ...state,
          gameOptions: { bombCount: 0, gridSize: 0 }
        };

      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
