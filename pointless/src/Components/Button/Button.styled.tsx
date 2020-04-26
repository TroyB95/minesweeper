import styled from "styled-components";

const StyledButton = styled.button<{
  fontSize?: string;
  width?: string;
  height?: string;
}>`
  ${({ theme: { font, colour } }) => `
    font-family: ${font.family};
    background: ${colour.mainFont};
   
  text-transform: uppercase;
  text-decoration: none;

  cursor: pointer;

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

  font-size: ${(props) => (props.fontSize ? props.fontSize : "12px")};
  width: ${(props) => (props.width ? props.width : "")};
  height: ${(props) => (props.height ? props.height : "")};

`;

export { StyledButton };
