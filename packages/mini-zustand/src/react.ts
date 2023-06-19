import { useSyncExternalStore } from "react";
import type { StateCreator, IStore } from "./vanilla";
import createStore from "./vanilla";

const create = <TState>(props: StateCreator<TState>) => {
  return createImpl<TState>(props)
}

const createImpl = <TState>(props: StateCreator<TState>) => {
  const store = createStore<TState>(props);

  const useBoundStore = () => useStore(store);

  return useBoundStore;
}

// with react hook
const useStore = <T>(storeApi: IStore<T>) => {
  const slice = useSyncExternalStore(storeApi.subscribe, storeApi.getState);
  return slice;
}

export {
  create
}
