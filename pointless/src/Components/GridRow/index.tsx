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
  children: any;
}

class GridRow extends Component<Props> {
  shouldComponentUpdate(nextProps: any, nextState: any) {
    console.log(nextProps, nextState);
    console.log(this.props, this.state);

    return false;
  }

  render() {
    const { height, children } = this.props;

    return <GridRowContainer height={height}>{children}</GridRowContainer>;
  }
}

export default GridRow;
