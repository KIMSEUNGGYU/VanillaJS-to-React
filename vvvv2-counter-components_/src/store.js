import { createStore } from './core/re.js';

import countReducer from './modules/counter.js';

console.log(countReducer);

const store = createStore(countReducer);
store.dispatch(); // 상태 초기화를 위함?

export default store;
