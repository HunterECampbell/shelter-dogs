import { create } from "zustand";
import { setupAxios } from "../setupAxios";
import handleResponse from "../utils/axios/responseHandler";
import { t } from "i18next";
import { Dog } from "../globalTypes";
import { SearchDogsQueryParams, SearchDogsResult } from "./types/apiTypes";

export interface DogStoreState {
  dogPagination: SearchDogsResult;
  dogs: Dog[];
}

export interface DogStoreActions {
  setDogPagination: (
    dogPaginationResult: DogStoreState["dogPagination"]
  ) => void;
  setDogs: (dogs: DogStoreState["dogs"]) => void;
}

export interface DogStoreAPIs {
  api: {
    getDogsFromIDs: (
      dogIDs: DogStoreState["dogPagination"]["resultIds"]
    ) => void;
    searchDogs: (queryParams?: SearchDogsQueryParams) => void;
  };
}

export const initialState: DogStoreState = {
  dogPagination: {
    resultIds: [],
    total: 0,
    next: 0,
    prev: 0,
  },
  dogs: [],
};

export const useDogsStore = create<
  DogStoreState & DogStoreActions & DogStoreAPIs
>((set) => ({
  ...initialState,
  setDogPagination: (dogPaginationResult: DogStoreState["dogPagination"]) =>
    set(() => ({ dogPagination: dogPaginationResult })),
  setDogs: (dogs: Dog[]) => set(() => ({ dogs })),
  api: {
    getDogsFromIDs: async (
      dogIDs: DogStoreState["dogPagination"]["resultIds"]
    ) => {
      try {
        const res = await handleResponse(
          async () => await setupAxios().post("/dogs", dogIDs),
          {
            showAlert: true,
            errorMessage: t("dashboard.errors.get_dogs_failed"),
          }
        );

        set(() => ({ dogs: res.data as DogStoreState["dogs"] }));
      } catch (error) {
        console.error("Retrieving Dogs Failed -", error);
        set(() => ({ dogs: initialState.dogs }));
      }
    },
    searchDogs: async (queryParams?: SearchDogsQueryParams) => {
      try {
        const res = await handleResponse(
          async () =>
            await setupAxios().get("/dogs/search", {
              params: { ...queryParams },
            }),
          {
            showAlert: true,
            errorMessage: t("dashboard.errors.search_dogs_failed"),
          }
        );

        set(() => ({
          dogPagination: res.data as DogStoreState["dogPagination"],
        }));
      } catch (error) {
        console.error("Retrieving Dogs Failed -", error);
        set(() => ({ dogPagination: initialState.dogPagination }));
      }
    },
  },
}));
