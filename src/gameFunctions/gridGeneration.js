

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

function generateBombs(width, height, bombs) {
    let bombArr = create2DArray(bombs);
    

}

function generateGrid(width, height, bombs) {
    let gridArr = create2DArray(height);

    for(let y = 0; y < height; y++) {
        for(let x = 0; x < width; x++) {
            gridArr[y][x] = false;
        }
    }

    return gridArr;
}

generateGrid(5, 5, 3);