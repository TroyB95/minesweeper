import { Grid } from "../types";

/**
 * Creates a 2d array.
 * @param {number} rows - How many nested arrays.
 * @returns {Array}
 */
export function create2DArray(rows: number): never[][] {
  const arr = [];
  for (let i = 0; i < rows; i++) {
    arr[i] = [];
  }
  return arr;
}

/**
 * Generates number between 0 and max width of grid.
 * @param {Number} gridDimensions - Max width of grid.
 * @returns {Number}
 */
export function generateCoordinate(gridDimension: number): number {
  return Math.round(Math.random() * (gridDimension - 1));
}

/**
 * Checks coordinates are unique and have not already been created.
 * @param {Array} array1 - Store of the coordinates.
 * @param {Array} array2 - New generated arr of coordinates.
 * @returns {Boolean}
 */
export function compareCoords(
  bombCoordArr: Array<Array<number>>,
  array2: Array<number>
): boolean {
  if (!array2) return false;

  if (bombCoordArr.toString().includes(array2.toString())) {
    return true;
  }

  return false;
}

/**
 * Generates array of bomb coordinates X/Y.
 * @param {Number} width - How many squares wide.
 * @param {Number} Bombs - Number of bombs.
 * @returns {Array}
 */
export function generateBombs(width: number, bombs: number): number[][] {
  const bombsCoordArr: number[][] = [];

  while (bombsCoordArr.length < bombs) {
    const coordArr: number[] = [
      generateCoordinate(width),
      generateCoordinate(width),
    ];
    if (!compareCoords(bombsCoordArr, coordArr)) {
      bombsCoordArr.push(coordArr);
    }
  }
  return bombsCoordArr;
}

/**
 * Fills out the nested Arrays representing the grid with the value provided.
 * @param {Number} width - How many squares wide.
 * @param {Array} gridArr - The empty nested grids.
 * @param {Number | String | Boolean} value - The value to fill the arrays with.
 * @returns {Array}
 */
export function setBasicGrid(
  width: number,
  gridArr: Grid,
  value = 0 as number | string | boolean
): Grid {
  const filledGridArr = [...gridArr];
  for (let y = 0; y < width; y++) {
    for (let x = 0; x < width; x++) {
      filledGridArr[y][x] = value;
    }
  }
  return filledGridArr;
}

/**
 * Increment the squares around the bombs to show how many bombs are close.
 * @param {Number} width - How many squares wide.
 * @param {Array} gridArr - The nested grid array.
 * @returns {Array}
 */
export function incrementAroundBombs(width: number, gridArr: Grid): Grid {
  const fullGrid = [...gridArr];
  for (let y = 0; y < width; y++) {
    for (let x = 0; x < width; x++) {
      // If bomb increment all coords around it
      if (fullGrid[y][x] === true) {
        // north
        if (y + 1 !== width && fullGrid[y + 1][x] !== true) {
          // @ts-ignore
          fullGrid[y + 1][x] += 1;
        }
        // north east
        if (
          y + 1 !== width &&
          x + 1 !== width &&
          fullGrid[y + 1][x + 1] !== true
        ) {
          // @ts-ignore
          fullGrid[y + 1][x + 1] += 1;
        }
        // east
        if (x + 1 !== width && fullGrid[y][x + 1] !== true) {
          // @ts-ignore
          fullGrid[y][x + 1] += 1;
        }
        // south east
        if (
          y - 1 !== -1 &&
          x + 1 !== width &&
          fullGrid[y - 1][x + 1] !== true
        ) {
          // @ts-ignore
          fullGrid[y - 1][x + 1] += 1;
        }
        // south
        if (y - 1 !== -1 && fullGrid[y - 1][x] !== true) {
          // @ts-ignore
          fullGrid[y - 1][x] += 1;
        }
        // south west
        if (y - 1 !== -1 && x - 1 !== -1 && fullGrid[y - 1][x - 1] !== true) {
          // @ts-ignore
          fullGrid[y - 1][x - 1] += 1;
        }
        // west
        if (x - 1 !== -1 && fullGrid[y][x - 1] !== true) {
          // @ts-ignore
          fullGrid[y][x - 1] += 1;
        }
        // north west
        if (
          y + 1 !== width &&
          x - 1 !== -1 &&
          fullGrid[y + 1][x - 1] !== true
        ) {
          // @ts-ignore
          fullGrid[y + 1][x - 1] += 1;
        }
      }
    }
  }
  return fullGrid;
}

/**
 * Plots the bomb locations in the grid.
 * @param {Number} width - How many squares wide.
 * @param {Number} bombs - The number of bombs to include.
 * @returns {Array}
 */
export function generateGrid(width: number, bombs: number): Grid {
  const gridArr = setBasicGrid(width, create2DArray(width));
  const bombsCoordArr = generateBombs(width, bombs);

  (function plotBombs() {
    bombsCoordArr.forEach((locationArr) => {
      gridArr[locationArr[0]][locationArr[1]] = true;
    });
  })();

  return incrementAroundBombs(width, gridArr);
}
