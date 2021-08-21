import Component from '../core/Component.js';

import { userStore } from '../store.js';

export default class User extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    const { user } = userStore.getState();

    return `
      ${
        user
          ? `
          <section class="user">
            <h1>${user.username}</h1>
            <b>Email:</b> ${user.email}
          </section>
          `
          : ''
      }
    `;
  }
}
