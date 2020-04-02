import React, { PureComponent } from "react";
import styled from "styled-components";

import BombSVG from "../../Assets/bomb.svg";
import FlagSVG from "../../Assets/skull.svg";

const GridSection = styled.div<{ backgroundColour: string; width: number }>`
  border-right: 1px solid black;

  flex-grow: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${props => props.backgroundColour};

  width: ${props => 100 / props.width + "%"};
  height: 100%;
`;

const TileImage = styled.img`
  width: 90%;
  height: 90%;
`;

interface Props {
  onClick: any;
  onContextMenu: any;
  width: number;
  backgroundColour: string;
  renderType: any;
}

interface State {}

class GridSquare extends PureComponent<Props, State> {
  showImage(type: string | number) {
    if (type === "bomb") {
      return <TileImage alt="Dynamite sticks with timer" src={BombSVG} />;
    }
    if (type === "flag") {
      return (
        <TileImage alt="Black flag with skull and crosbones on" src={FlagSVG} />
      );
    }
    return type;
  }

  render() {
    const {
      onClick,
      onContextMenu,
      width,
      backgroundColour,
      renderType
    } = this.props;

    return (
      <GridSection
        backgroundColour={backgroundColour}
        width={width}
        onClick={onClick}
        onContextMenu={onContextMenu}
      >
        {this.showImage(renderType)}
      </GridSection>
    );
  }
}

export default GridSquare;
