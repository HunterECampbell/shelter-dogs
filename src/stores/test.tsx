import { create } from "zustand";
import axios from "axios";

interface BearStoreState {
  bears: number;
  planets: Record<string, unknown>;
  increasePopulation: () => void;
  removeAllBears: () => void;
  updateBears: (newBears: BearStoreState["bears"]) => void;
  getPlanets: () => void;
}

export const useBearStore = create<BearStoreState>((set) => ({
  bears: 0,
  planets: {},
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
  getPlanets: async () => {
    const res = await axios.get("https://swapi.dev/api/planets/1/");
    set({ planets: res.data });
  },
}));
