import { $ } from '../../v1-todo-list-2-components/src/utils/util.js';
import * as userAPI from './api/user.js';

import Component from './core/Component.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);

    this.init();
  }

  async init() {
    // API 요청 후 (초기) 상태를 설정할 때 async-await(Promise) 을 이용해야하는데
    // 기존에 사용했던 constructor 에서는 비동기 로직을 처리하기 힘듦
    // 그래서 init 함수를 만들어서 상태를 관리할 예정 (근데, 이 부분을 core/component 에 설정할 지 고민!)
    const users = await userAPI.getUser();

    this.setState({
      users,
    });
  }

  template() {
    const { users } = this.state;

    return `
      <h1>Async Test</h1>  
      <ul>
        ${users
          .map((user) => `<li style="cursor: pointer"><b>${user.username}</b> (${user.name})</li>`)
          .join('')}
      </ul>
      <button>다시 불러오기</button>
    `;
  }

  componentDidMount() {
    $('button').addEventListener('click', this.handleFeth.bind(this));
  }

  // custom
  async handleFeth() {
    // update State?
    const users = await userAPI.getUser();
    this.setState({
      users,
    });
  }
}
