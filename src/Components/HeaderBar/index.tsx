import React, { useContext } from "react";
import styled from "styled-components";

import { store } from "../../globalState";

import TimerBar from "../TimerBar";

const Header = styled.div`
  width: 100%;
  height: 5%;

  display: flex;
`;

const RoundCounter = styled.h3``;

function HeaderBar() {
  const globalState = useContext(store);

  const { roundLevel } = globalState.state;
  return (
    <Header>
      <TimerBar />
      <RoundCounter>{roundLevel}</RoundCounter>
    </Header>
  );
}

export default HeaderBar;
