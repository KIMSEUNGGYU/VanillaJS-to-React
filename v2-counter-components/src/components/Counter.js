import Component from '../core/Component.js';
import { decrease, increase } from '../modules/counter.js';

import { counterStore } from '../store.js';
import { $ } from '../utils/util.js';

export default class Counter extends Component {
  constructor(...rest) {
    super(...rest);
  }

  template() {
    const { number } = counterStore.getState();

    return `
      <h2 class="counter">${number}</h2>
      <button class="increaseBtn">+1</button>
      <button class="decreaseBtn">-1</button>
    `;
  }

  componentDidMount() {
    $('.increaseBtn').addEventListener('click', () => counterStore.dispatch(increase()));
    $('.decreaseBtn').addEventListener('click', () => counterStore.dispatch(decrease()));
  }
}
