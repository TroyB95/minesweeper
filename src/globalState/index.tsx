import React, { createContext, useReducer, FunctionComponent } from "react";

import types, { ChatActionTypes } from "./types";

const initialState = {
  tilesTurntCounter: 0,
  flaggedLocations: new Set(),
  gameOptions: { bombCount: 0, gridSize: 0 }
};

interface IContextProps {
  state: StateType;
  dispatch: React.Dispatch<any>;
}

type StateType = {
  tilesTurntCounter: number;
  flaggedLocations: Set<Array<number>>;
  gameOptions: { gridSize: number; bombCount: number };
};

const store = createContext({} as IContextProps);
const { Provider } = store;

const StateProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(
    (state: StateType, action: ChatActionTypes) => {
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
    },
    initialState
  );

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
