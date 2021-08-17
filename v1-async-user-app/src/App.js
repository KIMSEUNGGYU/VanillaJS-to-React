import { $ } from './utils/util.js';
import * as userAPI from './api/user.js';

import Component from './core/Component.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);
  }

  async initialState() {
    // API 요청 후 (초기) 상태를 설정할 때 async-await(Promise) 을 이용해야하는데
    // 기존에 사용했던 constructor 에서는 비동기 로직을 처리하기 힘듦
    // 그래서 init 함수를 만들어서 상태를 관리할 예정 (근데, 이 부분을 core/component 에 설정할 지 고민!)
    const users = await userAPI.getUsers();

    this.setState({
      users,
      user: null,
    });
  }
  
  template() {
    const { users, user } = this.state;

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
    $('.re-fetch').addEventListener('click', this.handleFeth.bind(this));
    $('.user-list').addEventListener('click', this.handleClickUser.bind(this));
  }

  // custom
  async handleFeth() {
    // update State?
    const users = await userAPI.getUsers();
    this.setState({
      ...this.state,
      users,
    });
  }

  async handleClickUser({ target }) {
    if (target.tagName === 'LI' || target.tagName === 'UL') return;

    const id = target.closest('li')?.dataset.id;
    const user = await userAPI.getUser(id);

    this.setState({
      ...this.state,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  }
}
