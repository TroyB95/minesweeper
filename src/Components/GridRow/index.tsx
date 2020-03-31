import React, { PureComponent } from "react";
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
}

class GridRow extends PureComponent<Props> {
  render() {
    const { height } = this.props;
    return <GridRowContainer height={height}></GridRowContainer>;
  }
}

export default GridRow;
