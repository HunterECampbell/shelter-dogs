import { create } from "zustand";
import { setupAxios } from "../setupAxios";
import handleResponse from "../utils/axios/responseHandler";
import { t } from "i18next";
import { Dog, DogLocation } from "../globalTypes";
import {
  GetDogMatchResult,
  PageOptions,
  SearchDogsQueryParams,
  SearchDogsResult,
  SearchDogsSortDirection,
  SearchDogsSortField,
} from "./types/apiTypes";

export interface DogStoreState {
  allBreeds: Dog["breed"][];
  dogLocations: DogLocation[];
  dogPagination: SearchDogsResult;
  dogs: Dog[];
  favoriteDogs: Dog[];
  filterQueryParams: SearchDogsQueryParams;
  matchedDog: Dog;
}

export interface DogStoreActions {
  addFavoriteDog: (dog: Dog) => void;
  checkIfDogIsFavorite: (dogID: Dog["id"]) => boolean;
  getSortText: ({
    sortOption,
    sortDirection,
  }: {
    sortOption: SearchDogsSortField;
    sortDirection: SearchDogsSortDirection;
  }) => Exclude<SearchDogsQueryParams["sort"], undefined>;
  removeFavoriteDog: (dogID: Dog["id"]) => void;
  resetFavoriteDogs: () => void;
  retrieveLocationForZipCode: (
    zipCode: Dog["zip_code"]
  ) => DogLocation | Dog["zip_code"];
  setAllBreeds: (allBreeds: Dog["breed"][]) => void;
  setDogLocations: (dogLocations: DogStoreState["dogLocations"]) => void;
  setDogPagination: (
    dogPaginationResult: DogStoreState["dogPagination"]
  ) => void;
  setDogs: (dogs: DogStoreState["dogs"]) => void;
  setFilterQueryParams: (queryParams: SearchDogsQueryParams) => void;
  setMatchedDog: (matchedDog: Dog) => void;
}

export interface DogStoreAPIs {
  api: {
    getAllBreeds: () => Promise<Dog["breed"][]>;
    getDogMatch: (favoriteDogIDs: Dog["id"][]) => Promise<GetDogMatchResult>;
    getDogsFromIDs: (
      dogIDs: DogStoreState["dogPagination"]["resultIds"]
    ) => Promise<DogStoreState["dogs"]>;
    getLocationsFromDogZipCodes: () => Promise<DogStoreState["dogLocations"]>;
    searchDogs: ({
      pageOption,
      queryParams,
    }: {
      pageOption?: PageOptions;
      queryParams?: SearchDogsQueryParams;
    }) => Promise<DogStoreState["dogPagination"]>;
  };
}

export const initialState: DogStoreState = {
  allBreeds: [],
  dogLocations: [],
  dogPagination: {
    resultIds: [],
    total: 0,
    next: "",
    prev: "",
  },
  dogs: [],
  favoriteDogs: [],
  filterQueryParams: {
    ageMin: 0,
    ageMax: 20,
    breeds: [],
    from: 0,
    size: 25,
    sort: `${SearchDogsSortField.Breed}:${SearchDogsSortDirection.Ascending}`,
    zipCodes: [],
  },
  matchedDog: {
    id: "",
    img: "",
    name: "",
    age: 0,
    zip_code: "",
    breed: "",
  },
};

export const useDogsStore = create<
  DogStoreState & DogStoreActions & DogStoreAPIs
