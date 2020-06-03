import React from "react";
import styled from "styled-components";

const GridRowContainer = styled.div<{ height: number }>`
  display: flex;

  width: 100%;
  height: ${(props) => 100 / props.height + "%"};

  border-left: ${({ theme: { colour } }) => `3px solid ${colour.background}`};
  border-top: ${({ theme: { colour } }) => `3px solid ${colour.background}`};

  &:last-of-type {
    border-bottom: ${({ theme: { colour } }) =>
      `3px solid ${colour.background}`};
  }
`;

function areEqual(prevProps: any, nextProps: any): any {
  const prevRow = prevProps.row.toString();
  const nextRow = nextProps.row.toString();

  if (prevRow === nextRow) return false;
  return true;
}

interface Props {
  height: number;
  children: Array<JSX.Element>;
  row: Array<string | number | boolean>;
}

function GridRow(props: Props): JSX.Element {
  const { height, children } = props;

  return <GridRowContainer height={height}>{children}</GridRowContainer>;
}

export default React.memo(GridRow, areEqual);
