import { $ } from './utils/util.js';

import { increase, decrease, setDiff } from './module/counter.js';
import store from './store.js';

import Component from './core/Component.js';

export default class App extends Component {
  constructor(...rest) {
    super(...rest);

    store.subscribe(this.render.bind(this)); // 필수, 컴포넌트 마다 해당 기능 호출해야함
  }

  componentDidMount() {
    const { handleIncrease, handleDecrease, handleSubmit } = this;
    $('.increaseBtn').addEventListener('click', handleIncrease.bind(this));
    $('.decreaseBtn').addEventListener('click', handleDecrease.bind(this));
    $('.setDiffForm').addEventListener('submit', handleSubmit.bind(this));
  }

  template() {
    const { number, diff } = store?.getState();
    // const number = 1;
    // const diff = 5;

    return `
      <div class="container">
        <h1>Counter</h1>
        <form class="setDiffForm">
          <input class="diffInput" type="number" placeholder="1" value="${diff}"/>
          <button class="diffSubmit" type="submit">diff 설정</button>
        </form> 
        <h2 class="counter">${number}</h2>
        <button class="increaseBtn">+1</button>
        <button class="decreaseBtn">-1</button>
      </div>
    `;
  }

  // custom handler
  handleIncrease() {
    store.dispatch(increase());
  }
  handleDecrease() {
    store.dispatch(decrease());
  }

  handleSubmit(event) {
    event.preventDefault();

    const diff = parseInt($('.diffInput').value, 10);
    if (!diff) return;

    store.dispatch(setDiff(diff));
  }
}
