import { checkForBomb, mutateTrackingArray } from "./gridHelpers";

describe("checkForBomb", () => {
  it("should return true is value is true", () => {
    expect(checkForBomb(true)).toBe(true);
  });

  it("should return false if the value is anything else but true", () => {
    expect(checkForBomb(1)).toBe(false);
    expect(checkForBomb(false)).toBe(false);
    expect(checkForBomb("testString")).toBe(false);
  });
});

describe("mutateTrackingArray", () => {
  it("should mutate the array and add the value to the correct x, y cordinate", () => {
    const trackingArr = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    expect(mutateTrackingArray(0, 2, trackingArr, true)).toEqual([
      [0, 0, true],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });
});
