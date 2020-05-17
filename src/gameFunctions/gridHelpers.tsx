import restOfTilesTurn from "../Assets/sounds/rest-of-tiles-turn.mp3";
import { playSound } from "./utils/sound";

/**
 * Check if value is a bomb.
 * @param {Boolean} value - The value of the square.
 * @param {Object} e - The click event.
 */
export function checkForBomb(value: boolean | number | string) {
  if (value === true) {
    return true;
  }
  return false;
}

/**
 * Mutate the array with updates from click events etc.
 * @param {Number} x - Value of x coordinate.
 * @param {Number} y - Value of y coordinate.
 * @param {Array} trackingArr - gridArr with filled info.
 * @param {String | Number | Boolean} value - The value to update the tracking array with.
 * @return {Array} Returns the new mutated array
 */
export function mutateTrackingArray(
  y: number,
  x: number,
  trackingArr: Array<Array<string | number | boolean>>,
  value: string | number | boolean
) {
  const tileTrackingArr: Array<Array<string | number | boolean>> = [
    ...trackingArr,
  ];
  tileTrackingArr[y][x] = value;

  return tileTrackingArr;
}

/**
 * Check if the player has won the game.
 * @param {Number} tilesTurntCount - Number of tiles been clicked on.
 * @param {Number} maxTilesTurnt - Count of maximum tiles minus bombs.
 * @param {Set} flaggedLocations - Set with coordinates of flagged tiles.
 * @param {Number} bombCount - Number of bombs in the current game.
 */
export function checkIfWon(
  tilesTurntCount: number,
  maxTilesTurnt: number,
  flaggedLocations: Set<string>,
  bombCount: number
) {
  if (tilesTurntCount === maxTilesTurnt) {
    if (flaggedLocations.size === bombCount) {
      return true;
    }
  }
  return false;
}

/**
 * Flips over all the empty tiles after a click.
 * @param {Number} x - x coordinate in array.
 * @param {Number} y - y coordinate in array.
 * @param {Array} trackingArr - Array which tracks all the tiles which have been flipped.
 * @param {Array} generatedGrid - The filed array for the game.
 * @param {Number} width - Width of game board.
 *
 */
export function flipBlankTiles(
  y: number,
  x: number,
  trackingArr: Array<any>,
  generatedGrid: Array<Array<any>>,
  width: number,
  sound?: boolean
) {
  const modifiedTrackingArr = [...trackingArr];
  let numberOfTilesTurnt = 0;

  const clickedSquare = generatedGrid[y][x];

  if (clickedSquare > 0) {
    modifiedTrackingArr[y][x] = true;
    numberOfTilesTurnt++;
  }

  if (clickedSquare === 0) {
    recurseGrid(y, x, sound);
  }

  function recurseGrid(y: number, x: number, sound?: boolean) {
    const currentSquare = generatedGrid[y][x];

    if (currentSquare === 0) {
      modifiedTrackingArr[y][x] = true;
      numberOfTilesTurnt += 1;
      playSound(restOfTilesTurn, sound ? 0.7 : 0);

      // check tile to north
      if (y + 1 !== width) {
        const newY = y + 1;
        if (modifiedTrackingArr[newY][x] !== true) {
          recurseGrid(newY, x);
        }
      }

      // check tile to north east
      if (y + 1 !== width && x + 1 !== width) {
        const newY = y + 1;
        const newX = x + 1;
        if (modifiedTrackingArr[newY][newX] !== true) {
          recurseGrid(newY, newX);
        }
      }

      // check tile to east
      if (x + 1 !== width) {
        const newX = x + 1;
        if (modifiedTrackingArr[y][newX] !== true) {
          recurseGrid(y, newX);
        }
      }

      // check tile to south east
      if (y - 1 >= 0 && x + 1 !== width) {
        const newY = y - 1;
        const newX = x + 1;
        if (modifiedTrackingArr[newY][newX] !== true) {
          recurseGrid(newY, newX);
        }
      }

      // check tile to south
      if (y - 1 >= 0) {
        const newY = y - 1;
        if (modifiedTrackingArr[newY][x] !== true) {
          recurseGrid(newY, x);
        }
      }

      // check tile to south west
      if (y - 1 >= 0 && x - 1 >= 0) {
        const newY = y - 1;
        const newX = x - 1;
        if (modifiedTrackingArr[newY][newX] !== true) {
          recurseGrid(newY, newX);
        }
      }

      // check tile to west
      if (x - 1 >= 0) {
        const newX = x - 1;
        if (modifiedTrackingArr[y][newX] !== true) {
          recurseGrid(y, newX);
        }
      }

      // check tile to north west
      if (y + 1 !== width && x - 1 >= 0) {
        const newY = y + 1;
        const newX = x - 1;
        if (modifiedTrackingArr[newY][newX] !== true) {
          recurseGrid(newY, newX);
        }
      }
    }
    if (currentSquare > 0) {
      modifiedTrackingArr[y][x] = true;
      numberOfTilesTurnt += 1;
      return;
    }
  }

  return { modifiedTrackingArr, numberOfTilesTurnt };
}
