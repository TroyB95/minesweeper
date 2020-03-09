export function checkForBomb(value, e) {
  if (value === true) {
    e.target.innerHTML = "BOMB";
    alert("YOU HAVE HIT ABOMB");
  }
}

export function mutateTrackingArray(y, x, trackingArr, value) {
  let tileTrackingArr = [...trackingArr];
  tileTrackingArr[y][x] = value;
  return tileTrackingArr;
}

export function checkIfWon(tilesTurntCount, maxTilesTurnt, flaggedLocations, bombCount) {
  if (tilesTurntCount >= maxTilesTurnt) {
    if (flaggedLocations.size === bombCount) {
      alert("Congratulations, you have won the game!");
    }
  }
}
