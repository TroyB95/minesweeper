import styled from "styled-components";

const StyledButton = styled.button`
  ${({ theme: { font, colour } }) => `
    font-family: ${font.family};
    background: ${colour.mainFont};
   

  text-transform: uppercase;
  text-decoration: none;

  color: black;
  padding: 4px;
  border: 1px solid ${colour.background};
  display: inline-block;
  transition: all 0.4s ease 0s;

  :hover {
    background: ${colour.tileTurnt};
    border-color: ${colour.tileTurnt};
    transition: all 0.4s ease 0s;
  }
   `}
`;

export { StyledButton };
