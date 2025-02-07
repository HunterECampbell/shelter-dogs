import { create } from "zustand";
import { setupAxios } from "../setupAxios";

export interface BearStoreState {
  bears: number;
  planets: Record<string, unknown>;
}

export interface BearStoreActions {
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: BearStoreState["bears"]) => void;
  getPlanets: () => void;
}

const initialState: BearStoreState = {
  bears: 0,
  planets: {},
};

export const useBearStore = create<BearStoreState & BearStoreActions>(
  (set) => ({
    ...initialState,
    increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBears) => set({ bears: newBears }),
    getPlanets: async () => {
      const res = await setupAxios().get("https://swapi.dev/api/planets/1/");
      set({ planets: res.data });
    },
  })
);
