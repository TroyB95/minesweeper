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
      alert("Congratulations, you have won the game!");
    }
  }
}
