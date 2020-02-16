export function create2DArray(rows) {
	let arr = [];
	for (let i = 0; i < rows; i++) {
		arr[i] = [];
	}
	return arr;
}

export function generateCoordinate(gridDimension) {
	return Math.round(Math.random() * (gridDimension - 1));
}

export function compareCoords(array1, array2) {
	if (!array2) return false;

	if (array1.toString().includes(array2.toString())) {
		return true;
	}

	return false;
}

export function generateBombs(width, height, bombs) {
	let bombsCoordArr = [];

	while (bombsCoordArr.length < bombs) {
		let coordArr = [generateCoordinate(height), generateCoordinate(width)];
		if (!compareCoords(bombsCoordArr, coordArr)) {
			bombsCoordArr.push(coordArr);
		}
	}
	return bombsCoordArr;
}

export function generateGrid(width, height, bombs) {
	let gridArr = create2DArray(height);
	const bombsCoordArr = generateBombs(width, height, bombs);

	(function setBasicGrid() {
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				gridArr[y][x] = 0;
			}
		}
	})();

	(function plotBombs() {
		bombsCoordArr.forEach(locationArr => {
			gridArr[locationArr[0]][locationArr[1]] = true;
		});
	})();

	return incrementAroundBombs(width, height, gridArr);
}

export function incrementAroundBombs(width, height, gridArr) {
	let fullGrid = [...gridArr];
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			// If bomb increment all coords around it
			if (fullGrid[y][x] === true) {
				// north
				if (y + 1 !== height && fullGrid[y + 1][x] !== true) {
					fullGrid[y + 1][x] += 1;
				}
				// north east
				if (y + 1 !== height && x + 1 !== width && fullGrid[y + 1][x + 1] !== true) {
					fullGrid[y + 1][x + 1] += 1;
				}
				// east
				if (x + 1 !== width && fullGrid[y][x + 1] !== true) {
					fullGrid[y][x + 1] += 1;
				}
				// south east
				if (y - 1 !== -1 && x + 1 !== width && fullGrid[y - 1][x + 1] !== true) {
					fullGrid[y - 1][x + 1] += 1;
				}
				// south
				if (y - 1 !== -1 && fullGrid[y - 1][x] !== true) {
					fullGrid[y - 1][x] += 1;
				}
				// south west
				if (y - 1 !== -1 && x - 1 !== -1 && fullGrid[y - 1][x - 1] !== true) {
					fullGrid[y - 1][x - 1] += 1;
				}
				// west
				if (x - 1 !== -1 && fullGrid[y][x - 1] !== true) {
					fullGrid[y][x - 1] += 1;
				}
				// north west
				if (y + 1 !== height && x - 1 !== -1 && fullGrid[y + 1][x - 1] !== true) {
					fullGrid[y + 1][x - 1] += 1;
				}
			}
		}
	}
	return fullGrid;
}
