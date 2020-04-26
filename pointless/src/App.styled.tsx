import styled from "styled-components";

export const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;

  background: ${({ theme: { colour } }) => colour.background};

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const GridContainer = styled.div`
  width: 80%;
  height: 80%;
`;
