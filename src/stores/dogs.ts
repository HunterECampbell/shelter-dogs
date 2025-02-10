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
    ) => Promise<DogStoreState["dogs"]>;
    searchDogs: (
      queryParams?: SearchDogsQueryParams
    ) => Promise<DogStoreState["dogPagination"]>;
  };
}

export const initialState: DogStoreState = {
  dogPagination: {
    resultIds: [],
    total: 0,
    next: "",
    prev: "",
  },
  dogs: [],
};

export const useDogsStore = create<
  DogStoreState & DogStoreActions & DogStoreAPIs
>((set) => ({
  ...initialState,
  setDogPagination: (dogPaginationResult: DogStoreState["dogPagination"]) => {
    console.log("actions pagination", dogPaginationResult);
    return set(() => ({ dogPagination: dogPaginationResult }));
  },
  setDogs: (dogs: Dog[]) => set(() => ({ dogs })),
  api: {
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
    searchDogs: async (
      queryParams?: SearchDogsQueryParams
    ): Promise<DogStoreState["dogPagination"]> => {
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

        return res.data;
      } catch (error) {
        console.error("Retrieving Dogs Failed -", error);
        return initialState.dogPagination;
      }
    },
  },
}));
