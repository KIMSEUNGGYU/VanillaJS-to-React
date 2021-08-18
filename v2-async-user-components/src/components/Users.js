import Component from '../core/Component.js';

import { $ } from '../utils/util.js';
import store from '../store.js';
import * as userAPI from '../api/user.js';
import { setUsers, setUser } from '../modules/users.js';

export default class Users extends Component {
  constructor(...rest) {
    super(...rest);

    store.subscribe(this.render.bind(this));
  }

  async initialState() {
    this.handleSetUsers();
  }

  template() {
    const { users } = store.getState();

    return `
      <ul class="user-list">
      ${users
        ?.map(
          (user) => `<li style="cursor: pointer" data-id="${user.id}">
            <span> <b>${user.username}</b> (${user.name}) </span>
          </li>`,
        )
        .join('')}
      </ul>
      <button class="re-fetch">다시 불러오기</button>
    `;
  }

  componentDidMount() {
    $('.re-fetch').addEventListener('click', this.handleSetUsers);
    $('.user-list').addEventListener('click', this.handleSetUser);
  }

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
