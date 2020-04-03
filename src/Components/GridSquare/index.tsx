import React, { Component } from "react";

import { TileImage, GridSection } from "./GridSquare.styled";
import BombSVG from "../../Assets/bomb.svg";
import FlagSVG from "../../Assets/skull.svg";

interface Props {
  onClick: any;
  onContextMenu: any;
  width: number;
  backgroundColour: string;
  renderType: any;
}

interface State {}

class GridSquare extends Component<Props, State> {
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
