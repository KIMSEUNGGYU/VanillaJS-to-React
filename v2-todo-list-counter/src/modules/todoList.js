import * as data from '../data/data.js';

const ADD_TODO_ITEM = 'ADD_TODO_ITEM';
const TOGGLE_TODO_ITEM = 'TOGGLE_TODO_ITEM';
const DELETE_TODO_ITEM = 'DELETE_TODO_ITEM';
const CHANGE_FILTER = 'CHANGE_FILTER';

export const addTodoItem = (payload) => ({ type: ADD_TODO_ITEM, payload });
export const toggleTodoItem = (payload) => ({ type: TOGGLE_TODO_ITEM, payload });
export const deleteTodoItem = (payload) => ({ type: DELETE_TODO_ITEM, payload });
export const changeFilter = (payload) => ({ type: CHANGE_FILTER, payload });

export const initialState = data.initialState;

export default function todoListReducer(state = initialState, action = {}) {
  const { todoList } = state;

  switch (action.type) {
    case ADD_TODO_ITEM:
      return {
        ...state,
        todoList: todoList.concat(action.payload),
      };
    case TOGGLE_TODO_ITEM:
      return {
        ...state,
        todoList: todoList.map((item) =>
          item.id === action.payload ? { ...item, done: !item.done } : item,
        ),
      };
    case DELETE_TODO_ITEM:
      return {
        ...state,
        todoList: todoList.filter((item) => item.id !== action.payload),
      };
    case CHANGE_FILTER:
      return {
        ...state,
        todoList: state.todoList,
        filter: action.payload,
      };
    default:
      return state;
  }
}
