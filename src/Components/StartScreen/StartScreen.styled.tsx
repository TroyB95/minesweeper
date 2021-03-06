import styled from "styled-components";

export const StartScreenModalBackground = styled.div`
  ${({ theme: { colour } }) => `
  background: ${colour.background};
`}

  width: 100%;
  height: 100%;

  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StartScreenModal = styled.div`
  ${({ theme: { colour } }) => `
    background: ${colour.tileUnturnt};
    color: ${colour.secondaryFont};
  `}

  width: 50%;
  height: 50%;

  box-shadow: 10px 10px 14px -2px rgba(0, 0, 0, 0.75);
  border-radius: 20px;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const OptionsForm = styled.form`
  ${({ theme: { font } }) => `
    font-size: ${font.medium};
  `}

  width: 80%;
  height: 80%;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  input[type="submit"] {
    ${({ theme: { colour, font } }) => `
    background: ${colour.mainFont};
    font-family: ${font.family};
    font-size: ${font.large};

    :hover:enabled {
      background: ${colour.tileTurnt};
      cursor: pointer;
    }
  `}

    border: none;
    border-radius: 50%;

    padding: 12px 24px;
  }
`;

export const OptionsInputDiv = styled.div`
  ${({ theme: { colour, font } }) => `
    border: 1px dashed ${colour.mainFont};
     padding-bottom: ${font.small};
    `}

  width: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  input[type="radio"] {
    :hover {
      cursor: pointer;
    }

    transform: scale(1.4);
    margin-bottom: 8px;
  }

  label {
    padding-left: 0.25em;
  }

  div {
    flex: 1;

    text-align: center;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const StyledTitle = styled.p`
  ${({ theme: { font } }) => `
    padding-top: ${font.small};
  `}

  width: 100%;

  text-align: center;

  margin: 0;
  margin-bottom: 18px;
`;

export const StyledImg = styled.img`
  height: 36px;
  width: 36px;
`;

export const StyledButtonContainer = styled.div`
  width: 80%;

  display: flex;
  align-items: center;
  justify-content: space-around;
`;
