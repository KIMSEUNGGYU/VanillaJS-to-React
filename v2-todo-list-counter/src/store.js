import { createStore } from './core/redux.js';

import countReducer from './modules/counter.js';
import todoListReducer from './modules/todoList.js';

const countStore = createStore(countReducer);
countStore.dispatch(); // 해당 상태 초기화를 위한 요청

const todoListStore = createStore(todoListReducer);
todoListStore.dispatch(); // 해당 상태 초기화를 위한 요청

export { countStore, todoListStore };
