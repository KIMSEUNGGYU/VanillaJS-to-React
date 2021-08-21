import { createStore } from './core/redux.js';

import usersReducer from './modules/users.js';

const userStore = createStore(usersReducer);
userStore.dispatch();

export { userStore };
// export default createStore(usersReducer);
