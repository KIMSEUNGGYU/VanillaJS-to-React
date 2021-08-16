import { $ } from './utils/util.js';

import store from './store.js';

import Component from './core/Component.js';
import Counter from './components/Counter.js';
import DiffInput from './components/DiffInput.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);

    store.subscribe(this.render.bind(this)); // 필수, 컴포넌트 마다 해당 기능 호출해야함
  }

  componentDidMount() {
    new Counter($('.counter-component'));
    new DiffInput($('.diff-form-component'));
  }

  template() {
    return `
      <h1>Counter</h1>
      <section class="diff-form-component"></section>
      <section class="counter-component"></section>
    `;
  }
}
