import { act } from "@testing-library/react";
import { chooseRandomFloatBetween, chooseRandomIntegerBetween } from "../RNG";

describe("utils/RNG", () => {
  describe("#chooseRandomFloatBetween", () => {
    it("Generates a random float between the given range", async () => {
      const min: number = 1;
      const max: number = 10;

      for (let testCount = 0; testCount < 1000; testCount++) {
        const res = await act(() => chooseRandomFloatBetween({ min, max }));

        const isFloat: boolean = Math.floor(res) !== res;
        const isBetweenRange: boolean = res >= min && res <= max;

        expect(isFloat).toBe(true);
        expect(isBetweenRange).toBe(true);
      }
    });
  });

  describe("#chooseRandomIntegerBetween", () => {
    it("Generates a random integer between the given range", async () => {
      const min: number = 1;
      const max: number = 10;

      for (let testCount = 0; testCount < 1000; testCount++) {
        const res = await act(() => chooseRandomIntegerBetween({ min, max }));

        const isInteger: boolean = Math.floor(res) === res;
        const isBetweenRange: boolean = res >= min && res <= max;

        expect(isInteger).toBe(true);
        expect(isBetweenRange).toBe(true);
      }
    });
  });
});
