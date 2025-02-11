import { act, renderHook } from "@testing-library/react";
import { setupAxios } from "../../setupAxios";
import { initialState, useDogsStore } from "../dogs";
import { mockDogPagination, mockDogs, mockLocations } from "./mocks/dogsMocks";
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

      expect(result.current.dogLocations).toBe(initialState.dogLocations);
      expect(result.current.dogPagination).toBe(initialState.dogPagination);
      expect(result.current.dogs).toBe(initialState.dogs);
      expect(result.current.favoriteDogs).toBe(initialState.favoriteDogs);
    });
  });

  describe("#actions", () => {
    it("#addFavoriteDog adds a dog to #state.favoriteDogs", () => {
      const { result } = renderHook(() => useDogsStore());

      act(() => result.current.addFavoriteDog(mockDogs[0]));

      expect(result.current.favoriteDogs).toEqual([mockDogs[0]]);
    });

    describe("#checkIfDogIsFavorite", () => {
      it("Returns true if the dog is a favorite", async () => {
        const { result } = renderHook(() => useDogsStore());
        result.current.favoriteDogs = mockDogs;

        const res = await act(() =>
          result.current.checkIfDogIsFavorite(mockDogs[0].id)
        );

        expect(res).toBe(true);
      });

      it("Returns false if the dog is not a favorite", async () => {
        const { result } = renderHook(() => useDogsStore());
        result.current.favoriteDogs = mockDogs;

        const res = await act(() =>
          result.current.checkIfDogIsFavorite("fake id")
        );

        expect(res).toBe(false);
      });
    });

    it("#removeFavoriteDog removes the matching dog from #state.favoriteDogs", () => {
      const { result } = renderHook(() => useDogsStore());
      result.current.favoriteDogs = mockDogs;

      act(() => result.current.removeFavoriteDog(mockDogs[0].id));

      expect(result.current.favoriteDogs).toEqual([mockDogs[1]]);
    });

    it("#resetFavoriteDogs resets #state.favoriteDogs back to #initialState.favoriteDogs", () => {
      const { result } = renderHook(() => useDogsStore());
      result.current.favoriteDogs = mockDogs;

      act(() => result.current.resetFavoriteDogs());

      expect(result.current.favoriteDogs).toEqual(initialState.favoriteDogs);
    });

    describe("#retrieveLocationForZipCode", () => {
      it("Returns the location for a given zip code", async () => {
        const { result } = renderHook(() => useDogsStore());
        result.current.dogLocations = mockLocations;

        const res = await act(() =>
          result.current.retrieveLocationForZipCode(mockLocations[0].zip_code)
        );

        expect(res).toEqual(mockLocations[0]);
      });

      it("Returns the zip code if no location is found", async () => {
        const mockFakeZipCode = "fake zip code";
        const { result } = renderHook(() => useDogsStore());
        result.current.dogLocations = mockLocations;

        const res = await act(() =>
          result.current.retrieveLocationForZipCode(mockFakeZipCode)
        );

        expect(res).toEqual(mockFakeZipCode);
      });
    });

    it("#setDogLocations sets #state.dogLocations", () => {
      const { result } = renderHook(() => useDogsStore());

      act(() => result.current.setDogLocations(mockLocations));

      expect(result.current.dogLocations).toEqual(mockLocations);
    });

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
        vi.mocked(setupAxios().post).mockResolvedValue({ data: mockDogs });
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

      it("Returns dogs on success", async () => {
        vi.mocked(setupAxios().post).mockResolvedValue({ data: mockDogs });
        const { result } = renderHook(() => useDogsStore());

        const res = await act(
          async () =>
            await result.current.api.getDogsFromIDs(mockDogPagination.resultIds)
        );

        expect(res).toBe(mockDogs);
      });

      it("Returns #initialState.dogs on failure", async () => {
        vi.mocked(setupAxios().post).mockRejectedValue({ status: 400 });
        const { result } = renderHook(() => useDogsStore());
        result.current.dogs = mockDogs;

        const res = await act(
          async () =>
            await result.current.api.getDogsFromIDs(mockDogPagination.resultIds)
        );

        expect(res).toBe(initialState.dogs);
      });
    });

    describe("#getLocationsFromDogZipCodes", () => {
      it("Calls the correct POST endpoint", async () => {
        vi.mocked(setupAxios().post).mockResolvedValue({ data: mockLocations });
        const { result } = renderHook(() => useDogsStore());
        result.current.dogs = mockDogs;
        const dogZipCodes = result.current.dogs.map((dog) => dog.zip_code);

        await act(
          async () => await result.current.api.getLocationsFromDogZipCodes()
        );

        expect(setupAxios().post).toHaveBeenCalledWith(
          "/locations",
          dogZipCodes
        );
      });

      it("Returns dog locations on success", async () => {
        vi.mocked(setupAxios().post).mockResolvedValue({ data: mockLocations });
        const { result } = renderHook(() => useDogsStore());
        result.current.dogs = mockDogs;

        const res = await act(
          async () => await result.current.api.getLocationsFromDogZipCodes()
        );

        expect(res).toBe(mockLocations);
      });

      it("Returns #initialState.dogLocations if #state.dogs is empty", async () => {
        vi.mocked(setupAxios().post).mockRejectedValue({ data: [] });
        const { result } = renderHook(() => useDogsStore());
        result.current.dogs = [];

        const res = await act(
          async () => await result.current.api.getLocationsFromDogZipCodes()
        );

        expect(res).toBe(initialState.dogLocations);
      });

      it("Returns #initialState.dogLocations on failure", async () => {
        vi.mocked(setupAxios().post).mockRejectedValue({ status: 400 });
        const { result } = renderHook(() => useDogsStore());

        const res = await act(
          async () => await result.current.api.getLocationsFromDogZipCodes()
        );

        expect(res).toBe(initialState.dogLocations);
      });
    });

    describe("#searchDogs", () => {
      it("Calls the correct GET endpoint", async () => {
        vi.mocked(setupAxios().get).mockResolvedValue({
          data: mockDogPagination,
        });
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
          vi.mocked(setupAxios().get).mockResolvedValue({
            data: mockDogPagination,
          });
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
          vi.mocked(setupAxios().get).mockResolvedValue({
            data: mockDogPagination,
          });
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
          vi.mocked(setupAxios().get).mockResolvedValue({
            data: mockDogPagination,
          });
          const { result } = renderHook(() => useDogsStore());

          await act(
            async () => await result.current.api.searchDogs({ ...mockPayload })
          );

          expect(setupAxios().get).toHaveBeenCalledWith("/dogs/search", {
            params: { ...mockPayload },
          });
        });
      });

      it("Returns dog pagination on success", async () => {
        vi.mocked(setupAxios().get).mockResolvedValue({
          data: mockDogPagination,
        });
        const { result } = renderHook(() => useDogsStore());

        const res = await act(
          async () => await result.current.api.searchDogs()
        );

        expect(res).toBe(mockDogPagination);
      });

      it("Returns #initialState.dogPagination on failure", async () => {
        vi.mocked(setupAxios().get).mockRejectedValue({ status: 400 });
        const { result } = renderHook(() => useDogsStore());
        result.current.dogPagination = mockDogPagination;

        const res = await act(
          async () => await result.current.api.searchDogs()
        );

        expect(res).toBe(initialState.dogPagination);
      });
    });
  });
});
