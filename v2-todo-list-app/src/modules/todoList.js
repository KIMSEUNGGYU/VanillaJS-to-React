import * as data from '../data/data.js';

const ADD_TODO_ITEM = 'ADD_TODO_ITEM';
const TOGGLE_TODO_ITEM = 'TOGGLE_TODO_ITEM';
const DELETE_TODO_ITEM = 'DELETE_TODO_ITEM';

export const addTodoItem = (payload) => ({ type: ADD_TODO_ITEM, payload });
export const toggleTodoItem = (payload) => ({ type: TOGGLE_TODO_ITEM, payload });
export const deleteTodoItem = (payload) => ({ type: DELETE_TODO_ITEM, payload });

// const initialState = initialState;
export const initialState = data.initialState;

export default function todoListReducer(state = initialState, action = {}) {
  // console.log();

  switch (action.type) {
    case ADD_TODO_ITEM:
      return state.concat(action.payload);
    default:
      return state;
  }
}
