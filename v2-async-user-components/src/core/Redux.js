/**
 * Redux 기능
 * cnew Redux 부분이 createStore 부분
 */

import Observable from './Observable.js';

class Redux extends Observable {
  _state;
  reducer;
  constructor(reducer, initialState = {}) {
    super();

    this._state = initialState;
    this.reducer = reducer;
  }

  _set(newState) {
    this._state = newState;
    this.publish();
  }

  getState() {
    return this._state;
  }

  dispatch(action) {
    const newState = this.reducer(this.getState(), action);
    this._set(newState);
  }
}

export function createStore(reducer, initialState = {}) {
  return new Redux(reducer, initialState);
}
