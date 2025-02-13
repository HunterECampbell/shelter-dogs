import { act, renderHook } from "@testing-library/react";
import { setupAxios } from "../../setupAxios";
import { initialState, useDogsStore } from "../dogs";
import {
  mockBreeds,
  mockDogPagination,
  mockDogs,
  mockFavoriteDogs,
  mockLocations,
} from "./mocks/dogsMocks";
import {
  GetDogMatchResult,
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
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    vi.restoreAllMocks();
  });

  describe("#state", () => {
    it("Returns the initial state", () => {
      const { result } = renderHook(() => useDogsStore());

      expect(result.current.allBreeds).toEqual(initialState.allBreeds);
      expect(result.current.dogLocations).toEqual(initialState.dogLocations);
      expect(result.current.dogPagination).toEqual(initialState.dogPagination);
      expect(result.current.dogs).toEqual(initialState.dogs);
      expect(result.current.favoriteDogs).toEqual(initialState.favoriteDogs);
      expect(result.current.filterQueryParams).toEqual(
        initialState.filterQueryParams
      );
      expect(result.current.matchedDog).toEqual(initialState.matchedDog);
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

    it("#getSortText returns the correct sort text", async () => {
      const sortOption: SearchDogsSortField = SearchDogsSortField.Age;
      const sortDirection: SearchDogsSortDirection =
        SearchDogsSortDirection.Descending;
      const { result } = renderHook(() => useDogsStore());

      const res = await act(() =>
        result.current.getSortText({ sortOption, sortDirection })
      );

      expect(res).toBe(`${sortOption}:${sortDirection}`);
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

    it("#setAllBreeds sets #state.allBreeds", () => {
      const { result } = renderHook(() => useDogsStore());

      act(() => result.current.setAllBreeds(mockBreeds));

      expect(result.current.allBreeds).toEqual(mockBreeds);
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

    describe("#setFilterQueryParams", () => {
      it("Overrides a previous value in #state.filterQueryParams", () => {
        const { result } = renderHook(() => useDogsStore());

        act(() => result.current.setFilterQueryParams({ size: 100 }));

        expect(result.current.filterQueryParams).toEqual({
          ...initialState.filterQueryParams,
          size: 100,
        });
      });

      it("Keeps previous values that aren't being overridden", () => {
        const { result } = renderHook(() => useDogsStore());

        act(() => result.current.setFilterQueryParams({ breeds: mockBreeds }));

        expect(result.current.filterQueryParams).toEqual({
          ...initialState.filterQueryParams,
          breeds: mockBreeds,
        });
      });

      it("Can pass in multiple values to override", () => {
        const { result } = renderHook(() => useDogsStore());

        act(() =>
          result.current.setFilterQueryParams({
            breeds: mockBreeds,
            ageMin: 20,
          })
        );

        expect(result.current.filterQueryParams).toEqual({
          ...initialState.filterQueryParams,
          breeds: mockBreeds,
          ageMin: 20,
        });
      });
    });

    it("#setMatchedDog sets #state.matchedDog", () => {
      const { result } = renderHook(() => useDogsStore());

      act(() => result.current.setMatchedDog(mockDogs[0]));

      expect(result.current.matchedDog).toEqual(mockDogs[0]);
    });
  });

  describe("#api", () => {
    describe("#getAllBreeds", () => {
      it("Calls the correct GET endpoint", async () => {
        vi.mocked(setupAxios().get).mockResolvedValue({ data: mockBreeds });
        const { result } = renderHook(() => useDogsStore());

        await act(async () => await result.current.api.getAllBreeds());

        expect(setupAxios().get).toHaveBeenCalledWith("/dogs/breeds");
      });

      it("Returns all dog breeds on success", async () => {
        vi.mocked(setupAxios().get).mockResolvedValue({ data: mockBreeds });
        const { result } = renderHook(() => useDogsStore());

        const res = await act(
          async () => await result.current.api.getAllBreeds()
        );

        expect(res).toBe(mockBreeds);
      });

      it("Returns #initialState.allBreeds on failure", async () => {
        vi.mocked(setupAxios().get).mockRejectedValue({ status: 400 });
        const { result } = renderHook(() => useDogsStore());

        const res = await act(
          async () => await result.current.api.getAllBreeds()
        );

        expect(res).toBe(initialState.allBreeds);
      });
    });

    describe("#getDogMatch", () => {
      const mockResult: GetDogMatchResult = {
        match: mockFavoriteDogs[3],
      };

      it("Calls the correct POST endpoint", async () => {
        vi.mocked(setupAxios().post).mockResolvedValue({ data: mockResult });
        const { result } = renderHook(() => useDogsStore());

        await act(
          async () => await result.current.api.getDogMatch(mockFavoriteDogs)
        );

        expect(setupAxios().post).toHaveBeenCalledWith(
          "/dogs/match",
          mockFavoriteDogs
        );
      });

      it("Returns a dog match on success", async () => {
        vi.mocked(setupAxios().post).mockResolvedValue({ data: mockResult });
        const { result } = renderHook(() => useDogsStore());

        const res = await act(
          async () => await result.current.api.getDogMatch(mockFavoriteDogs)
        );

        expect(res).toEqual(mockResult);
      });

      it("Returns the first favorite dog ID on failure", async () => {
        vi.mocked(setupAxios().post).mockRejectedValue({ status: 400 });
        const { result } = renderHook(() => useDogsStore());

        const res = await act(
          async () => await result.current.api.getDogMatch(mockFavoriteDogs)
        );

        expect(res).toEqual({ match: mockFavoriteDogs[0] });
      });
    });

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
      const mockQueryParams: SearchDogsQueryParams = {
        breeds: ["Test breed", "Test breed 2"],
        zipCodes: ["00000"],
        ageMin: 0,
        ageMax: 15,
        size: 50,
        from: 0,
        sort: `${SearchDogsSortField.Age}:${SearchDogsSortDirection.Descending}`,
      };

      it("Calls the correct GET endpoint", async () => {
        vi.mocked(setupAxios().get).mockResolvedValue({
          data: mockDogPagination,
        });
        const { result } = renderHook(() => useDogsStore());

        await act(async () => await result.current.api.searchDogs({}));

        expect(setupAxios().get).toHaveBeenCalledWith("/dogs/search", {
          params: {},
        });
      });

      describe("Uses queryParams if any are given", () => {
        it("Uses a single value in the search result", async () => {
          vi.mocked(setupAxios().get).mockResolvedValue({
            data: mockDogPagination,
          });
          const { result } = renderHook(() => useDogsStore());

          await act(
            async () =>
              await result.current.api.searchDogs({
                breeds: mockQueryParams.breeds,
              })
          );

          expect(setupAxios().get).toHaveBeenCalledWith("/dogs/search", {
            params: {
              breeds: mockQueryParams.breeds,
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
                breeds: mockQueryParams.breeds,
                ageMax: mockQueryParams.ageMax,
              })
          );

          expect(setupAxios().get).toHaveBeenCalledWith("/dogs/search", {
            params: {
              breeds: mockQueryParams.breeds,
              ageMax: mockQueryParams.ageMax,
            },
          });
        });

        it("Uses all values in the search result", async () => {
          vi.mocked(setupAxios().get).mockResolvedValue({
            data: mockDogPagination,
          });
          const { result } = renderHook(() => useDogsStore());

          await act(
            async () => await result.current.api.searchDogs(mockQueryParams)
          );

          expect(setupAxios().get).toHaveBeenCalledWith("/dogs/search", {
            params: { ...mockQueryParams },
          });
        });
      });
    });
  });
});
