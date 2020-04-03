import styled from "styled-components";

export const ModalBackground = styled.div`
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.8);

  position: absolute;

  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ModalBody = styled.div`
  width: 50%;
  height: 50%;

  background: grey;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
