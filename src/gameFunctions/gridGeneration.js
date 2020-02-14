function create2DArray(rows) {
	let arr = [];
	for (let i = 0; i < rows; i++) {
		arr[i] = [];
	}
	return arr;
}

function generateCoordinate(gridDimension) {
	return Math.round(Math.random() * (gridDimension - 1));
}

function compareCoords(array1, array2) {
	if (!array2) return false;

	if (array1.toString().includes(array2.toString())) {
		return true;
	}

	return false;
}

function generateBombs(width, height, bombs) {
	let bombsCoordArr = [];

	while (bombsCoordArr.length < bombs) {
		let coordArr = [generateCoordinate(height), generateCoordinate(width)];
		if (!compareCoords(bombsCoordArr, coordArr)) {
			bombsCoordArr.push(coordArr);
		}
	}
	return bombsCoordArr;
}

function generateGrid(width, height, bombs) {
	let gridArr = create2DArray(height);
	const bombsCoords = generateBombs(width, height, bombs);

	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			gridArr[y][x] = false;
		}
	}
	(function plotBombs() {
		bombsCoords.forEach(bombLocation => {
			gridArr[bombLocation[0]][bombLocation[1]] = true;
		});
	})();
	return gridArr;
}

console.log(generateGrid(5, 5, 3));
