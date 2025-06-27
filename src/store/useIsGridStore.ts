import { create } from "zustand";

// Zustand Store
type gridStore = {
  isGrid: boolean;
  alterGrid: () => void;
};

export const useGridStore = create<gridStore>((set) => ({
  isGrid: true,
  alterGrid: () =>
    set((state) => ({
      isGrid: !state.isGrid,
    })),
}));
