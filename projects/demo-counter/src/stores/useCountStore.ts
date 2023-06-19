import { create } from "mini-zustand/src/react";

interface ICountStore {
  value: number;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
}

// template
const useCountStore = create<ICountStore>((set) => ({
  value: 0,
  increase: () => set((state) => ({ value: state.value + 1 })),
  decrease: () => set((state) => ({ value: state.value - 1 })),
  reset: () => set(() => ({ value: 0 }))
}));

export default useCountStore;
