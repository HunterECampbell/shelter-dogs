import { create } from "zustand";

interface BearStoreState {
  bears: number;
}

export const useBearStore = create<BearStoreState>((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears: BearStoreState["bears"]) => set({ bears: newBears }),
}));
