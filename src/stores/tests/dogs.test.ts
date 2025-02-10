import { act, renderHook } from "@testing-library/react";
import { setupAxios } from "../../setupAxios";
import { initialState, useDogsStore } from "../dogs";
import { mockDogPagination, mockDogs } from "./mocks/dogsMocks";
import {
  SearchDogsQueryParams,
  SearchDogsSortDirection,
  SearchDogsSortField,
} from "../types/apiTypes";

const mockAxiosInstance = {
  get: vi.fn(),
  post: vi.fn(),
};
vi.mock("../../setupAxios", () => {
  return {
    setupAxios: vi.fn(() => mockAxiosInstance),
  };
});

describe("useDogsStore", () => {
  describe("#state", () => {
    it("Returns the initial state", () => {
      const { result } = renderHook(() => useDogsStore());

      expect(result.current.dogPagination).toBe(initialState.dogPagination);
      expect(result.current.dogs).toBe(initialState.dogs);
    });
  });

  describe("#actions", () => {
    it("#setDogPagination sets #state.dogIDs", () => {
      const { result } = renderHook(() => useDogsStore());

      act(() => result.current.setDogPagination(mockDogPagination));

      expect(result.current.dogPagination).toEqual(mockDogPagination);
    });

    it("#setDogs sets #state.dogs", () => {
      const { result } = renderHook(() => useDogsStore());

      act(() => result.current.setDogs(mockDogs));

      expect(result.current.dogs).toEqual(mockDogs);
    });
  });

  describe("#api", () => {
    describe("#getDogsFromIDs", () => {
      it("Calls the correct POST endpoint", async () => {
        vi.mocked(setupAxios().post).mockResolvedValue({ status: 200 });
        const { result } = renderHook(() => useDogsStore());

        await act(
          async () =>
            await result.current.api.getDogsFromIDs(mockDogPagination.resultIds)
        );

        expect(setupAxios().post).toHaveBeenCalledWith(
          "/dogs",
          mockDogPagination.resultIds
        );
      });

      it("Updates #state.dogs on success", async () => {
        vi.mocked(setupAxios().post).mockResolvedValue({ data: mockDogs });
        const { result } = renderHook(() => useDogsStore());

        await act(
          async () =>
            await result.current.api.getDogsFromIDs(mockDogPagination.resultIds)
        );

        expect(result.current.dogs).toBe(mockDogs);
      });

      it("Resets #state.dogs on failure", async () => {
        vi.mocked(setupAxios().post).mockRejectedValue({ status: 400 });
        const { result } = renderHook(() => useDogsStore());
        result.current.dogs = mockDogs;

        await act(
          async () =>
            await result.current.api.getDogsFromIDs(mockDogPagination.resultIds)
        );

        expect(result.current.dogs).toBe(initialState.dogs);
      });
    });

    describe("#searchDogs", () => {
      it("Calls the correct GET endpoint", async () => {
        vi.mocked(setupAxios().get).mockResolvedValue({ status: 200 });
        const { result } = renderHook(() => useDogsStore());

        await act(async () => await result.current.api.searchDogs());

        expect(setupAxios().get).toHaveBeenCalledWith("/dogs/search", {
          params: {},
        });
      });

      describe("Uses the payload if any is given", () => {
        const mockPayload: SearchDogsQueryParams = {
          breeds: ["Test breed", "Test breed 2"],
          zipCodes: ["00000"],
          ageMin: 0,
          ageMax: 15,
          size: 50,
          from: 0,
          sort: `${SearchDogsSortField.Age}:${SearchDogsSortDirection.Descending}`,
        };

        it("Uses a single value in the search result", async () => {
          vi.mocked(setupAxios().get).mockResolvedValue({ status: 200 });
          const { result } = renderHook(() => useDogsStore());

          await act(
            async () =>
              await result.current.api.searchDogs({
                breeds: mockPayload.breeds,
              })
          );

          expect(setupAxios().get).toHaveBeenCalledWith("/dogs/search", {
            params: {
              breeds: mockPayload.breeds,
            },
          });
        });

        it("Uses multiple values in the search result", async () => {
          vi.mocked(setupAxios().get).mockResolvedValue({ status: 200 });
          const { result } = renderHook(() => useDogsStore());

          await act(
            async () =>
              await result.current.api.searchDogs({
                breeds: mockPayload.breeds,
                ageMax: mockPayload.ageMax,
              })
          );

          expect(setupAxios().get).toHaveBeenCalledWith("/dogs/search", {
            params: {
              breeds: mockPayload.breeds,
              ageMax: mockPayload.ageMax,
            },
          });
        });

        it("Uses all values in the search result", async () => {
          vi.mocked(setupAxios().get).mockResolvedValue({ status: 200 });
          const { result } = renderHook(() => useDogsStore());

          await act(
            async () => await result.current.api.searchDogs({ ...mockPayload })
          );

          expect(setupAxios().get).toHaveBeenCalledWith("/dogs/search", {
            params: { ...mockPayload },
          });
        });
      });

      it("Updates #state.dogs on success", async () => {
        vi.mocked(setupAxios().get).mockResolvedValue({
          data: mockDogPagination,
        });
        const { result } = renderHook(() => useDogsStore());

        await act(async () => await result.current.api.searchDogs());

        expect(result.current.dogPagination).toBe(mockDogPagination);
      });

      it("Resets #state.dogs on failure", async () => {
        vi.mocked(setupAxios().get).mockRejectedValue({ status: 400 });
        const { result } = renderHook(() => useDogsStore());
        result.current.dogPagination = mockDogPagination;

        await act(async () => await result.current.api.searchDogs());

        expect(result.current.dogPagination).toBe(initialState.dogPagination);
      });
    });
  });
});
