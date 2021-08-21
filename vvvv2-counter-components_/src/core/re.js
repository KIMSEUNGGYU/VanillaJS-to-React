export function createStore(reducer) {
  let state;
  const listeners = [];

  const getState = () => ({ ...state });

  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach((fn) => fn());
  };

  const subscribe = (fn) => listeners.push(fn);

  return {
    getState,
    dispatch,
    subscribe,
  };
}
