import React, { useContext } from "react";
import styled from "styled-components";

import { store } from "../../globalState";

import TimerBar from "../TimerBar";

const Header = styled.div`
  width: 100%;
  height: 5%;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const RoundCounter = styled.h3``;

interface IProps {
  resetGame: Function;
}
function HeaderBar({ resetGame }: IProps) {
  const globalState = useContext(store);
  const { roundLevel } = globalState.state;

  return (
    <Header>
      <TimerBar />
      <RoundCounter>{roundLevel}</RoundCounter>
      <button onClick={() => resetGame()}>Restart</button>
    </Header>
  );
}

export default HeaderBar;
