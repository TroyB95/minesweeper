import styled from "styled-components";

export const GridSection = styled.div<{
  backgroundColour: string;
  width: number;
}>`
  border-right: 1px solid black;

  flex-grow: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${props => props.backgroundColour};

  width: ${props => 100 / props.width + "%"};
  height: 100%;
`;

export const TileImage = styled.img`
  width: 90%;
  height: 90%;
`;
