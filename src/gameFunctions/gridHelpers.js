/**
 * Check if value is a bomb.
 * @param {Number | Boolean | String} value - The value of the square.
 * @param {Object} e - The click event.
 */
export function checkForBomb(value, e) {
  if (value === true) {
    e.target.innerHTML = "BOMB";
    alert("YOU HAVE HIT ABOMB");
  }
}

/**
 * Mutate the array with updates from click events etc.
 * @param {Number} x - Value of x coordinate.
 * @param {Number} y - Value of y coordinate.
 * @param {Array} trackingArr - gridArr with filled info.
 * @param {String | Number | Boolean} value - The value to update the tracking array with.
 * @return {Array} Returns the new mutated array
 */
export function mutateTrackingArray(y, x, trackingArr, value) {
  let tileTrackingArr = [...trackingArr];
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
export function checkIfWon(tilesTurntCount, maxTilesTurnt, flaggedLocations, bombCount) {
  if (tilesTurntCount >= maxTilesTurnt) {
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
export function flipBlankTiles(y, x, trackingArr, generatedGrid, width) {
  let modifiedTrackingArr = [...trackingArr];

  let clickedSquare = generatedGrid[y][x];

  if (clickedSquare === 0) {
    recurseGrid(y, x);
  }

  function recurseGrid(y, x) {
    let currentSquare = generatedGrid[y][x];

    if (currentSquare === 0) {
      modifiedTrackingArr[y][x] = true;

      // check tile to north
      if (y + 1 !== width) {
        let newY = y + 1;
        if (modifiedTrackingArr[newY][x] !== true) {
          recurseGrid(newY, x);
        }
      }

      // check tile to north east
      if (y + 1 !== width && x + 1 !== width) {
        let newY = y + 1;
        let newX = x + 1;
        if (modifiedTrackingArr[newY][newX] !== true) {
          recurseGrid(newY, newX);
        }
      }

      // check tile to east
      if (x + 1 !== width) {
        let newX = x + 1;
        if (modifiedTrackingArr[y][newX] !== true) {
          recurseGrid(y, newX);
        }
      }

      // check tile to south east
      if (y - 1 >= 0 && x + 1 !== width) {
        let newY = y - 1;
        let newX = x + 1;
        if (modifiedTrackingArr[newY][newX] !== true) {
          recurseGrid(newY, newX);
        }
      }

      // check tile to south
      if (y - 1 >= 0) {
        let newY = y - 1;
        if (modifiedTrackingArr[newY][x] !== true) {
          recurseGrid(newY, x);
        }
      }

      // check tile to south west
      if (y - 1 >= 0 && x - 1 >= 0) {
        let newY = y - 1;
        let newX = x - 1;
        if (modifiedTrackingArr[newY][newX] !== true) {
          recurseGrid(newY, newX);
        }
      }

      // check tile to west
      if (x + 1 < width) {
        let newX = x + 1;
        if (modifiedTrackingArr[y][newX] !== true) {
          recurseGrid(y, newX);
        }
      }

      // check tile to north west
      if (y + 1 !== width && x - 1 >= 0) {
        let newY = y + 1;
        let newX = x - 1;
        if (modifiedTrackingArr[newY][newX] !== true) {
          recurseGrid(newY, newX);
        }
      }
    }
    if (currentSquare > 0) {
      modifiedTrackingArr[y][x] = true;
      return;
    }
  }

  return modifiedTrackingArr;
}

// get click position in array,
// check all tiles around said position
// -Inside recursive function?
// -- check n, ne, e, se, s etc.. === 0 or > 0 but !== true(bomb)
// -- set position in tile tracking array to true
// -- recurse into function with new position
// if tile is 0 set to true if tile is > 0 && !== true(Bomb) set tileTrackingArr to true
// set new position to the new tile
// run check again
