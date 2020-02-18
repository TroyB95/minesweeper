export function checkForBomb(value, e) {
	if (value === true) {
		e.target.innerHTML = "BOMB";
		alert("YOU HAVE HIT ABOMB");
	}
}

export function mutateTrackingArray(y, x, trackingArr) {
	let tileTrackingArr = [...trackingArr];
	tileTrackingArr[y][x] = true;
	return tileTrackingArr;
}
