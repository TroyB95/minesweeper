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
