import { $ } from '../utils/util.js';
import Component from '../core/Component.js';

import store from '../store.js';
import { decrease, increase } from '../module/counter.js';

export default class Counter extends Component {
  constructor(...rest) {
    super(...rest);

    store.subscribe(this.render.bind(this)); // 필수, 컴포넌트 마다 해당 기능 호출해야함
  }

  template() {
    const { number } = store.getState();

    return `
      <h2 class="counter">${number}</h2>
      <button class="increaseBtn">+1</button>
      <button class="decreaseBtn">-1</button>
    `;
  }

  componentDidMount() {
    $('.increaseBtn').addEventListener('click', this.handleIncrease);
    $('.decreaseBtn').addEventListener('click', this.handleDecrease);
  }

  // custom fucntion
  handleIncrease() {
    store.dispatch(increase());
  }

  handleDecrease() {
    store.dispatch(decrease());
  }
}
