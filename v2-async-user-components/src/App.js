import { $ } from './utils/util.js';
import Component from './core/Component.js';

import Users from './components/Users.js';
import User from './components/User.js';

import { userStore } from './store.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    return `
      <h1>Async Test</h1>
      <section class="user-list"></section>
      <section class="user"></section>
    `;
  }

  componentDidMount() {
    const users = new Users($('.user-list'));
    const user = new User($('.user'));

    const updatUsers = () => console.log('update state', userStore.getState());

    userStore.subscribe(() => {
      users.render(), user.render(), updatUsers();
    });
  }
}
