import Component from '../core/Component.js';
import { decrease, increase } from '../modules/counter.js';

import store from '../store.js';
import { $ } from '../utils/util.js';

export default class Counter extends Component {
  template() {
    const { number } = store.getState();

    return `
      <h2 class="counter">${number}</h2>
      <button class="increaseBtn">+1</button>
      <button class="decreaseBtn">-1</button>
    `;
  }

  componentDidMount() {
    $('.increaseBtn').addEventListener('click', () => store.dispatch(increase()));
    $('.decreaseBtn').addEventListener('click', () => store.dispatch(decrease()));
  }
}
