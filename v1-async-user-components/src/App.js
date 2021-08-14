import { $ } from '../../v1-todo-list-2-components/src/utils/util.js';
import * as userAPI from './api/user.js';

import Component from './core/Component.js';
import Users from './components/Users.js';
import User from './components/User.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);

    this.init();
  }

  async init() {
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
    return `
      <h1>Async Test</h1>  
      <section class="user-list"></section>
      <hr />
      <section class="user"></section>
    `;
  }

  componentDidMount() {
    const { handleChangeUsers, handleChangeUser } = this;

    new Users($('.user-list'), {
      users: this.state?.users,
      onChangeUsers: handleChangeUsers.bind(this),
      onChangeUser: handleChangeUser.bind(this),
    });

    new User($('.user'), {
      user: this.state?.user,
    });
  }

  async handleChangeUsers() {
    const users = await userAPI.getUsers();

    this.setState({
      ...this.state,
      users,
    });
  }

  async handleChangeUser(id) {
    if (!id) return;

    const user = await userAPI.getUser(id);

    this.setState({
      ...this.state,
      user,
    });
  }
}
