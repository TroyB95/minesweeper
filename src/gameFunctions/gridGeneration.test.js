import { create2DArray } from "./gridGeneration";

describe("create2DArray", () => {
	it("should return an array with as many nested arrays as the row argument specifys", () => {
		expect(create2DArray(3)).toStrictEqual([[], [], []]);
		expect(create2DArray(8)).toStrictEqual([[], [], [], [], [], [], [], []]);
	});
});
