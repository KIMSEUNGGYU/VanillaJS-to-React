import { $ } from './utils/util.js';
import store from './store.js';

import * as userAPI from './api/user.js';
import Component from './core/Component.js';
import { setUser, setUsers } from './modules/users.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);

    store.subscribe(this.render.bind(this)); // 필수, 컴포넌트 마다 해당 기능 호출해야함
  }

  async initialState() {
    await this.handleSetUsers();
  }

  template() {
    const { users, user } = store.getState();

    return `
      <h1>Async Test</h1>
      <ul class="user-list">
        ${users
          .map(
            (user) => `<li style="cursor: pointer" data-id="${user.id}">
              <span> <b>${user.username}</b> (${user.name}) </span>
            </li>`,
          )
          .join('')}
      </ul>
      <button class="re-fetch">다시 불러오기</button>
      <hr />
      ${
        user
          ? `<section class="user">
            <h1>${user.username}</h1>
            <b>Email:</b> ${user.email}
          </section>`
          : ''
      }
    `;
  }

  componentDidMount() {
    $('.re-fetch').addEventListener('click', this.handleSetUsers);
    $('.user-list').addEventListener('click', this.handleSetUser);
  }
  // custom
  async handleSetUsers() {
    const users = await userAPI.getUsers();
    store.dispatch(setUsers(users));
  }

  async handleSetUser({ target }) {
    if (target.tagName === 'LI' || target.tagName === 'UL') return;

    const id = target.closest('li')?.dataset.id;
    const user = await userAPI.getUser(id);

    store.dispatch(setUser(user));
  }
}
