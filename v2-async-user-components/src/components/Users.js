import Component from '../core/Component.js';

import { $ } from '../utils/util.js';
import { userStore } from '../store.js';
import * as userAPI from '../api/user.js';
import { setUsers, setUser } from '../modules/users.js';

export default class Users extends Component {
  constructor(...rest) {
    super(...rest);
  }

  async initialState() {
    this.handleSetUsers();
  }

  template() {
    const { users } = userStore.getState();

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
    $('.re-fetch').addEventListener('click', this.handleRefetchClick.bind(this));
    $('.user-list').addEventListener('click', this.handleSetUser);
  }

  // custom
  handleRefetchClick({ target }) {
    if (target.tagName !== 'BUTTON') return;

    this.handleSetUsers();
  }

  async handleSetUsers() {
    const users = await userAPI.getUsers();
    userStore.dispatch(setUsers(users));
  }

  async handleSetUser({ target }) {
    // if (!(target.tagName === 'LI' || target.tagName === 'UL')) return;
    if (target.tagName === 'BUTTON') return;
    console.log(target);

    const id = target.closest('li')?.dataset.id;
    const user = await userAPI.getUser(id);

    userStore.dispatch(setUser(user));
  }
}
