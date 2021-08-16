const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';
const SET_DIFF = 'SET_DIFF';

export const increase = () => ({ type: INCREASE });
export const decrease = () => ({ type: DECREASE });
export const setDiff = (payload) => ({ type: SET_DIFF, payload });

export const initialState = {
  number: 0,
  diff: 1,
};

export default function counterReducer(state = initialState, action = {}) {
  const prevState = state;

  console.log('init', state);

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
        diff: action?.payload,
      };
    default:
      return state;
    // throw new Error(`존재하지 않는 action 입니다: ${action.type}`);
  }
}
