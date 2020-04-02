import React, { Component } from "react";
import styled from "styled-components";

const GridRowContainer = styled.div<{ height: number }>`
  display: flex;

  width: 100%;
  height: ${props => 100 / props.height + "%"};

  border-left: 1px solid black;
  border-top: 1px solid black;

  &:last-of-type {
    border-bottom: 1px solid black;
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
