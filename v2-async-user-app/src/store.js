import { createStore } from './core/Redux.js'; // redux

import usersReducer, { initialState } from './modules/users.js';

export default createStore(usersReducer, initialState);
/**
기존 리액트에서는 index.js 파일에서 해당 함수를 호출하고 stroe 를 생성
그 후 Provider 를 이용하여 컴포넌트를 전역에서 사용할 수 있게함.

하지만, 해당 프로젝트?에서는 Provider 기능이 없어 store.js 파일에서 생성하고
필요한 파일 부분에서 사용하도록 함.

import store = "store.js" // or
impor {getState, dispatch} = "store.js"

Multi Store 관리는 아직 고려 못함
 */
