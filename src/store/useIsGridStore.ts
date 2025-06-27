import { create } from "zustand";

// Zustand Store
type gridStore = {
  isGrid: boolean;
  alterGrid: () => void;
};

export const useGridStore = create<gridStore>((set, get) => ({
  isGrid: true,
  alterGrid: () =>
    set((state) => ({
      isGrid: !state.isGrid,
    })),
}));
