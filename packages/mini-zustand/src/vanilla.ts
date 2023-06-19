type Listener<TState> = (curr: TState, previous: TState) => void;

export type StateCreator<TState> = (
  set: IStore<TState>["setState"],
  get: IStore<TState>["getState"],
  api: IStore<TState>
) => TState;

export interface IStore<TState>  {
  subscribe: (listerners: Listener<TState>) => () => void;
  getState: () => TState;
  setState: (
    partial: TState extends any ? (TState | Partial<TState> | {_(state: TState): TState | Partial<TState>}["_"]) : never,
    replace?: boolean
  ) => void;
}

const createStore = <TState>(createState: StateCreator<TState>): IStore<TState> => {

  let state: TState;
  const listeners = new Set<Listener<TState>>();

  const setState: IStore<TState>["setState"] = (partial, replace) => {
    const nextState = typeof partial === "function" ? partial(state) : partial;

    if (!Object.is(nextState, state)) {

      const previousState = state;
      state = (replace ?? typeof nextState !== "object") ? nextState : Object.assign({}, state, nextState);

      listeners.forEach(listener => {
        listener(state, previousState);
      })
    }

  }

  const subscribe: IStore<TState>["subscribe"] = (listener: Listener<TState>) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    }
  }
  
  const getState = () => {
    return state;
  }

  const api = {
    subscribe,
    getState,
    setState,
  };

  state = createState(setState, getState, api);

  return api;
}

export default createStore;
