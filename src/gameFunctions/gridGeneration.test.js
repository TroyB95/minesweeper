import { create2DArray, generateCoordinate, compareCoords } from "./gridGeneration";

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

describe("compareCoords", () => {
	it("should return false if array does not already contain coordinates", () => {
		expect(
			compareCoords(
				[
					[2, 1],
					[3, 4],
				],
				[[1, 2]]
			)
		).toBe(false);
	});
	it("should return true if array does already contain coordinates", () => {
		expect(
			compareCoords(
				[
					[1, 2],
					[3, 4],
				],
				[[1, 2]]
			)
		).toBe(true);
	});
});
