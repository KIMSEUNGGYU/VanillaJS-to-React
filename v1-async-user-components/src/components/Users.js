import Component from '../core/Component.js';

import { $ } from '../utils/util.js';

export default class Users extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    const { users } = this.props;
    if (!users) return '';

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
    const { onChangeUsers } = this.props;

    $('button').addEventListener('click', onChangeUsers);
    this.$target.addEventListener('click', this.handleUserClick.bind(this));
  }

  handleUserClick({ target }) {
    const { onChangeUser } = this.props;

    if (target.tagName === 'LI' || target.tagName === 'UL' || target.tagName === 'SECTION') return;
    const id = target.closest('li')?.dataset?.id;
    onChangeUser(id);
  }
}
