import React, { useContext } from "react";
import styled from "styled-components";

import { store } from "../../globalState";

import TimerBar from "../TimerBar";
import { StyledButton } from "../Button/Button.styled";

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
    font-size: ${font.medium};
`}
  padding-left: 3px;
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
      <RoundCounter>Level: {roundLevel}</RoundCounter>
      <StyledButton onClick={() => resetGame()}>Restart</StyledButton>
    </Header>
  );
}

export default HeaderBar;
