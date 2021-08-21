const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const SET_DIFF = 'SET_DIFF';

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const setDiff = (payload) => ({ type: SET_DIFF, payload });

const initialState = {
  diff: 1,
  number: 0,
};

export default function countReducer(state = initialState, action = {}) {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        number: state.number + state.diff,
      };
    case DECREASE:
      return {
        ...state,
        number: state.number - state.diff,
      };
    case SET_DIFF:
      return {
        ...state,
        diff: action.payload,
      };
    default:
      return state;
  }
}
