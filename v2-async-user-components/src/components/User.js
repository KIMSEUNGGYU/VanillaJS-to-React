import Component from '../core/Component.js';

import store from '../store.js';

export default class User extends Component {
  constructor(...rest) {
    super(...rest);

    store.subscribe(this.render.bind(this));
  }

  template() {
    const { user } = store.getState();

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
