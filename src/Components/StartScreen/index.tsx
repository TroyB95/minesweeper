import React, { useContext, useState, ChangeEvent } from "react";

import types from "../../globalState/types";
import { store } from "../../globalState";

import {
  StartScreenModal,
  StartScreenModalBackground,
  OptionsForm,
  OptionsInputDiv,
  ToggleOptions,
  StyledTitle,
} from "./StartScreen.styled";

type StartScreenProps = {
  setStartTime: Function;
  setOptionsSubmitted: Function;
};

type GridOptions = {
  gridSize: number;
  bombCount: number;
  difficulty: string;
};

function StartScreen({ setStartTime, setOptionsSubmitted }: StartScreenProps) {
  const [gridOptions, setGridOptions] = useState({
    gridSize: 0,
    bombCount: 0,
    difficulty: "",
  });
  const [optionsView, setOptionsView] = useState("basic");

  const globalState = useContext(store);
  const { dispatch } = globalState;

  const {
    state: {
      gameOptions: { difficulty },
    },
  } = globalState;

  const { gridSize, bombCount } = gridOptions;

  function handleSubmit(
    e: React.FormEvent<HTMLFormElement>,
    optionsView: string,
    difficulty: string
  ) {
    if (optionsView === "basic") {
      e.preventDefault();
      if (difficulty === "easy") {
        dispatch({
          type: types.UPDATE_GRID_OPTIONS,
          payload: { gridSize: 10, bombCount: 15 },
        });
      }
      if (difficulty === "medium") {
        dispatch({
          type: types.UPDATE_GRID_OPTIONS,
          payload: { gridSize: 15, bombCount: 40 },
        });
      }
      if (difficulty === "hard") {
        dispatch({
          type: types.UPDATE_GRID_OPTIONS,
          payload: { gridSize: 25, bombCount: 100 },
        });
      }
      setStartTime(Date.now());
      setOptionsSubmitted(true);
      return;
    }

    if (optionsView === "advanced") {
      e.preventDefault();
      dispatch({ type: types.UPDATE_GRID_OPTIONS, payload: gridOptions });
      setStartTime(Date.now());
      setOptionsSubmitted(true);
    }
  }

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    if (!e) {
      return;
    }
    dispatch({
      type: types.UPDATE_GRID_OPTIONS,
      payload: { difficulty: e.currentTarget.value },
    });
  }

  function submitButtonDisabled(
    view: string,
    difficulty: string,
    gridOptions: GridOptions
  ) {
    if (view === "basic") {
      return difficulty === "";
    }
    if (view === "advanced") {
      return gridOptions.gridSize === 0 || gridOptions.bombCount === 0;
    }
    return true;
  }
  return (
    <StartScreenModalBackground>
      <StartScreenModal>
        <OptionsForm onSubmit={(e) => handleSubmit(e, optionsView, difficulty)}>
          {optionsView === "basic" && (
            <OptionsInputDiv>
              <StyledTitle>Difficulty</StyledTitle>
              <div>
                <input
                  type="radio"
                  id="easy"
                  name="difficulty"
                  value="easy"
                  onChange={handleOnChange}
                />
                <label htmlFor="easy">Easy</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="medium"
                  name="difficulty"
                  value="medium"
                  onChange={handleOnChange}
                />
                <label htmlFor="medium">Medium</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="hard"
                  name="difficulty"
                  value="hard"
                  onChange={handleOnChange}
                />
                <label htmlFor="hard">Hard</label>
              </div>
            </OptionsInputDiv>
          )}
          {optionsView === "advanced" && (
            <>
              <OptionsInputDiv>
                <label>Grid size: </label>
                <input
                  type="number"
                  min="10"
                  max="50"
                  value={gridSize}
                  onChange={(e) => {
                    setGridOptions({
                      ...gridOptions,
                      gridSize: Number(e.target.value),
                    });
                  }}
                ></input>
              </OptionsInputDiv>
              <OptionsInputDiv>
                <label>Number of bombs: </label>
                <input
                  disabled={gridSize > 0 ? false : true}
                  type="number"
                  min={Math.round(gridSize * gridSize * 0.1)}
                  max={Math.round(gridSize * gridSize * 0.5)}
                  value={bombCount}
                  onChange={(e) => {
                    setGridOptions({
                      ...gridOptions,
                      bombCount: Number(e.target.value),
                    });
                  }}
                ></input>
              </OptionsInputDiv>
            </>
          )}
          <input
            type="submit"
            value="START"
            disabled={submitButtonDisabled(
              optionsView,
              difficulty,
              gridOptions
            )}
          />
        </OptionsForm>
        <ToggleOptions
          onClick={() =>
            setOptionsView(optionsView === "basic" ? "advanced" : "basic")
          }
        >
          {optionsView === "basic" ? "Advanced" : "Basic"}
        </ToggleOptions>
      </StartScreenModal>
    </StartScreenModalBackground>
  );
}

export default StartScreen;
