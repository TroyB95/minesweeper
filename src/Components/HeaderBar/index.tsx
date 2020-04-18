import React, { useContext } from "react";
import styled from "styled-components";

import { store } from "../../globalState";

import TimerBar from "../TimerBar";

const Header = styled.div`
  width: 80%;
  height: 5%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RoundCounter = styled.h3`
  ${({ theme: { colour, font } }) => `
    color: ${colour.mainFont};
    font-size: ${font.medium}
`}
`;

interface IProps {
  resetGame: Function;
}
function HeaderBar({ resetGame }: IProps) {
  const globalState = useContext(store);
  const { roundLevel } = globalState.state;

  return (
    <Header>
      {/* <TimerBar /> */}
      <RoundCounter>Round Level: {roundLevel}</RoundCounter>
      <button onClick={() => resetGame()}>Restart</button>
    </Header>
  );
}

export default HeaderBar;
