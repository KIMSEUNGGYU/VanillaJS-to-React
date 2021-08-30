import { createStore } from './core/redux.js'; // redux

import countReducer from './modules/counter.js';

const counterStore = createStore(countReducer);
counterStore.dispatch(); // reudx에서 초기 데이터를 설정하기 위한 요청

export { counterStore };
