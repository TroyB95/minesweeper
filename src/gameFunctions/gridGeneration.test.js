import { create2DArray, generateCoordinate } from "./gridGeneration";

describe("create2DArray", () => {
	it("should return an array with as many nested arrays as the row argument specifys", () => {
		expect(create2DArray(3)).toStrictEqual([[], [], []]);
		expect(create2DArray(8)).toStrictEqual([[], [], [], [], [], [], [], []]);
	});
});

describe("generateCoordinate", () => {
	it("should generate 2 coordinates, between 0 and (gridDimensions - 1)", () => {
		let coordinate = generateCoordinate(5);
		expect(coordinate).toBeGreaterThanOrEqual(0);
		expect(coordinate).toBeLessThan(5);
	});
});
