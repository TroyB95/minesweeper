import styled from "styled-components";

export const GridSection = styled.div<{
  backgroundColour: string;
  pointer: string;
  hoverColour: string;
  width: number;
}>`
  ${({ theme: { colour, font } }) => `
  font-family: ${font.bold};
  border-right:3px solid ${colour.background}; 
`}

  width: ${(props) => 100 / props.width + "%"};
  height: 100%;

  flex-grow: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${(props) => props.backgroundColour};

  :hover {
    cursor: ${(props) => props.pointer};
    background: ${(props) => props.hoverColour};
  }


`;

export const TileImage = styled.img`
  width: 90%;
  height: 90%;
`;
