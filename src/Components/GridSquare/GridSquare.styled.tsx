import styled from "styled-components";

export const GridSection = styled.div<{
  backgroundColour: string;
  width: number;
}>`
  ${({ theme: { colour, font } }) => `
  font-family: ${font.bold};
  border-right:3px solid ${colour.background}; 
`}

  flex-grow: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${(props) => props.backgroundColour};

  width: ${(props) => 100 / props.width + "%"};
  height: 100%;
`;
/* :hover {
    cursor: ${(props) => props.pointer};
    background: ${(props) => props.backgroundColour};
  }
  */
// TODO: Add hover props and background for turnt tiles ^^
export const TileImage = styled.img`
  width: 90%;
  height: 90%;
`;
