const SET_USERS = 'SET_USERS';
const SET_USER = 'SET_USER';

export const setUsers = (users) => ({ type: SET_USERS, payload: users });
export const setUser = (user) => ({ type: SET_USER, payload: user });

export const initialState = {
  users: [],
  user: null,
};

export default function usersReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
      };
    default:
      return {
        ...state,
        user: action.payload,
      };
  }
}
