import styled from "styled-components";

export const StartScreenModalBackground = styled.div`
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.8);

  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StartScreenModal = styled.div`
  width: 50%;
  height: 50%;

  background: grey;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const OptionsForm = styled.form`
  width: 80%;
  height: 80%;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  input[type="submit"] {
    width: 8em;
    height: 4em;
  }
`;

export const OptionsInputDiv = styled.div`
  width: 80%;
  height: 15%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  input[type="radio"] {
    width: 2em;
    height: 2em;
  }

  label {
    padding-left: 0.25em;
  }

  div {
    height: 4em;
    width: 4em;

    text-align: center;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const ToggleOptions = styled.button`
  position: relative;

  bottom: 0;
  right: 0;
`;
