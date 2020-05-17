import { checkForBomb } from "./gridHelpers";

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
