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

export function flipBlankTiles(y, x, trackingArr, generatedGrid) {}

// get click position in array,
// check all tiles around said position
// -Inside recursive function?
// -- check n, ne, e, se, s etc.. === 0 or > 0 but !== true(bomb)
// -- set position in tile tracking array to true
// -- recurse into function with new position
// if tile is 0 set to true if tile is > 0 && !== true(Bomb) set tileTrackingArr to true
// set new position to the new tile
// run check again
