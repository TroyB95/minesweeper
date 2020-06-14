import React, { Component } from "react";

import { TileImage, GridSection } from "./GridSquare.styled";
import BombSVG from "../../Assets/bomb.svg";
import FlagSVG from "../../Assets/skull.svg";

interface Props {
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onContextMenu: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  width: number;
  backgroundColour: string;
  hoverColour: string;
  pointer: string;
  renderType: string | number | boolean | undefined;
}

class GridSquare extends Component<Props, {}> {
  // shouldComponentUpdate(nextProps: Props) {
  //   if (this.props.renderType === nextProps.renderType) {
  //     return false;
  //   }
  //   return true;
  // }

  showImage(
    type: string | number | boolean | undefined
  ): JSX.Element | string | number | boolean | undefined {
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

  render(): JSX.Element {
    const {
      onClick,
      onContextMenu,
      width,
      backgroundColour,
      hoverColour,
      pointer,
      renderType,
    } = this.props;

    return (
      <GridSection
        backgroundColour={backgroundColour}
        hoverColour={hoverColour}
        pointer={pointer}
        width={width}
        onClick={onClick}
        onContextMenu={(e) => {
          onContextMenu(e);
        }}
      >
        {this.showImage(renderType)}
      </GridSection>
    );
  }
}

export default GridSquare;