>((set, get) => ({
  ...initialState,

  addFavoriteDog: (dog: Dog) =>
    set(() => ({ favoriteDogs: [...get().favoriteDogs, dog] })),
  checkIfDogIsFavorite: (dogID: Dog["id"]) =>
    get().favoriteDogs.some((dog) => dog.id === dogID),
  getSortText: ({
    sortOption,
    sortDirection,
  }: {
    sortOption: SearchDogsSortField;
    sortDirection: SearchDogsSortDirection;
  }): Exclude<SearchDogsQueryParams["sort"], undefined> =>
    `${sortOption}:${sortDirection}`,
  removeFavoriteDog: (dogID: Dog["id"]) =>
    set(() => ({
      favoriteDogs: get().favoriteDogs.filter(
        (favoriteDog) => favoriteDog.id !== dogID
      ),
    })),
  resetFavoriteDogs: () =>
    set(() => ({ favoriteDogs: initialState.favoriteDogs })),
  retrieveLocationForZipCode: (
    zipCode: Dog["zip_code"]
  ): DogLocation | Dog["zip_code"] => {
    const dogLocations = get().dogLocations;
    const dogLocation: DogLocation | undefined = dogLocations.find(
      (location) => location?.zip_code === zipCode
    );

    return dogLocation || zipCode;
  },
  setAllBreeds: (allBreeds: Dog["breed"][]) => set(() => ({ allBreeds })),
  setDogLocations: (dogLocations: DogStoreState["dogLocations"]) =>
    set(() => ({ dogLocations })),
  setDogPagination: (dogPaginationResult: DogStoreState["dogPagination"]) =>
    set(() => ({ dogPagination: dogPaginationResult })),
  setDogs: (dogs: Dog[]) => set(() => ({ dogs })),
  setFilterQueryParams: (queryParams: SearchDogsQueryParams) =>
    set(() => ({
      filterQueryParams: { ...get().filterQueryParams, ...queryParams },
    })),
  setMatchedDog: (matchedDog: Dog) => set(() => ({ matchedDog })),

  api: {
    getAllBreeds: async (): Promise<Dog["breed"][]> => {
      try {
        const res = await handleResponse(
          async () => await setupAxios().get("/dogs/breeds"),
          { showAlert: false }
        );

        return res.data;
      } catch (error) {
        console.error("Retrieving Dog Breeds Failed -", error);
        return initialState.allBreeds;
      }
    },
    getDogMatch: async (
      favoriteDogIDs: Dog["id"][]
    ): Promise<GetDogMatchResult> => {
      try {
        const res = await handleResponse(
          async () => await setupAxios().post("/dogs/match", favoriteDogIDs),
          {
            showAlert: true,
            errorMessage: t("dashboard.errors.get_dogs_failed"),
          }
        );

        return res.data;
      } catch (error) {
        console.error("Retrieving the Dog Match Failed -", error);
        return { match: favoriteDogIDs[0] };
      }
    },
    getDogsFromIDs: async (
      dogIDs: DogStoreState["dogPagination"]["resultIds"]
    ): Promise<DogStoreState["dogs"]> => {
      try {
        const res = await handleResponse(
          async () => await setupAxios().post("/dogs", dogIDs),
          {
            showAlert: true,
            errorMessage: t("dashboard.errors.get_dogs_failed"),
          }
        );

        return res.data;
      } catch (error) {
        console.error("Retrieving Dogs Failed -", error);
        return initialState.dogs;
      }
    },
    getLocationsFromDogZipCodes: async (): Promise<
      DogStoreState["dogLocations"]
    > => {
      try {
        const allZipCodes = get().dogs.map((dog) => dog.zip_code);
        if (allZipCodes.length === 0) {
          console.warn("No zip codes to retrieve locations for.");
          return initialState.dogLocations;
        }

        const res = await handleResponse(
          async () => await setupAxios().post("/locations", allZipCodes),
          { showAlert: false }
        );

        return res.data;
      } catch (error) {
        console.error("Retrieving Dog Locations Failed -", error);
        return initialState.dogLocations;
      }
    },
    searchDogs: async ({
      pageOption,
      queryParams,
    }: {
      pageOption?: PageOptions;
      queryParams?: SearchDogsQueryParams;
    }): Promise<DogStoreState["dogPagination"]> => {
      try {
        const changePageByOption = (
          pageOpt?: PageOptions
        ): string | undefined => {
          if (!pageOpt) return undefined;
          if (pageOpt === PageOptions.Next) return get().dogPagination.next;
          if (pageOpt === PageOptions.Previous) return get().dogPagination.prev;
        };
        const apiURL = changePageByOption(pageOption) || "/dogs/search";

        const res = await handleResponse(
          async () =>
            await setupAxios().get(apiURL, {
              params: { ...queryParams },
            }),
          {
            showAlert: true,
            errorMessage: t("dashboard.errors.search_dogs_failed"),
          }
        );

        return res.data;
      } catch (error) {
        console.error("Retrieving Dogs Failed -", error);
        return initialState.dogPagination;
      }
    },
  },
}));
