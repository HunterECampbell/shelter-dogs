import { act } from "@testing-library/react";
import { isValidEmail } from "../emailRegex";

describe("utils/regex/emailRegex", () => {
  it("Returns false if email is not valid", async () => {
    expect(await act(() => isValidEmail(""))).toBe(false);
    expect(await act(() => isValidEmail("a"))).toBe(false);
    expect(await act(() => isValidEmail("a.a"))).toBe(false);
    expect(await act(() => isValidEmail("a@a"))).toBe(false);
    expect(await act(() => isValidEmail("a.a@a"))).toBe(false);
  });

  it("Returns true if email is valid", async () => {
    expect(await act(() => isValidEmail("a@a.a"))).toBe(true);
  });
});
