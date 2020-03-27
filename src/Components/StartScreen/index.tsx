import React, { useContext, useState } from "react";
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

  input[type="submit"] {
    width: 8em;
    height: 4em;
  }
`;

const OptionsInputDiv = styled.div`
  width: 80%;
  height: 15%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  input[type="radio"] {
    width: 2em;
    height: 2em;
  }

  label {
    padding-left: 0.25em;
  }

  div {
    height: 4em;
    width: 4em;

    text-align: center;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const ToggleOptions = styled.button`
  position: relative;

  bottom: 0;
  right: 0;
`;

type StartScreenProps = {
  setStartTime: Function;
  setOptionsSubmitted: Function;
};

function StartScreen({ setStartTime, setOptionsSubmitted }: StartScreenProps) {
  const [gridOptions, setGridOptions] = useState({ gridSize: 0, bombCount: 0 });
  const [optionsView, setOptionsView] = useState("basic");
  const [difficulty, setDifficulty] = useState("");
  const globalState = useContext(store);
  const { dispatch } = globalState;

  const { gridSize, bombCount } = gridOptions;

  function handleSubmit(
    e: MouseEvent,
    optionsView: string,
    difficulty: string
  ) {
    if (optionsView === "basic") {
      e.preventDefault();
      if (difficulty === "easy") {
        dispatch({
          type: types.UPDATE_GRID_OPTIONS,
          payload: { gridSize: 10, bombCount: 20 }
        });
      }
      if (difficulty === "medium") {
        dispatch({
          type: types.UPDATE_GRID_OPTIONS,
          payload: { gridSize: 15, bombCount: 45 }
        });
      }
      if (difficulty === "hard") {
        dispatch({
          type: types.UPDATE_GRID_OPTIONS,
          payload: { gridSize: 25, bombCount: 100 }
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

  function handleOnChange(e) {
    setDifficulty(e.currentTarget.value);
  }

  function submitButtonDisabled(view, difficulty, gridOptions) {
    if (view === "basic") {
      return difficulty === "";
    }
    if (view === "advanced") {
      return gridOptions.gridSize === 0 || gridOptions.bombCount === 0;
    }
  }
  return (
    <StartScreenModalBackground>
      <StartScreenModal>
        <OptionsForm
          onSubmit={e => handleSubmit(e, optionsView, difficulty, gridOptions)}
        >
          {optionsView === "basic" && (
            <OptionsInputDiv>
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
                  onChange={e => {
                    setGridOptions({
                      ...gridOptions,
                      gridSize: Number(e.target.value)
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
                  onChange={e => {
                    setGridOptions({
                      ...gridOptions,
                      bombCount: Number(e.target.value)
                    });
                  }}
                ></input>
              </OptionsInputDiv>
            </>
          )}
          <input
            type="submit"
            value="Start"
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
