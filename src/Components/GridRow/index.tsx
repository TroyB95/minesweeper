import React, { Component } from "react";
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

interface Props {
  height: number;
  children: Array<JSX.Element>;
  row: Array<string | number | boolean>;
}

class GridRow extends Component<Props, {}> {
  render(): JSX.Element {
    const { height, children } = this.props;
    return <GridRowContainer height={height}>{children}</GridRowContainer>;
  }
}

export default GridRow;
