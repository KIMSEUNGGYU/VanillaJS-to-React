import { $ } from './utils/util.js';
import store from './store.js';
import Component from './core/Component.js';

import Users from './components/Users.js';
import User from './components/User.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);

    // store.subscribe(this.render.bind(this)); // 필수, 컴포넌트 마다 해당 기능 호출해야함
    // 컴포너트 분리시 App 에다가 하면 에러 발생.. ? 왜??
    // 컴포넌트 분리시 App 에서는 굳이 render 를 하지 않아도됨?
    // 왜냐하면 기본틀은 첫 번째 렌더링되고 재 렌더링할 필요 없음
  }

  template() {
    return `
      <h1>Async Test</h1>
      <section class="user-list"></section>
      <section class="user"></section>
    `;
  }

  componentDidMount() {
    new Users($('.user-list'));
    new User($('.user'));
  }
}
