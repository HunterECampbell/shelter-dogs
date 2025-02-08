import { act, renderHook } from "@testing-library/react";
import { useBearStore } from "../bears";
import { setupAxios } from "../../setupAxios";

const mockAxiosInstance = {
  get: vi.fn(),
};
vi.mock("../../setupAxios", () => {
  return {
    setupAxios: vi.fn(() => mockAxiosInstance),
  };
});

describe("useBearStore", () => {
  // STATE TEST
  it("Returns the initial state", () => {
    const { result } = renderHook(() => useBearStore());

    expect(result.current.bears).toBe(0);
    expect(result.current.planets).toEqual({});
  });

  // ACTION TEST
  it("#increasePopulation increases the bear population", () => {
    const { result } = renderHook(() => useBearStore());

    act(() => result.current.increasePopulation());

    expect(result.current.bears).toBe(1);
  });

  // API TEST
  it("#getPlanets calls the correct GET endpoint", async () => {
    const expectedResult = { test: "Hi there" };
    vi.mocked(setupAxios().get).mockResolvedValue({ data: expectedResult });
    const { result } = renderHook(() => useBearStore());

    await act(async () => await result.current.getPlanets());

    expect(setupAxios().get).toHaveBeenCalledTimes(1);
    expect(setupAxios().get).toHaveBeenCalledWith(
      "https://swapi.dev/api/planets/1/"
    );
  });
});
